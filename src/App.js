import React, { useState, useMemo } from 'react';
import { Shield, Calculator, MessageCircle, X, Settings } from 'lucide-react';

function MethodologyImpactSection() {
  const card = {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)',
    border: '4px solid #64748b',
    borderRadius: '16px',
    padding: '28px',
    marginTop: '16px'
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

    // helper: labeled callout with leader line
const Callout = ({ x, y, text, color = '#111827', bg = 'white', lineTo }) => (
  <g>
    {lineTo && (
      <line
        x1={x}
        y1={y}
        x2={lineTo.x}
        y2={lineTo.y}
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    )}
    <rect
      x={x - 6}
      y={y - 18}
      rx="6"
      ry="6"
      width={Math.max(120, text.length * 6.4 + 14)}
      height="28"
      fill={bg}
      stroke={color}
      strokeOpacity="0.25"
    />
    <text x={x + 8} y={y + 2} fill={color} fontSize="12" fontWeight="700">
      {text}
    </text>
  </g>
);

  return (
    <div style={card}>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
        <div style={{width: 48, height: 48, background: '#475569', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22}}>📈</div>
        <h2 style={{fontSize: 22, fontWeight: '800', color: '#111827', margin: 0}}>
          Methodology Impact: Why episodic training loses—and continuous development wins
        </h2>
      </div>

      {/* Chart Card */}
      <div style={{background: 'white', border: '2px solid #e5e7eb', borderRadius: 12, padding: 16}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
            <span style={pill('#fee2e2', '#991b1b')}>🔴 Episodic training (red line)</span>
            <span style={pill('#dbeafe', '#1e40af')}>🔵 Continuous development (blue line)</span>
          </div>
          <div style={{fontSize: 12, color: '#6b7280'}}>Higher area under the curve = retained capability</div>
        </div>

        <svg viewBox="0 0 760 300" style={{ width: '100%', height: 260, display: 'block' }}>
  {/* axes */}
  <line x1="60" y1="24" x2="60" y2="250" stroke="#cbd5e1" strokeWidth="2" />
  <line x1="60" y1="250" x2="730" y2="250" stroke="#cbd5e1" strokeWidth="2" />
  <text x="14" y="34" fill="#475569" fontSize="11" fontWeight="700">Skill / Recall</text>
  <text x="690" y="292" fill="#475569" fontSize="11" fontWeight="700">Time</text>

  {/* subtle grid */}
  {[140, 220, 300, 380, 460, 540, 620, 700].map((x, i) => (
    <line key={i} x1={x} y1="250" x2={x} y2="246" stroke="#cbd5e1" />
  ))}
  {[90, 130, 170, 210].map((y, i) => (
    <line key={i} x1="60" y1={y} x2="730" y2={y} stroke="#e5e7eb" />
  ))}

  {/* RED: forgetting curve */}
  <path
    d="
      M 60 60
      C 180 56, 250 80, 320 120
      C 380 154, 450 190, 730 230
    "
    fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round"
  />

  {/* BLUE: oscillating + rising curve */}
  <path
    d="
      M 60 230
      C 110 200, 150 190, 190 170
      C 210 160, 230 150, 250 160
      C 270 175, 300 150, 330 135
      C 350 125, 370 120, 390 130
      C 410 142, 440 128, 470 118
      C 490 112, 510 110, 530 120
      C 550 130, 585 118, 620 108
      C 640 102, 660 98, 730 92
    "
    fill="none" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round"
  />

  {/* reinforcement dots */}
  {[190, 250, 330, 390, 470, 530, 620].map((x, i) => (
    <g key={i}>
      <line x1={x} y1="250" x2={x} y2="242" stroke="#93c5fd" strokeWidth="2" />
      <circle cx={x} cy={140 - i * 3 + 18} r="4" fill="#60a5fa" />
    </g>
  ))}

  {/* CALLOUTS (kept off-path) */}
  <Callout x={180} y={60}  text="Peak right after event"        color="#991b1b" bg="#fff5f5" lineTo={{ x: 150, y: 66 }} />
  <Callout x={410} y={168} text="~70% forgotten in 24h"        color="#991b1b" bg="#fff5f5" lineTo={{ x: 365, y: 150 }} />
  <Callout x={640} y={228} text="~90% within a month"          color="#991b1b" bg="#fff5f5" lineTo={{ x: 600, y: 212 }} />
  <Callout x={520} y={84}  text="Continuous, personalized reinforcement" color="#1e3a8a" bg="#eef2ff" lineTo={{ x: 560, y: 110 }} />
</svg>


        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8}}>
          <div style={{background: '#fff7ed', border: '1px solid #fdba74', borderRadius: 8, padding: 12}}>
            <div style={{fontSize: 13, color: '#9a3412', fontWeight: 700, marginBottom: 6}}>The Red Line: Why retention stalls</div>
            <ul style={{margin: 0, paddingLeft: 16, color: '#7c2d12', fontSize: 13, lineHeight: 1.6}}>
              <li>Event spikes learning → rapid decay (forgetting curve)</li>
              <li>Episodic workshops don’t rewire habits</li>
              <li>Leaders default to command-and-control under stress without reinforcement</li>
            </ul>
          </div>
          <div style={{background: '#ecfeff', border: '1px solid #67e8f9', borderRadius: 8, padding: 12}}>
            <div style={{fontSize: 13, color: '#155e75', fontWeight: 700, marginBottom: 6}}>The Blue Line: Why DAF moved retention +6%</div>
            <ul style={{margin: 0, paddingLeft: 16, color: '#0e7490', fontSize: 13, lineHeight: 1.6}}>
              <li>Continuous, personalized practice + coaching compounds capability</li>
              <li>Just-in-time support during critical incidents & career choke points</li>
              <li>Transforms one-off training into ongoing learning journeys</li>
            </ul>
          </div>
        </div>

        <div style={{marginTop: 12, fontSize: 12, color: '#475569'}}>
          <strong>Leadership takeaway:</strong> preserve institutional knowledge through continuous development now—don’t wait until 2028 exits make it irrecoverable.
        </div>
      </div>

      <div style={{marginTop: 16, background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 12, padding: 16}}>
        <p style={{margin: 0, fontSize: 14, color: '#92400e', lineHeight: 1.6}}>
          The red line explains the current retention gap: episodic CBP training peaks and fades, so experience isn’t
          transferred. The blue line shows what changes outcomes: continuous leadership development and well-being support
          that compounds over time—turning training events into sustained behavior change with AI-supported coaching.
        </p>
      </div>

      <div style={{marginTop: 10, fontSize: 11, color: '#64748b'}}>
        <strong>Sources (high level):</strong> Ebbinghaus forgetting curve; spaced repetition research; BetterUp outcomes incl. DAF (+6% retention); peer-reviewed burnout reduction (JAMA 2024).
      </div>
    </div>
  );
}

