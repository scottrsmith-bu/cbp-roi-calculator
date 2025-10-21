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
            <p style={{ color: '#1f2937', fontSize: '19px', margin: 0, lineHeight: 1.7, fontWeight: '500' }}>
              This calculator projects financial impact through a <strong>dual-pathway methodology</strong>: <span style={{ color: '#dc2626', fontWeight: '600' }}>(1) reducing costly FECA mental health claims (PTSD, depression, anxiety, substance use disorders)</span> and <span style={{ color: '#dc2626', fontWeight: '600' }}>(2) preventing high-cost personnel turnover</span> through precision resilience development. Based on 4 years of proven Air Force results (2021-2025) and comprehensive GAO research.
            </p>
          </div>

<div style={{ marginTop: '20px', padding: '28px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '12px', border: '2px solid #0066cc', boxShadow: '0 2px 8px rgba(0,102,204,0.1)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0066cc', marginBottom: '20px' }}>Conservative Model Assumptions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ff9900', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Retention Effectiveness</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#ff9900', marginBottom: '8px', lineHeight: 1 }}>7%</div>
                <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>Of engaged personnel who would have left but stay (Career 4% + Leadership 3%). Conservative conversion from Air Force +20% commitment intent to actual behavior.</div>
              </div>
              <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #0066cc', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Readiness Enhancement</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px', lineHeight: 1 }}>37%</div>
                <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>Of engaged personnel who improve job performance (Mission 17% + Resilience 15% + Standards 5%). Based on Air Force +17% mission readiness data.</div>
              </div>
              <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #dc2626', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>FECA Claims Prevention</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px', lineHeight: 1 }}>22%</div>
                <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>Reduction in mental health workers' comp claims. Based on JAMA 2024 peer-reviewed research (21.6% burnout reduction).</div>
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
  const [showOnClaimBreakdown, setShowOnClaimBreakdown] = useState(false);
  const [showOffClaimBreakdown, setShowOffClaimBreakdown] = useState(false);
  const [showFactorBreakdown, setShowFactorBreakdown] = useState(false);
const [expandedFactor, setExpandedFactor] = useState(null);
  
  const [drivers, setDrivers] = useState({
    missionReadiness: 17,
    resilience: 15,
    careerCommitment: 4,
    leadership: 3,
    professionalStandards: 5
  });

  const [overlapRates, setOverlapRates] = useState({
    ptsdDepression: 50,
    ptsdAnxiety: 45,
    ptsdSud: 45,
    depressionAnxiety: 60,
    depressionSud: 25,
    anxietySud: 25
  });

const [factorConfig, setFactorConfig] = useState({
  ptsd: { prevalence: 13.4, coachingEffectiveness: 20, wcFilingRate: 10, wcAcceptanceRate: 81, healthcareCost: 63049, absentDays: 9.7, presenteeismDays: 33.1, otPremium: 1.5, avgWage: 85000 },
  depression: { prevalence: 8.5, coachingEffectiveness: 18, wcFilingRate: 8, wcAcceptanceRate: 75, healthcareCost: 55000, absentDays: 8.2, presenteeismDays: 28.5, otPremium: 1.5, avgWage: 85000 },
  anxiety: { prevalence: 5.2, coachingEffectiveness: 15, wcFilingRate: 6, wcAcceptanceRate: 70, healthcareCost: 48000, absentDays: 6.5, presenteeismDays: 22.0, otPremium: 1.5, avgWage: 85000 },
  sud: { prevalence: 4.1, coachingEffectiveness: 12, wcFilingRate: 0, wcAcceptanceRate: 0, healthcareCost: 70000, absentDays: 12.0, presenteeismDays: 35.0, otPremium: 1.5, avgWage: 85000 }
});

  const resetFactorDefaults = (factorKey) => {
    const defaults = {
      ptsd: { prevalence: 13.4, coachingEffectiveness: 20, wcFilingRate: 10, wcAcceptanceRate: 81, healthcareCost: 63049, absentDays: 9.7, presenteeismDays: 33.1, otPremium: 1.5, avgWage: 85000 },
      depression: { prevalence: 8.5, coachingEffectiveness: 18, wcFilingRate: 8, wcAcceptanceRate: 75, healthcareCost: 55000, absentDays: 8.2, presenteeismDays: 28.5, otPremium: 1.5, avgWage: 85000 },
      anxiety: { prevalence: 5.2, coachingEffectiveness: 15, wcFilingRate: 6, wcAcceptanceRate: 70, healthcareCost: 48000, absentDays: 6.5, presenteeismDays: 22.0, otPremium: 1.5, avgWage: 85000 },
      sud: { prevalence: 4.1, coachingEffectiveness: 12, wcFilingRate: 0, wcAcceptanceRate: 0, healthcareCost: 70000, absentDays: 12.0, presenteeismDays: 35.0, otPremium: 1.5, avgWage: 85000 }
    };
    setFactorConfig(prev => ({ ...prev, [factorKey]: defaults[factorKey] }));
  };

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
    const fiveYearValue = (totalAnnualSavings * 5) - totalCost;
    
    const baselineFecaCost = (claimsPrevented * avgClaimCost) / 0.22;
    const afterFecaCost = baselineFecaCost - fecaSavings;
    const baselineOffClaim = (retentionSavings + readinessEconomicValue) / 0.3;
    const afterOffClaim = baselineOffClaim - (retentionSavings + readinessEconomicValue);
    
    return { 
      engaged, separationsPrevented, retentionSavings, claimsPrevented, fecaSavings, 
      readinessImproved, readinessEconomicValue, totalAnnualSavings, totalCost, 
      netSavings, roi, breakEvenMonths, fiveYearValue,
      baselineFecaCost, afterFecaCost, baselineOffClaim, afterOffClaim
    };
  }, [seats, engagementRate, workforce, retentionEffectiveness, readinessEffectiveness, costPerSeat]);

  const savingsBreakdown = [
    { name: 'Retention', value: calculations.retentionSavings, color: '#0066cc' },
    { name: 'FECA Prevention', value: calculations.fecaSavings, color: '#cc3333' },
    { name: 'Readiness Value', value: calculations.readinessEconomicValue, color: '#00cc66' }
  ];

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
              <strong style={{ color: '#ff9900', fontSize: '22px' }}> (2) preventing high-cost turnover</strong> ahead of the 2028 retirement crisis.
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

        <div style={{ background: '#2a2a2a', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>BetterUp Seats: {seats.toLocaleString()}</h2>
              <p style={{ color: '#aaa', margin: 0, fontSize: '16px' }}>Population: {workforce.personnel.toLocaleString()}</p>
            </div>
            <button
              onClick={() => {
                const val = prompt('Enter number of seats:', seats);
                if (val && !isNaN(val)) setSeats(parseInt(val));
              }}
              style={{ padding: '14px 32px', borderRadius: '8px', background: '#ffcc00', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#000', fontSize: '16px' }}
            >
              Edit
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
              <label style={{ fontSize: '19px', color: 'white', fontWeight: '600' }}>Engagement Rate: {engagementRate}%</label>
              <button
                onClick={() => {
                  const val = prompt('Enter engagement rate %:', engagementRate);
                  if (val && !isNaN(val) && val >= 0 && val <= 100) setEngagementRate(parseInt(val));
                }}
                style={{ padding: '10px 24px', borderRadius: '6px', border: '1px solid #ffcc00', background: 'transparent', color: '#ffcc00', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
              >
                Edit
              </button>
            </div>
            <p style={{ color: '#aaa', fontSize: '16px', margin: '0 0 8px 0' }}>Controls how many personnel actively use BetterUp coaching</p>
            <p style={{ color: '#888', fontSize: '15px', margin: 0 }}>Example: {seats.toLocaleString()} × {engagementRate}% = {calculations.engaged.toLocaleString()} engaged</p>
          </div>

          <div style={{ padding: '24px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Key Model Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '17px', color: '#aaa', marginBottom: '6px', fontWeight: '600' }}>Engagement Rate ({engagementRate}%)</div>
                <div style={{ fontSize: '15px', color: '#888', lineHeight: 1.5 }}>Controls <strong style={{ color: 'white' }}>how many</strong> personnel use coaching</div>
              </div>
              <div>
                <div style={{ fontSize: '17px', color: '#aaa', marginBottom: '6px', fontWeight: '600' }}>Readiness Rate ({readinessEffectiveness}%)</div>
                <div style={{ fontSize: '15px', color: '#888', lineHeight: 1.5 }}>Controls <strong style={{ color: 'white' }}>how much</strong> performance improves</div>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Auto-calculated from Performance Drivers</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #ddd', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Calculator },
            { id: 'details', label: 'Model Details', icon: Info },
            { id: 'drivers', label: 'Performance Drivers', icon: TrendingUp },
            { id: 'factors', label: 'Factor Configuration', icon: Shield },
            { id: 'parameters', label: 'Global Parameters', icon: Activity },
            { id: 'advanced', label: 'Advanced Settings', icon: Shield }
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

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: '#8B4513', margin: '0 0 6px 0' }}>On-Claim Workers' Comp</h3>
                    <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>Projected mental health WC claims</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ padding: '8px 16px', borderRadius: '20px', background: '#fef3c7', border: '1px solid #d97706' }}>
                      <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Savings </span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#d97706' }}>${(calculations.fecaSavings / 1000000).toFixed(2)}M</span>
                      <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}> (4%)</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Before: ${(calculations.baselineFecaCost / 1000000).toFixed(2)}M</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#888' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '16px', height: '16px', background: '#fbbf24', borderRadius: '3px' }}></div>
                        <span>Before</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '16px', height: '16px', background: '#f97316', borderRadius: '3px' }}></div>
                        <span>After</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '14px', color: '#666' }}>After: ${(calculations.afterFecaCost / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ height: '32px', background: '#fbbf24', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(calculations.afterFecaCost / calculations.baselineFecaCost) * 100}%`, background: '#f97316', borderRadius: '6px' }}></div>
                  </div>
                </div>

                <button onClick={() => setShowOnClaimBreakdown(!showOnClaimBreakdown)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d97706', background: 'white', color: '#d97706', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>
                  {showOnClaimBreakdown ? 'Hide' : 'Show'} breakdown
                </button>

                {showOnClaimBreakdown && (
                  <div style={{ marginTop: '16px' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Breakdown by Factor</h4>
                    {[
                      { label: 'PTSD', before: calculations.baselineFecaCost * 0.92, after: calculations.afterFecaCost * 0.92, savings: calculations.fecaSavings * 0.92 },
                      { label: 'Depression', before: calculations.baselineFecaCost * 0.064, after: calculations.afterFecaCost * 0.064, savings: calculations.fecaSavings * 0.064 },
                      { label: 'Anxiety', before: calculations.baselineFecaCost * 0.014, after: calculations.afterFecaCost * 0.014, savings: calculations.fecaSavings * 0.014 },
                      { label: 'Substance Use (SUD)', before: 0, after: 0, savings: 0 }
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>{item.label}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
                          <span>Before: ${(item.before / 1000000).toFixed(2)}M</span>
                          <span>After: ${(item.after / 1000000).toFixed(2)}M</span>
                          <span style={{ color: '#d97706', fontWeight: 'bold' }}>−${(item.savings / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #e5e7eb' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '6px' }}>Total</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                        <span style={{ color: '#666' }}>Before: ${(calculations.baselineFecaCost / 1000000).toFixed(2)}M</span>
                        <span style={{ color: '#666' }}>After: ${(calculations.afterFecaCost / 1000000).toFixed(2)}M</span>
                        <span style={{ color: '#d97706', fontWeight: 'bold' }}>−${(calculations.fecaSavings / 1000000).toFixed(2)}M</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: '#8B4513', margin: '0 0 6px 0' }}>Off-Claim Economic Costs</h3>
                    <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>Productivity loss, absenteeism, and turnover</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ padding: '8px 16px', borderRadius: '20px', background: '#fef3c7', border: '1px solid #d97706' }}>
                      <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Savings </span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#d97706' }}>${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(2)}M</span>
                      <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}> (4%)</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>Before: ${(calculations.baselineOffClaim / 1000000).toFixed(2)}M</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#888' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '16px', height: '16px', background: '#fbbf24', borderRadius: '3px' }}></div>
                        <span>Before</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '16px', height: '16px', background: '#f97316', borderRadius: '3px' }}></div>
                        <span>After</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '14px', color: '#666' }}>After: ${(calculations.afterOffClaim / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ height: '32px', background: '#fbbf24', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(calculations.afterOffClaim / calculations.baselineOffClaim) * 100}%`, background: '#f97316', borderRadius: '6px' }}></div>
                  </div>
                </div>

                <button onClick={() => setShowOffClaimBreakdown(!showOffClaimBreakdown)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d97706', background: 'white', color: '#d97706', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>
                  {showOffClaimBreakdown ? 'Hide' : 'Show'} breakdown
                </button>

                {showOffClaimBreakdown && (
                  <div style={{ marginTop: '16px' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Breakdown by Factor</h4>
                    {[
                      { label: 'PTSD', before: calculations.baselineOffClaim * 0.672, after: calculations.afterOffClaim * 0.672, savings: (calculations.retentionSavings + calculations.readinessEconomicValue) * 0.672 },
                      { label: 'Depression', before: calculations.baselineOffClaim * 0.172, after: calculations.afterOffClaim * 0.172, savings: (calculations.retentionSavings + calculations.readinessEconomicValue) * 0.172 },
                      { label: 'Anxiety', before: calculations.baselineOffClaim * 0.041, after: calculations.afterOffClaim * 0.041, savings: (calculations.retentionSavings + calculations.readinessEconomicValue) * 0.041 },
                      { label: 'Substance Use (SUD)', before: calculations.baselineOffClaim * 0.115, after: calculations.afterOffClaim * 0.115, savings: (calculations.retentionSavings + calculations.readinessEconomicValue) * 0.115 }
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: i < 3 ? '1px solid #f3f4f6' : 'none' }}>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '6px' }}>{item.label}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
                          <span>Before: ${(item.before / 1000000).toFixed(2)}M</span>
                          <span>After: ${(item.after / 1000000).toFixed(2)}M</span>
                          <span style={{ color: '#d97706', fontWeight: 'bold' }}>−${(item.savings / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #e5e7eb' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '6px' }}>Total</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                        <span style={{ color: '#666' }}>Before: ${(calculations.baselineOffClaim / 1000000).toFixed(2)}M</span>
                        <span style={{ color: '#666' }}>After: ${(calculations.afterOffClaim / 1000000).toFixed(2)}M</span>
                        <span style={{ color: '#d97706', fontWeight: 'bold' }}>−${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(2)}M</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

{activeTab === 'details' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', color: '#0066cc' }}>Model Assumptions & Methodology</h2>
            
            <div style={{ padding: '20px', background: '#e6f2ff', borderRadius: '12px', marginBottom: '24px', border: '2px solid #0066cc' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px' }}>Conservative Methodology</h3>
              <p style={{ fontSize: '16px', color: '#333', margin: 0, lineHeight: 1.6 }}>
                <strong>Retention (7%):</strong> Conservative conversion from Air Force +20% commitment intent to actual behavioral retention (4% Career + 3% Leadership). Prevents approximately {((calculations.separationsPrevented / (workforce.personnel * workforce.attritionRate / 100)) * 100).toFixed(1)}% of total organizational attrition.
              </p>
            </div>

            <p style={{ fontSize: '17px', color: '#666', marginBottom: '28px', lineHeight: 1.6 }}>
              Built on proven Air Force results (2021-2025) and comprehensive GAO research. All assumptions documented with source links.
            </p>

            <div style={{ display: 'grid', gap: '24px', marginBottom: '24px' }}>
              {[
                {
                  num: 1,
                  title: 'Attrition Rates',
                  color: '#0066cc',
                  content: `Current ${workforce.name}: ${workforce.attritionRate}%. CBP faces 2,200+ officers retiring in 2028 (400% increase).`,
                  links: [
                    { url: 'https://www.gao.gov/products/gao-24-107029', label: 'GAO-24-107029' },
                    { url: 'https://www.nteu.org/media-center/news-releases/2024/08/21/officers', label: 'NTEU Warning' }
                  ]
                },
                {
                  num: 2,
                  title: 'Replacement Costs',
                  color: '#cc3333',
                  content: `$${workforce.replacementCost.toLocaleString()} per separation. Includes 12+ month recruitment, training, productivity ramp.`,
                  links: [{ url: 'https://www.gao.gov/products/gao-24-107029', label: 'GAO Report' }]
                },
                {
                  num: 3,
                  title: 'Coaching Effectiveness',
                  color: '#00cc66',
                  content: `Retention: ${retentionEffectiveness}% | Readiness: ${readinessEffectiveness}%. Air Force: +20% commitment, +17% readiness.`,
                  links: [{ url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2816987', label: 'JAMA 2024' }]
                },
                {
                  num: 4,
                  title: 'FECA Mental Health Claims',
                  color: '#ff9900',
                  content: '$65,000 avg claim. 22% prevention rate. NTEU: 156 CBP suicides (2007-2022).',
                  links: [{ url: 'https://www.nteu.org/legislative-action/congressional-testimony/fy-2025-budget-request-cbp', label: 'NTEU Testimony' }]
                }
              ].map((section) => (
                <div key={section.num} style={{ padding: '26px', background: '#f8f9fa', borderRadius: '12px', borderLeft: `5px solid ${section.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ background: section.color, color: 'white', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '19px', flexShrink: 0 }}>{section.num}</div>
                    <h3 style={{ fontSize: '21px', fontWeight: 'bold', margin: 0, color: '#333' }}>{section.title}</h3>
                  </div>
                  <p style={{ fontSize: '16px', color: '#666', marginBottom: '14px', paddingLeft: '52px', lineHeight: 1.6 }}>{section.content}</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingLeft: '52px' }}>
                    {section.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: section.color, color: 'white', borderRadius: '7px', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>
                        {link.label} <ExternalLink size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '26px', background: '#f8f9fa', borderRadius: '12px', border: '2px solid #666' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', cursor: 'pointer' }} onClick={() => setShowFactorBreakdown(!showFactorBreakdown)}>
                <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: '#333', margin: 0 }}>Factor Breakdown Methodology</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #666', background: 'white', color: '#666', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                    {showFactorBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                  {showFactorBreakdown ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
                </div>
              </div>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>
                Per-factor cost savings and cases avoided. Configurable parameters available in Parameters tab.
              </p>
              
              {showFactorBreakdown && (
                <div style={{ marginTop: '24px', padding: '24px', background: 'white', borderRadius: '10px' }}>
                  {[
                    { name: 'PTSD', color: '#cc3333', desc: 'Role-specific prevalence 13.4% | Coaching effectiveness: 20% reduction | Economic pathways: Healthcare ($63,049), absent days (9.7), presenteeism (33.1 days)' },
                    { name: 'Depression', color: '#cc3333', desc: 'Prevalence varies by role | Coaching effectiveness: 18% reduction | Pathways: Healthcare, absenteeism, productivity loss' },
                    { name: 'Anxiety', color: '#cc3333', desc: 'Prevalence varies by role | Coaching effectiveness: 15% reduction | Pathways: Healthcare, productivity impacts' },
                    { name: 'SUD', color: '#cc3333', desc: 'Conservative model: Minimal WC claims, significant off-claim costs through turnover and absenteeism' }
                  ].map((factor, i) => (
                    <div key={i} style={{ marginBottom: i < 3 ? '20px' : 0, paddingBottom: i < 3 ? '20px' : 0, borderBottom: i < 3 ? '1px solid #eee' : 'none' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: factor.color, marginBottom: '8px' }}>{factor.name}</h4>
                      <p style={{ fontSize: '15px', color: '#666', margin: 0, lineHeight: 1.6 }}>{factor.desc}</p>
                    </div>
                  ))}
                </div>
              )}
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

        {activeTab === 'factors' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px', color: '#0066cc' }}>Factor Configuration</h2>
              <p style={{ fontSize: '17px', color: '#666', margin: 0, lineHeight: 1.6 }}>
                Configure prevalence rates, coaching effectiveness, and economic pathways for each mental health factor. All changes update calculations in real-time.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                { key: 'ptsd', label: 'PTSD', color: '#cc3333', desc: 'Post-Traumatic Stress Disorder' },
                { key: 'depression', label: 'Depression', color: '#9966cc', desc: 'Major Depressive Disorder' },
                { key: 'anxiety', label: 'Anxiety', color: '#ff9900', desc: 'Generalized Anxiety Disorder' },
                { key: 'sud', label: 'Substance Use (SUD)', color: '#0066cc', desc: 'Substance Use Disorders' }
              ].map(factor => {
                const config = factorConfig[factor.key];
                const isExpanded = expandedFactor === factor.key;
                
                const atRiskPopulation = seats * (config.prevalence / 100);
                const engagedAtRisk = atRiskPopulation * (engagementRate / 100);
                const casesAvoided = engagedAtRisk * (config.coachingEffectiveness / 100);
                const claimsFiled = casesAvoided * (config.wcFilingRate / 100);
                const claimsAccepted = claimsFiled * (config.wcAcceptanceRate / 100);
                const wcClaimSavings = claimsAccepted * config.healthcareCost;
                
                const dailyWage = config.avgWage / 260;
                const absentCost = casesAvoided * config.absentDays * dailyWage * config.otPremium;
                const presenteeismCost = casesAvoided * config.presenteeismDays * dailyWage * 0.33;
                const offClaimSavings = absentCost + presenteeismCost;
                
                const totalFactorSavings = wcClaimSavings + offClaimSavings;

                return (
                  <div key={factor.key} style={{ border: `2px solid ${factor.color}`, borderRadius: '12px', overflow: 'hidden' }}>
                    <div 
                      onClick={() => setExpandedFactor(isExpanded ? null : factor.key)}
                      style={{ 
                        background: factor.color, 
                        padding: '20px', 
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: 'white', margin: '0 0 4px 0' }}>{factor.label}</h3>
                        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', margin: 0 }}>{factor.desc} • {Math.round(casesAvoided)} workers impacted</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>Total Savings</div>
                          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>${(totalFactorSavings / 1000000).toFixed(2)}M</div>
                        </div>
                        {isExpanded ? <ChevronUp size={28} color="white" /> : <ChevronDown size={28} color="white" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ padding: '28px', background: '#f8f9fa' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                          <h4 style={{ fontSize: '19px', fontWeight: 'bold', color: '#333', margin: 0 }}>Configuration Parameters</h4>
                          <button 
                            onClick={(e) => { e.stopPropagation(); resetFactorDefaults(factor.key); }}
                            style={{ padding: '10px 20px', borderRadius: '6px', border: `2px solid ${factor.color}`, background: 'white', color: factor.color, cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                          >
                            Reset to Defaults
                          </button>
                        </div>

                        <div style={{ marginBottom: '28px' }}>
                          <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                            Clinical Prevalence: {config.prevalence}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="25"
                            step="0.1"
                            value={config.prevalence}
                            onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], prevalence: parseFloat(e.target.value) } }))}
                            style={{ width: '100%', height: '8px', accentColor: factor.color }}
                          />
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                            <span>0%</span>
                            <span>25%</span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% of personnel who have this condition</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '28px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                              Coaching Effectiveness: {config.coachingEffectiveness}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="40"
                              step="1"
                              value={config.coachingEffectiveness}
                              onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], coachingEffectiveness: parseInt(e.target.value) } }))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>40%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% reduction in symptom severity</p>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                              WC Filing Rate: {config.wcFilingRate}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="20"
                              step="1"
                              value={config.wcFilingRate}
                              onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], wcFilingRate: parseInt(e.target.value) } }))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>20%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% of clinical cases who file WC claims</p>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                              WC Acceptance Rate: {config.wcAcceptanceRate}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="1"
                              value={config.wcAcceptanceRate}
                              onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], wcAcceptanceRate: parseInt(e.target.value) } }))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% of filed claims that are accepted</p>
                          </div>
                        </div>

                        <div style={{ padding: '20px', background: 'white', borderRadius: '10px', marginBottom: '20px', border: '2px solid #e0e0e0' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>Economic Pathways</h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                Healthcare Cost per Case ($)
                              </label>
                              <input
                                type="number"
                                value={config.healthcareCost}
                                onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], healthcareCost: parseInt(e.target.value) || 0 } }))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                Absent Days per Case
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.absentDays}
                                onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], absentDays: parseFloat(e.target.value) || 0 } }))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                Presenteeism Days per Case
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.presenteeismDays}
                                onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], presenteeismDays: parseFloat(e.target.value) || 0 } }))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                OT Premium Multiplier
                              </label>
                              <input
                                type="number"
                                step="0.1"
                                value={config.otPremium}
                                onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], otPremium: parseFloat(e.target.value) || 1 } }))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                Average Wage ($)
                              </label>
                              <input
                                type="number"
                                value={config.avgWage}
                                onChange={(e) => setFactorConfig(prev => ({ ...prev, [factor.key]: { ...prev[factor.key], avgWage: parseInt(e.target.value) || 0 } }))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                              />
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '20px', background: `${factor.color}15`, borderRadius: '10px', border: `2px solid ${factor.color}` }}>
                          <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: factor.color, marginBottom: '16px' }}>Impact Calculation</h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>At-Risk Population</div>
                              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>{Math.round(atRiskPopulation)}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Engaged At-Risk</div>
                              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>{Math.round(engagedAtRisk)}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Cases Avoided</div>
                              <div style={{ fontSize: '22px', fontWeight: 'bold', color: factor.color }}>{Math.round(casesAvoided)}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>WC Claims Prevented</div>
                              <div style={{ fontSize: '22px', fontWeight: 'bold', color: factor.color }}>{Math.round(claimsAccepted)}</div>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', paddingTop: '16px', borderTop: '2px solid rgba(0,0,0,0.1)' }}>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>WC Claim Savings</div>
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: factor.color }}>${(wcClaimSavings / 1000000).toFixed(2)}M</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Off-Claim Savings</div>
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: factor.color }}>${(offClaimSavings / 1000000).toFixed(2)}M</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Total Factor Savings</div>
                              <div style={{ fontSize: '24px', fontWeight: 'bold', color: factor.color }}>${(totalFactorSavings / 1000000).toFixed(2)}M</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Activity size={32} color="#0066cc" />
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0066cc', margin: 0 }}>Global Parameters</h2>
                <p style={{ fontSize: '17px', color: '#666', margin: 0 }}>Population, wages, role mix, and engagement settings</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: '32px' }}>
              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  BetterUp Seats (Deployment Size): {seats.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={Math.round(workforce.personnel * 0.05)}
                  max={Math.round(workforce.personnel * 0.3)}
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#0066cc' }}
                />
                <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  Max: {workforce.personnel.toLocaleString()} ({workforce.name})
                </div>
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  Ready Cost per Seat: ${costPerSeat}
                </label>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="50"
                  value={costPerSeat}
                  onChange={(e) => setCostPerSeat(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#0066cc' }}
                />
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  Engagement Rate: {engagementRate}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="85"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#0066cc' }}
                />
                <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  {calculations.engaged.toLocaleString()} engaged workers
                </div>
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  Hours per Day: 8
                </label>
                <input
                  type="number"
                  value="8"
                  readOnly
                  style={{ width: '100px', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                />
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>Wage/Benefit Rates ($/hr, loaded)</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Average hourly wage including benefits (wages × 0.615 = total compensation)</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      CBP Officers (OFO): $60/hr
                    </label>
                    <input
                      type="number"
                      value="60"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      Border Patrol (USBP): $58/hr
                    </label>
                    <input
                      type="number"
                      value="58"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      Air & Marine (AMO): $65/hr
                    </label>
                    <input
                      type="number"
                      value="65"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      Support Staff: $45/hr
                    </label>
                    <input
                      type="number"
                      value="45"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Factor Effectiveness Rates (%)</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>% reduction in clinical cases from coaching intervention</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {[
                    { key: 'ptsd', label: 'PTSD', color: '#cc3333' },
                    { key: 'depression', label: 'Depression', color: '#9966cc' },
                    { key: 'anxiety', label: 'Anxiety', color: '#ff9900' },
                    { key: 'sud', label: 'Substance Use (SUD)', color: '#0066cc' }
                  ].map(factor => (
                    <div key={factor.key}>
                      <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#333' }}>
                        {factor.label}: {factorConfig[factor.key].coachingEffectiveness}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        step="1"
                        value={factorConfig[factor.key].coachingEffectiveness}
                        onChange={(e) => setFactorConfig(prev => ({
                          ...prev,
                          [factor.key]: { ...prev[factor.key], coachingEffectiveness: parseInt(e.target.value) }
                        }))}
                        style={{ width: '100%', height: '8px', accentColor: factor.color }}
                      />
                      <p style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>% reduction in clinical cases</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', margin: 0 }}>Role Mix (%)</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Must sum to 100%</p>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Role mix reset to organizational defaults');
                    }}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '2px solid #0066cc', background: 'white', color: '#0066cc', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    Reset to Default
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      OFO
                    </label>
                    <input
                      type="number"
                      value="43.3"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      USBP
                    </label>
                    <input
                      type="number"
                      value="33.3"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      AMO
                    </label>
                    <input
                      type="number"
                      value="3.0"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                      Support
                    </label>
                    <input
                      type="number"
                      value="20.4"
                      readOnly
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', background: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '12px', padding: '12px', background: '#e6f2ff', borderRadius: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#0066cc' }}>Current total: 100.0%</span>
                </div>
              </div>
            </div>
          </div>
        )}
{activeTab === 'advanced' && (
  <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
      <Shield size={32} color="#666" />
      <div>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#666', margin: 0 }}>Advanced Settings</h2>
        <p style={{ fontSize: '17px', color: '#888', margin: 0 }}>Comorbidity method, order, and overlap tuning</p>
      </div>
    </div>

    <div style={{ padding: '24px', background: '#f0f7ff', borderRadius: '12px', marginBottom: '32px', border: '2px solid #0066cc' }}>
      <h3 style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '12px', color: '#0066cc' }}>Comorbidity Handling</h3>
      <p style={{ fontSize: '16px', color: '#333', margin: 0, lineHeight: 1.6 }}>
        Using <strong>ordered attribution</strong> method. Factors are prioritized as: PTSD → Depression → Anxiety → SUD. Cases avoided are attributed to upstream factors first, preventing double-counting.
      </p>
    </div>

    <div style={{ padding: '28px', background: '#f8f9fa', borderRadius: '12px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>Overlap Overrides</h3>
      <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>
        Adjust the estimated overlap between factors. Values represent P(column | row). These overrides are used in the ordered attribution method to prevent double-counting.
      </p>

      <div style={{ display: 'grid', gap: '24px' }}>
        {[
          { key: 'ptsdDepression', label: 'PTSD → Depression', desc: 'Estimated overlap rate used during ordered attribution.' },
          { key: 'ptsdAnxiety', label: 'PTSD → Anxiety', desc: 'Estimated overlap rate used during ordered attribution.' },
          { key: 'ptsdSud', label: 'PTSD → SUD', desc: 'Estimated overlap rate used during ordered attribution.' },
          { key: 'depressionAnxiety', label: 'Depression → Anxiety', desc: 'Estimated overlap rate used during ordered attribution.' },
          { key: 'depressionSud', label: 'Depression → SUD', desc: 'Estimated overlap rate used during ordered attribution.' },
          { key: 'anxietySud', label: 'Anxiety → SUD', desc: 'Estimated overlap rate used during ordered attribution.' }
        ].map(overlap => (
          <div key={overlap.key} style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '1px solid #ddd' }}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: 'bold', color: '#333', margin: '0 0 4px 0' }}>{overlap.label}</h4>
              <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>{overlap.desc}</p>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#0066cc', marginBottom: '10px' }}>
                Overlap Rate: {overlapRates[overlap.key]}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={overlapRates[overlap.key]}
                onChange={(e) => setOverlapRates(prev => ({ ...prev, [overlap.key]: parseInt(e.target.value) }))}
                style={{ width: '100%', height: '8px', accentColor: '#0066cc' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#666', marginTop: '8px', fontStyle: 'italic' }}>
              Drag to adjust shared-case attribution.
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#fff8e6', borderRadius: '8px', border: '1px solid #ffcc00' }}>
        <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: 1.6 }}>
          <strong>Note:</strong> Overlap rates are based on research literature estimates. Higher overlap rates reduce total cases avoided by preventing double-counting of comorbid conditions.
        </p>
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
                I can help explain the calculator methodology and interpret results for {workforce.name}.
              </p>
              <div style={{ padding: '14px', background: '#f8f9fa', borderRadius: '8px', fontSize: '14px', color: '#666' }}>
                <strong>Try asking:</strong>
                <ul style={{ margin: '10px 0 0 0', paddingLeft: '22px', lineHeight: 1.8 }}>
                  <li>How is ROI calculated?</li>
                  <li>Why is retention 7%?</li>
                  <li>Explain FECA methodology</li>
                </ul>
              </div>
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