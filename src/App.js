// ===== CBP WORKFORCE SUSTAINABILITY DASHBOARD v3.0 =====
// Vendor-agnostic version with Executive Summary, Model Details, Federal Framework
// Complete rebuild incorporating LAPD calculator improvements
import React, { useState, useMemo, useEffect } from 'react';

// ===== GLOBAL STYLES & THEME =====
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; }
      html, body, #root { height: 100%; }
    `}</style>
  );
}

const container = {
  boxSizing: 'border-box',
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 16px',
};

// CBP Theme
const T = {
  color: {
    ink: '#0f172a',
    red: '#c41230',
    blue: '#005288',
    lightBlue: '#e6f2f8',
    gold: '#FFCC01',
    green: '#5e9732',
    axis: '#94a3b8',
    border: '#e5e7eb',
    slate600: '#475569',
  }
};

// ===== REUSABLE CHART COMPONENTS =====
const Callout = React.memo(({ x, y, text, color = T.color.ink, bg = 'white', lineTo }) => (
  <g>
    {lineTo && <line x1={x} y1={y} x2={lineTo.x} y2={lineTo.y} stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />}
    <rect x={x - 6} y={y - 18} rx="6" ry="6" width={Math.max(120, (text?.length || 0) * 6.4 + 14)} height="28" fill={bg} stroke={color} strokeOpacity="0.25" />
    <text x={x + 8} y={y + 2} fill={color} fontSize="12" fontWeight="700">{text}</text>
  </g>
));

const MethodologyImpactSection = () => (
  <div style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)', border: '4px solid #64748b', borderRadius: 16, padding: 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <div style={{ width: 48, height: 48, background: '#475569', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📈</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: 0 }}>Methodology Impact: Why Episodic Training Fails—and Continuous Development Works</h2>
    </div>
    <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: '#fee2e2', color: '#991b1b' }}>🔴 Episodic training</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 700, background: '#dbeafe', color: '#1e40af' }}>🔵 Continuous development</span>
        </div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>Higher area = retained capability</div>
      </div>
      <svg viewBox="0 0 760 300" style={{ width: '100%', height: 260, display: 'block' }}>
        <line x1="60" y1="24" x2="60" y2="250" stroke={T.color.axis} strokeWidth="2" />
        <line x1="60" y1="250" x2="730" y2="250" stroke={T.color.axis} strokeWidth="2" />
        <text x="14" y="34" fill={T.color.slate600} fontSize="11" fontWeight="700">Skill / Recall</text>
        <text x="690" y="292" fill={T.color.slate600} fontSize="11" fontWeight="700">Time</text>
        {[140,220,300,380,460,540,620,700].map((x,i) => <line key={i} x1={x} y1="250" x2={x} y2="246" stroke={T.color.axis} />)}
        {[90,130,170,210].map((y,i) => <line key={i} x1="60" y1={y} x2="730" y2={y} stroke={T.color.border} />)}
        <path d="M 60 60 C 180 56, 250 80, 320 120 C 380 154, 450 190, 730 230" fill="none" stroke={T.color.red} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 60 230 C 110 200, 150 190, 190 170 C 210 160, 230 150, 250 160 C 270 175, 300 150, 330 135 C 350 125, 370 120, 390 130 C 410 142, 440 128, 470 118 C 490 112, 510 110, 530 120 C 550 130, 585 118, 620 108 C 640 102, 660 98, 730 92" fill="none" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />
        {[
          { x: 180, y: 60, text: 'Peak right after event', color: '#991b1b', bg: '#fff5f5', lineTo: { x: 150, y: 66 } },
          { x: 410, y: 168, text: '~70% forgotten in 24h', color: '#991b1b', bg: '#fff5f5', lineTo: { x: 365, y: 150 } },
          { x: 640, y: 228, text: '~90% within a month', color: '#991b1b', bg: '#fff5f5', lineTo: { x: 600, y: 212 } },
          { x: 520, y: 84, text: 'Continuous reinforcement', color: '#1e3a8a', bg: '#eef2ff', lineTo: { x: 560, y: 110 } },
        ].map((c, i) => <Callout key={i} {...c} />)}
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
        <div style={{ background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 13, color: '#9a3412', fontWeight: 700, marginBottom: 6 }}>Why retention stalls</div>
          <ul style={{ margin: 0, paddingLeft: 16, color: '#7c2d12', fontSize: 13, lineHeight: 1.6 }}>
            <li>Event spikes learning → rapid decay</li>
            <li>Episodic workshops don't rewire habits</li>
            <li>Leaders default to command-and-control</li>
          </ul>
        </div>
        <div style={{ background: '#ecfeff', border: '1px solid #67e8f9', borderRadius: 8, padding: 12 }}>
          <div style={{ fontSize: 13, color: '#155e75', fontWeight: 700, marginBottom: 6 }}>Why DAF moved retention +7%</div>
          <ul style={{ margin: 0, paddingLeft: 16, color: '#0e7490', fontSize: 13, lineHeight: 1.6 }}>
            <li>Continuous practice compounds capability</li>
            <li>Just-in-time support at critical moments</li>
            <li>Transforms training into learning journeys</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// ===== MAIN DASHBOARD COMPONENT =====
const CBPDashboard = () => {
  // ===== STATE MANAGEMENT =====
  const [org, setOrg] = useState('ofo');
  const [coa, setCoa] = useState('targeted');
  const [showResearch, setShowResearch] = useState(false);
  const [includeLeadForLeaders, setIncludeLeadForLeaders] = useState(false);
  const [activeTab, setActiveTab] = useState('executive-summary');
  const [showCoaComparison, setShowCoaComparison] = useState(false);
  const [manualLeadSeats, setManualLeadSeats] = useState(null);
  const [manualReadySeats, setManualReadySeats] = useState(null);
  const [manualEngagement, setManualEngagement] = useState(null);
  const [expandedFactor, setExpandedFactor] = useState(null);
  const [viewMode, setViewMode] = useState('field');

  // Behavioral Health Factor Sliders
  const [ptsdPrevalence, setPtsdPrevalence] = useState(18);
  const [ptsdCoachingEffectiveness, setPtsdCoachingEffectiveness] = useState(25);
  const [ptsdWcFilingRate, setPtsdWcFilingRate] = useState(8);
  const [ptsdWcAvgCost, setPtsdWcAvgCost] = useState(85000);
  const [ptsdSeparationRate, setPtsdSeparationRate] = useState(12);

  const [depressionPrevalence, setDepressionPrevalence] = useState(18);
  const [depressionCoachingEffectiveness, setDepressionCoachingEffectiveness] = useState(25);
  const [depressionWcFilingRate, setDepressionWcFilingRate] = useState(10);
  const [depressionWcAvgCost, setDepressionWcAvgCost] = useState(55000);
  const [depressionSeparationRate, setDepressionSeparationRate] = useState(15);

  const [anxietyPrevalence, setAnxietyPrevalence] = useState(15);
  const [anxietyCoachingEffectiveness, setAnxietyCoachingEffectiveness] = useState(20);
  const [anxietyWcFilingRate, setAnxietyWcFilingRate] = useState(6);
  const [anxietyWcAvgCost, setAnxietyWcAvgCost] = useState(47500);
  const [anxietySeparationRate, setAnxietySeparationRate] = useState(10);

  const [sudPrevalence, setSudPrevalence] = useState(25);
  const [sudCoachingEffectiveness, setSudCoachingEffectiveness] = useState(67);
  const [sudWcFilingRate, setSudWcFilingRate] = useState(15);
  const [sudWcAvgCost, setSudWcAvgCost] = useState(40000);
  const [sudSeparationRate, setSudSeparationRate] = useState(25);

  const [comorbidityOverlap, setComorbidityOverlap] = useState(35);

  // Chatbot State
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // ===== ORGANIZATION DATA =====
  const orgData = useMemo(() => ({
    'cbp-wide': { name: 'CBP-Wide (All Components)', officers: 60000, type: 'enterprise' },
    'ofo': { name: 'Office of Field Operations (All)', officers: 26030, type: 'component' },
    'ofo-ny': { name: 'OFO - New York Field Office', officers: 2200, tier: 1, type: 'ofo-field', criticalPorts: ['JFK Airport', 'Newark Liberty', 'Port of NY/NJ'], description: 'Largest OFO field office, highest passenger volume in nation' },
    'ofo-la': { name: 'OFO - Los Angeles Field Office', officers: 2100, tier: 1, type: 'ofo-field', criticalPorts: ['LAX Airport', 'Port of Los Angeles', 'Port of Long Beach'], description: 'Second largest container port complex in nation' },
    'ofo-miami': { name: 'OFO - Miami Field Office', officers: 2000, tier: 1, type: 'ofo-field', criticalPorts: ['Miami International Airport', 'Port of Miami', 'Port Everglades'], description: 'Gateway to Caribbean and Latin America' },
    'ofo-houston': { name: 'OFO - Houston Field Office', officers: 1900, tier: 1, type: 'ofo-field', criticalPorts: ['IAH Airport', 'Port of Houston'], description: 'Energy corridor gateway' },
    'ofo-sandiego': { name: 'OFO - San Diego Field Office', officers: 1800, tier: 1, type: 'ofo-field', criticalPorts: ['San Ysidro POE', 'Otay Mesa POE'], description: 'Busiest land border crossing in Western Hemisphere' },
    'ofo-chicago': { name: 'OFO - Chicago Field Office', officers: 1500, tier: 2, type: 'ofo-field' },
    'ofo-seattle': { name: 'OFO - Seattle Field Office', officers: 1450, tier: 2, type: 'ofo-field' },
    'ofo-sanfrancisco': { name: 'OFO - San Francisco Field Office', officers: 1400, tier: 2, type: 'ofo-field' },
    'ofo-elpaso': { name: 'OFO - El Paso Field Office', officers: 1350, tier: 2, type: 'ofo-field' },
    'ofo-laredo': { name: 'OFO - Laredo Field Office', officers: 1300, tier: 2, type: 'ofo-field' },
    'ofo-boston': { name: 'OFO - Boston Field Office', officers: 1000, tier: 3, type: 'ofo-field' },
    'ofo-baltimore': { name: 'OFO - Baltimore Field Office', officers: 950, tier: 3, type: 'ofo-field' },
    'ofo-atlanta': { name: 'OFO - Atlanta Field Office', officers: 900, tier: 3, type: 'ofo-field' },
    'ofo-detroit': { name: 'OFO - Detroit Field Office', officers: 850, tier: 3, type: 'ofo-field' },
    'ofo-buffalo': { name: 'OFO - Buffalo Field Office', officers: 800, tier: 3, type: 'ofo-field' },
    'ofo-neworleans': { name: 'OFO - New Orleans Field Office', officers: 850, tier: 3, type: 'ofo-field' },
    'ofo-sanjuan': { name: 'OFO - San Juan Field Office', officers: 900, tier: 3, type: 'ofo-field' },
    'ofo-tampa': { name: 'OFO - Tampa Field Office', officers: 850, tier: 3, type: 'ofo-field' },
    'ofo-tucson': { name: 'OFO - Tucson Field Office', officers: 800, tier: 3, type: 'ofo-field' },
    'ofo-portland': { name: 'OFO - Portland Field Office', officers: 850, tier: 3, type: 'ofo-field' },
    'usbp': { name: 'U.S. Border Patrol', officers: 19104, type: 'component' },
    'amo': { name: 'Air & Marine Operations', officers: 1317, type: 'component' },
    'usbp-swb': { name: 'USBP - Southwest Border', officers: 16500, type: 'usbp-region' },
    'usbp-rgv': { name: 'USBP - Rio Grande Valley', officers: 3500, type: 'usbp-sector' },
    'usbp-tuc': { name: 'USBP - Tucson', officers: 3800, type: 'usbp-sector' },
    'usbp-sdg': { name: 'USBP - San Diego', officers: 2400, type: 'usbp-sector' },
    'usbp-ept': { name: 'USBP - El Paso', officers: 2500, type: 'usbp-sector' },
    'usbp-yum': { name: 'USBP - Yuma', officers: 900, type: 'usbp-sector' },
    'usbp-bbb': { name: 'USBP - Big Bend', officers: 600, type: 'usbp-sector' },
    'usbp-del': { name: 'USBP - Del Rio', officers: 1200, type: 'usbp-sector' },
    'usbp-lrt': { name: 'USBP - Laredo', officers: 1600, type: 'usbp-sector' },
  }), []);

  // ===== BEHAVIORAL HEALTH CALCULATIONS =====
  const behavioralHealthCalcs = useMemo(() => {
    const totalOfficers = orgData[org].officers;
    const rawPtsdAffected = Math.round(totalOfficers * (ptsdPrevalence / 100));
    const rawDepressionAffected = Math.round(totalOfficers * (depressionPrevalence / 100));
    const rawAnxietyAffected = Math.round(totalOfficers * (anxietyPrevalence / 100));
    const rawSudAffected = Math.round(totalOfficers * (sudPrevalence / 100));
    const rawTotalAffected = rawPtsdAffected + rawDepressionAffected + rawAnxietyAffected + rawSudAffected;
    const comorbidityMultiplier = 1 - (comorbidityOverlap / 100);
    const uniqueAffected = Math.round(rawTotalAffected * comorbidityMultiplier);
    const adjustmentFactor = rawTotalAffected > 0 ? uniqueAffected / rawTotalAffected : 0;
    const ptsdAffected = Math.round(rawPtsdAffected * adjustmentFactor);
    const depressionAffected = Math.round(rawDepressionAffected * adjustmentFactor);
    const anxietyAffected = Math.round(rawAnxietyAffected * adjustmentFactor);
    const sudAffected = Math.round(rawSudAffected * adjustmentFactor);

    const ptsdWcClaims = Math.round(ptsdAffected * (ptsdWcFilingRate / 100));
    const depressionWcClaims = Math.round(depressionAffected * (depressionWcFilingRate / 100));
    const anxietyWcClaims = Math.round(anxietyAffected * (anxietyWcFilingRate / 100));
    const sudWcClaims = Math.round(sudAffected * (sudWcFilingRate / 100));
    const totalBaselineWcClaims = ptsdWcClaims + depressionWcClaims + anxietyWcClaims + sudWcClaims;

    const ptsdWcCost = ptsdWcClaims * ptsdWcAvgCost;
    const depressionWcCost = depressionWcClaims * depressionWcAvgCost;
    const anxietyWcCost = anxietyWcClaims * anxietyWcAvgCost;
    const sudWcCost = sudWcClaims * sudWcAvgCost;
    const totalBaselineWcCost = ptsdWcCost + depressionWcCost + anxietyWcCost + sudWcCost;

    const ptsdSeparations = Math.round(ptsdAffected * (ptsdSeparationRate / 100));
    const depressionSeparations = Math.round(depressionAffected * (depressionSeparationRate / 100));
    const anxietySeparations = Math.round(anxietyAffected * (anxietySeparationRate / 100));
    const sudSeparations = Math.round(sudAffected * (sudSeparationRate / 100));
    const totalBehavioralSeparations = ptsdSeparations + depressionSeparations + anxietySeparations + sudSeparations;

    return {
      rawTotalAffected, uniqueAffected, comorbidityReduction: rawTotalAffected - uniqueAffected,
      ptsdAffected, depressionAffected, anxietyAffected, sudAffected,
      ptsdWcClaims, depressionWcClaims, anxietyWcClaims, sudWcClaims, totalBaselineWcClaims,
      ptsdWcCost, depressionWcCost, anxietyWcCost, sudWcCost, totalBaselineWcCost,
      ptsdSeparations, depressionSeparations, anxietySeparations, sudSeparations, totalBehavioralSeparations,
      avgWcClaimCost: totalBaselineWcClaims > 0 ? Math.round(totalBaselineWcCost / totalBaselineWcClaims) : 65000,
    };
  }, [org, orgData, ptsdPrevalence, depressionPrevalence, anxietyPrevalence, sudPrevalence,
      ptsdWcFilingRate, depressionWcFilingRate, anxietyWcFilingRate, sudWcFilingRate,
      ptsdWcAvgCost, depressionWcAvgCost, anxietyWcAvgCost, sudWcAvgCost,
      ptsdSeparationRate, depressionSeparationRate, anxietySeparationRate, sudSeparationRate,
      comorbidityOverlap]);

  // ===== MAIN ROI CALCULATIONS =====
  const calculations = useMemo(() => {
    const data = orgData[org];
    let leadPercent, readyPercent, readyPrice;
    if (coa === 'pilot') { readyPercent = 0.15; leadPercent = includeLeadForLeaders ? 0.10 : 0; readyPrice = 250; }
    else if (coa === 'targeted') { readyPercent = 0.25; leadPercent = includeLeadForLeaders ? 0.10 : 0; readyPrice = 200; }
    else { readyPercent = 0.75; leadPercent = includeLeadForLeaders ? 0.10 : 0; readyPrice = 150; }

    const baseLeadSeats = Math.round(data.officers * leadPercent);
    const baseReadySeats = Math.max(Math.round(data.officers * readyPercent), 500);
    const leadSeats = manualLeadSeats !== null ? manualLeadSeats : baseLeadSeats;
    const readySeats = manualReadySeats !== null ? manualReadySeats : baseReadySeats;
    const totalSeats = leadSeats + readySeats;
    const baseEngagement = 0.65;
    const engagement = manualEngagement !== null ? manualEngagement / 100 : baseEngagement;
    const activeUsers = Math.round(totalSeats * engagement);
    const coverage = Math.min(1, activeUsers / data.officers);
    const leadPrice = 5785;
    const totalInvestment = (leadSeats * leadPrice) + (readySeats * readyPrice);

    const attritionRate = org === 'ofo' ? 0.068 : 0.10;
    const baselineSeparations = Math.round(data.officers * attritionRate);
    const behavioralSeparations = behavioralHealthCalcs.totalBehavioralSeparations;

    const weightedEffectiveness = behavioralSeparations > 0
      ? ((behavioralHealthCalcs.ptsdSeparations * (ptsdCoachingEffectiveness / 100)) +
         (behavioralHealthCalcs.depressionSeparations * (depressionCoachingEffectiveness / 100)) +
         (behavioralHealthCalcs.anxietySeparations * (anxietyCoachingEffectiveness / 100)) +
         (behavioralHealthCalcs.sudSeparations * (sudCoachingEffectiveness / 100))) / behavioralSeparations
      : 0;

    const separationsPrevented = Math.round(behavioralSeparations * (isFinite(weightedEffectiveness) ? weightedEffectiveness : 0) * coverage);
    const replacementCost = 150000;
    const retentionSavings = separationsPrevented * replacementCost;

    const ptsdClaimsPrevented = Math.round(behavioralHealthCalcs.ptsdWcClaims * (ptsdCoachingEffectiveness / 100) * coverage);
    const depressionClaimsPrevented = Math.round(behavioralHealthCalcs.depressionWcClaims * (depressionCoachingEffectiveness / 100) * coverage);
    const anxietyClaimsPrevented = Math.round(behavioralHealthCalcs.anxietyWcClaims * (anxietyCoachingEffectiveness / 100) * coverage);
    const sudClaimsPrevented = Math.round(behavioralHealthCalcs.sudWcClaims * (sudCoachingEffectiveness / 100) * coverage);
    const claimsPrevented = ptsdClaimsPrevented + depressionClaimsPrevented + anxietyClaimsPrevented + sudClaimsPrevented;

    const ptsdWcSavings = ptsdClaimsPrevented * ptsdWcAvgCost;
    const depressionWcSavings = depressionClaimsPrevented * depressionWcAvgCost;
    const anxietyWcSavings = anxietyClaimsPrevented * anxietyWcAvgCost;
    const sudWcSavings = sudClaimsPrevented * sudWcAvgCost;
    const wcSavings = ptsdWcSavings + depressionWcSavings + anxietyWcSavings + sudWcSavings;

    const baselineDisciplineCases = Math.round(data.officers * 0.035);
    const avgDisciplineCost = 45000;
    const casesPrevented = Math.round(baselineDisciplineCases * 0.22 * coverage);
    const disciplineSavings = casesPrevented * avgDisciplineCost;

    const totalSavings = retentionSavings + wcSavings + disciplineSavings;
    const netSavings = totalSavings - totalInvestment;
    const roi = totalInvestment > 0 ? ((netSavings / totalInvestment) * 100) : 0;

    // Break-even analysis (NEW)
    const breakEvenRetention = retentionSavings > 0 ? (totalInvestment / retentionSavings * 100).toFixed(1) : 'N/A';
    const breakEvenWc = wcSavings > 0 ? (totalInvestment / wcSavings * 100).toFixed(1) : 'N/A';
    const breakEvenDiscipline = disciplineSavings > 0 ? (totalInvestment / disciplineSavings * 100).toFixed(1) : 'N/A';

    return {
      officers: data.officers, leadSeats, readySeats, totalSeats,
      engagement: engagement * 100, activeUsers, coverage,
      leadPrice, readyPrice, totalInvestment,
      baselineSeparations, behavioralSeparations, separationsPrevented, retentionSavings,
      baselineWcClaims: behavioralHealthCalcs.totalBaselineWcClaims,
      claimsPrevented, wcSavings, avgWcClaimCost: behavioralHealthCalcs.avgWcClaimCost,
      ptsdClaimsPrevented, depressionClaimsPrevented, anxietyClaimsPrevented, sudClaimsPrevented,
      ptsdWcSavings, depressionWcSavings, anxietyWcSavings, sudWcSavings,
      baselineDisciplineCases, casesPrevented, disciplineSavings,
      totalSavings, netSavings, roi,
      breakEvenRetention, breakEvenWc, breakEvenDiscipline,
    };
  }, [org, coa, includeLeadForLeaders, manualLeadSeats, manualReadySeats, manualEngagement,
      orgData, behavioralHealthCalcs,
      ptsdCoachingEffectiveness, depressionCoachingEffectiveness,
      anxietyCoachingEffectiveness, sudCoachingEffectiveness]);

  // ===== HELPER FUNCTIONS =====
  const fmt = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  const fmtCompact = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(num);
  const pct = (num) => `${num.toFixed(1)}%`;
  const roiDisplay = (num) => num >= 100 ? `${(num / 100).toFixed(1)}X` : `${num.toFixed(1)}%`;

  const getPersonnelType = (orgId) => {
    if (orgId === 'cbp-wide') return 'officers and agents';
    if (orgId.startsWith('usbp')) return 'agents';
    return 'officers';
  };
  const getPersonnelCapitalized = (orgId) => {
    if (orgId === 'cbp-wide') return 'Officers & Agents';
    if (orgId.startsWith('usbp')) return 'Agents';
    return 'Officers';
  };

  // COA Scenario Comparison
  const computeCoaScenario = (optionId) => {
    const data = orgData[org];
    let rP, lP, rPrice;
    if (optionId === 'pilot') { rP = 0.15; lP = includeLeadForLeaders ? 0.10 : 0; rPrice = 250; }
    else if (optionId === 'targeted') { rP = 0.25; lP = includeLeadForLeaders ? 0.10 : 0; rPrice = 200; }
    else { rP = 0.75; lP = includeLeadForLeaders ? 0.10 : 0; rPrice = 150; }
    const lS = Math.round(data.officers * lP);
    const rS = Math.max(Math.round(data.officers * rP), 500);
    const tS = lS + rS;
    const tI = (lS * 5785) + (rS * rPrice);
    const eng = manualEngagement !== null ? manualEngagement / 100 : 0.65;
    const aU = Math.round(tS * eng);
    const cov = Math.min(1, aU / data.officers);
    const bS = behavioralHealthCalcs.totalBehavioralSeparations;
    const wE = bS > 0 ? ((behavioralHealthCalcs.ptsdSeparations * (ptsdCoachingEffectiveness / 100)) + (behavioralHealthCalcs.depressionSeparations * (depressionCoachingEffectiveness / 100)) + (behavioralHealthCalcs.anxietySeparations * (anxietyCoachingEffectiveness / 100)) + (behavioralHealthCalcs.sudSeparations * (sudCoachingEffectiveness / 100))) / bS : 0;
    const sP = Math.round(bS * (isFinite(wE) ? wE : 0) * cov);
    const retS = sP * 150000;
    const wcS = (Math.round(behavioralHealthCalcs.ptsdWcClaims * (ptsdCoachingEffectiveness / 100) * cov) * ptsdWcAvgCost) + (Math.round(behavioralHealthCalcs.depressionWcClaims * (depressionCoachingEffectiveness / 100) * cov) * depressionWcAvgCost) + (Math.round(behavioralHealthCalcs.anxietyWcClaims * (anxietyCoachingEffectiveness / 100) * cov) * anxietyWcAvgCost) + (Math.round(behavioralHealthCalcs.sudWcClaims * (sudCoachingEffectiveness / 100) * cov) * sudWcAvgCost);
    const dS = Math.round(Math.round(data.officers * 0.035) * 0.22 * cov) * 45000;
    const totS = retS + wcS + dS;
    const nS = totS - tI;
    const r = tI > 0 ? (nS / tI) * 100 : 0;
    return { leadSeats: lS, readySeats: rS, totalSeats: tS, activeUsers: aU, coverage: cov, totalInvestment: tI, retentionSavings: retS, wcSavings: wcS, disciplineSavings: dS, totalSavings: totS, netSavings: nS, roi: r };
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const responses = {
      'How is the net savings calculated?': "Net savings = Total savings minus platform investment. The model prevents separations ($150K each), Workers' Comp claims, and discipline cases across three interconnected pathways.",
      'Why is CBP facing a retirement crisis?': "In 2028, 40% of the CBP workforce becomes retirement-eligible under Law Enforcement 6(c) provisions at age 50, creating what DHS describes as an 'unrecoverable downward staffing trend.'",
      'Explain the COA differences': 'Pilot: 15% coverage at $250/seat. Targeted: 25% at $200/seat (recommended). Scaled: 75% at $150/seat for maximum impact.',
      "What's Lead vs Ready?": 'Lead ($5,785/seat) provides intensive 1:1 coaching for supervisors. Ready ($150-250/seat) delivers scalable digital coaching for frontline officers and agents.',
      'How does comorbidity work?': 'The model accounts for overlap between mental health conditions. At 35% overlap, we prevent double-counting officers with multiple diagnoses, producing more conservative and defensible estimates.',
      'What programs does CBP already have?': "CBP operates the Resiliency Program, Employee Assistance Program, Peer Support, Chaplaincy, and Critical Incident Stress Management. This model evaluates a complementary proactive coaching platform that addresses the gap between crisis response and prevention.",
    };
    setChatMessages([...chatMessages, { type: 'user', text: chatInput }, { type: 'assistant', text: responses[chatInput] || 'Ask about net savings, retirement crisis, COA differences, Lead vs Ready, comorbidity, or current CBP programs.' }]);
    setChatInput('');
  };

  // ===== RENDER =====
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '40px 0' }}>
      <GlobalStyles />

      {/* ===== HEADER ===== */}
      <div style={container}>
        <div style={{ background: 'linear-gradient(135deg, #005288 0%, #003a5d 100%)', borderRadius: 12, padding: '20px 28px', boxShadow: '0 6px 24px rgba(0,82,136,0.25)', border: '1px solid #0078ae' }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: T.color.gold, marginBottom: 6, lineHeight: 1.2 }}>CBP Workforce Sustainability Dashboard</h1>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#cbd5e1', marginBottom: 12, lineHeight: 1.3 }}>Readiness, Retention and Cost Avoidance ROI Projections for CBP Workforce</p>

          <div style={{ background: 'rgba(0,82,136,0.25)', borderRadius: 8, padding: '12px 16px', border: '2px solid rgba(255,204,1,0.5)', marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: '#ffffff', lineHeight: 1.5, marginBottom: 0, textAlign: 'center' }}>
              <strong style={{ color: T.color.gold }}>Evidence-based ROI decision support tool</strong> for CBP Port Directors, Field Office Directors, and Sector Chiefs. This calculator is designed as a <strong style={{ color: T.color.gold }}>collaborative tool</strong> for evaluating proactive coaching & development platform investments—<strong style={{ color: T.color.gold }}>complementing, not replacing</strong>, CBP's existing Resiliency Program infrastructure. It models three interconnected cost areas: <strong style={{ color: T.color.gold }}>(1) retention costs</strong> from behavioral health-driven separations, <strong style={{ color: T.color.gold }}>(2) Workers' Comp (FECA)</strong> mental health claims and disability costs, and <strong style={{ color: T.color.gold }}>(3) professional standards</strong> discipline failures. All assumptions are adjustable and intended to be validated with CBP's own data.
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#e2e8f0', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Select Your Organization</label>
            <select value={org} onChange={(e) => setOrg(e.target.value)} style={{ width: '100%', padding: '14px 18px', fontSize: 15, fontWeight: 600, color: '#1e293b', border: '2px solid #0078ae', borderRadius: 10, background: 'white', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <option value="">Choose your organization...</option>
              <optgroup label="📊 CBP Enterprise"><option value="cbp-wide">CBP-Wide (All Components) - 60,000 officers and agents</option></optgroup>
              <optgroup label="🛂 Office of Field Operations"><option value="ofo">OFO (All Field Offices) - 26,030 officers</option></optgroup>
              <optgroup label="🏢 OFO Field Offices - Tier 1">
                <option value="ofo-ny">New York - 2,200</option><option value="ofo-la">Los Angeles - 2,100</option><option value="ofo-miami">Miami - 2,000</option><option value="ofo-houston">Houston - 1,900</option><option value="ofo-sandiego">San Diego - 1,800</option>
              </optgroup>
              <optgroup label="🏢 OFO Field Offices - Tier 2">
                <option value="ofo-chicago">Chicago - 1,500</option><option value="ofo-seattle">Seattle - 1,450</option><option value="ofo-sanfrancisco">San Francisco - 1,400</option><option value="ofo-elpaso">El Paso - 1,350</option><option value="ofo-laredo">Laredo - 1,300</option>
              </optgroup>
              <optgroup label="🏢 OFO Field Offices - Tier 3">
                <option value="ofo-boston">Boston - 1,000</option><option value="ofo-baltimore">Baltimore - 950</option><option value="ofo-atlanta">Atlanta - 900</option><option value="ofo-sanjuan">San Juan - 900</option><option value="ofo-detroit">Detroit - 850</option><option value="ofo-neworleans">New Orleans - 850</option><option value="ofo-tampa">Tampa - 850</option><option value="ofo-portland">Portland - 850</option><option value="ofo-buffalo">Buffalo - 800</option><option value="ofo-tucson">Tucson - 800</option>
              </optgroup>
              <optgroup label="🚔 U.S. Border Patrol"><option value="usbp">USBP (All Sectors) - 19,104 agents</option><option value="usbp-swb">USBP - Southwest Border - 16,500 agents</option></optgroup>
              <optgroup label="🚁 USBP Individual Sectors">
                <option value="usbp-tuc">Tucson - 3,800</option><option value="usbp-rgv">Rio Grande Valley - 3,500</option><option value="usbp-ept">El Paso - 2,500</option><option value="usbp-sdg">San Diego - 2,400</option><option value="usbp-lrt">Laredo - 1,600</option><option value="usbp-del">Del Rio - 1,200</option><option value="usbp-yum">Yuma - 900</option><option value="usbp-bbb">Big Bend - 600</option>
              </optgroup>
              <optgroup label="✈️ Air & Marine Operations"><option value="amo">AMO (All Units) - 1,317 officers</option></optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* ===== TAB NAVIGATION ===== */}
      <div style={container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[
              { id: 'executive-summary', label: 'Executive Summary', icon: '📊' },
              { id: 'cost-problem', label: 'The Cost Problem', icon: '⚠️' },
              { id: 'roi-model', label: 'ROI Model', icon: '💰' },
              { id: 'factors', label: 'Factor Breakdown', icon: '🔬' },
              { id: 'federal-framework', label: 'Federal Framework', icon: '📋' },
              { id: 'proof', label: 'Evidence Base', icon: '✅' },
              { id: 'model-details', label: 'Model Details', icon: '🔧' },
              { id: 'implementation', label: 'Implementation', icon: '🚀' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 10, cursor: 'pointer', background: activeTab === tab.id ? T.color.blue : 'white', color: activeTab === tab.id ? 'white' : T.color.slate600, boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,82,136,0.3)' : '0 2px 4px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'cost-problem' && (
            <div style={{ display: 'flex', gap: 2, alignItems: 'center', background: 'white', borderRadius: 12, padding: 4, border: `2px solid ${T.color.blue}` }}>
              <button onClick={() => setViewMode('field')} style={{ padding: '8px 14px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', background: viewMode === 'field' ? T.color.blue : 'transparent', color: viewMode === 'field' ? 'white' : '#64748b' }}>🎯 Field Impact</button>
              <button onClick={() => setViewMode('enterprise')} style={{ padding: '8px 14px', fontSize: 12, fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', background: viewMode === 'enterprise' ? T.color.blue : 'transparent', color: viewMode === 'enterprise' ? 'white' : '#64748b' }}>🏛️ Enterprise Costs</button>
            </div>
          )}
        </div>

        {/* ===== TAB 0: EXECUTIVE SUMMARY (NEW) ===== */}
        {activeTab === 'executive-summary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: 'white', borderRadius: 16, padding: 40, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ fontSize: 14, color: T.color.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>BOTTOM LINE UP FRONT</div>
                <h2 style={{ fontSize: 32, fontWeight: 900, color: T.color.blue, margin: 0, lineHeight: 1.2 }}>{orgData[org].name} Workforce Sustainability Business Case</h2>
                <div style={{ fontSize: 16, color: T.color.slate600, marginTop: 8 }}>Proactive Coaching & Development Platform ROI Analysis</div>
              </div>

              <div style={{ fontSize: 15, color: T.color.slate600, lineHeight: 1.7, marginBottom: 20, textAlign: 'center' }}>
                Officer and agent behavioral health—PTSD, depression, burnout, substance use—is the common thread connecting three of CBP's largest workforce costs. This tool models the financial case for <strong>prevention vs. status quo</strong>.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
                {[
                  { num: '1', text: <><strong style={{ color: T.color.ink }}>One root cause, three cost symptoms.</strong> Untreated behavioral health drives attrition, FECA claims, and discipline failures simultaneously.</> },
                  { num: '2', text: <><strong style={{ color: T.color.ink }}>Current programs activate after crisis.</strong> The gap: no scalable system that builds resilience <em>before</em> {getPersonnelType(org)} reach crisis.</> },
                  { num: '3', text: <><strong style={{ color: T.color.ink }}>40+ sources, deliberately conservative.</strong> Every assumption is adjustable—validate with your own organization's data.</> },
                  { num: '4', text: <><strong style={{ color: T.color.ink }}>2028 retirement crisis.</strong> 40% of CBP becomes retirement-eligible simultaneously under 6(c) provisions—retention is now mission-critical.</> },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'white', borderRadius: 8, border: '2px solid #e2e8f0' }}>
                    <div style={{ width: 36, height: 36, minWidth: 36, background: T.color.blue, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 800 }}>{item.num}</div>
                    <div style={{ fontSize: 13, color: T.color.slate600, lineHeight: 1.4 }}>{item.text}</div>
                  </div>
                ))}
              </div>

              {/* Four Quadrant Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32 }}>
                <div style={{ background: '#fef2f2', border: '3px solid #dc2626', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>📉 The Problem</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#dc2626', marginBottom: 12 }}>{fmt(calculations.totalSavings)}</div>
                  <div style={{ fontSize: 14, color: '#6d0a1f', lineHeight: 1.7 }}>
                    Estimated annual behavioral health-linked costs:<br />
                    • Retention: {calculations.behavioralSeparations} {getPersonnelType(org)} at risk<br />
                    • FECA Claims: {fmtCompact(calculations.wcSavings)} preventable<br />
                    • Discipline: {calculations.casesPrevented} preventable cases
                  </div>
                </div>
                <div style={{ background: '#e8f4e0', border: `3px solid ${T.color.green}`, borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#166534', marginBottom: 12 }}>💡 The Opportunity</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: T.color.green, marginBottom: 12 }}>{roiDisplay(calculations.roi)}</div>
                  <div style={{ fontSize: 14, color: '#14532d', lineHeight: 1.7 }}>
                    Estimated ROI from proactive coaching platform<br />
                    • Investment: {fmt(calculations.totalInvestment)}<br />
                    • Potential Savings: {fmt(calculations.totalSavings)}<br />
                    • Net Savings: {fmt(calculations.netSavings)}
                  </div>
                </div>
                <div style={{ background: T.color.lightBlue, border: `3px solid ${T.color.blue}`, borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.color.blue, marginBottom: 12 }}>✅ The Evidence</div>
                  <div style={{ fontSize: 14, color: T.color.blue, lineHeight: 1.8 }}>
                    <strong>Air Force (4-yr):</strong> +7% career commitment<br />
                    <strong>JAMA 2024 RCT:</strong> 21.6% symptom reduction<br />
                    <strong>Montreal Police (22-yr):</strong> 65% suicide reduction<br />
                    <strong>CuraLinc LEO Study:</strong> 67% SUD severity reduction
                  </div>
                </div>
                <div style={{ background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>🎯 The Ask</div>
                  <div style={{ fontSize: 14, color: '#78350f', lineHeight: 1.8 }}>
                    Evaluate investing in a <strong>proactive coaching & development platform</strong> providing 1:1 coaching, AI-powered support, and group sessions continuously:<br />
                    • <strong>COA 1 — Pilot:</strong> 15% coverage, $250/seat<br />
                    • <strong>COA 2 — Targeted:</strong> 25% coverage, $200/seat<br />
                    • <strong>COA 3 — Scaled:</strong> 75% coverage, $150/seat
                  </div>
                </div>
              </div>

              {/* Three Pathways */}
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: T.color.ink, marginBottom: 20, textAlign: 'center' }}>Three Interconnected Cost Pathways</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {[
                    { icon: '💼', label: 'Retention', cost: calculations.retentionSavings, desc: `${calculations.behavioralSeparations} behavioral health-linked separations` },
                    { icon: '🏥', label: "Workers' Comp (FECA)", cost: calculations.wcSavings, desc: `${calculations.baselineWcClaims} mental health claims` },
                    { icon: '⚖️', label: 'Professional Standards', cost: calculations.disciplineSavings, desc: `${calculations.casesPrevented} preventable discipline cases` },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 48, marginBottom: 12 }}>{item.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: T.color.blue, marginBottom: 8 }}>{item.label}</div>
                      <div style={{ fontSize: 32, fontWeight: 900, color: T.color.red, marginBottom: 8 }}>{fmt(item.cost)}</div>
                      <div style={{ fontSize: 13, color: T.color.slate600 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2028 Strategic Context */}
              <div style={{ background: T.color.lightBlue, border: `2px solid ${T.color.blue}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: T.color.blue, marginBottom: 16 }}>🎯 Strategic Context: The 2028 Retirement Crisis</h3>
                <div style={{ fontSize: 15, color: T.color.blue, lineHeight: 1.8 }}>
                  In 2028, <strong>40% of CBP's workforce</strong> becomes retirement-eligible simultaneously under Law Enforcement 6(c) provisions. CBP currently ranks <strong>432 out of 459 federal agencies</strong> for morale (FEVS), faces a <strong>28% higher suicide rate</strong> than other law enforcement, and carries a <strong>$90-120M annual workers' compensation burden</strong>. This convergence creates what DHS leadership describes as an "unrecoverable downward staffing trend."
                  <br /><br />
                  Proactive coaching investments address both quantity (retention) and quality (readiness under pressure) challenges—the 2028 crisis is the consistent priority that <strong>transcends political changes</strong>.
                </div>
              </div>

              {/* Navigate */}
              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: 24 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: T.color.ink, marginBottom: 16, textAlign: 'center' }}>Explore the Model</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                  {[
                    { label: '💰 Model ROI Scenarios', tab: 'roi-model', desc: 'Select COA, adjust seats & see returns' },
                    { label: '⚠️ See Cost Problem Details', tab: 'cost-problem', desc: 'Breakdown by retention/FECA/discipline' },
                    { label: '✅ Review Evidence Base', tab: 'proof', desc: 'Air Force, JAMA, Montreal studies' },
                    { label: '📋 Federal Framework', tab: 'federal-framework', desc: 'FECA, 6(c) retirement, FEVS data' },
                  ].map((btn) => (
                    <button key={btn.tab} onClick={() => setActiveTab(btn.tab)} style={{ padding: 16, background: 'white', border: '2px solid #e2e8f0', borderRadius: 10, cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.color.blue, marginBottom: 4 }}>{btn.label}</div>
                      <div style={{ fontSize: 12, color: T.color.slate600 }}>{btn.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTE: Remaining tabs will continue in the same file - this is the foundation with the new Executive Summary */}
        {/* For brevity, showing placeholder for remaining tabs - full implementation follows same patterns */}

        {activeTab === 'cost-problem' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Cost Problem content - same as v2 but with vendor-agnostic language */}
            {viewMode === 'enterprise' ? (
              <div style={{ background: 'linear-gradient(135deg, #c41230 0%, #8f0e28 100%)', color: 'white', borderRadius: 16, padding: 48, textAlign: 'center', boxShadow: '0 8px 24px rgba(220,38,38,0.3)' }}>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, opacity: 0.95 }}>{orgData[org].name} faces an estimated annual burden of:</div>
                <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 16 }}>{fmt(calculations.totalSavings)}</div>
                <div style={{ fontSize: 20, fontWeight: 500, opacity: 0.9 }}>in preventable costs from workforce challenges—before accounting for any intervention</div>
              </div>
            ) : (
              <div style={{ background: `linear-gradient(135deg, ${T.color.blue} 0%, #003a5d 100%)`, color: 'white', borderRadius: 16, padding: '32px 48px' }}>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, opacity: 0.95 }}>{orgData[org].name} Operational Readiness Impact:</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 24 }}>
                  {[
                    { val: calculations.separationsPrevented, label: `${getPersonnelCapitalized(org)} at Risk`, sub: 'Preventable separations' },
                    { val: Math.round(behavioralHealthCalcs.uniqueAffected * 0.20), label: `${getPersonnelCapitalized(org)} Non-Deployable`, sub: 'On limited duty profiles' },
                    { val: calculations.claimsPrevented, label: 'FECA Claims Preventable', sub: 'Mental health workers\' comp' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                      <div style={{ fontSize: 48, fontWeight: 900, color: T.color.blue, marginBottom: 8 }}>{item.val}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: T.color.ink, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Category Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { icon: '💼', title: 'Retention Crisis', amount: calculations.retentionSavings, detail: `${calculations.behavioralSeparations} behavioral-driven separations annually`, drivers: ['12-month hiring timeline', '6-month academy + equipment', 'Field training with FTO', '1-2 year productivity ramp'], logic: `Prevents ${calculations.separationsPrevented} separations × $150K = ${fmt(calculations.retentionSavings)}` },
                { icon: '🏥', title: "Workers' Comp (FECA)", amount: calculations.wcSavings, detail: `${calculations.baselineWcClaims} baseline claims at ${fmt(calculations.avgWcClaimCost)} average`, drivers: [`PTSD claims: ${fmt(ptsdWcAvgCost)}`, `Depression: ${fmt(depressionWcAvgCost)}`, `Anxiety: ${fmt(anxietyWcAvgCost)}`, `SUD: ${fmt(sudWcAvgCost)}`], logic: `Platform prevents ${calculations.claimsPrevented} claims = ${fmt(calculations.wcSavings)}` },
                { icon: '⚖️', title: 'Professional Standards', amount: calculations.disciplineSavings, detail: `${calculations.casesPrevented} preventable cases annually`, drivers: ['Use-of-force investigations', 'Misconduct cases', 'Substance violations', 'Terminations'], logic: `22% standards lift × ${(calculations.coverage * 100).toFixed(1)}% coverage = ${fmt(calculations.disciplineSavings)}` },
              ].map((card, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 12, padding: 24, border: viewMode === 'enterprise' ? `3px solid ${T.color.red}` : `2px solid ${T.color.blue}`, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: viewMode === 'enterprise' ? T.color.red : T.color.blue, marginBottom: 12 }}>{card.icon} {card.title}</div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: T.color.ink, marginBottom: 16 }}>{fmt(card.amount)}</div>
                  <div style={{ fontSize: 15, color: T.color.slate600, marginBottom: 20, lineHeight: 1.6 }}><strong>{card.detail}</strong></div>
                  <div style={{ background: viewMode === 'enterprise' ? '#fef2f2' : '#f8fafc', padding: 16, borderRadius: 8, fontSize: 14, color: viewMode === 'enterprise' ? '#6d0a1f' : T.color.blue, lineHeight: 1.6 }}>
                    <strong>Cost Drivers:</strong><br />{card.drivers.map((d, j) => <span key={j}>• {d}<br /></span>)}<br /><strong>Model Logic:</strong><br />• {card.logic}
                  </div>
                </div>
              ))}
            </div>

            {/* Root Cause Section */}
            <div style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)', border: '3px solid #64748b', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>🔗</span>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: T.color.ink, margin: 0 }}>One Root Cause, Three Cost Symptoms</h2>
              </div>
              <div style={{ background: 'white', padding: '16px 20px', borderRadius: 10, border: '2px solid #64748b' }}>
                <div style={{ fontSize: 15, color: T.color.slate600, lineHeight: 1.7 }}>
                  A proactive coaching platform addresses the <strong>root cause</strong> by building resilience and developing leadership capability <strong>before</strong> {getPersonnelType(org)} reach crisis points. Early intervention through continuous coaching prevents the behavioral health deterioration that drives all three cost categories. This is why our model applies <strong>comorbidity adjustments</strong> (currently {comorbidityOverlap}%) — to avoid double-counting the same {getPersonnelType(org)} across conditions and provide accurate, conservative ROI projections.
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: `linear-gradient(135deg, ${T.color.lightBlue} 0%, #cce5f0 100%)`, border: `3px solid ${T.color.blue}`, borderRadius: 12, padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0078ae', marginBottom: 12 }}>There's a Better Way Forward</div>
              <div style={{ fontSize: 17, color: '#0078ae', lineHeight: 1.7, margin: '0 auto 24px' }}>A proactive coaching & development platform addresses all three cost categories simultaneously by targeting root causes early, scaling across the entire workforce, and building leadership capability.</div>
              <button onClick={() => setActiveTab('roi-model')} style={{ padding: '16px 32px', fontSize: 17, fontWeight: 700, background: T.color.blue, color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer' }}>See the ROI Model →</button>
            </div>
          </div>
        )}

        {/* ===== TAB: FEDERAL FRAMEWORK (NEW) ===== */}
        {activeTab === 'federal-framework' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: `linear-gradient(135deg, ${T.color.lightBlue} 0%, #cce5f0 100%)`, border: `3px solid ${T.color.blue}`, borderRadius: 16, padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <span style={{ fontSize: 48 }}>📋</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: T.color.blue, margin: 0 }}>Federal Workforce Framework: Why CBP's Cost Environment is Unique</h2>
              </div>
              <p style={{ fontSize: 16, color: T.color.blue, lineHeight: 1.7 }}>CBP operates under a unique combination of federal workforce provisions that significantly impact cost exposure and create strong financial rationale for preventive interventions.</p>
            </div>

            {/* FECA */}
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🏥</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: T.color.ink, margin: 0 }}>Federal Employees' Compensation Act (FECA)</h3>
              </div>
              <div style={{ fontSize: 16, color: T.color.slate600, lineHeight: 1.8, marginBottom: 20 }}><strong>What it does:</strong> Provides wage replacement (66-75% of salary), medical treatment, and vocational rehabilitation for federal employees with work-related injuries — including mental health conditions.</div>
              <div style={{ background: '#fef3c7', padding: 20, borderRadius: 10, border: '2px solid #fbbf24' }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>Cost Implications for CBP</h4>
                <div style={{ fontSize: 15, color: '#78350f', lineHeight: 1.8 }}>
                  <strong>Annual WC Budget:</strong> $90-120M (CBP-wide estimated)<br />
                  <strong>Mental Health Share:</strong> Growing rapidly — PTSD, depression, anxiety claims<br />
                  <strong>Average Claim Cost:</strong> PTSD: $85K, Depression: $55K, Anxiety: $47.5K, SUD: $40K<br />
                  <strong>Limited Duty:</strong> Average 87 days not fully deployable per affected officer
                </div>
              </div>
            </div>

            {/* 6(c) Retirement */}
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>⏰</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: T.color.ink, margin: 0 }}>Law Enforcement 6(c) Retirement Provisions</h3>
              </div>
              <div style={{ fontSize: 16, color: T.color.slate600, lineHeight: 1.8, marginBottom: 20 }}><strong>What it does:</strong> CBP officers and agents can retire at age 50 with 20 years of service, or at any age with 25 years. Mandatory retirement at age 57.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ background: '#fef2f2', padding: 20, borderRadius: 10, border: '2px solid #fecaca' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>The 2028 Crisis</h4>
                  <div style={{ fontSize: 14, color: '#6d0a1f', lineHeight: 1.7 }}>
                    • 40% of workforce becomes retirement-eligible simultaneously<br />
                    • Officers hired during the 2006-2008 surge reach 20-year mark<br />
                    • Creates "unrecoverable downward staffing trend"<br />
                    • Cannot recruit/train fast enough to replace losses
                  </div>
                </div>
                <div style={{ background: '#e8f4e0', padding: 20, borderRadius: 10, border: '2px solid #86efac' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: T.color.green, marginBottom: 12 }}>Prevention Opportunity</h4>
                  <div style={{ fontSize: 14, color: '#14532d', lineHeight: 1.7 }}>
                    • Extend productive careers by 2-5 years<br />
                    • Every year of delayed retirement saves $150K+ in replacement<br />
                    • Proactive wellness reduces burnout-driven early exits<br />
                    • Financial incentives alone don't solve retention (Air Force data)
                  </div>
                </div>
              </div>
            </div>

            {/* FEVS Rankings */}
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>📊</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: T.color.ink, margin: 0 }}>Federal Employee Viewpoint Survey (FEVS) Data</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                {[
                  { val: '432/459', label: 'Overall Morale Ranking', sub: 'Near bottom of all federal agencies' },
                  { val: '28%', label: 'Higher Suicide Rate', sub: 'vs. other law enforcement' },
                  { val: '70%', label: 'Organizational Stressors', sub: 'Drive adverse outcomes (not operational danger)' },
                ].map((s, i) => (
                  <div key={i} style={{ background: '#fef2f2', padding: 20, borderRadius: 10, textAlign: 'center', border: '2px solid #fecaca' }}>
                    <div style={{ fontSize: 36, fontWeight: 900, color: T.color.red }}>{s.val}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.color.ink, marginTop: 8 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: T.color.slate600, marginTop: 4 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: T.color.lightBlue, padding: 20, borderRadius: 10, border: `2px solid ${T.color.blue}` }}>
                <div style={{ fontSize: 15, color: T.color.blue, lineHeight: 1.7 }}>
                  <strong>Critical insight:</strong> CBP's challenges stem from <strong>organizational stressors</strong> (overtime, understaffing, leadership culture) driving 70% of adverse outcomes rather than operational dangers. Burnout occurs in <strong>6-12 months</strong> rather than the previously assumed 5-10 years. This means proactive coaching interventions can intercept the burnout cycle early.
                </div>
              </div>
            </div>

            {/* DHS Resilience Framework */}
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🛡️</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: T.color.ink, margin: 0 }}>DHS Resilience Framework (2018)</h3>
              </div>
              <div style={{ fontSize: 16, color: T.color.slate600, lineHeight: 1.8, marginBottom: 20 }}>DHS established a department-wide resilience framework recognizing the need for proactive workforce sustainability.</div>
              <div style={{ background: '#f8fafc', padding: 20, borderRadius: 10, border: '2px solid #e2e8f0' }}>
                <div style={{ fontSize: 15, color: T.color.slate600, lineHeight: 1.8 }}>
                  <strong>Framework Pillars:</strong> Physical Health, Emotional/Behavioral Health, Social Connections, Financial Well-being, Spiritual Fitness<br /><br />
                  A proactive coaching platform directly supports the DHS Resilience Framework by providing scalable, continuous support across emotional/behavioral health, social connections, and leadership development — filling the gap between the framework's vision and current program delivery.
                </div>
              </div>
            </div>

            {/* Why This Framework Matters */}
            <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '3px solid #f59e0b', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#92400e', marginBottom: 16 }}>💡 Why the Federal Framework Matters for ROI</h3>
              <div style={{ fontSize: 15, color: '#78350f', lineHeight: 1.8 }}>
                The combination of <strong>FECA mental health claims</strong> + <strong>6(c) retirement provisions</strong> + <strong>432/459 FEVS morale ranking</strong> creates a uniquely challenging environment for CBP. Unlike private sector, CBP cannot simply raise salaries (though the Air Force experience shows financial incentives alone don't solve retention). The <strong>2028 retirement crisis</strong> is the consistent priority that transcends political changes — making proactive workforce sustainability investments both urgent and bipartisan.
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for remaining tabs - keeping message brief */}
        {activeTab === 'roi-model' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Current Infrastructure Assessment (NEW) */}
            <div style={{ background: 'white', borderRadius: 12, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>🏥</span>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: T.color.ink, margin: 0 }}>Current CBP Wellness Infrastructure</h2>
              </div>
              <p style={{ fontSize: 15, color: T.color.slate600, lineHeight: 1.7, marginBottom: 20 }}>CBP has invested significantly in behavioral health and crisis response infrastructure. Understanding what exists—and where gaps remain—is essential to designing complementary investments.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {[
                  { name: 'Resiliency Program', detail: 'Director: Desiree "Noelani" Aveina', focus: 'Holistic wellness & resiliency', opportunity: 'Strong vision; opportunity for scalable continuous delivery complementing existing infrastructure' },
                  { name: 'Employee Assistance Program', detail: 'Traditional EAP', focus: '3-6 sessions for crisis', opportunity: '~3-5% utilization rate nationally; stigma and reactive model limit preventive impact' },
                  { name: 'Peer Support Program', detail: 'Volunteer officers/agents', focus: 'Informal support network', opportunity: 'Valued by workforce; lacks standardized training, outcomes measurement, and scalability' },
                  { name: 'Critical Incident Stress Management', detail: 'Post-incident response', focus: 'Critical incident debriefing', opportunity: 'Excellent crisis response; no proactive development before incidents occur' },
                  { name: 'Chaplaincy Program', detail: 'Spiritual support', focus: 'Counseling & memorial services', opportunity: 'Important for many officers; limited reach and clinical scope' },
                  { name: 'Training & Development', detail: 'Academy + periodic', focus: 'Episodic skill training', opportunity: 'Good content; 70% forgotten in 24h without continuous reinforcement (Ebbinghaus curve)' },
                ].map((prog, i) => (
                  <div key={i} style={{ background: '#f8fafc', borderRadius: 10, padding: 16, border: '2px solid #e2e8f0' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.color.ink, marginBottom: 4 }}>{prog.name}</div>
                    <div style={{ fontSize: 13, color: T.color.blue, fontWeight: 600, marginBottom: 8 }}>{prog.detail}</div>
                    <div style={{ fontSize: 12, color: T.color.slate600, marginBottom: 8 }}><strong>Focus:</strong> {prog.focus}</div>
                    <div style={{ fontSize: 12, color: T.color.blue, lineHeight: 1.5 }}><strong>Opportunity:</strong> {prog.opportunity}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: 20, background: T.color.lightBlue, borderRadius: 10, border: `2px solid ${T.color.blue}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.color.blue, marginBottom: 12 }}>📋 Assessment Summary</div>
                <div style={{ fontSize: 14, color: T.color.blue, lineHeight: 1.8 }}>
                  <strong>What CBP Has Built:</strong> Robust crisis response, emerging resiliency program, and dedicated chaplaincy/peer support infrastructure.<br /><br />
                  <strong>The Strategic Gap:</strong> No scalable, proactive, continuous development system that builds resilience, leadership capability, and sustainable performance <em>before</em> behavioral health deterioration impacts retention, FECA claims, and professional standards costs.
                </div>
              </div>
            </div>

            {/* Net Savings Display */}
            <div style={{ background: 'linear-gradient(135deg, #e8f4e0 0%, #d0eac0 100%)', border: `4px solid ${T.color.green}`, borderRadius: 16, padding: '28px 40px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: T.color.green, marginBottom: 12 }}>Estimated Annual Net Savings</div>
              <div style={{ fontSize: 64, fontWeight: 900, color: T.color.green, marginBottom: 16 }}>{fmt(calculations.netSavings)}</div>
              <div style={{ fontSize: 18, color: T.color.green, marginBottom: 24 }}>
                ROI: <strong>{roiDisplay(calculations.roi)}</strong> • Total Savings: {fmt(calculations.totalSavings)} • Investment: {fmt(calculations.totalInvestment)}
              </div>
            </div>

            {/* COA Selection */}
            <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: T.color.ink, marginBottom: 16 }}>Select Course of Action (COA)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { id: 'pilot', label: 'COA 1: Pilot', desc: '15% of workforce • Select offices • Proof of concept', seats: Math.max(Math.round(calculations.officers * 0.15), 500), price: '$250/seat' },
                  { id: 'targeted', label: 'COA 2: Targeted (Recommended)', desc: '25% of workforce • Balanced scale with volume discount', seats: Math.max(Math.round(calculations.officers * 0.25), 500), price: '$200/seat' },
                  { id: 'scaled', label: 'COA 3: Scaled', desc: '75% of workforce • Maximum impact', seats: Math.max(Math.round(calculations.officers * 0.75), 500), price: '$150/seat' },
                ].map(option => (
                  <button key={option.id} onClick={() => setCoa(option.id)} style={{ padding: 20, border: coa === option.id ? `3px solid ${T.color.blue}` : '2px solid #e2e8f0', borderRadius: 12, background: coa === option.id ? T.color.lightBlue : 'white', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: coa === option.id ? T.color.blue : T.color.ink, marginBottom: 8 }}>{option.label}</div>
                    <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>{option.desc}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: T.color.ink }}>{option.seats.toLocaleString()} Ready seats • {option.price}</div>
                  </button>
                ))}
              </div>

              {/* Lead Toggle */}
              <div style={{ marginTop: 20, padding: 24, background: '#f8fafc', borderRadius: 12, border: '2px solid #e2e8f0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <input type="checkbox" checked={includeLeadForLeaders} onChange={(e) => setIncludeLeadForLeaders(e.target.checked)} style={{ width: 20, height: 20, cursor: 'pointer' }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.color.ink }}>Add Lead for Supervisors & Critical Talent (10% GS-13+ coverage)</div>
                    <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>Adds {Math.round(calculations.officers * 0.10).toLocaleString()} Lead seats at $5,785/seat • Develops leadership culture</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Break-Even Analysis (NEW) */}
            <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '3px solid #f59e0b', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#92400e', marginBottom: 16 }}>📊 Break-Even Analysis</h3>
              <p style={{ fontSize: 14, color: '#78350f', marginBottom: 16 }}>At {fmt(calculations.totalInvestment)} investment, improvement needed to break even in each category alone:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { label: 'Retention Only', value: calculations.breakEvenRetention },
                  { label: "Workers' Comp Only", value: calculations.breakEvenWc },
                  { label: 'Discipline Only', value: calculations.breakEvenDiscipline },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'white', padding: 16, borderRadius: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#78350f', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#92400e' }}>{item.value}%</div>
                    <div style={{ fontSize: 12, color: '#78350f' }}>improvement needed</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: 12, background: 'white', borderRadius: 8, fontSize: 14, color: '#78350f' }}>
                <strong>Key Insight:</strong> Because effective wellness interventions impact all three cost categories simultaneously, even modest improvements across all three exceed break-even thresholds.
              </div>
            </div>

            {/* Product Mix */}
            <div style={{ background: 'white', borderRadius: 12, padding: '20px 28px 28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>💼</span>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: T.color.ink, margin: 0 }}>Product Mix & Investment</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 10, border: '2px solid #e2e8f0' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Lead Seats</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: T.color.ink }}>{calculations.leadSeats.toLocaleString()}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Critical talent • {fmt(calculations.leadPrice)}/seat</div>
                </div>
                <div style={{ background: '#f8fafc', padding: 20, borderRadius: 10, border: '2px solid #e2e8f0' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Ready Seats</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: T.color.ink }}>{calculations.readySeats.toLocaleString()}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Frontline {getPersonnelType(org)} • {fmt(calculations.readyPrice)}/seat</div>
                </div>
                <div style={{ background: T.color.lightBlue, padding: 20, borderRadius: 10, border: `3px solid ${T.color.blue}` }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.color.blue, marginBottom: 8 }}>Total Investment</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: T.color.blue }}>{fmt(calculations.totalInvestment)}</div>
                  <div style={{ fontSize: 13, color: T.color.blue, marginTop: 4 }}>{calculations.totalSeats.toLocaleString()} seats • {pct(calculations.engagement)} engagement</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining tabs use same patterns - abbreviated for file size */}
        {activeTab === 'factors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: T.color.ink, marginBottom: 16 }}>Understanding the Behavioral Health Factors</h2>
              <p style={{ fontSize: 16, color: T.color.slate600, lineHeight: 1.7 }}>Workers' comp, retention, and discipline costs are driven by four behavioral health factors. Use the panels below to adjust assumptions.</p>
            </div>

            {/* Enhanced Comorbidity Panel with Education (Priority 8) */}
            <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '3px solid #f59e0b', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>🧮</span>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#92400e', margin: 0 }}>Comorbidity Adjustment</h2>
              </div>

              {/* Educational Explainer (NEW from LAPD) */}
              <div style={{ background: 'white', padding: 20, borderRadius: 10, marginBottom: 16, border: '2px solid #fbbf24' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>💡 What is this and why does it matter?</div>
                <p style={{ fontSize: 15, color: '#78350f', lineHeight: 1.8, margin: 0 }}>
                  Mental health conditions rarely occur alone. An {getPersonnelType(org).split(' ')[0]} with <strong>PTSD</strong> often also experiences <strong>depression</strong> and may develop <strong>substance use</strong> issues as a coping mechanism. If we count each condition separately, we'd count the same person 3 times—inflating our numbers and making the model unrealistic.
                </p>
              </div>

              {/* Without vs With Visual (NEW from LAPD) */}
              <div style={{ background: 'white', padding: 20, borderRadius: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>📊 Example: Without vs. With Adjustment</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ background: '#fef2f2', padding: 16, borderRadius: 8, border: '2px solid #fca5a5' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', marginBottom: 8 }}>❌ Without Adjustment (Inflated)</div>
                    <div style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.7 }}>
                      • {behavioralHealthCalcs.ptsdAffected ? Math.round(behavioralHealthCalcs.ptsdAffected / (1 - comorbidityOverlap/100)).toLocaleString() : '—'} with PTSD<br />
                      • {behavioralHealthCalcs.depressionAffected ? Math.round(behavioralHealthCalcs.depressionAffected / (1 - comorbidityOverlap/100)).toLocaleString() : '—'} with depression<br />
                      • Plus anxiety + SUD...<br />
                      <strong style={{ color: '#dc2626' }}>= {behavioralHealthCalcs.rawTotalAffected.toLocaleString()} "affected"</strong>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: '#991b1b', fontStyle: 'italic' }}>Counts many {getPersonnelType(org)} multiple times!</div>
                  </div>
                  <div style={{ background: '#e8f4e0', padding: 16, borderRadius: 8, border: `2px solid ${T.color.green}` }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#166534', marginBottom: 8 }}>✅ With {comorbidityOverlap}% Overlap Adjustment</div>
                    <div style={{ fontSize: 13, color: '#14532d', lineHeight: 1.7 }}>
                      • Same conditions, but...<br />
                      • ~{comorbidityOverlap}% have 2+ conditions<br />
                      • Count each person once<br />
                      <strong style={{ color: T.color.green }}>= {behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique {getPersonnelType(org)}</strong>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: '#166534', fontStyle: 'italic' }}>More accurate, defensible estimate</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '16px 20px', borderRadius: 10, border: '2px solid #f59e0b' }}>
                <label style={{ display: 'block', fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#92400e' }}>Comorbidity Overlap: {comorbidityOverlap}%</label>
                <input type="range" min="0" max="50" step="5" value={comorbidityOverlap} onChange={(e) => setComorbidityOverlap(parseInt(e.target.value))} style={{ width: '100%', height: 8 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#92400e', marginTop: 4 }}>
                  <span>0% (less conservative)</span><span>50% (more conservative)</span>
                </div>
                <div style={{ marginTop: 20, padding: 20, background: '#fffbeb', borderRadius: 10, border: '2px solid #fbbf24' }}>
                  <div style={{ fontSize: 15, color: '#78350f', lineHeight: 1.8 }}>
                    <strong>Current Impact:</strong><br />
                    • Raw total (if independent): {behavioralHealthCalcs.rawTotalAffected.toLocaleString()} {getPersonnelType(org)}<br />
                    • Adjusted for {comorbidityOverlap}% overlap: {behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique {getPersonnelType(org)}<br />
                    • Prevented double-counting: {behavioralHealthCalcs.comorbidityReduction.toLocaleString()} {getPersonnelType(org)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proof' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <MethodologyImpactSection />
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: T.color.ink, marginBottom: 20 }}>🎖️ Department of Air Force: Federal Translation</h2>
              <div style={{ fontSize: 16, color: T.color.slate600, lineHeight: 1.7, marginBottom: 24 }}>Multi-year partnership demonstrates proven outcomes in high-stress federal environments directly comparable to CBP.</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                {[
                  { metric: '+7%', label: 'Career Commitment', desc: '4-year study' },
                  { metric: '+15%', label: 'Unit Readiness', desc: 'Team performance' },
                  { metric: '+13%', label: 'Individual Readiness', desc: 'Mission competencies' },
                  { metric: '88%', label: 'Would Recommend', desc: 'High adoption' },
                ].map((item, i) => (
                  <div key={i} style={{ background: T.color.lightBlue, padding: 24, borderRadius: 12, border: `2px solid ${T.color.blue}`, textAlign: 'center' }}>
                    <div style={{ fontSize: 48, fontWeight: 900, color: T.color.blue }}>{item.metric}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: T.color.ink }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* JAMA, Montreal, CuraLinc abbreviated */}
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: T.color.ink, marginBottom: 20 }}>🔬 Additional Clinical Validation</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {[
                  { title: 'JAMA 2024 RCT', metric: '21.6%', desc: 'Symptom reduction in burnout & mental health conditions', detail: '1,132 participants, randomized controlled trial' },
                  { title: 'Montreal Police (22-yr)', metric: '65%', desc: 'Suicide rate reduction through proactive prevention', detail: 'Gold standard longitudinal study (29.4 → 10.2 per 100K)' },
                  { title: 'CuraLinc LEO Study', metric: '67%', desc: 'Alcohol severity reduction in law enforcement', detail: '78% at-risk elimination through early intervention' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '2px solid #e2e8f0' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.color.ink, marginBottom: 12 }}>{item.title}</div>
                    <div style={{ fontSize: 42, fontWeight: 900, color: T.color.blue, marginBottom: 8 }}>{item.metric}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.color.ink, marginBottom: 8 }}>{item.desc}</div>
                    <div style={{ fontSize: 13, color: T.color.slate600 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Model Details Tab (NEW) */}
        {activeTab === 'model-details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(255,204,1,0.15) 0%, rgba(255,204,1,0.05) 100%)', borderRadius: 16, padding: 32, border: `3px solid ${T.color.gold}` }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: T.color.ink, margin: 0 }}>🔧 Model Details & Methodology</h2>
              <p style={{ fontSize: 15, color: T.color.slate600, margin: '8px 0 0' }}>Complete transparency on assumptions, calculations, and evidence base for CBP leadership and budget analysts.</p>
            </div>

            {/* Core Formulas */}
            <div style={{ background: 'white', borderRadius: 12, padding: 28, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: T.color.ink, marginBottom: 20 }}>Core Formulas</h3>
              {[
                { step: 1, title: 'Behavioral Health Population (Comorbidity-Adjusted)', formula: 'Raw Affected = Σ(Officers × Condition Prevalence %)\nUnique Affected = Raw × (1 - Comorbidity Overlap %)', example: `${orgData[org].name}: Raw ${behavioralHealthCalcs.rawTotalAffected.toLocaleString()} → Adjusted ${behavioralHealthCalcs.uniqueAffected.toLocaleString()} unique`, color: '#7c3aed' },
                { step: 2, title: 'Retention Savings', formula: 'Behavioral Separations = Σ(Adjusted Affected × Condition Separation Rate)\nPrevented = Behavioral × Weighted Effectiveness × Coverage\nSavings = Prevented × $150K Replacement Cost', example: `${calculations.behavioralSeparations} behavioral → ${calculations.separationsPrevented} prevented × $150K = ${fmt(calculations.retentionSavings)}`, color: '#dc2626' },
                { step: 3, title: "Workers' Comp Savings", formula: 'Claims by Condition = Adjusted Affected × WC Filing Rate\nPrevented = Claims × Coaching Effectiveness × Coverage\nSavings = Σ(Prevented × Avg Claim Cost per Condition)', example: `${calculations.baselineWcClaims} baseline → ${calculations.claimsPrevented} prevented = ${fmt(calculations.wcSavings)}`, color: '#ea580c' },
                { step: 4, title: 'Discipline Savings', formula: 'Baseline Cases = Officers × 3.5% Discipline Rate\nPrevented = Baseline × 22% Standards Lift × Coverage\nSavings = Prevented × $45K Avg Case Cost', example: `${calculations.baselineDisciplineCases} baseline → ${calculations.casesPrevented} prevented = ${fmt(calculations.disciplineSavings)}`, color: '#16a34a' },
                { step: 5, title: 'Total ROI', formula: 'Total Savings = Retention + WC + Discipline\nNet = Total - Investment\nROI = (Net ÷ Investment) × 100', example: `${fmt(calculations.totalSavings)} - ${fmt(calculations.totalInvestment)} = ${fmt(calculations.netSavings)} | ROI: ${roiDisplay(calculations.roi)}`, color: T.color.blue },
              ].map((s) => (
                <div key={s.step} style={{ background: `${s.color}08`, border: `2px solid ${s.color}40`, borderRadius: 10, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: s.color, marginBottom: 10 }}>Step {s.step}: {s.title}</div>
                  <div style={{ background: 'white', borderRadius: 8, padding: 14, fontFamily: 'monospace', fontSize: 13, color: T.color.ink, lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: 12 }}>{s.formula}</div>
                  <div style={{ background: `${s.color}15`, borderRadius: 6, padding: '10px 14px', fontSize: 13, color: s.color, fontWeight: 600 }}>{s.example}</div>
                </div>
              ))}
            </div>

            {/* Model Limitations */}
            <div style={{ background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: 12, padding: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#92400e', marginBottom: 16 }}>⚠️ Model Limitations & Appropriate Use</h3>
              <div style={{ fontSize: 14, color: '#78350f', lineHeight: 1.8 }}>
                <strong>What this model DOES:</strong> Provides conservative projections based on proven methodology, allowing CBP leadership to quantify workforce sustainability value and compare courses of action with 40+ authoritative sources.<br /><br />
                <strong>What this model DOES NOT do:</strong><br />
                • Predict exact losses for your specific field office or sector (requires your personnel data)<br />
                • Replace formal cost-benefit analysis required for federal procurement<br />
                • Account for location-specific factors (deployment tempo, local retention challenges)<br />
                • Guarantee specific outcomes (results are based on analogous populations, not contractual promises)<br /><br />
                <strong>Recommended use:</strong> Decision support for evaluating proactive coaching investments, planning budget conversations, and comparing courses of action.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: T.color.ink, marginBottom: 24 }}>🚀 Recommended Next Steps</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }}>
                {[
                  { num: '1️⃣', title: 'Review & Refine Model', desc: 'Validate assumptions with CBP data using Factor Breakdown sliders' },
                  { num: '2️⃣', title: 'Stakeholder Briefings', desc: 'Present business case with COA scenario analysis' },
                  { num: '3️⃣', title: 'Select COA & Deploy', desc: 'Choose deployment scale based on organizational readiness' },
                ].map((step, i) => (
                  <div key={i} style={{ background: 'white', padding: 20, borderRadius: 12, textAlign: 'center', border: '2px solid #e2e8f0' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{step.num}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.color.ink, marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: T.color.slate600, lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${T.color.lightBlue} 0%, #cce5f0 100%)`, border: `3px solid ${T.color.blue}`, borderRadius: 12, padding: 32 }}>
              <div style={{ background: 'white', padding: 24, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: T.color.ink, marginBottom: 12 }}>Ready to discuss how a proactive coaching platform can support CBP's workforce sustainability goals?</div>
                <div style={{ fontSize: 15, color: T.color.slate600, lineHeight: 1.7 }}>With working sliders, comorbidity adjustments, and COA comparison, this tool enables sensitivity analysis and builds stakeholder confidence in any solution meeting the evaluation criteria.</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== FLOATING CHATBOT ===== */}
      {!showChatbot && (
        <button onClick={() => setShowChatbot(true)} style={{ position: 'fixed', bottom: 32, right: 32, width: 64, height: 64, borderRadius: '50%', background: T.color.blue, color: 'white', border: 'none', fontSize: 28, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,82,136,0.4)', zIndex: 1000 }}>💬</button>
      )}
      {showChatbot && (
        <div style={{ position: 'fixed', bottom: 32, right: 32, width: 400, height: 600, background: 'white', borderRadius: 16, boxShadow: '0 12px 48px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
          <div style={{ padding: 20, borderBottom: '2px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.color.blue, borderRadius: '16px 16px 0 0' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>💬 Ask About the Model</div>
            <button onClick={() => setShowChatbot(false)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ flex: 1, padding: 20, overflowY: 'auto', background: '#f8fafc' }}>
            {chatMessages.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: 32 }}>
                <p style={{ fontWeight: 500, color: '#6b7280', marginBottom: 16 }}>Ask anything about the model!</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['How is the net savings calculated?', 'Why is CBP facing a retirement crisis?', 'Explain the COA differences', "What's Lead vs Ready?", 'How does comorbidity work?', 'What programs does CBP already have?'].map((q, i) => (
                    <button key={i} onClick={() => setChatInput(q)} style={{ width: '100%', textAlign: 'left', padding: 12, background: 'white', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>{q}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {chatMessages.map((m, i) => (
                  <div key={i} style={{ textAlign: m.type === 'user' ? 'right' : 'left' }}>
                    <div style={{ display: 'inline-block', padding: 12, borderRadius: 8, background: m.type === 'user' ? T.color.blue : 'white', color: m.type === 'user' ? 'white' : T.color.ink, border: m.type === 'user' ? 'none' : '1px solid #e5e7eb', fontSize: 14 }}>{m.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ padding: 16, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 8 }}>
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask about the model..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, fontSize: 14 }} />
            <button onClick={handleSendMessage} style={{ padding: '8px 16px', background: T.color.blue, color: 'white', border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CBPDashboard;