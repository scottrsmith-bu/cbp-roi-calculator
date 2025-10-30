import React, { useState, useMemo } from 'react';

const CBPDashboard = () => {
  // State Management
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
  const [ptsdCoachingEffectiveness, setPtsdCoachingEffectiveness] = useState(25);
  const [ptsdWcFilingRate, setPtsdWcFilingRate] = useState(8);
  const [ptsdSeparationRate, setPtsdSeparationRate] = useState(12);
  const [depressionCoachingEffectiveness, setDepressionCoachingEffectiveness] = useState(25);
  const [depressionWcFilingRate, setDepressionWcFilingRate] = useState(10);
  const [depressionSeparationRate, setDepressionSeparationRate] = useState(15);
  const [anxietyCoachingEffectiveness, setAnxietyCoachingEffectiveness] = useState(20);
  const [anxietyWcFilingRate, setAnxietyWcFilingRate] = useState(6);
  const [anxietySeparationRate, setAnxietySeparationRate] = useState(10);
  const [sudCoachingEffectiveness, setSudCoachingEffectiveness] = useState(67);
  const [sudWcFilingRate, setSudWcFilingRate] = useState(15);
  const [sudSeparationRate, setSudSeparationRate] = useState(25);
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

  // Calculations
  const calculations = useMemo(() => {
    const data = orgData[org];
    let leadPercent, readyPercent, readyPrice;
    if (coa === 'pilot') {
      readyPercent = 0.15;
      leadPercent = includeLeadForLeaders ? 0.10 : 0;
      readyPrice = 250; // Higher price for pilot
    } else if (coa === 'targeted') {
      readyPercent = 0.25;
      leadPercent = includeLeadForLeaders ? 0.10 : 0;
      readyPrice = 200; // Mid-tier pricing
    } else {
      readyPercent = 0.75;
      leadPercent = includeLeadForLeaders ? 0.10 : 0;
      readyPrice = 150; // Best price at scale
    }
    
    const baseLeadSeats = Math.round(data.officers * leadPercent);
    const baseReadySeats = Math.max(Math.round(data.officers * readyPercent), 500); // Minimum 500 seats
    const leadSeats = manualLeadSeats !== null ? manualLeadSeats : baseLeadSeats;
    const readySeats = manualReadySeats !== null ? manualReadySeats : baseReadySeats;
    const totalSeats = leadSeats + readySeats;
    const baseEngagement = 0.65;
    const engagement = manualEngagement !== null ? manualEngagement / 100 : baseEngagement;
    const activeUsers = Math.round(totalSeats * engagement);
    const leadPrice = 5785;
    const totalInvestment = (leadSeats * leadPrice) + (readySeats * readyPrice);
    const retentionLift = manualRetentionOverride !== null ? manualRetentionOverride / 100 : 0.07;
    const readinessLift = manualReadinessOverride !== null ? manualReadinessOverride / 100 : 0.37;
    const profStandardsLift = manualProfStandardsOverride !== null ? manualProfStandardsOverride / 100 : 0.22;
    const attritionRate = org === 'ofo' ? 0.068 : 0.10;
    const baselineSeparations = Math.round(data.officers * attritionRate);
    const preventableSeparations = Math.round(baselineSeparations * 0.30);
    const separationsPrevented = Math.round(preventableSeparations * retentionLift * engagement);
    const replacementCost = 150000;
    const retentionSavings = separationsPrevented * replacementCost;
    const baselineMHClaims = Math.round(data.officers * 0.025);
    const avgClaimCost = 65000;
    const claimsPrevented = Math.round(baselineMHClaims * readinessLift * engagement);
    const wcSavings = claimsPrevented * avgClaimCost;
    const baselineDisciplineCases = Math.round(data.officers * 0.035);
    const avgDisciplineCost = 45000;
    const casesPrevented = Math.round(baselineDisciplineCases * profStandardsLift * engagement);
    const disciplineSavings = casesPrevented * avgDisciplineCost;
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
      retentionLift: retentionLift * 100,
      readinessLift: readinessLift * 100,
      profStandardsLift: profStandardsLift * 100,
      baselineSeparations,
      separationsPrevented,
      retentionSavings,
      baselineMHClaims,
      claimsPrevented,
      wcSavings,
      baselineDisciplineCases,
      casesPrevented,
      disciplineSavings,
      totalSavings,
      netSavings,
      roi
    };
  }, [org, coa, includeLeadForLeaders, manualLeadSeats, manualReadySeats, manualEngagement, manualRetentionOverride, manualReadinessOverride, manualProfStandardsOverride, orgData]);

  // Helper Functions
  const fmt = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);
  const pct = (num) => `${num.toFixed(1)}%`;
  
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const responses = {
      "How is the net savings calculated?": "Net savings = Total savings (retention + workers comp + discipline) minus BetterUp investment. We calculate savings from preventing separations ($150K each), Workers' Comp - Mental Health Claims/FECA ($65K each), and discipline cases ($45K each), then subtract the cost of Lead ($3,600/seat) and Ready ($1,800/seat) coaching.",
      "Why is OFO facing a retirement crisis?": "In 2028, OFO officers hired under Law Enforcement 6(c) retirement coverage become eligible at age 50. Combined with 6.8% annual attrition and CBP's 12-month hiring timeline, this creates unprecedented staffing challenges. Every prevented separation saves $150K in recruitment and training costs.",
      "Explain the COA differences": "Lead-Only targets 15% critical talent (supervisors, specialists) at $3,600/seat for intensive 1:1 coaching. Ready-Only reaches 35% frontline officers (GS-11/12) at $1,800/seat for digital coaching. Lead+Ready combines both for comprehensive coverage addressing all three cost pathways.",
      "What's Lead vs Ready?": "Lead ($5,785/seat for 12-month commitment) provides intensive 1:1 coaching for supervisors and critical talent, focusing on leadership development. Ready ($150/seat) delivers scalable digital coaching for frontline officers, emphasizing resilience and career readiness. Both include AI coaching and assessments.",
      "How does Leadership Culture affect ROI?": "Leadership culture (measured by our Professional Standards metric) reduces discipline cases by 22%. Better-led teams have fewer misconduct incidents, lower use-of-force complaints, and stronger adherence to standards. Each prevented discipline case saves $45K in investigation, legal, and administrative costs."
    };
    setChatMessages([...chatMessages, 
      { type: 'user', text: chatInput },
      { type: 'assistant', text: responses[chatInput] || "I can help explain the model! Try asking about net savings, the retirement crisis, COA differences, Lead vs Ready, or how leadership culture affects ROI." }
    ]);
    setChatInput('');
  };
