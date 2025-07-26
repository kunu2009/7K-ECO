
// Adjacency list representing connections between chapters
export const connections: Record<number, number[]> = {
    1: [2, 8], // Intro -> Utility Analysis, National Income
    2: [1, 3, 4], // Utility Analysis -> Intro, Demand, Elasticity
    3: [2, 4, 5, 6], // Demand -> Utility, Elasticity, Supply, Markets
    4: [2, 3, 5], // Elasticity -> Utility, Demand, Supply
    5: [3, 4, 6],    // Supply -> Demand, Elasticity, Markets
    6: [3, 5],    // Markets -> Demand, Supply
    7: [8, 9],    // Index Numbers -> National Income, Public Finance
    8: [1, 7, 9], // National Income -> Intro, Index Numbers, Public Finance
    9: [8, 10, 11], // Public Finance -> National Income, Financial Markets, Foreign Trade
    10: [9],       // Financial Markets -> Public Finance
    11: [9],      // Foreign Trade -> Public Finance
};
