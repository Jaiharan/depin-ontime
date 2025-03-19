"use client"
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Globe, Plus, X } from 'lucide-react';
import { useWebsites } from "@/hooks/useWebsites";
import { subMinutes, parseISO, isWithinInterval } from 'date-fns';
import { Button } from '@/components/ui/button';

interface AggregatedTick {
  status: 'up' | 'down';
  timestamp: Date;
}

function StatusIndicator({ status }: { status: string }) {
  return (
    <div className={`w-3 h-3 rounded-full ${
      status === 'up' ? 'bg-green-500' : 'bg-red-500'
    }`} />
  );
}

function UptimeHistory({ ticks }: { ticks: AggregatedTick[] }) {
  return (
    <div className="flex gap-1 items-center">
      {ticks.map((tick, index) => (
        <div
          key={index}
          className={`w-8 h-2 rounded ${
            tick.status === 'up' ? 'bg-green-500/80' : 'bg-red-500/80'
          }`}
          title={`Status: ${tick.status} at ${tick.timestamp.toLocaleTimeString()}`}
        />
      ))}
    </div>
  );
}

function WebsiteCard({ website }: { website: ReturnType<typeof useWebsites>[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const aggregatedTicks = useMemo(() => {
    const now = new Date();
    const thirtyMinutesAgo = subMinutes(now, 30);
    
    // Filter ticks within last 30 minutes
    const recentTicks = website.ticks
      .filter(tick => {
        const tickDate = parseISO(tick.createdAt);
        return isWithinInterval(tickDate, { start: thirtyMinutesAgo, end: now });
      })
      .sort((a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime());

    // Aggregate into 3-minute windows (10 windows for 30 minutes)
    const windows: AggregatedTick[] = [];
    for (let i = 0; i < 10; i++) {
      const windowEnd = subMinutes(now, i * 3);
      const windowStart = subMinutes(windowEnd, 3);
      
      const windowTicks = recentTicks.filter(tick => {
        const tickDate = parseISO(tick.createdAt);
        return isWithinInterval(tickDate, { start: windowStart, end: windowEnd });
      });

      // Determine status for this window (if any ticks are down, window is down)
      const status = windowTicks.some(tick => tick.status === 'down') ? 'down' : 'up';
      windows.push({
        status,
        timestamp: windowEnd
      });
    }

    return windows.reverse();
  }, [website.ticks]);

  const currentStatus = useMemo(() => {
    const latestTick = website.ticks
      .sort((a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime())[0];
    return latestTick?.status || 'unknown';
  }, [website.ticks]);

  const uptime = useMemo(() => {
    const totalTicks = website.ticks.length;
    if (totalTicks === 0) return '0%';
    
    const upTicks = website.ticks.filter(tick => tick.status === 'up').length;
    return `${((upTicks / totalTicks) * 100).toFixed(1)}%`;
  }, [website.ticks]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <StatusIndicator status={currentStatus} />
          <div className="text-left">
            <h3 className="font-semibold text-gray-100">{website.url}</h3>
            <p className="text-sm text-gray-400">{website.url}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Last 30 minutes (3-min windows):</span>
              <span className="text-sm font-medium text-gray-200">Uptime: {uptime}</span>
            </div>
            <UptimeHistory ticks={aggregatedTicks} />
            <div className="text-xs text-gray-500">
              Latest check: {website.ticks[0]?.latency}ms
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddWebsiteModal({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to add website
    setUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Add New Website</h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Add Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const websites = useWebsites();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-100">Better Uptime</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Plus className="w-4 h-4" />
            Add Website
          </button>
        </div>
        
        <div className="space-y-4">
          {websites.map(website => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>

        <AddWebsiteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;