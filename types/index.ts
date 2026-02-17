import type { Platform, PostStatus } from "@prisma/client";

export type { Platform, PostStatus };

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: Platform;
  username: string;
  profileUrl: string | null;
  avatarUrl: string | null;
  followers: number;
  lastSyncedAt: Date | null;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  socialAccountId: string | null;
  platform: Platform;
  content: string;
  mediaUrl: string | null;
  scheduledAt: Date | null;
  publishedAt: Date | null;
  status: PostStatus;
  externalId: string | null;
  createdAt: Date;
  updatedAt: Date;
  socialAccount?: SocialAccount | null;
}

export interface Analytics {
  id: string;
  socialAccountId: string;
  date: Date;
  followers: number;
  following: number;
  impressions: number;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  profileViews: number;
}

export interface DashboardStats {
  totalFollowers: number;
  followerGrowth: number;
  totalEngagement: number;
  engagementRate: number;
  totalPosts: number;
  scheduledPosts: number;
  connectedAccounts: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface PlatformStats {
  platform: Platform;
  followers: number;
  engagement: number;
  posts: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface OAuthState {
  platform: Platform;
  redirectUrl: string;
  userId: string;
}

export interface SocialMediaMetrics {
  followers: number;
  following: number;
  posts: number;
  engagement: number;
  impressions: number;
  reach: number;
}