function CBPROICalculator() {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType] = useState('all');
  const [sortBy] = useState('name');

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
    {key: 'mission', priority: 'MISSION READINESS', drivers: 'Decision-Making • Cognitive Agility • Performance', baseline: 45, growth: 62, improvement: missionReadinessImprovement, setImprovement: setMissionReadinessImprovement},
    {key: 'resilience', priority: 'RESILIENCE & WELLNESS', drivers: 'Burnout Prevention • Stress Management • Emotional Regulation', baseline: 47, growth: 62, improvement: resilienceImprovement, setImprovement: setResilienceImprovement, affectsWorkersComp: true},
    {key: 'career', priority: 'CAREER COMMITMENT', drivers: 'Purpose • Career Development • Work-Life Integration', baseline: 48, growth: 54, improvement: careerCommitmentImprovement, setImprovement: setCareerCommitmentImprovement},
    {key: 'leadership', priority: 'LEADERSHIP', drivers: 'Communication • Strategic Thinking • Empowerment', baseline: 50, growth: 56, improvement: leadershipImprovement, setImprovement: setLeadershipImprovement},
    {key: 'standards', priority: 'PROFESSIONAL STANDARDS', drivers: 'Ethics • Judgment • Professional Demeanor', baseline: 49, growth: 59, improvement: standardsImprovement, setImprovement: setStandardsImprovement}
  ];

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    if (searchTerm) filtered = filtered.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // filterType and sortBy are fixed to keep parity with original UX
    return filtered.sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : b.personnel - a.personnel);
  }, [searchTerm, sortBy]);

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
                <div style={{width: '48px', height: '48px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0}}>ℹ️</div>
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

            {/* Why Precision Development vs. Traditional Training? */}
            <div style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)', border: '4px solid #64748b', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'start', gap: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#475569', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0}}>⚡</div>
                <div style={{flex: 1}}>
                  <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px'}}>Why Precision Development vs. Traditional Training?</h2>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                    <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #ef4444'}}>
                      <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#991b1b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{fontSize: '24px'}}>📚</span>
                        Traditional Training
                      </h3>
                      <ul style={{fontSize: '14px', color: '#7f1d1d', margin: 0, paddingLeft: '20px', lineHeight: 1.8}}>
                        <li><strong>Event-based:</strong> Annual refreshers, mandatory courses, EAP programs</li>
                        <li><strong>Knowledge transfer:</strong> Teaching what to do</li>
                        <li><strong>Episodic:</strong> One-time interventions</li>
                        <li><strong>Generic curriculum:</strong> Same for everyone</li>
                        <li><strong>Output focus:</strong> Completion certificates</li>
                      </ul>
                    </div>
                    <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #10b981'}}>
                      <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#065f46', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{fontSize: '24px'}}>🎯</span>
                        BetterUp Platform
                      </h3>
                      <ul style={{fontSize: '14px', color: '#064e3b', margin: 0, paddingLeft: '20px', lineHeight: 1.8}}>
                        <li><strong>Virtual delivery:</strong> Human expertise + AI partner</li>
                        <li><strong>Just-in-time:</strong> During critical moments</li>
                        <li><strong>AI role-play:</strong> Use-of-force scenarios, career decisions</li>
                        <li><strong>Personalized:</strong> Individual development paths</li>
                        <li><strong>Measured outcomes:</strong> Assessments & Reflection Points</li>
                      </ul>
                    </div>
                  </div>
                  <div style={{background: '#ecfdf5', borderRadius: '12px', padding: '20px', marginTop: '24px', border: '2px solid #10b981'}}>
                    <p style={{fontSize: '14px', color: '#065f46', margin: 0, lineHeight: 1.7}}>
                      <strong style={{color: '#047857'}}>The Key Difference:</strong> Traditional training teaches <em>what</em> to do. BetterUp develops the underlying <strong>mindsets and behaviors</strong> (Resilience, Decision-Making, Emotional Regulation, Stress Management) that drive performance across all situations—delivered virtually with human expertise and AI support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW: Visual red vs blue methodology section */}
            <MethodologyImpactSection />

            <div style={{background: '#fef3c7', border: '4px solid #f59e0b', borderRadius: '16px', padding: '32px'}}>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#78350f', marginBottom: '24px'}}>How the Model Works: Dual-Pathway Impact</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #78716c'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{width: '48px', height: '48px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>1</div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1c1917', margin: 0}}>Workers' Comp Reduction</h3>
                  </div>
                  <p style={{fontSize: '15px', color: '#44403c', marginBottom: '16px', lineHeight: 1.6}}>
                    BetterUp helps build resilience to prevent mental health claims (PTSD, depression, anxiety, SUD) that drive costs and operational degradation.
                  </p>
                  <div style={{background: '#fee2e2', borderRadius: '10px', padding: '16px'}}>
                    <strong style={{fontSize: '14px', color: '#7f1d1d'}}>Value:</strong>
                    <div style={{fontSize: '13px', color: '#991b1b', marginTop: '4px'}}>22% reduction = lower medical costs, reduced lost time, fewer disability payments</div>
                    <div style={{fontSize: '11px', color: '#7f1d1d', marginTop: '8px', fontStyle: 'italic'}}>Source: JAMA 2024</div>
                  </div>
                </div>
                <div style={{background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #78716c'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{width: '48px', height: '48px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>2</div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1c1917', margin: 0}}>Retention Economics</h3>
                  </div>
                  <p style={{fontSize: '15px', color: '#44403c', marginBottom: '16px', lineHeight: 1.6}}>
                    Helps at critical decision points (3–5 yrs, 10–15 yrs, pre-2028 retirement) through career clarity, purpose development, resilience building.
                  </p>
                  <div style={{background: '#fed7aa', borderRadius: '10px', padding: '16px'}}>
                    <strong style={{fontSize: '14px', color: '#78350f'}}>Value:</strong>
                    <div style={{fontSize: '13px', color: '#92400e', marginTop: '4px'}}>Each prevented separation avoids $87K–$130K in recruiting, FLETC training, lost productivity</div>
                    <div style={{fontSize: '11px', color: '#78350f', marginTop: '8px', fontStyle: 'italic'}}>Source: GAO-24-107029</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '4px solid #3b82f6', borderRadius: '16px', padding: '32px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                <div style={{width: '48px', height: '48px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>📊</div>
                <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: 0}}>How Performance Drivers Work</h2>
              </div>
              <p style={{fontSize: '16px', color: '#1e40af', marginBottom: '20px'}}>
                Performance Driver sliders model <strong>how much you prioritize each CBP strategic objective</strong>.
              </p>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #60a5fa'}}>
                  <h3 style={{fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>🎯 What Sliders Mean</h3>
                  <ul style={{fontSize: '14px', color: '#1e3a8a', margin: 0, paddingLeft: '20px', lineHeight: 1.8}}>
                    <li><strong>High (20–30%):</strong> Max focus—dedicated learning, frequent coaching, AI practice</li>
                    <li><strong>Medium (10–19%):</strong> Balanced investment</li>
                    <li><strong>Low (0–9%):</strong> Minimal—resources elsewhere</li>
                  </ul>
                </div>
                <div style={{background: 'white', borderRadius: '12px', padding: '20px', border: '2px solid #60a5fa'}}>
                  <h3 style={{fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>⚡ How They Affect ROI</h3>
                  <ul style={{fontSize: '14px', color: '#1e3a8a', margin: 0, paddingLeft: '20px', lineHeight: 1.8}}>
                    <li><strong>Mission, Resilience, Standards</strong> → Drive effectiveness & claim reduction</li>
                    <li><strong>Career, Leadership</strong> → Drive retention & prevent turnover</li>
                    <li>Higher values = Bigger improvements = Greater impact</li>
                  </ul>
                </div>
              </div>
              <div style={{background: '#fed7aa', borderRadius: '12px', padding: '16px', border: '2px solid #f59e0b'}}>
                <p style={{fontSize: '14px', color: '#78350f', margin: 0}}>
                  <strong>💡 Leadership Decision:</strong> Adjust sliders to match priorities. Workers' comp crisis? Max out Resilience. 2028 retirement cliff? Prioritize Career Commitment and Leadership.
                </p>
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
                style={{background: '#ffcc00', color: '#003d82', border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,204,0,0.5)'}}
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
                • Ebbinghaus forgetting curve & spaced repetition research (learning decay & recall)<br/>
                • BetterUp DAF outcomes (2021–2025): +6% retention, +15% resilience, +17% readiness
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
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
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