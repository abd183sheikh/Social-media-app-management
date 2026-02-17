"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button } from "@/components/ui";
import { PostCard } from "@/components/posts/PostCard";
import { Plus, Filter } from "lucide-react";
import type { Post, PostStatus } from "@/types";

const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    socialAccountId: "1",
    platform: "INSTAGRAM",
    content: "Check out our latest product launch! 🚀 We've been working on this for months and can't wait to share it with you.",
    mediaUrl: null,
    scheduledAt: null,
    publishedAt: new Date("2024-01-15T10:00:00"),
    status: "PUBLISHED",
    externalId: "123",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    userId: "1",
    socialAccountId: "2",
    platform: "TWITTER",
    content: "Big announcement coming soon! Stay tuned 👀 #ComingSoon #Excited",
    mediaUrl: null,
    scheduledAt: new Date("2024-01-20T14:00:00"),
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
    content: "Thank you for 100K followers! 🎉 Your support means everything to us. Here's to the next milestone!",
    mediaUrl: null,
    scheduledAt: null,
    publishedAt: new Date("2024-01-13T16:30:00"),
    status: "PUBLISHED",
    externalId: "456",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    userId: "1",
    socialAccountId: "1",
    platform: "INSTAGRAM",
    content: "Behind the scenes of our latest photoshoot 📸",
    mediaUrl: null,
    scheduledAt: null,
    publishedAt: null,
    status: "DRAFT",
    externalId: null,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<PostStatus | "ALL">("ALL");

  useEffect(() => {
    const loadPosts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPosts(mockPosts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const filteredPosts = filter === "ALL" 
    ? posts 
    : posts.filter((p) => p.status === filter);

  const handleDelete = async (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-500">Create and manage your social media posts</p>
        </div>
        <Link href="/posts/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-400" />
        <div className="flex gap-2">
          {(["ALL", "DRAFT", "SCHEDULED", "PUBLISHED"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === "ALL" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-6">Create your first post to get started</p>
          <Link href="/posts/new">
            <Button>Create your first post</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={() => handleDelete(post.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
