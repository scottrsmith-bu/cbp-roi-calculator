import React, { useState, useMemo } from 'react';
import { Shield, Calculator, MessageCircle, X, ChevronDown, Settings, Info } from 'lucide-react';

function CBPROICalculator() {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
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
  
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
  const [totalPersonnel, setTotalPersonnel] = useState(25879);
  const [targetPopulation, setTargetPopulation] = useState(5000);
  const [seats, setSeats] = useState(5000);
  const [costPerSeat, setCostPerSeat] = useState(150);
  const [engagementRate, setEngagementRate] = useState(65);

  const organizations = [
    {id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', type: 'cbp-wide', preset: 'yes', description: 'Entire CBP workforce', attritionRate: 5.5, replacementCost: 97500, workersCompClaims: 3100},
    {id: 'ofo', name: 'Office of Field Operations (OFO)', personnel: 25879, location: '20 Field Offices', type: 'component', preset: 'yes', highlight: true, description: 'CBP Officers at ports', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 1340},
    {id: 'usbp', name: 'U.S. Border Patrol (USBP)', personnel: 20000, location: '20 Sectors', type: 'component', preset: 'yes', description: 'Border Patrol Agents', attritionRate: 7.2, replacementCost: 125000, workersCompClaims: 1500},
    {id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', type: 'usbp-sector', preset: 'yes', description: 'Largest USBP sector', attritionRate: 7.5, replacementCost: 115000, workersCompClaims: 285},
    {id: 'ofo_ny', name: 'New York Field Office', personnel: 2588, location: 'NY', type: 'ofo-field', preset: 'yes', description: 'JFK, Newark, LaGuardia', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 134},
    {id: 'ofo_la', name: 'Los Angeles Field Office', personnel: 2329, location: 'CA', type: 'ofo-field', preset: 'yes', description: 'LAX, Long Beach', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 120},
  ];

  const selectOrganization = (org) => {
    setSelectedOrganization(org);
    setTotalPersonnel(org.personnel);
    setTargetPopulation(Math.round(org.personnel * 0.2));
    setSeats(Math.round(org.personnel * 0.2));
    setShowLanding(false);
    setShowExecutiveSummary(false);
  };

  const retentionEffectiveness = useMemo(() => {
    if (manualRetentionOverride) return manualRetentionValue;
    return Math.round(3 + (careerCommitmentImprovement / 100) * 20 + (leadershipImprovement / 100) * 15);
  }, [careerCommitmentImprovement, leadershipImprovement, manualRetentionOverride, manualRetentionValue]);

  const readinessPercentage = useMemo(() => {
    return Math.round(12 + (missionReadinessImprovement / 100) * 30 + (resilienceImprovement / 100) * 25 + (standardsImprovement / 100) * 15);
  }, [missionReadinessImprovement, resilienceImprovement, standardsImprovement]);

  const calculations = useMemo(() => {
    const org = selectedOrganization || organizations[0];
    const engaged = Math.round((targetPopulation * engagementRate) / 100);
    const expectedSeparations = Math.round(targetPopulation * (org.attritionRate / 100));
    const preventedSeparations = Math.round((engaged * retentionEffectiveness) / 100);
    const retentionSavings = preventedSeparations * org.replacementCost;
    const avgClaimCost = 65000;
    const totalClaimsRate = org.workersCompClaims / org.personnel;
    const mentalHealthClaimsRate = totalClaimsRate * 0.35;
    const claimsPrevented = Math.round(targetPopulation * mentalHealthClaimsRate * 0.22);
    const workersCompSavings = claimsPrevented * avgClaimCost;
    const readinessImproved = Math.round(engaged * (readinessPercentage / 100));
    const readinessSavings = readinessImproved * 15000;
    const totalSavings = retentionSavings + workersCompSavings + readinessSavings;
    const programCost = seats * costPerSeat;
    const netSavings = totalSavings - programCost;
    const roi = programCost > 0 ? ((netSavings / programCost) * 100).toFixed(0) : 0;
    
    return {engaged, expectedSeparations, preventedSeparations, retentionSavings, claimsPrevented, workersCompSavings, readinessImproved, readinessSavings, totalSavings, programCost, netSavings, roi};
  }, [seats, costPerSeat, engagementRate, retentionEffectiveness, targetPopulation, selectedOrganization, readinessPercentage]);

  const fmt = (v) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(v);
  const fmtNum = (v) => new Intl.NumberFormat('en-US').format(v);

  const isOFO = selectedOrganization?.id === 'ofo' || selectedOrganization?.type === 'ofo-field';

  const performanceDrivers = [
    {key: 'mission', priority: "MISSION READINESS", drivers: "Decision-Making • Cognitive Agility • Performance", baseline: 45, growth: 62, improvement: missionReadinessImprovement, setImprovement: setMissionReadinessImprovement},
    {key: 'resilience', priority: "RESILIENCE & WELLNESS", drivers: "Burnout Prevention • Stress Management • Emotional Regulation", baseline: 47, growth: 62, improvement: resilienceImprovement, setImprovement: setResilienceImprovement, affectsWorkersComp: true},
    {key: 'career', priority: "CAREER COMMITMENT", drivers: "Purpose • Career Development • Work-Life Integration", baseline: 48, growth: 54, improvement: careerCommitmentImprovement, setImprovement: setCareerCommitmentImprovement},
    {key: 'leadership', priority: "LEADERSHIP", drivers: "Communication • Strategic Thinking • Empowerment", baseline: 50, growth: 56, improvement: leadershipImprovement, setImprovement: setLeadershipImprovement},
    {key: 'standards', priority: "PROFESSIONAL STANDARDS", drivers: "Ethics • Judgment • Professional Demeanor", baseline: 49, growth: 59, improvement: standardsImprovement, setImprovement: setStandardsImprovement}
  ];

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    if (searchTerm) filtered = filtered.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== 'all' && filterType !== 'preset') filtered = filtered.filter(org => org.type === filterType);
    if (filterType === 'preset') filtered = filtered.filter(org => org.preset === 'yes');
    return filtered.sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : b.personnel - a.personnel);
  }, [searchTerm, filterType, sortBy]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, {type: 'user', text: chatInput}, {type: 'assistant', text: `Based on ${selectedOrganization?.name || 'CBP'}: ${chatInput}`}]);
    setChatInput('');
  };

  if (showExecutiveSummary) {
    return (
      <div style={{width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
        <div style={{background: 'white', borderRadius: '16px', boxShadow: '0 8px 40px rgba(0,0,0,0.15)', overflow: 'hidden', borderTop: '8px solid #0066cc'}}>
          <div style={{background: 'linear-gradient(135deg, #003d82 0%, #0066cc 100%)', padding: '48px', color: 'white'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px'}}>
              <Shield size={64} color="#ffcc00" strokeWidth={2.5} />
              <div>
                <h1 style={{fontSize: '52px', fontWeight: 'bold', margin: '0 0 12px 0'}}>BetterUp CBP Leadership Dashboard</h1>
                <p style={{fontSize: '24px', color: '#ffcc00', margin: 0}}>Workers' Comp & Retention ROI</p>
              </div>
            </div>
          </div>
          <div style={{padding: '48px', textAlign: 'center'}}>
            <button 
              onClick={() => {setShowExecutiveSummary(false); setShowLanding(true);}} 
              style={{background: '#ffcc00', color: '#003d82', border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,204,0,0.4)'}}
            >
              Select Your Component →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div style={{width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '32px', background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)', minHeight: '100vh'}}>
        <button onClick={() => {setShowExecutiveSummary(true); setShowLanding(false);}} style={{marginBottom: '16px', color: '#666', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline'}}>
          ← Back
        </button>
        <div style={{background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', borderTop: '4px solid #0066cc'}}>
          <div style={{background: '#003d82', color: 'white', padding: '32px'}}>
            <h1 style={{fontSize: '36px', fontWeight: 'bold', margin: 0}}>Select Your Component</h1>
          </div>
          <div style={{padding: '32px'}}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', marginBottom: '24px', fontSize: '16px'}}
            />
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {filteredOrganizations.map((org) => (
                <div key={org.id} style={{background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}} onMouseOver={(e) => e.currentTarget.style.background = '#eff6ff'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                  <div>
                    <div style={{fontWeight: 'bold', fontSize: '18px', color: '#003d82', marginBottom: '4px'}}>{org.name}</div>
                    <div style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>{org.description}</div>
                    <div style={{fontSize: '12px', color: '#999'}}>{fmtNum(org.personnel)} personnel • {org.location}</div>
                    {org.id === 'ofo' && <div style={{fontSize: '12px', color: '#dc2626', fontWeight: 'bold', marginTop: '4px'}}>⚠️ 2,220 officers retiring 2028 (400% increase)</div>}
                  </div>
                  <button onClick={() => selectOrganization(org)} style={{background: '#0066cc', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>
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
      <button onClick={() => setShowLanding(true)} style={{marginBottom: '16px', color: '#0066cc', background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline'}}>
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
        <button onClick={() => setActiveTab('dashboard')} style={{padding: '12px 24px', fontWeight: '600', borderRadius: '8px', border: activeTab === 'dashboard' ? 'none' : '2px solid #e5e7eb', background: activeTab === 'dashboard' ? '#0066cc' : 'white', color: activeTab === 'dashboard' ? 'white' : '#003d82', cursor: 'pointer'}}>
          Dashboard
        </button>
        <button onClick={() => setActiveTab('details')} style={{padding: '12px 24px', fontWeight: '600', borderRadius: '8px', border: activeTab === 'details' ? 'none' : '2px solid #e5e7eb', background: activeTab === 'details' ? '#0066cc' : 'white', color: activeTab === 'details' ? 'white' : '#003d82', cursor: 'pointer'}}>
          Model Details
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div style={{background: '#003d82', color: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
              <div>
                <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '8px'}}>BetterUp Seats: {fmtNum(seats)}</div>
                <div style={{fontSize: '14px'}}>Engagement rate: {engagementRate}%</div>
                <div style={{fontSize: '14px', opacity: 0.9, marginTop: '4px'}}>Total Population: {fmtNum(totalPersonnel)}</div>
              </div>
              <button onClick={() => setShowImpact(!showImpact)} style={{background: '#ffcc00', color: '#003d82', border: 'none', padding: '12px 32px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'}}>
                {showImpact ? 'Hide Impact' : 'Show Impact →'}
              </button>
            </div>
          </div>

          {showImpact && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', border: '2px solid #94a3b8', borderRadius: '12px', padding: '24px'}}>
                <p style={{fontSize: '18px', color: '#334155'}}>
                  BetterUp saves {selectedOrganization?.name || 'CBP'} <strong style={{color: '#059669', fontSize: '24px'}}>{fmt(calculations.netSavings)}</strong> annually—preventing <strong>{fmtNum(calculations.preventedSeparations)} separations</strong> and <strong>{fmtNum(calculations.claimsPrevented)} mental health claims</strong>.
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

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px'}}>
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
                    <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{color: '#64748b'}}>Prevention rate:</span><span style={{fontWeight: '600', color: '#0066cc'}}>22%</span></div>
                    <div style={{fontSize: '11px', color: '#64748b', marginTop: '8px', fontStyle: 'italic'}}>JAMA 2024: 21.6% burnout reduction</div>
                  </div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #003d82'}}>
                <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>Performance Drivers</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {performanceDrivers.map(d => (
                    <div key={d.key} style={{border: '2px solid #dbeafe', borderRadius: '12px', padding: '20px', background: '#eff6ff'}}>
                      <div style={{marginBottom: '12px'}}>
                        <h4 style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '4px', color: '#003d82'}}>{d.priority}</h4>
                        <p style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>{d.drivers}</p>
                        {d.affectsWorkersComp && <p style={{fontSize: '11px', color: '#dc2626', fontWeight: '600'}}>🎯 Directly reduces workers' comp claims</p>}
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                        <div style={{width: '48px', height: '48px', background: '#1e40af', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(30,64,175,0.3)'}}>{d.baseline}</div>
                        <div style={{flex: 1, height: '40px', position: 'relative'}}>
                          <div style={{position: 'absolute', width: '100%', height: '40px', background: '#93c5fd', borderRadius: '20px'}}></div>
                          <div style={{position: 'absolute', height: '40px', background: '#1e40af', borderRadius: '20px', width: `${(d.growth / 70) * 100}%`}}></div>
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
                          style={{width: '100%', height: '8px', accentColor: '#0066cc'}}
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
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', margin: 0}}>Global Parameters</h3>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'}}>
                  <div>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Seats: {fmtNum(seats)}</label>
                    <input type="range" min="1000" max="30000" step="100" value={seats} onChange={(e) => {setSeats(Number(e.target.value)); setTargetPopulation(Number(e.target.value));}} style={{width: '100%', height: '8px', accentColor: '#0066cc'}}/>
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Cost/Seat: ${costPerSeat}</label>
                    <input type="range" min="100" max="300" step="10" value={costPerSeat} onChange={(e) => setCostPerSeat(Number(e.target.value))} style={{width: '100%', height: '8px', accentColor: '#0066cc'}}/>
                  </div>
                  <div>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Engagement: {engagementRate}%</label>
                    <input type="range" min="40" max="90" value={engagementRate} onChange={(e) => setEngagementRate(Number(e.target.value))} style={{width: '100%', height: '8px', accentColor: '#0066cc'}}/>
                    <div style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>{fmtNum(calculations.engaged)} engaged</div>
                  </div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #003d82'}}>
                <div style={{background: '#003d82', color: 'white', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Settings size={20} color="#ffcc00" />
                  <h4 style={{fontSize: '16px', fontWeight: '600', margin: 0}}>Advanced Settings</h4>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '16px'}}>
                    <h5 style={{fontSize: '14px', fontWeight: '600', marginBottom: '12px'}}>Scenario Planning</h5>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button onClick={() => {setEngagementRate(55); setMissionReadinessImprovement(12); setResilienceImprovement(10); setCareerCommitmentImprovement(8); setLeadershipImprovement(7); setStandardsImprovement(6);}} style={{flex: 1, padding: '10px', background: '#d1d5db', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>Conservative</button>
                      <button onClick={() => {setEngagementRate(65); setMissionReadinessImprovement(17); setResilienceImprovement(15); setCareerCommitmentImprovement(13); setLeadershipImprovement(12); setStandardsImprovement(10);}} style={{flex: 1, padding: '10px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>Moderate</button>
                      <button onClick={() => {setEngagementRate(75); setMissionReadinessImprovement(25); setResilienceImprovement(23); setCareerCommitmentImprovement(20); setLeadershipImprovement(18); setStandardsImprovement(15);}} style={{flex: 1, padding: '10px', background: '#003d82', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>Aggressive</button>
                    </div>
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
                      max="25" 
                      value={manualRetentionOverride ? manualRetentionValue : retentionEffectiveness}
                      onChange={(e) => {if (manualRetentionOverride) setManualRetentionValue(Number(e.target.value));}}
                      style={{width: '100%', height: '8px', accentColor: '#0066cc', cursor: manualRetentionOverride ? 'pointer' : 'not-allowed', opacity: manualRetentionOverride ? 1 : 0.5}}
                    />
                    {manualRetentionOverride ? (
                      <p style={{fontSize: '11px', color: '#92400e', marginTop: '8px', fontWeight: '500', background: '#fffbeb', padding: '8px', borderRadius: '4px', border: '1px solid #fbbf24'}}>⚠️ Manual override active - drag slider to test rates</p>
                    ) : (
                      <p style={{fontSize: '11px', color: '#1e40af', marginTop: '8px', fontWeight: '500', background: '#eff6ff', padding: '8px', borderRadius: '4px', border: '1px solid #60a5fa'}}>⚡ Auto-calculated from Career Commitment + Leadership</p>
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
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>Model Assumptions</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '16px'}}>
              <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '8px'}}>Attrition Rates</h4>
              <div style={{fontSize: '14px', marginBottom: '4px'}}>OFO: 3.5% annually | USBP: 7.2% annually</div>
              {isOFO && <div style={{fontSize: '14px', color: '#dc2626', fontWeight: 'bold', marginTop: '8px'}}>⚠️ 2028: 2,220 officers retiring (400% increase)</div>}
            </div>
            <div style={{border: '2px solid #e5e7eb', borderRadius: '8px', padding: '16px'}}>
              <h4 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '8px'}}>Sources</h4>
              <div style={{fontSize: '12px', color: '#64748b'}}>
                • GAO-24-107029: CBP Recruitment & Retention<br/>
                • JAMA 2024: 21.6% burnout reduction<br/>
                • NTEU Testimony: Workforce challenges
              </div>
            </div>
          </div>
        </div>
      )}

      {!showAssistant && (
        <button onClick={() => setShowAssistant(true)} style={{position: 'fixed', bottom: '24px', right: '24px', width: '64px', height: '64px', background: '#0066cc', color: 'white', borderRadius: '50%', border: 'none', boxShadow: '0 4px 12px rgba(0,102,204,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 1000}}>
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
            <button onClick={() => setShowAssistant(false)} style={{background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '4px'}} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <X size={20} />
            </button>
          </div>
          <div style={{padding: '16px', height: '384px', overflowY: 'auto', background: '#f9fafb'}}>
            {chatMessages.length === 0 ? (
              <div style={{textAlign: 'center', paddingTop: '32px'}}>
                <p style={{fontWeight: '500', color: '#6b7280', marginBottom: '16px'}}>Ask anything about the model!</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {["How is the net savings calculated?", "Why is OFO facing a retirement crisis in 2028?", "Explain the dual-pathway model", "What are workers' comp claims?", "How do Performance Drivers affect ROI?"].map((q, i) => (
                    <button key={i} onClick={() => setChatInput(q)} style={{width: '100%', textAlign: 'left', padding: '12px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer'}} onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
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
            <button onClick={handleSendMessage} style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CBPROICalculator;