"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { formatNumber } from "@/lib/utils";
import type { ChartDataPoint } from "@/types";

interface FollowerChartProps {
  data: ChartDataPoint[];
}

export function FollowerChart({ data }: FollowerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Follower Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number | undefined) => [formatNumber(value as number), "Followers"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: "#2563EB", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#2563EB" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
