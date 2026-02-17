"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, Button, ConfirmModal } from "@/components/ui";
import { getPlatformColor, getPlatformName, formatDateTime } from "@/lib/utils";
import { Instagram, Facebook, Twitter, Clock, CheckCircle, AlertCircle, Edit, Trash2, MoreVertical } from "lucide-react";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  onDelete: () => void;
}

const platformIcons = {
  INSTAGRAM: Instagram,
  FACEBOOK: Facebook,
  TWITTER: Twitter,
};

const statusConfig = {
  PUBLISHED: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Published" },
  SCHEDULED: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: "Scheduled" },
  DRAFT: { icon: Clock, color: "text-gray-400", bg: "bg-gray-50", label: "Draft" },
  FAILED: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", label: "Failed" },
};

export function PostCard({ post, onDelete }: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const PlatformIcon = platformIcons[post.platform];
  const status = statusConfig[post.status];
  const StatusIcon = status.icon;
  const platformColor = getPlatformColor(post.platform);

  return (
    <>
      <Card className="p-4">
        <div className="flex items-start gap-4">
          {/* Platform Icon */}
          <div
            className="p-2.5 rounded-xl flex-shrink-0"
            style={{ backgroundColor: `${platformColor}15` }}
          >
            <PlatformIcon className="h-5 w-5" style={{ color: platformColor }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-500">
                    {getPlatformName(post.platform)}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {post.publishedAt
                      ? `Published ${formatDateTime(post.publishedAt)}`
                      : post.scheduledAt
                      ? `Scheduled for ${formatDateTime(post.scheduledAt)}`
                      : `Created ${formatDateTime(post.createdAt)}`}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg}`}>
                <StatusIcon className={`h-3.5 w-3.5 ${status.color}`} />
                <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <Link
                  href={`/posts/${post.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowMenu(false)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setShowMenu(false);
                    setShowDeleteConfirm(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          onDelete();
          setShowDeleteConfirm(false);
        }}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
}
