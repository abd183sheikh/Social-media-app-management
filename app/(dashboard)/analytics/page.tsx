"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { formatNumber, getPlatformColor, getPlatformName } from "@/lib/utils";
import { Calendar, TrendingUp, Users, Eye, Heart, MessageCircle } from "lucide-react";

const mockGrowthData = [
  { date: "Week 1", instagram: 62000, facebook: 40000, twitter: 17000 },
  { date: "Week 2", instagram: 63000, facebook: 40500, twitter: 17200 },
  { date: "Week 3", instagram: 63800, facebook: 41000, twitter: 17600 },
  { date: "Week 4", instagram: 65000, facebook: 42000, twitter: 18400 },
];

const mockEngagementData = [
  { name: "Likes", value: 32000 },
  { name: "Comments", value: 8500 },
  { name: "Shares", value: 4700 },
];

const mockReachData = [
  { date: "Mon", reach: 12000, impressions: 45000 },
  { date: "Tue", reach: 15000, impressions: 52000 },
  { date: "Wed", reach: 18000, impressions: 61000 },
  { date: "Thu", reach: 14000, impressions: 48000 },
  { date: "Fri", reach: 21000, impressions: 72000 },
  { date: "Sat", reach: 25000, impressions: 85000 },
  { date: "Sun", reach: 19000, impressions: 64000 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Track your social media performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={dateRange === "7d" ? "primary" : "outline"}
            size="sm"
            onClick={() => setDateRange("7d")}
          >
            7 Days
          </Button>
          <Button
            variant={dateRange === "30d" ? "primary" : "outline"}
            size="sm"
            onClick={() => setDateRange("30d")}
          >
            30 Days
          </Button>
          <Button
            variant={dateRange === "90d" ? "primary" : "outline"}
            size="sm"
            onClick={() => setDateRange("90d")}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reach</p>
              <p className="text-2xl font-bold">124K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Impressions</p>
              <p className="text-2xl font-bold">427K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 rounded-lg">
              <Heart className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Likes</p>
              <p className="text-2xl font-bold">32K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MessageCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Comments</p>
              <p className="text-2xl font-bold">8.5K</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follower Growth by Platform */}
        <Card>
          <CardHeader>
            <CardTitle>Follower Growth by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip formatter={(v: number) => formatNumber(v)} />
                  <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E4405F]" />
                <span className="text-sm text-gray-600">Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1877F2]" />
                <span className="text-sm text-gray-600">Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1DA1F2]" />
                <span className="text-sm text-gray-600">Twitter</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockEngagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatNumber(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {mockEngagementData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reach & Impressions */}
      <Card>
        <CardHeader>
          <CardTitle>Reach & Impressions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockReachData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(v) => formatNumber(v)} />
                <Tooltip formatter={(v: number) => formatNumber(v)} />
                <Bar dataKey="reach" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="impressions" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
