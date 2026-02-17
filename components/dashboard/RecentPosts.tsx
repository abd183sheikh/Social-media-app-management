import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { getPlatformColor, getPlatformName, getRelativeTime } from "@/lib/utils";
import { Instagram, Facebook, Twitter, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { Post } from "@/types";

interface RecentPostsProps {
  posts: Post[];
}

const platformIcons = {
  INSTAGRAM: Instagram,
  FACEBOOK: Facebook,
  TWITTER: Twitter,
};

const statusConfig = {
  PUBLISHED: { icon: CheckCircle, color: "text-green-500", label: "Published" },
  SCHEDULED: { icon: Clock, color: "text-blue-500", label: "Scheduled" },
  DRAFT: { icon: Clock, color: "text-gray-400", label: "Draft" },
  FAILED: { icon: AlertCircle, color: "text-red-500", label: "Failed" },
};

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Posts</CardTitle>
        <Link
          href="/posts"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No posts yet</p>
          ) : (
            posts.map((post) => {
              const PlatformIcon = platformIcons[post.platform];
              const status = statusConfig[post.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={post.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${getPlatformColor(post.platform)}15` }}
                  >
                    <PlatformIcon
                      className="h-5 w-5"
                      style={{ color: getPlatformColor(post.platform) }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {getPlatformName(post.platform)}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        {getRelativeTime(post.publishedAt || post.scheduledAt || post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                    <span className={`text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
