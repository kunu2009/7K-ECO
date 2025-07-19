
"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label as UiLabel } from "@/components/ui/label"

const generateData = (demandShift: number, supplyShift: number) => {
    const data = [];
    for (let quantity = 0; quantity <= 150; quantity += 5) {
        // Inverse demand: P = 11 - 0.1Q
        const demandPrice = Math.max(0, 11 - (quantity / 10) + (demandShift / 10));
        // Inverse supply: P = 1 + 0.1Q
        const supplyPrice = Math.max(0, 1 + (quantity / 10) - (supplyShift / 10));
        data.push({ quantity, demand: demandPrice, supply: supplyPrice });
    }

    // Calculate equilibrium
    // Original: 110 - 10P = 10 + 10P  => 100 = 20P => P=5, Q=60
    // With shifts: 110 - 10P + demandShift = 10 + 10P + supplyShift
    // 100 + demandShift - supplyShift = 20P
    const p = (100 + demandShift - supplyShift) / 20;
    let equilibriumPrice = null;
    let equilibriumQuantity = null;

    if (p > 0) {
        equilibriumPrice = p;
        equilibriumQuantity = 110 - (10 * p) + demandShift;
    }
    
    return { chartData: data, equilibriumPrice, equilibriumQuantity };
};

export default function InteractiveSupplyDemandChart() {
    const [demandShift, setDemandShift] = React.useState(0);
    const [supplyShift, setSupplyShift] = React.useState(0);

    const { chartData, equilibriumPrice, equilibriumQuantity } = generateData(demandShift, supplyShift);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Supply & Demand</CardTitle>
                <CardDescription>
                    Adjust the sliders to see how changes in overall demand or supply affect the equilibrium price and quantity.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" type="number" domain={[0, 150]} name="Quantity" label={{ value: "Quantity", position: "insideBottom", offset: -15 }} />
                            <YAxis type="number" domain={[0, 15]} name="Price" label={{ value: "Price", angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value, name) => [value.toFixed(2), name.charAt(0).toUpperCase() + name.slice(1)]} labelFormatter={(label) => `Quantity: ${label}`}/>
                            <Legend wrapperStyle={{ bottom: 0 }} />
                            <Line dataKey="demand" name="Demand" stroke="#8884d8" strokeWidth={2} dot={false} type="monotone" />
                            <Line dataKey="supply" name="Supply" stroke="#82ca9d" strokeWidth={2} dot={false} type="monotone" />
                             {equilibriumPrice !== null && equilibriumQuantity !== null && equilibriumQuantity > 0 && (
                                <ReferenceDot x={equilibriumQuantity} y={equilibriumPrice} r={6} fill="red" stroke="white">
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
