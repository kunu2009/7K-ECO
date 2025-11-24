"use client";

import type { ComponentType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveChartConfig, InteractiveChartType } from "@/data/interactive-charts";
import InteractiveDemandChart from "@/components/InteractiveDemandChart";
import InteractiveSupplyDemandChart from "@/components/InteractiveSupplyDemandChart";
import InteractiveMicroMacroChart from "@/components/interactive-charts/InteractiveMicroMacroChart";
import InteractiveUtilityChart from "@/components/interactive-charts/InteractiveUtilityChart";
import InteractiveElasticityChart from "@/components/interactive-charts/InteractiveElasticityChart";
import InteractiveMarketStructureChart from "@/components/interactive-charts/InteractiveMarketStructureChart";
import InteractiveIndexNumberChart from "@/components/interactive-charts/InteractiveIndexNumberChart";
import InteractiveNationalIncomeChart from "@/components/interactive-charts/InteractiveNationalIncomeChart";
import InteractivePublicFinanceChart from "@/components/interactive-charts/InteractivePublicFinanceChart";
import InteractiveFinancialMarketsChart from "@/components/interactive-charts/InteractiveFinancialMarketsChart";
import InteractiveTradeBalanceChart from "@/components/interactive-charts/InteractiveTradeBalanceChart";

export type ChapterInteractiveChartProps = {
  config: InteractiveChartConfig;
};

type ChartComponentProps = {
  title?: string;
  description?: string;
};

const chartComponents: Partial<Record<InteractiveChartType, ComponentType<ChartComponentProps>>> = {
  microMacro: InteractiveMicroMacroChart,
  utility: InteractiveUtilityChart,
  demand: InteractiveDemandChart,
  elasticity: InteractiveElasticityChart,
  supplyDemand: InteractiveSupplyDemandChart,
  marketStructure: InteractiveMarketStructureChart,
  indexNumbers: InteractiveIndexNumberChart,
  nationalIncome: InteractiveNationalIncomeChart,
  publicFinance: InteractivePublicFinanceChart,
  financialMarkets: InteractiveFinancialMarketsChart,
  foreignTrade: InteractiveTradeBalanceChart,
};

export default function ChapterInteractiveChart({ config }: ChapterInteractiveChartProps) {
  const ChartComponent = chartComponents[config.type];

  if (!ChartComponent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interactive view unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          We could not find an interactive visualization for this chapter yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <ChartComponent title={config.title} description={config.description} />
      {config.insights && config.insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>How to read this chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              {config.insights.map((insight) => (
                <li key={insight}>{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
