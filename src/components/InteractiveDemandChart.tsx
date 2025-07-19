
"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label as UiLabel } from "@/components/ui/label"

const generateDemandData = () => {
    const data = [];
    // P = 11 - 0.1Q  => 10P = 110 - Q => Q = 110 - 10P
    for (let quantity = 0; quantity <= 100; quantity += 5) {
        const price = Math.max(0, 11 - (quantity / 10));
        data.push({ quantity, price });
    }
    return data;
};

export default function InteractiveDemandChart() {
    const [price, setPrice] = React.useState(6);
    const demandData = generateDemandData();
    // Q = 110 - 10P
    const currentQuantity = Math.max(0, 110 - (price * 10));

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Interactive Demand Curve</CardTitle>
                <CardDescription>
                    Adjust the price slider to see how the quantity demanded changes. This illustrates the concepts of expansion and contraction of demand along the curve.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={demandData} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quantity" type="number" domain={[0, 110]} name="Quantity Demanded" label={{ value: "Quantity Demanded", position: "insideBottom", offset: -15 }} />
                            <YAxis dataKey="price" type="number" domain={[0, 12]} name="Price" label={{ value: "Price", angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value, name) => [value.toFixed(2), name.charAt(0).toUpperCase() + name.slice(1)]} labelFormatter={(label) => `Quantity: ${label}`}/>
                            <Legend wrapperStyle={{ bottom: 0 }} />
                            <Line dataKey="price" name="Demand" stroke="#8884d8" strokeWidth={2} dot={false} type="monotone" />
                             <ReferenceDot x={currentQuantity} y={price} r={6} fill="red" stroke="white" ifOverflow="visible">
                                <Label value={`(Q: ${currentQuantity.toFixed(0)}, P: ${price.toFixed(2)})`} position="top" offset={10} />
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
                                max={11}
                                step={0.25}
                                value={[price]}
                                onValueChange={(value) => setPrice(value[0])}
                            />
                             <span>$11</span>
                        </div>
                         <p className="text-center text-sm text-muted-foreground">Current Price: ${price.toFixed(2)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
