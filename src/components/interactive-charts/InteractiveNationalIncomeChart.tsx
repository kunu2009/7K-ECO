"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type InteractiveNationalIncomeChartProps = {
  title?: string;
  description?: string;
};

const BASE_COMPOSITION = {
  consumption: 60,
  investment: 20,
  government: 15,
  netExports: 5,
};

export default function InteractiveNationalIncomeChart({
  title = "GDP Expenditure Composition",
  description = "Tweak investment spending to see how different expenditure components reshape the national income mix.",
}: InteractiveNationalIncomeChartProps) {
  const [investmentPush, setInvestmentPush] = useState(0);

  const composition = useMemo(() => {
    const investmentShare = BASE_COMPOSITION.investment + investmentPush;
    const consumptionShare = Math.max(30, BASE_COMPOSITION.consumption - investmentPush * 0.7);
    const netExportShare = Math.max(0, BASE_COMPOSITION.netExports + investmentPush * 0.2);
    const governmentShare = 100 - (investmentShare + consumptionShare + netExportShare);

    return [
      { component: "Consumption", share: Number(consumptionShare.toFixed(1)) },
      { component: "Investment", share: Number(investmentShare.toFixed(1)) },
      { component: "Government", share: Number(governmentShare.toFixed(1)) },
      { component: "Net Exports", share: Number(netExportShare.toFixed(1)) },
    ];
  }, [investmentPush]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={composition} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="component" />
              <YAxis domain={[0, 70]} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Share"]} />
              <Legend />
              <Bar dataKey="share" fill="#0ea5e9" name="% of GDP" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="investment-push">Investment Push (percentage points)</Label>
          <Slider
            id="investment-push"
            min={-5}
            max={15}
            step={1}
            value={[investmentPush]}
            onValueChange={(value: number[]) => setInvestmentPush(value[0])}
          />
          <p className="text-center text-sm text-muted-foreground">
            Rebalanced mix keeps GDP = 100. Observe how higher investment reallocates weight from consumption.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
