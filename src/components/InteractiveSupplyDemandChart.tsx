
"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceDot, Label } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label as UiLabel } from "@/components/ui/label"

type InteractiveSupplyDemandChartProps = {
    title?: string;
    description?: string;
};

const generateData = (demandShift: number, supplyShift: number) => {
    const demandData = [];
    const supplyData = [];
    
    // Demand: P = 11 - 0.1Q + (demandShift / 10)
    // Supply: P = 1 + 0.1Q - (supplyShift / 10)
    for (let quantity = 0; quantity <= 150; quantity += 5) {
        const demandPrice = Math.max(0, 11 - (quantity / 10) + (demandShift / 10));
        const supplyPrice = Math.max(0, 1 + (quantity / 10) - (supplyShift / 10));
        demandData.push({ quantity, price: demandPrice });
        supplyData.push({ quantity, price: supplyPrice });
    }

    // Calculate equilibrium
    // Original: 110 - 10P = -10 + 10P  => 120 = 20P => P=6, Q=50
    // With shifts: 110 - 10P + demandShift = -10 + 10P + supplyShift
    // 120 + demandShift - supplyShift = 20P
    const p = (120 + demandShift - supplyShift) / 20;
    let equilibriumPrice = null;
    let equilibriumQuantity = null;

    if (p > 0) {
        equilibriumPrice = p;
        // Calculate Q from demand function: Q = 110 - 10P + demandShift
        equilibriumQuantity = 110 - (10 * p) + demandShift;
    }
    
    return { demandData, supplyData, equilibriumPrice, equilibriumQuantity };
};

export default function InteractiveSupplyDemandChart({
    title = "Interactive Supply & Demand",
    description = "Adjust the sliders to see how changes in overall demand or supply affect the equilibrium price and quantity.",
}: InteractiveSupplyDemandChartProps) {
    const [demandShift, setDemandShift] = React.useState(0);
    const [supplyShift, setSupplyShift] = React.useState(0);

    const { demandData, supplyData, equilibriumPrice, equilibriumQuantity } = generateData(demandShift, supplyShift);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" type="number" domain={[0, 150]} name="Quantity" label={{ value: "Quantity", position: "insideBottom", offset: -15 }} allowDuplicatedCategory={false} />
                            <YAxis type="number" domain={[0, 16]} name="Price" label={{ value: "Price", angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value: any, name: any) => [value.toFixed(2), name]} labelFormatter={(label) => `Quantity: ${label}`}/>
                            <Legend wrapperStyle={{ bottom: 0 }} />
                            <Line data={demandData} dataKey="price" name="Demand" stroke="#8884d8" strokeWidth={2} dot={false} type="monotone" />
                            <Line data={supplyData} dataKey="price" name="Supply" stroke="#82ca9d" strokeWidth={2} dot={false} type="monotone" />
                             {equilibriumPrice !== null && equilibriumQuantity !== null && equilibriumQuantity > 0 && equilibriumQuantity <= 150 && (
                                <ReferenceDot x={equilibriumQuantity} y={equilibriumPrice} r={6} fill="red" stroke="white" ifOverflow="visible">
                                    <Label value={`Eq: (Q:${Math.round(equilibriumQuantity)}, P:${equilibriumPrice.toFixed(2)})`} position="top" offset={10} />
                                </ReferenceDot>
                             )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <UiLabel htmlFor="demand-slider">Demand Shift (e.g., Change in Income)</UiLabel>
                        <div className="flex items-center gap-4">
                            <span>Less</span>
                            <Slider
                                id="demand-slider"
                                min={-40}
                                max={40}
                                step={5}
                                value={[demandShift]}
                                onValueChange={(value) => setDemandShift(value[0])}
                            />
                             <span>More</span>
                        </div>
                         <p className="text-center text-sm text-muted-foreground">Current Shift: {demandShift}</p>
                    </div>
                    <div className="space-y-4">
                        <UiLabel htmlFor="supply-slider">Supply Shift (e.g., Change in Technology)</UiLabel>
                         <div className="flex items-center gap-4">
                             <span>Less</span>
                            <Slider
                                id="supply-slider"
                                min={-40}
                                max={40}
                                step={5}
                                value={[supplyShift]}
                                onValueChange={(value) => setSupplyShift(value[0])}
                            />
                             <span>More</span>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">Current Shift: {supplyShift}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
