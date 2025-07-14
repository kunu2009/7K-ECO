export type Chapter = {
  id: number;
  title: string;
  description: string;
  content: string;
};

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Introduction to Micro and Macro Economics",
    description: "Understanding the fundamental concepts of economics, bifurcated into micro and macro perspectives.",
    content: `
      Economics is a social science that studies the production, distribution, and consumption of goods and services. It is broadly divided into two main branches: Microeconomics and Macroeconomics.
      Microeconomics focuses on the behavior of individual economic agents, including households and firms, and their interactions in markets. Key topics in microeconomics include supply and demand, market structures (perfect competition, monopoly, etc.), consumer theory, and production theory. For example, microeconomics would analyze how a single consumer decides what to buy or how a firm determines its production level and pricing strategy.
      Macroeconomics, on the other hand, looks at the economy as a whole. It deals with aggregate variables such as national income, unemployment, inflation, and economic growth. Macroeconomics examines the effects of monetary and fiscal policy on the overall health of the economy. For instance, it would study the causes of a recession or the factors that contribute to a country's long-term economic growth.
      The distinction between the two is crucial. While microeconomics provides a detailed view of specific parts of the economy, macroeconomics offers a broader, more holistic perspective. Both are essential for a comprehensive understanding of the economic world.
    `,
  },
  {
    id: 2,
    title: "Utility Analysis",
    description: "Exploring the concept of utility, consumer behavior, and the laws of diminishing marginal utility.",
    content: `
      Utility is a term in economics that refers to the total satisfaction received from consuming a good or service. Economic theories based on rational choice usually assume that consumers will strive to maximize their utility.
      The concept of Cardinal and Ordinal utility is central to this analysis. Cardinal utility assumes that utility can be measured and quantified, while ordinal utility assumes that consumers can only rank their preferences.
      A key principle is the Law of Diminishing Marginal Utility, which states that as a person increases consumption of a product, there is a decline in the marginal utility that person derives from consuming each additional unit of that product. For example, the first slice of pizza brings more satisfaction than the sixth.
      Understanding utility helps explain consumer demand and the law of demand. As consumers aim to maximize total utility, their purchasing decisions are influenced by the satisfaction they expect to receive from each additional unit of a good, balanced against its price.
    `,
  },
  {
    id: 3,
    title: "Demand Analysis",
    description: "In-depth analysis of the law of demand, its determinants, and elasticity.",
    content: `
      Demand in economics is the consumer's desire and ability to purchase a good or service. The Law of Demand states that, all other factors being equal, as the price of a good or service increases, consumer demand for the good or service will decrease, and vice versa.
      Determinants of demand, other than price, include consumer income, tastes and preferences, prices of related goods (substitutes and complements), and consumer expectations. A change in any of these factors can cause the entire demand curve to shift.
      Elasticity of demand is a measure of how responsive the quantity demanded is to a change in price. If a small change in price leads to a large change in quantity demanded, demand is said to be elastic. If quantity demanded changes little with a price change, demand is inelastic. This concept is crucial for firms in setting prices and for governments in levying taxes.
    `,
  },
  {
    id: 4,
    title: "Supply Analysis",
    description: "Understanding the law of supply, its determinants, and the concept of elasticity of supply.",
    content: `
      Supply is the amount of a good or service that producers are willing and able to offer for sale at a given price. The Law of Supply states that, holding other factors constant, an increase in price results in an increase in quantity supplied.
      Factors that can shift the supply curve include input prices, technology, expectations of producers, and the number of suppliers. For example, an improvement in technology can lower production costs and increase supply, shifting the supply curve to the right.
      Elasticity of supply measures the responsiveness of the quantity supplied to a change in price. Supply is elastic if producers can easily change their production levels in response to price changes. It is inelastic if production is difficult or costly to change. The time frame is a critical factor; supply is typically more elastic in the long run than in the short run.
    `,
  },
  {
    id: 5,
    title: "Forms of Market",
    description: "Examining different market structures like perfect competition, monopoly, and oligopoly.",
    content: `
      Market structure refers to the organizational and other characteristics of a market. The main forms are Perfect Competition, Monopolistic Competition, Oligopoly, and Monopoly.
      Perfect Competition is characterized by a large number of small firms, homogeneous products, and no barriers to entry or exit. No single firm can influence the market price.
      Monopoly is the opposite extreme, with a single seller dominating the market with a unique product and high barriers to entry. The monopolist has significant control over the price.
      Oligopoly consists of a few large firms that dominate the market. These firms are interdependent, and their strategic decisions regarding price, output, and advertising heavily influence one another.
      Monopolistic Competition features many firms competing with differentiated products. Think of restaurants or clothing stores. Firms have some control over price due to product differentiation, but barriers to entry are low.
    `,
  },
  {
    id: 6,
    title: "Index Numbers",
    description: "Learning about index numbers, their types, and their significance in economics.",
    content: `
      An index number is a statistical measure designed to show changes in a variable or group of related variables with respect to time, geographic location, or other characteristics. It is a powerful tool for measuring changes in economic variables over time.
      The most common type is the Price Index, such as the Consumer Price Index (CPI), which measures changes in the price level of a market basket of consumer goods and services purchased by households. The CPI is a key indicator of inflation.
      Other types include Quantity Index Numbers, which measure changes in the volume of goods, and Value Index Numbers, which combine price and quantity changes.
      Constructing index numbers involves selecting a base year, choosing a basket of goods, and assigning weights to different items. While extremely useful, they have limitations, such as potential biases in reflecting consumer behavior or quality changes in goods.
    `,
  },
];
