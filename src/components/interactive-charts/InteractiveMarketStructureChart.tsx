"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const MARKET_TYPES = [
  {
    name: "Perfect Competition",
    numberOfFirms: 10,
    productDifferentiation: 1,
    priceControl: 1,
    entryBarriers: 1,
  },
  {
    name: "Monopolistic Competition",
    numberOfFirms: 7,
    productDifferentiation: 6,
    priceControl: 4,
    entryBarriers: 3,
  },
  {
    name: "Oligopoly",
    numberOfFirms: 4,
    productDifferentiation: 7,
    priceControl: 7,
    entryBarriers: 8,
  },
  {
    name: "Monopoly",
    numberOfFirms: 1,
    productDifferentiation: 8,
    priceControl: 10,
    entryBarriers: 10,
  },
];

type InteractiveMarketStructureChartProps = {
  title?: string;
  description?: string;
};

export default function InteractiveMarketStructureChart({
  title = "Market Structure Explorer",
  description = "Slide through market types to compare number of firms, product differentiation, price control, and entry barriers.",
}: InteractiveMarketStructureChartProps) {
  const [index, setIndex] = useState(1);

  const selected = useMemo(() => MARKET_TYPES[index], [index]);
  const radarData = [
    { metric: "Firms", value: selected.numberOfFirms },
    { metric: "Differentiation", value: selected.productDifferentiation },
    { metric: "Price Control", value: selected.priceControl },
    { metric: "Entry Barriers", value: selected.entryBarriers },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius={140}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 10]} />
              <Radar dataKey="value" name={selected.name} stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="market-structure">Market Type</Label>
          <Slider
            id="market-structure"
            min={0}
            max={MARKET_TYPES.length - 1}
            step={1}
            value={[index]}
            onValueChange={(value: number[]) => setIndex(value[0])}
          />
          <p className="text-center text-sm font-medium">Currently viewing: {selected.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
