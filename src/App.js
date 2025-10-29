import React, { useState, useMemo } from 'react';
import { Shield, Calculator, MessageCircle, X, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const CBPDashboard = () => {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeTab, setActiveTab] = useState('cost-problem');
  const [expandedFactor, setExpandedFactor] = useState(null);
  
  const [missionReadinessImprovement, setMissionReadinessImprovement] = useState(17);
  const [resilienceImprovement, setResilienceImprovement] = useState(15);
  const [careerCommitmentImprovement, setCareerCommitmentImprovement] = useState(13);
  const [leadershipImprovement, setLeadershipImprovement] = useState(12);
  const [standardsImprovement, setStandardsImprovement] = useState(10);
  const [leadershipCultureImprovement, setLeadershipCultureImprovement] = useState(0);
  
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
  const [totalPersonnel, setTotalPersonnel] = useState(25879);
  const [leadSeats, setLeadSeats] = useState(250);
  const [readySeats, setReadySeats] = useState(4750);
  const [use6MonthLead, setUse6MonthLead] = useState(false);
  const [engagementRate, setEngagementRate] = useState(65);
  
  const [ptsdEffectiveness, setPtsdEffectiveness] = useState(25);
  const [ptsdFilingRate, setPtsdFilingRate] = useState(10);
  const [ptsdAcceptanceRate, setPtsdAcceptanceRate] = useState(50);
  const [depressionEffectiveness, setDepressionEffectiveness] = useState(25);
  const [depressionFilingRate, setDepressionFilingRate] = useState(10);
  const [depressionAcceptanceRate, setDepressionAcceptanceRate] = useState(50);
  const [sudEffectiveness, setSudEffectiveness] = useState(67);
  const [sudFilingRate, setSudFilingRate] = useState(10);
  const [sudAcceptanceRate, setSudAcceptanceRate] = useState(50);

  const organizations = [
    {id: 'cbp', name: 'CBP-Wide (All Components)', personnel: 60726, location: 'Nationwide', type: 'cbp-wide', description: 'Entire CBP workforce', attritionRate: 5.5, replacementCost: 150000, workersCompClaims: 8912, avgClaimCost: 41000},
    {id: 'ofo', name: 'Office of Field Operations (OFO)', personnel: 25879, location: '20 Field Offices & 328 Ports', type: 'component', highlight: true, description: 'CBP Officers at ports of entry', attritionRate: 6.3, replacementCost: 150000, workersCompClaims: 4107, avgClaimCost: 41000},
    {id: 'usbp', name: 'U.S. Border Patrol (USBP)', personnel: 19648, location: '20 Sectors', type: 'component', description: 'Border Patrol Agents', attritionRate: 4.2, replacementCost: 150000, workersCompClaims: 2883, avgClaimCost: 41000}
  ];

  const getLeadPrice = (seats) => {
    if (use6MonthLead) {
      if (seats >= 1000) return 3471;
      if (seats >= 500) return 3549;
      return 3900;
    } else {
      if (seats >= 1000) return 5785;
      if (seats >= 500) return 5915;
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
    const org = selectedOrganization || organizations[1];
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

  const isOFO = selectedOrganization?.id === 'ofo';

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    if (searchTerm) filtered = filtered.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
  }, [searchTerm]);

  if (showExecutiveSummary) {
    return (
      <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <h1 style={{fontSize: '48px', fontWeight: 'bold', color: '#003d82', marginBottom: '24px'}}>CBP Mental Health ROI Calculator</h1>
          <p style={{fontSize: '24px', color: '#64748b', marginBottom: '40px'}}>Evidence-Based Financial Impact Analysis</p>
          <button 
            onClick={() => {setShowExecutiveSummary(false); setShowLanding(true);}}
            style={{background: '#0066cc', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'}}
          >
            Get Started →
          </button>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div style={{width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
        <button onClick={() => setShowExecutiveSummary(true)} style={{marginBottom: '16px', color: '#666', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px', fontWeight: '600'}}>
          ← Back
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
                    cursor: 'pointer'
                  }}
                >
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 'bold', fontSize: '20px', color: '#003d82', marginBottom: '6px'}}>{org.name}</div>
                    <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>{org.description}</div>
                    <div style={{fontSize: '13px', color: '#999'}}>{fmtNum(org.personnel)} personnel</div>
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
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <Shield size={40} color="#ffcc00" />
          <div>
            <h1 style={{fontSize: '28px', fontWeight: 'bold', margin: 0}}>{selectedOrganization?.name || 'CBP'} ROI Dashboard</h1>
            <p style={{fontSize: '14px', color: '#cbd5e1', margin: '4px 0 0 0'}}>{fmtNum(totalPersonnel)} personnel</p>
          </div>
        </div>
      </div>

      <div style={{marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
        {[
          {id: 'cost-problem', label: 'Cost Problem', icon: '💰'},
          {id: 'roi-model', label: 'ROI Model', icon: '📊'},
          {id: 'factors', label: 'Factors', icon: '🔬'},
          {id: 'proof', label: 'Proof', icon: '✓'},
          {id: 'implementation', label: 'Implementation', icon: '🚀'}
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            style={{
              padding: '12px 20px', 
              fontWeight: '600', 
              borderRadius: '8px', 
              border: activeTab === tab.id ? 'none' : '2px solid #e5e7eb', 
              background: activeTab === tab.id ? '#0066cc' : 'white', 
              color: activeTab === tab.id ? 'white' : '#003d82', 
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'cost-problem' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div style={{background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: '0 8px 32px rgba(220,38,38,0.3)', border: '4px solid #7f1d1d'}}>
            <div style={{fontSize: '18px', color: '#fecaca', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px'}}>
              {selectedOrganization?.name || 'CBP'} Currently Pays
            </div>
            <div style={{fontSize: '72px', fontWeight: 'bold', color: 'white', marginBottom: '16px', lineHeight: 1}}>
              {fmt(Math.round((calculations.workersCompSavings + calculations.retentionSavings + calculations.disciplineSavings) / 0.22))}
            </div>
            <div style={{fontSize: '28px', color: '#fecaca', fontWeight: '600', marginBottom: '24px'}}>
              Every Year on Three Workforce Problems
            </div>
            <div style={{background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px', maxWidth: '900px', margin: '0 auto'}}>
              <p style={{fontSize: '18px', color: 'white', margin: 0, lineHeight: 1.6}}>
                Your current programs (EAP, training, resiliency initiatives) haven't stopped these costs. <strong style={{color: '#fef08a'}}>You keep paying them year after year.</strong>
              </p>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
            
            <div style={{background: 'white', borderRadius: '16px', padding: '32px', border: '4px solid #dc2626', boxShadow: '0 4px 20px rgba(220,38,38,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <div style={{width: '56px', height: '56px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0}}>
                  💊
                </div>
                <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#991b1b', margin: 0}}>
                  PTSD & Mental Health Workers' Comp
                </h3>
              </div>
              
              <div style={{fontSize: '48px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px'}}>
                {fmt(Math.round(calculations.workersCompSavings / 0.22))}
              </div>
              
              <div style={{background: '#fee2e2', borderRadius: '10px', padding: '16px', marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#7f1d1d', marginBottom: '8px'}}>
                  <strong>{Math.round(calculations.claimsPrevented / 0.22).toLocaleString()} mental health claims</strong> annually
                </div>
                <div style={{fontSize: '13px', color: '#991b1b'}}>
                  PTSD, Depression, Anxiety, Substance Use Disorder
                </div>
              </div>
              
              <div style={{fontSize: '14px', color: '#7f1d1d', lineHeight: 1.6}}>
                <strong>The Pattern:</strong> Officers exposed to trauma (deaths, violence, child welfare crises) develop PTSD, depression, or turn to alcohol. Claims filed. Treatment costs mount. Disability payments continue.
              </div>
            </div>

            <div style={{background: 'white', borderRadius: '16px', padding: '32px', border: '4px solid #f59e0b', boxShadow: '0 4px 20px rgba(245,158,11,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <div style={{width: '56px', height: '56px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0}}>
                  🚪
                </div>
                <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#92400e', margin: 0}}>
                  Retention Crisis & Turnover
                </h3>
              </div>
              
              <div style={{fontSize: '48px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '16px'}}>
                {fmt(Math.round(calculations.retentionSavings / (retentionEffectiveness / 100)))}
              </div>
              
              <div style={{background: '#fef3c7', borderRadius: '10px', padding: '16px', marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#78350f', marginBottom: '8px'}}>
                  <strong>{Math.round(calculations.preventedSeparations / (retentionEffectiveness / 100)).toLocaleString()} officers separate</strong> annually
                </div>
                <div style={{fontSize: '13px', color: '#92400e'}}>
                  $150K replacement cost each
                </div>
              </div>
              
              <div style={{fontSize: '14px', color: '#78350f', lineHeight: 1.6}}>
                <strong>The Pattern:</strong> Burnout from mandatory overtime and TDYs. No career development. Toxic leadership. Officers hit 3-5 years and leave.
              </div>
              
              {isOFO && (
                <div style={{background: '#fffbeb', border: '2px solid #fbbf24', borderRadius: '8px', padding: '12px', marginTop: '12px'}}>
                  <div style={{fontSize: '13px', color: '#92400e', fontWeight: 'bold'}}>
                    ⚠️ 2028: 2,220 officers retiring (400% increase)
                  </div>
                </div>
              )}
            </div>

            <div style={{background: 'white', borderRadius: '16px', padding: '32px', border: '4px solid #7c3aed', boxShadow: '0 4px 20px rgba(124,58,237,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <div style={{width: '56px', height: '56px', background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0}}>
                  ⚖️
                </div>
                <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#5b21b6', margin: 0}}>
                  Discipline & Misconduct
                </h3>
              </div>
              
              <div style={{fontSize: '48px', fontWeight: 'bold', color: '#7c3aed', marginBottom: '16px'}}>
                {fmt(Math.round(calculations.disciplineSavings / 0.15))}
              </div>
              
              <div style={{background: '#f3e8ff', borderRadius: '10px', padding: '16px', marginBottom: '16px'}}>
                <div style={{fontSize: '14px', color: '#5b21b6', marginBottom: '8px'}}>
                  <strong>{Math.round(calculations.totalPreventedDiscipline / 0.15).toLocaleString()} cases</strong> annually
                </div>
                <div style={{fontSize: '13px', color: '#6b21a8'}}>
                  Stress-related misconduct, alcohol incidents
                </div>
              </div>
              
              <div style={{fontSize: '14px', color: '#5b21b6', lineHeight: 1.6}}>
                <strong>The Pattern:</strong> Chronic stress leads to poor decisions. Alcohol misuse escalates. Incidents occur. OPR investigates. Careers end.
              </div>
            </div>

          </div>

          <div style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '16px', padding: '40px', border: '4px solid #475569'}}>
            <div style={{textAlign: 'center', marginBottom: '32px'}}>
              <h2 style={{fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '16px'}}>
                These Aren't Three Problems — They're One Problem
              </h2>
              <p style={{fontSize: '20px', color: '#cbd5e1', maxWidth: '900px', margin: '0 auto'}}>
                All three cost buckets share the same root causes. Addressing these behavioral foundations prevents costs across all three pathways.
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'}}>
              {[
                {label: 'Chronic Stress & Burnout', desc: 'Drives PTSD, turnover, poor judgment', color: '#ef4444'},
                {label: 'Lack of Purpose & Career Development', desc: 'Drives separations, disengagement', color: '#f59e0b'},
                {label: 'Toxic Leadership Culture', desc: 'Drives retention crisis, misconduct', color: '#8b5cf6'},
                {label: 'Alcohol & Substance Misuse', desc: 'Drives claims, discipline, deaths', color: '#ec4899'}
              ].map((cause, i) => (
                <div key={i} style={{background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', border: '2px solid rgba(255,255,255,0.2)'}}>
                  <div style={{width: '12px', height: '12px', background: cause.color, borderRadius: '50%', marginBottom: '12px'}}></div>
                  <div style={{fontSize: '15px', fontWeight: 'bold', color: 'white', marginBottom: '8px'}}>{cause.label}</div>
                  <div style={{fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5}}>{cause.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background: '#fffbeb', border: '4px solid #f59e0b', borderRadius: '16px', padding: '32px'}}>
            <div style={{display: 'flex', alignItems: 'start', gap: '20px'}}>
              <div style={{fontSize: '48px', flexShrink: 0}}>⚠️</div>
              <div>
                <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px'}}>
                  Your Current Approach Isn't Working
                </h3>
                <p style={{fontSize: '16px', color: '#78350f', marginBottom: '16px', lineHeight: 1.7}}>
                  CBP has EAP services, resilience training programs, and wellness initiatives. Despite these efforts, you're still paying <strong>{fmt(Math.round((calculations.workersCompSavings + calculations.retentionSavings + calculations.disciplineSavings) / 0.22))}</strong> annually. The costs persist because:
                </p>
                <ul style={{fontSize: '15px', color: '#78350f', lineHeight: 1.8, margin: '0 0 16px 20px'}}>
                  <li>One-off training creates temporary peaks, but behavioral change requires continuous reinforcement</li>
                  <li>Episodic workshops don't rewire habits — officers default to old patterns under stress</li>
                  <li>Stigma prevents help-seeking — officers fear career consequences for admitting struggle</li>
                  <li>Leadership doesn't have the skills to create psychological safety and development culture</li>
                </ul>
                <div style={{background: '#fef3c7', borderRadius: '10px', padding: '16px', border: '2px solid #fbbf24'}}>
                  <p style={{fontSize: '15px', color: '#78350f', margin: 0, fontWeight: '600'}}>
                    The question isn't whether to invest in your workforce. <strong style={{color: '#92400e'}}>You're already investing {fmt(Math.round((calculations.workersCompSavings + calculations.retentionSavings + calculations.disciplineSavings) / 0.22))} — you're just getting zero return.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, #0066cc 0%, #003d82 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center'}}>
            <h3 style={{fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '16px'}}>
              What If You Could Prevent 22-79% of These Costs?
            </h3>
            <p style={{fontSize: '18px', color: '#dbeafe', marginBottom: '32px', maxWidth: '800px', margin: '0 auto 32px'}}>
              Evidence-based interventions targeting the behavioral root causes can prevent costs across all three pathways. See your projected ROI based on proven Air Force outcomes.
            </p>
            <button 
              onClick={() => setActiveTab('roi-model')}
              style={{background: '#ffcc00', color: '#003d82', border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,204,0,0.4)', transition: 'transform 0.2s'}}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              See Your ROI Model →
            </button>
          </div>

        </div>
      )}

      {activeTab === 'roi-model' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          
          <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '3px solid #0066cc'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
              <Calculator size={24} color="#0066cc" />
              <h3 style={{fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#003d82'}}>Course of Action (COA) Selection</h3>
            </div>
            <p style={{fontSize: '14px', color: '#64748b', marginBottom: '16px'}}>Select a COA to auto-configure seat mix, engagement assumptions, and performance priorities:</p>
            <div style={{display: 'flex', gap: '12px'}}>
              <button 
                onClick={() => applyCOA(1)} 
                style={{flex: 1, padding: '20px', background: '#d1d5db', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'transform 0.2s'}}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '6px'}}>COA 1</div>
                <div style={{fontSize: '12px', color: '#64748b'}}>Conservative • Prove Value</div>
              </button>
              <button 
                onClick={() => applyCOA(2)} 
                style={{flex: 1, padding: '20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'transform 0.2s'}}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '6px'}}>COA 2</div>
                <div style={{fontSize: '12px', opacity: 0.9}}>Moderate • Balanced</div>
              </button>
              <button 
                onClick={() => applyCOA(3)} 
                style={{flex: 1, padding: '20px', background: '#003d82', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px', transition: 'transform 0.2s'}}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '6px'}}>COA 3</div>
                <div style={{fontSize: '12px', opacity: 0.9}}>Aggressive • Max Impact</div>
              </button>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '3px solid #10b981', borderRadius: '12px', padding: '32px'}}>
            <div style={{textAlign: 'center', marginBottom: '24px'}}>
              <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px'}}>Projected Annual Impact</h2>
              <p style={{fontSize: '16px', color: '#047857'}}>
                BetterUp saves {selectedOrganization?.name || 'CBP'} <strong style={{color: '#059669', fontSize: '20px'}}>{fmt(calculations.netSavings)}</strong> annually
              </p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px'}}>
              <div style={{background: 'white', border: '4px solid #10b981', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 16px rgba(16,185,129,0.2)', textAlign: 'center'}}>
                <div style={{fontSize: '14px', color: '#047857', marginBottom: '12px', fontWeight: '600'}}>NET ANNUAL SAVINGS</div>
                <div style={{fontSize: '48px', fontWeight: 'bold', color: '#059669', marginBottom: '8px'}}>{fmt(calculations.netSavings)}</div>
                <div style={{fontSize: '14px', color: '#047857'}}>After {fmt(calculations.programCost)} program cost</div>
                <div style={{fontSize: '16px', fontWeight: 'bold', color: '#10b981', marginTop: '12px'}}>ROI: {calculations.roi}%</div>
              </div>

              <div style={{background: 'white', border: '3px solid #64748b', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center'}}>
                <div style={{fontSize: '14px', color: '#475569', marginBottom: '12px', fontWeight: '600'}}>TOTAL SEATS</div>
                <div style={{fontSize: '48px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px'}}>{fmtNum(leadSeats + readySeats)}</div>
                <div style={{fontSize: '13px', color: '#64748b'}}>Lead: {fmtNum(leadSeats)} • Ready: {fmtNum(readySeats)}</div>
                <div style={{fontSize: '13px', color: '#64748b', marginTop: '8px'}}>Engagement: {engagementRate}% ({fmtNum(calculations.engaged)} active)</div>
              </div>

              <div style={{background: 'white', border: '3px solid #64748b', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center'}}>
                <div style={{fontSize: '14px', color: '#475569', marginBottom: '12px', fontWeight: '600'}}>PERSONNEL IMPACTED</div>
                <div style={{fontSize: '48px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px'}}>{fmtNum(calculations.preventedSeparations + calculations.readinessImproved)}</div>
                <div style={{fontSize: '13px', color: '#64748b'}}>Retention & readiness improvements</div>
              </div>
            </div>

            <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #d1fae5'}}>
              <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', marginBottom: '16px', textAlign: 'center'}}>Three Independent Value Pathways Contributing to Total Above</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                
                <div style={{background: '#fef2f2', border: '2px solid #fca5a5', borderRadius: '10px', padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                    <div style={{width: '32px', height: '32px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold'}}>1</div>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#991b1b', margin: 0}}>Workers' Comp</h4>
                  </div>
                  <div style={{fontSize: '28px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px'}}>{fmt(calculations.workersCompSavings)}</div>
                  <div style={{fontSize: '13px', color: '#7f1d1d', marginBottom: '4px'}}><strong>{fmtNum(calculations.claimsPrevented)} claims</strong> prevented</div>
                  <div style={{fontSize: '12px', color: '#991b1b'}}>Healthier workforce, reduced disability costs</div>
                </div>

                <div style={{background: '#fef3c7', border: '2px solid #fcd34d', borderRadius: '10px', padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                    <div style={{width: '32px', height: '32px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold'}}>2</div>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#92400e', margin: 0}}>Retention</h4>
                  </div>
                  <div style={{fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px'}}>{fmt(calculations.retentionSavings)}</div>
                  <div style={{fontSize: '13px', color: '#78350f', marginBottom: '4px'}}><strong>{fmtNum(calculations.preventedSeparations)} separations</strong> prevented</div>
                  <div style={{fontSize: '12px', color: '#92400e'}}>Institutional knowledge preserved</div>
                  {leadSeats > 0 && <div style={{fontSize: '11px', color: '#eab308', fontWeight: '600', marginTop: '8px'}}>💼 {fmtNum(calculations.leadershipRetentionContribution)} from Lead</div>}
                </div>

                <div style={{background: '#f3e8ff', border: '2px solid #d8b4fe', borderRadius: '10px', padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
                    <div style={{width: '32px', height: '32px', background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold'}}>3</div>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#6b21a8', margin: 0}}>Discipline Prevention</h4>
                  </div>
                  <div style={{fontSize: '28px', fontWeight: 'bold', color: '#7c3aed', marginBottom: '8px'}}>{fmt(calculations.disciplineSavings)}</div>
                  <div style={{fontSize: '13px', color: '#7e22ce', marginBottom: '4px'}}><strong>{fmtNum(calculations.totalPreventedDiscipline)} cases</strong> prevented</div>
                  <div style={{fontSize: '12px', color: '#6b21a8'}}>Reduced OPR workload, preserved careers</div>
                </div>

              </div>
            </div>
          </div>

          {isOFO && (
            <div style={{background: '#fffbeb', border: '4px solid #f59e0b', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(245,158,11,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '40px', height: '40px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>⚠️</div>
                <div>
                  <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#92400e', margin: 0}}>2028 OFO Retirement Crisis</h3>
                  <p style={{fontSize: '16px', color: '#92400e', margin: '4px 0 0 0'}}>
                    <strong>2,220 CBP Officers</strong> retiring in 2028—a <strong>400% increase</strong> over normal
                  </p>
                </div>
              </div>
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
                <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#713f12', margin: 0}}>Leadership Culture Transformation</h3>
              </div>
              <p style={{fontSize: '14px', color: '#854d0e', marginBottom: '16px', lineHeight: 1.6}}>
                <strong>{fmtNum(leadSeats)} Lead seats</strong> build command climate through unlimited 1:1 coaching
              </p>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #fbbf24'}}>
                  <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>Retention Impact</div>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#713f12'}}>{fmtNum(calculations.leadershipRetentionContribution)}</div>
                  <div style={{fontSize: '12px', color: '#854d0e'}}>separations prevented (~40% of total)</div>
                </div>
                <div style={{background: 'white', borderRadius: '10px', padding: '16px', border: '2px solid #fbbf24'}}>
                  <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>WC Impact</div>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: '#713f12'}}>{fmtNum(calculations.leadershipClaimContribution)}</div>
                  <div style={{fontSize: '12px', color: '#854d0e'}}>claims prevented through psych safety</div>
                </div>
              </div>
            </div>
          )}

          <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #003d82'}}>
            <div style={{background: '#003d82', color: 'white', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Settings size={20} color="#ffcc00" />
              <h4 style={{fontSize: '16px', fontWeight: '600', margin: 0}}>Advanced Settings</h4>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              
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
                      if (newLead === 0) setLeadershipCultureImprovement(0);
                    }} 
                    style={{width: '100%', height: '8px', accentColor: '#a855f7'}}
                  />
                  <div style={{fontSize: '11px', color: '#64748b', marginTop: '4px'}}>@ {fmt(calculations.leadPrice)}/seat</div>
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
                  <div style={{fontSize: '11px', color: '#64748b', marginTop: '4px'}}>@ $150/seat</div>
                </div>
              </div>

              <div>
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
              </div>

            </div>
          </div>

        </div>
      )}

      {activeTab === 'factors' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '3px solid #0066cc'}}>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#003d82', marginBottom: '16px'}}>Factor Breakdown: Validate the Model</h2>
            <p style={{fontSize: '16px', color: '#475569', lineHeight: 1.7, marginBottom: '16px'}}>
              This section allows power users to adjust the underlying assumptions driving the ROI calculations. Each mental health condition has three adjustable parameters:
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
              <div style={{background: '#eff6ff', padding: '12px', borderRadius: '8px', border: '2px solid #3b82f6'}}>
                <div style={{fontSize: '13px', fontWeight: 'bold', color: '#1e40af', marginBottom: '4px'}}>Coaching Effectiveness</div>
                <div style={{fontSize: '12px', color: '#1e3a8a'}}>What % of cases can prevention reduce?</div>
              </div>
              <div style={{background: '#eff6ff', padding: '12px', borderRadius: '8px', border: '2px solid #3b82f6'}}>
                <div style={{fontSize: '13px', fontWeight: 'bold', color: '#1e40af', marginBottom: '4px'}}>WC Filing Rate</div>
                <div style={{fontSize: '12px', color: '#1e3a8a'}}>What % of clinical cases file claims?</div>
              </div>
              <div style={{background: '#eff6ff', padding: '12px', borderRadius: '8px', border: '2px solid #3b82f6'}}>
                <div style={{fontSize: '13px', fontWeight: 'bold', color: '#1e40af', marginBottom: '4px'}}>WC Acceptance Rate</div>
                <div style={{fontSize: '12px', color: '#1e3a8a'}}>What % of filed claims get accepted?</div>
              </div>
            </div>
          </div>

          <div style={{background: 'white', borderRadius: '12px', border: '3px solid #dc2626', overflow: 'hidden'}}>
            <div 
              onClick={() => setExpandedFactor(expandedFactor === 'ptsd' ? null : 'ptsd')}
              style={{padding: '24px', cursor: 'pointer', background: expandedFactor === 'ptsd' ? '#fef2f2' : 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>P</div>
                <div>
                  <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#991b1b', margin: 0}}>PTSD (Post-Traumatic Stress Disorder)</h3>
                  <p style={{fontSize: '14px', color: '#7f1d1d', margin: '4px 0 0 0'}}>Prevalence: 15-20% | {Math.round((selectedOrganization?.personnel || 25879) * 0.18).toLocaleString()} officers affected</p>
                </div>
              </div>
              {expandedFactor === 'ptsd' ? <ChevronUp size={24} color="#dc2626" /> : <ChevronDown size={24} color="#dc2626" />}
            </div>

            {expandedFactor === 'ptsd' && (
              <div style={{padding: '24px', background: '#fef2f2', borderTop: '2px solid #fca5a5'}}>
                
                <div style={{marginBottom: '24px'}}>
                  <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#991b1b', marginBottom: '12px'}}>About PTSD in Law Enforcement</h4>
                  <p style={{fontSize: '14px', color: '#7f1d1d', lineHeight: 1.6, marginBottom: '12px'}}>
                    Officers exposed to 188 critical incidents over careers develop PTSD at 3-5x civilian rates. Symptoms include intrusive memories, hypervigilance, avoidance behaviors, and emotional dysregulation affecting decision-making and family life.
                  </p>
                  <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fca5a5'}}>
                    <div style={{fontSize: '13px', color: '#991b1b', fontWeight: 'bold', marginBottom: '4px'}}>Sources:</div>
                    <div style={{fontSize: '12px', color: '#7f1d1d'}}>
                      UK Police (n=40,299): 20.5% PTSD | Dallas PD: 26% with mental illness | Conservative baseline: 15-20%
                    </div>
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px'}}>
                  
                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #fca5a5'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#991b1b', marginBottom: '8px'}}>
                      Coaching Effectiveness: {ptsdEffectiveness}%
                    </label>
                    <input 
                      type="range" 
                      min="15" 
                      max="35" 
                      value={ptsdEffectiveness} 
                      onChange={(e) => setPtsdEffectiveness(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#dc2626'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7f1d1d', marginTop: '4px'}}>
                      <span>15%</span>
                      <span>25%</span>
                      <span>35%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#991b1b', marginTop: '8px', background: '#fee2e2', padding: '8px', borderRadius: '4px'}}>
                      Standard: 25%
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #fca5a5'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#991b1b', marginBottom: '8px'}}>
                      WC Filing Rate: {ptsdFilingRate}%
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="15" 
                      value={ptsdFilingRate} 
                      onChange={(e) => setPtsdFilingRate(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#dc2626'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7f1d1d', marginTop: '4px'}}>
                      <span>5%</span>
                      <span>10%</span>
                      <span>15%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#991b1b', marginTop: '8px', background: '#fee2e2', padding: '8px', borderRadius: '4px'}}>
                      Standard: 10%
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #fca5a5'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#991b1b', marginBottom: '8px'}}>
                      WC Acceptance: {ptsdAcceptanceRate}%
                    </label>
                    <input 
                      type="range" 
                      min="30" 
                      max="70" 
                      value={ptsdAcceptanceRate} 
                      onChange={(e) => setPtsdAcceptanceRate(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#dc2626'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#7f1d1d', marginTop: '4px'}}>
                      <span>30%</span>
                      <span>50%</span>
                      <span>70%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#991b1b', marginTop: '8px', background: '#fee2e2', padding: '8px', borderRadius: '4px'}}>
                      Standard: 50%
                    </div>
                  </div>

                </div>

                <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #dc2626'}}>
                  <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#991b1b', marginBottom: '12px'}}>Cost Impact Calculation</h4>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
                    <div style={{background: '#fef2f2', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#7f1d1d', marginBottom: '4px'}}>Affected Officers</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#dc2626'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.18).toLocaleString()}</div>
                    </div>
                    <div style={{background: '#fef2f2', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#7f1d1d', marginBottom: '4px'}}>Cases Prevented</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#dc2626'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.18 * (ptsdEffectiveness / 100)).toLocaleString()}</div>
                    </div>
                    <div style={{background: '#fef2f2', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#7f1d1d', marginBottom: '4px'}}>WC Claims Prevented</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#dc2626'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.18 * (ptsdEffectiveness / 100) * (ptsdFilingRate / 100) * (ptsdAcceptanceRate / 100)).toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{marginTop: '12px', padding: '12px', background: '#fee2e2', borderRadius: '8px'}}>
                    <div style={{fontSize: '13px', color: '#991b1b', fontWeight: 'bold'}}>
                      Annual Savings: {fmt((Math.round((selectedOrganization?.personnel || 25879) * 0.18 * (ptsdEffectiveness / 100) * (ptsdFilingRate / 100) * (ptsdAcceptanceRate / 100))) * 65000)}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div style={{background: 'white', borderRadius: '12px', border: '3px solid #f59e0b', overflow: 'hidden'}}>
            <div 
              onClick={() => setExpandedFactor(expandedFactor === 'depression' ? null : 'depression')}
              style={{padding: '24px', cursor: 'pointer', background: expandedFactor === 'depression' ? '#fffbeb' : 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>D</div>
                <div>
                  <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#92400e', margin: 0}}>Depression</h3>
                  <p style={{fontSize: '14px', color: '#78350f', margin: '4px 0 0 0'}}>Prevalence: 15-20% | {Math.round((selectedOrganization?.personnel || 25879) * 0.18).toLocaleString()} officers affected</p>
                </div>
              </div>
              {expandedFactor === 'depression' ? <ChevronUp size={24} color="#f59e0b" /> : <ChevronDown size={24} color="#f59e0b" />}
            </div>

            {expandedFactor === 'depression' && (
              <div style={{padding: '24px', background: '#fffbeb', borderTop: '2px solid #fcd34d'}}>
                
                <div style={{marginBottom: '24px'}}>
                  <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px'}}>About Depression in Law Enforcement</h4>
                  <p style={{fontSize: '14px', color: '#78350f', lineHeight: 1.6, marginBottom: '12px'}}>
                    Officers face 2x elevated depression risk. Symptoms include persistent sadness, loss of interest, fatigue, difficulty concentrating. Depression drives massive presenteeism costs (20-30% productivity loss) and is highly treatable.
                  </p>
                  <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fcd34d'}}>
                    <div style={{fontSize: '13px', color: '#92400e', fontWeight: 'bold', marginBottom: '4px'}}>Sources:</div>
                    <div style={{fontSize: '12px', color: '#78350f'}}>
                      Dallas PD: 44% of mental illness cases had depression | UK Police: 9.8% | CuraLinc: 59% severity reduction
                    </div>
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px'}}>
                  
                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #fcd34d'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>
                      Effectiveness: {depressionEffectiveness}%
                    </label>
                    <input 
                      type="range" 
                      min="15" 
                      max="35" 
                      value={depressionEffectiveness} 
                      onChange={(e) => setDepressionEffectiveness(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#f59e0b'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#78350f', marginTop: '4px'}}>
                      <span>15%</span>
                      <span>25%</span>
                      <span>35%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#92400e', marginTop: '8px', background: '#fef3c7', padding: '8px', borderRadius: '4px'}}>
                      Standard: 25%
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #fcd34d'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>
                      Filing Rate: {depressionFilingRate}%
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="15" 
                      value={depressionFilingRate} 
                      onChange={(e) => setDepressionFilingRate(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#f59e0b'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#78350f', marginTop: '4px'}}>
                      <span>5%</span>
                      <span>10%</span>
                      <span>15%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#92400e', marginTop: '8px', background: '#fef3c7', padding: '8px', borderRadius: '4px'}}>
                      Standard: 10%
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #fcd34d'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>
                      Acceptance: {depressionAcceptanceRate}%
                    </label>
                    <input 
                      type="range" 
                      min="30" 
                      max="70" 
                      value={depressionAcceptanceRate} 
                      onChange={(e) => setDepressionAcceptanceRate(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#f59e0b'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#78350f', marginTop: '4px'}}>
                      <span>30%</span>
                      <span>50%</span>
                      <span>70%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#92400e', marginTop: '8px', background: '#fef3c7', padding: '8px', borderRadius: '4px'}}>
                      Standard: 50%
                    </div>
                  </div>

                </div>

                <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #f59e0b'}}>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
                    <div style={{background: '#fffbeb', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#78350f', marginBottom: '4px'}}>Affected</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#f59e0b'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.18).toLocaleString()}</div>
                    </div>
                    <div style={{background: '#fffbeb', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#78350f', marginBottom: '4px'}}>Prevented</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#f59e0b'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.18 * (depressionEffectiveness / 100)).toLocaleString()}</div>
                    </div>
                    <div style={{background: '#fffbeb', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#78350f', marginBottom: '4px'}}>Savings</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#f59e0b'}}>{fmt((Math.round((selectedOrganization?.personnel || 25879) * 0.18 * (depressionEffectiveness / 100) * (depressionFilingRate / 100) * (depressionAcceptanceRate / 100))) * 65000)}</div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div style={{background: 'white', borderRadius: '12px', border: '3px solid #7c3aed', overflow: 'hidden'}}>
            <div 
              onClick={() => setExpandedFactor(expandedFactor === 'sud' ? null : 'sud')}
              style={{padding: '24px', cursor: 'pointer', background: expandedFactor === 'sud' ? '#f3e8ff' : 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>S</div>
                <div>
                  <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#5b21b6', margin: 0}}>Substance Use Disorder (SUD)</h3>
                  <p style={{fontSize: '14px', color: '#6b21a8', margin: '4px 0 0 0'}}>Prevalence: 20-30% | {Math.round((selectedOrganization?.personnel || 25879) * 0.25).toLocaleString()} officers affected</p>
                </div>
              </div>
              {expandedFactor === 'sud' ? <ChevronUp size={24} color="#7c3aed" /> : <ChevronDown size={24} color="#7c3aed" />}
            </div>

            {expandedFactor === 'sud' && (
              <div style={{padding: '24px', background: '#f3e8ff', borderTop: '2px solid #d8b4fe'}}>
                
                <div style={{marginBottom: '24px'}}>
                  <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '12px'}}>About SUD in Law Enforcement</h4>
                  <p style={{fontSize: '14px', color: '#6b21a8', lineHeight: 1.6, marginBottom: '12px'}}>
                    25% have alcohol misuse issues—triple civilian rates. 33% binge drinking past month. Often used to self-medicate PTSD. 41.6% of LE arrests are alcohol/drug-related.
                  </p>
                  <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d8b4fe'}}>
                    <div style={{fontSize: '13px', color: '#5b21b6', fontWeight: 'bold', marginBottom: '4px'}}>Sources:</div>
                    <div style={{fontSize: '12px', color: '#6b21a8'}}>
                      NIH: 18.1% male/15.9% female adverse consequences | CuraLinc: 67% severity reduction, 78% at-risk elimination
                    </div>
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px'}}>
                  
                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #d8b4fe'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '8px'}}>
                      Effectiveness: {sudEffectiveness}%
                    </label>
                    <input 
                      type="range" 
                      min="60" 
                      max="78" 
                      value={sudEffectiveness} 
                      onChange={(e) => setSudEffectiveness(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#7c3aed'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b21a8', marginTop: '4px'}}>
                      <span>60%</span>
                      <span>67%</span>
                      <span>78%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#5b21b6', marginTop: '8px', background: '#f3e8ff', padding: '8px', borderRadius: '4px'}}>
                      Standard: 67% (CuraLinc)
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #d8b4fe'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '8px'}}>
                      Filing Rate: {sudFilingRate}%
                    </label>
                    <input 
                      type="range" 
                      min="5" 
                      max="15" 
                      value={sudFilingRate} 
                      onChange={(e) => setSudFilingRate(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#7c3aed'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b21a8', marginTop: '4px'}}>
                      <span>5%</span>
                      <span>10%</span>
                      <span>15%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#5b21b6', marginTop: '8px', background: '#f3e8ff', padding: '8px', borderRadius: '4px'}}>
                      Standard: 10%
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #d8b4fe'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '8px'}}>
                      Acceptance: {sudAcceptanceRate}%
                    </label>
                    <input 
                      type="range" 
                      min="30" 
                      max="70" 
                      value={sudAcceptanceRate} 
                      onChange={(e) => setSudAcceptanceRate(Number(e.target.value))} 
                      style={{width: '100%', height: '8px', accentColor: '#7c3aed'}}
                    />
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#6b21a8', marginTop: '4px'}}>
                      <span>30%</span>
                      <span>50%</span>
                      <span>70%</span>
                    </div>
                    <div style={{fontSize: '12px', color: '#5b21b6', marginTop: '8px', background: '#f3e8ff', padding: '8px', borderRadius: '4px'}}>
                      Standard: 50%
                    </div>
                  </div>

                </div>

                <div style={{background: 'white', padding: '16px', borderRadius: '10px', border: '2px solid #7c3aed'}}>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
                    <div style={{background: '#f3e8ff', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#6b21a8', marginBottom: '4px'}}>Affected</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#7c3aed'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.25).toLocaleString()}</div>
                    </div>
                    <div style={{background: '#f3e8ff', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#6b21a8', marginBottom: '4px'}}>Prevented</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#7c3aed'}}>{Math.round((selectedOrganization?.personnel || 25879) * 0.25 * (sudEffectiveness / 100)).toLocaleString()}</div>
                    </div>
                    <div style={{background: '#f3e8ff', padding: '12px', borderRadius: '8px'}}>
                      <div style={{fontSize: '12px', color: '#6b21a8', marginBottom: '4px'}}>Savings</div>
                      <div style={{fontSize: '20px', fontWeight: 'bold', color: '#7c3aed'}}>{fmt((Math.round((selectedOrganization?.personnel || 25879) * 0.25 * (sudEffectiveness / 100) * (sudFilingRate / 100) * (sudAcceptanceRate / 100))) * 65000)}</div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      )}

      {activeTab === 'proof' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div style={{background: 'white', borderRadius: '16px', padding: '32px', border: '3px solid #3b82f6', boxShadow: '0 4px 20px rgba(59,130,246,0.15)'}}>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#1e40af', marginBottom: '24px', textAlign: 'center'}}>Air Force Proven Results (2021-2025)</h2>
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
              {['+13% Individual Readiness', '+7% Career Commitment', '+15% Unit Readiness'].map((result, i) => (
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
                <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#6b21a8', textAlign: 'center', marginBottom: '16px'}}>Enterprise & Federal Results</h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                  {[
                    {value: '+18%', label: 'Leadership Capability', sub: 'Enterprise clients'},
                    {value: '+22%', label: 'Manager Effectiveness', sub: '360° assessments'},
                    {value: '85%', label: 'Client Satisfaction', sub: 'Commercial & government'}
                  ].map((metric, i) => (
                    <div key={i} style={{background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '2px solid #a78bfa'}}>
                      <div style={{fontSize: '32px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '8px'}}>{metric.value}</div>
                      <div style={{fontSize: '14px', fontWeight: 'bold', color: '#7e22ce', marginBottom: '4px'}}>{metric.label}</div>
                      <div style={{fontSize: '12px', color: '#9333ea'}}>{metric.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', border: '3px solid #dc2626', borderRadius: '16px', padding: '32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
              <div style={{width: '56px', height: '56px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'}}>📄</div>
              <div>
                <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#991b1b', margin: 0}}>Peer-Reviewed Research: JAMA 2024</h2>
                <p style={{fontSize: '14px', color: '#7f1d1d', margin: '4px 0 0 0'}}>Independent validation of mental health outcomes</p>
              </div>
            </div>
            <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #fca5a5'}}>
              <div style={{fontSize: '48px', fontWeight: 'bold', color: '#dc2626', textAlign: 'center', marginBottom: '12px'}}>21.6%</div>
              <p style={{fontSize: '18px', color: '#991b1b', textAlign: 'center', marginBottom: '16px', fontWeight: '600'}}>
                Reduction in burnout & mental health conditions
              </p>
              <div style={{fontSize: '14px', color: '#7f1d1d', lineHeight: 1.6}}>
                Published in Journal of the American Medical Association Network Open. Study demonstrated clinically significant improvements in burnout prevention, stress management, and mental health outcomes.
              </div>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '3px solid #16a34a', borderRadius: '16px', padding: '32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
              <div style={{width: '56px', height: '56px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'}}>🛡️</div>
              <div>
                <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#15803d', margin: 0}}>Montreal Police: 79% Suicide Reduction</h2>
                <p style={{fontSize: '14px', color: '#166534', margin: '4px 0 0 0'}}>22-year peer-reviewed study - the gold standard</p>
              </div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #86efac'}}>
                <div style={{fontSize: '14px', color: '#166534', marginBottom: '8px', fontWeight: '600'}}>Baseline (1986-1996)</div>
                <div style={{fontSize: '36px', fontWeight: 'bold', color: '#dc2626', marginBottom: '4px'}}>30.5 per 100K</div>
                <div style={{fontSize: '13px', color: '#166534'}}>14 suicides in 11 years</div>
              </div>
              <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #86efac'}}>
                <div style={{fontSize: '14px', color: '#166534', marginBottom: '8px', fontWeight: '600'}}>Post-Program (1997-2018)</div>
                <div style={{fontSize: '36px', fontWeight: 'bold', color: '#16a34a', marginBottom: '4px'}}>6.4 per 100K</div>
                <div style={{fontSize: '13px', color: '#166534'}}>4 suicides in 12 years (79% reduction)</div>
              </div>
            </div>
            <div style={{background: '#dcfce7', borderRadius: '10px', padding: '16px', marginTop: '16px', border: '2px solid #86efac'}}>
              <p style={{fontSize: '13px', color: '#15803d', margin: 0, lineHeight: 1.6}}>
                <strong>Program:</strong> Universal training, supervisor crisis intervention, 24/7 peer support, ongoing campaign. Published in Crisis journal.
              </p>
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', border: '4px solid #6366f1', borderRadius: '16px', padding: '32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
              <div style={{width: '48px', height: '48px', background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>📚</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#4338ca', margin: 0}}>How BetterUp Builds Mastery</h2>
            </div>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px'}}>
              {[
                {num: '1', title: 'REFLECT', desc: 'WPM assessment', icon: '🪞'},
                {num: '2', title: 'LEARN', desc: 'Personalized journeys', icon: '📖'},
                {num: '3', title: 'PRACTICE', desc: 'AI role-play', icon: '🎯'},
                {num: '4', title: 'COMMIT', desc: 'Action plans', icon: '✅'},
                {num: '5', title: 'MEASURE', desc: 'Pre-post growth', icon: '📊'}
              ].map((step, i) => (
                <div key={i} style={{background: 'white', borderRadius: '12px', padding: '16px', border: '2px solid #818cf8', textAlign: 'center'}}>
                  <div style={{fontSize: '28px', marginBottom: '8px'}}>{step.icon}</div>
                  <div style={{fontSize: '11px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px'}}>{step.num}. {step.title}</div>
                  <div style={{fontSize: '10px', color: '#64748b', lineHeight: 1.4}}>{step.desc}</div>
                </div>
              ))}
            </div>

            <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #818cf8'}}>
              <h3 style={{fontSize: '16px', fontWeight: 'bold', color: '#4338ca', marginBottom: '12px'}}>Applied to CBP Operations:</h3>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', color: '#475569'}}>
                <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                  <strong style={{color: '#4338ca'}}>Use-of-Force:</strong> Practice scenarios before real encounters
                </div>
                <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                  <strong style={{color: '#4338ca'}}>De-escalation:</strong> Rehearse communication strategies
                </div>
                <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                  <strong style={{color: '#4338ca'}}>Post-Incident:</strong> Just-in-time stress management
                </div>
                <div style={{background: '#f5f3ff', borderRadius: '8px', padding: '12px', border: '1px solid #c7d2fe'}}>
                  <strong style={{color: '#4338ca'}}>Career Decisions:</strong> Clarity at 3-5yr, pre-2028 points
                </div>
              </div>
            </div>
          </div>

          <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #e5e7eb'}}>
            <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#003d82', marginBottom: '16px'}}>Complete Research Bibliography</h3>
            <div style={{fontSize: '13px', color: '#475569', lineHeight: 1.8}}>
              • <strong><a href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2817481" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>JAMA 2024</a>:</strong> 21.6% burnout reduction<br/>
              • <strong><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3380405/" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>Montreal Police (Crisis)</a>:</strong> 79% suicide reduction, 22-year validation<br/>
              • <strong><a href="https://curalinc.com/outcomes-study-2022" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>CuraLinc EAP 2022</a>:</strong> 67% alcohol severity reduction, 78% at-risk elimination<br/>
              • <strong><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4010956/" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>HeartMath Police</a>:</strong> 40% stress reduction<br/>
              • <strong><a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0240902" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>UK Police (PLOS ONE)</a>:</strong> 20.5% PTSD in 40,299 officers<br/>
              • <strong><a href="https://www.gao.gov/products/gao-24-107029" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>GAO-24-107029</a>:</strong> CBP recruitment/retention challenges<br/>
              • <strong><a href="https://www.nteu.org/legislative-action/congressional-testimony/fy-2025-budget-request-cbp" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>NTEU April 2024</a>:</strong> 156 suicides 2007-2022, operational tempo<br/>
              • <strong><a href="https://www.betterup.com/customers/united-states-airforce" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>BetterUp DAF</a>:</strong> +7% career commitment, 11,215 members
            </div>
          </div>

        </div>
      )}

      {activeTab === 'implementation' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          
          <div style={{background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '4px solid #10b981', borderRadius: '16px', padding: '32px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
              <div style={{width: '48px', height: '48px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>🗺️</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#065f46', margin: 0}}>Proposed Implementation: Phased Rollout</h2>
            </div>
            
            <p style={{fontSize: '15px', color: '#047857', marginBottom: '20px', lineHeight: 1.6}}>
              Based on Air Force Weapons School deployment—start with high-impact pilot, validate results, then scale across CBP enterprise:
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
                      <li>Single OFO field office (Tucson, NY)</li>
                      <li>500-1,000 seats</li>
                    </ul>
                  </div>
                  <div>
                    <div style={{fontWeight: 'bold', marginBottom: '4px'}}>Goals:</div>
                    <ul style={{margin: 0, paddingLeft: '16px', lineHeight: 1.6}}>
                      <li>Validate ROI with actual data</li>
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
                      <li>OFO offices facing 2028 retirement</li>
                      <li>High-tempo USBP sectors</li>
                      <li>5,000-10,000 seats</li>
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
                      <li>Full CBPX integration</li>
                      <li>Max knowledge preservation</li>
                      <li>Enterprise resilience infrastructure</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{background: 'white', borderRadius: '16px', padding: '32px', border: '3px solid #0066cc'}}>
            <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#003d82', marginBottom: '24px'}}>Proposed Metrics for CBP Implementation</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px'}}>
              <div style={{background: '#eff6ff', borderRadius: '10px', padding: '16px', border: '2px solid #60a5fa'}}>
                <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Individual Level</h4>
                <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: 1.7}}>
                  <li>Whole Person Model pre-post</li>
                  <li>Decision-making capability</li>
                  <li>Stress management</li>
                  <li>Resilience & optimism</li>
                  <li>Career commitment</li>
                </ul>
              </div>
              
              <div style={{background: '#eff6ff', borderRadius: '10px', padding: '16px', border: '2px solid #60a5fa'}}>
                <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Sector/Field Office</h4>
                <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: 1.7}}>
                  <li>Team cohesion trends</li>
                  <li>Leadership climate</li>
                  <li>Morale indicators</li>
                  <li>Reflection Points check-ins</li>
                </ul>
              </div>
              
              <div style={{background: '#eff6ff', borderRadius: '10px', padding: '16px', border: '2px solid #60a5fa'}}>
                <h4 style={{fontSize: '14px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Organizational</h4>
                <ul style={{margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#475569', lineHeight: 1.7}}>
                  <li>Retention vs baseline</li>
                  <li>Workers' comp claim trends</li>
                  <li>Readiness metrics</li>
                  <li>ROI tracking (actual vs projected)</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #e5e7eb'}}>
            <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#003d82'}}>Model Assumptions</h4>
            <div style={{fontSize: '14px', color: '#475569', lineHeight: 1.8}}>
              <div style={{marginBottom: '8px'}}><strong>Attrition Rates:</strong> OFO {(selectedOrganization?.attritionRate || 6.3).toFixed(1)}% annually | USBP 4.2%</div>
              {isOFO && <div style={{fontSize: '14px', color: '#dc2626', fontWeight: 'bold', marginBottom: '8px'}}>⚠️ 2028 OFO: 2,220 officers retiring (400% increase)</div>}
              <div style={{marginBottom: '8px'}}><strong>Replacement Cost:</strong> $150K per separation (recruitment, training, productivity loss)</div>
              <div style={{marginBottom: '8px'}}><strong>Workers' Comp:</strong> $65K average mental health claim (35% of total claims)</div>
              <div style={{marginBottom: '8px'}}><strong>Discipline Cases:</strong> 11.3% annually, 20% stress-related, 1.78% alcohol-related</div>
              <div style={{marginBottom: '8px'}}><strong>Prevention Rates:</strong> 22% workers' comp (JAMA) + Leadership boost when Lead deployed</div>
              <div style={{marginBottom: '8px'}}><strong>Lead Pricing:</strong> {fmt(calculations.leadPrice)}/seat ({use6MonthLead ? '6-month' : '12-month'})</div>
              <div><strong>Ready Pricing:</strong> $150/seat (12 months)</div>
            </div>
          </div>

          <div style={{background: '#fef3c7', border: '4px solid #f59e0b', borderRadius: '16px', padding: '32px'}}>
            <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#92400e', marginBottom: '16px'}}>Third Pathway: Discipline Cost Reduction</h3>
            <p style={{fontSize: '14px', color: '#78350f', marginBottom: '16px', lineHeight: 1.6}}>
              CBP processes ~6,760 annual misconduct cases (11.3% of workforce). 20% are stress-related and 41.6% of arrests are alcohol/drug-related. BetterUp prevents these through early intervention:
            </p>
            <div style={{display: 'grid', gap: '12px'}}>
              <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px'}}>Stress-Related Prevention</div>
                <div style={{fontSize: '12px', color: '#78350f'}}>15% of stress cases prevented through resilience (HeartMath 40% stress reduction applied conservatively)</div>
              </div>
              <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px'}}>Alcohol-Related Prevention</div>
                <div style={{fontSize: '12px', color: '#78350f'}}>78% at-risk no longer at-risk × 50% reach = effective prevention (CuraLinc peer-reviewed)</div>
              </div>
              <div style={{background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                <div style={{fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '4px'}}>Cost Per Case</div>
                <div style={{fontSize: '12px', color: '#78350f'}}>Investigation ($9,500) + Productivity ($14,000) = $23,500 avg. Arrests add termination ($80K) = $103,500 total</div>
              </div>
            </div>
          </div>

          <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #e5e7eb'}}>
            <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#003d82'}}>Data Sources & Validation</h4>
            <div style={{fontSize: '12px', color: '#64748b', lineHeight: 1.8}}>
              • <strong><a href="https://www.gao.gov/products/gao-24-107029" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>GAO-24-107029</a>:</strong> CBP recruitment/retention, replacement costs<br/>
              • <strong><a href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2817481" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>JAMA 2024</a>:</strong> 21.6% burnout/mental health reduction<br/>
              • <strong><a href="https://www.oig.dhs.gov/sites/default/files/assets/2019-06/OIG-19-48-Jun19.pdf" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>DHS OIG</a>:</strong> Discipline volumes, misconduct oversight<br/>
              • <strong><a href="https://curalinc.com/outcomes-study-2022" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>CuraLinc EAP 2022</a>:</strong> 67% alcohol reduction, 78% at-risk elimination<br/>
              • <strong><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4010956/" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>HeartMath Police</a>:</strong> 40% stress reduction, decision-making improvement<br/>
              • <strong><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3380405/" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>Montreal Police (Crisis)</a>:</strong> 79% suicide reduction over 22 years<br/>
              • <strong><a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>Ebbinghaus forgetting curve</a>:</strong> Learning decay & spaced repetition<br/>
              • <strong><a href="https://www.betterup.com/customers/united-states-airforce" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>BetterUp DAF</a>:</strong> +7% career commitment, +13% individual readiness, +15% unit readiness<br/>
              • <strong><a href="https://www.nteu.org/legislative-action/congressional-testimony/fy-2025-budget-request-cbp" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>NTEU April 2024</a>:</strong> Operational tempo, 156 suicides 2007-2022<br/>
              • <strong><a href="https://www.nellis.af.mil/About/Fact-Sheets/Display/Article/284156/united-states-air-force-weapons-school/" target="_blank" rel="noopener noreferrer" style={{color: '#0066cc', textDecoration: 'none'}}>Air Force Weapons School</a>:</strong> Mastery framework for high-performance<br/>
              • <strong>BetterUp volume pricing:</strong> Enterprise contract rates (Deal Desk for 1000+ seats)
            </div>
          </div>

          <div style={{background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '3px solid #3b82f6', borderRadius: '16px', padding: '32px', textAlign: 'center'}}>
            <h2 style={{fontSize: '32px', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px'}}>
              Ready to Discuss Implementation?
            </h2>
            <p style={{fontSize: '16px', color: '#1e3a8a', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px'}}>
              This calculator provides evidence-based projections. Real results come from actual implementation with your personnel, tracking your metrics, in your operational environment.
            </p>
            <div style={{fontSize: '14px', color: '#1e40af'}}>
              Contact: <strong>Desiree Aveina, Director of Resiliency Program, CBP</strong>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default CBPDashboard;