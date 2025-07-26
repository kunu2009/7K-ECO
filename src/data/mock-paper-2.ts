
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

export const mockPaper2: MockPaper = {
    title: "Economics Mock Paper - Set 2",
    totalMarks: 80,
    duration: "3 Hours",
    sections: [
        {
            title: "Q.1 A) Choose the correct option",
            totalMarks: 5,
            questions: [
                { text: "The concept of 'Utility' is:", marks: 1, options: ["An objective concept", "A subjective concept", "A quantitative concept", "An absolute concept"], answer: "A subjective concept" },
                { text: "The demand for necessities is generally:", marks: 1, options: ["Elastic", "Inelastic", "Perfectly elastic", "Unitary elastic"], answer: "Inelastic" },
                { text: "The supply curve for labour is generally:", marks: 1, options: ["Upward sloping", "Downward sloping", "Backward bending", "Horizontal"], answer: "Backward bending" },
                { text: "Which of the following is a feature of a monopoly market?", marks: 1, options: ["Free entry", "Many sellers", "Price discrimination", "Homogeneous product"], answer: "Price discrimination" },
                { text: "The budget in which government revenue exceeds government expenditure is called:", marks: 1, options: ["Deficit budget", "Balanced budget", "Zero budget", "Surplus budget"], answer: "Surplus budget" },
            ]
        },
        {
            title: "Q.1 B) Find the odd word out",
            totalMarks: 5,
            questions: [
                { text: "Features of Microeconomics: Price theory, Slicing method, General equilibrium, Study of individual units.", marks: 1, answer: "General equilibrium" },
                { text: "Determinants of Demand: Price, Income, Tastes, Technology.", marks: 1, answer: "Technology" },
                { text: "Types of Monopoly: Natural, Legal, Pure, Duopoly.", marks: 1, answer: "Duopoly" },
                { text: "Sources of Non-Tax Revenue: Fees, Fines, Income Tax, Special levies.", marks: 1, answer: "Income Tax" },
                { text: "Money Market Instruments: Treasury Bills, Shares, Commercial Paper, Certificate of Deposit.", marks: 1, answer: "Shares" },
            ]
        },
        {
            title: "Q.1 C) Complete the following statements",
            totalMarks: 5,
            questions: [
                { text: "When marginal utility is zero, total utility is _________.", marks: 1, answer: "maximum" },
                { text: "The demand for a product with many uses is called ________ demand.", marks: 1, answer: "composite" },
                { text: "In perfect competition, firms are price ________.", marks: 1, answer: "takers" },
                { text: "The year _______ is considered the year of the Great Divide for India's population.", marks: 1, answer: "1921" },
                { text: "The difference between the value of a country's exports and imports is the Balance of ______.", marks: 1, answer: "Trade" },
            ]
        },
        {
            title: "Q.2 A) Identify and explain the concepts (Any 3 out of 5)",
            totalMarks: 6,
            instructions: "Identify the concept (1 mark) and explain it (1 mark).",
            questions: [
                { text: "The Maharashtra government has banned the use of single-use plastic bags.", marks: 2, answer: "<b>Concept:</b> Government Intervention / Regulation.<br/><b>Explanation:</b> This is an example of the government intervening in the market to correct a market failure (environmental pollution) by using its regulatory power to ban a harmful product." },
                { text: "A consumer's demand for petrol increases when they purchase a new car.", marks: 2, answer: "<b>Concept:</b> Joint Demand / Complementary Goods.<br/><b>Explanation:</b> Cars and petrol are complementary goods, meaning they are consumed together. The demand for one (petrol) is directly linked to the demand for the other (car)." },
                { text: "A country's total production of goods and services increased from $2 trillion to $2.2 trillion in a year.", marks: 2, answer: "<b>Concept:</b> Economic Growth.<br/><b>Explanation:</b> Economic growth refers to an increase in the production of economic goods and services, compared from one period of time to another. It is conventionally measured as the percent rate of increase in real gross domestic product (GDP)." },
                { text: "India imports electronic components from China and assembles them into smartphones for sale.", marks: 2, answer: "<b>Concept:</b> Global Supply Chain / International Trade.<br/><b>Explanation:</b> This describes a global supply chain where different stages of production are located in different countries to take advantage of cost or skill differences. It's a key feature of modern foreign trade." },
                { text: "A company lowers its price, but its total revenue decreases.", marks: 2, answer: "<b>Concept:</b> Inelastic Demand.<br/><b>Explanation:</b> According to the total outlay method, if a fall in price leads to a decrease in total revenue (expenditure), it means the demand for the product is inelastic (Ed < 1). The percentage increase in quantity demanded is less than the percentage fall in price." },
            ]
        },
        {
            title: "Q.3) Distinguish between (Any 3 out of 5)",
            totalMarks: 6,
            instructions: "Write two points of distinction for each.",
            questions: [
                { text: "Total Utility and Marginal Utility", marks: 2, answer: "<b>Total Utility:</b> 1) It is the aggregate utility from all units consumed. 2) It increases at a diminishing rate.<br/><b>Marginal Utility:</b> 1) It is the additional utility from the last unit consumed. 2) It continuously diminishes." },
                { text: "Stock and Supply", marks: 2, answer: "<b>Stock:</b> 1) It is the total quantity of a commodity available with the seller. 2) It is a potential supply and is a stock concept.<br/><b>Supply:</b> 1) It is the part of the stock the seller is willing to sell at a price. 2) It is the actual offered quantity and is a flow concept." },
                { text: "Simple Index and Weighted Index", marks: 2, answer: "<b>Simple Index:</b> 1) All items are given equal importance. 2) It is easier to construct but less representative.<br/><b>Weighted Index:</b> 1) Items are given weights according to their relative importance. 2) It is more complex but more accurate and representative." },
                { text: "Revenue Expenditure and Capital Expenditure", marks: 2, answer: "<b>Revenue Expenditure:</b> 1) It is recurring in nature and incurred for day-to-day functioning. 2) It does not create any assets (e.g., salaries).<br/><b>Capital Expenditure:</b> 1) It is non-recurring in nature. 2) It leads to the creation of assets (e.g., building a dam)." },
                { text: "Visible Trade and Invisible Trade", marks: 2, answer: "<b>Visible Trade:</b> 1) It is the trade of tangible goods. 2) It is recorded in the Balance of Trade.<br/><b>Invisible Trade:</b> 1) It is the trade of services. 2) It is recorded in the Current Account of the BOP, but not in the BOT." },
            ]
        },
        {
            title: "Q.4) Answer the following (Any 3 out of 5)",
            totalMarks: 12,
            instructions: "Each answer should be in 3-4 points.",
            questions: [
                { text: "Explain any four features of Macroeconomics.", marks: 4, answer: "1. <b>Study of Aggregates:</b> Macroeconomics deals with the economy as a whole, studying aggregates like national income, total employment, and the general price level. <br/> 2. <b>Income Theory:</b> It is also known as the theory of income and employment, as it focuses on determining the equilibrium level of income and employment in the economy. <br/> 3. <b>General Equilibrium Analysis:</b> It studies the equilibrium in all markets simultaneously, analyzing how demand and supply in various markets are interconnected. <br/> 4. <b>Lumping Method:</b> It uses aggregation or 'lumping' to study economic variables, for example, by studying the entire forest rather than individual trees." },
                { text: "Explain the types of Price Elasticity of Demand.", marks: 4, answer: "1. <b>Perfectly Elastic Demand (Ed = ∞):</b> An infinite quantity is demanded at a specific price. The demand curve is a horizontal line. <br/> 2. <b>Perfectly Inelastic Demand (Ed = 0):</b> Quantity demanded does not change regardless of price. The demand curve is a vertical line. <br/> 3. <b>Unitary Elastic Demand (Ed = 1):</b> The percentage change in quantity demanded is exactly equal to the percentage change in price. <br/> 4. <b>Relatively Elastic Demand (Ed > 1):</b> The percentage change in quantity demanded is greater than the percentage change in price (e.g., luxuries). <br/> 5. <b>Relatively Inelastic Demand (Ed < 1):</b> The percentage change in quantity demanded is less than the percentage change in price (e.g., necessities)." },
                { text: "Explain the features of Monopolistic Competition.", marks: 4, answer: "1. <b>Fairly Large Number of Sellers:</b> There are many firms in the market, but not as many as in perfect competition. <br/> 2. <b>Product Differentiation:</b> This is the key feature. Products are differentiated on the basis of brand, packaging, design, etc., giving each firm a mini-monopoly. <br/> 3. <b>Free Entry and Exit:</b> Firms can enter and exit the market freely, which ensures that firms only earn normal profits in the long run. <br/> 4. <b>Selling Costs:</b> Firms incur significant costs on advertising and sales promotion to attract customers and differentiate their products." },
                { text: "Explain the functions of Commercial Banks.", marks: 4, answer: "1. <b>Accepting Deposits:</b> Banks accept deposits from the public in various forms like savings accounts, current accounts, and fixed deposits. <br/> 2. <b>Providing Loans:</b> Banks provide loans and advances to individuals and businesses, which is their main source of income. This includes cash credit, overdrafts, and term loans. <br/> 3. <b>Credit Creation:</b> Banks have the ability to create credit by lending out a multiple of their primary deposits, which expands the money supply. <br/> 4. <b>Agency Functions:</b> Banks act as agents for their customers by collecting cheques, paying bills, and managing funds." },
                { text: "Explain the concept of Balance of Payments.", marks: 4, answer: "1. <b>Systematic Record:</b> The Balance of Payments (BOP) is a systematic statement of all economic transactions between the residents of a country and the rest of the world. <br/> 2. <b>Double-Entry System:</b> It is prepared using a double-entry bookkeeping system, so it always balances in an accounting sense. <br/> 3. <b>Current Account:</b> This component records trade in goods (visible trade) and services (invisible trade), as well as unilateral transfers. <br/> 4. <b>Capital Account:</b> This component records all international transactions of assets, including foreign direct investment (FDI), portfolio investment (FPI), and loans." },
            ]
        },
        {
            title: "Q.5) Answer in detail (Any 2 out of 3)",
            totalMarks: 16,
            instructions: "Answer in detail, with diagrams where necessary.",
            questions: [
                { text: "Explain the Law of Demand with its assumptions and exceptions.", marks: 8, answer: "The answer should state the law (inverse relationship between price and quantity demanded), provide a demand schedule and diagram, list the assumptions (constant income, tastes, etc.), and then explain the exceptions in detail (Giffen goods, prestige goods, speculation, etc.)." },
                { text: "What is an Index Number? Explain the steps involved in the construction of index numbers.", marks: 8, answer: "The answer should first define an index number as a statistical tool for measuring relative change. Then, it should detail the steps: 1) Purpose of the index, 2) Selection of the base year, 3) Selection of the basket of commodities, 4) Selection of prices, 5) Selection of weights (and its importance), and 6) Selection of an appropriate formula." },
                { text: "Explain the sources of Public Revenue.", marks: 8, answer: "The answer should classify public revenue into Tax Revenue and Non-Tax Revenue. <br/> 1. <b>Tax Revenue:</b> Should be further divided into Direct Taxes (explain Income Tax, Corporate Tax) and Indirect Taxes (explain GST, Customs Duty) with examples. <br/> 2. <b>Non-Tax Revenue:</b> Should explain the various sources like Fees (license fees), Fines and Penalties, Profits from Public Sector Undertakings, Gifts and Grants, and Special Levies/Assessments." },
            ]
        }
    ]
};
