
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

export const mockPaper3: MockPaper = {
    title: "Economics Mock Paper - Set 3",
    totalMarks: 80,
    duration: "3 Hours",
    sections: [
        {
            title: "Q.1 A) Choose the correct option",
            totalMarks: 5,
            questions: [
                { text: "Macroeconomics is also known as:", marks: 1, options: ["Price Theory", "Income and Employment Theory", "Demand Theory", "Production Theory"], answer: "Income and Employment Theory" },
                { text: "A downward movement along the same demand curve is called:", marks: 1, options: ["Contraction of demand", "Decrease in demand", "Expansion of demand", "Increase in demand"], answer: "Expansion of demand" },
                { text: "The relationship between price and quantity supplied is:", marks: 1, options: ["Inverse", "Direct", "No relationship", "Negative"], answer: "Direct" },
                { text: "In a monopoly, there is/are:", marks: 1, options: ["One seller", "Few sellers", "Many sellers", "Two sellers"], answer: "One seller" },
                { text: "The body that regulates the capital market in India is:", marks: 1, options: ["RBI", "SEBI", "IRDA", "NABARD"], answer: "SEBI" },
            ]
        },
        {
            title: "Q.1 B) Give economic terms",
            totalMarks: 5,
            questions: [
                { text: "Utility of a commodity that increases with an increase in its stock.", marks: 1, answer: "Marginal Utility (in case of exceptions like hobbies)" },
                { text: "A market structure with only two sellers.", marks: 1, answer: "Duopoly" },
                { text: "The tax whose burden is borne by the person on whom it is levied.", marks: 1, answer: "Direct Tax" },
                { text: "The net market value of all final goods and services produced within the country.", marks: 1, answer: "Net Domestic Product (NDP) at Market Price" },
                { text: "A quantitative limit on the imports of a commodity.", marks: 1, answer: "Quota" },
            ]
        },
        {
            title: "Q.1 C) State whether the following statements are True or False",
            totalMarks: 5,
            questions: [
                { text: "Microeconomics uses the lumping method.", marks: 1, answer: "False" },
                { text: "The demand for luxury goods is elastic.", marks: 1, answer: "True" },
                { text: "The supply of perishable goods is inelastic.", marks: 1, answer: "True" },
                { text: "Fisher's index is the arithmetic mean of Laspeyres' and Paasche's index.", marks: 1, answer: "False" },
                { text: "A trade deficit is a favorable condition for a country.", marks: 1, answer: "False" },
            ]
        },
        {
            title: "Q.2 A) Identify and explain the concepts (Any 3 out of 5)",
            totalMarks: 6,
            instructions: "Identify the concept (1 mark) and explain it (1 mark).",
            questions: [
                { text: "A furniture maker buys wood to make chairs.", marks: 2, answer: "<b>Concept:</b> Intermediate Good / Derived Demand.<br/><b>Explanation:</b> The wood is an intermediate good because it is a raw material used in the production of another good (chairs). The demand for wood is a derived demand, as it depends on the demand for the final product." },
                { text: "The government imposes a higher tax on individuals earning over Rs. 15 lakhs per year.", marks: 2, answer: "<b>Concept:</b> Progressive Taxation.<br/><b>Explanation:</b> This is a tax system where the tax rate increases as the taxable income increases. It is based on the principle of ability to pay, where high-income earners contribute a larger percentage of their income in taxes." },
                { text: "Due to a good monsoon, the production of rice in India increased substantially.", marks: 2, answer: "<b>Concept:</b> Increase in Supply.<br/><b>Explanation:</b> A good monsoon is a favorable natural condition that acts as a determinant of supply for agricultural products. It leads to higher output, causing the supply curve for rice to shift to the right." },
                { text: "The RBI increased the Repo Rate to combat rising prices.", marks: 2, answer: "<b>Concept:</b> Monetary Policy / Control of Credit.<br/><b>Explanation:</b> The Repo Rate is a key tool of monetary policy used by the RBI. By increasing it, the RBI makes borrowing more expensive for commercial banks, which in turn reduces the overall money supply and credit in the economy to control inflation." },
                { text: "A Japanese company sets up a new car manufacturing plant in India.", marks: 2, answer: "<b>Concept:</b> Foreign Direct Investment (FDI).<br/><b>Explanation:</b> FDI is an investment made by a company from one country into business interests in another country. It involves a long-term relationship and reflects a lasting interest and control by a foreign entity." },
            ]
        },
        {
            title: "Q.3) Distinguish between (Any 3 out of 5)",
            totalMarks: 6,
            instructions: "Write two points of distinction for each.",
            questions: [
                { text: "Expansion of supply and Increase in supply", marks: 2, answer: "<b>Expansion of Supply:</b> 1) Caused by a rise in the price of the commodity. 2) Represented by an upward movement along the same supply curve.<br/><b>Increase in Supply:</b> 1) Caused by favourable changes in factors other than price (e.g., better technology). 2) Represented by a rightward shift of the entire supply curve." },
                { text: "Perfect Competition and Monopolistic Competition", marks: 2, answer: "<b>Perfect Competition:</b> 1) Product is homogeneous. 2) Firms are price takers and there are no selling costs.<br/><b>Monopolistic Competition:</b> 1) Products are differentiated. 2) Firms have some control over price and incur selling costs." },
                { text: "Laspeyres' Index and Paasche's Index", marks: 2, answer: "<b>Laspeyres' Index:</b> 1) Uses base year quantities as weights. 2) Tends to have an upward bias.<br/><b>Paasche's Index:</b> 1) Uses current year quantities as weights. 2) Tends to have a downward bias." },
                { text: "GNP and NNP", marks: 2, answer: "<b>GNP:</b> 1) It is the gross market value of all final goods and services. 2) It does not account for depreciation.<br/><b>NNP:</b> 1) It is the net market value. 2) It is calculated as GNP minus depreciation (NNP = GNP - Depreciation)." },
                { text: "Primary Market and Secondary Market", marks: 2, answer: "<b>Primary Market:</b> 1) Deals with the issue of new securities (e.g., IPOs). 2) Capital is directly formed here.<br/><b>Secondary Market:</b> 1) Deals with the trading of existing securities. 2) It provides liquidity to securities." },
            ]
        },
        {
            title: "Q.4) Answer the following (Any 3 out of 5)",
            totalMarks: 12,
            instructions: "Each answer should be in 3-4 points.",
            questions: [
                { text: "Explain the features of Utility.", marks: 4, answer: "1. <b>Ethically Neutral:</b> Utility has no moral consideration. A good may have utility even if it is socially undesirable (e.g., a gun). <br/> 2. <b>Differs from Usefulness:</b> A commodity may have utility but may not be useful (e.g., cigarettes). <br/> 3. <b>Subjective Concept:</b> It is psychological and varies from person to person based on their tastes and preferences. <br/> 4. <b>Relative Concept:</b> Utility is relative to time and place. A sweater has utility in winter, not summer." },
                { text: "Explain the determinants of Supply.", marks: 4, answer: "1. <b>Price of the Commodity:</b> According to the law of supply, more quantity is supplied at a higher price and vice-versa. <br/> 2. <b>State of Technology:</b> An improvement in technology reduces production cost and increases supply. <br/> 3. <b>Cost of Production:</b> A rise in the price of inputs like labor or raw materials increases production cost and decreases supply. <br/> 4. <b>Government Policies:</b> Subsidies increase supply by lowering costs, while taxes decrease supply by increasing costs." },
                { text: "Explain the features of Monopoly.", marks: 4, answer: "1. <b>Single Seller:</b> There is only one producer or seller of the product in the entire market. <br/> 2. <b>No Close Substitutes:</b> The product sold by the monopolist has no close substitutes, giving the firm significant market power. <br/> 3. <b>Barriers to Entry:</b> There are strong barriers (legal, natural, or technological) that prevent new firms from entering the market. <br/> 4. <b>Price Maker:</b> The monopolist has considerable control over the price of the product." },
                { text: "Explain the functions of RBI.", marks: 4, answer: "1. <b>Issuer of Currency:</b> RBI has the monopoly on issuing currency notes (except one-rupee notes and coins). <br/> 2. <b>Banker to the Government:</b> It acts as a banker, agent, and advisor to the central and state governments. <br/> 3. <b>Bankers' Bank and Lender of Last Resort:</b> It supervises all commercial banks and provides them with financial assistance in times of need. <br/> 4. <b>Controller of Credit:</b> It uses monetary policy tools (like repo rate, CRR) to control the supply of money and credit in the economy." },
                { text: "Explain the components of the Balance of Payments.", marks: 4, answer: "1. <b>Current Account:</b> This records all transactions related to the trade of goods (visible) and services (invisible), as well as income from investments and unilateral transfers. <br/> 2. <b>Capital Account:</b> This records all transactions that involve a change in the assets or liabilities of a country, such as foreign direct investment (FDI), portfolio investments (FPI), and external borrowings. <br/> 3. <b>Official Reserves Account:</b> This shows the change in a country's foreign exchange reserves held by the central bank. It is used to settle the final BOP position. <br/> 4. <b>Errors and Omissions:</b> This is a balancing item to account for statistical discrepancies." },
            ]
        },
        {
            title: "Q.5) Answer in detail (Any 2 out of 3)",
            totalMarks: 16,
            instructions: "Answer in detail, with diagrams where necessary.",
            questions: [
                { text: "Explain the Law of Diminishing Marginal Utility and its practical significance.", marks: 8, answer: "The answer should state the law, provide a schedule and diagram, and then focus on its practical significance: 1) Basis for the law of demand, 2) Usefulness to the consumer in making choices, 3) Usefulness to the government for fiscal policy (taxation), and 4) Explaining the Paradox of Value." },
                { text: "Explain the methods of measuring National Income, and explain any two difficulties in its measurement.", marks: 8, answer: "The answer should first detail the three methods: Output, Income, and Expenditure methods. Then, it should explain any two difficulties in detail, such as: 1) The problem of the non-monetized sector, 2) The problem of the underground/black economy, 3) The problem of double counting, or 4) Inadequate and unreliable data." },
                { text: "What is Foreign Trade? Explain the role of foreign trade in an economy.", marks: 8, answer: "The answer should first define foreign trade as the exchange of goods and services between countries. Then, explain its role: 1) Earning foreign exchange, 2) Encouraging investment, 3) Division of labor and specialization, 4) Optimal allocation and utilization of resources, and 5) Providing access to a wider variety of goods and services." },
            ]
        }
    ]
};
