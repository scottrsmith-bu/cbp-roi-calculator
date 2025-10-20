import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Shield, MessageSquare, Info, Activity, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const organizationData = [
  { id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 97500, workersCompClaims: 3100, category: 'CBP-Wide', description: 'Entire CBP workforce (OFO + USBP + AMO)' },
  { id: 'ofo', name: 'Office of Field Operations (OFO)', personnel: 26000, location: '328 Ports of Entry', preset: 'Yes', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 1340, category: 'CBP Component', description: 'CBP Officers at airports, seaports, land crossings' },
  { id: 'usbp', name: 'U.S. Border Patrol (USBP)', personnel: 20000, location: '20 Sectors Nationwide', preset: 'Yes', attritionRate: 7.2, replacementCost: 125000, workersCompClaims: 1500, category: 'CBP Component', description: 'Border Patrol Agents across all sectors' },
  { id: 'amo', name: 'Air and Marine Operations (AMO)', personnel: 1800, location: 'Aviation & Maritime', preset: 'Yes', attritionRate: 4.5, replacementCost: 105000, workersCompClaims: 135, category: 'CBP Component', description: 'Air interdiction and marine operations' },
  { id: 'swb_all', name: 'Southwest Border - All 9 Sectors', personnel: 12000, location: 'CA, AZ, NM, TX', preset: 'Yes', attritionRate: 7.5, replacementCost: 125000, workersCompClaims: 900, category: 'USBP Regional Grouping', description: 'San Diego, El Centro, Yuma, Tucson, El Paso, Big Bend, Del Rio, Laredo, RGV' },
  { id: 'northern_all', name: 'Northern Border - All 8 Sectors', personnel: 4500, location: 'Northern U.S.', preset: 'Yes', attritionRate: 5.5, replacementCost: 115000, workersCompClaims: 340, category: 'USBP Regional Grouping', description: 'Spokane, Havre, Grand Forks, Detroit, Buffalo, Swanton, Houlton, Blaine' },
  { id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', preset: 'Yes', attritionRate: 7.5, replacementCost: 115000, workersCompClaims: 285, category: 'USBP Individual Sector', description: 'Largest sector by geography' },
  { id: 'rgv', name: 'Rio Grande Valley Sector', personnel: 3200, location: 'South Texas', preset: 'Yes', attritionRate: 7.8, replacementCost: 120000, workersCompClaims: 240, category: 'USBP Individual Sector', description: 'Highest apprehension volume' },
  { id: 'sandiego', name: 'San Diego Sector', personnel: 2800, location: 'California', preset: 'Yes', attritionRate: 6.5, replacementCost: 130000, workersCompClaims: 210, category: 'USBP Individual Sector', description: 'Urban operations' },
];

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('CBP-Wide');
  const categories = ['CBP-Wide', 'CBP Component', 'USBP Regional Grouping', 'USBP Individual Sector'];

  const filteredOrgs = organizationData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'CBP-Wide' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2f5c 0%, #004d7a 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Shield size={48} color="#0066cc" />
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', margin: 0 }}>U.S. Customs and Border Protection</h1>
              <p style={{ fontSize: '22px', color: '#0066cc', margin: '8px 0 0 0', fontWeight: 'bold' }}>BetterUp Resiliency & Retention ROI Calculator</p>
              <p style={{ fontSize: '16px', color: '#cc3333', margin: '4px 0 0 0', fontWeight: '600' }}>Multi-Factor Risk Reduction Model</p>
            </div>
          </div>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px', marginTop: '16px' }}>
            <p style={{ color: '#333', fontSize: '17px', margin: 0, lineHeight: 1.7 }}>
              This calculator projects financial impact through a <strong>dual-pathway methodology</strong>: <span style={{ color: '#cc3333' }}>(1) reducing costly FECA mental health claims (PTSD, depression, anxiety, substance use disorders)</span> and <span style={{ color: '#cc3333' }}>(2) preventing high-cost personnel turnover</span> through precision resilience development.
            </p>
          </div>

          <div style={{ marginTop: '20px', padding: '24px', background: '#fff8e6', borderRadius: '12px', border: '2px solid #ffcc00' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff9900', marginBottom: '16px' }}>Conservative Model Assumptions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '15px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>Retention Effectiveness</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff9900', marginBottom: '4px' }}>7%</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.5 }}>Of engaged personnel who would have left but stay (Career 4% + Leadership 3%).</div>
              </div>
              <div>
                <div style={{ fontSize: '15px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>Readiness Enhancement</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0066cc', marginBottom: '4px' }}>37%</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.5 }}>Of engaged personnel who improve job performance (Mission 17% + Resilience 15% + Standards 5%).</div>
              </div>
              <div>
                <div style={{ fontSize: '15px', color: '#666', marginBottom: '8px', fontWeight: '600' }}>FECA Claims Prevention</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#cc3333', marginBottom: '4px' }}>22%</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.5 }}>Reduction in mental health workers' comp claims.</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Select Your Organization or Sector</h2>
          <p style={{ color: '#aaa', marginBottom: '24px', fontSize: '15px' }}>Choose your CBP component. All parameters can be customized after selection.</p>
          
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '16px', fontSize: '16px' }}
          />

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedCategory === cat ? '#0066cc' : '#333',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ background: '#2a2a2a', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1a1a1a' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#aaa', fontWeight: '600', fontSize: '15px' }}>Organization / Sector</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600', fontSize: '15px' }}>Personnel</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600', fontSize: '15px' }}>Location</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600', fontSize: '15px' }}>Preset</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600', fontSize: '15px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org, idx) => (
                  <tr key={org.id} style={{ borderTop: idx > 0 ? '1px solid #333' : 'none' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ color: 'white', fontWeight: '600', marginBottom: '4px', fontSize: '15px' }}>{org.name}</div>
                      <div style={{ color: '#888', fontSize: '14px' }}>{org.description}</div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>{org.personnel.toLocaleString()}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>{org.location}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ padding: '6px 14px', borderRadius: '12px', background: '#00cc66', color: 'white', fontSize: '13px', fontWeight: 'bold' }}>Yes</span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button onClick={() => onSelect(org)} style={{ padding: '10px 28px', borderRadius: '8px', border: 'none', background: '#0066cc', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const CBPROICalculator = ({ workforce }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seats, setSeats] = useState(Math.round(workforce.personnel * 0.15));
  const [engagementRate, setEngagementRate] = useState(65);
  const [costPerSeat, setCostPerSeat] = useState(150);
  const [showAssistant, setShowAssistant] = useState(false);
  
  const [drivers, setDrivers] = useState({
    missionReadiness: 17,
    resilience: 15,
    careerCommitment: 4,
    leadership: 3,
    professionalStandards: 5
  });

  const retentionEffectiveness = drivers.careerCommitment + drivers.leadership;
  const readinessEffectiveness = drivers.missionReadiness + drivers.resilience + drivers.professionalStandards;

  const calculations = useMemo(() => {
    const engaged = Math.round(seats * (engagementRate / 100));
    const separationsPrevented = Math.round(engaged * (retentionEffectiveness / 100));
    const retentionSavings = separationsPrevented * workforce.replacementCost;
    
    const avgClaimCost = 65000;
    const claimsRate = workforce.workersCompClaims / workforce.personnel;
    const expectedClaims = seats * claimsRate;
    const claimsPrevented = Math.round(expectedClaims * 0.22);
    const fecaSavings = claimsPrevented * avgClaimCost;
    
    const readinessImproved = Math.round(engaged * (readinessEffectiveness / 100));
    const readinessEconomicValue = readinessImproved * 15000;
    
    const totalAnnualSavings = retentionSavings + fecaSavings + readinessEconomicValue;
    const totalCost = seats * costPerSeat;
    const netSavings = totalAnnualSavings - totalCost;
    const roi = Math.round((netSavings / totalCost) * 100);
    const breakEvenMonths = (totalCost / totalAnnualSavings) * 12;
    
    return { 
      engaged, separationsPrevented, retentionSavings, claimsPrevented, fecaSavings, 
      readinessImproved, readinessEconomicValue, totalAnnualSavings, totalCost, 
      netSavings, roi, breakEvenMonths
    };
  }, [seats, engagementRate, workforce, retentionEffectiveness, readinessEffectiveness, costPerSeat]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '16px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ background: '#0066cc', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Shield size={40} color="white" />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{workforce.name}</h1>
              <p style={{ color: 'white', margin: '4px 0 0 0', fontSize: '15px' }}>{workforce.personnel.toLocaleString()} Personnel</p>
            </div>
          </div>
          <button onClick={() => window.location.reload()} style={{ padding: '12px 24px', borderRadius: '8px', border: '2px solid white', background: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Change Organization
          </button>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', borderRadius: '20px', padding: '32px', marginBottom: '32px', border: '3px solid #ffcc00', boxShadow: '0 8px 30px rgba(0,102,204,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#ffcc00', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(255,204,0,0.5)' }}>
              <DollarSign size={32} color="#0066cc" strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: '17px', color: 'white', fontWeight: '600', marginBottom: '4px' }}>ANNUAL IMPACT PROJECTION</div>
              <div style={{ fontSize: '52px', fontWeight: 'bold', color: 'white', lineHeight: 1 }}>${(calculations.netSavings / 1000000).toFixed(2)}M</div>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '20px', color: '#333', fontWeight: '500', lineHeight: 1.7 }}>
              BetterUp saves {workforce.name} <strong style={{ color: '#0066cc', fontSize: '24px' }}>${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M annually</strong> through 
              <strong style={{ color: '#cc3333', fontSize: '22px' }}> (1) reducing costly FECA mental health claims</strong> and 
              <strong style={{ color: '#ff9900', fontSize: '22px' }}> (2) preventing high-cost turnover</strong>.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffcc00' }}>{calculations.separationsPrevented}</div>
              <div style={{ fontSize: '15px', color: 'white' }}>Separations Prevented</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff6666' }}>{calculations.claimsPrevented}</div>
              <div style={{ fontSize: '15px', color: 'white' }}>Claims Prevented</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00ff88' }}>{calculations.roi.toLocaleString()}%</div>
              <div style={{ fontSize: '15px', color: 'white' }}>ROI</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #ddd', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Calculator },
            { id: 'drivers', label: 'Performance Drivers', icon: TrendingUp },
            { id: 'parameters', label: 'Parameters', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  background: activeTab === tab.id ? '#0066cc' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#666',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  fontSize: '16px',
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {[
                { label: 'Total Savings', value: `$${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M`, color: '#0066cc', icon: DollarSign },
                { label: 'Program Cost', value: `$${(calculations.totalCost / 1000000).toFixed(2)}M`, color: '#666', icon: Calculator },
                { label: 'Net Benefit', value: `$${(calculations.netSavings / 1000000).toFixed(2)}M`, color: '#00cc66', icon: TrendingUp },
                { label: 'Break-Even', value: `${calculations.breakEvenMonths.toFixed(1)} months`, color: '#ff9900', icon: Activity }
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} style={{ background: 'white', borderRadius: '12px', padding: '26px', borderLeft: `5px solid ${metric.color}`, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ fontSize: '17px', color: '#666', fontWeight: '600' }}>{metric.label}</div>
                      <Icon size={24} color={metric.color} />
                    </div>
                    <div style={{ fontSize: '38px', fontWeight: 'bold', color: metric.color }}>{metric.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px', color: '#0066cc' }}>Performance Drivers</h2>
                <p style={{ fontSize: '17px', color: '#666', margin: 0, lineHeight: 1.6 }}>
                  Aligned to CBP strategic objectives and OPM competencies
                </p>
              </div>
              <div style={{ background: '#e6f2ff', padding: '20px 28px', borderRadius: '12px', border: '2px solid #0066cc' }}>
                <div style={{ fontSize: '17px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px' }}>Combined Impact</div>
                <div style={{ fontSize: '16px', color: '#333', marginBottom: '4px' }}>
                  Retention: <strong style={{ color: '#ff9900', fontSize: '22px' }}>{retentionEffectiveness}%</strong>
                </div>
                <div style={{ fontSize: '16px', color: '#333' }}>
                  Readiness: <strong style={{ color: '#0066cc', fontSize: '22px' }}>{readinessEffectiveness}%</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '26px' }}>
              {[
                { key: 'missionReadiness', label: 'Mission Readiness', desc: 'Rapid decision-making • Cognitive agility • Sustained performance', opm: 'OPM: "Analyze information rapidly and take prompt action"', affects: 'Readiness', color: '#0066cc' },
                { key: 'resilience', label: 'Resilience & Mental Wellness', desc: 'Burnout prevention • Stress management • Emotional regulation', opm: 'Addresses: 156 suicides (2007-2022), morale crisis', affects: 'Both', color: '#00cc66' },
                { key: 'careerCommitment', label: 'Career Commitment', desc: 'Purpose & meaning • Career development • Work-life integration', opm: '2028 retirement cliff: 2,200+ officers', affects: 'Retention', color: '#ff9900' },
                { key: 'leadership', label: 'Leadership Effectiveness', desc: 'Communication • Strategic thinking • Supervisory competencies', opm: '#1 exit reason: Poor leadership communication', affects: 'Both', color: '#9966cc' },
                { key: 'professionalStandards', label: 'Professional Standards', desc: 'Ethical decision-making • Sound judgment • Professional demeanor', opm: 'CBP Standards of Conduct compliance', affects: 'Both', color: '#cc3333' }
              ].map(driver => (
                <div key={driver.key} style={{ padding: '26px', background: '#f8f9fa', borderRadius: '12px', borderLeft: `5px solid ${driver.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{driver.label}</h3>
                      <p style={{ fontSize: '16px', color: '#666', margin: '0 0 10px 0', lineHeight: 1.5 }}>{driver.desc}</p>
                      <p style={{ fontSize: '15px', color: '#888', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>{driver.opm}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '40px', fontWeight: 'bold', color: driver.color, lineHeight: 1 }}>{drivers[driver.key]}%</div>
                      <div style={{ fontSize: '14px', color: '#888', marginTop: '6px' }}>Affects {driver.affects}</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={drivers[driver.key]}
                    onChange={(e) => setDrivers({ ...drivers, [driver.key]: parseInt(e.target.value) })}
                    style={{ width: '100%', height: '8px', accentColor: driver.color }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#888', marginTop: '10px' }}>
                    <span>0%</span>
                    <span>10%</span>
                    <span>20%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px', color: '#0066cc' }}>Model Parameters</h2>
            
            <div style={{ display: 'grid', gap: '26px' }}>
              <div style={{ padding: '22px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#333' }}>
                  Program Seats: {seats.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={Math.round(workforce.personnel * 0.05)}
                  max={Math.round(workforce.personnel * 0.3)}
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#0066cc' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#666', marginTop: '10px' }}>
                  <span>{Math.round(workforce.personnel * 0.05).toLocaleString()} (5%)</span>
                  <span>{Math.round(workforce.personnel * 0.15).toLocaleString()} (15%)</span>
                  <span>{Math.round(workforce.personnel * 0.3).toLocaleString()} (30%)</span>
                </div>
              </div>

              <div style={{ padding: '22px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#333' }}>
                  Engagement Rate: {engagementRate}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="85"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#00cc66' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#666', marginTop: '10px' }}>
                  <span>50%</span>
                  <span>65%</span>
                  <span>85%</span>
                </div>
              </div>

              <div style={{ padding: '22px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#333' }}>
                  Cost per Seat: ${costPerSeat}/year
                </label>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="50"
                  value={costPerSeat}
                  onChange={(e) => setCostPerSeat(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#ff9900' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#666', marginTop: '10px' }}>
                  <span>$100</span>
                  <span>$200</span>
                  <span>$300</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAssistant && (
          <div style={{ position: 'fixed', bottom: '100px', right: '24px', width: '400px', maxWidth: '90vw', background: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', zIndex: 1000, border: '2px solid #0066cc' }}>
            <div style={{ background: '#0066cc', padding: '18px', borderRadius: '14px 14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={22} color="white" />
                <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', margin: 0 }}>Model Assistant</h3>
              </div>
              <button onClick={() => setShowAssistant(false)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: '22px' }}>
              <p style={{ fontSize: '16px', marginBottom: '18px', color: '#333', lineHeight: 1.6 }}>
                I can help explain the calculator methodology.
              </p>
            </div>
          </div>
        )}

        <button onClick={() => setShowAssistant(!showAssistant)} style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#0066cc', color: 'white', padding: '18px', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,102,204,0.4)', zIndex: 999 }}>
          <MessageSquare size={26} />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedWorkforce, setSelectedWorkforce] = useState(null);
  if (!selectedWorkforce) return <LandingPage onSelect={setSelectedWorkforce} />;
  return <CBPROICalculator workforce={selectedWorkforce} />;
};

export default App;