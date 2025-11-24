"use client";

import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const COLORS = ["#2563eb", "#f97316"];

type InteractiveMicroMacroChartProps = {
  title?: string;
  description?: string;
};

export default function InteractiveMicroMacroChart({
  title = "Micro vs Macro Emphasis",
  description = "Slide to explore how shifting your study time between microeconomics and macroeconomics changes the overall focus.",
}: InteractiveMicroMacroChartProps) {
  const [microShare, setMicroShare] = useState(55);

  const data = [
    { name: "Microeconomics", value: microShare },
    { name: "Macroeconomics", value: 100 - microShare },
  ];

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
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={120} paddingAngle={4}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name) => [`${value.toFixed(0)}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="micro-share">Micro Share</Label>
          <div className="flex items-center gap-4">
            <span>Conceptual</span>
            <Slider
              id="micro-share"
              min={35}
              max={70}
              step={1}
              value={[microShare]}
              onValueChange={(value) => setMicroShare(value[0])}
            />
            <span>Policy</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Micro: {microShare}% · Macro: {100 - microShare}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
