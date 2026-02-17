"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button, Textarea, Input, Select } from "@/components/ui";
import { PlatformSelector } from "@/components/posts/PlatformSelector";
import { ArrowLeft, Image, Calendar, Send } from "lucide-react";
import Link from "next/link";
import type { Platform } from "@/types";

export default function NewPostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (asDraft: boolean = false) => {
    setIsSubmitting(true);
    
    // TODO: Implement actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    router.push("/posts");
  };

  const characterCount = content.length;
  const maxCharacters = 2200;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/posts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>
          <p className="text-gray-500">Compose and schedule your social media post</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Platforms
            </label>
            <PlatformSelector
              selected={selectedPlatforms}
              onChange={setSelectedPlatforms}
            />
          </div>

          {/* Content */}
          <div>
            <Textarea
              label="Post Content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px]"
            />
            <div className="flex justify-end mt-1">
              <span className={`text-sm ${characterCount > maxCharacters ? "text-red-500" : "text-gray-500"}`}>
                {characterCount} / {maxCharacters}
              </span>
            </div>
          </div>

          {/* Media URL */}
          <div>
            <Input
              label="Media URL (optional)"
              placeholder="https://example.com/image.jpg"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              helperText="Enter a URL to an image or video"
            />
          </div>

          {/* Schedule */}
          <div>
            <Input
              label="Schedule (optional)"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              helperText="Leave empty to save as draft"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting || !content || selectedPlatforms.length === 0}
            >
              Save as Draft
            </Button>
            {scheduledAt ? (
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !content || selectedPlatforms.length === 0}
                isLoading={isSubmitting}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>
            ) : (
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !content || selectedPlatforms.length === 0}
                isLoading={isSubmitting}
              >
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
