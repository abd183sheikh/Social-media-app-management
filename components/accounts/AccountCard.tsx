"use client";
import type { Platform } from "@/types";
import { useState } from "react";
import { Card, Button, ConfirmModal } from "@/components/ui";
import { formatNumber, getPlatformColor, getPlatformName, getRelativeTime } from "@/lib/utils";
import { Instagram, Facebook, Twitter, RefreshCw, Trash2, ExternalLink, LucideIcon } from "lucide-react";
import type { SocialAccount } from "@/types";

interface AccountCardProps {
  account: SocialAccount;
  onDisconnect: () => void;
  onSync: () => void;
}

const platformIcons: Record<Platform, LucideIcon> = {    /*add this*/ 
  INSTAGRAM: Instagram,
  FACEBOOK: Facebook,
  TWITTER: Twitter,
};
// const platformIcons = {
//   INSTAGRAM: Instagram,
//   FACEBOOK: Facebook,
//   TWITTER: Twitter,
// };

export function AccountCard({ account, onDisconnect, onSync }: AccountCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // const PlatformIcon = platformIcons[account.platform as keyof typeof platformIcons];
  const PlatformIcon = platformIcons[account.platform]; // add this
  const platformColor = getPlatformColor(account.platform);

  const handleSync = async () => {
    setIsSyncing(true);
    await onSync();
    setTimeout(() => setIsSyncing(false), 1000);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${platformColor}15` }}
          >
            <PlatformIcon className="h-6 w-6" style={{ color: platformColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {account.username}
            </h3>
            <p className="text-sm text-gray-500">
              {getPlatformName(account.platform)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(account.followers)}
            </p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last synced</p>
            <p className="text-sm font-medium text-gray-900">
              {account.lastSyncedAt ? getRelativeTime(account.lastSyncedAt) : "Never"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleSync}
            isLoading={isSyncing}
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isSyncing ? "animate-spin" : ""}`} />
            Sync
          </Button>
          {account.profileUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(account.profileUrl!, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          onDisconnect();
          setShowConfirm(false);
        }}
        title="Disconnect Account"
        message={`Are you sure you want to disconnect ${account.username}? This will remove all associated data.`}
        confirmText="Disconnect"
        variant="danger"
      />
    </>
  );
}
