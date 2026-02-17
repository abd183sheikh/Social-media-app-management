"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { getPlatformColor, getPlatformName } from "@/lib/utils";
import { Instagram, Facebook, Twitter } from "lucide-react";
import type { Platform } from "@/types";

interface ConnectButtonProps {
  platform: Platform;
}

const platformIcons = {
  INSTAGRAM: Instagram,
  FACEBOOK: Facebook,
  TWITTER: Twitter,
};

export function ConnectButton({ platform }: ConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const PlatformIcon = platformIcons[platform];
  const platformColor = getPlatformColor(platform);
  const platformName = getPlatformName(platform);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // TODO: Implement actual OAuth flow
    // For now, redirect to OAuth endpoint
    try {
      const response = await fetch(`/api/oauth/${platform.toLowerCase()}`, {
        method: "POST",
      });
      
      if (response.ok) {
        const { authUrl } = await response.json();
        window.location.href = authUrl;
      }
    } catch (error) {
      console.error("Failed to initiate OAuth:", error);
      setIsConnecting(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start h-14"
      onClick={handleConnect}
      isLoading={isConnecting}
    >
      <div
        className="p-2 rounded-lg mr-3"
        style={{ backgroundColor: `${platformColor}15` }}
      >
        <PlatformIcon className="h-5 w-5" style={{ color: platformColor }} />
      </div>
      <span className="font-medium">Connect {platformName}</span>
    </Button>
  );
}
