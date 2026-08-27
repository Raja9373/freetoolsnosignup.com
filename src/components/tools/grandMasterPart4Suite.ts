import { CalculatorDefinition } from './calculatorEngine';

export const GRAND_MASTER_PART4_SUITE: CalculatorDefinition[] = [
  // -------------------------------------------------------------
  // 1. CONSTRUCTION, HOME IMPROVEMENT & EVERYDAY
  // -------------------------------------------------------------
  {
    id: 'concrete-slab-yardage-calc',
    name: 'Concrete Slab, Footing & Column Volume Yardage Calculator',
    category: 'construction',
    subCategory: 'Structural Concrete & Masonry',
    description: 'Calculate cubic yards (yd³) of ready-mix concrete, 60lb/80lb premix bags, and waste factor for slabs, footings, post holes, and foundations.',
    formula: 'Cubic Yards = (Length ft * Width ft * (Depth in / 12)) / 27; 80lb Bags = Cu Yds * 45; 60lb Bags = Cu Yds * 60',
    inputs: [
      { id: 'slabLengthFt', label: 'Slab Length (Feet)', type: 'number', defaultValue: 24, min: 1, max: 1000, step: 1 },
      { id: 'slabWidthFt', label: 'Slab Width (Feet)', type: 'number', defaultValue: 12, min: 1, max: 1000, step: 1 },
      { id: 'slabThicknessInches', label: 'Thickness / Depth (Inches)', type: 'number', defaultValue: 4, min: 1, max: 48, step: 0.5 },
      { id: 'wasteAllowancePercent', label: 'Spillage & Excavation Waste Factor (%)', type: 'number', defaultValue: 10, min: 0, max: 30, step: 1 }
    ],
    calculate: (inputs) => {
      const len = Number(inputs.slabLengthFt) || 24;
      const wid = Number(inputs.slabWidthFt) || 12;
      const thickIn = Number(inputs.slabThicknessInches) || 4;
      const wastePct = Number(inputs.wasteAllowancePercent) || 10;

      const rawCuFt = len * wid * (thickIn / 12);
      const rawCuYd = rawCuFt / 27;
      const totalCuYd = rawCuYd * (1 + wastePct / 100);
      const totalCuFt = totalCuYd * 27;

      const bags80lb = Math.ceil(totalCuYd * 45);
      const bags60lb = Math.ceil(totalCuYd * 60);
      const estimatedWeightLbs = totalCuYd * 4050; // 4050 lbs/yd3 concrete density

      return {
        primaryValue: `${totalCuYd.toFixed(2)} Cubic Yards (yd³)`,
        primaryLabel: `Total Ready-Mix Concrete Needed (incl. ${wastePct}% waste)`,
        secondaryMetrics: [
          { label: 'Or Premix 80-lb Bags (Quikrete / Sakrete)', value: `${bags80lb} bags` },
          { label: 'Or Premix 60-lb Bags', value: `${bags60lb} bags` },
          { label: 'Total Volume in Cubic Feet', value: `${totalCuFt.toFixed(1)} cu ft (${(totalCuFt * 0.0283168).toFixed(2)} m³)` },
          { label: 'Estimated Wet Concrete Weight', value: `${Math.round(estimatedWeightLbs).toLocaleString()} lbs (${(estimatedWeightLbs / 2000).toFixed(2)} US Tons)` },
          { label: 'Slab Surface Area', value: `${len * wid} sq ft` }
        ],
        explanation: `Pouring a ${len}' x ${wid}' slab at ${thickIn}" depth requires ${totalCuYd.toFixed(2)} cubic yards of ready-mix concrete (or ${bags80lb} eighty-pound premix bags) with a ${wastePct}% waste buffer.`
      };
    }
  },
  {
    id: 'drywall-sheet-compound-calc',
    name: 'Drywall Sheets, Joint Compound & Screw Estimator',
    category: 'construction',
    subCategory: 'Interior Framing & Drywall',
    description: 'Calculate 4x8 and 4x12 gypsum wallboard sheet counts, drywall screws, joint compound buckets, and paper tape rolls for rooms and walls.',
    formula: 'Wall Area = 2 * (L + W) * H; Ceiling Area = L * W; 4x8 Sheet = 32 sq ft; 4x12 Sheet = 48 sq ft',
    inputs: [
      { id: 'roomLengthFt', label: 'Room Length (Feet)', type: 'number', defaultValue: 20, min: 1, max: 500, step: 1 },
      { id: 'roomWidthFt', label: 'Room Width (Feet)', type: 'number', defaultValue: 15, min: 1, max: 500, step: 1 },
      { id: 'ceilingHeightFt', label: 'Ceiling Height (Feet)', type: 'number', defaultValue: 9, min: 6, max: 25, step: 0.5 },
      { id: 'includeCeiling', label: 'Include Ceiling Drywall (0 = Walls Only, 1 = Walls + Ceiling)', type: 'number', defaultValue: 1, min: 0, max: 1, step: 1 }
    ],
    calculate: (inputs) => {
      const l = Number(inputs.roomLengthFt) || 20;
      const w = Number(inputs.roomWidthFt) || 15;
      const h = Number(inputs.ceilingHeightFt) || 9;
      const incCeiling = Number(inputs.includeCeiling) === 1;

      const wallArea = 2 * (l + w) * h;
      const ceilingArea = incCeiling ? (l * w) : 0;
      const totalArea = (wallArea + ceilingArea) * 1.10; // 10% cutting waste

      const sheets4x8 = Math.ceil(totalArea / 32);
      const sheets4x12 = Math.ceil(totalArea / 48);

      const jointCompoundGallons = Math.ceil(totalArea * 0.053); // ~5.3 gal per 1000 sq ft
      const jointTapeRolls500ft = Math.ceil((totalArea * 0.37) / 500); // ~370 linear ft tape per 1000 sqft
      const drywallScrewsLbs = Math.ceil((sheets4x8 * 32) / 300); // ~1 lb screws per 300 sq ft

      return {
        primaryValue: `${sheets4x8} Sheets (4' × 8')`,
        primaryLabel: 'Standard 4x8 Drywall Sheets Required (incl. 10% cut waste)',
        secondaryMetrics: [
          { label: 'Or 4\' × 12\' Large Format Sheets', value: `${sheets4x12} Sheets (fewer seams)` },
          { label: 'Total Surface Area Covered', value: `${Math.round(totalArea)} sq ft (Walls: ${wallArea} sq ft, Ceiling: ${ceilingArea} sq ft)` },
          { label: 'Joint Compound / Mud Required', value: `${jointCompoundGallons} Gallons (~${Math.ceil(jointCompoundGallons / 4.5)} x 4.5-gal pails)` },
          { label: 'Drywall Paper Tape (500ft rolls)', value: `${jointTapeRolls500ft} roll(s)` },
          { label: '1-1/4" Drywall Screws Needed', value: `~${drywallScrewsLbs} lbs (~${drywallScrewsLbs * 300} screws)` }
        ],
        explanation: `Covering a ${l}' x ${w}' room with ${h}' ceilings (${Math.round(totalArea)} sq ft with 10% waste) requires ${sheets4x8} standard 4'x8' drywall sheets (or ${sheets4x12} 4'x12' sheets), ${jointCompoundGallons} gal of mud, and ${drywallScrewsLbs} lbs of screws.`
      };
    }
  },
  {
    id: 'paver-patio-sand-base-calc',
    name: 'Paver Patio, Base Gravel & Bedding Sand Estimator',
    category: 'construction',
    subCategory: 'Landscaping & Hardscaping',
    description: 'Calculate interlocking brick paver piece counts, crushed gravel base volume (4"-6"), bedding coarse sand layer (1"), and polymeric joint sand.',
    formula: 'Base Gravel Cu Yd = (L * W * (Base Depth in / 12)) / 27; Sand Bedding Cu Yd = (L * W * (1 / 12)) / 27',
    inputs: [
      { id: 'patioLengthFt', label: 'Patio Length (Feet)', type: 'number', defaultValue: 16, min: 1, max: 200, step: 1 },
      { id: 'patioWidthFt', label: 'Patio Width (Feet)', type: 'number', defaultValue: 12, min: 1, max: 200, step: 1 },
      { id: 'paverLengthInches', label: 'Paver Length (Inches)', type: 'number', defaultValue: 8, min: 3, max: 24, step: 0.5 },
      { id: 'paverWidthInches', label: 'Paver Width (Inches)', type: 'number', defaultValue: 4, min: 3, max: 24, step: 0.5 },
      { id: 'baseDepthInches', label: 'Compacted Gravel Subbase Depth (Inches)', type: 'number', defaultValue: 4, min: 2, max: 12, step: 1 }
    ],
    calculate: (inputs) => {
      const l = Number(inputs.patioLengthFt) || 16;
      const w = Number(inputs.patioWidthFt) || 12;
      const paverL = Number(inputs.paverLengthInches) || 8;
      const paverW = Number(inputs.paverWidthInches) || 4;
      const baseIn = Number(inputs.baseDepthInches) || 4;

      const totalSqFt = l * w;
      const paverSqFt = (paverL * paverW) / 144;
      const paversNeeded = Math.ceil((totalSqFt / paverSqFt) * 1.08); // 8% cut waste

      const baseCuYds = (totalSqFt * (baseIn / 12)) / 27 * 1.10;
      const baseTons = baseCuYds * 1.4; // ~1.4 tons crushed gravel per cu yd

      const beddingSandCuYds = (totalSqFt * (1 / 12)) / 27 * 1.10;
      const beddingSandTons = beddingSandCuYds * 1.35;

      const polymericSand50lbBags = Math.ceil(totalSqFt / 60);

      return {
        primaryValue: `${paversNeeded} Pavers (${paverL}" × ${paverW}")`,
        primaryLabel: `Total Interlocking Paver Stones (${totalSqFt} sq ft patio + 8% cuts)`,
        secondaryMetrics: [
          { label: 'Crushed Base Gravel (Item 4 / Roadbase)', value: `${baseCuYds.toFixed(2)} yd³ (~${baseTons.toFixed(1)} Tons compacted)` },
          { label: 'Coarse Bedding Sand (1" Layer)', value: `${beddingSandCuYds.toFixed(2)} yd³ (~${beddingSandTons.toFixed(1)} Tons)` },
          { label: 'Polymeric Joint Sand (50-lb bags)', value: `${polymericSand50lbBags} bags (locks pavers against weeds)` },
          { label: 'Total Patio Footprint', value: `${totalSqFt} sq ft (${(totalSqFt * 0.092903).toFixed(2)} m²)` }
        ],
        explanation: `A ${l}' x ${w}' patio (${totalSqFt} sq ft) requires ${paversNeeded} pavers (${paverL}"x${paverW}"), ${baseCuYds.toFixed(2)} cu yds (${baseTons.toFixed(1)} tons) of base gravel, and ${beddingSandCuYds.toFixed(2)} cu yds of bedding sand.`
      };
    }
  },
  {
    id: 'fencing-materials-posts-calc',
    name: 'Fence Posts, Rails & Pickets Hardware Estimator',
    category: 'construction',
    subCategory: 'Fencing & Perimeter',
    description: 'Calculate wood or vinyl fence posts (6ft or 8ft on center), 2x4 horizontal backer rails, vertical pickets, and concrete post hole bags.',
    formula: 'Posts = Ceil(Length / PostSpacing) + 1; Rails = (Posts - 1) * RailsPerSection; Pickets = (Length * 12) / PicketWidth',
    inputs: [
      { id: 'fenceLengthFt', label: 'Total Fence Run Length (Feet)', type: 'number', defaultValue: 120, min: 5, max: 5000, step: 5 },
      { id: 'postSpacingFt', label: 'Post Spacing (Feet on Center)', type: 'number', defaultValue: 8, min: 4, max: 10, step: 1 },
      { id: 'railsPerSection', label: 'Horizontal Rails per Section (2 for 4ft fence, 3 for 6ft fence)', type: 'number', defaultValue: 3, min: 2, max: 4, step: 1 },
      { id: 'picketWidthInches', label: 'Picket Width (Inches) (e.g. 5.5" for 1x6, 3.5" for 1x4)', type: 'number', defaultValue: 5.5, min: 2.5, max: 8, step: 0.5 }
    ],
    calculate: (inputs) => {
      const len = Number(inputs.fenceLengthFt) || 120;
      const spacing = Number(inputs.postSpacingFt) || 8;
      const rails = Number(inputs.railsPerSection) || 3;
      const picketW = Number(inputs.picketWidthInches) || 5.5;

      const sections = Math.ceil(len / spacing);
      const totalPosts = sections + 1;
      const totalRails = sections * rails;
      const picketsCount = Math.ceil(((len * 12) / picketW) * 1.05); // 5% extra
      const postHoleConcreteBags = totalPosts * 2; // 2x 50lb bags per post hole

      return {
        primaryValue: `${totalPosts} Fence Posts (4" × 4")`,
        primaryLabel: `Total Vertical Fence Posts (${len} linear feet run)`,
        secondaryMetrics: [
          { label: 'Horizontal Backer Rails (2" × 4")', value: `${totalRails} Rails (${spacing}-ft lumber)` },
          { label: 'Vertical Privacy Pickets', value: `${picketsCount} Pickets (${picketW}" wide incl. 5% cuts)` },
          { label: 'Concrete for Post Holes (50-lb bags)', value: `${postHoleConcreteBags} bags (2 bags per hole)` },
          { label: 'Number of Fence Bays / Sections', value: `${sections} Sections (${spacing} ft on center)` }
        ],
        explanation: `A ${len}-foot privacy fence spaced at ${spacing}' intervals requires ${totalPosts} posts, ${totalRails} horizontal rails, ${picketsCount} pickets, and ${postHoleConcreteBags} bags of post-setting concrete.`
      };
    }
  },
  {
    id: 'roof-pitch-slope-rafter-calc',
    name: 'Roof Pitch, Angle & Rafter Length Calculator',
    category: 'construction',
    subCategory: 'Roofing & Framing',
    description: 'Calculate roof pitch ratio (rise/12), pitch angle in degrees, roof surface slope multiplier, and common rafter length from building span and rise.',
    formula: 'Pitch Angle = arctan(Rise / 12); Slope Multiplier = √(1 + (Rise/12)²); Rafter Length = Run * Multiplier + Overhang',
    inputs: [
      { id: 'roofRiseInches', label: 'Roof Rise per 12" Run (e.g. 6 in 12 pitch)', type: 'number', defaultValue: 6, min: 1, max: 24, step: 0.5 },
      { id: 'buildingSpanFt', label: 'Building Total Width / Span (Feet)', type: 'number', defaultValue: 28, min: 4, max: 200, step: 1 },
      { id: 'eaveOverhangInches', label: 'Eave Overhang (Inches)', type: 'number', defaultValue: 12, min: 0, max: 48, step: 1 }
    ],
    calculate: (inputs) => {
      const rise = Number(inputs.roofRiseInches) || 6;
      const span = Number(inputs.buildingSpanFt) || 28;
      const overhangIn = Number(inputs.eaveOverhangInches) || 12;

      const runFt = span / 2;
      const pitchRatio = rise / 12;
      const pitchAngleDeg = Math.atan(pitchRatio) * (180 / Math.PI);
      const slopeMultiplier = Math.sqrt(1 + Math.pow(pitchRatio, 2));

      const rafterRunFt = runFt + (overhangIn / 12);
      const rafterLengthFt = rafterRunFt * slopeMultiplier;

      return {
        primaryValue: `${rise}/12 Pitch (${pitchAngleDeg.toFixed(1)}°)`,
        primaryLabel: 'Roof Pitch & Incline Angle',
        secondaryMetrics: [
          { label: 'Common Rafter Cut Length (with overhang)', value: `${rafterLengthFt.toFixed(2)} ft (${Math.floor(rafterLengthFt)}' ${( (rafterLengthFt % 1) * 12).toFixed(1)}")` },
          { label: 'Slope Area Factor Multiplier', value: `${slopeMultiplier.toFixed(3)}x horizontal area` },
          { label: 'Building Half Span (Run)', value: `${runFt} ft (${runFt * 12} inches)` },
          { label: 'Total Peak Ridge Elevation Rise', value: `${(runFt * rise).toFixed(1)} inches (${((runFt * rise) / 12).toFixed(2)} ft)` }
        ],
        explanation: `A ${rise}/12 roof pitch has an incline of ${pitchAngleDeg.toFixed(1)}° and a slope multiplier of ${slopeMultiplier.toFixed(3)}. For a ${span}-ft building with a ${overhangIn}" overhang, common rafters measure ${rafterLengthFt.toFixed(2)} ft.`
      };
    }
  },
  {
    id: 'hvac-btu-room-ac-calc',
    name: 'HVAC Air Conditioner BTU Cooling Capacity Calculator',
    category: 'everyday',
    subCategory: 'Home & Climate Control',
    description: 'Calculate room cooling BTU requirement, seasonal energy efficiency ratio (SEER2), and electrical running wattage based on square footage and sunlight.',
    formula: 'Base BTU = Area * 20 BTU/sqft; Adjust for sunlight (+10% sunny, -10% shaded) + 600 BTU per occupant > 2',
    inputs: [
      { id: 'roomLengthFt', label: 'Room Length (Feet)', type: 'number', defaultValue: 20, min: 5, max: 100, step: 1 },
      { id: 'roomWidthFt', label: 'Room Width (Feet)', type: 'number', defaultValue: 18, min: 5, max: 100, step: 1 },
      { id: 'sunExposure', label: 'Sun Exposure (1 = Normal, 2 = Heavy Sunny / Top Floor, 0 = Heavily Shaded / Basement)', type: 'number', defaultValue: 1, min: 0, max: 2, step: 1 },
      { id: 'occupantsCount', label: 'Typical Room Occupants', type: 'number', defaultValue: 2, min: 1, max: 20, step: 1 }
    ],
    calculate: (inputs) => {
      const l = Number(inputs.roomLengthFt) || 20;
      const w = Number(inputs.roomWidthFt) || 18;
      const sun = Number(inputs.sunExposure) || 1;
      const occ = Number(inputs.occupantsCount) || 2;

      const sqFt = l * w;
      let baseBtu = sqFt * 20;

      if (sun === 2) baseBtu *= 1.10; // 10% more for hot sunny
      if (sun === 0) baseBtu *= 0.90; // 10% less for shaded

      if (occ > 2) {
        baseBtu += (occ - 2) * 600;
      }

      const tonsOfCooling = baseBtu / 12000;
      const runningWatts = baseBtu / 11; // ~11 EER average
      const recommendedAcSize = Math.ceil(baseBtu / 1000) * 1000;

      return {
        primaryValue: `${Math.round(recommendedAcSize).toLocaleString()} BTU/hr`,
        primaryLabel: `Recommended AC Size for ${sqFt} sq ft Room`,
        secondaryMetrics: [
          { label: 'Tons of Air Conditioning', value: `${tonsOfCooling.toFixed(2)} Tons (1 Ton = 12,000 BTU)` },
          { label: 'Estimated Running Power', value: `~${Math.round(runningWatts)} Watts (~${(runningWatts / 1000).toFixed(2)} kW)` },
          { label: 'Room Floor Area', value: `${sqFt} sq ft (${(sqFt * 0.0929).toFixed(1)} m²)` },
          { label: 'Standard Window AC Unit Class', value: recommendedAcSize <= 8000 ? 'Small (5k - 8k BTU)' : recommendedAcSize <= 14000 ? 'Medium (10k - 14k BTU)' : 'Large / Mini-Split (18k+ BTU)' }
        ],
        explanation: `Cooling a ${sqFt} sq ft space with ${occ} occupants requires an estimated ${Math.round(recommendedAcSize).toLocaleString()} BTU/hr (${tonsOfCooling.toFixed(2)} tons of refrigeration).`
      };
    }
  },
  {
    id: 'solar-panel-array-sizing-calc',
    name: 'Solar Panel Array Sizing & Daily Kilowatt-Hour (kWh) Estimator',
    category: 'everyday',
    subCategory: 'Green Energy & Solar',
    description: 'Calculate solar system capacity (kW DC), number of 400W photovoltaic panels, daily sun hour energy yield, and roof area needed.',
    formula: 'Array kW = (Monthly kWh / 30) / Peak Sun Hours / 0.80 System Derate; Panels = (Array kW * 1000) / Panel Watts',
    inputs: [
      { id: 'monthlyKwhBill', label: 'Monthly Electricity Usage (kWh)', type: 'number', defaultValue: 900, min: 50, max: 10000, step: 25 },
      { id: 'peakSunHours', label: 'Daily Average Peak Sun Hours (3.5 - 6.0 hrs/day)', type: 'number', defaultValue: 4.8, min: 2.0, max: 8.0, step: 0.1 },
      { id: 'panelWattageRating', label: 'Individual Panel Power Rating (Watts)', type: 'number', defaultValue: 400, min: 250, max: 600, step: 10 }
    ],
    calculate: (inputs) => {
      const monthlyKwh = Number(inputs.monthlyKwhBill) || 900;
      const sunHours = Number(inputs.peakSunHours) || 4.8;
      const panelWatts = Number(inputs.panelWattageRating) || 400;

      const dailyKwhGoal = monthlyKwh / 30;
      const derateEfficiency = 0.80; // inverter, wiring, dust, temperature losses

      const requiredArrayKw = dailyKwhGoal / (sunHours * derateEfficiency);
      const totalPanels = Math.ceil((requiredArrayKw * 1000) / panelWatts);
      const actualSystemKw = (totalPanels * panelWatts) / 1000;
      const roofSqFt = totalPanels * 19.5; // ~19.5 sq ft per 400W panel
      const annualKwhYield = actualSystemKw * sunHours * 365 * derateEfficiency;

      return {
        primaryValue: `${totalPanels} Solar Panels (${actualSystemKw.toFixed(2)} kW System)`,
        primaryLabel: 'Recommended Photovoltaic (PV) Array',
        secondaryMetrics: [
          { label: 'Annual Electricity Generation', value: `${Math.round(annualKwhYield).toLocaleString()} kWh/year` },
          { label: 'Required Unshaded Roof Area', value: `~${Math.round(roofSqFt)} sq ft (~${(roofSqFt * 0.0929).toFixed(1)} m²)` },
          { label: 'Daily Target Production', value: `${dailyKwhGoal.toFixed(1)} kWh/day (${monthlyKwh} kWh/month)` },
          { label: 'System Derate Factor', value: '80% (accounting for inverter/thermal losses)' }
        ],
        explanation: `To offset ${monthlyKwh} kWh/month at ${sunHours} peak sun hours/day, you need a ${actualSystemKw.toFixed(2)} kW solar array comprising ${totalPanels} panels (${panelWatts}W each), requiring ~${Math.round(roofSqFt)} sq ft of roof space.`
      };
    }
  },
  {
    id: 'bra-size-band-cup-fitter-calc',
    name: 'Bra Size & Cup Volume (US, UK & EU) Fitting Calculator',
    category: 'everyday',
    subCategory: 'Clothing & Sizing',
    description: 'Calculate accurate bra band size and cup letter (A to J) from snug ribcage underbust and standing/leaning bust measurements.',
    formula: 'Band Size = Underbust rounded to even + 4" (traditional) or direct underbust (modern); Cup = Bust - Band (1"=A, 2"=B, 3"=C, 4"=D, 5"=DD/E, 6"=DDD/F)',
    inputs: [
      { id: 'underbustInches', label: 'Snug Underbust Ribcage Circumference (Inches)', type: 'number', defaultValue: 30.5, min: 22, max: 60, step: 0.5 },
      { id: 'bustInches', label: 'Fullest Bust Circumference (Inches)', type: 'number', defaultValue: 35.5, min: 24, max: 75, step: 0.5 }
    ],
    calculate: (inputs) => {
      const underbust = Number(inputs.underbustInches) || 30.5;
      const bust = Number(inputs.bustInches) || 35.5;

      const roundedUnderbust = Math.round(underbust);
      const bandSize = (roundedUnderbust % 2 === 0) ? roundedUnderbust : roundedUnderbust + 1;
      const diff = Math.max(0, bust - bandSize);

      const cupLabelsUs = ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F', 'G', 'H', 'I', 'J'];
      const cupLabelsUk = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'GG'];
      const cupIndex = Math.min(cupLabelsUs.length - 1, Math.max(0, Math.round(diff)));

      const usSize = `${bandSize}${cupLabelsUs[cupIndex]}`;
      const ukSize = `${bandSize}${cupLabelsUk[cupIndex]}`;
      const euBand = Math.round(underbust * 2.54 / 5) * 5;
      const euSize = `${euBand}${cupLabelsUs[cupIndex]}`;

      return {
        primaryValue: `US ${usSize} / UK ${ukSize}`,
        primaryLabel: 'Fitted Bra Size',
        secondaryMetrics: [
          { label: 'European (EU) Size', value: `EU ${euSize}` },
          { label: 'Band Size Measurement', value: `${bandSize} inches` },
          { label: 'Bust-to-Band Difference', value: `${diff.toFixed(1)} inches (Cup ${cupLabelsUs[cupIndex]})` },
          { label: 'Sister Sizes (Equal Cup Volume)', value: `${bandSize - 2}${cupLabelsUs[Math.min(cupIndex + 1, cupLabelsUs.length - 1)]} / ${bandSize + 2}${cupLabelsUs[Math.max(0, cupIndex - 1)]}` }
        ],
        explanation: `With an underbust of ${underbust}" and bust of ${bust}", your fitted size is US ${usSize} (UK ${ukSize}, EU ${euSize}).`
      };
    }
  },
  {
    id: 'ev-charging-time-range-calc',
    name: 'Electric Vehicle (EV) Charging Time & Cost Calculator',
    category: 'everyday',
    subCategory: 'Automotive & Transportation',
    description: 'Calculate charging duration hours from 20% to 80% or 100% SoC, range added per hour, electricity cost, and charging power kW across Level 1, 2, and DC Fast Chargers.',
    formula: 'Time (hrs) = (Battery kWh * (Target % - Start %)) / (Charger kW * 0.90 Efficiency); Cost = Added kWh * ($/kWh)',
    inputs: [
      { id: 'batteryCapacityKwh', label: 'EV Battery Pack Capacity (kWh)', type: 'number', defaultValue: 75, min: 10, max: 200, step: 1 },
      { id: 'chargerPowerKw', label: 'Charger Power (kW) (1.4=L1 120V, 9.6=L2 240V 40A, 50=DC Fast, 150=Supercharger)', type: 'number', defaultValue: 9.6, min: 1.0, max: 350, step: 0.2 },
      { id: 'startSocPercent', label: 'Starting State of Charge (%)', type: 'number', defaultValue: 20, min: 0, max: 99, step: 1 },
      { id: 'targetSocPercent', label: 'Target State of Charge (%)', type: 'number', defaultValue: 80, min: 1, max: 100, step: 1 },
      { id: 'electricityRatePerKwh', label: 'Electricity Cost ($ per kWh)', type: 'number', defaultValue: 0.15, min: 0.01, max: 1.0, step: 0.01 }
    ],
    calculate: (inputs) => {
      const batKwh = Number(inputs.batteryCapacityKwh) || 75;
      const kw = Math.max(0.5, Number(inputs.chargerPowerKw) || 9.6);
      const startPct = Number(inputs.startSocPercent) || 20;
      const targetPct = Number(inputs.targetSocPercent) || 80;
      const rate = Number(inputs.electricityRatePerKwh) || 0.15;

      const deltaPct = Math.max(1, targetPct - startPct);
      const energyNeededKwh = (batKwh * (deltaPct / 100));
      const chargerEfficiency = kw > 20 ? 0.93 : 0.88; // AC vs DC efficiency
      const energyFromWallKwh = energyNeededKwh / chargerEfficiency;

      const hoursNeeded = energyFromWallKwh / kw;
      const hoursInt = Math.floor(hoursNeeded);
      const minutesInt = Math.round((hoursNeeded - hoursInt) * 60);

      const totalCost = energyFromWallKwh * rate;
      const milesAdded = (energyNeededKwh / 0.30); // ~3.33 miles per kWh (300 Wh/mi)
      const milesPerHour = milesAdded / hoursNeeded;

      return {
        primaryValue: `${hoursInt}h ${minutesInt}m (${hoursNeeded.toFixed(1)} hrs)`,
        primaryLabel: `Charge Time from ${startPct}% to ${targetPct}% SoC`,
        secondaryMetrics: [
          { label: 'Total Session Cost', value: `$${totalCost.toFixed(2)} ($${(totalCost / milesAdded).toFixed(3)} per mile)` },
          { label: 'Driving Range Added', value: `~${Math.round(milesAdded)} miles (~${Math.round(milesAdded * 1.60934)} km)` },
          { label: 'Charge Speed / Rate', value: `+${Math.round(milesPerHour)} miles of range per hour` },
          { label: 'Energy Delivered to Battery', value: `${energyNeededKwh.toFixed(1)} kWh (${energyFromWallKwh.toFixed(1)} kWh from grid)` }
        ],
        explanation: `Charging a ${batKwh} kWh battery from ${startPct}% to ${targetPct}% (${energyNeededKwh.toFixed(1)} kWh added) at ${kw} kW takes ${hoursInt}h ${minutesInt}m and costs $${totalCost.toFixed(2)} at $${rate}/kWh.`
      };
    }
  },
  {
    id: 'generator-wattage-surge-calc',
    name: 'Home Emergency Generator Wattage & Sizing Calculator',
    category: 'everyday',
    subCategory: 'Home & Electrical',
    description: 'Calculate running wattage and surge starting wattage requirements for refrigerator, sump pump, furnace blower, lights, and essential home appliances.',
    formula: 'Running Watts = ∑ Running Watts; Generator Size = Max Surge Start Watts + Running Watts',
    inputs: [
      { id: 'refrigeratorWatts', label: 'Refrigerator / Freezer (Running Watts: 600, Surge: 1800)', type: 'number', defaultValue: 600, min: 0, max: 3000, step: 50 },
      { id: 'sumpPumpWatts', label: 'Sump Pump 1/2 HP (Running Watts: 1050, Surge: 2150)', type: 'number', defaultValue: 1050, min: 0, max: 4000, step: 50 },
      { id: 'furnaceBlowerWatts', label: 'Furnace Fan Blower (Running Watts: 800, Surge: 2000)', type: 'number', defaultValue: 800, min: 0, max: 4000, step: 50 },
      { id: 'lightsRouterOtherWatts', label: 'LED Lighting, Wi-Fi Router, TV & Laptops (Watts)', type: 'number', defaultValue: 500, min: 0, max: 5000, step: 50 }
    ],
    calculate: (inputs) => {
      const fridge = Number(inputs.refrigeratorWatts) || 600;
      const sump = Number(inputs.sumpPumpWatts) || 1050;
      const furnace = Number(inputs.furnaceBlowerWatts) || 800;
      const other = Number(inputs.lightsRouterOtherWatts) || 500;

      const totalRunningWatts = fridge + sump + furnace + other;
      // Highest single surge appliance + running watts
      const maxSurgeDelta = Math.max(1200, 1100, 1200); // surge overhead
      const totalPeakSurgeWatts = totalRunningWatts + maxSurgeDelta;

      const recommendedGenRunning = Math.ceil((totalRunningWatts * 1.20) / 500) * 500; // 20% safety margin
      const recommendedGenStarting = Math.ceil((totalPeakSurgeWatts * 1.15) / 500) * 500;

      return {
        primaryValue: `${recommendedGenRunning.toLocaleString()}W Running / ${recommendedGenStarting.toLocaleString()}W Starting`,
        primaryLabel: 'Recommended Portable Generator Sizing (incl. 20% safety margin)',
        secondaryMetrics: [
          { label: 'Continuous Running Load', value: `${totalRunningWatts.toLocaleString()} Watts (${(totalRunningWatts / 120).toFixed(1)} Amps @ 120V)` },
          { label: 'Maximum Peak Starting Surge', value: `${totalPeakSurgeWatts.toLocaleString()} Watts` },
          { label: 'Typical Generator Category', value: recommendedGenRunning <= 4500 ? 'Inverter Portable (3500W - 4500W)' : 'Heavy Duty Portable / Dual-Fuel (7500W - 9500W)' }
        ],
        explanation: `With ${totalRunningWatts}W running load and ${totalPeakSurgeWatts}W peak motor start surge, a ${recommendedGenRunning}W running / ${recommendedGenStarting}W starting generator will reliably power all selected home essentials.`
      };
    }
  }
];
