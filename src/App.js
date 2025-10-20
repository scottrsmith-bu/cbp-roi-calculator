import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp, DollarSign, Shield, MessageSquare, Info, Activity, ExternalLink } from 'lucide-react';

const organizationData = [
  { id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 97500, workersCompClaims: 3100, category: 'All Units' },
  { id: 'ofo', name: 'Office of Field Operations', personnel: 26000, location: '328 Ports of Entry', preset: 'Yes', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 1340, category: 'Organization' },
  { id: 'usbp', name: 'U.S. Border Patrol', personnel: 20000, location: '20 Sectors Nationwide', preset: 'Yes', attritionRate: 7.2, replacementCost: 125000, workersCompClaims: 1500, category: 'Organization' },
  { id: 'swb', name: 'Southwest Border Ports', personnel: 8500, location: 'CA, AZ, NM, TX', preset: 'Yes', attritionRate: 6.8, replacementCost: 95000, workersCompClaims: 520, category: 'USBP Sector' },
  { id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', preset: 'Yes', attritionRate: 7.5, replacementCost: 115000, workersCompClaims: 285, category: 'USBP Sector' },
];

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Units');

  const categories = ['All Units', 'Organization', 'USBP Sector'];

  const filteredOrgs = organizationData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Units' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2f5c 0%, #004d7a 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Shield size={48} color="#0066cc" />
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', margin: 0 }}>U.S. Customs and Border Protection</h1>
              <p style={{ fontSize: '20px', color: '#666', margin: '8px 0 0 0' }}>BetterUp Retention & Wellness ROI Calculator</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>Select Your Organization</h2>
          
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '16px', fontSize: '16px' }}
          />

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedCategory === cat ? '#0066cc' : '#333',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ background: '#2a2a2a', borderRadius: '12px', overflow: 'hidden' }}>
            {filteredOrgs.map((org, idx) => (
              <div key={org.id} style={{ padding: '20px', borderTop: idx > 0 ? '1px solid #333' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'white', fontWeight: '600', marginBottom: '4px' }}>{org.name}</div>
                  <div style={{ color: '#888', fontSize: '14px' }}>{org.personnel.toLocaleString()} Personnel - {org.location}</div>
                </div>
                <button
                  onClick={() => onSelect(org)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#0066cc',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold'
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
};

const CBPROICalculator = ({ workforce }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seats, setSeats] = useState(Math.round(workforce.personnel * 0.15));
  const [engagementRate, setEngagementRate] = useState(65);
  const [costPerSeat] = useState(150);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showOnClaimBreakdown, setShowOnClaimBreakdown] = useState(false);
  const [showOffClaimBreakdown, setShowOffClaimBreakdown] = useState(false);
  
  const [drivers] = useState({
    missionReadiness: 27,
    resilience: 22,
    careerCommitment: 20,
    leadership: 18,
    professionalStandards: 13
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
    const fiveYearValue = (totalAnnualSavings * 5) - totalCost;
    
    return {
      engaged,
      separationsPrevented,
      retentionSavings,
      claimsPrevented,
      fecaSavings,
      readinessImproved,
      readinessEconomicValue,
      totalAnnualSavings,
      totalCost,
      netSavings,
      roi,
      breakEvenMonths,
      fiveYearValue
    };
  }, [seats, engagementRate, workforce, retentionEffectiveness, readinessEffectiveness, costPerSeat]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '16px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ background: '#0066cc', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Shield size={40} color="white" />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{workforce.name} ROI Calculator</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: '4px 0 0 0', fontSize: '14px' }}>
                {workforce.personnel.toLocaleString()} Personnel
              </p>
            </div>
          </div>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', borderRadius: '8px', border: '2px solid white', background: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            Change Organization
          </button>
        </div>

        <div style={{ background: '#0066cc', borderRadius: '20px', padding: '32px', marginBottom: '32px', border: '3px solid #ffcc00' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#ffcc00', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={32} color="#0066cc" strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: '16px', color: 'white', fontWeight: '600', marginBottom: '4px' }}>ANNUAL IMPACT PROJECTION</div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>${(calculations.netSavings / 1000000).toFixed(2)}M</div>
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '18px', color: 'white', fontWeight: '500', lineHeight: 1.5 }}>
              This calculator demonstrates BetterUp financial impact through dual-pathway methodology: 
              <span style={{ fontWeight: 'bold', color: '#ff6b6b', fontSize: '19px' }}> (1) reducing costly FECA mental health claims </span>
              and 
              <span style={{ fontWeight: 'bold', color: '#ffcc00', fontSize: '19px' }}> (2) preventing high-cost turnover </span>
              through precision development.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffcc00' }}>{calculations.separationsPrevented}</div>
              <div style={{ fontSize: '13px', color: 'white' }}>Separations Prevented</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff6b6b' }}>{calculations.claimsPrevented}</div>
              <div style={{ fontSize: '13px', color: 'white' }}>Claims Prevented</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ff88' }}>{calculations.roi}%</div>
              <div style={{ fontSize: '13px', color: 'white' }}>ROI</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#2a2a2a', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>BetterUp Seats: {seats.toLocaleString()}</h2>
              <p style={{ color: '#aaa', margin: 0 }}>Population: {workforce.personnel.toLocaleString()}</p>
            </div>
            <button
              onClick={() => {
                const newSeats = prompt('Enter seats:', seats);
                if (newSeats && !isNaN(newSeats)) setSeats(parseInt(newSeats));
              }}
              style={{ padding: '10px 24px', borderRadius: '8px', background: '#ffcc00', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Edit
            </button>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontSize: '16px', color: 'white' }}>Engagement Rate: {engagementRate}%</label>
              <button
                onClick={() => {
                  const newRate = prompt('Enter rate:', engagementRate);
                  if (newRate && !isNaN(newRate)) setEngagementRate(parseInt(newRate));
                }}
                style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #ffcc00', background: 'transparent', color: '#ffcc00', cursor: 'pointer' }}
              >
                Edit
              </button>
            </div>
            <p style={{ color: '#888', fontSize: '12px' }}>Example: {seats.toLocaleString()} × {engagementRate}% = {calculations.engaged.toLocaleString()} engaged</p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#0066cc' }}>Dashboard</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#cc3333' }}>On-Claim Workers Comp</h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#cc3333', marginBottom: '8px' }}>
                ${(calculations.fecaSavings / 1000000).toFixed(2)}M
              </div>
              <button onClick={() => setShowOnClaimBreakdown(!showOnClaimBreakdown)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cc3333', background: 'white', color: '#cc3333', cursor: 'pointer', fontSize: '12px' }}>
                {showOnClaimBreakdown ? 'Hide' : 'Show'} Breakdown
              </button>
              
              {showOnClaimBreakdown && (
                <div style={{ marginTop: '16px', padding: '16px', background: '#fff5f5', borderRadius: '8px' }}>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>PTSD</span>
                    <span style={{ fontWeight: 'bold' }}>${((calculations.fecaSavings * 0.92) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Depression</span>
                    <span style={{ fontWeight: 'bold' }}>${((calculations.fecaSavings * 0.064) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Anxiety</span>
                    <span style={{ fontWeight: 'bold' }}>${((calculations.fecaSavings * 0.014) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>SUD</span>
                    <span style={{ fontWeight: 'bold' }}>$0.00M</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc' }}>Off-Claim Economic Costs</h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px' }}>
                ${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(2)}M
              </div>
              <button onClick={() => setShowOffClaimBreakdown(!showOffClaimBreakdown)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #0066cc', background: 'white', color: '#0066cc', cursor: 'pointer', fontSize: '12px' }}>
                {showOffClaimBreakdown ? 'Hide' : 'Show'} Breakdown
              </button>
              
              {showOffClaimBreakdown && (
                <div style={{ marginTop: '16px', padding: '16px', background: '#f0f7ff', borderRadius: '8px' }}>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>PTSD</span>
                    <span style={{ fontWeight: 'bold' }}>${(((calculations.retentionSavings + calculations.readinessEconomicValue) * 0.672) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Depression</span>
                    <span style={{ fontWeight: 'bold' }}>${(((calculations.retentionSavings + calculations.readinessEconomicValue) * 0.172) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Anxiety</span>
                    <span style={{ fontWeight: 'bold' }}>${(((calculations.retentionSavings + calculations.readinessEconomicValue) * 0.041) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>SUD</span>
                    <span style={{ fontWeight: 'bold' }}>${(((calculations.retentionSavings + calculations.readinessEconomicValue) * 0.115) / 1000000).toFixed(2)}M</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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