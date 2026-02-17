"use client";

import { Sidebar, Header } from "@/components/layout";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
