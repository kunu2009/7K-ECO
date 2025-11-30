"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceDot, Label } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label as UiLabel } from "@/components/ui/label";

type InteractiveUtilityChartProps = {
  title?: string;
  description?: string;
};

const buildUtilityData = () => {
  const data = [] as { quantity: number; tu: number; mu: number }[];
  for (let quantity = 0; quantity <= 10; quantity += 1) {
    const tu = 12 * quantity - 0.8 * quantity * quantity;
    const prevTu = quantity === 0 ? 0 : data[quantity - 1].tu;
    const mu = quantity === 0 ? tu : tu - prevTu;
    data.push({ quantity, tu, mu });
  }
  return data;
};

export default function InteractiveUtilityChart({
  title = "Total vs Marginal Utility",
  description = "Move along the consumption scale to see how total utility rises and marginal utility eventually declines.",
}: InteractiveUtilityChartProps) {
  const [quantity, setQuantity] = useState(4);
  const data = useMemo(() => buildUtilityData(), []);
  const currentPoint = data[quantity];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quantity" label={{ value: "Units Consumed", position: "insideBottom", offset: -10 }} />
              <YAxis yAxisId="left" dataKey="tu" label={{ value: "Total Utility", angle: -90, position: "insideLeft" }} domain={[0, 70]} />
              <YAxis yAxisId="right" orientation="right" dataKey="mu" label={{ value: "Marginal Utility", angle: 90, position: "insideRight" }} domain={[-10, 20]} />
              <Tooltip formatter={(value: number, name: string) => [value.toFixed(1), name.toUpperCase()]} />
              <Line type="monotone" dataKey="tu" stroke="#0ea5e9" strokeWidth={2} yAxisId="left" dot={false} name="Total Utility" />
              <Line type="monotone" dataKey="mu" stroke="#f97316" strokeWidth={2} yAxisId="right" dot={false} name="Marginal Utility" />
              <ReferenceDot x={currentPoint.quantity} y={currentPoint.tu} yAxisId="left" fill="#0ea5e9" stroke="white" r={6}>
                <Label value={`TU ${currentPoint.tu.toFixed(1)}`} position="top" />
              </ReferenceDot>
              <ReferenceDot x={currentPoint.quantity} y={currentPoint.mu} yAxisId="right" fill="#f97316" stroke="white" r={6}>
                <Label value={`MU ${currentPoint.mu.toFixed(1)}`} position="bottom" />
              </ReferenceDot>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <UiLabel htmlFor="utility-quantity">Units Consumed</UiLabel>
          <Slider
            id="utility-quantity"
            min={0}
            max={10}
            step={1}
            value={[quantity]}
            onValueChange={(value: number[]) => setQuantity(value[0])}
          />
          <p className="text-center text-sm text-muted-foreground">
            At {quantity} units, TU = {currentPoint.tu.toFixed(1)} utils and MU = {currentPoint.mu.toFixed(1)} utils.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
