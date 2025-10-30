import React, { useState, useMemo } from 'react';

const MethodologyImpactSection = () => {
  const card = {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)',
    border: '4px solid #64748b',
    borderRadius: '16px',
    padding: '28px'
  };

  const pill = (bg, color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background: bg,
    color,
  });

  const Callout = ({ x, y, text, color = '#111827', bg = 'white', lineTo }) => (
    <g>
      {lineTo && (
        <line x1={x} y1={y} x2={lineTo.x} y2={lineTo.y} stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
      )}
      <rect x={x - 6} y={y - 18} rx="6" ry="6" width={Math.max(120, text.length * 6.4 + 14)} height="28" fill={bg} stroke={color} strokeOpacity="0.25" />
      <text x={x + 8} y={y + 2} fill={color} fontSize="12" fontWeight="700">{text}</text>
    </g>
  );

  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: 48, height: 48, background: '#475569', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📈</div>
        <h2 style={{ fontSize: 22, fontWeight: '800', color: '#111827', margin: 0 }}>
          Methodology Impact: Why Episodic Training Fails—and Continuous Development Works
        </h2>
      </div>

      <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={pill('#fee2e2', '#991b1b')}>🔴 Episodic training (red line)</span>
            <span style={pill('#dbeafe', '#1e40af')}>🔵 Continuous development (blue line)</span>
          </div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>Higher area under curve = retained capability</div>
        </div>

        <svg viewBox="0 0 760 300" style={{ width: '100%', height: 260, display: 'block' }}>
          <line x1="60" y1="24" x2="60" y2="250" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="60" y1="250" x2="730" y2="250" stroke="#cbd5e1" strokeWidth="2" />
          <text x="14" y="34" fill="#475569" fontSize="11" fontWeight="700">Skill / Recall</text>
          <text x="690" y="292" fill="#475569" fontSize="11" fontWeight="700">Time</text>

          {[140, 220, 300, 380, 460, 540, 620, 700].map((x, i) => (
            <line key={i} x1={x} y1="250" x2={x} y2="246" stroke="#cbd5e1" />
          ))}
          {[90, 130, 170, 210].map((y, i) => (
            <line key={i} x1="60" y1={y} x2="730" y2={y} stroke="#e5e7eb" />
          ))}

          <path d="M 60 60 C 180 56, 250 80, 320 120 C 380 154, 450 190, 730 230" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 60 230 C 110 200, 150 190, 190 170 C 210 160, 230 150, 250 160 C 270 175, 300 150, 330 135 C 350 125, 370 120, 390 130 C 410 142, 440 128, 470 118 C 490 112, 510 110, 530 120 C 550 130, 585 118, 620 108 C 640 102, 660 98, 730 92" fill="none" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />

          {[190, 250, 330, 390, 470, 530, 620].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="250" x2={x} y2="242" stroke="#93c5fd" strokeWidth="2" />
              <circle cx={x} cy={140 - i * 3 + 18} r="4" fill="#60a5fa" />
            </g>
          ))}

          <Callout x={180} y={60} text="Peak right after event" color="#991b1b" bg="#fff5f5" lineTo={{ x: 150, y: 66 }} />
          <Callout x={410} y={168} text="~70% forgotten in 24h" color="#991b1b" bg="#fff5f5" lineTo={{ x: 365, y: 150 }} />
          <Callout x={640} y={228} text="~90% within a month" color="#991b1b" bg="#fff5f5" lineTo={{ x: 600, y: 212 }} />
          <Callout x={520} y={84} text="Continuous reinforcement" color="#1e3a8a" bg="#eef2ff" lineTo={{ x: 560, y: 110 }} />
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
          <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 13, color: '#9a3412', fontWeight: 700, marginBottom: 6 }}>The Red Line: Why retention stalls</div>
            <ul style={{ margin: 0, paddingLeft: 16, color: '#7c2d12', fontSize: 13, lineHeight: 1.6 }}>
              <li>Event spikes learning → rapid decay (forgetting curve)</li>
              <li>Episodic workshops don't rewire habits</li>
              <li>Leaders default to command-and-control under stress without reinforcement</li>
            </ul>
          </div>
          <div style={{ background: '#ecfeff', border: '1px solid #67e8f9', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 13, color: '#155e75', fontWeight: 700, marginBottom: 6 }}>The Blue Line: Why DAF moved retention +7%</div>
            <ul style={{ margin: 0, paddingLeft: 16, color: '#0e7490', fontSize: 13, lineHeight: 1.6 }}>
              <li>Continuous, personalized practice + coaching compounds capability</li>
              <li>Just-in-time support during critical incidents & career choke points</li>
              <li>Transforms one-off training into ongoing learning journeys</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: '#475569' }}>
          <strong>Leadership takeaway:</strong> Preserve institutional knowledge through continuous development now—don't wait until 2028 exits make it irrecoverable.
        </div>
      </div>

      <div style={{ marginTop: 16, background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 12, padding: 16 }}>
        <p style={{ margin: 0, fontSize: 14, color: '#92400e', lineHeight: 1.6 }}>
          CBP faces multiple retention challenges—including the 2028 retirement cliff, high operational tempo, leadership culture gaps, and career development barriers. <strong>The red line shows one contributing factor:</strong> episodic training that peaks and fades, failing to transfer institutional knowledge. <strong>The blue line shows BetterUp's approach:</strong> continuous development through coaching, AI support, and learning journeys that compound over time—helping address retention by building resilience, clarifying career paths, and developing leadership capability at critical decision points.
        </p>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: '#64748b' }}>
        <strong>Sources:</strong> Ebbinghaus forgetting curve; spaced repetition research; BetterUp DAF outcomes (+7% retention); JAMA 2024 peer-reviewed burnout reduction.
      </div>
    </div>
  );
};
const CBPDashboard = () => {
  // Basic State Management
  const [org, setOrg] = useState('ofo');
  const [coa, setCoa] = useState('targeted');
  const [includeLeadForLeaders, setIncludeLeadForLeaders] = useState(false);
  const [activeTab, setActiveTab] = useState('cost-problem');
  const [showCoaDetails, setShowCoaDetails] = useState(false);
  const [manualLeadSeats, setManualLeadSeats] = useState(null);
  const [manualReadySeats, setManualReadySeats] = useState(null);
  const [manualEngagement, setManualEngagement] = useState(null);
  const [manualRetentionOverride, setManualRetentionOverride] = useState(null);
  const [manualReadinessOverride, setManualReadinessOverride] = useState(null);
  const [manualProfStandardsOverride, setManualProfStandardsOverride] = useState(null);
  const [expandedFactor, setExpandedFactor] = useState(null);
  
  // BEHAVIORAL HEALTH FACTOR SLIDERS - NOW FUNCTIONAL
  // PTSD
  const [ptsdPrevalence, setPtsdPrevalence] = useState(18); // % of workforce
  const [ptsdCoachingEffectiveness, setPtsdCoachingEffectiveness] = useState(25);
  const [ptsdWcFilingRate, setPtsdWcFilingRate] = useState(8);
  const [ptsdWcAvgCost, setPtsdWcAvgCost] = useState(85000);
  const [ptsdSeparationRate, setPtsdSeparationRate] = useState(12);
  
  // Depression
  const [depressionPrevalence, setDepressionPrevalence] = useState(18);
  const [depressionCoachingEffectiveness, setDepressionCoachingEffectiveness] = useState(25);
  const [depressionWcFilingRate, setDepressionWcFilingRate] = useState(10);
  const [depressionWcAvgCost, setDepressionWcAvgCost] = useState(55000);
  const [depressionSeparationRate, setDepressionSeparationRate] = useState(15);
  
  // Anxiety
  const [anxietyPrevalence, setAnxietyPrevalence] = useState(15);
  const [anxietyCoachingEffectiveness, setAnxietyCoachingEffectiveness] = useState(20);
  const [anxietyWcFilingRate, setAnxietyWcFilingRate] = useState(6);
  const [anxietyWcAvgCost, setAnxietyWcAvgCost] = useState(47500);
  const [anxietySeparationRate, setAnxietySeparationRate] = useState(10);
  
  // Substance Use Disorder
  const [sudPrevalence, setSudPrevalence] = useState(25);
  const [sudCoachingEffectiveness, setSudCoachingEffectiveness] = useState(67);
  const [sudWcFilingRate, setSudWcFilingRate] = useState(15);
  const [sudWcAvgCost, setSudWcAvgCost] = useState(40000);
  const [sudSeparationRate, setSudSeparationRate] = useState(25);
  
  // COMORBIDITY ADJUSTMENT - NEW!
  const [comorbidityOverlap, setComorbidityOverlap] = useState(35); // % of people with multiple conditions
  
  // Chatbot State
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Organization Data
  const orgData = useMemo(() => ({
    'cbp-wide': { name: 'CBP-Wide (All Components)', officers: 60000, avgSalary: 95000 },
    'ofo': { name: 'Office of Field Operations', officers: 26030, avgSalary: 95000 },
    'usbp': { name: 'U.S. Border Patrol', officers: 19104, avgSalary: 92000 },
    'amo': { name: 'Air & Marine Operations', officers: 1317, avgSalary: 110000 },
    'usbp-swb': { name: 'USBP - Southwest Border', officers: 16500, avgSalary: 92000 },
    'usbp-rgv': { name: 'USBP - Rio Grande Valley Sector', officers: 3500, avgSalary: 92000 },
    'usbp-tuc': { name: 'USBP - Tucson Sector', officers: 3800, avgSalary: 92000 },
    'usbp-sdg': { name: 'USBP - San Diego Sector', officers: 2400, avgSalary: 92000 },
    'usbp-ept': { name: 'USBP - El Paso Sector', officers: 2500, avgSalary: 92000 },
    'usbp-yum': { name: 'USBP - Yuma Sector', officers: 900, avgSalary: 92000 },
    'usbp-bbb': { name: 'USBP - Big Bend Sector', officers: 600, avgSalary: 92000 },
    'usbp-del': { name: 'USBP - Del Rio Sector', officers: 1200, avgSalary: 92000 },
    'usbp-lrt': { name: 'USBP - Laredo Sector', officers: 1600, avgSalary: 92000 }
  }), []);
// COMORBIDITY-ADJUSTED BEHAVIORAL HEALTH CALCULATIONS
  const behavioralHealthCalcs = useMemo(() => {
    const data = orgData[org];
    const totalOfficers = data.officers;
    
    // Step 1: Calculate raw affected populations (before comorbidity adjustment)
    const rawPtsdAffected = Math.round(totalOfficers * (ptsdPrevalence / 100));
    const rawDepressionAffected = Math.round(totalOfficers * (depressionPrevalence / 100));
    const rawAnxietyAffected = Math.round(totalOfficers * (anxietyPrevalence / 100));
    const rawSudAffected = Math.round(totalOfficers * (sudPrevalence / 100));
    
    // Step 2: Apply comorbidity adjustment
    // If 35% comorbidity, then the "unique" affected population is 65% of the sum
    const rawTotalAffected = rawPtsdAffected + rawDepressionAffected + rawAnxietyAffected + rawSudAffected;
    const comorbidityMultiplier = 1 - (comorbidityOverlap / 100);
    const uniqueAffected = Math.round(rawTotalAffected * comorbidityMultiplier);
    
    // Step 3: Proportionally distribute unique affected back to conditions
    // This maintains the relative prevalence ratios while avoiding double-counting
    const adjustmentFactor = uniqueAffected / rawTotalAffected;
    const ptsdAffected = Math.round(rawPtsdAffected * adjustmentFactor);
    const depressionAffected = Math.round(rawDepressionAffected * adjustmentFactor);
    const anxietyAffected = Math.round(rawAnxietyAffected * adjustmentFactor);
    const sudAffected = Math.round(rawSudAffected * adjustmentFactor);
    
    // Step 4: Calculate Workers' Comp Claims by condition
    const ptsdWcClaims = Math.round(ptsdAffected * (ptsdWcFilingRate / 100));
    const depressionWcClaims = Math.round(depressionAffected * (depressionWcFilingRate / 100));
    const anxietyWcClaims = Math.round(anxietyAffected * (anxietyWcFilingRate / 100));
    const sudWcClaims = Math.round(sudAffected * (sudWcFilingRate / 100));
    
    const totalBaselineWcClaims = ptsdWcClaims + depressionWcClaims + anxietyWcClaims + sudWcClaims;
    
    // Step 5: Calculate Workers' Comp Costs
    const ptsdWcCost = ptsdWcClaims * ptsdWcAvgCost;
    const depressionWcCost = depressionWcClaims * depressionWcAvgCost;
    const anxietyWcCost = anxietyWcClaims * anxietyWcAvgCost;
    const sudWcCost = sudWcClaims * sudWcAvgCost;
    
    const totalBaselineWcCost = ptsdWcCost + depressionWcCost + anxietyWcCost + sudWcCost;
    
    // Step 6: Calculate Separations by condition
    const ptsdSeparations = Math.round(ptsdAffected * (ptsdSeparationRate / 100));
    const depressionSeparations = Math.round(depressionAffected * (depressionSeparationRate / 100));
    const anxietySeparations = Math.round(anxietyAffected * (anxietySeparationRate / 100));
    const sudSeparations = Math.round(sudAffected * (sudSeparationRate / 100));
    
    const totalBehavioralSeparations = ptsdSeparations + depressionSeparations + anxietySeparations + sudSeparations;
    
    return {
      // Raw vs Adjusted populations
      rawTotalAffected,
      uniqueAffected,
      comorbidityReduction: rawTotalAffected - uniqueAffected,
      
      // Adjusted populations by condition
      ptsdAffected,
      depressionAffected,
      anxietyAffected,
      sudAffected,
      
      // Workers' Comp Claims
      ptsdWcClaims,
      depressionWcClaims,
      anxietyWcClaims,
      sudWcClaims,
      totalBaselineWcClaims,
      
      // Workers' Comp Costs
      ptsdWcCost,
      depressionWcCost,
      anxietyWcCost,
      sudWcCost,
      totalBaselineWcCost,
      
      // Separations
      ptsdSeparations,
      depressionSeparations,
      anxietySeparations,
      sudSeparations,
      totalBehavioralSeparations,
      
      // Average claim cost (for display)
      avgWcClaimCost: totalBaselineWcClaims > 0 ? Math.round(totalBaselineWcCost / totalBaselineWcClaims) : 65000
    };
  }, [org, orgData, ptsdPrevalence, depressionPrevalence, anxietyPrevalence, sudPrevalence, 
      ptsdWcFilingRate, depressionWcFilingRate, anxietyWcFilingRate, sudWcFilingRate,
      ptsdWcAvgCost, depressionWcAvgCost, anxietyWcAvgCost, sudWcAvgCost,
      ptsdSeparationRate, depressionSeparationRate, anxietySeparationRate, sudSeparationRate,
      comorbidityOverlap]);
      // MAIN ROI CALCULATIONS
  const calculations = useMemo(() => {
    const data = orgData[org];
    
    // Seat calculations
    let leadPercent, readyPercent, readyPrice;
    if (coa === 'pilot') {
      readyPercent = 0.15;
      leadPercent = includeLeadForLeaders ? 0.10 : 0;
      readyPrice = 250;
    } else if (coa === 'targeted') {
      readyPercent = 0.25;
      leadPercent = includeLeadForLeaders ? 0.10 : 0;
      readyPrice = 200;
    } else {
      readyPercent = 0.75;
      leadPercent = includeLeadForLeaders ? 0.10 : 0;
      readyPrice = 150;
    }
    
    const baseLeadSeats = Math.round(data.officers * leadPercent);
    const baseReadySeats = Math.max(Math.round(data.officers * readyPercent), 500);
    const leadSeats = manualLeadSeats !== null ? manualLeadSeats : baseLeadSeats;
    const readySeats = manualReadySeats !== null ? manualReadySeats : baseReadySeats;
    const totalSeats = leadSeats + readySeats;
    const baseEngagement = 0.65;
    const engagement = manualEngagement !== null ? manualEngagement / 100 : baseEngagement;
    const activeUsers = Math.round(totalSeats * engagement);
    const leadPrice = 5785;
    const totalInvestment = (leadSeats * leadPrice) + (readySeats * readyPrice);
    
    // RETENTION CALCULATIONS - Using behavioral health separations
    const retentionLift = manualRetentionOverride !== null ? manualRetentionOverride / 100 : 0.07;
    const attritionRate = org === 'ofo' ? 0.068 : 0.10;
    const baselineSeparations = Math.round(data.officers * attritionRate);
    
    // Behavioral-driven separations (from behavioral health model)
    const behavioralSeparations = behavioralHealthCalcs.totalBehavioralSeparations;
    
    // BetterUp prevents portion of behavioral separations based on coaching effectiveness
    // Weighted average effectiveness across all conditions
    const weightedEffectiveness = (
      (behavioralHealthCalcs.ptsdSeparations * (ptsdCoachingEffectiveness / 100)) +
      (behavioralHealthCalcs.depressionSeparations * (depressionCoachingEffectiveness / 100)) +
      (behavioralHealthCalcs.anxietySeparations * (anxietyCoachingEffectiveness / 100)) +
      (behavioralHealthCalcs.sudSeparations * (sudCoachingEffectiveness / 100))
    ) / behavioralSeparations;
    
    const separationsPrevented = Math.round(behavioralSeparations * weightedEffectiveness * engagement);
    const replacementCost = 150000;
    const retentionSavings = separationsPrevented * replacementCost;
    
    // WORKERS' COMP CALCULATIONS - Using behavioral health claims
    const readinessLift = manualReadinessOverride !== null ? manualReadinessOverride / 100 : 0.37;
    
    // Claims prevented by condition
    const ptsdClaimsPrevented = Math.round(behavioralHealthCalcs.ptsdWcClaims * (ptsdCoachingEffectiveness / 100) * engagement);
    const depressionClaimsPrevented = Math.round(behavioralHealthCalcs.depressionWcClaims * (depressionCoachingEffectiveness / 100) * engagement);
    const anxietyClaimsPrevented = Math.round(behavioralHealthCalcs.anxietyWcClaims * (anxietyCoachingEffectiveness / 100) * engagement);
    const sudClaimsPrevented = Math.round(behavioralHealthCalcs.sudWcClaims * (sudCoachingEffectiveness / 100) * engagement);
    
    const claimsPrevented = ptsdClaimsPrevented + depressionClaimsPrevented + anxietyClaimsPrevented + sudClaimsPrevented;
    
    // Savings by condition
    const ptsdWcSavings = ptsdClaimsPrevented * ptsdWcAvgCost;
    const depressionWcSavings = depressionClaimsPrevented * depressionWcAvgCost;
    const anxietyWcSavings = anxietyClaimsPrevented * anxietyWcAvgCost;
    const sudWcSavings = sudClaimsPrevented * sudWcAvgCost;
    
    const wcSavings = ptsdWcSavings + depressionWcSavings + anxietyWcSavings + sudWcSavings;
    
    // DISCIPLINE CALCULATIONS - Unchanged logic
    const profStandardsLift = manualProfStandardsOverride !== null ? manualProfStandardsOverride / 100 : 0.22;
    const baselineDisciplineCases = Math.round(data.officers * 0.035);
    const avgDisciplineCost = 45000;
    const casesPrevented = Math.round(baselineDisciplineCases * profStandardsLift * engagement);
    const disciplineSavings = casesPrevented * avgDisciplineCost;
    
    // TOTALS
    const totalSavings = retentionSavings + wcSavings + disciplineSavings;
    const netSavings = totalSavings - totalInvestment;
    const roi = totalInvestment > 0 ? ((netSavings / totalInvestment) * 100) : 0;
    
    return {
      officers: data.officers,
      leadSeats,
      readySeats,
      totalSeats,
      engagement: engagement * 100,
      activeUsers,
      leadPrice,
      readyPrice,
      totalInvestment,
      
      // Retention metrics
      retentionLift: retentionLift * 100,
      baselineSeparations,
      behavioralSeparations,
      separationsPrevented,
      retentionSavings,
      
      // Workers' Comp metrics
      readinessLift: readinessLift * 100,
      baselineWcClaims: behavioralHealthCalcs.totalBaselineWcClaims,
      claimsPrevented,
      wcSavings,
      avgWcClaimCost: behavioralHealthCalcs.avgWcClaimCost,
      
      // Breakdown by condition
      ptsdClaimsPrevented,
      depressionClaimsPrevented,
      anxietyClaimsPrevented,
      sudClaimsPrevented,
      ptsdWcSavings,
      depressionWcSavings,
      anxietyWcSavings,
      sudWcSavings,
      
      // Discipline metrics
      profStandardsLift: profStandardsLift * 100,
      baselineDisciplineCases,
      casesPrevented,
      disciplineSavings,
      
      // Final metrics
      totalSavings,
      netSavings,
      roi
    };
  }, [org, coa, includeLeadForLeaders, manualLeadSeats, manualReadySeats, manualEngagement, 
      manualRetentionOverride, manualReadinessOverride, manualProfStandardsOverride, orgData,
      behavioralHealthCalcs, ptsdCoachingEffectiveness, depressionCoachingEffectiveness,
      anxietyCoachingEffectiveness, sudCoachingEffectiveness]);

  // Helper Functions
  const fmt = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  const pct = (num) => `${num.toFixed(1)}%`;
  
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const responses = {
      "How is the net savings calculated?": "Net savings = Total savings (retention + workers comp + discipline) minus BetterUp investment. We calculate savings from preventing separations ($150K each), Workers' Comp - Mental Health Claims/FECA ($65K each), and discipline cases ($45K each), then subtract the cost of Lead ($5,785/seat) and Ready ($150-250/seat) coaching.",
      "Why is OFO facing a retirement crisis?": "In 2028, OFO officers hired under Law Enforcement 6(c) retirement coverage become eligible at age 50. Combined with 6.8% annual attrition and CBP's 12-month hiring timeline, this creates unprecedented staffing challenges. Every prevented separation saves $150K in recruitment and training costs.",
      "Explain the COA differences": "Pilot targets 15% at $250/seat for proof of concept. Targeted reaches 25% at $200/seat with volume discount (recommended). Scaled covers 75% at $150/seat for maximum impact.",
      "What's Lead vs Ready?": "Lead ($5,785/seat for 12-month commitment) provides intensive 1:1 coaching for supervisors. Ready ($150-250/seat) delivers scalable digital coaching for frontline officers. Both include AI coaching and assessments.",
      "How does comorbidity work?": "The model now accounts for overlap between mental health conditions. If comorbidity is set at 35%, then 35% of affected officers have multiple conditions, preventing double-counting in our cost calculations."
    };
    setChatMessages([...chatMessages, 
      { type: 'user', text: chatInput },
      { type: 'assistant', text: responses[chatInput] || "I can help explain the model! Try asking about net savings, the retirement crisis, COA differences, Lead vs Ready, or how comorbidity works." }
    ]);
    setChatInput('');
  };
  return (
    <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '40px 24px'}}>
      
      {/* HEADER */}
      <div style={{maxWidth: '1200px', margin: '0 auto 32px', background: 'linear-gradient(135deg, #005288 0%, #003a5d 100%)', borderRadius: '12px', padding: '48px 0', boxShadow: '0 8px 32px rgba(0,82,136,0.2)', border: '1px solid #0078ae'}}>
        <div style={{marginBottom: '32px', padding: '0 32px'}}>
          <h1 style={{fontSize: '42px', fontWeight: '900', color: 'white', marginBottom: '16px', lineHeight: '1.1', letterSpacing: '-0.02em'}}>
            Three Costs, One Crisis
          </h1>
          <h2 style={{fontSize: '24px', fontWeight: '600', color: '#94a3b8', marginBottom: '24px', lineHeight: '1.3'}}>
            Understanding CBP's Interconnected Workforce Challenges
          </h2>
          <p style={{fontSize: '17px', color: '#cbd5e1', lineHeight: '1.6', maxWidth: '1200px'}}>
            A data-driven analysis of CBP's workforce sustainability challenges and BetterUp's proven intervention framework
          </p>
        </div>
        
        <div style={{padding: '0 32px'}}>
          <label style={{display: 'block', fontSize: '15px', fontWeight: '700', color: '#e2e8f0', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase'}}>
            Select Organization
          </label>
          <select 
            value={org} 
            onChange={(e) => setOrg(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '16px 20px',
              fontSize: '17px',
              fontWeight: '600',
              color: '#1e293b',
              border: '2px solid #475569',
              borderRadius: '12px',
              background: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}
          >
            <optgroup label="CBP-Wide">
              <option value="cbp-wide">📊 All CBP Components (60,000 officers)</option>
            </optgroup>
            <optgroup label="Major Components">
              <option value="ofo">🛂 Office of Field Operations (26,030)</option>
              <option value="usbp">🚔 U.S. Border Patrol (19,104)</option>
              <option value="amo">✈️ Air & Marine Operations (1,317)</option>
            </optgroup>
            <optgroup label="USBP Regions">
              <option value="usbp-swb">🌵 USBP - Southwest Border (16,500)</option>
            </optgroup>
            <optgroup label="USBP Individual Sectors">
              <option value="usbp-rgv">USBP - Rio Grande Valley (3,500)</option>
              <option value="usbp-tuc">USBP - Tucson (3,800)</option>
              <option value="usbp-sdg">USBP - San Diego (2,400)</option>
              <option value="usbp-ept">USBP - El Paso (2,500)</option>
              <option value="usbp-yum">USBP - Yuma (900)</option>
              <option value="usbp-bbb">USBP - Big Bend (600)</option>
              <option value="usbp-del">USBP - Del Rio (1,200)</option>
              <option value="usbp-lrt">USBP - Laredo (1,600)</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{maxWidth: '1200px', margin: '0 auto 24px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
        {[
          { id: 'cost-problem', label: 'The Cost Problem', icon: '⚠️' },
          { id: 'roi-model', label: 'ROI Model', icon: '💰' },
          { id: 'factors', label: 'Factor Breakdown', icon: '🔬' },
          { id: 'proof', label: 'Proof & Validation', icon: '✅' },
          { id: 'implementation', label: 'Implementation', icon: '🚀' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 24px',
              fontSize: '15px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              background: activeTab === tab.id ? '#005288' : 'white',
              color: activeTab === tab.id ? 'white' : '#475569',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,82,136,0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
<div style={{maxWidth: '1200px', margin: '0 auto'}}>
      {/* TAB 1: THE COST PROBLEM */}
        {activeTab === 'cost-problem' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            <div style={{background: 'linear-gradient(135deg, #c41230 0%, #8f0e28 100%)', color: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: '0 8px 24px rgba(220,38,38,0.3)'}}>
              <div style={{fontSize: '22px', fontWeight: '600', marginBottom: '16px', opacity: 0.95}}>
                {orgData[org].name} faces an estimated annual burden of:
              </div>
              <div style={{fontSize: '72px', fontWeight: '900', marginBottom: '16px'}}>
                {fmt(calculations.totalSavings)}
              </div>
              <div style={{fontSize: '20px', fontWeight: '500', opacity: 0.9, maxWidth: '900px', margin: '0 auto'}}>
                in preventable costs from workforce challenges—before accounting for any intervention
              </div>
            </div>

            {/* Comorbidity Callout - NEW! */}
            <div style={{background: '#fffbeb', border: '3px solid #f59e0b', borderRadius: '12px', padding: '24px'}}>
              <div style={{fontSize: '18px', fontWeight: '700', color: '#92400e', marginBottom: '12px'}}>
                🧮 Comorbidity Adjustment Active
              </div>
              <div style={{fontSize: '15px', color: '#78350f', lineHeight: '1.7'}}>
                This model accounts for <strong>{comorbidityOverlap}% overlap</strong> between mental health conditions. Without this adjustment, we would be counting {behavioralHealthCalcs.comorbidityReduction.toLocaleString()} officers multiple times. The model now shows {behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique officers affected (down from {behavioralHealthCalcs.rawTotalAffected.toLocaleString()} if conditions were independent).
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '0'}}>
              
              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '3px solid #c41230', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#c41230', marginBottom: '12px'}}>
                  💼 Retention Crisis
                </div>
                <div style={{fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '16px'}}>
                  {fmt(calculations.retentionSavings)}
                </div>
                <div style={{fontSize: '15px', color: '#475569', marginBottom: '20px', lineHeight: '1.6'}}>
                  <strong>{calculations.behavioralSeparations.toLocaleString()} behavioral-driven separations</strong> annually (out of {calculations.baselineSeparations.toLocaleString()} total)
                </div>
                <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#6d0a1f', lineHeight: '1.6'}}>
                  <strong>Cost Drivers:</strong><br/>
                  • 12-month hiring timeline ($35K-45K in salary during training)<br/>
                  • 6-month academy + equipment ($75K-120K total)<br/>
                  • 3-6 month field training with FTO supervision<br/>
                  • 1-2 year productivity ramp (experience gap costs)<br/>
                  • Institutional knowledge loss<br/>
                  <br/>
                  <strong>Model Logic (Updated):</strong><br/>
                  • Baseline: {calculations.baselineSeparations.toLocaleString()} total separations annually ({pct(org === 'ofo' ? 6.8 : 10)} attrition rate)<br/>
                  • {calculations.behavioralSeparations.toLocaleString()} are driven by behavioral health factors (PTSD, depression, anxiety, SUD)<br/>
                  • After comorbidity adjustment: {behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique officers affected<br/>
                  • BetterUp prevents {calculations.separationsPrevented.toLocaleString()} separations through coaching<br/>
                  • Savings: {calculations.separationsPrevented} × $150K = {fmt(calculations.retentionSavings)}
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '3px solid #c41230', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#c41230', marginBottom: '12px'}}>
                  🏥 Workers' Comp - Mental Health Claims (FECA)
                </div>
                <div style={{fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '16px'}}>
                  {fmt(calculations.wcSavings)}
                </div>
                <div style={{fontSize: '15px', color: '#475569', marginBottom: '20px', lineHeight: '1.6'}}>
                  <strong>{calculations.baselineWcClaims.toLocaleString()} baseline Workers' Comp claims</strong> at {fmt(calculations.avgWcClaimCost)} average cost
                </div>
                <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#6d0a1f', lineHeight: '1.6'}}>
                  <strong>Cost Drivers:</strong><br/>
                  • PTSD claims: {fmt(ptsdWcAvgCost)} per accepted case<br/>
                  • Depression/anxiety claims: {fmt(depressionWcAvgCost)}-{fmt(anxietyWcAvgCost)} each<br/>
                  • Substance use disorder treatment: {fmt(sudWcAvgCost)}<br/>
                  • Absenteeism: 10-15 additional sick days/year<br/>
                  • Presenteeism: 35% productivity loss when at work<br/>
                  <br/>
                  <strong>Model Logic (Updated):</strong><br/>
                  • Baseline: {calculations.baselineWcClaims.toLocaleString()} mental health claims from {behavioralHealthCalcs.uniqueAffected.toLocaleString()} affected officers<br/>
                  • PTSD: {behavioralHealthCalcs.ptsdWcClaims} claims • Depression: {behavioralHealthCalcs.depressionWcClaims}<br/>
                  • Anxiety: {behavioralHealthCalcs.anxietyWcClaims} • SUD: {behavioralHealthCalcs.sudWcClaims}<br/>
                  • BetterUp prevents {calculations.claimsPrevented} claims through resilience coaching<br/>
                  • Savings: {fmt(calculations.wcSavings)}
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '3px solid #c41230', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#c41230', marginBottom: '12px'}}>
                  ⚖️ Professional Standards
                </div>
                <div style={{fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '16px'}}>
                  {fmt(calculations.disciplineSavings)}
                </div>
                <div style={{fontSize: '15px', color: '#475569', marginBottom: '20px', lineHeight: '1.6'}}>
                  <strong>{calculations.casesPrevented} preventable discipline cases</strong> at ${calculations.casesPrevented > 0 ? Math.round(calculations.disciplineSavings / calculations.casesPrevented).toLocaleString() : '45,000'} average cost
                </div>
                <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#6d0a1f', lineHeight: '1.6'}}>
                  <strong>Cost Drivers:</strong><br/>
                  • Use-of-force investigations: $15K-25K per incident<br/>
                  • Misconduct cases: $30K-50K (legal, admin time)<br/>
                  • Substance abuse violations: $25K-40K<br/>
                  • Terminations: $150K+ (replacement + institutional damage)<br/>
                  • Reputation/morale impact on team performance<br/>
                  <br/>
                  <strong>Model Logic:</strong><br/>
                  • Baseline: {calculations.baselineDisciplineCases.toLocaleString()} discipline cases annually (3.5% of workforce)<br/>
                  • BetterUp's 22% professional standards lift (improved leadership culture) × 65% engagement = prevents {calculations.casesPrevented} cases<br/>
                  • Savings: {calculations.casesPrevented} × $45K average case cost = {fmt(calculations.disciplineSavings)}
                </div>
              </div>
            </div>

            <div style={{background: 'linear-gradient(135deg, #e6f2f8 0%, #cce5f0 100%)', border: '3px solid #005288', borderRadius: '12px', padding: '32px', textAlign: 'center'}}>
              <div style={{fontSize: '24px', fontWeight: '700', color: '#0078ae', marginBottom: '12px'}}>
                There's a Better Way Forward
              </div>
              <div style={{fontSize: '17px', color: '#0078ae', lineHeight: '1.7', maxWidth: '1200px', margin: '0 auto 24px'}}>
                BetterUp's proven intervention framework addresses all three cost categories simultaneously by targeting root causes early, scaling across the entire workforce, and building leadership capability. Explore the ROI Model to see the financial impact.
              </div>
              <button 
                onClick={() => setActiveTab('roi-model')}
                style={{padding: '16px 32px', fontSize: '17px', fontWeight: '700', background: '#005288', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,82,136,0.3)'}}
              >
                See the ROI Model →
              </button>
            </div>
          </div>
        )}
        {/* TAB 3: FACTOR BREAKDOWN - NOW WITH WORKING SLIDERS! */}
        {activeTab === 'factors' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            {/* Introduction */}
            <div style={{background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '16px'}}>
                Understanding the Behavioral Health Factors
              </h2>
              <div style={{fontSize: '16px', color: '#475569', lineHeight: '1.7', marginBottom: '16px'}}>
                Workers' comp, retention, and discipline costs are driven by four behavioral health factors. Use the sliders below to adjust assumptions based on CBP-specific data or conservative estimates. Each factor shows its impact on filing rates, separation rates, and intervention effectiveness.
              </div>
              <div style={{fontSize: '15px', color: '#dc2626', fontWeight: '600', background: '#fef2f2', padding: '12px', borderRadius: '8px', border: '2px solid #fecaca'}}>
                ⚡ SLIDERS NOW FUNCTIONAL: Adjusting any slider will immediately update all ROI calculations throughout the model.
              </div>
            </div>

            {/* COMORBIDITY CONTROL - NEW! */}
            <div style={{background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '4px solid #f59e0b', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <span style={{fontSize: '36px'}}>🧮</span>
                <h2 style={{fontSize: '26px', fontWeight: '800', color: '#92400e', margin: 0}}>
                  Comorbidity Adjustment
                </h2>
              </div>
              
              <div style={{fontSize: '16px', color: '#78350f', lineHeight: '1.7', marginBottom: '24px'}}>
                In mental health, conditions often occur together (comorbidity). Someone with PTSD may also have depression. To avoid double-counting the same people multiple times, we apply a comorbidity adjustment. Research suggests <strong>30-40% overlap</strong> in law enforcement populations.
              </div>

              <div style={{background: 'white', padding: '28px', borderRadius: '12px', border: '2px solid #f59e0b'}}>
                <label style={{display: 'block', fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#92400e'}}>
                  Comorbidity Overlap: {comorbidityOverlap}%
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="5"
                  value={comorbidityOverlap}
                  onChange={(e) => setComorbidityOverlap(parseInt(e.target.value))}
                  style={{width: '100%', height: '8px'}}
                />
                <div style={{fontSize: '14px', color: '#92400e', marginTop: '8px'}}>
                  Range: 0% (no overlap) to 50% (high overlap)
                </div>
                
                <div style={{marginTop: '20px', padding: '20px', background: '#fffbeb', borderRadius: '10px', border: '2px solid #fbbf24'}}>
                  <div style={{fontSize: '15px', color: '#78350f', lineHeight: '1.8'}}>
                    <strong>Current Impact:</strong><br/>
                    • Raw total (if independent): {behavioralHealthCalcs.rawTotalAffected.toLocaleString()} officers<br/>
                    • Adjusted for {comorbidityOverlap}% overlap: {behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique officers<br/>
                    • Prevented double-counting: {behavioralHealthCalcs.comorbidityReduction.toLocaleString()} officers<br/>
                    <br/>
                    <em>This adjustment is applied proportionally across all conditions, maintaining their relative prevalence while eliminating artificial inflation from overlapping populations.</em>
                  </div>
                </div>
              </div>
            </div>

            {/* PTSD */}
            <div style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: expandedFactor === 'ptsd' ? '3px solid #c41230' : '2px solid #e2e8f0'}}>
              <button
                onClick={() => setExpandedFactor(expandedFactor === 'ptsd' ? null : 'ptsd')}
                style={{width: '100%', padding: '24px', background: expandedFactor === 'ptsd' ? '#fef2f2' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
              >
                <div>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#c41230', marginBottom: '8px'}}>
                    🧠 PTSD & Trauma Exposure
                  </div>
                  <div style={{fontSize: '15px', color: '#64748b'}}>
                    Affects {behavioralHealthCalcs.ptsdAffected.toLocaleString()} officers (adjusted) • {behavioralHealthCalcs.ptsdWcClaims} claims • {fmt(ptsdWcAvgCost)} avg cost
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'ptsd' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'ptsd' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Untreated PTSD leads to expensive Workers' Comp claims ({fmt(ptsdWcAvgCost)}), increased sick leave (15+ days/year), impaired decision-making (use-of-force incidents), and early separation ($150K replacement cost). Officers experiencing trauma exposure without intervention are 3x more likely to leave within 5 years.
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Prevalence: {ptsdPrevalence}%
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="25" 
                        value={ptsdPrevalence}
                        onChange={(e) => setPtsdPrevalence(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 18% • Range: 10-25% in law enforcement
                      </div>
                    </div>
                    
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Coaching Effectiveness: {ptsdCoachingEffectiveness}%
                      </label>
                      <input 
                        type="range" 
                        min="15" 
                        max="35" 
                        value={ptsdCoachingEffectiveness}
                        onChange={(e) => setPtsdCoachingEffectiveness(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 25% • Range: 15-35% based on intervention timing
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Workers' Comp Filing Rate: {ptsdWcFilingRate}%
                      </label>
                      <input 
                        type="range" 
                        min="5" 
                        max="15" 
                        value={ptsdWcFilingRate}
                        onChange={(e) => setPtsdWcFilingRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 8% • Range: 5-15% of affected officers file claims
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Avg Claim Cost: {fmt(ptsdWcAvgCost)}
                      </label>
                      <input 
                        type="range" 
                        min="60000" 
                        max="110000" 
                        step="5000"
                        value={ptsdWcAvgCost}
                        onChange={(e) => setPtsdWcAvgCost(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Range: $60K-$110K per claim
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Separation Rate: {ptsdSeparationRate}%
                      </label>
                      <input 
                        type="range" 
                        min="8" 
                        max="20" 
                        value={ptsdSeparationRate}
                        onChange={(e) => setPtsdSeparationRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 12% • Range: 8-20% separate within 5 years
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginTop: '20px', padding: '16px', background: '#fff', borderRadius: '10px', border: '2px solid #fecaca'}}>
                    <div style={{fontSize: '15px', color: '#6d0a1f', fontWeight: '600', marginBottom: '8px'}}>
                      Current Impact on ROI:
                    </div>
                    <div style={{fontSize: '14px', color: '#6d0a1f', lineHeight: '1.7'}}>
                      • {behavioralHealthCalcs.ptsdAffected.toLocaleString()} officers affected (after comorbidity adjustment)<br/>
                      • {behavioralHealthCalcs.ptsdWcClaims} baseline claims × {fmt(ptsdWcAvgCost)} = {fmt(behavioralHealthCalcs.ptsdWcCost)}<br/>
                      • BetterUp prevents {calculations.ptsdClaimsPrevented} claims = <strong>{fmt(calculations.ptsdWcSavings)} savings</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DEPRESSION */}
            <div style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: expandedFactor === 'depression' ? '3px solid #c41230' : '2px solid #e2e8f0'}}>
              <button
                onClick={() => setExpandedFactor(expandedFactor === 'depression' ? null : 'depression')}
                style={{width: '100%', padding: '24px', background: expandedFactor === 'depression' ? '#fef2f2' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
              >
                <div>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#c41230', marginBottom: '8px'}}>
                    😔 Depression & Burnout
                  </div>
                  <div style={{fontSize: '15px', color: '#64748b'}}>
                    Affects {behavioralHealthCalcs.depressionAffected.toLocaleString()} officers (adjusted) • {behavioralHealthCalcs.depressionWcClaims} claims • {fmt(depressionWcAvgCost)} avg cost
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'depression' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'depression' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Depression and burnout drive workers' comp claims ({fmt(depressionWcAvgCost)}), chronic absenteeism (12+ sick days/year), severe presenteeism (35% productivity loss when at work), and early attrition. Officers with untreated depression are 2.5x more likely to separate prematurely.
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Prevalence: {depressionPrevalence}%
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="25" 
                        value={depressionPrevalence}
                        onChange={(e) => setDepressionPrevalence(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 18% • Range: 10-25% in high-stress environments
                      </div>
                    </div>
                    
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Coaching Effectiveness: {depressionCoachingEffectiveness}%
                      </label>
                      <input 
                        type="range" 
                        min="15" 
                        max="35" 
                        value={depressionCoachingEffectiveness}
                        onChange={(e) => setDepressionCoachingEffectiveness(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 25% • JAMA 2024: 21.6% symptom reduction
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Workers' Comp Filing Rate: {depressionWcFilingRate}%
                      </label>
                      <input 
                        type="range" 
                        min="5" 
                        max="15" 
                        value={depressionWcFilingRate}
                        onChange={(e) => setDepressionWcFilingRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 10% • Higher in high-stress environments
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Avg Claim Cost: {fmt(depressionWcAvgCost)}
                      </label>
                      <input 
                        type="range" 
                        min="40000" 
                        max="70000" 
                        step="2500"
                        value={depressionWcAvgCost}
                        onChange={(e) => setDepressionWcAvgCost(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Range: $40K-$70K per claim
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Separation Rate: {depressionSeparationRate}%
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="25" 
                        value={depressionSeparationRate}
                        onChange={(e) => setDepressionSeparationRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 15% • Burnout accelerates attrition
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginTop: '20px', padding: '16px', background: '#fff', borderRadius: '10px', border: '2px solid #fecaca'}}>
                    <div style={{fontSize: '15px', color: '#6d0a1f', fontWeight: '600', marginBottom: '8px'}}>
                      Current Impact on ROI:
                    </div>
                    <div style={{fontSize: '14px', color: '#6d0a1f', lineHeight: '1.7'}}>
                      • {behavioralHealthCalcs.depressionAffected.toLocaleString()} officers affected (after comorbidity adjustment)<br/>
                      • {behavioralHealthCalcs.depressionWcClaims} baseline claims × {fmt(depressionWcAvgCost)} = {fmt(behavioralHealthCalcs.depressionWcCost)}<br/>
                      • BetterUp prevents {calculations.depressionClaimsPrevented} claims = <strong>{fmt(calculations.depressionWcSavings)} savings</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ANXIETY - Similar structure */}
            <div style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: expandedFactor === 'anxiety' ? '3px solid #c41230' : '2px solid #e2e8f0'}}>
              <button
                onClick={() => setExpandedFactor(expandedFactor === 'anxiety' ? null : 'anxiety')}
                style={{width: '100%', padding: '24px', background: expandedFactor === 'anxiety' ? '#fef2f2' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
              >
                <div>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#c41230', marginBottom: '8px'}}>
                    😰 Anxiety & Stress
                  </div>
                  <div style={{fontSize: '15px', color: '#64748b'}}>
                    Affects {behavioralHealthCalcs.anxietyAffected.toLocaleString()} officers (adjusted) • {behavioralHealthCalcs.anxietyWcClaims} claims • {fmt(anxietyWcAvgCost)} avg cost
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'anxiety' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'anxiety' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Chronic anxiety impairs tactical decision-making, increases use-of-force incidents, drives workers' comp claims ({fmt(anxietyWcAvgCost)}), and causes moderate absenteeism (8-10 days/year). Montreal Police study showed 40% stress reduction through proactive intervention.
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Prevalence: {anxietyPrevalence}%
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="20" 
                        value={anxietyPrevalence}
                        onChange={(e) => setAnxietyPrevalence(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 15% • Range: 10-20%
                      </div>
                    </div>
                    
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Coaching Effectiveness: {anxietyCoachingEffectiveness}%
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="30" 
                        value={anxietyCoachingEffectiveness}
                        onChange={(e) => setAnxietyCoachingEffectiveness(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 20% • HeartMath: 40% stress reduction
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Workers' Comp Filing Rate: {anxietyWcFilingRate}%
                      </label>
                      <input 
                        type="range" 
                        min="3" 
                        max="12" 
                        value={anxietyWcFilingRate}
                        onChange={(e) => setAnxietyWcFilingRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 6% • Lower than PTSD/depression
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Avg Claim Cost: {fmt(anxietyWcAvgCost)}
                      </label>
                      <input 
                        type="range" 
                        min="35000" 
                        max="60000" 
                        step="2500"
                        value={anxietyWcAvgCost}
                        onChange={(e) => setAnxietyWcAvgCost(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Range: $35K-$60K per claim
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Separation Rate: {anxietySeparationRate}%
                      </label>
                      <input 
                        type="range" 
                        min="5" 
                        max="18" 
                        value={anxietySeparationRate}
                        onChange={(e) => setAnxietySeparationRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 10% • Moderate attrition risk
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginTop: '20px', padding: '16px', background: '#fff', borderRadius: '10px', border: '2px solid #fecaca'}}>
                    <div style={{fontSize: '15px', color: '#6d0a1f', fontWeight: '600', marginBottom: '8px'}}>
                      Current Impact on ROI:
                    </div>
                    <div style={{fontSize: '14px', color: '#6d0a1f', lineHeight: '1.7'}}>
                      • {behavioralHealthCalcs.anxietyAffected.toLocaleString()} officers affected (after comorbidity adjustment)<br/>
                      • {behavioralHealthCalcs.anxietyWcClaims} baseline claims × {fmt(anxietyWcAvgCost)} = {fmt(behavioralHealthCalcs.anxietyWcCost)}<br/>
                      • BetterUp prevents {calculations.anxietyClaimsPrevented} claims = <strong>{fmt(calculations.anxietyWcSavings)} savings</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SUD - Substance Use Disorder */}
            <div style={{background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: expandedFactor === 'sud' ? '3px solid #c41230' : '2px solid #e2e8f0'}}>
              <button
                onClick={() => setExpandedFactor(expandedFactor === 'sud' ? null : 'sud')}
                style={{width: '100%', padding: '24px', background: expandedFactor === 'sud' ? '#fef2f2' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
              >
                <div>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#c41230', marginBottom: '8px'}}>
                    🍺 Substance Use Disorders
                  </div>
                  <div style={{fontSize: '15px', color: '#64748b'}}>
                    Affects {behavioralHealthCalcs.sudAffected.toLocaleString()} officers (adjusted) • {behavioralHealthCalcs.sudWcClaims} claims • {fmt(sudWcAvgCost)} avg cost
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'sud' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'sud' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Substance use disorders create the highest discipline and termination risk. CuraLinc EAP study showed 67% severity reduction and 78% at-risk elimination through early intervention. Costs include treatment ({fmt(sudWcAvgCost)}), discipline cases ($45K), and terminations requiring replacement ($150K).
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Prevalence: {sudPrevalence}%
                      </label>
                      <input 
                        type="range" 
                        min="15" 
                        max="35" 
                        value={sudPrevalence}
                        onChange={(e) => setSudPrevalence(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 25% • 2-3x general population
                      </div>
                    </div>
                    
                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Coaching Effectiveness: {sudCoachingEffectiveness}%
                      </label>
                      <input 
                        type="range" 
                        min="50" 
                        max="80" 
                        value={sudCoachingEffectiveness}
                        onChange={(e) => setSudCoachingEffectiveness(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 67% • CuraLinc: 67% severity reduction
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Workers' Comp Filing Rate: {sudWcFilingRate}%
                      </label>
                      <input 
                        type="range" 
                        min="8" 
                        max="20" 
                        value={sudWcFilingRate}
                        onChange={(e) => setSudWcFilingRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 15% • Includes injury-related claims
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Avg Claim Cost: {fmt(sudWcAvgCost)}
                      </label>
                      <input 
                        type="range" 
                        min="25000" 
                        max="55000" 
                        step="2500"
                        value={sudWcAvgCost}
                        onChange={(e) => setSudWcAvgCost(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Range: $25K-$55K per claim
                      </div>
                    </div>

                    <div>
                      <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#6d0a1f'}}>
                        Separation Rate: {sudSeparationRate}%
                      </label>
                      <input 
                        type="range" 
                        min="15" 
                        max="35" 
                        value={sudSeparationRate}
                        onChange={(e) => setSudSeparationRate(parseInt(e.target.value))}
                        style={{width: '100%'}}
                      />
                      <div style={{fontSize: '13px', color: '#8f0e28', marginTop: '4px'}}>
                        Average: 25% • Highest termination risk
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginTop: '20px', padding: '16px', background: '#fff', borderRadius: '10px', border: '2px solid #fecaca'}}>
                    <div style={{fontSize: '15px', color: '#6d0a1f', fontWeight: '600', marginBottom: '8px'}}>
                      Current Impact on ROI:
                    </div>
                    <div style={{fontSize: '14px', color: '#6d0a1f', lineHeight: '1.7'}}>
                      • {behavioralHealthCalcs.sudAffected.toLocaleString()} officers affected (after comorbidity adjustment)<br/>
                      • {behavioralHealthCalcs.sudWcClaims} baseline claims × {fmt(sudWcAvgCost)} = {fmt(behavioralHealthCalcs.sudWcCost)}<br/>
                      • BetterUp prevents {calculations.sudClaimsPrevented} claims = <strong>{fmt(calculations.sudWcSavings)} savings</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* TAB 2: ROI MODEL */}
        {activeTab === 'roi-model' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            
            {/* COA Selection */}
            <div style={{background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '26px', fontWeight: '800', color: '#1e293b', marginBottom: '16px'}}>
                Select Course of Action (COA)
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px'}}>
                {[
                  { 
                    id: 'pilot', 
                    label: 'COA 1: Pilot', 
                    desc: '15% of workforce • Select offices • Proof of concept', 
                    seats: Math.max(Math.round(calculations.officers * 0.15), 500),
                    investment: fmt(Math.max(Math.round(calculations.officers * 0.15), 500) * 250),
                    price: '$250/seat'
                  },
                  { 
                    id: 'targeted', 
                    label: 'COA 2: Targeted (Recommended)', 
                    desc: '25% of workforce • Balanced scale with volume discount', 
                    seats: Math.max(Math.round(calculations.officers * 0.25), 500),
                    investment: fmt(Math.max(Math.round(calculations.officers * 0.25), 500) * 200),
                    price: '$200/seat'
                  },
                  { 
                    id: 'scaled', 
                    label: 'COA 3: Scaled', 
                    desc: '75% of workforce • Maximum impact at list price', 
                    seats: Math.max(Math.round(calculations.officers * 0.75), 500),
                    investment: fmt(Math.max(Math.round(calculations.officers * 0.75), 500) * 150),
                    price: '$150/seat'
                  }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setCoa(option.id)}
                    style={{
                      padding: '20px',
                      border: coa === option.id ? '3px solid #005288' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      background: coa === option.id ? '#e6f2f8' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{fontSize: '18px', fontWeight: '700', color: coa === option.id ? '#005288' : '#1e293b', marginBottom: '8px'}}>
                      {option.label}
                    </div>
                    <div style={{fontSize: '14px', color: '#64748b', marginBottom: '12px'}}>
                      {option.desc}
                    </div>
                    <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '4px'}}>
                      {option.seats.toLocaleString()} Ready seats • {option.price}
                    </div>
                    <div style={{fontSize: '14px', color: '#64748b'}}>
                      Investment: {option.investment}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* LEAD TOGGLE */}
              <div style={{marginTop: '20px', padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'}}>
                  <input 
                    type="checkbox" 
                    checked={includeLeadForLeaders}
                    onChange={(e) => setIncludeLeadForLeaders(e.target.checked)}
                    style={{width: '20px', height: '20px', cursor: 'pointer'}}
                  />
                  <div>
                    <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b'}}>
                      Add Lead for Supervisors & Critical Talent (10% GS-13+ coverage)
                    </div>
                    <div style={{fontSize: '14px', color: '#64748b', marginTop: '4px'}}>
                      Adds {Math.round(calculations.officers * 0.10).toLocaleString()} Lead seats at $5,785/seat • Develops leadership culture
                    </div>
                  </div>
                </label>
                
                {includeLeadForLeaders && (
                  <div style={{marginTop: '16px', padding: '20px', background: '#e6f2f8', borderRadius: '10px', border: '2px solid #005288'}}>
                    <div style={{fontSize: '15px', color: '#0078ae', lineHeight: '1.8'}}>
                      <strong>💎 Lead Enhancement Active:</strong><br/>
                      • Additional investment: {fmt(Math.round(calculations.officers * 0.10) * 5785)}<br/>
                      • Target population: GS-13+ supervisors, SES candidates, high-potentials<br/>
                      • Additional impact: +3-5% retention lift, +5% discipline case reduction
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Net Savings */}
            <div style={{background: 'linear-gradient(135deg, #e8f4e0 0%, #d0eac0 100%)', border: '4px solid #5e9732', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 8px 24px rgba(22,163,74,0.25)'}}>
              <div style={{fontSize: '22px', fontWeight: '600', color: '#5e9732', marginBottom: '12px'}}>
                Estimated Annual Net Savings
              </div>
              <div style={{fontSize: '64px', fontWeight: '900', color: '#5e9732', marginBottom: '16px'}}>
                {fmt(calculations.netSavings)}
              </div>
              <div style={{fontSize: '18px', color: '#5e9732', marginBottom: '24px'}}>
                ROI: <strong>{pct(calculations.roi)}</strong> • Total Savings: {fmt(calculations.totalSavings)} • Investment: {fmt(calculations.totalInvestment)}
              </div>
              <div style={{background: 'white', padding: '20px', borderRadius: '10px', maxWidth: '800px', margin: '0 auto'}}>
                <div style={{fontSize: '15px', color: '#475569', lineHeight: '1.7'}}>
                  <strong>Before BetterUp:</strong> {orgData[org].name} faces {fmt(calculations.totalSavings)} in annual preventable costs<br/>
                  <strong>After BetterUp:</strong> {fmt(calculations.totalInvestment)} investment prevents {calculations.totalSavings > 0 ? pct((calculations.totalSavings - calculations.netSavings) / calculations.totalSavings * 100) : '0%'} of those costs<br/>
                  <strong>Net Impact:</strong> {fmt(calculations.netSavings)} returned to CBP mission priorities
                </div>
              </div>
            </div>

            {/* Three Pathways */}
            <div>
              <h3 style={{fontSize: '20px', fontWeight: '700', color: '#64748b', marginBottom: '16px', textAlign: 'center'}}>
                Three Pathways Contributing to Total Above
              </h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px'}}>
                
                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize: '17px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    💼 Retention Improvement
                  </div>
                  <div style={{fontSize: '36px', fontWeight: '900', color: '#1e293b', marginBottom: '8px'}}>
                    {fmt(calculations.retentionSavings)}
                  </div>
                  <div style={{fontSize: '14px', color: '#64748b', lineHeight: '1.6'}}>
                    {calculations.separationsPrevented} separations prevented from {calculations.behavioralSeparations} behavioral-driven separations
                  </div>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize: '17px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    🏥 Workers' Comp Reduction
                  </div>
                  <div style={{fontSize: '36px', fontWeight: '900', color: '#1e293b', marginBottom: '8px'}}>
                    {fmt(calculations.wcSavings)}
                  </div>
                  <div style={{fontSize: '14px', color: '#64748b', lineHeight: '1.6'}}>
                    {calculations.claimsPrevented} claims prevented • {pct(calculations.readinessLift)} lift from resilience coaching
                  </div>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize: '17px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    ⚖️ Discipline Case Reduction
                  </div>
                  <div style={{fontSize: '36px', fontWeight: '900', color: '#1e293b', marginBottom: '8px'}}>
                    {fmt(calculations.disciplineSavings)}
                  </div>
                  <div style={{fontSize: '14px', color: '#64748b', lineHeight: '1.6'}}>
                    {calculations.casesPrevented} cases prevented • {pct(calculations.profStandardsLift)} lift from leadership culture
                  </div>
                </div>
              </div>
            </div>

            {/* Product Mix */}
            <div style={{background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h3 style={{fontSize: '22px', fontWeight: '800', color: '#1e293b', marginBottom: '20px'}}>
                Product Mix & Investment
              </h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px'}}>
                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '15px', fontWeight: '600', color: '#64748b', marginBottom: '8px'}}>
                    Lead Seats
                  </div>
                  <div style={{fontSize: '32px', fontWeight: '900', color: '#1e293b'}}>
                    {calculations.leadSeats.toLocaleString()}
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginTop: '4px'}}>
                    Critical talent • {fmt(calculations.leadPrice)}/seat
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '15px', fontWeight: '600', color: '#64748b', marginBottom: '8px'}}>
                    Ready Seats
                  </div>
                  <div style={{fontSize: '32px', fontWeight: '900', color: '#1e293b'}}>
                    {calculations.readySeats.toLocaleString()}
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginTop: '4px'}}>
                    Frontline officers • {fmt(calculations.readyPrice)}/seat
                  </div>
                </div>

                <div style={{background: '#e6f2f8', padding: '20px', borderRadius: '10px', border: '3px solid #005288'}}>
                  <div style={{fontSize: '15px', fontWeight: '600', color: '#005288', marginBottom: '8px'}}>
                    Total Investment
                  </div>
                  <div style={{fontSize: '32px', fontWeight: '900', color: '#005288'}}>
                    {fmt(calculations.totalInvestment)}
                  </div>
                  <div style={{fontSize: '13px', color: '#005288', marginTop: '4px'}}>
                    {calculations.totalSeats.toLocaleString()} total seats • {pct(calculations.engagement)} engagement
                  </div>
                </div>
              </div>
            </div>

            {/* Manual Adjustment Sliders */}
            <div style={{background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #f59e0b'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <span style={{fontSize: '22px'}}>⚙️</span>
                <h3 style={{fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: 0}}>
                  Advanced Settings (Manual Override)
                </h3>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#475569'}}>
                    Lead Seats Override
                  </label>
                  <input 
                    type="number" 
                    value={manualLeadSeats === null ? '' : manualLeadSeats}
                    onChange={(e) => setManualLeadSeats(e.target.value === '' ? null : parseInt(e.target.value))}
                    placeholder={`Default: ${calculations.leadSeats}`}
                    style={{width: '100%', padding: '10px', fontSize: '15px', border: '2px solid #e2e8f0', borderRadius: '8px'}}
                  />
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#475569'}}>
                    Ready Seats Override
                  </label>
                  <input 
                    type="number" 
                    value={manualReadySeats === null ? '' : manualReadySeats}
                    onChange={(e) => setManualReadySeats(e.target.value === '' ? null : parseInt(e.target.value))}
                    placeholder={`Default: ${calculations.readySeats}`}
                    style={{width: '100%', padding: '10px', fontSize: '15px', border: '2px solid #e2e8f0', borderRadius: '8px'}}
                  />
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#475569'}}>
                    Engagement Rate (%)
                  </label>
                  <input 
                    type="number" 
                    value={manualEngagement === null ? '' : manualEngagement}
                    onChange={(e) => setManualEngagement(e.target.value === '' ? null : parseFloat(e.target.value))}
                    placeholder="Default: 65%"
                    style={{width: '100%', padding: '10px', fontSize: '15px', border: '2px solid #e2e8f0', borderRadius: '8px'}}
                  />
                </div>
              </div>

              <button 
                onClick={() => {
                  setManualLeadSeats(null);
                  setManualReadySeats(null);
                  setManualEngagement(null);
                  setManualRetentionOverride(null);
                  setManualReadinessOverride(null);
                  setManualProfStandardsOverride(null);
                }}
                style={{marginTop: '20px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', background: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
              >
                Reset All to Defaults
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PROOF & VALIDATION */}
        {activeTab === 'proof' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            {/* Validation Callout - NEW */}
            <div style={{background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: '4px solid #10b981', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
                <span style={{fontSize: '36px'}}>✅</span>
                <h2 style={{fontSize: '28px', fontWeight: '800', color: '#065f46', margin: 0}}>
                  Model Validation: Stephen's Feedback Addressed
                </h2>
              </div>
              <div style={{fontSize: '16px', color: '#065f46', lineHeight: '1.7'}}>
                <strong>✅ Issue 1 Fixed:</strong> All behavioral health sliders (PTSD, depression, anxiety, SUD filing rates, costs, prevalence) now directly drive ROI calculations. Adjust any slider in the Factor Breakdown tab and watch the Cost Problem and ROI tabs update in real-time.<br/><br/>
                <strong>✅ Issue 2 Fixed:</strong> Comorbidity adjustment eliminates double-counting. Research shows 30-40% of officers with mental health conditions have multiple diagnoses. The model now applies a {comorbidityOverlap}% overlap adjustment, reducing the affected population from {behavioralHealthCalcs.rawTotalAffected.toLocaleString()} to {behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique officers.
              </div>
            </div>

            <MethodologyImpactSection />

            {/* Air Force Proven Results */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
                <span style={{fontSize: '36px'}}>🎖️</span>
                <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: 0}}>
                  Department of Air Force: Proven at Scale (2021-2025)
                </h2>
              </div>
              
              <div style={{fontSize: '16px', color: '#475569', marginBottom: '32px', lineHeight: '1.7'}}>
                BetterUp has partnered with the Department of the Air Force since 2021, serving thousands of Airmen across all components. These outcomes are peer-reviewed, independently validated, and representative of what CBP can expect.
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
                <div style={{background: '#e6f2f8', padding: '24px', borderRadius: '12px', border: '2px solid #005288', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', fontWeight: '900', color: '#005288', marginBottom: '8px'}}>
                    +7%
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>
                    Career Commitment Increase
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginTop: '8px'}}>
                    4-year longitudinal study
                  </div>
                </div>

                <div style={{background: '#e6f2f8', padding: '24px', borderRadius: '12px', border: '2px solid #005288', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', fontWeight: '900', color: '#005288', marginBottom: '8px'}}>
                    +15%
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>
                    Unit Readiness Improvement
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginTop: '8px'}}>
                    Team-level performance
                  </div>
                </div>

                <div style={{background: '#e6f2f8', padding: '24px', borderRadius: '12px', border: '2px solid #005288', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', fontWeight: '900', color: '#005288', marginBottom: '8px'}}>
                    +13%
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>
                    Individual Readiness Lift
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginTop: '8px'}}>
                    Mission-critical competencies
                  </div>
                </div>

                <div style={{background: '#e6f2f8', padding: '24px', borderRadius: '12px', border: '2px solid #005288', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', fontWeight: '900', color: '#005288', marginBottom: '8px'}}>
                    88%
                  </div>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>
                    Would Recommend to Peers
                  </div>
                  <div style={{fontSize: '13px', color: '#64748b', marginTop: '8px'}}>
                    High adoption & satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* JAMA 2024 Study */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <span style={{fontSize: '36px'}}>🔬</span>
                <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: 0}}>
                  JAMA 2024: Peer-Reviewed Clinical Validation
                </h2>
              </div>
              
              <div style={{fontSize: '16px', color: '#475569', marginBottom: '24px', lineHeight: '1.7', fontStyle: 'italic'}}>
                "Enhanced Behavioral Health Benefits and Mental Health Outcomes: A Randomized Clinical Trial"<br/>
                Published in JAMA Health Forum, April 2024
              </div>

              <div style={{background: '#f1f5f9', padding: '24px', borderRadius: '12px', marginBottom: '24px'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px'}}>
                  🎯 Key Finding: 21.6% Reduction in Burnout & Mental Health Conditions
                </div>
                <div style={{fontSize: '15px', color: '#475569', lineHeight: '1.7'}}>
                  Randomized controlled trial with 1,132 participants across multiple employers showed that <strong>enhanced behavioral health benefits (including coaching and digital CBT) reduced mental health symptoms by 21.6%</strong> compared to traditional EAP-only control groups. Effect sizes were consistent across depression, anxiety, and burnout measures.
                </div>
              </div>
            </div>

            {/* Montreal Police Study */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                <span style={{fontSize: '36px'}}>🚔</span>
                <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: 0}}>
                  Montreal Police: 22-Year Suicide Prevention Program
                </h2>
              </div>
              
              <div style={{fontSize: '16px', color: '#475569', marginBottom: '24px', lineHeight: '1.7'}}>
                Montreal Police Service implemented a comprehensive early intervention program combining peer support, psychological services, and organizational culture change. The 22-year longitudinal study provides the gold standard for law enforcement suicide prevention.
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px'}}>
                <div style={{background: '#fef2f2', padding: '24px', borderRadius: '12px', border: '3px solid #c41230', textAlign: 'center'}}>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#8f0e28', marginBottom: '12px'}}>
                    Before Program (Baseline)
                  </div>
                  <div style={{fontSize: '56px', fontWeight: '900', color: '#c41230', marginBottom: '8px'}}>
                    29.4
                  </div>
                  <div style={{fontSize: '15px', color: '#6d0a1f'}}>
                    suicides per 100,000 officers/year
                  </div>
                </div>

                <div style={{background: '#e8f4e0', padding: '24px', borderRadius: '12px', border: '3px solid #5e9732', textAlign: 'center'}}>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#5e9732', marginBottom: '12px'}}>
                    After Program (22 years)
                  </div>
                  <div style={{fontSize: '56px', fontWeight: '900', color: '#5e9732', marginBottom: '8px'}}>
                    10.2
                  </div>
                  <div style={{fontSize: '15px', color: '#4a7628'}}>
                    suicides per 100,000 officers/year
                  </div>
                </div>
              </div>

              <div style={{background: '#e6f2f8', padding: '24px', borderRadius: '12px', border: '2px solid #005288'}}>
                <div style={{fontSize: '20px', fontWeight: '800', color: '#0078ae', marginBottom: '16px', textAlign: 'center'}}>
                  65% Reduction in Suicide Rate — Lives Saved Through Prevention
                </div>
                <div style={{fontSize: '15px', color: '#0078ae', lineHeight: '1.7', textAlign: 'center'}}>
                  The program's success came from <strong>early detection, peer support networks, destigmatization of help-seeking, and organizational leadership commitment</strong>. These same principles underpin BetterUp's approach for CBP.
                </div>
              </div>
            </div>

            {/* Model Assumptions */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '20px'}}>
                📊 Model Assumptions & Conservative Estimates
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px'}}>
                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Retention Impact (7% Lift)
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Based on Air Force +7% career commitment over 4 years. Model assumes only 30% of all separations are preventable through coaching (behavioral/burnout-driven, not mission-related transfers). Conservative compared to private sector coaching studies showing 10-15% retention improvements.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Readiness Impact (37% Lift)
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Composite of Air Force +17% mission readiness and +15% resilience with Montreal Police 40% stress reduction. Uses {comorbidityOverlap}% comorbidity overlap to avoid double-counting. JAMA 21.6% symptom reduction validates clinical effectiveness.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Professional Standards (22% Lift)
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Based on improved leadership culture reducing discipline cases. CuraLinc EAP showed 67% alcohol severity reduction (major discipline driver). Model assumes 3.5% baseline discipline rate and only applies lift to behaviorally-driven cases.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Engagement Rate (65%)
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Conservative assumption. Air Force achieves 75%+ engagement. Model uses 65% to account for operational tempo challenges and stigma in law enforcement culture. Digital-first model enables higher engagement than traditional EAP (3-5%).
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Cost Assumptions
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Replacement cost: $150K (validated by SHRM and GAO). Workers' Comp: Adjustable by condition in Factor Breakdown tab. Discipline case: $45K average (investigation, legal, admin). All costs based on federal data sources.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Comorbidity Adjustment
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Currently set at {comorbidityOverlap}% overlap. Research shows 30-40% of officers with one mental health condition have comorbid diagnoses. This prevents double-counting {behavioralHealthCalcs.comorbidityReduction.toLocaleString()} officers across conditions.
                  </div>
                </div>
              </div>
            </div>

            {/* Research Bibliography */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '24px'}}>
                📚 Complete Research Bibliography
              </h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                <div>
                  <strong>1. GAO-24-107029:</strong> "CBP Recruitment, Hiring, and Retention" — Documents $150K replacement costs and 12-month hiring timeline
                  <a href="https://www.gao.gov/products/gao-24-107029" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Report</a>
                </div>
                <div>
                  <strong>2. JAMA Health Forum (2024):</strong> "Enhanced Behavioral Health Benefits and Mental Health Outcomes: A Randomized Clinical Trial" — 21.6% symptom reduction
                  <a href="https://jamanetwork.com/journals/jama-health-forum/fullarticle/2817234" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>3. Montreal Police Service:</strong> 22-year longitudinal suicide prevention study — 65% reduction in suicide rate
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9158739/" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>4. CuraLinc EAP (2022):</strong> Law enforcement EAP effectiveness — 67% alcohol severity reduction
                  <a href="https://curalinc.com/outcomes-study-2022" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>5. HeartMath Police Study:</strong> HRV biofeedback for law enforcement — 40% stress reduction
                  <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890098/" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>6. Department of Air Force Partnership (2021-2025):</strong> BetterUp outcomes — +7% career commitment, +15% unit readiness
                </div>
                <div>
                  <strong>7. DHS OIG Reports:</strong> CBP discipline case volumes and oversight
                  <a href="https://www.oig.dhs.gov/sites/default/files/assets/2021-05/OIG-21-34-May21.pdf" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Report</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: IMPLEMENTATION */}
        {activeTab === 'implementation' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            {/* Decision Framework */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '24px'}}>
                🎯 Decision Framework for CBP Leadership
              </h2>
              
              <div style={{fontSize: '16px', color: '#475569', marginBottom: '24px', lineHeight: '1.7'}}>
                Selecting the right Course of Action depends on four key factors. This framework helps CBP leadership align deployment strategy with organizational constraints and strategic priorities.
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    💰 Budget & Timeline Considerations
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>Available funding:</strong> FY25 vs FY26 budget cycles<br/>
                    • <strong>Approval authority:</strong> Component-level vs enterprise-level<br/>
                    • <strong>Urgency:</strong> 2028 retirement crisis timeline<br/>
                    • <strong>Risk tolerance:</strong> Prove concept first vs scale immediately
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    👥 Target Population Selection
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>Component focus:</strong> OFO-only, USBP-only, or cross-component<br/>
                    • <strong>Geographic scope:</strong> Single location vs multiple regions<br/>
                    • <strong>Population type:</strong> High-risk groups vs broad workforce<br/>
                    • <strong>Career stage:</strong> Entry-level, mid-career, or supervisor focus
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    📊 Success Metrics & Evaluation
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>Primary outcomes:</strong> Retention, Workers' Comp claims, or discipline<br/>
                    • <strong>Measurement timeline:</strong> 6-month, 12-month, or 24-month evaluation<br/>
                    • <strong>Data access:</strong> Availability of baseline metrics<br/>
                    • <strong>ROI threshold:</strong> Required payback period for continuation
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    🤝 Stakeholder Alignment
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>Resiliency Program integration:</strong> Complement vs replace existing services<br/>
                    • <strong>Field leadership buy-in:</strong> Port Directors, Sector Chiefs, supervisors<br/>
                    • <strong>Union considerations:</strong> NTEU engagement and communication<br/>
                    • <strong>CBPX coordination:</strong> Employee experience strategy alignment
                  </div>
                </div>
              </div>
            </div>

            {/* What Success Looks Like by COA */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '24px'}}>
                ✅ What Success Looks Like by COA
              </h2>

              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{background: '#e6f2f8', border: '3px solid #005288', borderRadius: '12px', padding: '24px'}}>
                  <div style={{fontSize: '20px', fontWeight: '800', color: '#005288', marginBottom: '12px'}}>
                    COA 1: Pilot (15% Coverage) — Proof of Concept
                  </div>
                  <div style={{fontSize: '15px', color: '#0078ae', lineHeight: '1.7'}}>
                    <strong>Deployment:</strong> Minimum 500 seats in select high-need offices (e.g., high-traffic ports, high-attrition sectors)<br/>
                    <strong>Timeline:</strong> 12-month engagement with 6-month interim evaluation<br/>
                    <strong>Primary Goal:</strong> Validate engagement rates and early retention signals in CBP environment<br/>
                    <strong>Success Criteria:</strong> 60%+ engagement, 85%+ satisfaction, measurable resilience improvements, field leadership endorsement for expansion<br/>
                    <strong>Investment:</strong> {fmt(Math.max(Math.round(calculations.officers * 0.15), 500) * 250)}
                  </div>
                </div>

                <div style={{background: '#f0f9ff', border: '3px solid #0078ae', borderRadius: '12px', padding: '24px'}}>
                  <div style={{fontSize: '20px', fontWeight: '800', color: '#0078ae', marginBottom: '12px'}}>
                    COA 2: Targeted (25% Coverage) — Balanced Scale (Recommended)
                  </div>
                  <div style={{fontSize: '15px', color: '#0078ae', lineHeight: '1.7'}}>
                    <strong>Deployment:</strong> Minimum 500 seats across select offices with demonstrated need<br/>
                    <strong>Timeline:</strong> 12-month engagement with quarterly performance reviews<br/>
                    <strong>Primary Goal:</strong> Demonstrate measurable ROI while building internal champions network<br/>
                    <strong>Success Criteria:</strong> 5-10% reduction in voluntary separations, measurable FECA claims decline, positive cost-benefit analysis, supervisor-reported team improvements<br/>
                    <strong>Investment:</strong> {fmt(Math.max(Math.round(calculations.officers * 0.25), 500) * 200)}
                  </div>
                </div>

                <div style={{background: '#f0fdf4', border: '3px solid #5e9732', borderRadius: '12px', padding: '24px'}}>
                  <div style={{fontSize: '20px', fontWeight: '800', color: '#5e9732', marginBottom: '12px'}}>
                    COA 3: Scaled (75% Coverage) — Maximum Impact
                  </div>
                  <div style={{fontSize: '15px', color: '#5e9732', lineHeight: '1.7'}}>
                    <strong>Deployment:</strong> Minimum 500 seats reaching majority of workforce in select offices<br/>
                    <strong>Timeline:</strong> 12-month engagement with cultural transformation focus<br/>
                    <strong>Primary Goal:</strong> Enterprise-wide workforce sustainability and cultural shift<br/>
                    <strong>Success Criteria:</strong> 7%+ retention improvement, reduction across all three cost pathways, leadership capability gains, FEVS score improvements, sustained engagement<br/>
                    <strong>Investment:</strong> {fmt(Math.max(Math.round(calculations.officers * 0.75), 500) * 150)}
                  </div>
                </div>
              </div>
            </div>

            {/* Required Inputs from CBP */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '24px'}}>
                📋 Required Inputs from CBP for Model Refinement
              </h2>

              <div style={{fontSize: '16px', color: '#475569', marginBottom: '24px', lineHeight: '1.7'}}>
                To provide the most accurate ROI projections and tailor the implementation to CBP's specific needs, we welcome collaboration on the following data points:
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #005288'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    📊 Baseline Workforce Data
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>FECA mental health claims:</strong> Annual volume and average cost by component<br/>
                    • <strong>Attrition patterns:</strong> Voluntary separation rates by location, tenure, and role<br/>
                    • <strong>Discipline cases:</strong> Annual volume and cost of behaviorally-driven incidents<br/>
                    • <strong>Sick leave utilization:</strong> Mental health-related absences
                  </div>
                  <div style={{marginTop: '12px', padding: '12px', background: '#e6f2f8', borderRadius: '8px', fontSize: '13px', color: '#0078ae'}}>
                    <strong>Note:</strong> Current model uses {pct(calculations.baselineWcClaims / calculations.officers * 100)} baseline claim rate. Actual CBP data will refine projections.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #005288'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    🎯 Strategic Priorities
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>High-priority locations:</strong> Offices/sectors with greatest need<br/>
                    • <strong>Critical populations:</strong> Roles facing highest attrition or stress<br/>
                    • <strong>Existing infrastructure:</strong> Resiliency Program services and utilization<br/>
                    • <strong>Integration requirements:</strong> Systems, platforms, communication channels
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #005288'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    👔 Stakeholder Access
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>Field leadership:</strong> Port Directors, Sector Chiefs, Area Port Directors<br/>
                    • <strong>CBPX coordination:</strong> Employee experience strategy alignment<br/>
                    • <strong>HR/workforce analytics:</strong> Data owners and reporting structure<br/>
                    • <strong>Union engagement:</strong> NTEU communication and collaboration
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '2px solid #005288'}}>
                  <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>
                    🔧 Implementation Support
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    • <strong>Change management:</strong> Communication strategy and leadership sponsorship<br/>
                    • <strong>IT/technical requirements:</strong> SSO, data integration, platform access<br/>
                    • <strong>Evaluation framework:</strong> Success metrics and reporting cadence<br/>
                    • <strong>Pilot location nomination:</strong> Field leadership volunteers
                  </div>
                </div>
              </div>
            </div>

            {/* Contracting & Procurement */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '24px'}}>
                📝 Contracting & Procurement Pathways
              </h2>

              <div style={{fontSize: '16px', color: '#475569', marginBottom: '24px', lineHeight: '1.7'}}>
                BetterUp is exploring multiple procurement pathways to provide CBP maximum flexibility in deployment approach. Current pathways under consideration include:
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    🏥 Holistic Health Support Centers Contract Vehicle
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Potential integration with CBP's planned wellness infrastructure through existing or upcoming contract vehicles focused on comprehensive employee health and resilience services.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    👔 Human Capital Strategy Contracts
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Alignment with workforce development, talent management, and organizational effectiveness initiatives through human capital-focused contract mechanisms.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    🤝 Prime Contractor Partnerships
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Collaboration with existing CBP prime contractors who hold relevant contract vehicles and can integrate BetterUp's platform as part of comprehensive service delivery.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    ⚡ Flexible Deployment Models
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    BetterUp can deploy through various contracting mechanisms depending on CBP's procurement constraints, timeline requirements, and organizational preferences. We adapt to your existing infrastructure and approval processes.
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div style={{background: 'linear-gradient(135deg, #e6f2f8 0%, #cce5f0 100%)', border: '3px solid #005288', borderRadius: '12px', padding: '32px'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#005288', marginBottom: '24px', textAlign: 'center'}}>
                🚀 Recommended Next Steps
              </h2>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px'}}>
                <div style={{background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>1️⃣</div>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    Review & Refine Model
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                    Validate assumptions with CBP's actual workforce data and adjust ROI projections using Factor Breakdown sliders
                  </div>
                </div>

                <div style={{background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>2️⃣</div>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    Stakeholder Briefings
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                    Present business case to field leadership, CBPX, HR, and other key decision-makers with scenario analysis
                  </div>
                </div>

                <div style={{background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>3️⃣</div>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    Select COA & Pathway
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                    Choose deployment scale and identify optimal procurement mechanism based on organizational readiness
                  </div>
                </div>
              </div>

              <div style={{background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                  Ready to discuss how BetterUp can support CBP's workforce sustainability goals?
                </div>
                <div style={{fontSize: '15px', color: '#475569', lineHeight: '1.7'}}>
                  Contact BetterUp's federal team to schedule a collaborative discovery session, review CBP-specific data, and refine this model to your mission requirements. With working sliders and comorbidity adjustments, we can demonstrate sensitivity analysis and build confidence in ROI projections.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING CHATBOT ASSISTANT */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          style={{position: 'fixed', bottom: '32px', right: '32px', width: '64px', height: '64px', borderRadius: '50%', background: '#005288', color: 'white', border: 'none', fontSize: '28px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,82,136,0.4)', zIndex: 1000}}
        >
          💬
        </button>
      )}

      {showChatbot && (
        <div style={{position: 'fixed', bottom: '32px', right: '32px', width: '400px', height: '600px', background: 'white', borderRadius: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 1000}}>
          <div style={{padding: '20px', borderBottom: '2px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#005288', borderRadius: '16px 16px 0 0'}}>
            <div style={{fontSize: '18px', fontWeight: '700', color: 'white'}}>
              💬 Ask Me Anything
            </div>
            <button onClick={() => setShowChatbot(false)} style={{background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer'}}>
              ×
            </button>
          </div>
          
          <div style={{flex: 1, padding: '20px', overflowY: 'auto', background: '#f8fafc'}}>
            {chatMessages.length === 0 ? (
              <div style={{textAlign: 'center', paddingTop: '32px'}}>
                <p style={{fontWeight: '500', color: '#6b7280', marginBottom: '16px'}}>Ask anything about the model!</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {["How is the net savings calculated?", "Why is OFO facing a retirement crisis?", "Explain the COA differences", "What's Lead vs Ready?", "How does comorbidity work?"].map((q, i) => (
                    <button 
                      key={i} 
                      onClick={() => setChatInput(q)} 
                      style={{width: '100%', textAlign: 'left', padding: '12px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer'}} 
                      onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} 
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {chatMessages.map((m, i) => (
                  <div key={i} style={{textAlign: m.type === 'user' ? 'right' : 'left'}}>
                    <div style={{display: 'inline-block', maxWidth: '80%', padding: '12px', borderRadius: '8px', background: m.type === 'user' ? '#005288' : 'white', color: m.type === 'user' ? 'white' : '#1f2937', border: m.type === 'user' ? 'none' : '1px solid #e5e7eb', fontSize: '14px'}}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{padding: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '8px'}}>
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
              placeholder="Ask about the model..." 
              style={{flex: 1, padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px'}}
            />
            <button 
              onClick={handleSendMessage} 
              style={{padding: '8px 16px', background: '#005288', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CBPDashboard;