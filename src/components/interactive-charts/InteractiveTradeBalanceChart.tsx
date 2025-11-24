"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type InteractiveTradeBalanceChartProps = {
  title?: string;
  description?: string;
};

const BASE_TRADE = [
  { year: 2019, exports: 330, imports: 510 },
  { year: 2020, exports: 320, imports: 470 },
  { year: 2021, exports: 350, imports: 520 },
  { year: 2022, exports: 420, imports: 610 },
  { year: 2023, exports: 460, imports: 640 },
  { year: 2024, exports: 485, imports: 655 },
];

export default function InteractiveTradeBalanceChart({
  title = "Export Boost Simulation",
  description = "Apply an export growth shock to see how India's trade balance narrows or widens relative to imports.",
}: InteractiveTradeBalanceChartProps) {
  const [exportGrowth, setExportGrowth] = useState(5);

  const data = useMemo(() => {
    return BASE_TRADE.map((point) => ({
      year: point.year,
      exports: Number((point.exports * (1 + exportGrowth / 100)).toFixed(1)),
      imports: point.imports,
    }));
  }, [exportGrowth]);

  const latest = data[data.length - 1];
  const tradeBalance = latest.exports - latest.imports;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[250, 700]} />
              <Tooltip formatter={(value: number, name: string) => [`${value} Bn`, name]} />
              <Legend />
              <Area type="monotone" dataKey="exports" name="Exports" stroke="#22c55e" fill="#bbf7d0" fillOpacity={0.7} />
              <Area type="monotone" dataKey="imports" name="Imports" stroke="#f87171" fill="#fecaca" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="export-growth">Export Growth Shock (%)</Label>
          <Slider
            id="export-growth"
            min={-10}
            max={15}
            step={1}
            value={[exportGrowth]}
            onValueChange={(value: number[]) => setExportGrowth(value[0])}
          />
          <p className="text-center text-sm text-muted-foreground">
            Latest year trade balance: {tradeBalance >= 0 ? "+" : ""}
            {tradeBalance.toFixed(1)} Bn USD
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
