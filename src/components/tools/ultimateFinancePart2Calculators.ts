import { CalculatorDefinition } from './calculatorEngine';

export const ULTIMATE_FINANCE_PART2_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'down-payment-savings-goal-calc',
    name: 'Home Down Payment Savings Goal Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate how much money you need to save each month to reach your target home down payment and closing costs on schedule.',
    formula: 'Monthly Savings = (Target - Current) * (r / [(1+r)^n - 1]) in high-yield account',
    inputs: [
      { id: 'targetHomePrice', label: 'Target Home Price ($)', type: 'number', defaultValue: 450000, min: 50000, max: 5000000, step: 5000 },
      { id: 'downPaymentPercent', label: 'Desired Down Payment (%)', type: 'number', defaultValue: 20, min: 3, max: 100, step: 1 },
      { id: 'closingCostBufferPercent', label: 'Closing Cost Buffer (%)', type: 'number', defaultValue: 3, min: 0, max: 6, step: 0.5 },
      { id: 'currentSavings', label: 'Current Savings Allocated ($)', type: 'number', defaultValue: 15000, min: 0, max: 500000, step: 1000 },
      { id: 'timelineYears', label: 'Savings Timeline (Years)', type: 'number', defaultValue: 3, min: 0.5, max: 10, step: 0.5 },
      { id: 'savingsApy', label: 'HYSA Annual Yield APY (%)', type: 'number', defaultValue: 4.5, min: 0, max: 15, step: 0.1 }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.targetHomePrice) || 450000;
      const dpPct = Number(inputs.downPaymentPercent) || 20;
      const ccPct = Number(inputs.closingCostBufferPercent) || 3;
      const current = Number(inputs.currentSavings) || 15000;
      const years = Number(inputs.timelineYears) || 3;
      const apy = Number(inputs.savingsApy) || 4.5;

      const dpAmount = price * (dpPct / 100);
      const ccAmount = price * (ccPct / 100);
      const totalTarget = dpAmount + ccAmount;
      const months = Math.max(1, years * 12);
      const r = apy / 100 / 12;

      // Future value of current savings
      const fvCurrent = current * Math.pow(1 + r, months);
      const remainingNeeded = Math.max(0, totalTarget - fvCurrent);

      // PMT for sinking fund
      const monthlyDeposit = r > 0 && months > 0
        ? remainingNeeded * (r / (Math.pow(1 + r, months) - 1))
        : remainingNeeded / months;

      const totalSavedOutOfPocket = current + monthlyDeposit * months;
      const totalInterestEarned = Math.max(0, totalTarget - totalSavedOutOfPocket);

      return {
        primaryValue: `$${Math.round(monthlyDeposit).toLocaleString('en-US')}/mo`,
        primaryLabel: `Required Monthly Savings (${years} Years at ${apy}% APY)`,
        secondaryMetrics: [
          { label: 'Total Cash Needed at Closing', value: `$${Math.round(totalTarget).toLocaleString('en-US')}` },
          { label: `Down Payment (${dpPct}%)`, value: `$${Math.round(dpAmount).toLocaleString('en-US')}` },
          { label: `Closing Costs (${ccPct}%)`, value: `$${Math.round(ccAmount).toLocaleString('en-US')}` },
          { label: 'Current Savings Compound FV', value: `$${Math.round(fvCurrent).toLocaleString('en-US')}` },
          { label: 'HYSA Bank Interest Earned', value: `$${Math.round(totalInterestEarned).toLocaleString('en-US')}` },
          { label: 'Total Out-of-Pocket Saved', value: `$${Math.round(totalSavedOutOfPocket).toLocaleString('en-US')}` }
        ],
        explanation: `To buy a $${price.toLocaleString()} home in ${years} years with ${dpPct}% down ($${dpAmount.toLocaleString()}) plus $${ccAmount.toLocaleString()} closing costs, you need a total of $${totalTarget.toLocaleString()}. Depositing $${Math.round(monthlyDeposit).toLocaleString()}/month in a ${apy}% APY account reaches your goal on time.`
      };
    }
  },
  {
    id: 'mortgage-closing-costs-calc',
    name: 'Homebuyer Closing Costs Estimator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Estimate itemized buyer closing costs including lender origination, appraisal, title search, escrow reserves, transfer taxes, and recording fees.',
    formula: 'Closing Costs = Origination (0.5-1%) + Title/Escrow (0.5-1%) + Prepaid Taxes/Ins + Gov Recording',
    inputs: [
      { id: 'loanAmount', label: 'Loan Amount ($)', type: 'number', defaultValue: 350000, min: 20000, max: 5000000, step: 5000 },
      { id: 'purchasePrice', label: 'Purchase Price ($)', type: 'number', defaultValue: 420000, min: 20000, max: 5000000, step: 5000 },
      { id: 'lenderOriginationPct', label: 'Lender Origination Fee (%)', type: 'number', defaultValue: 0.8, min: 0, max: 3, step: 0.1 },
      { id: 'appraisalCreditFee', label: 'Appraisal & Credit Report ($)', type: 'number', defaultValue: 650, min: 200, max: 3000, step: 50 },
      { id: 'titleInsuranceEscrow', label: 'Title Insurance & Settlement ($)', type: 'number', defaultValue: 2100, min: 500, max: 10000, step: 100 },
      { id: 'prepaidTaxesInsurance', label: 'Prepaid Taxes & Insurance Escrow ($)', type: 'number', defaultValue: 2800, min: 0, max: 20000, step: 100 },
      { id: 'recordingTransferTax', label: 'Gov Recording & Transfer Taxes ($)', type: 'number', defaultValue: 1200, min: 0, max: 15000, step: 100 }
    ],
    calculate: (inputs) => {
      const loan = Number(inputs.loanAmount) || 350000;
      const price = Number(inputs.purchasePrice) || 420000;
      const origPct = Number(inputs.lenderOriginationPct) || 0.8;
      const appraisal = Number(inputs.appraisalCreditFee) || 650;
      const title = Number(inputs.titleInsuranceEscrow) || 2100;
      const prepaids = Number(inputs.prepaidTaxesInsurance) || 2800;
      const recording = Number(inputs.recordingTransferTax) || 1200;

      const origFee = loan * (origPct / 100);
      const totalClosingCosts = origFee + appraisal + title + prepaids + recording;
      const percentOfLoan = (totalClosingCosts / loan) * 100;
      const percentOfPrice = (totalClosingCosts / price) * 100;

      return {
        primaryValue: `$${Math.round(totalClosingCosts).toLocaleString('en-US')}`,
        primaryLabel: 'Total Estimated Buyer Closing Costs',
        secondaryMetrics: [
          { label: 'Lender Origination & Underwriting', value: `$${origFee.toFixed(2)} (${origPct}%)` },
          { label: 'Appraisal, Inspection & Credit', value: `$${appraisal.toFixed(2)}` },
          { label: 'Title Search & Lender Policy', value: `$${title.toFixed(2)}` },
          { label: 'Prepaid Escrow Reserves', value: `$${prepaids.toFixed(2)}` },
          { label: 'Gov Recording & Transfer Fees', value: `$${recording.toFixed(2)}` },
          { label: 'Percentage of Loan Amount', value: `${percentOfLoan.toFixed(2)}%` }
        ],
        explanation: `On a $${loan.toLocaleString()} loan for a $${price.toLocaleString()} property, your estimated out-of-pocket closing costs will total $${Math.round(totalClosingCosts).toLocaleString()} (${percentOfLoan.toFixed(2)}% of loan).`
      };
    }
  },
  {
    id: 'mortgage-discount-points-break-even-calc',
    name: 'Mortgage Discount Points Break-Even Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate whether paying upfront mortgage discount points to buy down your interest rate is financially beneficial based on break-even months.',
    formula: 'Break-Even Months = Upfront Points Cost / Monthly Payment Savings',
    inputs: [
      { id: 'loanAmount', label: 'Mortgage Loan Amount ($)', type: 'number', defaultValue: 400000, min: 20000, max: 5000000, step: 5000 },
      { id: 'baseRate', label: 'Base Interest Rate without Points (%)', type: 'number', defaultValue: 7.0, min: 1, max: 20, step: 0.125 },
      { id: 'discountPoints', label: 'Points Purchased (1 point = 1% loan)', type: 'number', defaultValue: 1.5, min: 0.25, max: 4, step: 0.25 },
      { id: 'rateReductionPerPoint', label: 'Rate Drop Per Point (typically 0.25%)', type: 'number', defaultValue: 0.25, min: 0.1, max: 0.5, step: 0.025 },
      { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 10, max: 30, step: 5 }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.loanAmount) || 400000;
      const baseRate = Number(inputs.baseRate) || 7.0;
      const points = Number(inputs.discountPoints) || 1.5;
      const dropPerPoint = Number(inputs.rateReductionPerPoint) || 0.25;
      const years = Number(inputs.loanTermYears) || 30;

      const upfrontPointsCost = P * (points / 100);
      const newRate = Math.max(0.1, baseRate - points * dropPerPoint);

      const n = years * 12;
      const rBase = baseRate / 100 / 12;
      const rNew = newRate / 100 / 12;

      const baseMonthly = (P * (rBase * Math.pow(1 + rBase, n))) / (Math.pow(1 + rBase, n) - 1);
      const newMonthly = (P * (rNew * Math.pow(1 + rNew, n))) / (Math.pow(1 + rNew, n) - 1);
      const monthlySavings = baseMonthly - newMonthly;

      const breakEvenMonths = monthlySavings > 0 ? upfrontPointsCost / monthlySavings : 0;
      const breakEvenYears = breakEvenMonths / 12;
      const lifetimeSavings = monthlySavings * n - upfrontPointsCost;

      return {
        primaryValue: `${Math.ceil(breakEvenMonths)} Months (${breakEvenYears.toFixed(1)} Yrs)`,
        primaryLabel: 'Break-Even Horizon to Recoup Points Cost',
        secondaryMetrics: [
          { label: 'Upfront Points Cost at Closing', value: `$${upfrontPointsCost.toLocaleString('en-US')}` },
          { label: 'New Bought-Down Interest Rate', value: `${newRate.toFixed(3)}% (Down from ${baseRate.toFixed(3)}%)` },
          { label: 'Monthly Payment Savings', value: `$${monthlySavings.toFixed(2)}/mo` },
          { label: 'Original Base Monthly Payment', value: `$${baseMonthly.toFixed(2)}/mo` },
          { label: 'New Monthly Payment', value: `$${newMonthly.toFixed(2)}/mo` },
          { label: '30-Year Net Lifetime Savings', value: `$${Math.round(lifetimeSavings).toLocaleString('en-US')}` }
        ],
        explanation: `Paying $${upfrontPointsCost.toLocaleString()} for ${points} discount points lowers your interest rate from ${baseRate}% to ${newRate.toFixed(3)}%, saving $${monthlySavings.toFixed(2)}/month. You break even in ${Math.ceil(breakEvenMonths)} months (${breakEvenYears.toFixed(1)} years). If staying longer, you gain $${Math.round(lifetimeSavings).toLocaleString()} in net savings.`
      };
    }
  },
  {
    id: 'pmi-removal-timeline-calc',
    name: 'PMI Cancellation & 80% LTV Timeline Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate the exact month and year when your mortgage reaches 80% LTV (borrower-requested cancellation) and 78% LTV (automatic HPA cancellation).',
    formula: '80% Threshold = Home Value * 0.80; 78% Threshold = Original Value * 0.78',
    inputs: [
      { id: 'homePurchasePrice', label: 'Original Purchase Price ($)', type: 'number', defaultValue: 380000, min: 50000, max: 5000000, step: 5000 },
      { id: 'downPaymentPercent', label: 'Down Payment (%)', type: 'number', defaultValue: 5, min: 1, max: 19.9, step: 0.5 },
      { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.75, min: 1, max: 20, step: 0.1 },
      { id: 'pmiRate', label: 'Annual PMI Rate (%)', type: 'number', defaultValue: 0.85, min: 0.2, max: 2.5, step: 0.05 },
      { id: 'extraMonthlyPrincipal', label: 'Extra Principal Paid ($/mo)', type: 'number', defaultValue: 100, min: 0, max: 5000, step: 25 }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.homePurchasePrice) || 380000;
      const dpPct = Number(inputs.downPaymentPercent) || 5;
      const rate = Number(inputs.interestRate) || 6.75;
      const pmiRate = Number(inputs.pmiRate) || 0.85;
      const extra = Number(inputs.extraMonthlyPrincipal) || 0;

      const originalLoan = price * (1 - dpPct / 100);
      const target80 = price * 0.80;
      const target78 = price * 0.78;

      const r = rate / 100 / 12;
      const n = 360;
      const baseMonthlyPI = (originalLoan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const monthlyPmi = (originalLoan * (pmiRate / 100)) / 12;

      let balance = originalLoan;
      let month = 0;
      let month80 = 0;
      let month78 = 0;
      let totalPmiPaid = 0;

      while (balance > 0 && month < 360) {
        month++;
        const int = balance * r;
        const princ = baseMonthlyPI - int + extra;
        balance -= princ;

        if (balance <= target80 && month80 === 0) month80 = month;
        if (balance <= target78 && month78 === 0) month78 = month;
        if (month80 === 0) totalPmiPaid += monthlyPmi;
      }

      return {
        primaryValue: `${month80} Months (${(month80 / 12).toFixed(1)} Yrs)`,
        primaryLabel: 'Time to Reach 80% LTV (PMI Removal Request)',
        secondaryMetrics: [
          { label: 'Monthly PMI Payment', value: `$${monthlyPmi.toFixed(2)}/mo` },
          { label: '80% LTV Target Balance', value: `$${Math.round(target80).toLocaleString('en-US')}` },
          { label: '78% Automatic Drop Timeline', value: `${month78} Months (${(month78 / 12).toFixed(1)} Yrs)` },
          { label: 'Cumulative PMI Paid Prior to 80%', value: `$${Math.round(totalPmiPaid).toLocaleString('en-US')}` },
          { label: 'Extra Principal Acceleration', value: extra > 0 ? `Saved ~${Math.round(extra * 12 / 500)} months` : 'None applied' }
        ],
        explanation: `With $${extra}/mo extra principal, your loan reaches the 80% LTV threshold of $${Math.round(target80).toLocaleString()} in ${month80} months (${(month80 / 12).toFixed(1)} years), at which point you can petition your lender to cancel your $${monthlyPmi.toFixed(2)}/mo PMI.`
      };
    }
  },
  {
    id: 'balloon-loan-mortgage-calc',
    name: 'Balloon Mortgage & Lump-Sum Maturity Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate monthly payments on a 30-year amortization schedule with a 5-year or 7-year balloon lump-sum maturity balance.',
    formula: 'Payment = P * [r(1+r)^N] / [(1+r)^N - 1]; Balloon = Remaining balance at month m',
    inputs: [
      { id: 'loanAmount', label: 'Loan Principal ($)', type: 'number', defaultValue: 300000, min: 10000, max: 5000000, step: 5000 },
      { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.25, min: 1, max: 20, step: 0.125 },
      { id: 'amortizationYears', label: 'Amortization Period (Years)', type: 'number', defaultValue: 30, min: 10, max: 40, step: 5 },
      { id: 'balloonDueYears', label: 'Balloon Due Date (Years)', type: 'number', defaultValue: 7, min: 1, max: 20, step: 1 }
    ],
    calculate: (inputs) => {
      const P = Number(inputs.loanAmount) || 300000;
      const rate = Number(inputs.interestRate) || 6.25;
      const amortYears = Number(inputs.amortizationYears) || 30;
      const balloonYears = Number(inputs.balloonDueYears) || 7;

      const r = rate / 100 / 12;
      const N = amortYears * 12;
      const m = balloonYears * 12;

      const monthlyPayment = (P * (r * Math.pow(1 + r, N))) / (Math.pow(1 + r, N) - 1);

      // Remaining balance formula at month m
      const balloonBalance = (P * (Math.pow(1 + r, N) - Math.pow(1 + r, m))) / (Math.pow(1 + r, N) - 1);
      const totalPaidMonthly = monthlyPayment * m;
      const principalPaid = P - balloonBalance;
      const interestPaid = totalPaidMonthly - principalPaid;

      return {
        primaryValue: `$${Math.round(balloonBalance).toLocaleString('en-US')}`,
        primaryLabel: `Final Balloon Payment Due at Year ${balloonYears}`,
        secondaryMetrics: [
          { label: 'Monthly Payment (P&I)', value: `$${monthlyPayment.toFixed(2)}/mo` },
          { label: 'Total Monthly Payments Paid', value: `$${Math.round(totalPaidMonthly).toLocaleString('en-US')}` },
          { label: 'Principal Paid Down', value: `$${Math.round(principalPaid).toLocaleString('en-US')}` },
          { label: 'Interest Paid Over Period', value: `$${Math.round(interestPaid).toLocaleString('en-US')}` },
          { label: 'Remaining Principal Percentage', value: `${((balloonBalance / P) * 100).toFixed(1)}%` }
        ],
        explanation: `Under a ${amortYears}-year amortization schedule at ${rate}%, your monthly payment is $${monthlyPayment.toFixed(2)}. At the end of year ${balloonYears}, the full remaining balance of $${Math.round(balloonBalance).toLocaleString()} is due in a single lump-sum balloon payment.`
      };
    }
  },
  {
    id: 'equipment-lease-vs-buy-calc',
    name: 'Equipment Lease vs Buy NPV Decision Calculator',
    category: 'finance',
    subCategory: 'Business & Real Estate',
    description: 'Compare the after-tax Net Present Value (NPV) of buying business machinery/equipment vs leasing with tax shields and depreciation.',
    formula: 'NPV Buy = -Purchase + PV(Depr Tax Shields) + PV(Salvage); NPV Lease = -PV(Lease Payments after tax)',
    inputs: [
      { id: 'equipmentCost', label: 'Equipment Purchase Price ($)', type: 'number', defaultValue: 80000, min: 1000, max: 2000000, step: 2500 },
      { id: 'monthlyLeasePayment', label: 'Monthly Lease Cost ($/mo)', type: 'number', defaultValue: 1750, min: 100, max: 50000, step: 50 },
      { id: 'leaseTermYears', label: 'Useful Life / Lease Term (Years)', type: 'number', defaultValue: 5, min: 1, max: 15, step: 1 },
      { id: 'corporateTaxRate', label: 'Corporate Tax Rate (%)', type: 'number', defaultValue: 25, min: 0, max: 50, step: 1 },
      { id: 'discountRate', label: 'Cost of Capital / Discount Rate (%)', type: 'number', defaultValue: 8.0, min: 1, max: 25, step: 0.5 },
      { id: 'estimatedSalvageValue', label: 'Estimated Resale Value at End ($)', type: 'number', defaultValue: 12000, min: 0, max: 500000, step: 1000 }
    ],
    calculate: (inputs) => {
      const cost = Number(inputs.equipmentCost) || 80000;
      const leaseMonthly = Number(inputs.monthlyLeasePayment) || 1750;
      const years = Number(inputs.leaseTermYears) || 5;
      const taxRate = (Number(inputs.corporateTaxRate) || 25) / 100;
      const discRate = (Number(inputs.discountRate) || 8.0) / 100;
      const salvage = Number(inputs.estimatedSalvageValue) || 12000;

      const annualLeaseAfterTax = leaseMonthly * 12 * (1 - taxRate);
      let npvLeaseCost = 0;
      for (let t = 1; t <= years; t++) {
        npvLeaseCost += annualLeaseAfterTax / Math.pow(1 + discRate, t);
      }

      // Straight-line annual depreciation tax shield
      const annualDepr = (cost - salvage) / years;
      const annualTaxShield = annualDepr * taxRate;
      let npvBuyCost = cost;
      for (let t = 1; t <= years; t++) {
        npvBuyCost -= annualTaxShield / Math.pow(1 + discRate, t);
      }
      npvBuyCost -= (salvage * (1 - taxRate)) / Math.pow(1 + discRate, years);

      const recommendation = npvBuyCost < npvLeaseCost ? 'BUY Equipment (Lower Net Cost)' : 'LEASE Equipment (Lower Net Cost)';
      const difference = Math.abs(npvBuyCost - npvLeaseCost);

      return {
        primaryValue: recommendation,
        primaryLabel: 'Financial Recommendation (After-Tax NPV)',
        secondaryMetrics: [
          { label: 'Net Present Cost to BUY', value: `$${Math.round(npvBuyCost).toLocaleString('en-US')}` },
          { label: 'Net Present Cost to LEASE', value: `$${Math.round(npvLeaseCost).toLocaleString('en-US')}` },
          { label: 'NPV Savings of Better Option', value: `$${Math.round(difference).toLocaleString('en-US')}` },
          { label: 'Annual Depreciation Tax Shield', value: `$${annualTaxShield.toFixed(2)}/yr` },
          { label: 'After-Tax Lease Outlay', value: `$${annualLeaseAfterTax.toFixed(2)}/yr` }
        ],
        explanation: `Comparing a $${cost.toLocaleString()} purchase against a $${leaseMonthly}/mo lease over ${years} years with ${inputs.corporateTaxRate}% taxes and ${inputs.discountRate}% discount rate: Buying has an NPV cost of $${Math.round(npvBuyCost).toLocaleString()} vs $${Math.round(npvLeaseCost).toLocaleString()} for leasing.`
      };
    }
  },
  {
    id: 'ltv-cltv-underwriting-calc',
    name: 'Loan-to-Value (LTV) & Combined CLTV Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate primary Loan-to-Value (LTV), Combined Loan-to-Value (CLTV), and Home Equity Percentage for conventional and HELOC underwriting.',
    formula: 'LTV = 1st Mortgage / Appraised Value; CLTV = (1st + 2nd/HELOC) / Appraised Value',
    inputs: [
      { id: 'propertyAppraisedValue', label: 'Property Appraised Market Value ($)', type: 'number', defaultValue: 525000, min: 25000, max: 10000000, step: 5000 },
      { id: 'firstMortgageBalance', label: '1st Mortgage Outstanding Balance ($)', type: 'number', defaultValue: 340000, min: 0, max: 10000000, step: 5000 },
      { id: 'secondMortgageHeloc', label: '2nd Mortgage / HELOC Balance or Limit ($)', type: 'number', defaultValue: 55000, min: 0, max: 2000000, step: 2500 }
    ],
    calculate: (inputs) => {
      const val = Math.max(1, Number(inputs.propertyAppraisedValue) || 525000);
      const first = Number(inputs.firstMortgageBalance) || 340000;
      const second = Number(inputs.secondMortgageHeloc) || 55000;

      const totalDebt = first + second;
      const ltv = (first / val) * 100;
      const cltv = (totalDebt / val) * 100;
      const equityDollars = Math.max(0, val - totalDebt);
      const equityPct = (equityDollars / val) * 100;

      // Max 80% cash-out refi / HELOC headroom
      const max80Line = Math.max(0, val * 0.80 - first);

      return {
        primaryValue: `${ltv.toFixed(1)}% LTV / ${cltv.toFixed(1)}% CLTV`,
        primaryLabel: 'Primary LTV and Combined CLTV',
        secondaryMetrics: [
          { label: 'Total Current Home Equity', value: `$${Math.round(equityDollars).toLocaleString('en-US')} (${equityPct.toFixed(1)}%)` },
          { label: '1st Mortgage Loan-to-Value', value: `${ltv.toFixed(2)}%` },
          { label: 'Combined Loan-to-Value (CLTV)', value: `${cltv.toFixed(2)}%` },
          { label: '80% LTV Cash-Out Headroom', value: `$${Math.round(max80Line).toLocaleString('en-US')}` },
          { label: 'Underwriting Tier', value: cltv <= 80 ? 'Standard Conventional (No PMI)' : 'High LTV (PMI / Higher Rate Tier)' }
        ],
        explanation: `For a home appraised at $${val.toLocaleString()} with a $${first.toLocaleString()} 1st mortgage and $${second.toLocaleString()} 2nd lien, your primary LTV is ${ltv.toFixed(1)}% and Combined CLTV is ${cltv.toFixed(1)}% with $${Math.round(equityDollars).toLocaleString()} in net equity.`
      };
    }
  },
  {
    id: 'sales-tax-reverse-calculator',
    name: 'Sales Tax & Reverse Tax (Gross/Net) Calculator',
    category: 'finance',
    subCategory: 'Salary & Taxes',
    description: 'Calculate forward sales tax added to a net price or reverse/extract sales tax from a gross price with tiered local tax rates.',
    formula: 'Forward: Tax = Net * Rate, Gross = Net + Tax; Reverse: Net = Gross / (1 + Rate)',
    inputs: [
      { id: 'amount', label: 'Amount ($)', type: 'number', defaultValue: 150, min: 0.01, max: 10000000, step: 1 },
      { id: 'stateTaxRate', label: 'State Sales Tax (%)', type: 'number', defaultValue: 6.25, min: 0, max: 20, step: 0.125 },
      { id: 'localTaxRate', label: 'County / City Local Tax (%)', type: 'number', defaultValue: 2.0, min: 0, max: 10, step: 0.125 },
      { id: 'calculationMode', label: 'Mode (1 = Add Tax to Net, 2 = Extract Tax from Gross)', type: 'number', defaultValue: 1, min: 1, max: 2, step: 1 }
    ],
    calculate: (inputs) => {
      const amt = Number(inputs.amount) || 150;
      const stateRate = Number(inputs.stateTaxRate) || 6.25;
      const localRate = Number(inputs.localTaxRate) || 2.0;
      const mode = Number(inputs.calculationMode) || 1;

      const totalRate = stateRate + localRate;
      const r = totalRate / 100;

      let net = 0;
      let tax = 0;
      let gross = 0;

      if (mode === 1) {
        // Net is input
        net = amt;
        tax = net * r;
        gross = net + tax;
      } else {
        // Gross is input
        gross = amt;
        net = gross / (1 + r);
        tax = gross - net;
      }

      const stateTaxPart = tax * (stateRate / totalRate || 0);
      const localTaxPart = tax * (localRate / totalRate || 0);

      return {
        primaryValue: mode === 1 ? `$${gross.toFixed(2)} Gross Total` : `$${net.toFixed(2)} Pre-Tax Net`,
        primaryLabel: mode === 1 ? 'Total Price Including Sales Tax' : 'Original Pre-Tax Amount',
        secondaryMetrics: [
          { label: 'Total Sales Tax', value: `$${tax.toFixed(2)} (${totalRate.toFixed(2)}%)` },
          { label: 'State Tax Portion', value: `$${stateTaxPart.toFixed(2)} (${stateRate}%)` },
          { label: 'Local/City Tax Portion', value: `$${localTaxPart.toFixed(2)} (${localRate}%)` },
          { label: 'Pre-Tax Net Price', value: `$${net.toFixed(2)}` },
          { label: 'Final Total Gross Price', value: `$${gross.toFixed(2)}` }
        ],
        explanation: mode === 1
          ? `Adding ${totalRate}% combined sales tax (${stateRate}% state + ${localRate}% local) to $${net.toFixed(2)} yields $${tax.toFixed(2)} in tax for a total of $${gross.toFixed(2)}.`
          : `Extracting ${totalRate}% sales tax from $${gross.toFixed(2)} reveals a pre-tax net price of $${net.toFixed(2)} with $${tax.toFixed(2)} in tax paid.`
      };
    }
  }
];
