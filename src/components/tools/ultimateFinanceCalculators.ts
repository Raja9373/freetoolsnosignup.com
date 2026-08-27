import { CalculatorDefinition } from './calculatorEngine';

export const ULTIMATE_FINANCE_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'standard-mortgage-calc',
    name: 'Mortgage Loan Calculator (P&I, Taxes, Insurance, PMI)',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate comprehensive monthly mortgage payments including Principal & Interest, Property Taxes, Homeowners Insurance, HOA fees, and PMI with full breakdown.',
    formula: 'M = P * [r(1+r)^n] / [(1+r)^n - 1] + Tax + Ins + HOA + PMI',
    inputs: [
      { id: 'homePrice', label: 'Home Purchase Price ($)', type: 'number', defaultValue: 400000, min: 10000, max: 10000000, step: 5000 },
      { id: 'downPaymentPercent', label: 'Down Payment (%)', type: 'number', defaultValue: 20, min: 0, max: 100, step: 1 },
      { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 6.75, min: 0.1, max: 25, step: 0.05 },
      { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 5, max: 40, step: 1 },
      { id: 'propertyTaxRate', label: 'Annual Property Tax Rate (%)', type: 'number', defaultValue: 1.2, min: 0, max: 10, step: 0.1 },
      { id: 'annualInsurance', label: 'Annual Home Insurance ($)', type: 'number', defaultValue: 1500, min: 0, max: 20000, step: 50 },
      { id: 'monthlyHoa', label: 'Monthly HOA / Dues ($)', type: 'number', defaultValue: 0, min: 0, max: 5000, step: 10 },
      { id: 'pmiRate', label: 'Annual PMI Rate (% if < 20% down)', type: 'number', defaultValue: 0.75, min: 0, max: 3, step: 0.05 }
    ],
    calculate: (inputs) => {
      const price = Math.max(1000, Number(inputs.homePrice) || 400000);
      const dpPct = Math.max(0, Math.min(100, Number(inputs.downPaymentPercent) ?? 20));
      const downPayment = (price * dpPct) / 100;
      const principal = Math.max(0, price - downPayment);
      const rate = Math.max(0.01, Number(inputs.interestRate) || 6.75);
      const years = Math.max(1, Number(inputs.loanTermYears) || 30);
      const taxRate = Math.max(0, Number(inputs.propertyTaxRate) || 0);
      const annIns = Math.max(0, Number(inputs.annualInsurance) || 0);
      const hoa = Math.max(0, Number(inputs.monthlyHoa) || 0);
      const pmiRate = Math.max(0, Number(inputs.pmiRate) || 0.75);

      const r = rate / 100 / 12;
      const n = years * 12;
      const monthlyPI = principal > 0 ? (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1) : 0;
      const monthlyTax = (price * (taxRate / 100)) / 12;
      const monthlyIns = annIns / 12;
      const monthlyPMI = dpPct < 20 && principal > 0 ? (principal * (pmiRate / 100)) / 12 : 0;
      const totalMonthly = monthlyPI + monthlyTax + monthlyIns + hoa + monthlyPMI;

      const totalPayments = monthlyPI * n;
      const totalInterest = Math.max(0, totalPayments - principal);
      const ltv = (principal / price) * 100;

      return {
        primaryValue: `$${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo`,
        primaryLabel: 'Total Estimated Monthly Payment (PITI + HOA + PMI)',
        secondaryMetrics: [
          { label: 'Principal & Interest', value: `$${monthlyPI.toFixed(2)}/mo` },
          { label: 'Property Tax Escrow', value: `$${monthlyTax.toFixed(2)}/mo` },
          { label: 'Homeowners Insurance', value: `$${monthlyIns.toFixed(2)}/mo` },
          { label: 'Private Mortgage Ins (PMI)', value: dpPct < 20 ? `$${monthlyPMI.toFixed(2)}/mo` : '$0 (LTV <= 80%)' },
          { label: 'Loan-to-Value (LTV)', value: `${ltv.toFixed(1)}%` },
          { label: 'Total Loan Amount', value: `$${principal.toLocaleString('en-US')}` },
          { label: 'Total Lifetime Interest', value: `$${Math.round(totalInterest).toLocaleString('en-US')}` },
          { label: 'Total Loan Lifetime Cost', value: `$${Math.round(totalPayments + (monthlyTax + monthlyIns + hoa + monthlyPMI) * n).toLocaleString('en-US')}` }
        ],
        explanation: `For a $${price.toLocaleString()} home with $${downPayment.toLocaleString()} (${dpPct}%) down payment and a ${years}-year loan at ${rate}%, your monthly principal and interest payment is $${monthlyPI.toFixed(2)}. Factoring in taxes ($${monthlyTax.toFixed(2)}), insurance ($${monthlyIns.toFixed(2)}), HOA ($${hoa.toFixed(2)}), and PMI ($${monthlyPMI.toFixed(2)}), total monthly out-of-pocket is $${totalMonthly.toFixed(2)}.`
      };
    }
  },
  {
    id: 'auto-loan-financing-calc',
    name: 'Auto Loan & Financing Calculator (Trade-in & Tax)',
    category: 'finance',
    subCategory: 'Auto & Personal Loans',
    description: 'Calculate car loan monthly payments factoring in vehicle purchase price, sales tax, doc fees, down payment, trade-in equity, and interest rate.',
    formula: 'Loan = (Price - TradeIn + Tax + Fees - DownPayment); Payment = Loan * [r(1+r)^n] / [(1+r)^n - 1]',
    inputs: [
      { id: 'vehiclePrice', label: 'Vehicle Purchase Price ($)', type: 'number', defaultValue: 35000, min: 1000, max: 500000, step: 500 },
      { id: 'downPayment', label: 'Cash Down Payment ($)', type: 'number', defaultValue: 5000, min: 0, max: 200000, step: 250 },
      { id: 'tradeInValue', label: 'Trade-in Allowance ($)', type: 'number', defaultValue: 6000, min: 0, max: 100000, step: 250 },
      { id: 'tradeInOwed', label: 'Amount Owed on Trade-in ($)', type: 'number', defaultValue: 2000, min: 0, max: 100000, step: 250 },
      { id: 'interestRate', label: 'Interest Rate APR (%)', type: 'number', defaultValue: 6.49, min: 0, max: 30, step: 0.1 },
      { id: 'loanTermMonths', label: 'Loan Term (Months)', type: 'number', defaultValue: 60, min: 12, max: 96, step: 12 },
      { id: 'salesTaxRate', label: 'State/Local Sales Tax (%)', type: 'number', defaultValue: 7.0, min: 0, max: 15, step: 0.25 },
      { id: 'dealerFees', label: 'Dealer Doc & Title Fees ($)', type: 'number', defaultValue: 650, min: 0, max: 5000, step: 50 }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.vehiclePrice) || 35000;
      const dp = Number(inputs.downPayment) || 0;
      const tradeVal = Number(inputs.tradeInValue) || 0;
      const tradeOwed = Number(inputs.tradeInOwed) || 0;
      const netTradeEquity = tradeVal - tradeOwed;
      const rate = Number(inputs.interestRate) || 6.49;
      const months = Number(inputs.loanTermMonths) || 60;
      const taxRate = Number(inputs.salesTaxRate) || 7.0;
      const fees = Number(inputs.dealerFees) || 0;

      const taxablePrice = Math.max(0, price - tradeVal);
      const salesTax = taxablePrice * (taxRate / 100);
      const totalCost = price + salesTax + fees;
      const totalCredits = dp + netTradeEquity;
      const loanAmount = Math.max(0, totalCost - totalCredits);

      const r = rate / 100 / 12;
      const monthlyPayment = r > 0 && loanAmount > 0
        ? (loanAmount * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1)
        : loanAmount / months;

      const totalPayments = monthlyPayment * months;
      const totalInterest = Math.max(0, totalPayments - loanAmount);

      return {
        primaryValue: `$${monthlyPayment.toFixed(2)}/mo`,
        primaryLabel: 'Monthly Auto Loan Payment',
        secondaryMetrics: [
          { label: 'Amount Financed', value: `$${Math.round(loanAmount).toLocaleString('en-US')}` },
          { label: 'Sales Tax', value: `$${salesTax.toFixed(2)}` },
          { label: 'Net Trade-in Equity', value: `$${netTradeEquity.toFixed(2)}` },
          { label: 'Total Interest Paid', value: `$${totalInterest.toFixed(2)}` },
          { label: 'Total Vehicle Out-of-Pocket', value: `$${(totalPayments + dp).toFixed(2)}` },
          { label: 'Payoff Term', value: `${months} months (${(months / 12).toFixed(1)} yrs)` }
        ],
        explanation: `Financing $${Math.round(loanAmount).toLocaleString()} over ${months} months at ${rate}% APR results in a $${monthlyPayment.toFixed(2)} monthly payment. You will pay $${totalInterest.toFixed(2)} in total interest charges over the loan lifecycle.`
      };
    }
  },
  {
    id: 'interest-only-mortgage-calc',
    name: 'Interest-Only Mortgage vs Amortized Payment Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Compare interest-only mortgage payments during the introductory draw period with the recast fully amortizing payment thereafter.',
    formula: 'IO Payment = (P * r) / 12; Recast Payment = P * [r(1+r)^m] / [(1+r)^m - 1]',
    inputs: [
      { id: 'loanAmount', label: 'Total Mortgage Balance ($)', type: 'number', defaultValue: 500000, min: 10000, max: 5000000, step: 10000 },
      { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 6.5, min: 0.5, max: 20, step: 0.1 },
      { id: 'totalTermYears', label: 'Total Loan Term (Years)', type: 'number', defaultValue: 30, min: 10, max: 40, step: 5 },
      { id: 'interestOnlyYears', label: 'Interest-Only Period (Years)', type: 'number', defaultValue: 10, min: 1, max: 20, step: 1 }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.loanAmount) || 500000;
      const rate = Number(inputs.interestRate) || 6.5;
      const totalYears = Number(inputs.totalTermYears) || 30;
      const ioYears = Number(inputs.interestOnlyYears) || 10;

      const r = rate / 100 / 12;
      const ioPayment = (P * (rate / 100)) / 12;

      const amortYears = Math.max(1, totalYears - ioYears);
      const m = amortYears * 12;
      const recastPayment = (P * (r * Math.pow(1 + r, m))) / (Math.pow(1 + r, m) - 1);

      const standard30N = totalYears * 12;
      const standard30Payment = (P * (r * Math.pow(1 + r, standard30N))) / (Math.pow(1 + r, standard30N) - 1);

      const totalIoPaid = ioPayment * (ioYears * 12);
      const totalRecastPaid = recastPayment * m;
      const totalIoLifetimeCost = totalIoPaid + totalRecastPaid;
      const standardLifetimeCost = standard30Payment * standard30N;
      const paymentShock = ((recastPayment - ioPayment) / ioPayment) * 100;

      return {
        primaryValue: `$${ioPayment.toFixed(2)}/mo`,
        primaryLabel: `Initial Interest-Only Payment (Years 1 to ${ioYears})`,
        secondaryMetrics: [
          { label: `Recast Payment (Years ${ioYears + 1} to ${totalYears})`, value: `$${recastPayment.toFixed(2)}/mo` },
          { label: 'Payment Shock Increase', value: `+${paymentShock.toFixed(1)}%` },
          { label: 'Standard 30-Yr Fixed Comparison', value: `$${standard30Payment.toFixed(2)}/mo` },
          { label: 'Initial IO Period Savings', value: `$${(standard30Payment - ioPayment).toFixed(2)}/mo` },
          { label: 'Total Lifetime Interest (IO Loan)', value: `$${Math.round(totalIoLifetimeCost - P).toLocaleString('en-US')}` },
          { label: 'Standard Loan Lifetime Interest', value: `$${Math.round(standardLifetimeCost - P).toLocaleString('en-US')}` }
        ],
        explanation: `During the first ${ioYears} years, you pay only interest at $${ioPayment.toFixed(2)}/mo without building equity. In year ${ioYears + 1}, the loan recasts over the remaining ${amortYears} years, jumping to $${recastPayment.toFixed(2)}/mo (+${paymentShock.toFixed(1)}% payment shock).`
      };
    }
  },
  {
    id: 'debt-payoff-avalanche-calc',
    name: 'Debt Avalanche vs Snowball Payoff Calculator',
    category: 'finance',
    subCategory: 'Debt & Budgeting',
    description: 'Calculate payoff timeline and interest savings comparing the Debt Avalanche method (highest APR first) against the Debt Snowball method (lowest balance first).',
    formula: 'Avalanche = Sort by highest APR; Snowball = Sort by lowest Balance; Roll min payments into focus debt.',
    inputs: [
      { id: 'debt1Balance', label: 'Credit Card 1 Balance ($)', type: 'number', defaultValue: 6500, min: 0, max: 100000, step: 100 },
      { id: 'debt1Rate', label: 'Credit Card 1 APR (%)', type: 'number', defaultValue: 24.99, min: 0, max: 40, step: 0.1 },
      { id: 'debt1Min', label: 'Credit Card 1 Min Payment ($)', type: 'number', defaultValue: 160, min: 10, max: 2000, step: 10 },
      { id: 'debt2Balance', label: 'Auto / Personal Loan Balance ($)', type: 'number', defaultValue: 12000, min: 0, max: 100000, step: 250 },
      { id: 'debt2Rate', label: 'Auto / Personal Loan APR (%)', type: 'number', defaultValue: 8.5, min: 0, max: 40, step: 0.1 },
      { id: 'debt2Min', label: 'Auto / Personal Loan Min ($)', type: 'number', defaultValue: 280, min: 10, max: 2000, step: 10 },
      { id: 'debt3Balance', label: 'Student Loan Balance ($)', type: 'number', defaultValue: 18000, min: 0, max: 150000, step: 500 },
      { id: 'debt3Rate', label: 'Student Loan APR (%)', type: 'number', defaultValue: 5.8, min: 0, max: 40, step: 0.1 },
      { id: 'debt3Min', label: 'Student Loan Min ($)', type: 'number', defaultValue: 210, min: 10, max: 2000, step: 10 },
      { id: 'extraPayment', label: 'Extra Monthly Cash For Debt ($)', type: 'number', defaultValue: 300, min: 0, max: 5000, step: 25 }
    ],
    calculate: (inputs) => {
      const d1 = { bal: Number(inputs.debt1Balance) || 0, rate: Number(inputs.debt1Rate) || 0, min: Number(inputs.debt1Min) || 0 };
      const d2 = { bal: Number(inputs.debt2Balance) || 0, rate: Number(inputs.debt2Rate) || 0, min: Number(inputs.debt2Min) || 0 };
      const d3 = { bal: Number(inputs.debt3Balance) || 0, rate: Number(inputs.debt3Rate) || 0, min: Number(inputs.debt3Min) || 0 };
      const extra = Number(inputs.extraPayment) || 0;

      const totalBalance = d1.bal + d2.bal + d3.bal;
      const totalMin = d1.min + d2.min + d3.min;
      const totalMonthlyBudget = totalMin + extra;

      // Avalanche simulation (order: CC1 @ 24.99%, Loan2 @ 8.5%, Student @ 5.8%)
      const simulate = (debtsArray: { bal: number; rate: number; min: number }[]) => {
        let debts = debtsArray.map(d => ({ ...d }));
        let months = 0;
        let totalInterest = 0;
        while (debts.some(d => d.bal > 0.01) && months < 600) {
          months++;
          let availableExtra = extra;
          // Apply interest and min payments
          for (let d of debts) {
            if (d.bal > 0) {
              const int = d.bal * (d.rate / 100 / 12);
              totalInterest += int;
              d.bal += int;
              const pay = Math.min(d.bal, d.min);
              d.bal -= pay;
            }
          }
          // Apply extra payment + rolled over minimums to highest priority debt
          for (let d of debts) {
            if (d.bal > 0 && availableExtra > 0) {
              const extraPay = Math.min(d.bal, availableExtra);
              d.bal -= extraPay;
              availableExtra -= extraPay;
            }
          }
        }
        return { months, totalInterest };
      };

      const avalanche = simulate([d1, d2, d3].sort((a, b) => b.rate - a.rate));
      const snowball = simulate([d1, d2, d3].sort((a, b) => a.bal - b.bal));
      const savings = Math.max(0, snowball.totalInterest - avalanche.totalInterest);

      return {
        primaryValue: `${avalanche.months} Months (${(avalanche.months / 12).toFixed(1)} Yrs)`,
        primaryLabel: 'Debt-Free Timeline (Avalanche Method)',
        secondaryMetrics: [
          { label: 'Total Starting Debt', value: `$${totalBalance.toLocaleString('en-US')}` },
          { label: 'Total Monthly Budget', value: `$${totalMonthlyBudget.toFixed(2)}/mo` },
          { label: 'Avalanche Total Interest', value: `$${Math.round(avalanche.totalInterest).toLocaleString('en-US')}` },
          { label: 'Snowball Payoff Timeline', value: `${snowball.months} Months (${(snowball.months / 12).toFixed(1)} Yrs)` },
          { label: 'Snowball Total Interest', value: `$${Math.round(snowball.totalInterest).toLocaleString('en-US')}` },
          { label: 'Avalanche Interest Saved', value: `$${Math.round(savings).toLocaleString('en-US')}` }
        ],
        explanation: `With a total debt of $${totalBalance.toLocaleString()} and a monthly budget of $${totalMonthlyBudget}/mo, the Debt Avalanche method clears all balances in ${avalanche.months} months while saving $${Math.round(savings).toLocaleString()} in interest over the Snowball method.`
      };
    }
  },
  {
    id: 'student-loan-repayment-calc',
    name: 'Student Loan Repayment & SAVE/IDR Calculator',
    category: 'finance',
    subCategory: 'Student & Education',
    description: 'Compare standard 10-year repayment against income-driven repayment plans (SAVE/IDR) and calculate total interest paid and loan forgiveness timeline.',
    formula: 'Standard = P * [r(1+r)^120] / [(1+r)^120 - 1]; IDR = max(0, (AGI - 2.25 * FPL) * 0.05 / 12)',
    inputs: [
      { id: 'totalLoanBalance', label: 'Total Federal Student Loan Balance ($)', type: 'number', defaultValue: 45000, min: 1000, max: 500000, step: 1000 },
      { id: 'avgInterestRate', label: 'Weighted Average Interest Rate (%)', type: 'number', defaultValue: 5.8, min: 1, max: 15, step: 0.1 },
      { id: 'adjustedGrossIncome', label: 'Annual Adjusted Gross Income ($)', type: 'number', defaultValue: 55000, min: 10000, max: 500000, step: 2500 },
      { id: 'familySize', label: 'Family Size (1-8)', type: 'number', defaultValue: 1, min: 1, max: 8, step: 1 },
      { id: 'expectedIncomeGrowth', label: 'Expected Annual Income Growth (%)', type: 'number', defaultValue: 3.5, min: 0, max: 15, step: 0.5 }
    ],
    calculate: (inputs) => {
      const balance = Number(inputs.totalLoanBalance) || 45000;
      const rate = Number(inputs.avgInterestRate) || 5.8;
      const agi = Number(inputs.adjustedGrossIncome) || 55000;
      const size = Number(inputs.familySize) || 1;

      // 2024 Federal Poverty Level: $15,060 for 1 person + $5,380 per additional person
      const fpl = 15060 + (size - 1) * 5380;
      const discretionaryIncome = Math.max(0, agi - 2.25 * fpl);

      // SAVE plan: 5% of discretionary income for undergrad loans
      const saveMonthlyPayment = (discretionaryIncome * 0.05) / 12;

      // Standard 10-year plan (120 months)
      const r = rate / 100 / 12;
      const n = 120;
      const standardMonthly = (balance * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const standardTotalInterest = standardMonthly * n - balance;

      return {
        primaryValue: `$${saveMonthlyPayment.toFixed(2)}/mo`,
        primaryLabel: 'Estimated SAVE / IDR Monthly Payment',
        secondaryMetrics: [
          { label: 'Standard 10-Year Payment', value: `$${standardMonthly.toFixed(2)}/mo` },
          { label: 'Monthly Payment Difference', value: `-$${Math.max(0, standardMonthly - saveMonthlyPayment).toFixed(2)}/mo` },
          { label: '225% Poverty Level Protected Income', value: `$${Math.round(2.25 * fpl).toLocaleString('en-US')}/yr` },
          { label: 'Discretionary Income', value: `$${Math.round(discretionaryIncome).toLocaleString('en-US')}/yr` },
          { label: 'Standard 10-Yr Total Interest', value: `$${Math.round(standardTotalInterest).toLocaleString('en-US')}` },
          { label: 'Forgiveness Term (SAVE)', value: '20 Years (Undergrad) / 25 Years (Grad)' }
        ],
        explanation: `Under the SAVE income-driven repayment plan with an AGI of $${agi.toLocaleString()} for a family of ${size}, your estimated payment is $${saveMonthlyPayment.toFixed(2)}/mo compared to $${standardMonthly.toFixed(2)}/mo under the Standard 10-Year plan.`
      };
    }
  },
  {
    id: 'heloc-payment-draw-calc',
    name: 'HELOC Payment & Draw Period Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate interest-only monthly payments during the HELOC draw period and the recast principal+interest payments in the repayment period.',
    formula: 'Draw Payment = Balance * (r / 12); Repayment = Balance * [r(1+r)^m] / [(1+r)^m - 1]',
    inputs: [
      { id: 'creditLineDrawn', label: 'HELOC Line Balance Drawn ($)', type: 'number', defaultValue: 75000, min: 5000, max: 1000000, step: 5000 },
      { id: 'interestRate', label: 'Variable Interest Rate APR (%)', type: 'number', defaultValue: 8.75, min: 1, max: 25, step: 0.125 },
      { id: 'drawPeriodYears', label: 'Draw Period Duration (Years)', type: 'number', defaultValue: 10, min: 1, max: 15, step: 1 },
      { id: 'repaymentPeriodYears', label: 'Repayment Period Duration (Years)', type: 'number', defaultValue: 20, min: 5, max: 30, step: 1 }
    ],
    calculate: (inputs) => {
      const drawn = Number(inputs.creditLineDrawn) || 75000;
      const rate = Number(inputs.interestRate) || 8.75;
      const drawYrs = Number(inputs.drawPeriodYears) || 10;
      const repayYrs = Number(inputs.repaymentPeriodYears) || 20;

      const r = rate / 100 / 12;
      const drawMonthly = (drawn * (rate / 100)) / 12;

      const m = repayYrs * 12;
      const repayMonthly = (drawn * (r * Math.pow(1 + r, m))) / (Math.pow(1 + r, m) - 1);

      const totalDrawInterest = drawMonthly * (drawYrs * 12);
      const totalRepayPaid = repayMonthly * m;
      const totalRepayInterest = totalRepayPaid - drawn;
      const totalLifetimeInterest = totalDrawInterest + totalRepayInterest;

      return {
        primaryValue: `$${drawMonthly.toFixed(2)}/mo`,
        primaryLabel: `Draw Period Payment (Interest-Only, Years 1 to ${drawYrs})`,
        secondaryMetrics: [
          { label: `Repayment Period Payment (Years ${drawYrs + 1} to ${drawYrs + repayYrs})`, value: `$${repayMonthly.toFixed(2)}/mo` },
          { label: 'Payment Increase at Recast', value: `+$${(repayMonthly - drawMonthly).toFixed(2)}/mo (+${(((repayMonthly - drawMonthly) / drawMonthly) * 100).toFixed(0)}%)` },
          { label: 'Total Draw Period Interest', value: `$${Math.round(totalDrawInterest).toLocaleString('en-US')}` },
          { label: 'Total Repayment Period Interest', value: `$${Math.round(totalRepayInterest).toLocaleString('en-US')}` },
          { label: 'Total Lifetime HELOC Interest', value: `$${Math.round(totalLifetimeInterest).toLocaleString('en-US')}` },
          { label: 'Total Cash Outlay', value: `$${Math.round(totalLifetimeInterest + drawn).toLocaleString('en-US')}` }
        ],
        explanation: `With a drawn HELOC balance of $${drawn.toLocaleString()} at ${rate}% APR, you will pay $${drawMonthly.toFixed(2)}/mo interest-only during the ${drawYrs}-year draw window. When repayment begins, your monthly payment will jump to $${repayMonthly.toFixed(2)}/mo for ${repayYrs} years.`
      };
    }
  },
  {
    id: 'personal-loan-installment-calc',
    name: 'Personal Loan & Debt Consolidation Calculator',
    category: 'finance',
    subCategory: 'Auto & Personal Loans',
    description: 'Calculate fixed monthly payments, total interest charges, and loan amortization for unsecured personal loans and credit consolidation.',
    formula: 'Payment = P * [r(1+r)^n] / [(1+r)^n - 1]; Total Interest = (Payment * n) - P',
    inputs: [
      { id: 'loanAmount', label: 'Loan Amount ($)', type: 'number', defaultValue: 20000, min: 1000, max: 100000, step: 500 },
      { id: 'interestRate', label: 'Fixed APR (%)', type: 'number', defaultValue: 10.99, min: 3, max: 36, step: 0.1 },
      { id: 'termMonths', label: 'Loan Term (Months)', type: 'number', defaultValue: 36, min: 6, max: 84, step: 6 },
      { id: 'originationFeePercent', label: 'Origination Fee (%)', type: 'number', defaultValue: 3.0, min: 0, max: 10, step: 0.25 }
    ],
    calculate: (inputs) => {
      const amount = Number(inputs.loanAmount) || 20000;
      const rate = Number(inputs.interestRate) || 10.99;
      const months = Number(inputs.termMonths) || 36;
      const origFeePct = Number(inputs.originationFeePercent) || 3.0;

      const origFee = amount * (origFeePct / 100);
      const netDisbursed = amount - origFee;

      const r = rate / 100 / 12;
      const monthlyPayment = (amount * (r * Math.pow(1 + r, months))) / (Math.pow(1 + r, months) - 1);
      const totalPaid = monthlyPayment * months;
      const totalInterest = totalPaid - amount;

      return {
        primaryValue: `$${monthlyPayment.toFixed(2)}/mo`,
        primaryLabel: 'Fixed Monthly Payment',
        secondaryMetrics: [
          { label: 'Net Disbursed Cash', value: `$${netDisbursed.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
          { label: 'Origination Fee Deducted', value: `$${origFee.toFixed(2)} (${origFeePct}%)` },
          { label: 'Total Interest Over Term', value: `$${totalInterest.toFixed(2)}` },
          { label: 'Total Cost of Borrowing', value: `$${(totalInterest + origFee).toFixed(2)}` },
          { label: 'Total Amount Repaid', value: `$${totalPaid.toFixed(2)}` },
          { label: 'Payoff Duration', value: `${months} Months (${(months / 12).toFixed(1)} Years)` }
        ],
        explanation: `A $${amount.toLocaleString()} personal loan at ${rate}% APR over ${months} months requires a monthly payment of $${monthlyPayment.toFixed(2)}. Factoring in a ${origFeePct}% origination fee ($${origFee.toFixed(2)}), you receive $${netDisbursed.toLocaleString()} in hand and pay $${totalInterest.toFixed(2)} in interest.`
      };
    }
  },
  {
    id: 'boat-rv-loan-financing-calc',
    name: 'Boat, Yacht & RV Loan Calculator',
    category: 'finance',
    subCategory: 'Auto & Personal Loans',
    description: 'Calculate specialized long-term recreational vehicle and marine boat financing payments with extended 10-20 year amortizations.',
    formula: 'Payment = (Price - Down) * [r(1+r)^n] / [(1+r)^n - 1]',
    inputs: [
      { id: 'purchasePrice', label: 'Boat or RV Purchase Price ($)', type: 'number', defaultValue: 85000, min: 5000, max: 2000000, step: 2500 },
      { id: 'downPaymentPercent', label: 'Down Payment (%)', type: 'number', defaultValue: 15, min: 0, max: 50, step: 5 },
      { id: 'interestRate', label: 'Annual Interest Rate (%)', type: 'number', defaultValue: 7.99, min: 2, max: 20, step: 0.1 },
      { id: 'termYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 15, min: 3, max: 25, step: 1 }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.purchasePrice) || 85000;
      const dpPct = Number(inputs.downPaymentPercent) || 15;
      const rate = Number(inputs.interestRate) || 7.99;
      const years = Number(inputs.termYears) || 15;

      const dp = price * (dpPct / 100);
      const principal = price - dp;
      const r = rate / 100 / 12;
      const n = years * 12;

      const monthlyPayment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const totalPaid = monthlyPayment * n;
      const totalInterest = totalPaid - principal;

      return {
        primaryValue: `$${monthlyPayment.toFixed(2)}/mo`,
        primaryLabel: 'Monthly Boat / RV Loan Payment',
        secondaryMetrics: [
          { label: 'Amount Financed', value: `$${Math.round(principal).toLocaleString('en-US')}` },
          { label: 'Down Payment Required', value: `$${Math.round(dp).toLocaleString('en-US')} (${dpPct}%)` },
          { label: 'Total Loan Interest', value: `$${Math.round(totalInterest).toLocaleString('en-US')}` },
          { label: 'Total Principal + Interest', value: `$${Math.round(totalPaid).toLocaleString('en-US')}` },
          { label: 'Loan Term', value: `${years} Years (${n} Months)` }
        ],
        explanation: `Financing $${Math.round(principal).toLocaleString()} for an RV/boat at ${rate}% APR over a ${years}-year term produces a $${monthlyPayment.toFixed(2)}/mo payment with $${Math.round(totalInterest).toLocaleString()} in total interest charges.`
      };
    }
  },
  {
    id: 'credit-card-minimum-payment-calc',
    name: 'Credit Card Minimum Payment & Payoff Calculator',
    category: 'finance',
    subCategory: 'Debt & Budgeting',
    description: 'See the true cost and decades of interest caused by paying only the credit card minimum payment vs paying a fixed accelerated amount.',
    formula: 'Min Payment = max($25, 1% Balance + Monthly Interest); Payoff = Logarithmic amortization recurrence',
    inputs: [
      { id: 'currentBalance', label: 'Credit Card Balance ($)', type: 'number', defaultValue: 7500, min: 100, max: 100000, step: 100 },
      { id: 'interestRate', label: 'Card APR (%)', type: 'number', defaultValue: 24.99, min: 5, max: 40, step: 0.1 },
      { id: 'minPercent', label: 'Minimum Payment Rule (%)', type: 'number', defaultValue: 2.0, min: 1, max: 5, step: 0.5 },
      { id: 'fixedPayment', label: 'Alternative Fixed Payment ($/mo)', type: 'number', defaultValue: 250, min: 50, max: 2000, step: 25 }
    ],
    calculate: (inputs) => {
      const bal = Number(inputs.currentBalance) || 7500;
      const rate = Number(inputs.interestRate) || 24.99;
      const minPct = Number(inputs.minPercent) || 2.0;
      const fixed = Number(inputs.fixedPayment) || 250;
      const r = rate / 100 / 12;

      // Minimum payment simulation
      let minBal = bal;
      let minMonths = 0;
      let minTotalInterest = 0;
      while (minBal > 1 && minMonths < 600) {
        minMonths++;
        const int = minBal * r;
        minTotalInterest += int;
        minBal += int;
        const payment = Math.max(25, minBal * (minPct / 100));
        minBal -= Math.min(minBal, payment);
      }

      // Fixed payment simulation
      let fixedBal = bal;
      let fixedMonths = 0;
      let fixedTotalInterest = 0;
      while (fixedBal > 1 && fixedMonths < 600) {
        fixedMonths++;
        const int = fixedBal * r;
        fixedTotalInterest += int;
        fixedBal += int;
        fixedBal -= Math.min(fixedBal, fixed);
      }

      const interestSaved = Math.max(0, minTotalInterest - fixedTotalInterest);
      const monthsSaved = Math.max(0, minMonths - fixedMonths);

      return {
        primaryValue: `${fixedMonths} Months (${(fixedMonths / 12).toFixed(1)} Yrs)`,
        primaryLabel: `Payoff Time at Fixed $${fixed}/mo`,
        secondaryMetrics: [
          { label: 'Minimum Payment Payoff Time', value: minMonths >= 600 ? '> 50 Years' : `${minMonths} Months (${(minMonths / 12).toFixed(1)} Yrs)` },
          { label: 'Minimum Payment Total Interest', value: `$${Math.round(minTotalInterest).toLocaleString('en-US')}` },
          { label: 'Fixed Payment Total Interest', value: `$${Math.round(fixedTotalInterest).toLocaleString('en-US')}` },
          { label: 'Total Interest Saved', value: `$${Math.round(interestSaved).toLocaleString('en-US')}` },
          { label: 'Time Saved to Debt Free', value: `${monthsSaved} Months (${(monthsSaved / 12).toFixed(1)} Yrs)` }
        ],
        explanation: `Paying only minimum payments on a $${bal.toLocaleString()} balance at ${rate}% APR takes ${(minMonths / 12).toFixed(1)} years and costs $${Math.round(minTotalInterest).toLocaleString()} in interest. Paying a fixed $${fixed}/mo eliminates the debt in ${(fixedMonths / 12).toFixed(1)} years, saving $${Math.round(interestSaved).toLocaleString()}.`
      };
    }
  },
  {
    id: 'roth-ira-conversion-calc',
    name: 'Roth IRA Conversion & Tax Impact Calculator',
    category: 'finance',
    subCategory: 'Retirement & Wealth',
    description: 'Calculate the upfront income tax bill of converting a Traditional IRA/401(k) to a Roth IRA and compare cumulative tax-free retirement growth.',
    formula: 'Tax Bill = Conversion Amount * Marginal Tax Rate; Future Roth = Conversion * (1+r)^t (100% Tax Free)',
    inputs: [
      { id: 'conversionAmount', label: 'Amount to Convert to Roth ($)', type: 'number', defaultValue: 50000, min: 1000, max: 1000000, step: 2500 },
      { id: 'currentTaxBracket', label: 'Current Marginal Tax Bracket (%)', type: 'number', defaultValue: 24, min: 10, max: 45, step: 1 },
      { id: 'expectedRetirementTaxBracket', label: 'Expected Retirement Tax Bracket (%)', type: 'number', defaultValue: 22, min: 10, max: 45, step: 1 },
      { id: 'yearsUntilRetirement', label: 'Years Until Retirement (Years)', type: 'number', defaultValue: 20, min: 1, max: 50, step: 1 },
      { id: 'annualReturn', label: 'Expected Annual Portfolio Return (%)', type: 'number', defaultValue: 7.5, min: 1, max: 15, step: 0.25 }
    ],
    calculate: (inputs) => {
      const conv = Number(inputs.conversionAmount) || 50000;
      const currTax = Number(inputs.currentTaxBracket) || 24;
      const retTax = Number(inputs.expectedRetirementTaxBracket) || 22;
      const years = Number(inputs.yearsUntilRetirement) || 20;
      const r = (Number(inputs.annualReturn) || 7.5) / 100;

      const taxDue = conv * (currTax / 100);
      const futureRothValue = conv * Math.pow(1 + r, years);

      // If kept in Traditional IRA
      const futureTradGross = conv * Math.pow(1 + r, years);
      const futureTradTax = futureTradGross * (retTax / 100);
      const futureTradNet = futureTradGross - futureTradTax;

      // Net advantage of Roth conversion (assuming tax paid from separate non-retirement cash)
      const rothAdvantage = futureRothValue - futureTradNet - (taxDue * Math.pow(1 + r, years));

      return {
        primaryValue: `$${Math.round(taxDue).toLocaleString('en-US')}`,
        primaryLabel: 'Immediate Upfront Income Tax Due on Conversion',
        secondaryMetrics: [
          { label: `Future Roth Value at Year ${years} (Tax-Free)`, value: `$${Math.round(futureRothValue).toLocaleString('en-US')}` },
          { label: 'Future Traditional Net Value (After Tax)', value: `$${Math.round(futureTradNet).toLocaleString('en-US')}` },
          { label: 'Future Tax Saved in Retirement', value: `$${Math.round(futureTradTax).toLocaleString('en-US')}` },
          { label: 'Breakeven ROI on Conversion Tax', value: `${((futureRothValue / taxDue) * 100).toFixed(0)}%` },
          { label: 'No RMD Advantage', value: 'Roth IRAs have $0 lifetime RMDs' }
        ],
        explanation: `Converting $${conv.toLocaleString()} at a ${currTax}% tax bracket creates an immediate $${Math.round(taxDue).toLocaleString()} tax bill. In ${years} years at ${inputs.annualReturn}% growth, that $${conv.toLocaleString()} grows to $${Math.round(futureRothValue).toLocaleString()} completely tax-free.`
      };
    }
  },
  {
    id: 'dividend-reinvestment-drip-calc',
    name: 'Dividend Reinvestment (DRIP) & Yield Compounder',
    category: 'finance',
    subCategory: 'Investing & Markets',
    description: 'Model exponential wealth compounding through dividend growth stocks, annual dividend yield, dividend payout growth rate, and automatic DRIP reinvestment.',
    formula: 'A = P*(1+g)^t + Cumulative Reinvested Dividends at compound dividend yield',
    inputs: [
      { id: 'initialInvestment', label: 'Initial Portfolio Value ($)', type: 'number', defaultValue: 25000, min: 1000, max: 5000000, step: 2500 },
      { id: 'annualContribution', label: 'Annual Added Capital ($)', type: 'number', defaultValue: 6000, min: 0, max: 200000, step: 500 },
      { id: 'dividendYield', label: 'Current Annual Dividend Yield (%)', type: 'number', defaultValue: 3.8, min: 0.5, max: 15, step: 0.1 },
      { id: 'dividendGrowthRate', label: 'Annual Dividend Growth Rate (%)', type: 'number', defaultValue: 6.0, min: 0, max: 20, step: 0.5 },
      { id: 'capitalAppreciation', label: 'Annual Stock Price Appreciation (%)', type: 'number', defaultValue: 4.5, min: -10, max: 25, step: 0.5 },
      { id: 'investmentHorizonYears', label: 'Investment Time Horizon (Years)', type: 'number', defaultValue: 25, min: 1, max: 50, step: 1 }
    ],
    calculate: (inputs) => {
      const init = Number(inputs.initialInvestment) || 25000;
      const added = Number(inputs.annualContribution) || 6000;
      const baseYield = (Number(inputs.dividendYield) || 3.8) / 100;
      const divGrowth = (Number(inputs.dividendGrowthRate) || 6.0) / 100;
      const capGrowth = (Number(inputs.capitalAppreciation) || 4.5) / 100;
      const years = Number(inputs.investmentHorizonYears) || 25;

      let portfolioValue = init;
      let currentYield = baseYield;
      let totalDividendsReceived = 0;
      let lastAnnualDividend = 0;

      for (let yr = 1; yr <= years; yr++) {
        const annualDividend = portfolioValue * currentYield;
        totalDividendsReceived += annualDividend;
        lastAnnualDividend = annualDividend;
        portfolioValue = (portfolioValue + annualDividend + added) * (1 + capGrowth);
        currentYield = currentYield * (1 + divGrowth);
      }

      const yieldOnCost = (lastAnnualDividend / (init + added * years)) * 100;

      return {
        primaryValue: `$${Math.round(portfolioValue).toLocaleString('en-US')}`,
        primaryLabel: `Total Portfolio Value with DRIP in Year ${years}`,
        secondaryMetrics: [
          { label: `Annual Dividend Income (Year ${years})`, value: `$${Math.round(lastAnnualDividend).toLocaleString('en-US')}/yr` },
          { label: 'Monthly Passive Dividend Income', value: `$${Math.round(lastAnnualDividend / 12).toLocaleString('en-US')}/mo` },
          { label: 'Cumulative Dividends Reinvested', value: `$${Math.round(totalDividendsReceived).toLocaleString('en-US')}` },
          { label: 'Total Principal Invested', value: `$${(init + added * years).toLocaleString('en-US')}` },
          { label: 'Yield on Cost (YOC)', value: `${yieldOnCost.toFixed(2)}%` }
        ],
        explanation: `Reinvesting dividends over ${years} years with an initial $${init.toLocaleString()} plus $${added.toLocaleString()}/yr contributions turns your portfolio into $${Math.round(portfolioValue).toLocaleString()}, generating $${Math.round(lastAnnualDividend / 12).toLocaleString()}/month in passive income with a ${yieldOnCost.toFixed(2)}% Yield on Cost.`
      };
    }
  },
  {
    id: 'bond-yield-to-maturity-ytm-calc',
    name: 'Bond Yield to Maturity (YTM) & Pricing Calculator',
    category: 'finance',
    subCategory: 'Investing & Markets',
    description: 'Calculate the accurate Yield to Maturity (YTM), Current Yield, and clean bond market valuation for fixed-coupon corporate and Treasury bonds.',
    formula: 'YTM Approx = [C + (F - P)/n] / [(F + P)/2]; Current Yield = (Coupon Rate * Face Value) / Price',
    inputs: [
      { id: 'faceValue', label: 'Bond Par / Face Value ($)', type: 'number', defaultValue: 1000, min: 100, max: 100000, step: 100 },
      { id: 'currentPrice', label: 'Current Market Price ($)', type: 'number', defaultValue: 950, min: 100, max: 200000, step: 10 },
      { id: 'annualCouponRate', label: 'Annual Coupon Interest Rate (%)', type: 'number', defaultValue: 5.0, min: 0, max: 25, step: 0.1 },
      { id: 'yearsToMaturity', label: 'Years to Maturity (Years)', type: 'number', defaultValue: 10, min: 0.5, max: 40, step: 0.5 },
      { id: 'paymentFrequency', label: 'Coupon Payment Frequency (1=Annual, 2=Semi)', type: 'number', defaultValue: 2, min: 1, max: 2, step: 1 }
    ],
    calculate: (inputs) => {
      const F = Number(inputs.faceValue) || 1000;
      const P = Number(inputs.currentPrice) || 950;
      const cr = (Number(inputs.annualCouponRate) || 5.0) / 100;
      const n = Number(inputs.yearsToMaturity) || 10;
      const freq = Number(inputs.paymentFrequency) || 2;

      const C = F * cr;
      const currentYield = (C / P) * 100;
      const approxYTM = ((C + (F - P) / n) / ((F + P) / 2)) * 100;
      const discountOrPremium = P < F ? 'Trading at Discount' : P > F ? 'Trading at Premium' : 'Trading at Par';
      const totalCoupons = C * n;
      const totalGain = totalCoupons + (F - P);

      return {
        primaryValue: `${approxYTM.toFixed(2)}%`,
        primaryLabel: 'Yield to Maturity (YTM)',
        secondaryMetrics: [
          { label: 'Current Yield', value: `${currentYield.toFixed(2)}%` },
          { label: 'Annual Coupon Payment', value: `$${C.toFixed(2)}/yr ($${(C / freq).toFixed(2)} per payment)` },
          { label: 'Pricing Status', value: discountOrPremium },
          { label: 'Capital Gain/Loss at Maturity', value: `$${(F - P).toFixed(2)}` },
          { label: 'Total Lifetime Cash Flow', value: `$${totalGain.toFixed(2)}` }
        ],
        explanation: `A bond with a face value of $${F} priced at $${P} with a ${inputs.annualCouponRate}% coupon maturing in ${n} years has an annual current yield of ${currentYield.toFixed(2)}% and an overall Yield to Maturity (YTM) of ${approxYTM.toFixed(2)}%.`
      };
    }
  },
  {
    id: 'rule-of-72-doubling-calc',
    name: 'Rule of 72, 114 & 144 Investment Doubling Calculator',
    category: 'finance',
    subCategory: 'Investing & Markets',
    description: 'Calculate the exact number of years required to double, triple (Rule of 114), or quadruple (Rule of 144) your money at any compounding interest rate.',
    formula: 'Years to Double = 72 / Rate; Exact = ln(2) / ln(1 + r)',
    inputs: [
      { id: 'interestRate', label: 'Annual Return / Interest Rate (%)', type: 'number', defaultValue: 8.0, min: 0.1, max: 50, step: 0.1 },
      { id: 'startingPrincipal', label: 'Starting Principal ($)', type: 'number', defaultValue: 10000, min: 100, max: 10000000, step: 500 }
    ],
    calculate: (inputs) => {
      const rate = Number(inputs.interestRate) || 8.0;
      const p = Number(inputs.startingPrincipal) || 10000;
      const r = rate / 100;

      const ruleOf72Years = 72 / rate;
      const exactDoubleYears = Math.log(2) / Math.log(1 + r);
      const ruleOf114Years = 114 / rate;
      const exactTripleYears = Math.log(3) / Math.log(1 + r);
      const ruleOf144Years = 144 / rate;
      const exactQuadYears = Math.log(4) / Math.log(1 + r);

      return {
        primaryValue: `${exactDoubleYears.toFixed(1)} Years`,
        primaryLabel: 'Time to Double Principal (2x)',
        secondaryMetrics: [
          { label: 'Rule of 72 Approximation', value: `${ruleOf72Years.toFixed(1)} Years` },
          { label: 'Time to Triple Principal (3x)', value: `${exactTripleYears.toFixed(1)} Years (Rule of 114: ${ruleOf114Years.toFixed(1)} yrs)` },
          { label: 'Time to Quadruple Principal (4x)', value: `${exactQuadYears.toFixed(1)} Years (Rule of 144: ${ruleOf144Years.toFixed(1)} yrs)` },
          { label: 'Doubled Value', value: `$${(p * 2).toLocaleString('en-US')}` },
          { label: 'Quadrupled Value', value: `$${(p * 4).toLocaleString('en-US')}` }
        ],
        explanation: `At an annual return of ${rate}%, your money doubles every ${exactDoubleYears.toFixed(1)} years. A $${p.toLocaleString()} investment becomes $${(p * 2).toLocaleString()} in ~${exactDoubleYears.toFixed(1)} years and $${(p * 4).toLocaleString()} in ~${exactQuadYears.toFixed(1)} years.`
      };
    }
  },
  {
    id: 'present-value-discount-calc',
    name: 'Present Value (PV) & Future Value Discount Calculator',
    category: 'finance',
    subCategory: 'Investing & Markets',
    description: 'Calculate the current worth of a future sum of money given a specific discount rate and inflation/opportunity cost assumption.',
    formula: 'PV = FV / (1 + r)^n; Discount Factor = 1 / (1 + r)^n',
    inputs: [
      { id: 'futureValue', label: 'Future Value Target ($)', type: 'number', defaultValue: 100000, min: 100, max: 10000000, step: 1000 },
      { id: 'discountRate', label: 'Annual Discount / Hurdle Rate (%)', type: 'number', defaultValue: 7.0, min: 0.1, max: 30, step: 0.25 },
      { id: 'years', label: 'Time Horizon (Years)', type: 'number', defaultValue: 10, min: 0.5, max: 60, step: 0.5 }
    ],
    calculate: (inputs) => {
      const fv = Number(inputs.futureValue) || 100000;
      const rate = Number(inputs.discountRate) || 7.0;
      const n = Number(inputs.years) || 10;
      const r = rate / 100;

      const pv = fv / Math.pow(1 + r, n);
      const discountFactor = 1 / Math.pow(1 + r, n);
      const totalDiscount = fv - pv;

      return {
        primaryValue: `$${Math.round(pv).toLocaleString('en-US')}`,
        primaryLabel: 'Present Value (Today\'s Equivalent Worth)',
        secondaryMetrics: [
          { label: 'Future Value', value: `$${fv.toLocaleString('en-US')}` },
          { label: 'Discount Factor', value: discountFactor.toFixed(4) },
          { label: 'Time Value Discount Amount', value: `$${Math.round(totalDiscount).toLocaleString('en-US')}` },
          { label: 'Discount Rate', value: `${rate}% per year` },
          { label: 'Time Horizon', value: `${n} Years` }
        ],
        explanation: `Receiving $${fv.toLocaleString()} in ${n} years at a ${rate}% discount rate is equivalent to receiving $${Math.round(pv).toLocaleString()} today in present value purchasing power.`
      };
    }
  },
  {
    id: 'business-break-even-calc',
    name: 'Business Break-Even & Unit Economics Calculator',
    category: 'finance',
    subCategory: 'Business & Real Estate',
    description: 'Calculate the exact unit sales volume and dollar revenue required to cover fixed overhead costs and achieve operating profitability.',
    formula: 'Break-Even Units = Fixed Costs / (Price - Variable Cost); Margin % = Contribution Margin / Price',
    inputs: [
      { id: 'fixedCosts', label: 'Total Monthly Fixed Costs ($)', type: 'number', defaultValue: 15000, min: 100, max: 1000000, step: 500 },
      { id: 'pricePerUnit', label: 'Selling Price Per Unit ($)', type: 'number', defaultValue: 75, min: 0.5, max: 50000, step: 1 },
      { id: 'variableCostPerUnit', label: 'Variable Cost Per Unit ($)', type: 'number', defaultValue: 25, min: 0, max: 50000, step: 1 },
      { id: 'targetProfit', label: 'Target Monthly Operating Profit ($)', type: 'number', defaultValue: 5000, min: 0, max: 500000, step: 500 }
    ],
    calculate: (inputs) => {
      const fixed = Number(inputs.fixedCosts) || 15000;
      const price = Number(inputs.pricePerUnit) || 75;
      const vc = Number(inputs.variableCostPerUnit) || 25;
      const target = Number(inputs.targetProfit) || 5000;

      const unitContributionMargin = Math.max(0.01, price - vc);
      const contributionMarginRatio = (unitContributionMargin / price) * 100;
      const breakEvenUnits = Math.ceil(fixed / unitContributionMargin);
      const breakEvenRevenue = breakEvenUnits * price;

      const targetUnits = Math.ceil((fixed + target) / unitContributionMargin);
      const targetRevenue = targetUnits * price;

      return {
        primaryValue: `${breakEvenUnits.toLocaleString('en-US')} Units`,
        primaryLabel: 'Monthly Break-Even Unit Volume',
        secondaryMetrics: [
          { label: 'Break-Even Revenue', value: `$${breakEvenRevenue.toLocaleString('en-US')}/mo` },
          { label: 'Unit Contribution Margin', value: `$${unitContributionMargin.toFixed(2)}/unit` },
          { label: 'Contribution Margin Ratio', value: `${contributionMarginRatio.toFixed(1)}%` },
          { label: `Units Needed for $${target.toLocaleString()} Profit`, value: `${targetUnits.toLocaleString('en-US')} Units` },
          { label: `Revenue Needed for $${target.toLocaleString()} Profit`, value: `$${targetRevenue.toLocaleString('en-US')}/mo` }
        ],
        explanation: `With fixed costs of $${fixed.toLocaleString()}/mo, a $${price} selling price, and $${vc} variable cost ($${unitContributionMargin.toFixed(2)} margin), you must sell ${breakEvenUnits} units ($${breakEvenRevenue.toLocaleString()} in revenue) every month to break even.`
      };
    }
  },
  {
    id: 'salary-hourly-paycheck-converter-calc',
    name: 'Salary to Hourly Paycheck & Overtime Converter',
    category: 'finance',
    subCategory: 'Salary & Taxes',
    description: 'Convert between annual salary, monthly, bi-weekly, weekly, and hourly pay rates including overtime 1.5x time-and-a-half multipliers.',
    formula: 'Hourly = Annual / (Weeks * HoursPerWeek); Biweekly = Annual / 26; Monthly = Annual / 12',
    inputs: [
      { id: 'annualSalary', label: 'Annual Gross Salary ($)', type: 'number', defaultValue: 78000, min: 5000, max: 2000000, step: 1000 },
      { id: 'hoursPerWeek', label: 'Standard Hours Per Week', type: 'number', defaultValue: 40, min: 1, max: 80, step: 1 },
      { id: 'weeksPerYear', label: 'Working Weeks Per Year', type: 'number', defaultValue: 52, min: 1, max: 52, step: 1 },
      { id: 'overtimeHours', label: 'Average Overtime Hours / Week', type: 'number', defaultValue: 5, min: 0, max: 40, step: 1 }
    ],
    calculate: (inputs) => {
      const salary = Number(inputs.annualSalary) || 78000;
      const hrs = Number(inputs.hoursPerWeek) || 40;
      const weeks = Number(inputs.weeksPerYear) || 52;
      const otHrs = Number(inputs.overtimeHours) || 0;

      const baseHourlyRate = salary / (weeks * hrs);
      const otHourlyRate = baseHourlyRate * 1.5;
      const annualOtEarnings = otHrs * otHourlyRate * weeks;
      const totalGrossWithOt = salary + annualOtEarnings;

      const monthlyGross = totalGrossWithOt / 12;
      const biweeklyGross = totalGrossWithOt / 26;
      const weeklyGross = totalGrossWithOt / 52;
      const dailyGross = totalGrossWithOt / (weeks * 5);

      return {
        primaryValue: `$${baseHourlyRate.toFixed(2)}/hr`,
        primaryLabel: 'Base Hourly Rate Equivalent',
        secondaryMetrics: [
          { label: 'Bi-Weekly Paycheck (Gross)', value: `$${biweeklyGross.toFixed(2)}` },
          { label: 'Monthly Gross Paycheck', value: `$${monthlyGross.toFixed(2)}` },
          { label: 'Weekly Gross Paycheck', value: `$${weeklyGross.toFixed(2)}` },
          { label: 'Daily Gross Equivalent (8h)', value: `$${dailyGross.toFixed(2)}` },
          { label: 'Overtime Rate (1.5x)', value: `$${otHourlyRate.toFixed(2)}/hr` },
          { label: 'Total Annual Gross with Overtime', value: `$${Math.round(totalGrossWithOt).toLocaleString('en-US')}` }
        ],
        explanation: `An annual salary of $${salary.toLocaleString()} working ${hrs} hrs/week equates to $${baseHourlyRate.toFixed(2)}/hour. With ${otHrs} hrs of 1.5x overtime per week, your total earnings rise to $${Math.round(totalGrossWithOt).toLocaleString()}/year ($${biweeklyGross.toFixed(2)} bi-weekly).`
      };
    }
  },
  {
    id: 'emergency-fund-runway-calc',
    name: 'Emergency Fund & Monthly Runway Target Calculator',
    category: 'finance',
    subCategory: 'Debt & Budgeting',
    description: 'Calculate your exact liquid emergency cash reserve requirements for 3, 6, 9, or 12 months of non-negotiable living expenses.',
    formula: 'Target = Monthly Essentials * Months; Runway = Current Savings / Monthly Essentials',
    inputs: [
      { id: 'housingCost', label: 'Rent / Mortgage & Property Tax ($/mo)', type: 'number', defaultValue: 1800, min: 0, max: 20000, step: 50 },
      { id: 'utilitiesGroceries', label: 'Utilities, Groceries & Food ($/mo)', type: 'number', defaultValue: 900, min: 0, max: 10000, step: 50 },
      { id: 'insuranceHealth', label: 'Health, Auto & Life Insurance ($/mo)', type: 'number', defaultValue: 450, min: 0, max: 5000, step: 25 },
      { id: 'debtMinimums', label: 'Minimum Debt Payments ($/mo)', type: 'number', defaultValue: 350, min: 0, max: 10000, step: 25 },
      { id: 'otherEssentials', label: 'Transport & Essential Spending ($/mo)', type: 'number', defaultValue: 300, min: 0, max: 5000, step: 25 },
      { id: 'currentLiquidSavings', label: 'Current High-Yield Savings ($)', type: 'number', defaultValue: 12000, min: 0, max: 500000, step: 500 }
    ],
    calculate: (inputs) => {
      const housing = Number(inputs.housingCost) || 1800;
      const util = Number(inputs.utilitiesGroceries) || 900;
      const ins = Number(inputs.insuranceHealth) || 450;
      const debt = Number(inputs.debtMinimums) || 350;
      const other = Number(inputs.otherEssentials) || 300;
      const current = Number(inputs.currentLiquidSavings) || 12000;

      const monthlyEssential = housing + util + ins + debt + other;
      const target3Mo = monthlyEssential * 3;
      const target6Mo = monthlyEssential * 6;
      const target9Mo = monthlyEssential * 9;
      const target12Mo = monthlyEssential * 12;

      const currentRunwayMonths = monthlyEssential > 0 ? (current / monthlyEssential).toFixed(1) : '0';
      const shortfall6Mo = Math.max(0, target6Mo - current);

      return {
        primaryValue: `$${target6Mo.toLocaleString('en-US')}`,
        primaryLabel: 'Recommended 6-Month Emergency Fund Target',
        secondaryMetrics: [
          { label: 'Total Essential Expenses', value: `$${monthlyEssential.toLocaleString('en-US')}/mo` },
          { label: 'Current Savings Runway', value: `${currentRunwayMonths} Months` },
          { label: '3-Month Lean Runway Target', value: `$${target3Mo.toLocaleString('en-US')}` },
          { label: '9-Month Single-Income Target', value: `$${target9Mo.toLocaleString('en-US')}` },
          { label: '12-Month Freelance / High-Risk Target', value: `$${target12Mo.toLocaleString('en-US')}` },
          { label: 'Savings Shortfall to 6-Mo Goal', value: shortfall6Mo > 0 ? `$${shortfall6Mo.toLocaleString('en-US')}` : 'Goal Reached!' }
        ],
        explanation: `With essential baseline expenses of $${monthlyEssential.toLocaleString()}/mo, your current $${current.toLocaleString()} savings provides ${currentRunwayMonths} months of survival runway. A recommended 6-month safety net requires $${target6Mo.toLocaleString()}.`
      };
    }
  }
];
