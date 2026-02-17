"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FollowerChart } from "@/components/dashboard/FollowerChart";
import { EngagementChart } from "@/components/dashboard/EngagementChart";
import { RecentPosts } from "@/components/dashboard/RecentPosts";
import { PlatformOverview } from "@/components/dashboard/PlatformOverview";
import { Users, TrendingUp, FileText, Link2 } from "lucide-react";
import type { DashboardStats, ChartDataPoint, Post, PlatformStats } from "@/types";

// Mock data - replace with actual API calls
const mockStats: DashboardStats = {
  totalFollowers: 125400,
  followerGrowth: 12.5,
  totalEngagement: 45200,
  engagementRate: 4.2,
  totalPosts: 156,
  scheduledPosts: 8,
  connectedAccounts: 3,
};

const mockFollowerData: ChartDataPoint[] = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 105000 },
  { date: "Mar", value: 108000 },
  { date: "Apr", value: 112000 },
  { date: "May", value: 118000 },
  { date: "Jun", value: 125400 },
];

const mockEngagementData: ChartDataPoint[] = [
  { date: "Mon", value: 4200 },
  { date: "Tue", value: 3800 },
  { date: "Wed", value: 5100 },
  { date: "Thu", value: 4600 },
  { date: "Fri", value: 5800 },
  { date: "Sat", value: 7200 },
  { date: "Sun", value: 6100 },
];

const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    socialAccountId: "1",
    platform: "INSTAGRAM",
    content: "Check out our latest product launch! 🚀",
    mediaUrl: null,
    scheduledAt: null,
    publishedAt: new Date("2024-01-15"),
    status: "PUBLISHED",
    externalId: null,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    userId: "1",
    socialAccountId: "2",
    platform: "TWITTER",
    content: "Big announcement coming soon! Stay tuned 👀",
    mediaUrl: null,
    scheduledAt: new Date("2024-01-20"),
    publishedAt: null,
    status: "SCHEDULED",
    externalId: null,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    userId: "1",
    socialAccountId: "3",
    platform: "FACEBOOK",
    content: "Thank you for 100K followers! 🎉",
    mediaUrl: null,
    scheduledAt: null,
    publishedAt: new Date("2024-01-13"),
    status: "PUBLISHED",
    externalId: null,
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
];

const mockPlatformStats: PlatformStats[] = [
  { platform: "INSTAGRAM", followers: 65000, engagement: 5.2, posts: 78 },
  { platform: "FACEBOOK", followers: 42000, engagement: 3.8, posts: 52 },
  { platform: "TWITTER", followers: 18400, engagement: 2.9, posts: 26 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [followerData, setFollowerData] = useState<ChartDataPoint[]>([]);
  const [engagementData, setEngagementData] = useState<ChartDataPoint[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStats(mockStats);
      setFollowerData(mockFollowerData);
      setEngagementData(mockEngagementData);
      setRecentPosts(mockPosts);
      setPlatformStats(mockPlatformStats);
      setIsLoading(false);
    };

    loadData();
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here&apos;s your social media overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Followers"
          value={stats?.totalFollowers || 0}
          change={stats?.followerGrowth || 0}
          icon={Users}
        />
        <StatsCard
          title="Engagement Rate"
          value={`${stats?.engagementRate || 0}%`}
          change={0.8}
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Posts"
          value={stats?.totalPosts || 0}
          subtitle={`${stats?.scheduledPosts || 0} scheduled`}
          icon={FileText}
        />
        <StatsCard
          title="Connected Accounts"
          value={stats?.connectedAccounts || 0}
          icon={Link2}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FollowerChart data={followerData} />
        <EngagementChart data={engagementData} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPosts posts={recentPosts} />
        <PlatformOverview stats={platformStats} />
      </div>
    </div>
  );
}
