"use client";
import React, { useState } from "react";
import {
  Activity,
  CheckCircle,
  Clock,
  Server,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Zap,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const services = [
  {
    name: "API Server",
    status: "operational",
    uptime: "99.99%",
    responseTime: "42ms",
    trend: "up",
  },
  {
    name: "Web Dashboard",
    status: "operational",
    uptime: "99.95%",
    responseTime: "187ms",
    trend: "down",
  },
  {
    name: "Database Cluster",
    status: "operational",
    uptime: "99.99%",
    responseTime: "65ms",
    trend: "up",
  },
  {
    name: "CDN",
    status: "degraded",
    uptime: "99.87%",
    responseTime: "156ms",
    trend: "down",
  },
];

const incidents = [
  {
    date: "2024-03-15",
    title: "CDN Performance Degradation",
    status: "investigating",
    description:
      "We are investigating reports of increased latency in our CDN services.",
  },
  {
    date: "2024-03-14",
    title: "API Rate Limiting Issue",
    status: "resolved",
    description:
      "Rate limiting configuration was adjusted to resolve intermittent API timeouts.",
  },
];

const features = [
  {
    icon: <Shield className="h-6 w-6 text-emerald-500" />,
    title: "Real-time Monitoring",
    description:
      "Monitor your services 24/7 with instant alerts and detailed metrics.",
  },
  {
    icon: <Zap className="h-6 w-6 text-emerald-500" />,
    title: "Lightning Fast",
    description:
      "Get sub-second response times with our globally distributed monitoring network.",
  },
  {
    icon: <Globe className="h-6 w-6 text-emerald-500" />,
    title: "Global Coverage",
    description:
      "Monitor from multiple regions worldwide for comprehensive availability insights.",
  },
];

function LandingPage({ onViewDashboard }: { onViewDashboard: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Monitor Your Services with
            <span className="text-emerald-500"> Confidence</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Real-time monitoring and alerting for your critical infrastructure.
            Get instant notifications when things go wrong.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onViewDashboard}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>View Live Status</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
            onClick={() => {
              router.push('/dashboard');
            }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <span>View DashBoard</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose UptimeGuard?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-800 p-6 rounded-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-4xl font-bold text-emerald-500 mb-2">
                99.99%
              </div>
              <div className="text-gray-400">Average Uptime</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-4xl font-bold text-emerald-500 mb-2">
                45ms
              </div>
              <div className="text-gray-400">Average Response Time</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-4xl font-bold text-emerald-500 mb-2">
                24/7
              </div>
              <div className="text-gray-400">Continuous Monitoring</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-emerald-500" />
              <h1 className="text-xl font-bold">System Status</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Uptime</h3>
              <Clock className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-500">99.95%</p>
            <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">
                Response Time
              </h3>
              <Server className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-500">112ms</p>
            <p className="text-sm text-gray-400 mt-1">Average</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-300">Incidents</h3>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-amber-500">1</p>
            <p className="text-sm text-gray-400 mt-1">Active incident</p>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Services Status</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-3 w-3 rounded-full ${service.status === "operational" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{service.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {service.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span>{service.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident History */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Incident History</h2>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.date}
                className="border-l-4 border-amber-500 bg-gray-900 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{incident.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      incident.status === "resolved"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {incident.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  {incident.description}
                </p>
                <p className="text-xs text-gray-500">{incident.date}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return showDashboard ? (
    <Dashboard />
  ) : (
    <LandingPage onViewDashboard={() => setShowDashboard(true)} />
  );
}

export default App;
