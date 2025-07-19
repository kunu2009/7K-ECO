
"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label as UiLabel } from "@/components/ui/label"

const generateDemandData = () => {
    const data = [];
    for (let price = 1; price <= 10; price++) {
        const demand = Math.round(110 - (price * 10));
        data.push({ price, demand: Math.max(0, demand) });
    }
    return data;
};

export default function InteractiveDemandChart() {
    const [price, setPrice] = React.useState(6);
    const demandData = generateDemandData();
    const currentQuantity = 110 - (price * 10);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Demand Curve</CardTitle>
                <CardDescription>
                    Adjust the price slider to see how the quantity demanded changes. This illustrates the concepts of expansion and contraction of demand along the curve.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={demandData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="demand" type="number" domain={[0, 110]} name="Quantity Demanded" label={{ value: "Quantity Demanded", position: "insideBottom", offset: -15 }} />
                            <YAxis dataKey="price" type="number" domain={[0, 11]} name="Price" label={{ value: "Price", angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value, name) => [value, name]} labelFormatter={(label) => `Price: ${label}`}/>
                            <Legend wrapperStyle={{ bottom: 0 }} />
                            <Line dataKey="demand" name="Demand" stroke="#8884d8" strokeWidth={2} dot={false} type="monotone" />
                             <ReferenceDot x={currentQuantity} y={price} r={6} fill="red" stroke="white">
                                <Label value={`(Q:${currentQuantity}, P:${price})`} position="top" offset={10} />
                            </ReferenceDot>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="max-w-md mx-auto">
                    <div className="space-y-4">
                        <UiLabel htmlFor="price-slider">Price</UiLabel>
                        <div className="flex items-center gap-4">
                            <span>$1</span>
                            <Slider
                                id="price-slider"
                                min={1}
                                max={10}
                                step={0.5}
                                value={[price]}
                                onValueChange={(value) => setPrice(value[0])}
                            />
                             <span>$10</span>
                        </div>
                         <p className="text-center text-sm text-muted-foreground">Current Price: ${price.toFixed(2)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
