export type InteractiveChartType =
  | "microMacro"
  | "utility"
  | "demand"
  | "elasticity"
  | "supplyDemand"
  | "marketStructure"
  | "indexNumbers"
  | "nationalIncome"
  | "publicFinance"
  | "financialMarkets"
  | "foreignTrade";

export type InteractiveChartConfig = {
  chapterId: number;
  type: InteractiveChartType;
  title: string;
  description: string;
  insights?: string[];
};

export const interactiveCharts: Record<number, InteractiveChartConfig> = {
  1: {
    chapterId: 1,
    type: "microMacro",
    title: "Balancing Micro and Macro",
    description: "Watch how shifting study emphasis between micro and macro concepts changes the overall learning mix.",
    insights: [
      "Microeconomics typically anchors conceptual foundations",
      "Macroeconomics links policy outcomes like inflation and growth",
      "A blended approach keeps board prep aligned with the syllabus",
    ],
  },
  2: {
    chapterId: 2,
    type: "utility",
    title: "Total vs Marginal Utility",
    description: "Move along the consumption scale to observe the law of diminishing marginal utility in action.",
    insights: [
      "Total utility peaks when marginal utility hits zero",
      "Negative marginal utility signals disutility and over-consumption",
      "Utility analysis underpins consumer equilibrium and demand",
    ],
  },
  3: {
    chapterId: 3,
    type: "demand",
    title: "Demand Curve Animator",
    description: "Change the market price to show expansion or contraction along a standard demand curve.",
    insights: [
      "Moving along the curve isolates the price effect",
      "Reference dot highlights the current price-quantity pair",
      "Use it to contrast with shift factors like tastes or income",
    ],
  },
  4: {
    chapterId: 4,
    type: "elasticity",
    title: "Elasticity and Revenue",
    description: "Model an elastic demand good to see how price changes influence quantity and total revenue.",
    insights: [
      "Elastic goods show revenue moving opposite to price",
      "Classification hinges on the absolute elasticity coefficient",
      "Businesses rely on this metric for pricing and discounting",
    ],
  },
  5: {
    chapterId: 5,
    type: "supplyDemand",
    title: "Supply & Demand Shifts",
    description: "Shift the entire demand or supply schedule to study equilibrium adjustments.",
    insights: [
      "Positive demand shocks raise both price and quantity",
      "Improved technology shifts supply outward lowering prices",
      "Equilibrium coordinates help explain market clearance",
    ],
  },
  6: {
    chapterId: 6,
    type: "marketStructure",
    title: "Market Structure Radar",
    description: "Compare perfect competition through monopoly across key structural metrics.",
    insights: [
      "Price control rises as the number of firms falls",
      "Entry barriers are minimal in competitive markets",
      "Product differentiation peaks in monopolistic and oligopoly setups",
    ],
  },
  7: {
    chapterId: 7,
    type: "indexNumbers",
    title: "Index Number Trendline",
    description: "Highlight a specific year to compare CPI and WPI inflation paths.",
    insights: [
      "CPI usually runs hotter because it captures services and retail weights",
      "WPI reacts faster to commodity price swings",
      "Divergence between the two signals relative pressure on consumers vs producers",
    ],
  },
  8: {
    chapterId: 8,
    type: "nationalIncome",
    title: "GDP Composition Mixer",
    description: "Increase investment spending to see how expenditure components rebalance within GDP.",
    insights: [
      "Investment surges crowd in capital formation but can trim consumption",
      "Government expenditure stabilizes the mix when private demand softens",
      "Net exports remain a small but volatile slice for India",
    ],
  },
  9: {
    chapterId: 9,
    type: "publicFinance",
    title: "Revenue vs Capital Outlay",
    description: "Alter capital expenditure share to visualize its impact on the fiscal pie.",
    insights: [
      "Revenue spending dominates due to salaries, subsidies, and interest",
      "Capital expenditure drives asset creation and multiplier gains",
      "Higher capex share signals a more growth-oriented budget",
    ],
  },
  10: {
    chapterId: 10,
    type: "financialMarkets",
    title: "Money vs Capital Market",
    description: "Change short-term funding needs to see how savings route through money or capital markets.",
    insights: [
      "Money markets service liquidity and working capital",
      "Capital markets fund long-term infrastructure and expansion",
      "A balanced ecosystem supports both depth and stability",
    ],
  },
  11: {
    chapterId: 11,
    type: "foreignTrade",
    title: "Trade Balance Visualizer",
    description: "Apply an export growth shock to inspect how the trade gap shifts relative to imports.",
    insights: [
      "Exports need to outpace imports to shrink the deficit",
      "Commodity prices make imports sticky even when exports rise",
      "Trade balance feeds directly into the current account",
    ],
  },
};
