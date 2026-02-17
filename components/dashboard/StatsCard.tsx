import { Card } from "@/components/ui";
import { formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  subtitle?: string;
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, subtitle, icon: Icon }: StatsCardProps) {
  const isPositive = change && change > 0;
  const formattedValue = typeof value === "number" ? formatNumber(value) : value;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{formattedValue}</p>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? "+" : ""}
                {change.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </Card>
  );
}
