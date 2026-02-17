"use client";

import { useState, useEffect, useCallback } from "react";
import type { SocialAccount, Post, Analytics, DashboardStats } from "@/types";

// Generic fetch hook
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// Accounts hook
export function useAccounts() {
  const { data, isLoading, error, refetch } = useFetch<SocialAccount[]>("/api/accounts");

  const connectAccount = async (platform: string) => {
    const response = await fetch(`/api/oauth/${platform}`, { method: "POST" });
    if (response.ok) {
      const { authUrl } = await response.json();
      window.location.href = authUrl;
    }
  };

  const disconnectAccount = async (accountId: string) => {
    await fetch(`/api/accounts/${accountId}`, { method: "DELETE" });
    refetch();
  };

  const syncAccount = async (accountId: string) => {
    await fetch(`/api/accounts/${accountId}/sync`, { method: "POST" });
    refetch();
  };

  return {
    accounts: data || [],
    isLoading,
    error,
    refetch,
    connectAccount,
    disconnectAccount,
    syncAccount,
  };
}

// Posts hook
export function usePosts() {
  const { data, isLoading, error, refetch } = useFetch<Post[]>("/api/posts");

  const createPost = async (postData: Partial<Post>) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      refetch();
      return response.json();
    }
    throw new Error("Failed to create post");
  };

  const updatePost = async (postId: string, postData: Partial<Post>) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      refetch();
      return response.json();
    }
    throw new Error("Failed to update post");
  };

  const deletePost = async (postId: string) => {
    await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    refetch();
  };

  const publishPost = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}/publish`, { method: "POST" });
    if (response.ok) {
      refetch();
    }
  };

  return {
    posts: data || [],
    isLoading,
    error,
    refetch,
    createPost,
    updatePost,
    deletePost,
    publishPost,
  };
}

// Analytics hook
export function useAnalytics(accountId?: string, dateRange: string = "7d") {
  const url = accountId
    ? `/api/analytics/${accountId}?range=${dateRange}`
    : `/api/analytics?range=${dateRange}`;

  const { data, isLoading, error, refetch } = useFetch<Analytics[]>(url);

  return { analytics: data || [], isLoading, error, refetch };
}

// Dashboard stats hook
export function useDashboardStats() {
  const { data, isLoading, error, refetch } = useFetch<DashboardStats>("/api/dashboard/stats");

  return { stats: data, isLoading, error, refetch };
}
