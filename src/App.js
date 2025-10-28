import React, { useState, useMemo } from 'react';
import { Shield, Calculator, MessageCircle, X, Settings, Award, TrendingUp, Users, DollarSign, Target, ChevronDown, ChevronUp, Sparkles, CheckCircle, BarChart3, FileText, Clock, Info, AlertCircle, TrendingDown, BookOpen } from 'lucide-react';

const CBPDashboard = () => {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showImpact, setShowImpact] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  const [missionReadinessImprovement, setMissionReadinessImprovement] = useState(17);
  const [resilienceImprovement, setResilienceImprovement] = useState(15);
  const [careerCommitmentImprovement, setCareerCommitmentImprovement] = useState(13);
  const [leadershipImprovement, setLeadershipImprovement] = useState(12);
  const [standardsImprovement, setStandardsImprovement] = useState(10);
  const [leadershipCultureImprovement, setLeadershipCultureImprovement] = useState(0);
  
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
  const [totalPersonnel, setTotalPersonnel] = useState(25879);
  const [targetPopulation, setTargetPopulation] = useState(5000);
  const [leadSeats, setLeadSeats] = useState(250);
  const [readySeats, setReadySeats] = useState(4750);
  const [use6MonthLead, setUse6MonthLead] = useState(false);
  const [engagementRate, setEngagementRate] = useState(65);

  const organizations = [
    {id: 'cbp', name: 'CBP-Wide (All Components)', personnel: 60726, location: 'Nationwide', type: 'cbp-wide', description: 'Entire CBP workforce', attritionRate: 5.5, replacementCost: 150000, workersCompClaims: 8912, avgClaimCost: 41000},
    {id: 'ofo', name: 'Office of Field Operations (OFO)', personnel: 27992, location: '20 Field Offices', type: 'component', highlight: true, description: 'CBP Officers at ports of entry', attritionRate: 6.3, replacementCost: 150000, workersCompClaims: 4107, avgClaimCost: 41000},
    {id: 'usbp', name: 'U.S. Border Patrol (USBP)', personnel: 19648, location: '20 Sectors', type: 'component', description: 'Border Patrol Agents', attritionRate: 4.2, replacementCost: 150000, workersCompClaims: 2883, avgClaimCost: 41000},
    {id: 'amt', name: 'Air and Marine Operations (AMO)', personnel: 3156, location: 'Nationwide', type: 'component', description: 'Air and marine interdiction', attritionRate: 5.8, replacementCost: 150000, workersCompClaims: 463, avgClaimCost: 41000},
    {id: 'support', name: 'Support & Mission Staff', personnel: 9930, location: 'Nationwide', type: 'component', description: 'HQ and support personnel', attritionRate: 5.1, replacementCost: 120000, workersCompClaims: 1459, avgClaimCost: 41000},
    {id: 'swb', name: 'USBP - Southwest Border', personnel: 16810, location: 'AZ, CA, NM, TX', type: 'usbp-region', description: 'All SWB sectors combined', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 2466, avgClaimCost: 41000},
    {id: 'swb_bigbend', name: 'USBP - Big Bend Sector', personnel: 1125, location: 'Texas', type: 'usbp-sector', description: 'Big Bend region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 165, avgClaimCost: 41000},
    {id: 'swb_delrio', name: 'USBP - Del Rio Sector', personnel: 2385, location: 'Texas', type: 'usbp-sector', description: 'Del Rio region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 350, avgClaimCost: 41000},
    {id: 'swb_elpaso', name: 'USBP - El Paso Sector', personnel: 2550, location: 'Texas/New Mexico', type: 'usbp-sector', description: 'El Paso region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 374, avgClaimCost: 41000},
    {id: 'swb_laredo', name: 'USBP - Laredo Sector', personnel: 1605, location: 'Texas', type: 'usbp-sector', description: 'Laredo region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 236, avgClaimCost: 41000},
    {id: 'swb_rgv', name: 'USBP - Rio Grande Valley Sector', personnel: 3180, location: 'Texas', type: 'usbp-sector', description: 'RGV region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 467, avgClaimCost: 41000},
    {id: 'swb_sandiego', name: 'USBP - San Diego Sector', personnel: 1590, location: 'California', type: 'usbp-sector', description: 'San Diego region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 233, avgClaimCost: 41000},
    {id: 'swb_tucson', name: 'USBP - Tucson Sector', personnel: 3225, location: 'Arizona', type: 'usbp-sector', description: 'Tucson region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 473, avgClaimCost: 41000},
    {id: 'swb_yuma', name: 'USBP - Yuma Sector', personnel: 1150, location: 'Arizona', type: 'usbp-sector', description: 'Yuma region', attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 169, avgClaimCost: 41000}
  ];

  const getLeadPrice = (seats) => {
    if (use6MonthLead) {
      if (seats >= 1000) return 3471;
      if (seats >= 500) return 3549;
      if (seats >= 300) return 3627;
      if (seats >= 200) return 3705;
      if (seats >= 100) return 3783;
      if (seats >= 50) return 3822;
      return 3900;
    } else {
      if (seats >= 1000) return 5785;
      if (seats >= 500) return 5915;
      if (seats >= 300) return 6045;
      if (seats >= 200) return 6175;
      if (seats >= 100) return 6305;
      if (seats >= 50) return 6370;
      return 6500;
    }
  };

  const applyCOA = (coaNumber) => {
    const org = selectedOrganization || organizations[1];
    let coveragePct, leadPct;
    
    if (org.personnel < 5000) {
      if (coaNumber === 1) { coveragePct = 0.20; leadPct = 0.05; }
      else if (coaNumber === 2) { coveragePct = 0.40; leadPct = 0.10; }
      else { coveragePct = 0.60; leadPct = 0.15; }
    } else if (org.personnel < 30000) {
      if (coaNumber === 1) { coveragePct = 0.15; leadPct = 0.05; }
      else if (coaNumber === 2) { coveragePct = 0.25; leadPct = 0.10; }
      else { coveragePct = 0.40; leadPct = 0.15; }
    } else {
      if (coaNumber === 1) { coveragePct = 0.10; leadPct = 0.05; }
      else if (coaNumber === 2) { coveragePct = 0.20; leadPct = 0.10; }
      else { coveragePct = 0.33; leadPct = 0.15; }
    }
    
    const total = Math.round(org.personnel * coveragePct);
    const lead = Math.round(total * leadPct);
    const ready = total - lead;
    
    setTargetPopulation(total);
    setLeadSeats(lead);
    setReadySeats(ready);
    
    if (coaNumber === 1) {
      setEngagementRate(55);
      setMissionReadinessImprovement(12);
      setResilienceImprovement(10);
      setCareerCommitmentImprovement(8);
      setLeadershipImprovement(7);
      setStandardsImprovement(6);
      setLeadershipCultureImprovement(lead > 0 ? 8 : 0);
    } else if (coaNumber === 2) {
      setEngagementRate(65);
      setMissionReadinessImprovement(17);
      setResilienceImprovement(15);
      setCareerCommitmentImprovement(13);
      setLeadershipImprovement(12);
      setStandardsImprovement(10);
      setLeadershipCultureImprovement(lead > 0 ? 15 : 0);
    } else {
      setEngagementRate(75);
      setMissionReadinessImprovement(25);
      setResilienceImprovement(23);
      setCareerCommitmentImprovement(20);
      setLeadershipImprovement(18);
      setStandardsImprovement(15);
      setLeadershipCultureImprovement(lead > 0 ? 22 : 0);
    }
  };

  const selectOrganization = (org) => {
    setSelectedOrganization(org);
    setTotalPersonnel(org.personnel);
    const defaultSeats = Math.round(org.personnel * 0.20);
    setTargetPopulation(defaultSeats);
    setLeadSeats(Math.round(defaultSeats * 0.05));
    setReadySeats(Math.round(defaultSeats * 0.95));
    setShowLanding(false);
    setShowExecutiveSummary(false);
  };

  const retentionEffectiveness = useMemo(() => {
    if (manualRetentionOverride) return manualRetentionValue;
    const baseRetention = 3 + (careerCommitmentImprovement / 100) * 20 + (leadershipImprovement / 100) * 15;
    const leadershipBoost = (leadershipCultureImprovement / 100) * 12;
    return Math.round(baseRetention + leadershipBoost);
  }, [careerCommitmentImprovement, leadershipImprovement, leadershipCultureImprovement, manualRetentionOverride, manualRetentionValue]);

  const readinessPercentage = useMemo(() => {
    return Math.round(12 + (missionReadinessImprovement / 100) * 30 + (resilienceImprovement / 100) * 25 + (standardsImprovement / 100) * 15);
  }, [missionReadinessImprovement, resilienceImprovement, standardsImprovement]);

  const calculations = useMemo(() => {
    const org = selectedOrganization || organizations[0];
    const totalSeats = leadSeats + readySeats;
    const engaged = Math.round((totalSeats * engagementRate) / 100);
    const expectedSeparations = Math.round(totalSeats * (org.attritionRate / 100));
    const preventedSeparations = Math.round((engaged * retentionEffectiveness) / 100);
    const retentionSavings = preventedSeparations * org.replacementCost;
    
    const avgClaimCost = 65000;
    const totalClaimsRate = org.workersCompClaims / org.personnel;
    const mentalHealthClaimsRate = totalClaimsRate * 0.35;
    const baseClaimReduction = 0.22;
    const leadershipClaimBoost = (leadershipCultureImprovement / 100) * 0.18;
    const totalClaimReduction = baseClaimReduction + leadershipClaimBoost;
    const claimsPrevented = Math.round(totalSeats * mentalHealthClaimsRate * totalClaimReduction);
    const workersCompSavings = claimsPrevented * avgClaimCost;
    
    const readinessImproved = Math.round(engaged * (readinessPercentage / 100));
    const readinessSavings = readinessImproved * 15000;
    
    const misconductCasesTotal = Math.round(org.personnel * 0.113);
    const stressRelatedCases = Math.round(misconductCasesTotal * 0.20);
    const alcoholRelatedCases = Math.round(org.personnel * 0.00178);
    const preventedStressCases = Math.round(stressRelatedCases * 0.15);
    const preventedAlcoholCases = Math.round(alcoholRelatedCases * 0.78 * 0.50);
    const totalPreventedDiscipline = preventedStressCases + preventedAlcoholCases;
    const avgDisciplineCost = 23500;
    const avgArrestCost = 103500;
    const disciplineSavings = (preventedStressCases * avgDisciplineCost) + (preventedAlcoholCases * avgArrestCost);
    
    const totalSavings = retentionSavings + workersCompSavings + readinessSavings + disciplineSavings;
    
    const leadPrice = getLeadPrice(leadSeats);
    const leadCost = leadSeats * leadPrice;
    const readyCost = readySeats * 150;
    const programCost = leadCost + readyCost;
    
    const netSavings = totalSavings - programCost;
    const roi = programCost > 0 ? ((netSavings / programCost) * 100).toFixed(0) : 0;
    
    const leadershipRetentionContribution = leadSeats > 0 ? Math.round(preventedSeparations * 0.40) : 0;
    const leadershipClaimContribution = leadSeats > 0 ? Math.round(claimsPrevented * (leadershipClaimBoost / totalClaimReduction)) : 0;
    
    return {
      engaged, expectedSeparations, preventedSeparations, retentionSavings, 
      claimsPrevented, workersCompSavings, readinessImproved, readinessSavings, 
      totalPreventedDiscipline, disciplineSavings,
      totalSavings, leadCost, readyCost, programCost, netSavings, roi,
      leadPrice, leadershipRetentionContribution, leadershipClaimContribution
    };
  }, [leadSeats, readySeats, engagementRate, retentionEffectiveness, selectedOrganization, readinessPercentage, use6MonthLead, leadershipCultureImprovement]);

  const fmt = (v) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(v);
  const fmtNum = (v) => new Intl.NumberFormat('en-US').format(v);

  const isOFO = selectedOrganization?.id === 'ofo' || selectedOrganization?.type === 'ofo-field';

  const performanceDrivers = [
    {key: 'mission', priority: "MISSION READINESS", drivers: "Decision-Making • Cognitive Agility • Performance", baseline: 45, growth: 62, improvement: missionReadinessImprovement, setImprovement: setMissionReadinessImprovement},
    {key: 'resilience', priority: "RESILIENCE & WELLNESS", drivers: "Burnout Prevention • Stress Management • Emotional Regulation", baseline: 47, growth: 62, improvement: resilienceImprovement, setImprovement: setResilienceImprovement, affectsWorkersComp: true},
    {key: 'career', priority: "CAREER COMMITMENT", drivers: "Purpose • Career Development • Work-Life Integration", baseline: 48, growth: 54, improvement: careerCommitmentImprovement, setImprovement: setCareerCommitmentImprovement},
    {key: 'leadership', priority: "LEADERSHIP", drivers: "Communication • Strategic Thinking • Empowerment", baseline: 50, growth: 56, improvement: leadershipImprovement, setImprovement: setLeadershipImprovement},
    {key: 'standards', priority: "PROFESSIONAL STANDARDS", drivers: "Ethics • Judgment • Professional Demeanor", baseline: 49, growth: 59, improvement: standardsImprovement, setImprovement: setStandardsImprovement},
    ...(leadSeats > 0 ? [{key: 'culture', priority: "LEADERSHIP CULTURE", drivers: "Supervisory Effectiveness • Trust Building • Command Climate", baseline: 42, growth: 58, improvement: leadershipCultureImprovement, setImprovement: setLeadershipCultureImprovement, requiresLead: true}] : [])
  ];

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    if (searchTerm) filtered = filtered.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const responses = {
      'How is the net savings calculated?': 'Net savings = Total Savings (Retention + Workers Comp + Discipline Prevention) - BetterUp Program Cost. We calculate all three pathways independently and sum them.',
      'Why is OFO facing a retirement crisis in 2028?': 'Officers hired in 2003-2008 have Law Enforcement 6(c) coverage, making them eligible for retirement at 25 years of service. This creates a massive wave of 2,220 eligible retirees starting in 2028.',
      'Explain the COA differences': 'COA 1 (Conservative) = 10-20% coverage, low engagement (55%), prove value. COA 2 (Moderate) = 15-25% coverage, realistic engagement (65%), balanced approach. COA 3 (Aggressive) = 33-40% coverage, high engagement (75%), maximum impact for 2028 crisis.',
      "What's the difference between Lead and Ready?": 'Lead ($5,785-$6,500) = unlimited 1:1 coaching for critical talent/leadership, drives culture transformation. Ready ($150) = AI coach + learning journeys for all personnel, builds resilience at scale.',
      'How does Leadership Culture affect ROI?': 'Leadership Culture (only available with Lead seats) contributes ~40% of retention gains and ~15-20% of workers comp reduction through psychological safety and supervisory effectiveness.'
    };
    const response = responses[chatInput] || `Great question about "${chatInput}". The ${selectedOrganization?.name || 'CBP'} model shows how BetterUp creates measurable value through three pathways based on Air Force proven results.`;
    setChatMessages([...chatMessages, {type: 'user', text: chatInput}, {type: 'assistant', text: response}]);
    setChatInput('');
  };
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
            Methodology Impact: Why episodic training loses—and continuous development wins
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
              <div style={{ fontSize: 13, color: '#155e75', fontWeight: 700, marginBottom: 6 }}>The Blue Line: Why DAF moved retention +6%</div>
              <ul style={{ margin: 0, paddingLeft: 16, color: '#0e7490', fontSize: 13, lineHeight: 1.6 }}>
                <li>Continuous, personalized practice + coaching compounds capability</li>
                <li>Just-in-time support during critical incidents & career choke points</li>
                <li>Transforms one-off training into ongoing learning journeys</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: '#475569' }}>
            <strong>Leadership takeaway:</strong> preserve institutional knowledge through continuous development now—don't wait until 2028 exits make it irrecoverable.
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 12, padding: 16 }}>
          <p style={{ margin: 0, fontSize: 14, color: '#92400e', lineHeight: 1.6 }}>
            CBP faces multiple retention challenges—including the 2028 retirement cliff, high operational tempo, leadership culture gaps, and career development barriers. <strong>The red line shows one contributing factor:</strong> episodic training that peaks and fades, failing to transfer institutional knowledge. <strong>The blue line shows BetterUp's approach:</strong> continuous development through coaching, AI support, and learning journeys that compound over time—helping address retention by building resilience, clarifying career paths, and developing leadership capability at critical decision points.
          </p>
        </div>

        <div style={{ marginTop: 10, fontSize: 11, color: '#64748b' }}>
          <strong>Sources:</strong> Ebbinghaus forgetting curve; spaced repetition research; BetterUp DAF outcomes (+6% retention); JAMA 2024 peer-reviewed burnout reduction.
        </div>
      </div>
    );
  };
  if (showExecutiveSummary) {
    return (
      <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
        <div style={{background: 'white', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', overflow: 'hidden', borderTop: '8px solid #0066cc'}}>
          
          <div style={{background: 'linear-gradient(135deg, #003d82 0%, #0066cc 100%)', padding: '48px', color: 'white'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
              <Shield size={64} color="#ffcc00" strokeWidth={2.5} />
              <div>
                <h1 style={{fontSize: '52px', fontWeight: 'bold', margin: '0 0 12px 0', lineHeight: 1.1}}>BetterUp CBP Leadership Dashboard</h1>
                <p style={{fontSize: '24px', color: '#ffcc00', margin: 0, fontWeight: 'bold'}}>Workers' Comp & Retention ROI Projections</p>
              </div>
            </div>
            <div style={{background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px', borderLeft: '5px solid #ffcc00'}}>
              <p style={{fontSize: '18px', lineHeight: 1.7, margin: '0 0 12px 0'}}>
                <strong style={{color: '#ffcc00'}}>Evidence-based ROI dashboard</strong> projecting the financial impact of precision resilience development—targeting the mindsets and behaviors that drive DHS/CBP strategic priorities: <strong>Mission Readiness, Officer Safety, Professional Standards, and Career Retention</strong>.
              </p>
              <p style={{fontSize: '16px', color: '#e0f2fe', margin: 0}}>
                Built on <strong style={{color: '#ffcc00'}}>4 years of proven Air Force results</strong> (77K+ sessions, 11K+ participants) and <strong>JAMA 2024 peer-reviewed research</strong> showing 22% reduction in mental health conditions.
              </p>
            </div>
          </div>

          <div style={{padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px'}}>
            
            <div>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#003d82', marginBottom: '24px', textAlign: 'center'}}>Air Force Proven Results (2021-2025)</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px'}}>
                {[
                  {label: 'DAF Members', value: '11,215'},
                  {label: 'Total Sessions', value: '77,333'},
                  {label: 'Hours Delivered', value: '54,377'},
                  {label: 'Satisfaction', value: '79%'}
                ].map((stat, i) => (
                  <div key={i} style={{background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)'}}>
                    <div style={{fontSize: '13px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px'}}>{stat.label}</div>
                    <div style={{fontSize: '36px', fontWeight: 'bold', color: 'white'}}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px'}}>
                {['+17% Mission Readiness', '+6% Career Commitment', '+15% Resilience'].map((result, i) => (
                  <div key={i} style={{background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '10px', padding: '20px', textAlign: 'center'}}>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a'}}>{result}</div>
                  </div>
                ))}
              </div>
              <div style={{textAlign: 'center'}}>
                <button 
                  onClick={() => setShowCommercialResults(!showCommercialResults)}
                  style={{background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,58,237,0.4)'}}
                >
                  {showCommercialResults ? '− Hide' : '+ Show'} Commercial Results
                </button>
              </div>
              
              {showCommercialResults && (
                <div style={{marginTop: '24px', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '3px solid #7c3aed', borderRadius: '16px', padding: '32px'}}>
                  <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', textAlign: 'center', marginBottom: '16px'}}>Enterprise & Federal Proven Results</h3>
                  <p style={{fontSize: '14px', color: '#7e22ce', textAlign: 'center', fontStyle: 'italic', marginBottom: '20px'}}>Aggregate outcomes (client-confidential)</p>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                    {[
                      {value: '+18%', label: 'Leadership Capability', sub: 'Avg enterprise clients'},
                      {value: '+22%', label: 'Manager Effectiveness', sub: '360° assessments'},
                      {value: '85%', label: 'Client Satisfaction', sub: 'Commercial & government'}
                    ].map((metric, i) => (
                      <div key={i} style={{background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '2px solid #a78bfa', boxShadow: '0 2px 8px rgba(124,58,237,0.2)'}}>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '8px'}}>{metric.value}</div>
                        <div style={{fontSize: '14px', fontWeight: 'bold', color: '#7e22ce', marginBottom: '4px'}}>{metric.label}</div>
                        <div style={{fontSize: '12px', color: '#9333ea'}}>{metric.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{background: '#dbeafe', border: '4px solid #3b82f6', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0}}>🎯</div>
                <div style={{flex: 1}}>
                  <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1e40af', margin: '0 0 12px 0'}}>What This Tool Provides: Projections for Decision Support</h2>
                  <p style={{fontSize: '16px', color: '#1e3a8a', margin: '0 0 16px 0', lineHeight: 1.6}}>
                    This dashboard generates <strong>financial projections</strong> based on proven Air Force outcomes and peer-reviewed research applied to CBP workers' comp claim rates, separation data, and training costs from government sources (GAO, DHS OIG, NTEU testimony). These are <strong>evidence-based forecasts</strong>, not guarantees.
                  </p>
                  <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #60a5fa'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Real Results Come After Implementation:</h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#1e3a8a'}}>
                      <div style={{display: 'flex', gap: '12px'}}>
                        <div style={{width: '24px', height: '24px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px', flexShrink: 0}}>1</div>
                        <div><strong>Action Layer:</strong> BetterUp's Human Transformation Platform delivers virtual, just-in-time resilience development through human expertise, behavioral assessments, personalized learning journeys, and an AI development partner—improving mindsets and behaviors driving retention and operational readiness</div>
                      </div>
                      <div style={{display: 'flex', gap: '12px'}}>
                        <div style={{width: '24px', height: '24px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px', flexShrink: 0}}>2</div>
                        <div><strong>Sensing Layer:</strong> Real-time people analytics dashboard aggregates anonymized data from pre/post assessments, Reflection Points, and engagement patterns—providing leadership measurable visibility into wellness, resilience, and retention trends</div>
                      </div>
                      <div style={{display: 'flex', gap: '12px'}}>
                        <div style={{width: '24px', height: '24px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '12px', flexShrink: 0}}>3</div>
                        <div><strong>Measured Outcomes:</strong> After implementation, your actual results replace these projections with data from your agents, officers, and command</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MethodologyImpactSection />

            <div style={{background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', border: '4px solid #6366f1', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>📚</div>
                <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#4338ca', margin: 0}}>How BetterUp Builds Mastery at CBP</h2>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px'}}>
                {[
                  {num: '1', title: 'REFLECT', desc: 'WPM assessment identifies strengths & gaps', icon: '🪞', color: '#6366f1'},
                  {num: '2', title: 'LEARN', desc: 'Personalized journeys + curated resources', icon: '📖', color: '#8b5cf6'},
                  {num: '3', title: 'PRACTICE', desc: 'AI role-play + coaching rehearsal', icon: '🎯', color: '#a78bfa'},
                  {num: '4', title: 'COMMIT', desc: 'Action plans at critical moments', icon: '✅', color: '#c4b5fd'},
                  {num: '5', title: 'MEASURE', desc: 'Pre-post growth assessments', icon: '📊', color: '#ddd6fe'}
                ].map((step, i) => (
                  <div key={i} style={{background: 'white', borderRadius: '12px', padding: '16px', border: `2px solid ${step.color}`, textAlign: 'center'}}>
                    <div style={{fontSize: '28px', marginBottom: '8px'}}>{step.icon}</div>
                    <div style={{fontSize: '11px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px'}}>{step.num}. {step.title}</div>
                    <div style={{fontSize: '10px', color: '#64748b', lineHeight: 1.4}}>{step.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #818cf8'}}>
                <h3 style={{fontSize: '16px', fontWeight: 'bold', color: '#4338ca', marginBottom: '12px'}}>Applied to CBP Operational Challenges:</h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#475569'}}>
                  <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                    <strong style={{color: '#4338ca'}}>Use-of-Force Decisions:</strong> Practice high-pressure scenarios through AI role-play before real encounters
                  </div>
                  <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                    <strong style={{color: '#4338ca'}}>De-escalation:</strong> Rehearse communication strategies for volatile public interactions
                  </div>
                  <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                    <strong style={{color: '#4338ca'}}>Post-Incident Recovery:</strong> Just-in-time stress management after traumatic events
                  </div>
                  <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                    <strong style={{color: '#4338ca'}}>Career Decisions:</strong> Clarity at critical 3-5yr, 10-15yr, pre-2028 retirement points
                  </div>
                </div>
              </div>

              <div style={{background: '#c7d2fe', borderRadius: '12px', padding: '16px', marginTop: '16px', border: '2px solid #818cf8'}}>
                <p style={{fontSize: '13px', color: '#3730a3', margin: 0, lineHeight: 1.6}}>
                  <strong style={{color: '#4338ca'}}>From Air Force Weapons School:</strong> This mastery framework helped elite pilots strengthen decision-making under pressure, cognitive agility, and stress regulation—the same skills CBP officers and agents need for high-stakes law enforcement.
                </p>
              </div>
            </div>

            <div style={{background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '4px solid #10b981', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <div style={{width: '48px', height: '48px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>🗺️</div>
                <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#065f46', margin: 0}}>Proposed Implementation: Phased Rollout Strategy</h2>
              </div>
              
              <p style={{fontSize: '15px', color: '#047857', marginBottom: '20px', lineHeight: 1.6}}>
                Based on Air Force Weapons School deployment experience—start with high-impact pilot, validate results, then scale across CBP enterprise:
              </p>

              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #34d399'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{width: '40px', height: '40px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: 'bold'}}>1</div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', margin: 0}}>Phase 1: Pilot (3-6 months)</h3>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#064e3b'}}>
                    <div>
                      <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Target Population:</div>
                      <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                        <li>Border Patrol Academy (new agents)</li>
                        <li>Single OFO field office (e.g., Tucson, NY)</li>
                        <li>~500-1,000 seats</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Goals:</div>
                      <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                        <li>Validate ROI model with actual data</li>
                        <li>Establish baseline metrics</li>
                        <li>Build champion network</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #34d399'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{width: '40px', height: '40px', background: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: 'bold'}}>2</div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', margin: 0}}>Phase 2: Targeted Expansion (6-12 months)</h3>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#064e3b'}}>
                    <div>
                      <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Target Population:</div>
                      <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                        <li>OFO field offices facing 2028 retirement</li>
                        <li>High-tempo USBP sectors</li>
                        <li>~5,000-10,000 seats</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Goals:</div>
                      <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                        <li>Demonstrate retention impact pre-2028</li>
                        <li>Reduce workers' comp claims</li>
                        <li>Scale proven pilot model</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #34d399'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{width: '40px', height: '40px', background: '#047857', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: 'bold'}}>3</div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', margin: 0}}>Phase 3: Enterprise (12+ months)</h3>
                  </div>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#064e3b'}}>
                    <div>
                      <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Target Population:</div>
                      <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                        <li>All CBP components nationwide</li>
                        <li>OFO, USBP, AMO, OT, OPR</li>
                        <li>20,000+ seats enterprise-wide</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Goals:</div>
                      <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                        <li>Full integration with CBPX programs</li>
                        <li>Maximum institutional knowledge preservation</li>
                        <li>Enterprise-wide resilience infrastructure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{background: '#d1fae5', borderRadius: '10px', padding: '16px', marginTop: '16px', border: '2px solid #34d399'}}>
                <p style={{fontSize: '13px', color: '#065f46', margin: 0, lineHeight: 1.6}}>
                  <strong>Air Force Precedent:</strong> DAF started with pilot programs before expanding enterprise-wide. Weapons School demonstrated mastery framework with elite students before broader rollout. Same phased approach de-risks CBP investment while building internal champions.
                </p>
              </div>
            </div>

            <div style={{background: '#fef3c7', border: '4px solid #f59e0b', borderRadius: '16px', padding: '32px'}}>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#78350f', marginBottom: '24px'}}>How the Model Works: Triple-Pathway Impact</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #78716c'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{width: '48px', height: '48px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>1</div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1c1917', margin: 0}}>Workers' Comp Reduction</h3>
                  </div>
                  <p style={{fontSize: '14px', color: '#44403c', marginBottom: '12px', lineHeight: 1.6}}>
                    BetterUp builds resilience to prevent mental health claims (PTSD, depression, anxiety, SUD).
                  </p>
                  <div style={{background: '#fee2e2', borderRadius: '10px', padding: '12px'}}>
                    <div style={{fontSize: '13px', color: '#991b1b', marginBottom: '4px'}}><strong>22% reduction</strong> in mental health claims</div>
                    <div style={{fontSize: '11px', color: '#7f1d1d', fontStyle: 'italic'}}>Source: JAMA 2024</div>
                  </div>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #78716c'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{width: '48px', height: '48px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>2</div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1c1917', margin: 0}}>Retention Economics</h3>
                  </div>
                  <p style={{fontSize: '14px', color: '#44403c', marginBottom: '12px', lineHeight: 1.6}}>
                    Career clarity and leadership culture at critical decision points (3-5yrs, pre-2028).
                  </p>
                  <div style={{background: '#fed7aa', borderRadius: '10px', padding: '12px'}}>
                    <div style={{fontSize: '13px', color: '#92400e', marginBottom: '4px'}}><strong>$87K-$150K</strong> saved per prevented separation</div>
                    <div style={{fontSize: '11px', color: '#78350f', fontStyle: 'italic'}}>Source: GAO-24-107029</div>
                  </div>
                </div>

                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #78716c'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{width: '48px', height: '48px', background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>3</div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1c1917', margin: 0}}>Discipline Prevention</h3>
                  </div>
                  <p style={{fontSize: '14px', color: '#44403c', marginBottom: '12px', lineHeight: 1.6}}>
                    Early intervention prevents stress-related misconduct and alcohol incidents.
                  </p>
                  <div style={{background: '#f3e8ff', borderRadius: '10px', padding: '12px'}}>
                    <div style={{fontSize: '13px', color: '#6b21a8', marginBottom: '4px'}}><strong>245 cases</strong> prevented annually</div>
                    <div style={{fontSize: '11px', color: '#7e22ce', fontStyle: 'italic'}}>Source: EAP research + CBP data</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#003d82', marginBottom: '24px', textAlign: 'center'}}>Performance Drivers Aligned to CBP Strategic Priorities</h2>
              <p style={{textAlign: 'center', color: '#64748b', marginBottom: '20px', fontSize: '15px'}}>BetterUp targets the behavioral foundations that drive DHS and CBP mission success</p>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px'}}>
                {[
                  {title: 'MISSION READINESS', sub: 'Rapid Decision-Making, Cognitive Agility, Sustained Performance'},
                  {title: 'RESILIENCE', sub: 'Burnout Prevention, Stress Management, Emotional Regulation'},
                  {title: 'CAREER COMMITMENT', sub: 'Purpose & Meaning, Career Development, Work-Life Integration'},
                  {title: 'LEADERSHIP', sub: 'Communication, Strategic Thinking, Supervisory Effectiveness'},
                  {title: 'STANDARDS', sub: 'Ethical Decision-Making, Professional Demeanor, Sound Judgment'}
                ].map((priority, i) => (
                  <div key={i} style={{background: '#dbeafe', padding: '16px', border: '2px solid #60a5fa', borderRadius: '12px', textAlign: 'center'}}>
                    <div style={{fontSize: '13px', fontWeight: 'bold', color: '#003d82', marginBottom: '8px'}}>{priority.title}</div>
                    <div style={{fontSize: '11px', color: '#64748b'}}>{priority.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center'}}>
              <h2 style={{fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '16px'}}>Ready to See Your Component's Projected Impact?</h2>
              <p style={{fontSize: '18px', color: '#cbd5e1', marginBottom: '32px'}}>
                Select your CBP component, sector, or field office to model ROI with adjustable parameters
              </p>
              <button 
                onClick={() => {setShowExecutiveSummary(false); setShowLanding(true);}}
                style={{background: '#ffcc00', color: '#003d82', border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,204,0,0.5)', transition: 'transform 0.2s'}}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Select Your Component →
              </button>
              <p style={{fontSize: '13px', color: '#94a3b8', marginTop: '16px'}}>All data sources documented | Every assumption adjustable | Transparent methodology</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
  if (showLanding) {
    return (
      <div style={{width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
        <button onClick={() => {setShowExecutiveSummary(true); setShowLanding(false);}} style={{marginBottom: '16px', color: '#666', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px', fontWeight: '600'}}>
          ← Back to Executive Summary
        </button>
        <div style={{background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', borderTop: '4px solid #0066cc'}}>
          <div style={{background: '#003d82', color: 'white', padding: '32px'}}>
            <h1 style={{fontSize: '36px', fontWeight: 'bold', margin: 0}}>Select Your CBP Component</h1>
            <p style={{fontSize: '16px', color: '#cbd5e1', marginTop: '8px'}}>Choose your organization to see customized ROI projections</p>
          </div>
          <div style={{padding: '32px'}}>
            <input 
              type="text" 
              placeholder="Search organizations..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '24px', fontSize: '16px'}}
            />
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {filteredOrganizations.map((org) => (
                <div 
                  key={org.id} 
                  style={{
                    background: 'white', 
                    border: org.highlight ? '3px solid #f59e0b' : '2px solid #e5e7eb', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }} 
                  onMouseOver={(e) => e.currentTarget.style.background = '#eff6ff'} 
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 'bold', fontSize: '20px', color: '#003d82', marginBottom: '6px'}}>{org.name}</div>
                    <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>{org.description}</div>
                    <div style={{fontSize: '13px', color: '#999'}}>{fmtNum(org.personnel)} personnel • {org.location}</div>
                    {org.id === 'ofo' && (
                      <div style={{fontSize: '13px', color: '#dc2626', fontWeight: 'bold', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <span>⚠️</span> 2,220 officers retiring 2028 (400% increase)
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => selectOrganization(org)} 
                    style={{
                      background: '#0066cc', 
                      color: 'white', 
                      border: 'none', 
                      padding: '12px 28px', 
                      borderRadius: '8px', 
                      fontWeight: 'bold', 
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#0052a3'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#0066cc'}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '24px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
      <button onClick={() => setShowLanding(true)} style={{marginBottom: '16px', color: '#0066cc', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline', fontSize: '14px'}}>
        ← Change Component
      </button>

      <div style={{background: '#003d82', color: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', padding: '24px', marginBottom: '24px', borderTop: '4px solid #ffcc00'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
          <Shield size={40} color="#ffcc00" />
          <h1 style={{fontSize: '28px', fontWeight: 'bold', margin: 0}}>{selectedOrganization?.name || 'CBP'} - Workers' Comp & Retention Dashboard</h1>
        </div>
        <p style={{fontSize: '14px', color: '#cbd5e1', margin: 0}}>{selectedOrganization?.location} ({fmtNum(totalPersonnel)} personnel)</p>
      </div>

      <div style={{marginBottom: '16px', display: 'flex', gap: '8px'}}>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          style={{
            padding: '12px 24px', 
            fontWeight: '600', 
            borderRadius: '8px', 
            border: activeTab === 'dashboard' ? 'none' : '2px solid #e5e7eb', 
            background: activeTab === 'dashboard' ? '#0066cc' : 'white', 
            color: activeTab === 'dashboard' ? 'white' : '#003d82', 
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('details')} 
          style={{
            padding: '12px 24px', 
            fontWeight: '600', 
            borderRadius: '8px', 
            border: activeTab === 'details' ? 'none' : '2px solid #e5e7eb', 
            background: activeTab === 'details' ? '#0066cc' : 'white', 
            color: activeTab === 'details' ? 'white' : '#003d82', 
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          Model Details
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{background: '#003d82', color: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
              <div>
                <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '8px'}}>Total Seats: {fmtNum(leadSeats + readySeats)}</div>
                <div style={{fontSize: '14px'}}>Lead: {fmtNum(leadSeats)} • Ready: {fmtNum(readySeats)}</div>
                <div style={{fontSize: '14px', opacity: 0.9, marginTop: '4px'}}>Engagement: {engagementRate}% | Population: {fmtNum(totalPersonnel)}</div>
              </div>
              <button 
                onClick={() => setShowImpact(!showImpact)} 
                style={{
                  background: '#ffcc00', 
                  color: '#003d82', 
                  border: 'none', 
                  padding: '12px 32px', 
                  borderRadius: '8px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer'
                }}
              >
                {showImpact ? 'Hide Impact' : 'Show Impact →'}
              </button>
            </div>
          </div>
          {showImpact && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', border: '2px solid #94a3b8', borderRadius: '12px', padding: '24px'}}>
                <p style={{fontSize: '18px', color: '#334155'}}>
                  BetterUp saves {selectedOrganization?.name || 'CBP'} <strong style={{color: '#059669', fontSize: '24px'}}>{fmt(calculations.netSavings)}</strong> annually—preventing <strong>{fmtNum(calculations.preventedSeparations)} separations</strong>, <strong>{fmtNum(calculations.claimsPrevented)} mental health claims</strong>, and <strong>{fmtNum(calculations.totalPreventedDiscipline)} discipline incidents</strong>.
                </p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                <div style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', border: '3px solid #64748b', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                  <div style={{fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: '600'}}>Net savings</div>
                  <div style={{fontSize: '40px', fontWeight: 'bold', color: '#059669'}}>{fmt(calculations.netSavings)}</div>
                  <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>After program cost</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '4px solid #0066cc', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,102,204,0.2)'}}>
                  <div style={{fontSize: '12px', color: '#1e40af', marginBottom: '8px', fontWeight: '600'}}>ROI multiplier</div>
                  <div style={{fontSize: '40px', fontWeight: 'bold', color: '#1e3a8a'}}>{(parseFloat(calculations.roi) / 100 + 1).toFixed(1)}×</div>
                  <div style={{fontSize: '12px', color: '#1e40af', marginTop: '4px'}}>Return +{calculations.roi}%</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', border: '3px solid #64748b', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                  <div style={{fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: '600'}}>Personnel impacted</div>
                  <div style={{fontSize: '40px', fontWeight: 'bold', color: '#475569'}}>{fmtNum(calculations.preventedSeparations + calculations.readinessImproved)}</div>
                  <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>Retention & readiness</div>
                </div>
              </div>

              {isOFO && (
                <div style={{background: '#fffbeb', border: '4px solid #f59e0b', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(245,158,11,0.2)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <div style={{width: '40px', height: '40px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>⚠️</div>
                    <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#92400e', margin: 0}}>2028 OFO Retirement Crisis</h3>
                  </div>
                  <p style={{fontSize: '16px', color: '#92400e', margin: 0}}>
                    <strong>2,220 CBP Officers</strong> projected to retire in 2028—a <strong>400% increase</strong> over normal ~500/year. Officers hired after July 6, 2008 received enhanced retirement coverage, creating a concentrated retirement wave.
                  </p>
                </div>
              )}

              <div style={{background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '3px solid #a855f7', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(168,85,247,0.2)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                  <div style={{width: '40px', height: '40px', background: '#a855f7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>💼</div>
                  <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#6b21a8', margin: 0}}>Product Mix & Investment</h3>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
                  <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #c084fc'}}>
                    <div style={{fontSize: '12px', color: '#7e22ce', marginBottom: '8px', fontWeight: '600'}}>BetterUp Lead</div>
                    <div style={{fontSize: '28px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '4px'}}>{fmtNum(leadSeats)}</div>
                    <div style={{fontSize: '11px', color: '#9333ea', marginBottom: '8px'}}>Critical talent • Leadership</div>
                    <div style={{fontSize: '13px', fontWeight: 'bold', color: '#6b21a8'}}>{fmt(calculations.leadCost)}</div>
                    <div style={{fontSize: '10px', color: '#9333ea', marginTop: '2px'}}>@ {fmt(calculations.leadPrice)}/seat</div>
                  </div>
                  <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #c084fc'}}>
                    <div style={{fontSize: '12px', color: '#7e22ce', marginBottom: '8px', fontWeight: '600'}}>BetterUp Ready</div>
                    <div style={{fontSize: '28px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '4px'}}>{fmtNum(readySeats)}</div>
                    <div style={{fontSize: '11px', color: '#9333ea', marginBottom: '8px'}}>All personnel • Resilience</div>
                    <div style={{fontSize: '13px', fontWeight: 'bold', color: '#6b21a8'}}>{fmt(calculations.readyCost)}</div>
                    <div style={{fontSize: '10px', color: '#9333ea', marginTop: '2px'}}>@ $150/seat</div>
                  </div>
                  <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #c084fc'}}>
                    <div style={{fontSize: '12px', color: '#7e22ce', marginBottom: '8px', fontWeight: '600'}}>Total Program</div>
                    <div style={{fontSize: '28px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '4px'}}>{fmtNum(leadSeats + readySeats)}</div>
                    <div style={{fontSize: '11px', color: '#9333ea', marginBottom: '8px'}}>Combined investment</div>
                    <div style={{fontSize: '13px', fontWeight: 'bold', color: '#6b21a8'}}>{fmt(calculations.programCost)}</div>
                    <div style={{fontSize: '10px', color: '#9333ea', marginTop: '2px'}}>Annual cost</div>
                  </div>
                </div>
              </div>

              {leadSeats > 0 && (
                <div style={{background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)', border: '3px solid #eab308', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(234,179,8,0.2)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{width: '40px', height: '40px', background: '#eab308', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>👥</div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#713f12', margin: 0}}>Leadership Culture Transformation Impact</h3>
                  </div>
                  <p style={{fontSize: '14px', color: '#854d0e', marginBottom: '16px', lineHeight: 1.6}}>
                    <strong>{fmtNum(leadSeats)} Lead seats</strong> deployed to develop command climate and address supervisory effectiveness gaps. Lead's unlimited 1:1 coaching builds trust, communication skills, and transformational leadership capabilities—moving from command-and-control to developmental leadership.
                  </p>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                    <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #fbbf24'}}>
                      <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>Retention Contribution</div>
                      <div style={{fontSize: '24px', fontWeight: 'bold', color: '#713f12', marginBottom: '4px'}}>{fmtNum(calculations.leadershipRetentionContribution)}</div>
                      <div style={{fontSize: '12px', color: '#854d0e'}}>separations prevented by better leadership (~40% of total retention gains)</div>
                    </div>
                    <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #fbbf24'}}>
                      <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>Workers' Comp Contribution</div>
                      <div style={{fontSize: '24px', fontWeight: 'bold', color: '#713f12', marginBottom: '4px'}}>{fmtNum(calculations.leadershipClaimContribution)}</div>
                      <div style={{fontSize: '12px', color: '#854d0e'}}>claims prevented through psychological safety (~{Math.round((calculations.leadershipClaimContribution / calculations.claimsPrevented) * 100)}% of total)</div>
                    </div>
                  </div>
                  <div style={{background: '#fffbeb', borderRadius: '8px', padding: '12px', marginTop: '12px', border: '1px solid #fbbf24'}}>
                    <p style={{fontSize: '12px', color: '#78350f', margin: 0}}>
                      <strong>Why This Matters:</strong> Federal Employee Viewpoint Survey data and GAO reports consistently identify leadership quality as a primary driver of federal law enforcement retention. Lead coaching transforms supervisory approaches, directly addressing the root cause of voluntary separations by creating psychologically safe environments where officers feel supported rather than micromanaged.
                    </p>
                  </div>
                </div>
              )}

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                <div style={{background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{background: '#003d82', color: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>Retention Economics</h3>
                    <p style={{fontSize: '12px', color: '#ffcc00', margin: '4px 0 0 0'}}>Preventing costly separations</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <span style={{fontSize: '14px'}}>Savings</span>
                    <span style={{fontSize: '32px', fontWeight: 'bold', color: '#003d82'}}>{fmt(calculations.retentionSavings)}</span>
                  </div>
                  <div style={{background: 'white', border: '2px solid #cbd5e1', borderRadius: '8px', padding: '12px', fontSize: '14px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Expected separations:</span><span style={{fontWeight: '600'}}>{fmtNum(calculations.expectedSeparations)}</span></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Prevented:</span><span style={{fontWeight: '600', color: '#003d82'}}>{fmtNum(calculations.preventedSeparations)}</span></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Effectiveness:</span><span style={{fontWeight: '600', color: '#0066cc'}}>{retentionEffectiveness}%</span></div>
                    {leadSeats > 0 && <div style={{fontSize: '11px', color: '#eab308', fontWeight: '600', marginTop: '8px'}}>💼 +{Math.round((calculations.leadershipRetentionContribution / calculations.preventedSeparations) * 100)}% from Lead culture impact</div>}
                  </div>
                </div>

                <div style={{background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{background: '#003d82', color: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>Workers' Comp Reduction</h3>
                    <p style={{fontSize: '12px', color: '#ffcc00', margin: '4px 0 0 0'}}>Mental health claims only</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <span style={{fontSize: '14px'}}>Savings</span>
                    <span style={{fontSize: '32px', fontWeight: 'bold', color: '#003d82'}}>{fmt(calculations.workersCompSavings)}</span>
                  </div>
                  <div style={{background: 'white', border: '2px solid #cbd5e1', borderRadius: '8px', padding: '12px', fontSize: '14px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Claims prevented:</span><span style={{fontWeight: '600'}}>{fmtNum(calculations.claimsPrevented)}</span></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Avg claim cost:</span><span style={{fontWeight: '600'}}>$65,000</span></div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: '#64748b'}}>Base prevention:</span><span style={{fontWeight: '600', color: '#0066cc'}}>22%</span></div>
                    {leadSeats > 0 && <div style={{fontSize: '11px', color: '#eab308', fontWeight: '600', marginTop: '8px'}}>💼 +{Math.round((calculations.leadershipClaimContribution / calculations.claimsPrevented) * 100)}% from Lead psych safety</div>}
                  </div>
                </div>

                <div style={{background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{background: '#003d82', color: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>Discipline Prevention</h3>
                    <p style={{fontSize: '12px', color: '#ffcc00', margin: '4px 0 0 0'}}>Stress & alcohol incidents</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                    <span style={{fontSize: '14px'}}>Savings</span>
                    <span style={{fontSize: '32px', fontWeight: 'bold', color: '#003d82'}}>{fmt(calculations.disciplineSavings)}</span>
                  </div>
                  <div style={{background: 'white', border: '2px solid #cbd5e1', borderRadius: '8px', padding: '12px', fontSize: '14px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Cases prevented:</span><span style={{fontWeight: '600'}}>{fmtNum(calculations.totalPreventedDiscipline)}</span></div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}><span style={{color: '#64748b'}}>Avg case cost:</span><span style={{fontWeight: '600'}}>$23,500</span></div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: '#64748b'}}>Prevention rate:</span><span style={{fontWeight: '600', color: '#0066cc'}}>15-78%</span></div>
                  </div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #003d82'}}>
                <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>Performance Drivers</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {performanceDrivers.map(d => (
                    <div key={d.key} style={{border: '2px solid #dbeafe', borderRadius: '12px', padding: '20px', background: d.requiresLead ? '#fef3c7' : '#eff6ff'}}>
                      <div style={{marginBottom: '12px'}}>
                        <h4 style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#003d82'}}>{d.priority}</h4>
                        <p style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>{d.drivers}</p>
                        {d.affectsWorkersComp && <p style={{fontSize: '11px', color: '#dc2626', fontWeight: '600'}}>🎯 Directly reduces workers' comp claims</p>}
                        {d.requiresLead && <p style={{fontSize: '11px', color: '#eab308', fontWeight: '600'}}>💼 Requires Lead deployment • Impacts retention + claims</p>}
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                        <div style={{width: '48px', height: '48px', background: d.requiresLead ? '#eab308' : '#1e40af', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(30,64,175,0.3)'}}>{d.baseline}</div>
                        <div style={{flex: 1, height: '40px', position: 'relative'}}>
                          <div style={{position: 'absolute', width: '100%', height: '40px', background: '#93c5fd', borderRadius: '20px'}}></div>
                          <div style={{position: 'absolute', height: '40px', background: d.requiresLead ? '#eab308' : '#1e40af', borderRadius: '20px', width: `${(d.growth / 70) * 100}%`}}></div>
                        </div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#003d82'}}>+{d.improvement}%</div>
                      </div>
                      <div>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px'}}>Adjust Priority: +{d.improvement}%</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="30" 
                          value={d.improvement} 
                          onChange={(e) => d.setImprovement(Number(e.target.value))} 
                          style={{width: '100%', height: '8px', accentColor: d.requiresLead ? '#eab308' : '#0066cc'}}
                        />
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px'}}>
                          <span>0% (Low)</span>
                          <span>15% (Medium)</span>
                          <span>30% (High)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #003d82'}}>
                <div style={{background: '#003d82', color: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Calculator size={20} color="#ffcc00" />
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>Course of Action (COA) Selection</h3>
                </div>
                <p style={{fontSize: '13px', color: '#64748b', marginBottom: '16px'}}>Select a COA to auto-configure seat mix, engagement assumptions, and performance priorities:</p>
                <div style={{display: 'flex', gap: '12px', marginBottom: '20px'}}>
                  <button 
                    onClick={() => applyCOA(1)} 
                    style={{flex: 1, padding: '16px', background: '#d1d5db', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px'}}
                  >
                    <div style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>COA 1</div>
                    <div style={{fontSize: '11px', color: '#64748b'}}>Conservative • Prove Value</div>
                  </button>
                  <button 
                    onClick={() => applyCOA(2)} 
                    style={{flex: 1, padding: '16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px'}}
                  >
                    <div style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>COA 2</div>
                    <div style={{fontSize: '11px', opacity: 0.9}}>Moderate • Balanced</div>
                  </button>
                  <button 
                    onClick={() => applyCOA(3)} 
                    style={{flex: 1, padding: '16px', background: '#003d82', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px'}}
                  >
                    <div style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>COA 3</div>
                    <div style={{fontSize: '11px', opacity: 0.9}}>Aggressive • Max Impact</div>
                  </button>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Lead Seats: {fmtNum(leadSeats)}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      step="50" 
                      value={leadSeats} 
                      onChange={(e) => {
                        const newLead = Number(e.target.value); 
                        setLeadSeats(newLead); 
                        setReadySeats(Math.max(0, (leadSeats + readySeats) - newLead)); 
                        if (newLead === 0) setLeadershipCultureImprovement(0);
                      }} 
                      style={{width: '100%', height: '8px', accentColor: '#a855f7'}}
                    />
                    <div style={{fontSize: '11px', color: '#64748b', marginTop: '4px'}}>Critical talent • {fmt(calculations.leadPrice)}/seat</div>
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Ready Seats: {fmtNum(readySeats)}</label>
                    <input 
                      type="range" 
                      min="1000" 
                      max="30000" 
                      step="100" 
                      value={readySeats} 
                      onChange={(e) => setReadySeats(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#0066cc'}}
                    />
                    <div style={{fontSize: '11px', color: '#64748b', marginTop: '4px'}}>All personnel • $150/seat</div>
                  </div>
                </div>

                <div style={{marginTop: '12px'}}>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Engagement: {engagementRate}%</label>
                  <input 
                    type="range" 
                    min="40" 
                    max="90" 
                    value={engagementRate} 
                    onChange={(e) => setEngagementRate(Number(e.target.value))} 
                    style={{width: '100%', height: '8px', accentColor: '#0066cc'}}
                  />
                  <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>{fmtNum(calculations.engaged)} engaged personnel</div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #003d82'}}>
                <div style={{background: '#003d82', color: 'white', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Settings size={20} color="#ffcc00" />
                  <h4 style={{fontSize: '16px', fontWeight: '600', margin: 0}}>Advanced Settings</h4>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  
                  <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '16px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                      <label style={{fontSize: '14px', fontWeight: '600'}}>Lead Duration: {use6MonthLead ? '6 months' : '12 months'}</label>
                      <button
                        onClick={() => setUse6MonthLead(!use6MonthLead)}
                        style={{padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', border: 'none', cursor: 'pointer', background: use6MonthLead ? '#a855f7' : '#e5e7eb', color: use6MonthLead ? 'white' : '#374151'}}
                      >
                        {use6MonthLead ? '6-Month' : '12-Month'}
                      </button>
                    </div>
                    <p style={{fontSize: '11px', color: '#64748b', background: '#f9fafb', padding: '8px', borderRadius: '4px'}}>
                      {use6MonthLead ? '6-month recommended for pilots & transitions. Current price: ' + fmt(calculations.leadPrice) : '12-month recommended for leadership transformation. Current price: ' + fmt(calculations.leadPrice)}
                    </p>
                  </div>

                  <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '16px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
                      <label style={{fontSize: '14px', fontWeight: '600'}}>Retention Effectiveness: {retentionEffectiveness}%</label>
                      <button
                        onClick={() => {
                          setManualRetentionOverride(!manualRetentionOverride);
                          if (!manualRetentionOverride) setManualRetentionValue(retentionEffectiveness);
                        }}
                        style={{padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', border: 'none', cursor: 'pointer', background: manualRetentionOverride ? '#f59e0b' : '#e5e7eb', color: manualRetentionOverride ? 'white' : '#374151'}}
                      >
                        {manualRetentionOverride ? '🔓 Manual ON' : '🔒 Auto-Calculate'}
                      </button>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="35" 
                      value={manualRetentionOverride ? manualRetentionValue : retentionEffectiveness}
                      onChange={(e) => {if (manualRetentionOverride) setManualRetentionValue(Number(e.target.value));}}
                      style={{width: '100%', height: '8px', accentColor: '#0066cc', cursor: manualRetentionOverride ? 'pointer' : 'not-allowed', opacity: manualRetentionOverride ? 1 : 0.5}}
                    />
                    {manualRetentionOverride ? (
                      <p style={{fontSize: '11px', color: '#92400e', marginTop: '8px', fontWeight: '500', background: '#fffbeb', padding: '8px', borderRadius: '4px', border: '1px solid #fbbf24'}}>⚠️ Manual override active - drag slider to test rates</p>
                    ) : (
                      <p style={{fontSize: '11px', color: '#1e40af', marginTop: '8px', fontWeight: '500', background: '#eff6ff', padding: '8px', borderRadius: '4px', border: '1px solid #60a5fa'}}>⚡ Auto-calculated from Career + Leadership + Culture ({leadSeats > 0 ? 'with Lead boost' : 'Ready only'})</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === 'details' && (
        <div style={{background: 'white', borderRadius: '12px', padding: '24px'}}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#003d82'}}>Model Details & Measurement Strategy</h2>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            <div style={{border: '3px solid #0066cc', borderRadius: '12px', padding: '24px', background: '#eff6ff'}}>
              <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#003d82'}}>📊 Proposed Metrics for CBP Implementation</h3>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
                <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #60a5fa'}}>
                  <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Individual Level</h4>
                  <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: 1.7}}>
                    <li><strong>Whole Person Model 3.0:</strong> Pre-post assessments</li>
                    <li><strong>Decision-Making:</strong> Problem solving, strategic thinking</li>
                    <li><strong>Stress Management:</strong> Emotional regulation, recovery</li>
                    <li><strong>Resilience:</strong> Optimism, self-compassion</li>
                    <li><strong>Career Commitment:</strong> Purpose clarity, growth mindset</li>
                  </ul>
                </div>
                
                <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #60a5fa'}}>
                  <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Sector/Field Office Level</h4>
                  <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: 1.7}}>
                    <li><strong>Team Cohesion:</strong> Anonymized unit trends</li>
                    <li><strong>Leadership Climate:</strong> Communication, trust patterns</li>
                    <li><strong>Morale Indicators:</strong> Engagement, satisfaction</li>
                    <li><strong>Reflection Points:</strong> Real-time wellness check-ins</li>
                  </ul>
                </div>
                
                <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #60a5fa'}}>
                  <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Organizational Level</h4>
                  <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: 1.7}}>
                    <li><strong>Retention Rates:</strong> Compared to baseline projections</li>
                    <li><strong>Workers' Comp Claims:</strong> Mental health claim trends</li>
                    <li><strong>Readiness Metrics:</strong> Performance capacity trends</li>
                    <li><strong>ROI Tracking:</strong> Actual vs. projected savings</li>
                  </ul>
                </div>
              </div>

              <div style={{background: '#dbeafe', borderRadius: '10px', padding: '16px', marginTop: '12px', border: '2px solid #3b82f6'}}>
                <p style={{fontSize: '13px', color: '#1e40af', margin: 0}}>
                  <strong>From Air Force Experience:</strong> BetterUp provides real-time People Analytics Dashboard showing engagement, satisfaction, and behavioral growth—replacing projections with actual measured outcomes from your personnel.
                </p>
              </div>
            </div>

            <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px'}}>
              <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#003d82'}}>Model Assumptions</h4>
              <div style={{fontSize: '14px', color: '#475569', lineHeight: 1.8}}>
                <div style={{marginBottom: '8px'}}><strong>Attrition Rates:</strong> OFO {selectedOrganization?.attritionRate || 6.3}% annually | USBP 4.2% annually</div>
                {isOFO && <div style={{fontSize: '14px', color: '#dc2626', fontWeight: 'bold', marginBottom: '8px'}}>⚠️ 2028 OFO: 2,220 officers retiring (400% increase over normal ~500/year)</div>}
                <div style={{marginBottom: '8px'}}><strong>Replacement Cost:</strong> OFO $150K | USBP $150K per separation</div>
                <div style={{marginBottom: '8px'}}><strong>Workers' Comp:</strong> $65,000 avg mental health claim cost (35% of total claims)</div>
                <div style={{marginBottom: '8px'}}><strong>Discipline Cases:</strong> 11.3% of workforce annually, 20% stress-related, 1.78% alcohol-related</div>
                <div style={{marginBottom: '8px'}}><strong>Base Prevention Rate:</strong> 22% workers' comp (JAMA 2024) + Leadership boost when Lead deployed</div>
                <div style={{marginBottom: '8px'}}><strong>Discipline Prevention:</strong> 15% stress cases, 78% alcohol cases (EAP research)</div>
                <div style={{marginBottom: '8px'}}><strong>Lead Pricing:</strong> Volume-discounted ({use6MonthLead ? '6-month' : '12-month'} term) - ${fmt(calculations.leadPrice)}/seat</div>
                <div><strong>Ready Pricing:</strong> $150/seat (12 months)</div>
              </div>
            </div>

            <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px'}}>
              <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#003d82'}}>Data Sources</h4>
              <div style={{fontSize: '12px', color: '#64748b', lineHeight: 1.8}}>
                • <strong>GAO-24-107029:</strong> CBP Recruitment & Retention challenges, replacement costs<br/>
                • <strong>JAMA 2024:</strong> 21.6% reduction in burnout & mental health conditions<br/>
                • <strong>DHS OIG Reports:</strong> Workers' comp claim data, discipline case volumes<br/>
                • <strong>CuraLinc EAP 2022:</strong> 67% alcohol misuse severity reduction, 78% at-risk elimination<br/>
                • <strong>HeartMath Police Study:</strong> 40% stress reduction, improved decision-making<br/>
                • <strong>Ebbinghaus forgetting curve:</strong> Learning decay & spaced repetition research<br/>
                • <strong>BetterUp DAF outcomes (2021–2025):</strong> +6% retention, +15% resilience, +17% mission readiness<br/>
                • <strong>DHS OIG & NTEU testimony:</strong> CBP workforce challenges, operational tempo<br/>
                • <strong>Air Force Weapons School:</strong> Mastery framework for high-performance development<br/>
                • <strong>BetterUp volume pricing:</strong> Enterprise contract rates (Deal Desk for 1000+ seats)
              </div>
            </div>

            <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fef3c7'}}>
              <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#92400e'}}>Third Pathway Methodology: Discipline Cost Reduction</h4>
              <p style={{fontSize: '14px', color: '#78350f', marginBottom: '16px', lineHeight: 1.6}}>
                CBP processes ~6,760 annual misconduct cases (11.3% of workforce). Research shows 20% are stress-related and 41.6% of arrests are alcohol/drug-related. BetterUp prevents these through early intervention:
              </p>
              <div style={{display: 'grid', gap: '12px'}}>
                <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                  <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px'}}>Stress-Related Prevention</div>
                  <div style={{fontSize: '12px', color: '#78350f'}}>15% of stress-related cases prevented through resilience training (HeartMath 40% stress reduction applied conservatively)</div>
                </div>
                <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                  <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px'}}>Alcohol-Related Prevention</div>
                  <div style={{fontSize: '12px', color: '#78350f'}}>78% of at-risk employees no longer at-risk after EAP treatment × 50% reach = effective prevention (CuraLinc 2022 peer-reviewed study)</div>
                </div>
                <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                  <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px'}}>Cost Per Case</div>
                  <div style={{fontSize: '12px', color: '#78350f'}}>Investigation ($9,500) + Productivity loss ($14,000) = $23,500 avg. Arrests add potential termination costs ($80,000) = $103,500 total</div>
                </div>
              </div>
              <div style={{background: '#fffbeb', borderRadius: '8px', padding: '12px', marginTop: '12px', border: '1px solid #fbbf24'}}>
                <p style={{fontSize: '12px', color: '#78350f', margin: 0}}>
                  <strong>Conservative Estimate:</strong> This pathway calculates {fmtNum(calculations.totalPreventedDiscipline)} prevented cases annually, saving {fmt(calculations.disciplineSavings)}. Actual costs may be higher when including legal fees, settlements, and reputational damage not tracked by CBP.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {!showAssistant && (
        <button 
          onClick={() => setShowAssistant(true)} 
          style={{
            position: 'fixed', 
            bottom: '24px', 
            right: '24px', 
            width: '64px', 
            height: '64px', 
            background: '#0066cc', 
            color: 'white', 
            borderRadius: '50%', 
            border: 'none', 
            boxShadow: '0 4px 12px rgba(0,102,204,0.4)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer', 
            zIndex: 1000
          }}
        >
          <MessageCircle size={32} />
        </button>
      )}

      {showAssistant && (
        <div style={{position: 'fixed', right: '24px', bottom: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', border: '2px solid #0066cc', width: '384px', zIndex: 1000}}>
          <div style={{background: '#0066cc', color: 'white', padding: '16px', borderRadius: '10px 10px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <h3 style={{fontSize: '16px', fontWeight: 'bold', margin: 0}}>Model Assistant</h3>
              <p style={{fontSize: '11px', opacity: 0.9, margin: '4px 0 0 0'}}>Ask about calculations</p>
            </div>
            <button 
              onClick={() => setShowAssistant(false)} 
              style={{background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '4px'}} 
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} 
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{padding: '16px', height: '384px', overflowY: 'auto', background: '#f9fafb'}}>
            {chatMessages.length === 0 ? (
              <div style={{textAlign: 'center', paddingTop: '32px'}}>
                <p style={{fontWeight: '500', color: '#6b7280', marginBottom: '16px'}}>Ask anything about the model!</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {["How is the net savings calculated?", "Why is OFO facing a retirement crisis in 2028?", "Explain the COA differences", "What's the difference between Lead and Ready?", "How does Leadership Culture affect ROI?"].map((q, i) => (
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
                    <div style={{display: 'inline-block', maxWidth: '80%', padding: '12px', borderRadius: '8px', background: m.type === 'user' ? '#0066cc' : 'white', color: m.type === 'user' ? 'white' : '#1f2937', border: m.type === 'user' ? 'none' : '1px solid #e5e7eb', fontSize: '14px'}}>
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
              style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
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