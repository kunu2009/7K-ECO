
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Smile, Meh, Frown, ArrowRight, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type EconomyState = {
    year: number;
    gdp: number;
    inflation: number;
    happiness: number;
};

type PolicyDecisions = {
    tax: 'lower' | 'same' | 'higher';
    spending: 'infra' | 'welfare' | 'none';
};

const INITIAL_STATE: EconomyState = {
    year: 2024,
    gdp: 1000,
    inflation: 3.0,
    happiness: 70,
};

const MAX_YEARS = 5;

export default function PolicyGameClient() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
    const [history, setHistory] = useState<EconomyState[]>([INITIAL_STATE]);
    const [policy, setPolicy] = useState<PolicyDecisions>({ tax: 'same', spending: 'none' });
    const { toast } = useToast();

    const currentYearState = history[history.length - 1];

    const handleNextYear = () => {
        if (currentYearState.year >= 2024 + MAX_YEARS - 1) {
            setGameState('end');
            return;
        }

        let { gdp, inflation, happiness } = currentYearState;
        let gdpChange = 0;
        let inflationChange = 0;
        let happinessChange = 0;

        // Tax effects
        if (policy.tax === 'lower') {
            gdpChange += 50; // Stimulates economy
            inflationChange += 1.5; // Increases inflation
            happinessChange += 10; // People like lower taxes
        } else if (policy.tax === 'higher') {
            gdpChange -= 40; // Cools economy
            inflationChange -= 2.0; // Reduces inflation
            happinessChange -= 15; // People dislike higher taxes
        }

        // Spending effects
        if (policy.spending === 'infra') {
            gdpChange += 60; // Long-term growth
            inflationChange += 1.0;
            happinessChange += 5;
        } else if (policy.spending === 'welfare') {
            gdpChange += 20; // Less impact on GDP
            inflationChange += 0.5;
            happinessChange += 15; // High impact on happiness
        }

        // Add some randomness and base drift
        gdp += gdpChange + (Math.random() * 20);
        inflation = Math.max(0.5, inflation + inflationChange + (Math.random() - 0.5));
        happiness = Math.max(0, Math.min(100, happiness + happinessChange - 5)); // Natural decay

        setHistory([...history, {
            year: currentYearState.year + 1,
            gdp: Math.round(gdp),
            inflation: parseFloat(inflation.toFixed(1)),
            happiness: Math.round(happiness),
        }]);

        toast({
            title: `Year ${currentYearState.year + 1} Results`,
            description: "Your policy decisions have taken effect."
        })
    };

    const restartGame = () => {
        setHistory([INITIAL_STATE]);
        setPolicy({ tax: 'same', spending: 'none' });
        setGameState('playing');
    };

    const getStatus = (value: number, type: 'inflation' | 'happiness') => {
        if (type === 'inflation') {
            if (value < 2) return { icon: <TrendingDown className="text-green-500" />, text: 'Very Low', color: 'text-green-500' };
            if (value <= 4) return { icon: <TrendingDown className="text-green-500" />, text: 'Stable', color: 'text-green-500' };
            if (value <= 7) return { icon: <TrendingUp className="text-yellow-500" />, text: 'Rising', color: 'text-yellow-500' };
            return { icon: <TrendingUp className="text-red-500" />, text: 'High', color: 'text-red-500' };
        }
        if (type === 'happiness') {
            if (value >= 80) return { icon: <Smile className="text-green-500" />, text: 'Ecstatic', color: 'text-green-500' };
            if (value >= 60) return { icon: <Smile className="text-green-500" />, text: 'Happy', color: 'text-green-500' };
            if (value >= 40) return { icon: <Meh className="text-yellow-500" />, text: 'Content', color: 'text-yellow-500' };
            return { icon: <Frown className="text-red-500" />, text: 'Unhappy', color: 'text-red-500' };
        }
        return { icon: null, text: '', color: '' };
    };

    const renderGameState = () => {
        if (gameState === 'start') {
            return (
                <Card className="max-w-2xl mx-auto text-center">
                    <CardHeader>
                        <CardTitle>Welcome, Finance Minister!</CardTitle>
                        <CardDescription>
                            You have 5 years to manage the nation&apos;s economy. Your goal is to foster GDP growth while keeping inflation and public happiness in check. Make your policy decisions wisely each year.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button onClick={() => setGameState('playing')} className="w-full">Start Game</Button>
                    </CardFooter>
                </Card>
            );
        }

        if (gameState === 'end') {
            const finalState = history[history.length - 1];
            let summary = "You've completed your 5-year term. ";
            if (finalState.gdp > 1200 && finalState.inflation < 5 && finalState.happiness > 60) {
                summary += "An excellent term! The economy is booming, inflation is stable, and the public is happy. You are a master policymaker!";
            } else if (finalState.gdp > 1000 && finalState.inflation < 8 && finalState.happiness > 50) {
                summary += "A successful term. You've balanced growth and stability well, but there's room for improvement.";
            } else {
                summary += "A challenging term. The economy faced some headwinds, and your policies had mixed results. A learning experience for next time!";
            }

            return (
                <Card className="max-w-4xl mx-auto text-center">
                    <CardHeader>
                        <CardTitle>Term Over!</CardTitle>
                        <CardDescription>{summary}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-bold mb-4">Economic History</h4>
                         <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={history}>
                                    <XAxis dataKey="year" />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="gdp" fill="#8884d8" name="GDP" />
                                    <Bar yAxisId="right" dataKey="inflation" fill="#82ca9d" name="Inflation %" />
                                    <Bar yAxisId="right" dataKey="happiness" fill="#ffc658" name="Happiness" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={restartGame} className="w-full">
                            <Repeat className="mr-2" /> Play Again
                        </Button>
                    </CardFooter>
                </Card>
            );
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status Column */}
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Year: {currentYearState.year}</CardTitle>
                            <CardDescription>Current Economic Status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold">GDP</h4>
                                <p className="text-2xl font-bold text-primary">${currentYearState.gdp} Billion</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Inflation</h4>
                                <div className={cn("flex items-center gap-2 text-2xl font-bold", getStatus(currentYearState.inflation, 'inflation').color)}>
                                    {getStatus(currentYearState.inflation, 'inflation').icon}
                                    {currentYearState.inflation}%
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold">Public Happiness</h4>
                                <div className={cn("flex items-center gap-2 text-2xl font-bold", getStatus(currentYearState.happiness, 'happiness').color)}>
                                    {getStatus(currentYearState.happiness, 'happiness').icon}
                                    {currentYearState.happiness}/100
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Economic History</CardTitle></CardHeader>
                        <CardContent>
                             <div className="h-48 w-full">
                                 <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={history} layout="vertical" margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                        <XAxis type="number" hide />
                                        <YAxis type="category" dataKey="year" hide />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="gdp" fill="#8884d8" name="GDP" />
                                    </BarChart>
                                </ResponsiveContainer>
                             </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Policy Column */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Policy Decisions for Year {currentYearState.year + 1}</CardTitle>
                        <CardDescription>Choose your fiscal policy for the upcoming year.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <h4 className="font-semibold mb-2">1. Adjust Tax Rate</h4>
                            <p className="text-sm text-muted-foreground mb-4">Lowering taxes boosts spending but can increase inflation. Higher taxes do the opposite.</p>
                            <RadioGroup value={policy.tax} onValueChange={(v) => setPolicy({ ...policy, tax: v as any })}>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="lower" id="tax-lower" /><Label htmlFor="tax-lower">Lower Taxes</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="same" id="tax-same" /><Label htmlFor="tax-same">Keep Same</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="higher" id="tax-higher" /><Label htmlFor="tax-higher">Higher Taxes</Label></div>
                            </RadioGroup>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">2. Set Spending Priority</h4>
                            <p className="text-sm text-muted-foreground mb-4">Investing in infrastructure has a strong long-term effect on GDP. Welfare spending has a strong effect on public happiness.</p>
                            <RadioGroup value={policy.spending} onValueChange={(v) => setPolicy({ ...policy, spending: v as any })}>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="infra" id="spend-infra" /><Label htmlFor="spend-infra">Invest in Infrastructure</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="welfare" id="spend-welfare" /><Label htmlFor="spend-welfare">Increase Social Welfare</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="none" id="spend-none" /><Label htmlFor="spend-none">No new spending</Label></div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleNextYear} className="w-full" size="lg">
                            Confirm Policies & Proceed to Next Year <ArrowRight className="ml-2" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    };

    return renderGameState();
}
