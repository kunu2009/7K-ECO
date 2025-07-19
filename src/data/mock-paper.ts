
export type Question = {
    text: string;
    options?: string[];
    answer: string;
    marks: number;
};

export type Section = {
    title: string;
    instructions?: string;
    totalMarks: number;
    questions: Question[];
};

export type MockPaper = {
    title: string;
    totalMarks: number;
    duration: string;
    sections: Section[];
};

export const mockPaper: MockPaper = {
    title: "Economics Mock Paper",
    totalMarks: 80,
    duration: "3 Hours",
    sections: [
        {
            title: "Q.1 A) Choose the correct option",
            totalMarks: 5,
            questions: [
                { text: "The branch of economics that deals with the allocation of resources.", marks: 1, options: ["Microeconomics", "Macroeconomics", "Econometrics", "None of these"], answer: "Microeconomics" },
                { text: "When marginal utility is negative, total utility is:", marks: 1, options: ["Rising", "Falling", "Maximum", "Zero"], answer: "Falling" },
                { text: "Demand curve is _______.", marks: 1, options: ["Upward sloping", "Downward sloping", "Parallel to X-axis", "Parallel to Y-axis"], answer: "Downward sloping" },
                { text: "A market structure with a single seller.", marks: 1, options: ["Perfect Competition", "Monopoly", "Oligopoly", "Monopolistic Competition"], answer: "Monopoly" },
                { text: "The financial year in India is:", marks: 1, options: ["1st Jan to 31st Dec", "1st April to 31st March", "1st March to 31st April", "1st July to 30th June"], answer: "1st April to 31st March" },
            ]
        },
        {
            title: "Q.1 B) Complete the correlation",
            totalMarks: 5,
            questions: [
                { text: "Microeconomics : Slicing Method :: Macroeconomics : ?", marks: 1, answer: "Lumping Method" },
                { text: "Tea and Coffee : Substitutes :: Car and Petrol : ?", marks: 1, answer: "Complements" },
                { text: "Perfectly Elastic Demand : Ed = ∞ :: Perfectly Inelastic Demand : ?", marks: 1, answer: "Ed = 0" },
                { text: "RBI : Money Market :: SEBI : ?", marks: 1, answer: "Capital Market" },
                { text: "Income Tax : Direct Tax :: GST : ?", marks: 1, answer: "Indirect Tax" },
            ]
        },
        {
            title: "Q.1 C) Give economic term for the following statements",
            totalMarks: 5,
            questions: [
                { text: "The want satisfying power of a commodity.", marks: 1, answer: "Utility" },
                { text: "A market where there are few sellers.", marks: 1, answer: "Oligopoly" },
                { text: "The tax whose burden can be shifted to others.", marks: 1, answer: "Indirect Tax" },
                { text: "The difference between value of exports and imports of goods.", marks: 1, answer: "Balance of Trade" },
                { text: "The cost incurred on producing an additional unit.", marks: 1, answer: "Marginal Cost (MC)" },
            ]
        },
        {
            title: "Q.2 A) Identify and explain the concepts (Any 3 out of 5)",
            totalMarks: 6,
            instructions: "Identify the concept (1 mark) and explain it (1 mark).",
            questions: [
                { text: "A poor person buys more of a low-quality bread (bajra) when its price rises.", marks: 2, answer: "<b>Concept:</b> Giffen's Paradox.<br/><b>Explanation:</b> A Giffen good is a special type of inferior good where demand increases as the price rises. This happens because the negative income effect of a price rise for a staple food is stronger than the substitution effect, forcing poor consumers to buy more of it as they can no longer afford better alternatives." },
                { text: "The government of India has borrowed from the World Bank.", marks: 2, answer: "<b>Concept:</b> Public Debt (specifically External Debt).<br/><b>Explanation:</b> Public debt refers to the total borrowings of the government. When the government borrows from foreign entities like the World Bank or other countries, it is known as external debt." },
                { text: "A consumer buys more of a product at a high price because of its status symbol.", marks: 2, answer: "<b>Concept:</b> Veblen Goods or Prestige Goods.<br/><b>Explanation:</b> These are luxury goods for which demand increases as the price increases. This is an exception to the law of demand because the high price itself is a marker of status and exclusivity, making the good more desirable." },
                { text: "A country's imports of goods are valued at $500 billion, while its exports of goods are $400 billion.", marks: 2, answer: "<b>Concept:</b> Unfavourable Balance of Trade or Trade Deficit.<br/><b>Explanation:</b> Balance of Trade measures the difference between the value of a country's visible exports and visible imports. When imports are greater than exports, it results in a trade deficit, which is considered unfavourable." },
                { text: "A new technology is introduced that reduces the cost of producing mobile phones.", marks: 2, answer: "<b>Concept:</b> Increase in Supply.<br/><b>Explanation:</b> An improvement in technology is a key determinant of supply. It lowers the cost of production, making it more profitable for firms to produce. This leads to an increase in the quantity supplied at every price level, causing the supply curve to shift to the right." },
            ]
        },
        {
            title: "Q.3) Distinguish between (Any 3 out of 5)",
            totalMarks: 6,
            instructions: "Write two points of distinction for each.",
            questions: [
                { text: "Microeconomics and Macroeconomics", marks: 2, answer: "<b>Microeconomics:</b> 1) Studies individual economic units. 2) Uses the slicing method.<br/><b>Macroeconomics:</b> 1) Studies the economy as a whole and its aggregates. 2) Uses the lumping method." },
                { text: "Expansion of Demand and Increase in Demand", marks: 2, answer: "<b>Expansion of Demand:</b> 1) Caused by a fall in the price of the commodity. 2) Represented by a downward movement along the same demand curve.<br/><b>Increase in Demand:</b> 1) Caused by favourable changes in factors other than price (e.g., rise in income). 2) Represented by a rightward shift of the entire demand curve." },
                { text: "Perfect Competition and Monopoly", marks: 2, answer: "<b>Perfect Competition:</b> 1) Large number of sellers. 2) Firms are price takers.<br/><b>Monopoly:</b> 1) Single seller. 2) The firm is a price maker." },
                { text: "Direct Tax and Indirect Tax", marks: 2, answer: "<b>Direct Tax:</b> 1) The burden cannot be shifted to others. 2) Example: Income Tax.<br/><b>Indirect Tax:</b> 1) The burden can be shifted to others. 2) Example: GST." },
                { text: "Money Market and Capital Market", marks: 2, answer: "<b>Money Market:</b> 1) Deals with short-term funds (up to 1 year). 2) Regulated by RBI.<br/><b>Capital Market:</b> 1) Deals with long-term funds (more than 1 year). 2) Regulated by SEBI." },
            ]
        },
        {
            title: "Q.4) Answer the following (Any 3 out of 5)",
            totalMarks: 12,
            instructions: "Each answer should be in 3-4 points.",
            questions: [
                { text: "Explain the features of Utility.", marks: 4, answer: "1. <b>Relative Concept:</b> Utility is related to time and place. Woolen clothes have utility in winter but not summer. <br/> 2. <b>Subjective Concept:</b> It is a psychological concept and differs from person to person. A book may have utility for a student but not for an illiterate person. <br/> 3. <b>Ethically Neutral:</b> The concept of utility has no ethical consideration. A commodity has utility if it satisfies a want, regardless of whether it is morally right or wrong (e.g., a knife has utility for a chef and a killer). <br/> 4. <b>Utility differs from Usefulness:</b> A commodity may have utility but may not be useful. For example, cigarettes have utility for a smoker but are harmful to health." },
                { text: "Explain the determinants of Supply.", marks: 4, answer: "1. <b>Price of the Commodity:</b> This is the most important factor. According to the Law of Supply, more is supplied at a higher price and less at a lower price. <br/> 2. <b>State of Technology:</b> Improvements in technology reduce the cost of production and lead to an increase in supply. <br/> 3. <b>Cost of Production / Input Prices:</b> If the price of inputs like labor or raw materials rises, the cost of production increases, leading to a decrease in supply. <br/> 4. <b>Government Policies:</b> Favourable policies like subsidies reduce production costs and increase supply, while unfavourable policies like taxes increase costs and decrease supply." },
                { text: "Explain the features of Oligopoly.", marks: 4, answer: "1. <b>Few Firms or Sellers:</b> The market is dominated by a small number of large firms. <br/> 2. <b>Interdependence:</b> This is the most important feature. Since there are few firms, the actions of one firm (regarding price or output) directly affect the others, leading to reactions. <br/> 3. <b>Advertising:</b> Firms engage in aggressive advertising and sales promotion to attract customers and increase market share. <br/> 4. <b>Barriers to Entry:</b> There are significant barriers that prevent new firms from entering the market, such as economies of scale, patents, or control over raw materials." },
                { text: "Explain the components of the government budget.", marks: 4, answer: "The government budget has two main components: Revenue Budget and Capital Budget. <br/> 1. <b>Revenue Receipts:</b> These are government receipts that do not create a liability or reduce an asset. They include Tax Revenue (e.g., income tax, GST) and Non-Tax Revenue (e.g., fees, fines). <br/> 2. <b>Revenue Expenditure:</b> This is recurring government spending that does not create assets, such as salaries, pensions, and subsidies. <br/> 3. <b>Capital Receipts:</b> These receipts either create a liability (like borrowings) or reduce an asset (like disinvestment). <br/> 4. <b>Capital Expenditure:</b> This is government spending that creates assets, like building roads, hospitals, or purchasing machinery." },
                { text: "Explain the functions of the RBI.", marks: 4, answer: "1. <b>Issuer of Currency:</b> RBI has the sole right to issue currency notes of all denominations except one-rupee notes and coins. <br/> 2. <b>Banker to the Government:</b> It acts as a banker, agent, and advisor to the central and state governments. It manages their accounts and public debt. <br/> 3. <b>Bankers' Bank:</b> RBI acts as the bank for all commercial banks. It holds their cash reserves and acts as a lender of last resort. <br/> 4. <b>Controller of Credit:</b> RBI controls the money supply and credit in the economy through its monetary policy tools like Repo rate, CRR, and SLR to maintain price stability." },
            ]
        },
        {
            title: "Q.5) Answer in detail (Any 2 out of 3)",
            totalMarks: 16,
            instructions: "Answer in detail, with diagrams where necessary.",
            questions: [
                { text: "Explain the Law of Diminishing Marginal Utility with its assumptions and exceptions.", marks: 8, answer: "The answer should define the law (as stated by Marshall), provide a schedule and diagram showing TU and MU, list the assumptions (rationality, continuity, homogeneity etc.) and then explain the exceptions (hobbies, misers, addictions etc.) in detail." },
                { text: "Explain the different methods of measuring National Income.", marks: 8, answer: "The answer should explain the three main methods: <br/> 1. <b>Output/Production Method:</b> Explain how it sums the net value added by all sectors, and the precaution of avoiding double counting. <br/> 2. <b>Income Method:</b> Explain how it sums all factor incomes (rent, wages, interest, profit) and mixed-income, and the precaution of excluding transfer payments. <br/> 3. <b>Expenditure Method:</b> Explain the formula C+I+G+(X-M) and define each component, and the precaution of excluding expenditure on intermediate goods." },
                { text: "Explain the functions of a Commercial Bank.", marks: 8, answer: "The answer should be divided into two parts: <br/> 1. <b>Primary Functions:</b> Explain in detail 'Accepting Deposits' (with types like savings, current, fixed) and 'Granting Loans and Advances' (with types like cash credit, overdraft, loans). <br/> 2. <b>Secondary Functions:</b> Explain agency functions (like collecting cheques, making payments) and utility functions (like providing lockers, issuing letters of credit, forex services)." },
            ]
        }
    ]
};
