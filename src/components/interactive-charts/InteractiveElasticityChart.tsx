"use client";

import { useMemo, useState } from "react";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type InteractiveElasticityChartProps = {
  title?: string;
  description?: string;
};

const BASE_PRICE = 10;
const BASE_QUANTITY = 50;
const ELASTICITY_COEFFICIENT = 1.2;

export default function InteractiveElasticityChart({
  title = "Price Elasticity Scenario",
  description = "Change the price and watch how quantity demanded and total revenue react for an elastic good.",
}: InteractiveElasticityChartProps) {
  const [priceChange, setPriceChange] = useState(0);

  const metrics = useMemo(() => {
    const priceFactor = 1 + priceChange / 100;
    const newPrice = BASE_PRICE * priceFactor;
    const quantityFactor = 1 - ELASTICITY_COEFFICIENT * (priceChange / 100);
    const newQuantity = Math.max(0, BASE_QUANTITY * quantityFactor);
    const baseRevenue = BASE_PRICE * BASE_QUANTITY;
    const newRevenue = newPrice * newQuantity;

    return {
      newPrice,
      newQuantity,
      baseRevenue,
      newRevenue,
      classification: Math.abs(ELASTICITY_COEFFICIENT) > 1 ? "Elastic" : "Inelastic",
    };
  }, [priceChange]);

  const chartData = [
    {
      label: "Base",
      price: BASE_PRICE,
      quantity: BASE_QUANTITY,
      revenue: metrics.baseRevenue,
    },
    {
      label: "Adjusted",
      price: metrics.newPrice,
      quantity: metrics.newQuantity,
      revenue: metrics.newRevenue,
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis yAxisId="left" label={{ value: "Quantity", angle: -90, position: "insideLeft" }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: "Revenue", angle: 90, position: "insideRight" }} />
              <Tooltip formatter={(value: number, name: string) => [value.toFixed(2), name]} />
              <Legend />
              <Bar yAxisId="right" dataKey="revenue" name="Total Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="quantity" name="Quantity Demanded" stroke="#0ea5e9" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <Label htmlFor="price-change">Price Change (%)</Label>
          <Slider id="price-change" min={-40} max={40} step={2} value={[priceChange]} onValueChange={(value: number[]) => setPriceChange(value[0])} />
          <div className="text-sm text-muted-foreground grid grid-cols-1 gap-2 md:grid-cols-3 text-center">
            <p>New Price: ₹{metrics.newPrice.toFixed(2)}</p>
            <p>New Quantity: {metrics.newQuantity.toFixed(1)} units</p>
            <p>Revenue Reaction: {metrics.newRevenue >= metrics.baseRevenue ? "Rising" : "Falling"}</p>
          </div>
          <p className="text-center text-sm font-medium">Elasticity classification: {metrics.classification}</p>
        </div>
      </CardContent>
    </Card>
  );
}
