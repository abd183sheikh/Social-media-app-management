"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";
import { AccountCard } from "@/components/accounts/AccountCard";
import { ConnectButton } from "@/components/accounts/ConnectButton";
import { Plus } from "lucide-react";
import type { SocialAccount } from "@/types";

// Mock data - replace with actual API calls
const mockAccounts: SocialAccount[] = [
  {
    id: "1",
    userId: "1",
    platform: "INSTAGRAM",
    username: "mybusiness",
    profileUrl: "https://instagram.com/mybusiness",
    avatarUrl: null,
    followers: 65000,
    lastSyncedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    userId: "1",
    platform: "FACEBOOK",
    username: "My Business Page",
    profileUrl: "https://facebook.com/mybusiness",
    avatarUrl: null,
    followers: 42000,
    lastSyncedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    userId: "1",
    platform: "TWITTER",
    username: "@mybusiness",
    profileUrl: "https://twitter.com/mybusiness",
    avatarUrl: null,
    followers: 18400,
    lastSyncedAt: new Date("2024-01-14"),
    createdAt: new Date("2024-01-02"),
  },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    const loadAccounts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAccounts(mockAccounts);
      setIsLoading(false);
    };

    loadAccounts();
  }, []);

  const handleDisconnect = async (accountId: string) => {
    // TODO: Implement actual API call
    setAccounts(accounts.filter((a) => a.id !== accountId));
  };

  const handleSync = async (accountId: string) => {
    // TODO: Implement actual API call
    console.log("Syncing account:", accountId);
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
          <h1 className="text-2xl font-bold text-gray-900">Connected Accounts</h1>
          <p className="text-gray-500">Manage your social media connections</p>
        </div>
        <Button onClick={() => setShowConnectModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No accounts connected
          </h3>
          <p className="text-gray-500 mb-6">
            Connect your social media accounts to start managing them
          </p>
          <Button onClick={() => setShowConnectModal(true)}>
            Connect your first account
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onDisconnect={() => handleDisconnect(account.id)}
              onSync={() => handleSync(account.id)}
            />
          ))}
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Connect a Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ConnectButton platform="INSTAGRAM" />
              <ConnectButton platform="FACEBOOK" />
              <ConnectButton platform="TWITTER" />
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowConnectModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
