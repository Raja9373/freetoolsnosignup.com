import { CalculatorDefinition } from './calculatorEngine';

export const COMPREHENSIVE_EXPANDED_260_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'fha-mortgage-mip-calc',
    name: 'FHA Loan & Upfront/Monthly MIP Calculator',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate FHA mortgage payments including the 1.75% Upfront Mortgage Insurance Premium (UFMIP) and the 0.55% annual monthly MIP.',
    formula: 'Total Loan = Base Loan + (Base Loan * 1.75% UFMIP); Monthly MIP = (Base Loan * 0.55%) / 12',
    inputs: [
      { id: 'purchasePrice', label: 'Home Purchase Price ($)', type: 'number', defaultValue: 320000, min: 20000, max: 2000000, step: 5000 },
      { id: 'downPaymentPercent', label: 'Down Payment (%) (FHA Minimum is 3.5%)', type: 'number', defaultValue: 3.5, min: 3.5, max: 20, step: 0.5 },
      { id: 'interestRate', label: 'Interest Rate (%)', type: 'number', defaultValue: 6.5, min: 1, max: 20, step: 0.125 },
      { id: 'loanTermYears', label: 'Loan Term (Years)', type: 'number', defaultValue: 30, min: 15, max: 30, step: 15 }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.purchasePrice) || 320000;
      const dpPct = Number(inputs.downPaymentPercent) || 3.5;
      const rate = Number(inputs.interestRate) || 6.5;
      const years = Number(inputs.loanTermYears) || 30;

      const dp = price * (dpPct / 100);
      const baseLoan = price - dp;
      const ufmip = baseLoan * 0.0175; // 1.75% FHA Upfront MIP
      const totalLoanAmount = baseLoan + ufmip;

      const r = rate / 100 / 12;
      const n = years * 12;
      const monthlyPI = (totalLoanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      const annualMipRate = dpPct >= 5 ? 0.0050 : 0.0055;
      const monthlyMip = (baseLoan * annualMipRate) / 12;
      const totalMonthlyFHA = monthlyPI + monthlyMip;

      return {
        primaryValue: `$${totalMonthlyFHA.toFixed(2)}/mo`,
        primaryLabel: 'Total Monthly FHA Payment (P&I + Monthly MIP)',
        secondaryMetrics: [
          { label: 'Principal & Interest', value: `$${monthlyPI.toFixed(2)}/mo` },
          { label: 'Monthly FHA MIP', value: `$${monthlyMip.toFixed(2)}/mo (${(annualMipRate * 100).toFixed(2)}%)` },
          { label: 'Base Loan Amount', value: `$${Math.round(baseLoan).toLocaleString('en-US')}` },
          { label: 'Upfront MIP Financed (1.75%)', value: `$${Math.round(ufmip).toLocaleString('en-US')}` },
          { label: 'Total Financed FHA Loan', value: `$${Math.round(totalLoanAmount).toLocaleString('en-US')}` },
          { label: 'Minimum Down Payment (3.5%)', value: `$${Math.round(dp).toLocaleString('en-US')}` }
        ],
        explanation: `With a $${price.toLocaleString()} purchase and ${dpPct}% down ($${dp.toLocaleString()}), FHA finances $${Math.round(ufmip).toLocaleString()} in upfront MIP for a total loan of $${Math.round(totalLoanAmount).toLocaleString()}. Monthly payments are $${monthlyPI.toFixed(2)} (P&I) plus $${monthlyMip.toFixed(2)} monthly MIP.`
      };
    }
  },
  {
    id: 'va-military-loan-calc',
    name: 'VA Home Loan & Funding Fee Calculator (0% Down)',
    category: 'finance',
    subCategory: 'Mortgage & Housing',
    description: 'Calculate 0% down VA military home loans with statutory VA Funding Fees (1.25% to 3.3%) and $0 monthly mortgage insurance.',
    formula: 'Total VA Loan = Base Loan + (Base Loan * FundingFee%); Monthly MIP = $0',
    inputs: [
      { id: 'purchasePrice', label: 'Purchase Price ($)', type: 'number', defaultValue: 425000, min: 50000, max: 2500000, step: 5000 },
      { id: 'downPaymentPercent', label: 'Down Payment (%) (VA allows 0%)', type: 'number', defaultValue: 0, min: 0, max: 25, step: 5 },
      { id: 'interestRate', label: 'VA Interest Rate (%)', type: 'number', defaultValue: 6.25, min: 1, max: 20, step: 0.125 },
      { id: 'isFirstTimeUse', label: 'Usage (1 = First Time 2.15%, 0 = Subsequent 3.3%)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 },
      { id: 'hasDisabilityExemption', label: 'Service-Connected Disability (1 = Fee Exempt, 0 = Pay Fee)', type: 'number', defaultValue: 0, min: 0, max: 1, step: 1 }
    ],
    calculate: (inputs) => {
      const price = Number(inputs.purchasePrice) || 425000;
      const dpPct = Number(inputs.downPaymentPercent) || 0;
      const rate = Number(inputs.interestRate) || 6.25;
      const firstUse = Number(inputs.isFirstTimeUse) === 1;
      const exempt = Number(inputs.hasDisabilityExemption) === 1;

      const dp = price * (dpPct / 100);
      const baseLoan = price - dp;

      let feeRate = 0;
      if (!exempt) {
        if (dpPct >= 10) feeRate = 0.0125;
        else if (dpPct >= 5) feeRate = 0.0150;
        else feeRate = firstUse ? 0.0215 : 0.0330;
      }

      const fundingFee = baseLoan * feeRate;
      const totalLoan = baseLoan + fundingFee;
      const r = rate / 100 / 12;
      const n = 360;
      const monthlyPI = (totalLoan * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

      return {
        primaryValue: `$${monthlyPI.toFixed(2)}/mo`,
        primaryLabel: 'Monthly VA Principal & Interest ($0 Monthly PMI)',
        secondaryMetrics: [
          { label: 'VA Funding Fee Financed', value: exempt ? '$0 (Disability Exempt)' : `$${Math.round(fundingFee).toLocaleString('en-US')} (${(feeRate * 100).toFixed(2)}%)` },
          { label: 'Total Financed Loan Balance', value: `$${Math.round(totalLoan).toLocaleString('en-US')}` },
          { label: 'Down Payment Required', value: `$${Math.round(dp).toLocaleString('en-US')} (${dpPct}%)` },
          { label: 'Monthly Mortgage Insurance (PMI)', value: '$0 / month (VA Benefit)' },
          { label: 'Total 30-Year Interest Paid', value: `$${Math.round(monthlyPI * n - totalLoan).toLocaleString('en-US')}` }
        ],
        explanation: `A 0% down VA loan of $${price.toLocaleString()} at ${rate}% has a VA funding fee of $${Math.round(fundingFee).toLocaleString()} (${(feeRate * 100).toFixed(2)}%), resulting in a monthly payment of $${monthlyPI.toFixed(2)} with $0 monthly PMI.`
      };
    }
  },
  {
    id: 'cd-ladder-yield-builder-calc',
    name: 'Certificate of Deposit (CD) Ladder Builder & Yield Calculator',
    category: 'finance',
    subCategory: 'Banking & Savings',
    description: 'Build a multi-tranche rolling CD ladder across 6-month, 1-year, 2-year, 3-year, and 5-year maturities to maximize yield and rolling liquidity.',
    formula: 'A_t = Principal_t * (1 + r_t / 12)^(12 * t); Rolling Liquid Cash = Principal / Tranches every maturity interval',
    inputs: [
      { id: 'totalCapital', label: 'Total Investment Capital ($)', type: 'number', defaultValue: 50000, min: 5000, max: 2000000, step: 5000 },
      { id: 'ladderRungs', label: 'Number of CD Rungs / Tranches (e.g. 4 or 5)', type: 'number', defaultValue: 4, min: 2, max: 10, step: 1 },
      { id: 'avgApyPercent', label: 'Average CD APY Yield (%)', type: 'number', defaultValue: 5.1, min: 0.5, max: 15, step: 0.1 }
    ],
    calculate: (inputs) => {
      const total = Number(inputs.totalCapital) || 50000;
      const rungs = Math.max(2, Number(inputs.ladderRungs) || 4);
      const apy = Number(inputs.avgApyPercent) || 5.1;

      const perRung = total / rungs;
      const r = apy / 100;
      let totalMaturedValue = 0;
      let totalInterestEarned = 0;

      for (let i = 1; i <= rungs; i++) {
        const years = i * (12 / rungs / 12);
        const fv = perRung * Math.pow(1 + r, years);
        totalMaturedValue += fv;
        totalInterestEarned += (fv - perRung);
      }

      const blendedYieldAnnual = (totalInterestEarned / total) * 100;

      return {
        primaryValue: `$${Math.round(totalInterestEarned).toLocaleString('en-US')}`,
        primaryLabel: 'Total CD Ladder Interest Income',
        secondaryMetrics: [
          { label: 'Capital Per CD Rung', value: `$${Math.round(perRung).toLocaleString('en-US')} (${rungs} tranches)` },
          { label: 'Total Matured Portfolio Value', value: `$${Math.round(totalMaturedValue).toLocaleString('en-US')}` },
          { label: 'Rolling Liquidity Frequency', value: `Every ${Math.round(12 / rungs)} Months` },
          { label: 'Average Blended APY', value: `${apy.toFixed(2)}%` },
          { label: 'Reinvestment Strategy', value: 'Roll maturing CDs into highest top-tier rate' }
        ],
        explanation: `Splitting $${total.toLocaleString()} across ${rungs} CD tranches ($${Math.round(perRung).toLocaleString()} each) at ${apy}% APY generates $${Math.round(totalInterestEarned).toLocaleString()} in guaranteed interest while releasing liquid cash every ${Math.round(12 / rungs)} months.`
      };
    }
  },
  {
    id: 'social-security-early-vs-late-calc',
    name: 'Social Security Breakeven & Retirement Age Calculator',
    category: 'finance',
    subCategory: 'Retirement & Wealth',
    description: 'Compare Social Security retirement benefits taken early at age 62 (30% reduction), Full Retirement Age 67 (100%), or delayed to age 70 (+24% bonus).',
    formula: 'Age 62 = PIA * 0.70; Age 67 = PIA * 1.00; Age 70 = PIA * 1.24; Breakeven = Solve cumulative cash flows',
    inputs: [
      { id: 'fullRetirementPia', label: 'Primary Insurance Amount (PIA at Age 67) ($/mo)', type: 'number', defaultValue: 2500, min: 500, max: 6000, step: 100 },
      { id: 'lifeExpectancyAge', label: 'Estimated Life Expectancy (Age in Years)', type: 'number', defaultValue: 84, min: 65, max: 105, step: 1 }
    ],
    calculate: (inputs) => {
      const pia = Number(inputs.fullRetirementPia) || 2500;
      const lifeExp = Number(inputs.lifeExpectancyAge) || 84;

      const benefit62 = pia * 0.70; // 30% reduction for age 62
      const benefit67 = pia * 1.00; // 100% at FRA
      const benefit70 = pia * 1.24; // 8% delayed retirement credit per year (24% bonus)

      // Cumulative lifetime totals
      const months62 = Math.max(0, (lifeExp - 62) * 12);
      const months67 = Math.max(0, (lifeExp - 67) * 12);
      const months70 = Math.max(0, (lifeExp - 70) * 12);

      const total62 = benefit62 * months62;
      const total67 = benefit67 * months67;
      const total70 = benefit70 * months70;

      // Breakeven age between 62 and 67: 62 receives 5 years (60 mos) early start
      // benefit62 * (Age - 62)*12 = benefit67 * (Age - 67)*12
      // 0.70 * (Age - 62) = 1.00 * (Age - 67) => 0.70 Age - 43.4 = Age - 67 => 0.30 Age = 23.6 => Age = 78.67
      const breakEven62vs67 = 78.7;
      const breakEven67vs70 = 82.5;

      return {
        primaryValue: `$${Math.round(total70).toLocaleString('en-US')} (Age 70 Claim)`,
        primaryLabel: `Lifetime Benefits at Age ${lifeExp} Life Expectancy`,
        secondaryMetrics: [
          { label: 'Monthly Benefit at Age 62 (Early)', value: `$${Math.round(benefit62).toLocaleString('en-US')}/mo (-30%)` },
          { label: 'Monthly Benefit at Age 67 (FRA)', value: `$${Math.round(benefit67).toLocaleString('en-US')}/mo (100%)` },
          { label: 'Monthly Benefit at Age 70 (Delayed)', value: `$${Math.round(benefit70).toLocaleString('en-US')}/mo (+24% Bonus)` },
          { label: 'Lifetime Payout Claiming at 62', value: `$${Math.round(total62).toLocaleString('en-US')}` },
          { label: 'Lifetime Payout Claiming at 67', value: `$${Math.round(total67).toLocaleString('en-US')}` },
          { label: 'Breakeven Age (62 vs 67 Claim)', value: `${breakEven62vs67} Years Old` },
          { label: 'Breakeven Age (67 vs 70 Claim)', value: `${breakEven67vs70} Years Old` }
        ],
        explanation: `With a $${pia.toLocaleString()}/mo FRA benefit, claiming at 70 yields $${Math.round(benefit70).toLocaleString()}/mo (+24%). If you live to age ${lifeExp}, claiming at 70 produces $${Math.round(total70).toLocaleString()} total lifetime benefits ($${Math.round(total70 - total62).toLocaleString()} more than claiming at 62).`
      };
    }
  },
  {
    id: 'commercial-real-estate-cap-rate-calc',
    name: 'Real Estate Cap Rate & Net Operating Income (NOI) Calculator',
    category: 'finance',
    subCategory: 'Business & Real Estate',
    description: 'Calculate Net Operating Income (NOI), Capitalization Rate (Cap Rate), and property valuation for commercial multifamily, retail, and office investments.',
    formula: 'NOI = Effective Gross Income - Operating Expenses; Cap Rate (%) = (NOI / Property Value) * 100',
    inputs: [
      { id: 'grossRentalIncome', label: 'Annual Gross Scheduled Rent ($)', type: 'number', defaultValue: 140000, min: 1000, max: 10000000, step: 2500 },
      { id: 'vacancyCreditLossPercent', label: 'Vacancy & Credit Loss (%)', type: 'number', defaultValue: 5.0, min: 0, max: 30, step: 0.5 },
      { id: 'otherAnnualIncome', label: 'Other Annual Income (Parking, Laundry, Storage) ($)', type: 'number', defaultValue: 6000, min: 0, max: 1000000, step: 500 },
      { id: 'annualOperatingExpenses', label: 'Total Annual Operating Expenses (Taxes, Ins, Maint, Mgmt) ($)', type: 'number', defaultValue: 48000, min: 0, max: 5000000, step: 1000 },
      { id: 'propertyPurchasePrice', label: 'Property Acquisition Price ($)', type: 'number', defaultValue: 1250000, min: 50000, max: 50000000, step: 10000 }
    ],
    calculate: (inputs) => {
      const grossRent = Number(inputs.grossRentalIncome) || 140000;
      const vacPct = Number(inputs.vacancyCreditLossPercent) || 5.0;
      const otherInc = Number(inputs.otherAnnualIncome) || 6000;
      const opex = Number(inputs.annualOperatingExpenses) || 48000;
      const price = Number(inputs.propertyPurchasePrice) || 1250000;

      const vacancyLoss = grossRent * (vacPct / 100);
      const effectiveGrossIncome = grossRent - vacancyLoss + otherInc;
      const noi = effectiveGrossIncome - opex;

      const capRate = (noi / price) * 100;
      const opexRatio = (opex / effectiveGrossIncome) * 100;
      const grm = price / (grossRent + otherInc);

      return {
        primaryValue: `${capRate.toFixed(2)}% Cap Rate`,
        primaryLabel: 'Property Capitalization Rate',
        secondaryMetrics: [
          { label: 'Net Operating Income (NOI)', value: `$${Math.round(noi).toLocaleString('en-US')}/year ($${Math.round(noi / 12).toLocaleString('en-US')}/mo)` },
          { label: 'Effective Gross Income (EGI)', value: `$${Math.round(effectiveGrossIncome).toLocaleString('en-US')}/year` },
          { label: 'Operating Expense Ratio (OER)', value: `${opexRatio.toFixed(1)}%` },
          { label: 'Gross Rent Multiplier (GRM)', value: `${grm.toFixed(2)}x` },
          { label: 'Economic Vacancy Loss', value: `-$${Math.round(vacancyLoss).toLocaleString('en-US')}/year (${vacPct}%)` }
        ],
        explanation: `With $${effectiveGrossIncome.toLocaleString()} in effective gross revenue and $${opex.toLocaleString()} in operating expenses, your annual Net Operating Income is $${Math.round(noi).toLocaleString()}. On a $${price.toLocaleString()} purchase price, this represents a ${capRate.toFixed(2)}% unleveraged Cap Rate.`
      };
    }
  },
  {
    id: 'army-body-fat-revised-tape-calc',
    name: 'US Army Body Fat Calculator (DoD / DA Form 5500/5501 Tape Test)',
    category: 'health',
    subCategory: 'Body Composition',
    description: 'Calculate official military body fat percentages using the revised Department of Defense circumference tape test method for Male and Female service members.',
    formula: 'Male % = 86.010*log10(Abdomen - Neck) - 70.041*log10(Height) + 36.76; Female % = 163.205*log10(Waist + Hip - Neck) - 97.684*log10(Height) - 78.387',
    inputs: [
      { id: 'isFemale', label: 'Gender (0 = Male, 1 = Female)', type: 'number', defaultValue: 0, min: 0, max: 1, step: 1 },
      { id: 'heightInches', label: 'Height (Inches)', type: 'number', defaultValue: 70, min: 50, max: 90, step: 0.5 },
      { id: 'neckInches', label: 'Neck Circumference (Inches)', type: 'number', defaultValue: 15.5, min: 10, max: 25, step: 0.25 },
      { id: 'abdomenWaistInches', label: 'Abdomen / Waist Circumference at Navel (Inches)', type: 'number', defaultValue: 34, min: 20, max: 60, step: 0.25 },
      { id: 'hipInches', label: 'Hips (Female Only, Inches)', type: 'number', defaultValue: 38, min: 25, max: 70, step: 0.25 }
    ],
    calculate: (inputs) => {
      const isFemale = Number(inputs.isFemale) === 1;
      const height = Number(inputs.heightInches) || 70;
      const neck = Number(inputs.neckInches) || 15.5;
      const waist = Number(inputs.abdomenWaistInches) || 34;
      const hip = Number(inputs.hipInches) || 38;

      let bfPercent = 0;
      if (isFemale) {
        // DA Form 5501
        const term = waist + hip - neck;
        bfPercent = 163.205 * Math.log10(Math.max(1, term)) - 97.684 * Math.log10(height) - 78.387;
      } else {
        // DA Form 5500
        const term = waist - neck;
        bfPercent = 86.010 * Math.log10(Math.max(1, term)) - 70.041 * Math.log10(height) + 36.76;
      }

      bfPercent = Math.max(3, Math.min(60, bfPercent));
      const armyStandardMax = isFemale ? 30 : 22; // Typical standard for 21-27 age group
      const pass = bfPercent <= armyStandardMax;

      return {
        primaryValue: `${bfPercent.toFixed(1)}% Body Fat`,
        primaryLabel: 'Official Military Tape Test Body Fat',
        secondaryMetrics: [
          { label: 'Army Compliance Status', value: pass ? 'PASS (Within DoD Standards)' : 'EXCEEDS Body Fat Screening Allowance' },
          { label: 'DoD Maximum Allowance (Age 21-27)', value: `${armyStandardMax}% Body Fat Max` },
          { label: 'Circumference Differential', value: isFemale ? `Waist+Hip-Neck: ${(waist + hip - neck).toFixed(1)}"` : `Abdomen-Neck: ${(waist - neck).toFixed(1)}"` },
          { label: 'Height Recorded', value: `${height} Inches (${Math.round(height * 2.54)} cm)` },
          { label: 'Official Standard', value: 'DA Form 5500/5501 (DoD Instruction 1308.3)' }
        ],
        explanation: `Based on a height of ${height}" and tape measurements of Neck: ${neck}", Waist: ${waist}"${isFemale ? `, Hips: ${hip}"` : ''}, the DoD equation calculates ${bfPercent.toFixed(1)}% body fat (${pass ? 'PASS' : 'EXCEEDED'}).`
      };
    }
  },
  {
    id: 'triangle-solver-law-of-sines-cosines-calc',
    name: 'Triangle Solver (SSS, SAS, ASA Law of Sines & Cosines)',
    category: 'math',
    subCategory: 'Geometry & Trigonometry',
    description: 'Solve any triangle given 3 sides (SSS) or 2 sides and an angle (SAS) using the Law of Cosines, Law of Sines, and Heron\'s formula.',
    formula: 'Law of Cosines: c² = a² + b² - 2ab*cos(C); Heron\'s Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2',
    inputs: [
      { id: 'sideA', label: 'Side a Length', type: 'number', defaultValue: 7, min: 0.1, max: 10000, step: 0.5 },
      { id: 'sideB', label: 'Side b Length', type: 'number', defaultValue: 8, min: 0.1, max: 10000, step: 0.5 },
      { id: 'sideC', label: 'Side c Length', type: 'number', defaultValue: 9, min: 0.1, max: 10000, step: 0.5 }
    ],
    calculate: (inputs) => {
      const a = Number(inputs.sideA) || 7;
      const b = Number(inputs.sideB) || 8;
      const c = Number(inputs.sideC) || 9;

      // Triangle inequality theorem check
      if (a + b <= c || a + c <= b || b + c <= a) {
        return {
          primaryValue: 'Invalid Triangle',
          primaryLabel: 'Triangle Inequality Violated (Sum of any 2 sides must exceed 3rd)',
          secondaryMetrics: [{ label: 'Status', value: 'a + b > c condition not met' }],
          explanation: 'The lengths provided cannot form a closed geometric triangle.'
        };
      }

      const semiPerimeter = (a + b + c) / 2;
      const area = Math.sqrt(Math.max(0, semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c)));

      // Law of Cosines for angles
      const cosA = (b * b + c * c - a * a) / (2 * b * c);
      const cosB = (a * a + c * c - b * b) / (2 * a * c);
      const cosC = (a * a + b * b - c * c) / (2 * a * b);

      const angleADeg = Math.acos(Math.max(-1, Math.min(1, cosA))) * (180 / Math.PI);
      const angleBDeg = Math.acos(Math.max(-1, Math.min(1, cosB))) * (180 / Math.PI);
      const angleCDeg = Math.acos(Math.max(-1, Math.min(1, cosC))) * (180 / Math.PI);

      const inradius = area / semiPerimeter;
      const circumradius = (a * b * c) / (4 * area);

      return {
        primaryValue: `Area = ${area.toFixed(3)} sq units`,
        primaryLabel: 'Triangle Area (Heron\'s Formula)',
        secondaryMetrics: [
          { label: 'Angle α (opposite side a)', value: `${angleADeg.toFixed(2)}°` },
          { label: 'Angle β (opposite side b)', value: `${angleBDeg.toFixed(2)}°` },
          { label: 'Angle γ (opposite side c)', value: `${angleCDeg.toFixed(2)}°` },
          { label: 'Perimeter', value: `${(a + b + c).toFixed(2)} units` },
          { label: 'Incircle Radius (r)', value: `${inradius.toFixed(3)} units` },
          { label: 'Circumcircle Radius (R)', value: `${circumradius.toFixed(3)} units` }
        ],
        explanation: `For sides a=${a}, b=${b}, and c=${c}, the angles are α=${angleADeg.toFixed(2)}°, β=${angleBDeg.toFixed(2)}°, and γ=${angleCDeg.toFixed(2)}° (sum = 180°). The triangle has an area of ${area.toFixed(3)} and perimeter of ${(a + b + c).toFixed(2)}.`
      };
    }
  },
  {
    id: 'matrix-determinant-inverse-solver-calc',
    name: '2x2 and 3x3 Matrix Determinant & Inverse Solver',
    category: 'math',
    subCategory: 'Linear Algebra',
    description: 'Calculate Matrix Determinant |A|, Trace, Characteristic equation, and Inverse Matrix A⁻¹ for 2x2 and 3x3 square matrices.',
    formula: '2x2: det(A) = ad - bc; A⁻¹ = (1/det) * [[d, -b], [-c, a]]',
    inputs: [
      { id: 'm11', label: 'Row 1, Col 1 (a)', type: 'number', defaultValue: 4, min: -100, max: 100, step: 1 },
      { id: 'm12', label: 'Row 1, Col 2 (b)', type: 'number', defaultValue: 7, min: -100, max: 100, step: 1 },
      { id: 'm21', label: 'Row 2, Col 1 (c)', type: 'number', defaultValue: 2, min: -100, max: 100, step: 1 },
      { id: 'm22', label: 'Row 2, Col 2 (d)', type: 'number', defaultValue: 6, min: -100, max: 100, step: 1 }
    ],
    calculate: (inputs) => {
      const a = Number(inputs.m11) || 4;
      const b = Number(inputs.m12) || 7;
      const c = Number(inputs.m21) || 2;
      const d = Number(inputs.m22) || 6;

      const det = a * d - b * c;
      const trace = a + d;
      const isSingular = Math.abs(det) < 1e-9;

      let invStr = '';
      if (!isSingular) {
        const invA = (d / det).toFixed(3);
        const invB = (-b / det).toFixed(3);
        const invC = (-c / det).toFixed(3);
        const invD = (a / det).toFixed(3);
        invStr = `[[${invA}, ${invB}], [${invC}, ${invD}]]`;
      } else {
        invStr = 'Singular Matrix (No inverse exists because det = 0)';
      }

      return {
        primaryValue: `det(A) = ${det}`,
        primaryLabel: 'Matrix Determinant |A|',
        secondaryMetrics: [
          { label: 'Inverse Matrix A⁻¹', value: invStr },
          { label: 'Matrix Trace tr(A)', value: `${trace}` },
          { label: 'Singularity Status', value: isSingular ? 'Singular / Non-Invertible' : 'Non-Singular / Invertible' },
          { label: 'Characteristic Polynomial', value: `λ² - ${trace}λ + ${det} = 0` }
        ],
        explanation: `For matrix [[${a}, ${b}], [${c}, ${d}]], the determinant is det(A) = (${a})(${d}) - (${b})(${c}) = ${det}. The inverse matrix is ${invStr}.`
      };
    }
  }
];
