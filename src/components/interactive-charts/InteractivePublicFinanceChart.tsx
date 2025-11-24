"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type InteractivePublicFinanceChartProps = {
  title?: string;
  description?: string;
};

export default function InteractivePublicFinanceChart({
  title = "Public Expenditure Mix",
  description = "Change the share of capital expenditure to see how India's fiscal profile shifts between revenue and capital outlays.",
}: InteractivePublicFinanceChartProps) {
  const [capitalShare, setCapitalShare] = useState(20);

  const chartData = useMemo(() => {
    const revenueShare = 100 - capitalShare;
    return [
      { category: "Revenue", value: revenueShare },
      { category: "Capital", value: capitalShare },
    ];
  }, [capitalShare]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis domain={[0, 100]} tickFormatter={(value: number) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Share"]} />
              <Area type="monotone" dataKey="value" stroke="#f97316" fill="#fed7aa" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="capital-share">Capital Expenditure (%)</Label>
          <Slider
            id="capital-share"
            min={10}
            max={40}
            step={1}
            value={[capitalShare]}
            onValueChange={(value: number[]) => setCapitalShare(value[0])}
          />
          <p className="text-center text-sm text-muted-foreground">
            Revenue spending: {100 - capitalShare}% · Capital spending: {capitalShare}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
