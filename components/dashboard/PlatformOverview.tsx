import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { formatNumber, getPlatformColor, getPlatformName } from "@/lib/utils";
import { Instagram, Facebook, Twitter } from "lucide-react";
import type { PlatformStats } from "@/types";

interface PlatformOverviewProps {
  stats: PlatformStats[];
}

const platformIcons = {
  INSTAGRAM: Instagram,
  FACEBOOK: Facebook,
  TWITTER: Twitter,
};

export function PlatformOverview({ stats }: PlatformOverviewProps) {
  const totalFollowers = stats.reduce((sum, s) => sum + s.followers, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((platform) => {
            const PlatformIcon = platformIcons[platform.platform];
            const percentage = totalFollowers > 0 
              ? (platform.followers / totalFollowers) * 100 
              : 0;

            return (
              <div key={platform.platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: `${getPlatformColor(platform.platform)}15` }}
                    >
                      <PlatformIcon
                        className="h-4 w-4"
                        style={{ color: getPlatformColor(platform.platform) }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {getPlatformName(platform.platform)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatNumber(platform.followers)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {platform.engagement.toFixed(1)}% engagement
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getPlatformColor(platform.platform),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Followers</span>
            <span className="text-lg font-bold text-gray-900">
              {formatNumber(totalFollowers)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
