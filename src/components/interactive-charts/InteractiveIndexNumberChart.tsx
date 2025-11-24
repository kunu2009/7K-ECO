"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceDot, Label } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label as UiLabel } from "@/components/ui/label";

type InteractiveIndexNumberChartProps = {
  title?: string;
  description?: string;
};

const INDEX_SERIES = [
  { year: 2015, cpi: 100, wpi: 100 },
  { year: 2016, cpi: 104, wpi: 101 },
  { year: 2017, cpi: 107, wpi: 103 },
  { year: 2018, cpi: 111, wpi: 108 },
  { year: 2019, cpi: 114, wpi: 110 },
  { year: 2020, cpi: 118, wpi: 112 },
  { year: 2021, cpi: 123, wpi: 116 },
  { year: 2022, cpi: 129, wpi: 122 },
  { year: 2023, cpi: 135, wpi: 127 },
  { year: 2024, cpi: 140, wpi: 131 },
];

export default function InteractiveIndexNumberChart({
  title = "CPI vs WPI Trend",
  description = "Highlight how consumer and wholesale price indices move over time to understand inflation measurement.",
}: InteractiveIndexNumberChartProps) {
  const [yearIndex, setYearIndex] = useState(INDEX_SERIES.length - 1);
  const selectedYear = useMemo(() => INDEX_SERIES[yearIndex], [yearIndex]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={INDEX_SERIES} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[95, 150]} />
              <Tooltip formatter={(value: number, name: string) => [value.toFixed(1), name.toUpperCase()]} />
              <Legend />
              <Line type="monotone" dataKey="cpi" stroke="#ef4444" strokeWidth={2} dot={false} name="CPI" />
              <Line type="monotone" dataKey="wpi" stroke="#22d3ee" strokeWidth={2} dot={false} name="WPI" />
              <ReferenceDot x={selectedYear.year} y={selectedYear.cpi} r={6} fill="#ef4444" stroke="white">
                <Label value={`CPI ${selectedYear.cpi}`} position="top" />
              </ReferenceDot>
              <ReferenceDot x={selectedYear.year} y={selectedYear.wpi} r={6} fill="#22d3ee" stroke="white">
                <Label value={`WPI ${selectedYear.wpi}`} position="bottom" />
              </ReferenceDot>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <UiLabel htmlFor="index-year">Select Year</UiLabel>
          <Slider
            id="index-year"
            min={0}
            max={INDEX_SERIES.length - 1}
            step={1}
            value={[yearIndex]}
            onValueChange={(value: number[]) => setYearIndex(value[0])}
          />
          <p className="text-center text-sm text-muted-foreground">
            {selectedYear.year}: CPI = {selectedYear.cpi} · WPI = {selectedYear.wpi}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