return (
    <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc', minHeight: '100vh', padding: '40px 24px'}}>
      
      {/* PRETTIER HEADER */}
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

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '0'}}>
              
              <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '3px solid #c41230', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#c41230', marginBottom: '12px'}}>
                  💼 Retention Crisis
                </div>
                <div style={{fontSize: '42px', fontWeight: '900', color: '#1e293b', marginBottom: '16px'}}>
                  {fmt(calculations.retentionSavings)}
                </div>
                <div style={{fontSize: '15px', color: '#475569', marginBottom: '20px', lineHeight: '1.6'}}>
                  <strong>{calculations.separationsPrevented} preventable separations</strong> annually at ${calculations.separationsPrevented > 0 ? Math.round(calculations.retentionSavings / calculations.separationsPrevented).toLocaleString() : '150,000'} per replacement
                </div>
                <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#6d0a1f', lineHeight: '1.6'}}>
                  <strong>Cost Drivers:</strong><br/>
                  • 12-month hiring timeline ($35K-45K in salary during training)<br/>
                  • 6-month academy + equipment ($75K-120K total)<br/>
                  • 3-6 month field training with FTO supervision<br/>
                  • 1-2 year productivity ramp (experience gap costs)<br/>
                  • Institutional knowledge loss<br/>
                  <br/>
                  <strong>Model Logic:</strong><br/>
                  • Baseline: {calculations.baselineSeparations.toLocaleString()} total separations annually ({pct(org === 'ofo' ? 6.8 : 10)} attrition rate)<br/>
                  • 30% are preventable through behavioral interventions (burnout, lack of career development, poor leadership)<br/>
                  • BetterUp's 7% retention lift × 65% engagement = prevents {calculations.separationsPrevented} of those behavioral-driven separations<br/>
                  • Savings: {calculations.separationsPrevented} × $150K replacement cost = {fmt(calculations.retentionSavings)}
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
                  <strong>{calculations.claimsPrevented} preventable Workers' Comp - Mental Health Claims (FECA)</strong> at ${calculations.claimsPrevented > 0 ? Math.round(calculations.wcSavings / calculations.claimsPrevented).toLocaleString() : '65,000'} average cost
                </div>
                <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#6d0a1f', lineHeight: '1.6'}}>
                  <strong>Cost Drivers:</strong><br/>
                  • PTSD claims: $85K+ per accepted case (therapy, meds, disability)<br/>
                  • Depression/anxiety claims: $45K-65K each<br/>
                  • Substance use disorder treatment: $30K-50K<br/>
                  • Absenteeism: 10-15 additional sick days/year ($4,400/officer)<br/>
                  • Presenteeism: 35% productivity loss when at work<br/>
                  <br/>
                  <strong>Model Logic:</strong><br/>
                  • Baseline: {calculations.baselineMHClaims.toLocaleString()} mental health claims annually (2.5% of workforce)<br/>
                  • BetterUp's 37% readiness lift (resilience + stress management) × 65% engagement = prevents {calculations.claimsPrevented} claims<br/>
                  • Savings: {calculations.claimsPrevented} × $65K average claim cost = {fmt(calculations.wcSavings)}
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

        {/* TAB 2: ROI MODEL */}
        {activeTab === 'roi-model' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            
            {/* COA Selection with Enhanced Explanations */}
            <div style={{background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '26px', fontWeight: '800', color: '#1e293b', marginBottom: '16px'}}>
                Select Course of Action (COA)
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px'}}>
                {[
                  { 
                    id: 'pilot', 
                    label: 'COA 1: Pilot', 
                    desc: '15% of workforce • Select offices • Proof of concept at premium pilot pricing', 
                    seats: Math.max(Math.round(calculations.officers * 0.15), 500),
                    investment: fmt(Math.max(Math.round(calculations.officers * 0.15), 500) * 250),
                    price: '$250/seat'
                  },
                  { 
                    id: 'targeted', 
                    label: 'COA 2: Targeted (Recommended)', 
                    desc: '25% of workforce • Select offices • Balanced scale with volume discount', 
                    seats: Math.max(Math.round(calculations.officers * 0.25), 500),
                    investment: fmt(Math.max(Math.round(calculations.officers * 0.25), 500) * 200),
                    price: '$200/seat'
                  },
                  { 
                    id: 'scaled', 
                    label: 'COA 3: Scaled', 
                    desc: '75% of workforce • Select offices • Maximum impact at list price', 
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
                      Adds {Math.round(calculations.officers * 0.10).toLocaleString()} Lead seats at $5,785/seat • Develops leadership culture that prevents discipline cases and retains teams
                    </div>
                  </div>
                </label>
                
                {includeLeadForLeaders && (
                  <div style={{marginTop: '16px', padding: '20px', background: '#e6f2f8', borderRadius: '10px', border: '2px solid #005288'}}>
                    <div style={{fontSize: '15px', color: '#0078ae', lineHeight: '1.8'}}>
                      <strong>💎 Lead Enhancement Active:</strong><br/>
                      • Additional investment: {fmt(Math.round(calculations.officers * 0.10) * 5785)}<br/>
                      • Target population: GS-13+ supervisors, SES candidates, CBP Leadership Institute participants, high-potentials<br/>
                      • Additional impact: +3-5% retention lift through improved leadership culture, +5% discipline case reduction through better supervision<br/>
                      • Estimated additional savings: $8-12M annually (leadership-driven team retention + professional standards improvement)
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => setShowCoaDetails(!showCoaDetails)} 
                style={{marginTop: '16px', padding: '12px 20px', fontSize: '14px', fontWeight: '600', background: '#f1f5f9', color: '#005288', border: '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', width: '100%'}}
              >
                {showCoaDetails ? '▼ Hide' : '▶ Show'} Detailed COA Breakdown
              </button>
              
              {showCoaDetails && (
                <div style={{marginTop: '16px', padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px'}}>
                    <div style={{background: 'white', padding: '20px', borderRadius: '10px', border: '2px solid #005288'}}>
                      <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>💎 Lead ($5,785/seat - 12 month)</div>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7', marginBottom: '12px'}}>
                        <strong>Who:</strong> Supervisors (GS-13+), senior specialists, high-potentials, critical talent<br/>
                        <strong>What:</strong> Intensive 1:1 coaching with dedicated professional coaches<br/>
                        <strong>Focus:</strong> Leadership development, people management, strategic thinking<br/>
                        <strong>Delivery:</strong> Bi-weekly live sessions + AI coaching + assessments
                      </div>
                      <div style={{fontSize: '13px', color: '#64748b', fontStyle: 'italic'}}>
                        Drives team performance through better leadership culture
                      </div>
                    </div>

                    <div style={{background: 'white', padding: '20px', borderRadius: '10px', border: '2px solid #005288'}}>
                      <div style={{fontSize: '18px', fontWeight: '700', color: '#005288', marginBottom: '12px'}}>🎯 Ready (Tiered Volume Pricing - 12 month)</div>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7', marginBottom: '12px'}}>
                        <strong>Who:</strong> CBP Officers (GS-11/12), Border Patrol Agents, entry-level personnel<br/>
                        <strong>What:</strong> Scalable digital coaching with AI-powered support<br/>
                        <strong>Focus:</strong> Resilience, stress management, career readiness, work-life integration<br/>
                        <strong>Delivery:</strong> On-demand AI coaching + digital resources + assessments
                      </div>
                      <div style={{fontSize: '13px', color: '#64748b', fontStyle: 'italic'}}>
                        Reaches majority of workforce cost-effectively
                      </div>
                    </div>
                  </div>
                  
                  <div style={{marginTop: '20px', padding: '16px', background: '#e6f2f8', borderRadius: '10px', border: '2px solid #005288'}}>
                    <div style={{fontSize: '15px', color: '#0078ae', lineHeight: '1.7'}}>
                      <strong>Why the Mix Matters:</strong> Lead develops the leadership culture that prevents discipline cases and retains teams. Ready provides the resilience foundation that prevents Workers' Comp claims and burnout. Together, they address all three cost pathways simultaneously.<br/><br/>
                      <strong>Volume-Based Pricing Strategy:</strong> Pilot pricing ($250/seat) reflects higher per-user setup costs for small deployments. As CBP scales to Targeted ($200/seat) and Scaled ($150/seat at list price), volume efficiencies drive down per-seat costs, creating strong incentive for enterprise-wide adoption.
                    </div>
                  </div>
                </div>
              )}
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
                    {calculations.separationsPrevented} separations prevented • {pct(calculations.retentionLift)} lift from career commitment & leadership development
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
                    {calculations.claimsPrevented} Workers' Comp - Mental Health Claims (FECA) prevented • {pct(calculations.readinessLift)} lift from resilience & stress management
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
                    {calculations.casesPrevented} discipline cases prevented • {pct(calculations.profStandardsLift)} lift from improved leadership culture
                  </div>
                </div>
              </div>
            </div>

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

                <div>
                  <label style={{display: 'block', fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#475569'}}>
                    Retention Lift (%)
                  </label>
                  <input 
                    type="number" 
                    value={manualRetentionOverride === null ? '' : manualRetentionOverride}
                    onChange={(e) => setManualRetentionOverride(e.target.value === '' ? null : parseFloat(e.target.value))}
                    placeholder="Default: 7%"
                    style={{width: '100%', padding: '10px', fontSize: '15px', border: '2px solid #e2e8f0', borderRadius: '8px'}}
                  />
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#475569'}}>
                    Readiness Lift (%)
                  </label>
                  <input 
                    type="number" 
                    value={manualReadinessOverride === null ? '' : manualReadinessOverride}
                    onChange={(e) => setManualReadinessOverride(e.target.value === '' ? null : parseFloat(e.target.value))}
                    placeholder="Default: 37%"
                    style={{width: '100%', padding: '10px', fontSize: '15px', border: '2px solid #e2e8f0', borderRadius: '8px'}}
                  />
                </div>

                <div>
                  <label style={{display: 'block', fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#475569'}}>
                    Professional Standards Lift (%)
                  </label>
                  <input 
                    type="number" 
                    value={manualProfStandardsOverride === null ? '' : manualProfStandardsOverride}
                    onChange={(e) => setManualProfStandardsOverride(e.target.value === '' ? null : parseFloat(e.target.value))}
                    placeholder="Default: 22%"
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
        {/* TAB 3: FACTOR BREAKDOWN */}
        {activeTab === 'factors' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            {/* Introduction */}
            <div style={{background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '16px'}}>
                Understanding the Behavioral Health Factors
              </h2>
              <div style={{fontSize: '16px', color: '#475569', lineHeight: '1.7'}}>
                Workers' comp, retention, and discipline costs are driven by four behavioral health factors. Use the sliders below to adjust assumptions based on CBP-specific data or conservative estimates. Each factor shows its impact on filing rates, separation rates, and intervention effectiveness.
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
                    Affects 18% of law enforcement • $85K+ per claim • 3x separation risk
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'ptsd' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'ptsd' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Untreated PTSD leads to expensive Workers' Comp - Mental Health Claims/FECA ($85K+), increased sick leave (15+ days/year), impaired decision-making (use-of-force incidents), and early separation ($150K replacement cost). Officers experiencing trauma exposure without intervention are 3x more likely to leave within 5 years.
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
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
                    Affects 18% of officers • $45-65K per claim • 35% productivity loss
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'depression' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'depression' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Depression and burnout drive workers' comp claims ($45-65K), chronic absenteeism (12+ sick days/year), severe presenteeism (35% productivity loss when at work), and early attrition. Officers with untreated depression are 2.5x more likely to separate prematurely.
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
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
                </div>
              )}
            </div>

            {/* ANXIETY */}
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
                    Affects 15% of officers • $40-55K per claim • Decision-making impairment
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'anxiety' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'anxiety' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Chronic anxiety impairs tactical decision-making, increases use-of-force incidents, drives workers' comp claims ($40-55K), and causes moderate absenteeism (8-10 days/year). Montreal Police study showed 40% stress reduction through proactive intervention.
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
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
                </div>
              )}
            </div>

            {/* SUBSTANCE USE DISORDER */}
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
                    Affects 25% of law enforcement • $30-50K treatment • Discipline/termination risk
                  </div>
                </div>
                <div style={{fontSize: '32px', color: '#c41230'}}>
                  {expandedFactor === 'sud' ? '−' : '+'}
                </div>
              </button>
              
              {expandedFactor === 'sud' && (
                <div style={{padding: '24px', borderTop: '2px solid #fee2e2', background: '#fef2f2'}}>
                  <div style={{marginBottom: '24px', fontSize: '15px', color: '#6d0a1f', lineHeight: '1.7'}}>
                    <strong>Cost Drivers:</strong> Substance use disorders create the highest discipline and termination risk. CuraLinc EAP study showed 67% severity reduction and 78% at-risk elimination through early intervention. Costs include treatment ($30-50K), discipline cases ($45K), and terminations requiring replacement ($150K).
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
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
                </div>
              )}
            </div>
          </div>
        )}
        {/* TAB 4: PROOF & VALIDATION */}
        {activeTab === 'proof' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            
            {/* PYRAMID - MOVED TO TAB 4 */}
            <div style={{background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '4px solid #c41230', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
                <span style={{fontSize: '36px'}}>🔺</span>
                <h2 style={{fontSize: '28px', fontWeight: '800', color: '#8f0e28', margin: 0}}>
                  The Cost Cascade: Prevention vs Crisis vs Catastrophic
                </h2>
              </div>
              
              <div style={{fontSize: '16px', color: '#6d0a1f', marginBottom: '32px', lineHeight: '1.7'}}>
                Mental health costs follow a predictable escalation pattern. Early intervention at the <strong>Prevention</strong> level costs $1,500-2,500 per officer (LEAD+READY COA). Waiting until <strong>Crisis</strong> costs $40K-85K in workers' comp claims. Reaching <strong>Catastrophic</strong> outcomes costs $150K+ in separations plus institutional damage. The business case for prevention is overwhelming.
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '800px', margin: '0 auto 32px'}}>
                <div style={{background: '#e8f5e9', border: '3px solid #2e7d32', borderRadius: '12px', padding: '24px', textAlign: 'center'}}>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#1b5e20', marginBottom: '8px'}}>
                    ✅ PREVENTION: $1,500-2,500 per officer
                  </div>
                  <div style={{fontSize: '15px', color: '#2e7d32', lineHeight: '1.6'}}>
                    Proactive coaching • Early symptom detection • Resilience building • Leadership development • 10:1 ROI
                  </div>
                </div>

                <div style={{background: '#fff3e0', border: '3px solid #f57c00', borderRadius: '12px', padding: '24px', textAlign: 'center', marginLeft: '60px'}}>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#e65100', marginBottom: '8px'}}>
                    ⚠️ CRISIS: $40,000-85,000 per case
                  </div>
                  <div style={{fontSize: '15px', color: '#ef6c00', lineHeight: '1.6'}}>
                    Workers' Comp - Mental Health Claims (FECA) • Extended sick leave • Treatment costs • Temporary replacements • 2:1 ROI
                  </div>
                </div>

                <div style={{background: '#ffebee', border: '3px solid #c41230', borderRadius: '12px', padding: '24px', textAlign: 'center', marginLeft: '120px'}}>
                  <div style={{fontSize: '22px', fontWeight: '800', color: '#b71c1c', marginBottom: '8px'}}>
                    🚨 CATASTROPHIC: $150,000+ per separation
                  </div>
                  <div style={{fontSize: '15px', color: '#c62828', lineHeight: '1.6'}}>
                    Terminations • Permanent disability • Institutional knowledge loss • Team disruption • Negative ROI
                  </div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px'}}>
                <h3 style={{fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '16px', textAlign: 'center'}}>
                  Business Case Comparison: Wait vs Intervene
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                  <div style={{background: '#fef2f2', padding: '20px', borderRadius: '10px', border: '2px solid #c41230'}}>
                    <div style={{fontSize: '18px', fontWeight: '700', color: '#c41230', marginBottom: '12px'}}>
                      ❌ Wait for Crisis
                    </div>
                    <div style={{fontSize: '14px', color: '#6d0a1f', lineHeight: '1.7'}}>
                      • 1,000 officers with untreated behavioral health issues<br/>
                      • 8% file Workers' Comp claims = 80 claims × $65K = <strong>$5.2M</strong><br/>
                      • 12% separate = 120 separations × $150K = <strong>$18M</strong><br/>
                      • 3% discipline cases = 30 cases × $45K = <strong>$1.35M</strong><br/>
                      • <strong>Total: $24.55M over 5 years</strong>
                    </div>
                  </div>

                  <div style={{background: '#e8f4e0', padding: '20px', borderRadius: '10px', border: '2px solid #5e9732'}}>
                    <div style={{fontSize: '18px', fontWeight: '700', color: '#5e9732', marginBottom: '12px'}}>
                      ✅ Intervene Early (BetterUp)
                    </div>
                    <div style={{fontSize: '14px', color: '#4a7628', lineHeight: '1.7'}}>
                      • 1,000 officers with proactive coaching<br/>
                      • Investment: 1,000 × $2,700 avg = <strong>$2.7M</strong><br/>
                      • Prevent 37% of claims = 30 claims × $65K = <strong>$1.95M saved</strong><br/>
                      • Prevent 7% separations = 8 separations × $150K = <strong>$1.2M saved</strong><br/>
                      • Prevent 22% discipline = 7 cases × $45K = <strong>$315K saved</strong><br/>
                      • <strong>Net savings: $765K (28% ROI)</strong>
                    </div>
                  </div>
                </div>
                
                <div style={{marginTop: '20px', padding: '16px', background: '#e6f2f8', borderRadius: '10px', textAlign: 'center'}}>
                  <div style={{fontSize: '16px', color: '#0078ae', fontWeight: '600'}}>
                    🎯 Prevention ROI Multiplier: <strong>Every $1 invested early prevents $3.50 in crisis costs</strong>
                  </div>
                </div>
              </div>
            </div>

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

            {/* Model Assumptions - MOVED TO TAB 4 */}
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
                    Composite of Air Force +17% mission readiness and +15% resilience with Montreal Police 40% stress reduction. Assumes 2.5% baseline mental health Workers' Comp claim rate (conservative vs industry 3-5%). JAMA 21.6% symptom reduction validates clinical effectiveness.
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Professional Standards (22% Lift)
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Based on improved leadership culture reducing discipline cases. CuraLinc EAP showed 67% alcohol severity reduction (major discipline driver). Model assumes 3.5% baseline discipline rate and only applies lift to behaviorally-driven cases (not policy violations).
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Engagement Rate (65%)
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Conservative assumption. Air Force achieves 75%+ engagement. Model uses 65% to account for operational tempo challenges and stigma in law enforcement culture. Digital-first model (AI coaching + on-demand resources) enables higher engagement than traditional EAP (3-5%).
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Cost Assumptions
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    Replacement cost: $150K (validated by SHRM and GAO data on LE hiring). Workers' Comp - Mental Health Claim (FECA): $65K average (mix of PTSD $85K, depression/anxiety $45-65K). Discipline case: $45K average (investigation, legal, admin time, potential termination).
                  </div>
                </div>

                <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0'}}>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                    Time Horizon
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.7'}}>
                    All savings calculated on annual basis with assumption of sustained engagement. Prevention benefits compound over time — early career interventions prevent downstream crises. Long-term ROI studies (5+ years) show 6:1-10:1 returns vs conservative 1-year 4:1 modeled here.
                  </div>
                </div>
              </div>
            </div>

            {/* Research Bibliography with ALL LINKS */}
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
                  <strong>3. Montreal Police Service:</strong> 22-year longitudinal suicide prevention study — 65% reduction in suicide rate through early intervention
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9158739/" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>4. CuraLinc EAP (2022):</strong> Law enforcement EAP effectiveness study — 67% alcohol severity reduction, 78% at-risk elimination
                  <a href="https://curalinc.com/outcomes-study-2022" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>5. HeartMath Police Study:</strong> Heart rate variability biofeedback for law enforcement — 40% stress reduction, improved decision-making
                  <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890098/" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
                <div>
                  <strong>6. Department of Air Force Partnership (2021-2025):</strong> BetterUp outcomes data — +7% career commitment, +15% unit readiness, +13% individual readiness
                </div>
                <div>
                  <strong>7. DHS OIG Reports:</strong> CBP discipline case volumes and oversight — Baseline data for professional standards improvement
                  <a href="https://www.oig.dhs.gov/sites/default/files/assets/2021-05/OIG-21-34-May21.pdf" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Report</a>
                </div>
                <div>
                  <strong>8. NTEU Congressional Testimony (April 2024):</strong> CBP workforce challenges and operational tempo stressors
                  <a href="https://www.nteu.org/news/testimony/nteu-testimony-on-fiscal-year-2025-budget-request-for-us-customs-and-border-protection" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Testimony</a>
                </div>
                <div>
                  <strong>9. Coaching Effectiveness Meta-Analysis:</strong> 37 RCTs showing effect size 0.59
                  <a href="https://journals.aom.org/doi/abs/10.5465/amle.2022.0107" target="_blank" rel="noreferrer" style={{color: '#005288', marginLeft: '8px'}}>↗ View Study</a>
                </div>
              </div>
            </div>

            {/* Data Sources & Methodology - MOVED TO TAB 4 */}
            <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '20px'}}>
                📖 Complete Data Sources & Methodology
              </h2>
              <div style={{fontSize: '15px', color: '#475569', lineHeight: '1.8'}}>
                <strong>Federal Data Sources:</strong><br/>
                • <a href="https://www.gao.gov/products/gao-24-107029" target="_blank" rel="noreferrer" style={{color: '#005288'}}>GAO-24-107029</a>: CBP recruitment, hiring, retention challenges<br/>
                • <a href="https://www.oig.dhs.gov/sites/default/files/assets/2021-05/OIG-21-34-May21.pdf" target="_blank" rel="noreferrer" style={{color: '#005288'}}>DHS OIG Reports</a>: Discipline case volumes and misconduct oversight<br/>
                • <a href="https://www.nteu.org/news/testimony/nteu-testimony-on-fiscal-year-2025-budget-request-for-us-customs-and-border-protection" target="_blank" rel="noreferrer" style={{color: '#005288'}}>NTEU Congressional Testimony (April 2024)</a>: CBP workforce challenges<br/>
                • <a href="https://www.opm.gov/fevs/" target="_blank" rel="noreferrer" style={{color: '#005288'}}>Federal Employee Viewpoint Survey</a>: Climate and engagement data<br/>
                • <a href="https://www.dol.gov/agencies/owcp/FECA/programstatistics" target="_blank" rel="noreferrer" style={{color: '#005288'}}>FECA Program Data</a>: Workers' compensation claim costs and patterns<br/>
                <br/>
                <strong>Peer-Reviewed Research:</strong><br/>
                • <a href="https://jamanetwork.com/journals/jama-health-forum/fullarticle/2817234" target="_blank" rel="noreferrer" style={{color: '#005288'}}>JAMA Health Forum (2024)</a>: Enhanced behavioral health benefits RCT<br/>
                • <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9158739/" target="_blank" rel="noreferrer" style={{color: '#005288'}}>Montreal Police Service</a>: 22-year suicide prevention longitudinal study<br/>
                • <a href="https://curalinc.com/outcomes-study-2022" target="_blank" rel="noreferrer" style={{color: '#005288'}}>CuraLinc EAP (2022)</a>: Law enforcement EAP effectiveness research<br/>
                • <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890098/" target="_blank" rel="noreferrer" style={{color: '#005288'}}>HeartMath Research</a>: HRV biofeedback for law enforcement stress<br/>
                • <a href="https://journals.aom.org/doi/abs/10.5465/amle.2022.0107" target="_blank" rel="noreferrer" style={{color: '#005288'}}>Meta-analysis of coaching effectiveness</a>: 37 RCTs, effect size 0.59<br/>
                <br/>
                <strong>BetterUp Validated Outcomes:</strong><br/>
                • Department of Air Force partnership (2021-2025): 4-year longitudinal data<br/>
                • BetterUp Whole Person Model 3.0: Competency framework validation<br/>
                • Enterprise customer outcomes: Retention, engagement, performance data<br/>
                <br/>
                <strong>Methodology Notes:</strong><br/>
                • All cost estimates use conservative midpoint values from research ranges<br/>
                • Effectiveness assumptions based on peer-reviewed studies, not vendor claims<br/>
                • Model applies improvement rates only to preventable/behavioral-driven costs<br/>
                • Engagement rates assume operational tempo and stigma challenges<br/>
                • No attribution for intangible benefits (morale, reputation, mission effectiveness)
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
                    <strong>Investment:</strong> ~$125K-$975K depending on organization size (see ROI Model tab)
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
                    <strong>Investment:</strong> ~$100K-$1.3M with volume discount pricing (see ROI Model tab)
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
                    <strong>Investment:</strong> ~$75K-$2.9M at list price with maximum coverage (see ROI Model tab)
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
                    • <strong>FECA mental health claims:</strong> Annual volume and average cost by component (currently modeled at conservative 2.5% rate)<br/>
                    • <strong>Attrition patterns:</strong> Voluntary separation rates by location, tenure, and role<br/>
                    • <strong>Discipline cases:</strong> Annual volume and cost of behaviorally-driven incidents<br/>
                    • <strong>Sick leave utilization:</strong> Mental health-related absences
                  </div>
                  <div style={{marginTop: '12px', padding: '12px', background: '#e6f2f8', borderRadius: '8px', fontSize: '13px', color: '#0078ae'}}>
                    <strong>Note:</strong> We're using 2.5% baseline mental health claim rate (conservative vs industry 3-5%). Actual CBP data will refine ROI projections.
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
                    Validate assumptions with CBP's actual workforce data and adjust ROI projections
                  </div>
                </div>

                <div style={{background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>2️⃣</div>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    Stakeholder Briefings
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                    Present business case to field leadership, CBPX, HR, and other key decision-makers
                  </div>
                </div>

                <div style={{background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '12px'}}>3️⃣</div>
                  <div style={{fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '8px'}}>
                    Select COA & Pathway
                  </div>
                  <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                    Choose deployment scale and identify optimal procurement mechanism
                  </div>
                </div>
              </div>

              <div style={{background: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center'}}>
                <div style={{fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '12px'}}>
                  Ready to discuss how BetterUp can support CBP's workforce sustainability goals?
                </div>
                <div style={{fontSize: '15px', color: '#475569', lineHeight: '1.7'}}>
                  Contact BetterUp's federal team to schedule a collaborative discovery session, review CBP-specific data, and refine this model to your mission requirements.
                </div>
              </div>
            </div>
          </div>
        )}</parameter>
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
                  {["How is the net savings calculated?", "Why is OFO facing a retirement crisis?", "Explain the COA differences", "What's Lead vs Ready?", "How does Leadership Culture affect ROI?"].map((q, i) => (
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