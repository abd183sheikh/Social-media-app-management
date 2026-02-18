"use client";

import { getPlatformColor, getPlatformName } from "@/lib/utils";
import { Instagram, Facebook, Twitter, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Platform } from "@/types";

interface PlatformSelectorProps {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}

const platforms: { id: Platform; icon: typeof Instagram }[] = [
  { id: Platform.INSTAGRAM, icon: Instagram },
  { id: Platform.FACEBOOK, icon: Facebook },
  { id: Platform.TWITTER, icon: Twitter },
];

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  const togglePlatform = (platform: Platform) => {
    if (selected.includes(platform)) {
      onChange(selected.filter((p) => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  };

  return (
    <div className="flex gap-3">
      {platforms.map(({ id, icon: Icon }) => {
        const isSelected = selected.includes(id);
        const color = getPlatformColor(id);

        return (
          <button
            key={id}
            onClick={() => togglePlatform(id)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all",
              isSelected
                ? "border-current"
                : "border-gray-200 hover:border-gray-300"
            )}
            style={isSelected ? { borderColor: color, backgroundColor: `${color}10` } : {}}
          >
            <Icon
              className="h-5 w-5"
              style={{ color: isSelected ? color : "#6B7280" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: isSelected ? color : "#374151" }}
            >
              {getPlatformName(id)}
            </span>
            {isSelected && (
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
