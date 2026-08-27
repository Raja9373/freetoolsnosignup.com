import { CalculatorDefinition } from './calculatorEngine';

export const ULTIMATE_EVERYDAY_CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'bra-size-fitting-measurement-calc',
    name: 'Bra Size & Sister Size Measurement Calculator',
    category: 'everyday',
    subCategory: 'Apparel & Sizing',
    description: 'Calculate accurate bra band and cup sizes based on snug underbust and standing/leaning bust measurements across US, UK, and EU sizing standards.',
    formula: 'Band = Snug Underbust rounded to nearest even inch; Cup = Bust - Band difference (1" = A, 2" = B, 3" = C, 4" = D, 5" = DD/E)',
    inputs: [
      { id: 'snugUnderbustInches', label: 'Snug Underbust Measurement (Inches)', type: 'number', defaultValue: 31.5, min: 24, max: 60, step: 0.5 },
      { id: 'bustMeasurementInches', label: 'Fullest Bust Measurement (Inches)', type: 'number', defaultValue: 36.5, min: 26, max: 70, step: 0.5 }
    ],
    calculate: (inputs) => {
      const underbust = Number(inputs.snugUnderbustInches) || 31.5;
      const bust = Number(inputs.bustMeasurementInches) || 36.5;

      // Modern direct band sizing: rounded to nearest even number
      const band = Math.round(underbust) % 2 === 0 ? Math.round(underbust) : Math.round(underbust) + 1;
      const diff = Math.max(0, bust - band);

      const usCups = ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F', 'G', 'H', 'I', 'J', 'K'];
      const ukCups = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG', 'H'];

      const cupIndex = Math.min(usCups.length - 1, Math.max(0, Math.round(diff)));
      const usSize = `${band}${usCups[cupIndex]}`;
      const ukSize = `${band}${ukCups[cupIndex]}`;
      const euSize = `${Math.round(band * 2.54 / 5) * 5}${usCups[cupIndex]}`;

      // Sister sizes: (+2 band / -1 cup) and (-2 band / +1 cup)
      const sisterUp = cupIndex > 0 ? `${band + 2}${usCups[cupIndex - 1]}` : 'N/A';
      const sisterDown = cupIndex < usCups.length - 1 ? `${band - 2}${usCups[cupIndex + 1]}` : 'N/A';

      return {
        primaryValue: `${usSize} (US) / ${ukSize} (UK)`,
        primaryLabel: 'Recommended Standard Bra Size',
        secondaryMetrics: [
          { label: 'European (EU) Size', value: `${euSize}` },
          { label: 'Calculated Band Size', value: `${band} Inches` },
          { label: 'Bust-to-Band Difference', value: `${diff.toFixed(1)} Inches (Cup Depth: ${usCups[cupIndex]})` },
          { label: 'Sister Size (Looser Band)', value: sisterUp },
          { label: 'Sister Size (Tighter Band)', value: sisterDown },
          { label: 'Underbust / Bust Measurements', value: `${underbust}" / ${bust}"` }
        ],
        explanation: `With an underbust of ${underbust}" and bust of ${bust}" (difference of ${diff.toFixed(1)}"), your recommended starting bra size is ${usSize} (US) / ${ukSize} (UK). If the band feels too tight or loose, try sister sizes ${sisterUp} or ${sisterDown}.`
      };
    }
  },
  {
    id: 'cat-age-human-years-converter-calc',
    name: 'Cat Age in Human Years Calculator (Feline Life Stages)',
    category: 'everyday',
    subCategory: 'Pet & Veterinary',
    description: 'Convert cat chronological age into human developmental equivalent years using AAHA and AAFP veterinary feline life-stage guidelines.',
    formula: 'Year 1 = 15 human yrs; Year 2 = +9 human yrs (24 yrs total); Each subsequent year = +4 human yrs',
    inputs: [
      { id: 'catAgeYears', label: 'Cat Age in Years', type: 'number', defaultValue: 4, min: 0.1, max: 30, step: 0.5 }
    ],
    calculate: (inputs) => {
      const age = Number(inputs.catAgeYears) || 4;

      let humanYears = 0;
      if (age <= 1) {
        humanYears = age * 15;
      } else if (age <= 2) {
        humanYears = 15 + (age - 1) * 9;
      } else {
        humanYears = 24 + (age - 2) * 4;
      }

      let lifeStage = '';
      if (age < 1) lifeStage = 'Kitten (Rapid Physical Growth)';
      else if (age <= 6) lifeStage = 'Young Adult (Prime Physical & Mental Maturity)';
      else if (age <= 10) lifeStage = 'Mature Adult (Middle Age Maintenance)';
      else if (age <= 14) lifeStage = 'Senior (Geriatric Monitoring Required)';
      else lifeStage = 'Super Senior (Advanced Longevity)';

      return {
        primaryValue: `${Math.round(humanYears)} Human Years`,
        primaryLabel: 'Human Age Equivalent',
        secondaryMetrics: [
          { label: 'AAHA Feline Life Stage', value: lifeStage },
          { label: 'Chronological Cat Age', value: `${age} Years (${Math.round(age * 12)} Months)` },
          { label: 'Year 1 Growth Equivalent', value: '15 Human Years (Childhood to Adolescence)' },
          { label: 'Year 2 Growth Equivalent', value: '24 Human Years (Full Young Adulthood)' },
          { label: 'Subsequent Aging Rate', value: '+4 Human Years per Calendar Year' }
        ],
        explanation: `A ${age}-year-old cat is developmentally equivalent to a ${Math.round(humanYears)}-year-old human. Cats mature rapidly in their first two years before settling into a steady +4 human years per calendar year pace.`
      };
    }
  },
  {
    id: 'reading-speech-time-wpm-calc',
    name: 'Reading Time & Speech Duration Calculator',
    category: 'everyday',
    subCategory: 'Productivity & Writing',
    description: 'Calculate exact silent reading time, audiobook narration, and keynote speech presentation duration from document word counts and target WPM.',
    formula: 'Reading Time = Word Count / 238 WPM; Speaking Time = Word Count / 140 WPM',
    inputs: [
      { id: 'wordCount', label: 'Document Word Count', type: 'number', defaultValue: 2500, min: 10, max: 500000, step: 100 },
      { id: 'silentReadingWpm', label: 'Silent Reading Speed (Words Per Minute)', type: 'number', defaultValue: 240, min: 50, max: 800, step: 10 },
      { id: 'speechSpeakingWpm', label: 'Spoken Presentation Speed (Words Per Minute)', type: 'number', defaultValue: 140, min: 80, max: 250, step: 5 }
    ],
    calculate: (inputs) => {
      const words = Math.max(1, Number(inputs.wordCount) || 2500);
      const readWpm = Math.max(10, Number(inputs.silentReadingWpm) || 240);
      const speechWpm = Math.max(10, Number(inputs.speechSpeakingWpm) || 140);

      const readMinutes = words / readWpm;
      const speechMinutes = words / speechWpm;
      const audioBookMinutes = words / 155; // Standard ACX narration pace

      const formatTime = (mins: number) => {
        const h = Math.floor(mins / 60);
        const m = Math.floor(mins % 60);
        const s = Math.round((mins * 60) % 60);
        return `${h > 0 ? h + ' hr ' : ''}${m} min ${s} sec`;
      };

      const pagesEstimate = (words / 250).toFixed(1); // Standard 250 words per book page

      return {
        primaryValue: formatTime(speechMinutes),
        primaryLabel: `Spoken Speech Presentation Time (${speechWpm} WPM)`,
        secondaryMetrics: [
          { label: 'Silent Reading Time', value: formatTime(readMinutes) },
          { label: 'Audiobook Narration Time', value: formatTime(audioBookMinutes) },
          { label: 'Estimated Book Pages', value: `~${pagesEstimate} Pages (250 words/page)` },
          { label: 'Character Count Estimate', value: `~${(words * 5.5).toLocaleString('en-US')} Characters` },
          { label: 'Total Words Processed', value: `${words.toLocaleString('en-US')} Words` }
        ],
        explanation: `A text of ${words.toLocaleString()} words takes ${formatTime(readMinutes)} to read silently at ${readWpm} WPM and ${formatTime(speechMinutes)} to present aloud as a keynote speech at a steady ${speechWpm} WPM.`
      };
    }
  },
  {
    id: 'cidr-subnet-mask-network-calc',
    name: 'CIDR Subnet Mask & Usable IP Host Calculator',
    category: 'everyday',
    subCategory: 'IT & Networking',
    description: 'Calculate subnet masks, wildcard masks, usable host IP ranges, and broadcast addresses for any IPv4 CIDR prefix (/0 to /32).',
    formula: 'Total IPs = 2^(32 - Prefix); Usable Hosts = max(0, 2^(32 - Prefix) - 2); Netmask = (0xFFFFFFFF << (32 - Prefix))',
    inputs: [
      { id: 'cidrPrefix', label: 'CIDR Prefix (e.g. 24 for /24)', type: 'number', defaultValue: 24, min: 1, max: 32, step: 1 }
    ],
    calculate: (inputs) => {
      const prefix = Math.min(32, Math.max(1, Number(inputs.cidrPrefix) || 24));

      const hostBits = 32 - prefix;
      const totalIps = Math.pow(2, hostBits);
      const usableHosts = prefix >= 31 ? (prefix === 31 ? 2 : 1) : totalIps - 2;

      // Netmask generation
      const maskVal = prefix === 0 ? 0 : (~0 << hostBits) >>> 0;
      const maskParts = [
        (maskVal >>> 24) & 255,
        (maskVal >>> 16) & 255,
        (maskVal >>> 8) & 255,
        maskVal & 255
      ];
      const netmaskStr = maskParts.join('.');

      // Wildcard mask
      const wildcardStr = maskParts.map(p => 255 - p).join('.');

      return {
        primaryValue: `${usableHosts.toLocaleString('en-US')} Usable Hosts (/ ${prefix})`,
        primaryLabel: 'Usable Host Addresses on Subnet',
        secondaryMetrics: [
          { label: 'Subnet Netmask', value: netmaskStr },
          { label: 'Wildcard Inverse Mask', value: wildcardStr },
          { label: 'Total IP Addresses', value: `${totalIps.toLocaleString('en-US')} IPs` },
          { label: 'Host Bits Available', value: `${hostBits} bits` },
          { label: 'CIDR Notation', value: `/${prefix}` }
        ],
        explanation: `A /${prefix} IPv4 subnet provides ${totalIps.toLocaleString()} total IP addresses (${usableHosts.toLocaleString()} usable hosts after reserving network and broadcast addresses) with a subnet mask of ${netmaskStr}.`
      };
    }
  },
  {
    id: 'ev-charging-time-cost-calc',
    name: 'Electric Vehicle (EV) Charging Time & Cost Calculator',
    category: 'everyday',
    subCategory: 'Automotive & Energy',
    description: 'Calculate charging times and electricity costs across Level 1 (120V), Level 2 (240V), and DC Fast Charging (CCS/Tesla Supercharger).',
    formula: 'Time (hrs) = (Capacity kWh * (Target% - Current%)) / (Power kW * Efficiency 0.9); Cost = Energy * Rate',
    inputs: [
      { id: 'batteryCapacityKwh', label: 'EV Usable Battery Size (kWh)', type: 'number', defaultValue: 77.4, min: 10, max: 220, step: 1 },
      { id: 'currentSocPercent', label: 'Starting State of Charge (%)', type: 'number', defaultValue: 20, min: 0, max: 99, step: 5 },
      { id: 'targetSocPercent', label: 'Target State of Charge (%)', type: 'number', defaultValue: 80, min: 1, max: 100, step: 5 },
      { id: 'chargerPowerKw', label: 'Charger Power Rating (kW) (e.g. 9.6 L2, 150 DCFC)', type: 'number', defaultValue: 9.6, min: 1.4, max: 350, step: 0.5 },
      { id: 'electricityRatePerKwh', label: 'Electricity Cost ($ per kWh)', type: 'number', defaultValue: 0.16, min: 0.01, max: 1.5, step: 0.01 }
    ],
    calculate: (inputs) => {
      const cap = Number(inputs.batteryCapacityKwh) || 77.4;
      const startSoc = Number(inputs.currentSocPercent) || 20;
      const endSoc = Number(inputs.targetSocPercent) || 80;
      const power = Number(inputs.chargerPowerKw) || 9.6;
      const rate = Number(inputs.electricityRatePerKwh) || 0.16;

      const deltaPercent = Math.max(0, endSoc - startSoc);
      const energyNeededKwh = (cap * deltaPercent) / 100;
      const chargingEfficiency = power > 50 ? 0.94 : 0.88; // DC vs AC efficiency
      const energyDrawnKwh = energyNeededKwh / chargingEfficiency;

      const timeHours = energyDrawnKwh / power;
      const totalMinutes = Math.round(timeHours * 60);
      const hoursPart = Math.floor(totalMinutes / 60);
      const minsPart = totalMinutes % 60;

      const sessionCost = energyDrawnKwh * rate;
      const milesAdded = energyNeededKwh * 3.5; // ~3.5 miles per kWh average efficiency

      return {
        primaryValue: `${hoursPart > 0 ? hoursPart + 'h ' : ''}${minsPart}m (${totalMinutes} mins)`,
        primaryLabel: `Charging Time to reach ${endSoc}% at ${power} kW`,
        secondaryMetrics: [
          { label: 'Total Session Cost', value: `$${sessionCost.toFixed(2)}` },
          { label: 'Energy Delivered to Battery', value: `${energyNeededKwh.toFixed(1)} kWh (+${deltaPercent}% SoC)` },
          { label: 'Estimated Driving Range Added', value: `~${Math.round(milesAdded)} miles (${Math.round(milesAdded * 1.60934)} km)` },
          { label: 'Charging Rate Speed', value: `+${Math.round((milesAdded / (timeHours || 1)))} miles of range/hour` },
          { label: 'Cost Per Mile Added', value: `$${(sessionCost / Math.max(1, milesAdded)).toFixed(3)} / mile` }
        ],
        explanation: `Charging a ${cap} kWh EV battery from ${startSoc}% to ${endSoc}% (+${energyNeededKwh.toFixed(1)} kWh) on a ${power} kW charger takes ${hoursPart > 0 ? hoursPart + 'h ' : ''}${minsPart}m and costs $${sessionCost.toFixed(2)} at $${rate}/kWh, adding ~${Math.round(milesAdded)} miles of highway range.`
      };
    }
  },
  {
    id: 'sourdough-bakers-percentage-calc',
    name: 'Sourdough & Artisan Bread Baker\'s Percentage Calculator',
    category: 'everyday',
    subCategory: 'Culinary & Baking',
    description: 'Calculate precision ingredient weights for artisan bread and sourdough based on Flour 100% Baker\'s Percentages and Target Hydration.',
    formula: 'Water = Flour * Hydration%; Sourdough Starter = Flour * Starter%; Salt = Flour * 2.0%',
    inputs: [
      { id: 'totalFlourGrams', label: 'Total Flour Weight (g) (100% Basis)', type: 'number', defaultValue: 500, min: 100, max: 10000, step: 25 },
      { id: 'hydrationPercent', label: 'Target Water Hydration (%)', type: 'number', defaultValue: 75, min: 50, max: 100, step: 1 },
      { id: 'starterPercent', label: 'Sourdough Starter / Leaven (%)', type: 'number', defaultValue: 20, min: 5, max: 40, step: 1 },
      { id: 'saltPercent', label: 'Salt Percentage (%) (Standard: 2.0%)', type: 'number', defaultValue: 2.0, min: 1.0, max: 3.5, step: 0.1 }
    ],
    calculate: (inputs) => {
      const flour = Number(inputs.totalFlourGrams) || 500;
      const hydPct = Number(inputs.hydrationPercent) || 75;
      const starterPct = Number(inputs.starterPercent) || 20;
      const saltPct = Number(inputs.saltPercent) || 2.0;

      const water = (flour * hydPct) / 100;
      const starter = (flour * starterPct) / 100;
      const salt = (flour * saltPct) / 100;
      const totalDoughWeight = flour + water + starter + salt;

      // True overall hydration accounting for 100% hydration starter (50% flour, 50% water)
      const starterFlour = starter / 2;
      const starterWater = starter / 2;
      const trueTotalFlour = flour + starterFlour;
      const trueTotalWater = water + starterWater;
      const trueHydration = (trueTotalWater / trueTotalFlour) * 100;

      return {
        primaryValue: `${Math.round(totalDoughWeight)}g Total Dough Weight`,
        primaryLabel: 'Finished Loaf Dough Mass',
        secondaryMetrics: [
          { label: 'Bread Flour (100%)', value: `${flour}g` },
          { label: `Water (${hydPct}% Hydration)`, value: `${Math.round(water)}g (${Math.round(water)} mL)` },
          { label: `Active Sourdough Starter (${starterPct}%)`, value: `${Math.round(starter)}g` },
          { label: `Fine Sea Salt (${saltPct}%)`, value: `${salt.toFixed(1)}g` },
          { label: 'True Overall Hydration', value: `${trueHydration.toFixed(1)}%` },
          { label: 'Recommended Loaf Yield', value: totalDoughWeight > 750 ? '1 Large Hearth Loaf / 2 Boules' : '1 Medium Batard' }
        ],
        explanation: `For a ${flour}g flour base at ${hydPct}% hydration, measure: ${flour}g flour, ${Math.round(water)}g water, ${Math.round(starter)}g mature starter, and ${salt.toFixed(1)}g salt for a total dough mass of ${Math.round(totalDoughWeight)}g (${trueHydration.toFixed(1)}% true hydration).`
      };
    }
  },
  {
    id: 'deck-board-joist-fastener-calc',
    name: 'Decking Lumber, Joist & Board Quantity Estimator',
    category: 'everyday',
    subCategory: 'Construction & Woodworking',
    description: 'Calculate the exact number of deck boards, rim joists, framing lumber, and hidden fasteners needed based on deck dimensions and 16" on-center spacing.',
    formula: 'Boards = (Deck Width / Board Width) * (1 + 10% waste); Joists = (Deck Length / Joist Spacing) + 1',
    inputs: [
      { id: 'deckLengthFeet', label: 'Deck Length (Feet parallel to house)', type: 'number', defaultValue: 20, min: 4, max: 100, step: 1 },
      { id: 'deckWidthFeet', label: 'Deck Width (Feet outward projection)', type: 'number', defaultValue: 12, min: 4, max: 100, step: 1 },
      { id: 'boardWidthInches', label: 'Deck Board Nominal Width (Inches) (5.5" for 5/4x6)', type: 'number', defaultValue: 5.5, min: 3.5, max: 11.5, step: 0.5 },
      { id: 'joistSpacingInches', label: 'Joist Spacing On-Center (Inches) (12" or 16")', type: 'number', defaultValue: 16, min: 12, max: 24, step: 4 }
    ],
    calculate: (inputs) => {
      const lengthFt = Number(inputs.deckLengthFeet) || 20;
      const widthFt = Number(inputs.deckWidthFeet) || 12;
      const boardWidthIn = Number(inputs.boardWidthInches) || 5.5;
      const joistSpacingIn = Number(inputs.joistSpacingInches) || 16;

      const totalSqFt = lengthFt * widthFt;
      const gapIn = 0.1875; // 3/16" gap between composite/wood boards
      const effectiveBoardWidthFt = (boardWidthIn + gapIn) / 12;

      const numRows = Math.ceil(widthFt / effectiveBoardWidthFt);
      const totalLinearFeet = numRows * lengthFt;
      const linearFeetWithWaste = totalLinearFeet * 1.10; // 10% waste

      const joistCount = Math.ceil((lengthFt * 12) / joistSpacingIn) + 1;
      const fastenersCount = numRows * joistCount * 2; // 2 screws/clips per intersection

      return {
        primaryValue: `${Math.ceil(linearFeetWithWaste)} Linear Feet`,
        primaryLabel: 'Decking Lumber Needed (with 10% waste)',
        secondaryMetrics: [
          { label: 'Total Deck Area', value: `${totalSqFt} sq ft (${(totalSqFt * 0.0929).toFixed(1)} m²)` },
          { label: `Full-Length (${lengthFt}') Board Rows`, value: `${numRows} Rows of Boards` },
          { label: 'Floor Joists Required (2x8 / 2x10)', value: `${joistCount} Joists (${joistSpacingIn}" on-center)` },
          { label: 'Deck Screws / Hidden Fasteners', value: `~${fastenersCount} Screws / Clips` },
          { label: 'Waste Allowance Included', value: '+10% Cutting & End-Trim Waste' }
        ],
        explanation: `For a ${lengthFt}' x ${widthFt}' deck (${totalSqFt} sq ft), you need ${numRows} rows of ${boardWidthIn}" boards (${Math.ceil(linearFeetWithWaste)} linear ft including 10% waste), ${joistCount} floor joists spaced ${joistSpacingIn}" on-center, and ~${fastenersCount} fasteners.`
      };
    }
  },
  {
    id: 'rpg-d20-dice-probability-calc',
    name: 'D&D 5e / RPG d20 Dice Advantage & DC Probability Calculator',
    category: 'everyday',
    subCategory: 'Gaming & Tabletop',
    description: 'Calculate exact statistical success probabilities for D&D / RPG d20 checks with Straight Roll, Advantage (Roll 2 take highest), and Disadvantage.',
    formula: 'Straight: (21 - DC + Mod)/20; Advantage: 1 - (1 - p)^2; Disadvantage: p^2',
    inputs: [
      { id: 'targetDc', label: 'Target Difficulty Class (DC) / Armor Class (AC)', type: 'number', defaultValue: 15, min: 1, max: 35, step: 1 },
      { id: 'modifier', label: 'Character Ability Modifier + Proficiency (+/-)', type: 'number', defaultValue: 5, min: -5, max: 20, step: 1 }
    ],
    calculate: (inputs) => {
      const dc = Number(inputs.targetDc) || 15;
      const mod = Number(inputs.modifier) || 5;

      // Minimum roll needed on d20
      const neededRoll = Math.max(1, Math.min(20, dc - mod));

      // Natural 20 is always success (5%), Natural 1 is always failure
      const successes = Math.max(1, Math.min(19, 21 - neededRoll));
      const pStraight = successes / 20;
      const pAdvantage = 1 - Math.pow(1 - pStraight, 2);
      const pDisadvantage = Math.pow(pStraight, 2);

      const critSuccessChance = 5.0; // 1/20
      const critFailChance = 5.0; // 1/20

      return {
        primaryValue: `${(pStraight * 100).toFixed(1)}% Success Chance`,
        primaryLabel: `Straight d20 Check (Need to roll ${neededRoll}+ on die)`,
        secondaryMetrics: [
          { label: 'With Advantage (Roll 2, Keep High)', value: `${(pAdvantage * 100).toFixed(1)}% (+${((pAdvantage - pStraight) * 100).toFixed(1)}% boost)` },
          { label: 'With Disadvantage (Roll 2, Keep Low)', value: `${(pDisadvantage * 100).toFixed(1)}% (-${((pStraight - pDisadvantage) * 100).toFixed(1)}% penalty)` },
          { label: 'Advantage Equivalent Passive Bonus', value: `~+${(((pAdvantage - pStraight) / 0.05)).toFixed(1)} to modifier` },
          { label: 'Critical 20 Natural Success Rate', value: '5.0% (Advantage: 9.75%)' },
          { label: 'Critical 1 Natural Failure Rate', value: '5.0% (Disadvantage: 9.75%)' }
        ],
        explanation: `With a modifier of +${mod} facing DC ${dc}, you need a ${neededRoll} or higher on the d20 die: Straight roll gives ${(pStraight * 100).toFixed(1)}% success, Advantage increases this to ${(pAdvantage * 100).toFixed(1)}%, and Disadvantage reduces it to ${(pDisadvantage * 100).toFixed(1)}%.`
      };
    }
  }
];
