"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const COLORS = ["#0ea5e9", "#facc15"];

type InteractiveFinancialMarketsChartProps = {
  title?: string;
  description?: string;
};

export default function InteractiveFinancialMarketsChart({
  title = "Money vs Capital Market Mix",
  description = "Adjust the proportion of short-term funding needs to see how savings flow between the money and capital markets.",
}: InteractiveFinancialMarketsChartProps) {
  const [shortTermNeed, setShortTermNeed] = useState(45);

  const data = useMemo<{ name: string; value: number }[]>(() => {
    const moneyShare = shortTermNeed;
    const capitalShare = 100 - shortTermNeed;
    return [
      { name: "Money Market (≤1 year)", value: moneyShare },
      { name: "Capital Market (>1 year)", value: capitalShare },
    ];
  }, [shortTermNeed]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value.toFixed(0)}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="short-term-need">Share of Short-Term Funding Needs</Label>
          <Slider
            id="short-term-need"
            min={20}
            max={70}
            step={1}
            value={[shortTermNeed]}
            onValueChange={(value: number[]) => setShortTermNeed(value[0])}
          />
          <p className="text-center text-sm text-muted-foreground">
            Money Market: {data[0].value}% · Capital Market: {data[1].value}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
