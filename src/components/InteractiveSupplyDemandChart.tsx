
"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label as UiLabel } from "@/components/ui/label"

const generateData = (demandShift: number, supplyShift: number) => {
    const data = [];
    let equilibriumPrice = null;
    let equilibriumQuantity = null;

    for (let price = 1; price <= 10; price++) {
        const demand = Math.round(110 - (price * 10) + demandShift);
        const supply = Math.round(10 + (price * 10) + supplyShift);
        data.push({ price, demand: Math.max(0, demand), supply: Math.max(0, supply) });
    }

    const demandSlope = -10;
    const demandIntercept = 110 + demandShift;
    const supplySlope = 10;
    const supplyIntercept = 10 + supplyShift;

    const p = (supplyIntercept - demandIntercept) / (demandSlope - supplySlope);
    
    if (p >= 1 && p <= 10) {
        equilibriumPrice = p;
        equilibriumQuantity = Math.round(demandIntercept + p * demandSlope);
    }
    
    return { chartData: data, equilibriumPrice, equilibriumQuantity };
};

export default function InteractiveSupplyDemandChart() {
    const [demandShift, setDemandShift] = React.useState(0);
    const [supplyShift, setSupplyShift] = React.useState(0);

    const { chartData, equilibriumPrice, equilibriumQuantity } = generateData(demandShift, supplyShift);

    const lineChartData = chartData.flatMap(d => ([
        { price: d.price, quantity: d.demand, type: 'demand' },
        { price: d.price, quantity: d.supply, type: 'supply' }
    ]));


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
                        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" type="number" domain={[0, 150]} label={{ value: "Quantity", position: "insideBottom", offset: -15 }} allowDuplicatedCategory={false} />
                            <YAxis dataKey="price" type="number" domain={[0, 11]} label={{ value: "Price", angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]} labelFormatter={(label) => `Price: ${label}`}/>
                            <Legend wrapperStyle={{ bottom: 0 }} />
                            <Line dataKey="quantity" type="monotone" data={chartData.map(d => ({ price: d.price, quantity: d.demand }))} name="Demand" stroke="#8884d8" strokeWidth={2} dot={false} />
                            <Line dataKey="quantity" type="monotone" data={chartData.map(d => ({ price: d.price, quantity: d.supply }))} name="Supply" stroke="#82ca9d" strokeWidth={2} dot={false} />
                             {equilibriumPrice !== null && equilibriumQuantity !== null && (
                                <ReferenceDot y={equilibriumPrice} x={equilibriumQuantity} r={5} fill="red" stroke="white">
                                    <Label value={`Eq: (Q:${equilibriumQuantity}, P:${equilibriumPrice.toFixed(2)})`} position="top" offset={10} />
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
