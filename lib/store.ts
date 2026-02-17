import { create } from "zustand";
import type { SocialAccount, Post, DashboardStats } from "@/types";

interface AppState {
  // Social accounts
  accounts: SocialAccount[];
  setAccounts: (accounts: SocialAccount[]) => void;
  addAccount: (account: SocialAccount) => void;
  removeAccount: (accountId: string) => void;

  // Posts
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, data: Partial<Post>) => void;
  removePost: (postId: string) => void;

  // Dashboard stats
  stats: DashboardStats | null;
  setStats: (stats: DashboardStats) => void;

  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Social accounts
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) =>
    set((state) => ({ accounts: [...state.accounts, account] })),
  removeAccount: (accountId) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== accountId),
    })),

  // Posts
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (postId, data) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, ...data } : p)),
    })),
  removePost: (postId) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) })),

  // Dashboard stats
  stats: null,
  setStats: (stats) => set({ stats }),

  // UI state
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Loading states
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
