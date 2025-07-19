
export type Chapter = {
  id: number;
  title: string;
  description: string;
  content: string; // This can now be a brief overview as detailed content is in study materials
};

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Introduction to Micro and Macro Economics",
    description: "Understanding the fundamental concepts of economics, bifurcated into micro and macro perspectives.",
    content: `Economics is a social science that studies the production, distribution, and consumption of goods and services. It is broadly divided into two main branches: Microeconomics and Macroeconomics. This chapter introduces the core principles of both branches.`
  },
  {
    id: 2,
    title: "Utility Analysis",
    description: "Exploring the concept of utility, consumer behavior, and the laws of diminishing marginal utility.",
    content: `Utility refers to the satisfaction consumers derive from goods and services. This chapter delves into how we measure utility, the law of diminishing marginal utility, and its relationship with the law of demand.`
  },
  {
    id: 3,
    title: "Demand Analysis",
    description: "In-depth analysis of the law of demand, its determinants, and elasticity.",
    content: `This chapter covers the law of demand, the factors that influence it (like income and prices of other goods), and the concept of demand elasticity, which measures how responsive demand is to price changes.`
  },
  {
    id: 4,
    title: "Supply Analysis",
    description: "Understanding the law of supply, its determinants, and the concept of elasticity of supply.",
    content: `Supply analysis focuses on the behavior of producers. We'll explore the law of supply, factors shifting the supply curve, and the concept of supply elasticity.`
  },
  {
    id: 5,
    title: "Forms of Market",
    description: "Examining different market structures like perfect competition, monopoly, and oligopoly.",
    content: `Markets can be structured in various ways, from perfect competition with many sellers to a monopoly with just one. This chapter analyzes the characteristics and implications of different market forms.`
  },
  {
    id: 6,
    title: "Index Numbers",
    description: "Learning about index numbers, their types, and their significance in economics.",
    content: `Index numbers like the Consumer Price Index (CPI) are vital tools for measuring economic changes, such as inflation. This chapter explains how they are constructed and used.`
  },
  {
    id: 7,
    title: "National Income",
    description: "Methods of measuring national income and understanding key aggregates like GDP, GNP, and NNP.",
    content: `National income is a measure of a country's economic performance. This chapter explores the different methods to calculate it (Output, Income, Expenditure) and its significance.`
  },
  {
    id: 8,
    title: "Public Finance in India",
    description: "Analyzing the Indian government's revenue, expenditure, and debt management.",
    content: `Public finance deals with the government's role in the economy. This section covers public revenue (tax and non-tax), public expenditure, and the structure of the Indian budget.`
  },
  {
    id: 9,
    title: "Money Market and Capital Market in India",
    description: "Understanding the structure and functions of India's financial markets.",
    content: `This chapter differentiates between the money market (for short-term funds) and the capital market (for long-term funds), exploring the key institutions and instruments in India.`
  },
  {
    id: 10,
    title: "Foreign Trade of India",
    description: "Examining the composition, direction, and trends of India's international trade.",
    content: `Foreign trade is crucial for economic growth. This chapter looks at the trends in India's exports and imports, the concept of the balance of payments, and recent trade policies.`
  },
];
