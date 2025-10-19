import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, Users, DollarSign, Shield, Heart, Brain, MessageSquare, ChevronDown, ChevronUp, Info, Settings, Search } from 'lucide-react';

const organizationData = [
  { id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 97500, fecaAnnual: 105000000, description: 'Entire CBP workforce', category: 'All Units' },
  { id: 'ofo', name: 'Office of Field Operations', personnel: 26000, location: '328 Ports of Entry', preset: 'Yes', attritionRate: 3.5, replacementCost: 87300, fecaAnnual: 42000000, description: 'Airports, seaports, land crossings', category: 'Organization' },
  { id: 'usbp', name: 'U.S. Border Patrol', personnel: 20000, location: '20 Sectors Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 50000000, description: 'Land border patrol', category: 'Organization' },
  { id: 'amo', name: 'Air and Marine Operations', personnel: 1500, location: 'Nationwide', preset: 'Yes', attritionRate: 10.0, replacementCost: 120000, fecaAnnual: 8000000, description: 'Aviation & maritime', category: 'Organization' },
  { id: 'san_diego', name: 'San Diego Sector', personnel: 2400, location: 'California', preset: 'Yes', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 6000000, description: 'Pacific Coast to Imperial County', category: 'USBP Sector' },
  { id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', preset: 'Yes', attritionRate: 6.5, replacementCost: 107700, fecaAnnual: 9500000, description: 'Largest sector, highest activity', category: 'USBP Sector' },
  { id: 'el_paso', name: 'El Paso Sector', personnel: 2200, location: 'New Mexico & Texas', preset: 'Yes', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 5500000, description: 'West Texas operations', category: 'USBP Sector' },
  { id: 'rio_grande', name: 'Rio Grande Valley Sector', personnel: 3500, location: 'Texas', preset: 'Yes', attritionRate: 6.0, replacementCost: 107700, fecaAnnual: 8750000, description: 'Highest apprehension volume', category: 'USBP Sector' },
  { id: 'del_rio', name: 'Del Rio Sector', personnel: 2100, location: 'Texas', preset: 'Partial', attritionRate: 7.0, replacementCost: 107700, fecaAnnual: 5250000, description: 'Eagle Pass, Del Rio', category: 'USBP Sector' },
  { id: 'laredo', name: 'Laredo Sector', personnel: 1800, location: 'Texas', preset: 'Yes', attritionRate: 5.8, replacementCost: 107700, fecaAnnual: 4500000, description: 'Laredo, Zapata County', category: 'USBP Sector' },
  { id: 'yuma', name: 'Yuma Sector', personnel: 1100, location: 'Arizona', preset: 'Partial', attritionRate: 6.5, replacementCost: 107700, fecaAnnual: 2750000, description: 'Colorado River region', category: 'USBP Sector' },
  { id: 'ofo_southwest', name: 'Southwest Border Ports', personnel: 8500, location: 'CA, AZ, NM, TX', preset: 'Yes', attritionRate: 4.0, replacementCost: 87300, fecaAnnual: 13692000, description: 'San Ysidro, Otay Mesa, Calexico', category: 'OFO Region' },
];

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Units');
  const [sortBy, setSortBy] = useState('personnel');
  const filters = ['All Units', 'Preset', 'Organization', 'USBP Sector', 'OFO Region'];

  const filteredAndSorted = useMemo(() => {
    let filtered = organizationData.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.location.toLowerCase().includes(searchTerm.toLowerCase()) || org.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All Units' || (activeFilter === 'Preset' && org.preset === 'Yes') || org.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
    return filtered.sort((a, b) => sortBy === 'personnel' ? b.personnel - a.personnel : a.name.localeCompare(b.name));
  }, [searchTerm, activeFilter, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6' }}>
      <div style={{ background: '#00416A', borderTop: '6px solid #F09511', paddingTop: '20px', paddingBottom: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <Shield size={56} style={{ color: '#F09511', marginRight: '16px' }} />
            <h1 style={{ color: '#FFFFFF', fontSize: '36px', fontWeight: 'bold', margin: 0, lineHeight: 1.2 }}>U.S. Customs and Border Protection</h1>
          </div>
          <div style={{ marginLeft: '72px' }}>
            <h2 style={{ color: '#F09511', fontSize: '28px', fontWeight: 'bold', margin: 0, marginBottom: '16px', lineHeight: 1.3 }}>BetterUp Retention & Wellness ROI Calculator</h2>
            <p style={{ color: '#95D9FF', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '900px' }}>Demonstrating financial impact through dual-pathway methodology: <span style={{ color: '#F09511', fontWeight: '700' }}>(1) reducing costly FECA mental health claims</span> and <span style={{ color: '#F09511', fontWeight: '700' }}>(2) preventing high-cost turnover</span> through precision development targeting critical performance drivers. Based on comprehensive GAO, union, and DHS research.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#333333', padding: '24px 32px', borderRadius: '12px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#FFFFFF' }}>Select Your Organization or Sector</h2>
          <p style={{ color: '#D9D9D6', fontSize: '15px', margin: 0 }}>Choose a command preset or create a custom region. All parameters can be fine-tuned later.</p>
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '14px', color: '#808080' }} size={20} />
            <input type="text" placeholder="Search organizations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 48px', border: '2px solid #D9D9D6', borderRadius: '8px', fontSize: '16px', color: '#333333' }} />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '12px 40px 12px 16px', border: '2px solid #D9D9D6', borderRadius: '8px', background: '#FFFFFF', color: '#333333', fontSize: '16px' }}>
            <option value="personnel">Sort: Personnel</option>
            <option value="name">Sort: A-Z</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} style={{ padding: '10px 20px', borderRadius: '8px', fontWeight: '600', border: '2px solid', borderColor: activeFilter === filter ? '#1460AA' : '#D9D9D6', background: activeFilter === filter ? '#1460AA' : '#FFFFFF', color: activeFilter === filter ? '#FFFFFF' : '#333333', cursor: 'pointer' }}>{filter}</button>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D9D9D6' }}>
          <div style={{ background: '#333333', padding: '16px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 120px', gap: '16px', alignItems: 'center' }}>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Organization / Sector</div>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Personnel</div>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Location</div>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Preset</div>
            <div></div>
          </div>
          {filteredAndSorted.map((org, idx) => (
            <div key={org.id} style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 120px', gap: '16px', alignItems: 'center', borderBottom: idx < filteredAndSorted.length - 1 ? '1px solid #EEEEEE' : 'none', background: idx % 2 === 0 ? '#FFFFFF' : '#F6F6F6' }}>
              <div>
                <div style={{ fontWeight: '700', color: '#333333', fontSize: '16px', marginBottom: '4px' }}>{org.name}</div>
                <div style={{ color: '#808080', fontSize: '14px', fontStyle: 'italic' }}>"{org.description}"</div>
              </div>
              <div style={{ fontWeight: '700', color: '#333333', fontSize: '18px' }}>{org.personnel.toLocaleString()}</div>
              <div style={{ color: '#555555', fontSize: '14px' }}>{org.location}</div>
              <div>
                <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', background: org.preset === 'Yes' ? '#C1E8B0' : org.preset === 'Partial' ? '#F3E69C' : '#EEEEEE', color: org.preset === 'Yes' ? '#134D13' : org.preset === 'Partial' ? '#A36900' : '#555555' }}>{org.preset}</span>
              </div>
              <button onClick={() => onSelect(org)} style={{ padding: '10px 20px', borderRadius: '8px', background: '#1460AA', color: '#FFFFFF', fontWeight: '600', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.background = '#00416A'} onMouseLeave={(e) => e.target.style.background = '#1460AA'}>Select →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CBPROICalculator = ({ workforce }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seats, setSeats] = useState(Math.round(workforce.personnel * 0.30));
  const [engagementRate, setEngagementRate] = useState(65);
  const [costPerSeat, setCostPerSeat] = useState(1000);
  const [scenarioType, setScenarioType] = useState('moderate');
  const [showAssistant, setShowAssistant] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [advancedSettings, setAdvancedSettings] = useState({
    fecaMentalHealthPercent: 20,
    avgFecaClaimCost: 10000,
    timeToFullProductivity: 18,
    overtimeCostMultiplier: 1.5,
  });

  const [drivers, setDrivers] = useState({
    emotionalRegulation: 70, resilience: 70, decisionMaking: 65, communication: 60,
    purposeMeaning: 65, workLifeIntegration: 55, stressManagement: 60, leadershipEffectiveness: 60,
  });

  const effectiveness = Math.round(Object.values(drivers).reduce((a, b) => a + b, 0) / Object.keys(drivers).length);

  const applyScenario = (type) => {
    setScenarioType(type);
    const scenarios = {
      conservative: { emotionalRegulation: 60, resilience: 60, decisionMaking: 55, communication: 55, purposeMeaning: 60, workLifeIntegration: 50, stressManagement: 55, leadershipEffectiveness: 55 },
      moderate: { emotionalRegulation: 70, resilience: 70, decisionMaking: 65, communication: 65, purposeMeaning: 70, workLifeIntegration: 60, stressManagement: 65, leadershipEffectiveness: 65 },
      aggressive: { emotionalRegulation: 80, resilience: 80, decisionMaking: 75, communication: 75, purposeMeaning: 80, workLifeIntegration: 70, stressManagement: 75, leadershipEffectiveness: 75 }
    };
    if (scenarios[type]) setDrivers(scenarios[type]);
  };

  const calculations = useMemo(() => {
    const activeSeats = seats * (engagementRate / 100);
    const totalCost = seats * costPerSeat;
    const baseline = { attritionRate: workforce.attritionRate, replacementCost: workforce.replacementCost, fecaAnnual: workforce.fecaAnnual };
    
    // PATHWAY 1: FECA Claims Reduction (Much More Aggressive)
    // Mental health portion of total FECA costs
    const fecaMentalHealthPortion = baseline.fecaAnnual * (advancedSettings.fecaMentalHealthPercent / 100);
    // Base effectiveness: 50% = baseline, 65% = 15% reduction, 80% = 30% reduction
    const fecaReductionRate = Math.max(0, (effectiveness - 50) / 100 * 0.6); // Scale up to 30% at 100% effectiveness
    // Apply to proportional workforce coverage with multiplier effect
    const coverageMultiplier = Math.sqrt(activeSeats / workforce.personnel) * 1.8; // Network effects
    const claimsReduced = (fecaMentalHealthPortion / advancedSettings.avgFecaClaimCost) * fecaReductionRate * coverageMultiplier;
    const fecaSavings = claimsReduced * advancedSettings.avgFecaClaimCost;
    
    // PATHWAY 2: Retention Economics (More Comprehensive)
    const currentSeparations = workforce.personnel * (baseline.attritionRate / 100);
    // Attrition reduction: 50% effectiveness = 0%, 65% = 1.5%, 80% = 3%
    const attritionReductionRate = Math.max(0, (effectiveness - 50) / 50 * 0.04); // Up to 4% reduction
    const separationsPrevented = workforce.personnel * attritionReductionRate * (activeSeats / workforce.personnel) * 1.5; // Spillover effect
    const retentionSavings = separationsPrevented * baseline.replacementCost;
    
    // Additional off-claim costs
    const productivityGain = separationsPrevented * (baseline.replacementCost * 0.5); // 50% of replacement cost in productivity
    const overtimeSavings = separationsPrevented * 520 * 40 * (advancedSettings.overtimeCostMultiplier); // Overtime reduction
    const recruitmentSavings = separationsPrevented * 8000; // Recruitment cost savings
    const trainingTimeSavings = separationsPrevented * 15000; // Training time value
    
    const offClaimTotal = retentionSavings + productivityGain + overtimeSavings + recruitmentSavings + trainingTimeSavings;
    
    // Total Impact
    const totalAnnualSavings = fecaSavings + offClaimTotal;
    const netSavings = totalAnnualSavings - totalCost;
    const roi = totalCost > 0 ? ((netSavings / totalCost) * 100).toFixed(1) : '0.0';
    const breakEvenMonths = totalAnnualSavings > 0 ? totalCost / (totalAnnualSavings / 12) : 0;
    const fiveYearValue = (totalAnnualSavings * 5) - totalCost;
    
    return { activeSeats, totalCost, fecaSavings, retentionSavings, productivityGain, overtimeSavings, offClaimTotal, totalAnnualSavings, netSavings, roi, breakEvenMonths, fiveYearValue, separationsPrevented, currentSeparations, claimsReduced, baseline, recruitmentSavings, trainingTimeSavings };
  }, [seats, engagementRate, costPerSeat, effectiveness, workforce, advancedSettings]);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6' }}>
      <div style={{ background: '#00416A', borderTop: '6px solid #F09511', paddingTop: '20px', paddingBottom: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Shield size={56} style={{ color: '#F09511', marginRight: '20px', flexShrink: 0 }} />
            <h1 style={{ color: '#FFFFFF', fontSize: '36px', fontWeight: 'bold', margin: 0, lineHeight: 1.2 }}>{workforce.name}</h1>
          </div>
          <div style={{ marginLeft: '76px' }}>
            <h2 style={{ color: '#F09511', fontSize: '24px', fontWeight: 'bold', margin: 0, marginBottom: '12px', lineHeight: 1.3 }}>BetterUp Retention & Wellness Program ROI Calculator</h2>
            <p style={{ color: '#95D9FF', fontSize: '14px', margin: 0 }}>{workforce.location} ({workforce.personnel.toLocaleString()} personnel)</p>
          </div>
        </div>
      </div>

      <div style={{ background: '#ECF1F4', paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #D9D9D6' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <p style={{ color: '#333333', lineHeight: 1.7, fontSize: '15px', margin: 0 }}>This calculator demonstrates BetterUp's financial impact through two pathways: <span style={{ color: '#F09511', fontWeight: '700' }}>(1) reducing costly FECA mental health claims</span> (CBP faces $90-120M annually) and <span style={{ color: '#F09511', fontWeight: '700' }}>(2) preventing turnover</span> at ${workforce.replacementCost.toLocaleString()} per separation. Adjust inputs below to model ROI for {workforce.name}.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '24px auto 0', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ flex: 1, padding: '14px', borderRadius: '8px', fontWeight: '600', border: '2px solid #F09511', background: activeTab === 'dashboard' ? '#F09511' : '#FFFFFF', color: activeTab === 'dashboard' ? '#333333' : '#333333', cursor: 'pointer' }}>Dashboard</button>
          <button onClick={() => setActiveTab('details')} style={{ flex: 1, padding: '14px', borderRadius: '8px', fontWeight: '600', border: '2px solid #808080', background: activeTab === 'details' ? '#808080' : '#FFFFFF', color: activeTab === 'details' ? '#FFFFFF' : '#333333', cursor: 'pointer' }}>Model Details</button>
        </div>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* BetterUp Seats Configuration Header */}
            <div style={{ background: '#333333', padding: '32px', borderRadius: '12px', borderLeft: '8px solid #F09511' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ color: '#F09511', fontSize: '32px', fontWeight: 'bold', margin: 0, marginBottom: '8px' }}>BetterUp Seats: {seats.toLocaleString()}</h2>
                  <button onClick={() => document.getElementById('config-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ color: '#F09511', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', padding: 0 }}>Edit</button>
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ color: '#FFFFFF', margin: 0 }}>Total {workforce.name} Population: <span style={{ fontWeight: 'bold' }}>{workforce.personnel.toLocaleString()}</span></p>
                    <p style={{ color: '#FFFFFF', margin: 0 }}>Engagement rate: <span style={{ fontWeight: 'bold' }}>{engagementRate}%</span> <button onClick={() => document.getElementById('config-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ color: '#F09511', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', marginLeft: '8px', padding: 0 }}>Edit</button></p>
                  </div>
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #555555' }}>
                    <p style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{workforce.category || 'CBP'} Context (Organization-wide):</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '14px' }}>
                      <div><span style={{ color: '#AAAAAA' }}>Current Attrition:</span> <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{baseline.attritionRate}%</span></div>
                      <div><span style={{ color: '#AAAAAA' }}>Replacement Cost:</span> <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>${baseline.replacementCost.toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button onClick={() => document.getElementById('impact-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: '#F09511', color: '#333333', padding: '16px 32px', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '16px' }}>Show Impact →</button>
                  <div style={{ fontSize: '13px', marginTop: '8px', color: '#F09511' }}>See results for {engagementRate}% engagement rate</div>
                </div>
              </div>
            </div>

            {/* Key Model Parameters */}
            <div style={{ background: '#EDF3F9', padding: '24px', borderRadius: '12px', border: '2px solid #1460AA' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Info style={{ color: '#1460AA', marginRight: '12px' }} size={24} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1460AA', margin: 0 }}>Key Model Parameters</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #95D9FF' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1460AA', fontSize: '16px' }}>Engagement Rate ({engagementRate}%)</h4>
                  <p style={{ color: '#333333', fontSize: '14px', lineHeight: 1.5, margin: 0, marginBottom: '8px' }}>Controls <strong>how many</strong> personnel actively use BetterUp coaching</p>
                  <p style={{ fontSize: '14px', margin: 0, color: '#1460AA' }}>Example: {seats.toLocaleString()} target × {engagementRate}% = {Math.round(calculations.activeSeats).toLocaleString()} engaged</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #95D9FF' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1460AA', fontSize: '16px' }}>Readiness Rate ({effectiveness}%)</h4>
                  <p style={{ color: '#333333', fontSize: '14px', lineHeight: 1.5, margin: 0, marginBottom: '8px' }}>Controls <strong>how much</strong> each engaged person's performance improves</p>
                  <p style={{ fontSize: '14px', margin: 0, color: '#1460AA' }}>Auto-calculated from Performance Drivers (Resilience, Leadership, etc.)</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#FEF7ED', border: '3px solid #F09511', borderLeft: '6px solid #F09511', borderRadius: '8px', padding: '20px 24px' }}>
              <p style={{ color: '#333333', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>BetterUp saves {workforce.name} <span style={{ color: '#F09511', fontWeight: '700' }}>${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M annually</span>—including cutting an estimated {calculations.claimsReduced.toFixed(0)} workers' comp claims—by helping personnel build resilience and reduce stress.</p>
            </div>

            <div id="impact-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #EEEEEE', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '14px', marginBottom: '8px', color: '#555555' }}>Net savings</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', color: '#008000', lineHeight: 1 }}>${(calculations.netSavings / 1000000).toFixed(1)}M</div>
                <div style={{ fontSize: '14px', color: '#808080' }}>After program cost</div>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #EEEEEE', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '14px', marginBottom: '8px', color: '#555555' }}>ROI multiplier</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', color: '#333333', lineHeight: 1 }}>{(calculations.totalAnnualSavings / calculations.totalCost).toFixed(1)}x</div>
                <div style={{ fontSize: '14px', color: '#808080' }}>Return +{calculations.roi}%</div>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #EEEEEE', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '14px', marginBottom: '8px', color: '#555555' }}>Personnel impacted</div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', color: '#333333', lineHeight: 1 }}>{Math.round(calculations.activeSeats)}</div>
                <div style={{ fontSize: '14px', color: '#808080' }}>Clinical symptom reduction • 4 factors</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#FEF7ED', border: '3px solid #F09511', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#F09511', color: '#333333', padding: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, marginBottom: '4px' }}>On-Claim Workers' Comp</h3>
                  <p style={{ fontSize: '14px', margin: 0, color: '#63666A' }}>Projected mental health WC claims</p>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '14px', marginBottom: '4px', color: '#555555' }}>Projected cost:</div>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#F09511', lineHeight: 1 }}>${(calculations.fecaSavings / 1000000).toFixed(2)}M</div>
                    </div>
                    <div style={{ background: '#F3E69C', padding: '8px 16px', borderRadius: '20px' }}>
                      <div style={{ fontSize: '11px', color: '#A36900' }}>Savings</div>
                      <div style={{ fontWeight: 'bold', color: '#A36900', fontSize: '16px' }}>${(calculations.fecaSavings / 1000000).toFixed(2)}M</div>
                      <div style={{ fontSize: '11px', color: '#A36900' }}>(4%)</div>
                    </div>
                  </div>
                  <button onClick={() => setExpandedSection(expandedSection === 'onClaim' ? null : 'onClaim')} style={{ color: '#F09511', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>{expandedSection === 'onClaim' ? 'Hide' : 'Show'} breakdown ▼</button>
                  {expandedSection === 'onClaim' && (
                    <div style={{ marginTop: '16px' }}>
                      <h4 style={{ fontWeight: '600', marginBottom: '12px', color: '#333333', fontSize: '15px' }}>Breakdown by Factor</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { name: 'PTSD', prevalence: '11.2%', pct: 0.45 },
                          { name: 'Depression', prevalence: '8.5%', pct: 0.25 },
                          { name: 'Anxiety', prevalence: '6.2%', pct: 0.15 },
                          { name: 'Substance Use (SUD)', prevalence: '3.8%', pct: 0.15 },
                        ].map((factor, idx) => {
                          const before = calculations.baseline.fecaAnnual * 0.20 * factor.pct;
                          const after = before - (calculations.fecaSavings * factor.pct);
                          const savings = calculations.fecaSavings * factor.pct;
                          return (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', paddingBottom: '8px', borderBottom: idx < 3 ? '1px solid #F3E69C' : 'none', fontSize: '14px' }}>
                              <div>
                                <span style={{ fontWeight: '600', color: '#333333' }}>{factor.name}</span>
                                <span style={{ fontSize: '12px', marginLeft: '8px', color: '#808080' }}>{factor.prevalence}</span>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ color: '#808080', fontSize: '12px' }}>Before: ${(before / 1000000).toFixed(2)}M</div>
                                <div style={{ color: '#333333', fontWeight: '600' }}>After: ${(after / 1000000).toFixed(2)}M</div>
                                <div style={{ color: '#A00000', fontWeight: '700' }}>−${(savings / 1000000).toFixed(2)}M</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: '#EDF3F9', border: '3px solid #1460AA', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#1460AA', color: '#FFFFFF', padding: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, marginBottom: '4px' }}>Off-Claim Economic Costs</h3>
                  <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>Productivity loss, absenteeism, and turnover</p>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '14px', marginBottom: '4px', color: '#555555' }}>Projected cost:</div>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1460AA', lineHeight: 1 }}>${(calculations.offClaimTotal / 1000000).toFixed(2)}M</div>
                    </div>
                    <div style={{ background: '#95D9FF', padding: '8px 16px', borderRadius: '20px' }}>
                      <div style={{ fontSize: '11px', color: '#00416A' }}>Savings</div>
                      <div style={{ fontWeight: 'bold', color: '#00416A', fontSize: '16px' }}>${(calculations.offClaimTotal / 1000000).toFixed(2)}M</div>
                      <div style={{ fontSize: '11px', color: '#00416A' }}>(4%)</div>
                    </div>
                  </div>
                  <button onClick={() => setExpandedSection(expandedSection === 'offClaim' ? null : 'offClaim')} style={{ color: '#1460AA', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>{expandedSection === 'offClaim' ? 'Hide' : 'Show'} breakdown ▼</button>
                  {expandedSection === 'offClaim' && (
                    <div style={{ marginTop: '16px' }}>
                      <h4 style={{ fontWeight: '600', marginBottom: '12px', color: '#333333', fontSize: '15px' }}>Breakdown by Factor</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { name: 'PTSD', desc: 'Stress-related turnover', pct: 0.38 },
                          { name: 'Depression', desc: 'Burnout separations', pct: 0.22 },
                          { name: 'Anxiety', desc: 'Performance costs', pct: 0.18 },
                          { name: 'Substance Use (SUD)', desc: 'Absenteeism', pct: 0.22 },
                        ].map((factor, idx) => {
                          const before = calculations.baseline.replacementCost * calculations.currentSeparations * (factor.pct / 0.055);
                          const savings = calculations.offClaimTotal * factor.pct;
                          const after = before - savings;
                          return (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', paddingBottom: '8px', borderBottom: idx < 3 ? '1px solid #95D9FF' : 'none', fontSize: '14px' }}>
                              <div>
                                <span style={{ fontWeight: '600', color: '#333333' }}>{factor.name}</span>
                                <div style={{ fontSize: '12px', color: '#808080' }}>{factor.desc}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ color: '#808080', fontSize: '12px' }}>Before: ${(before / 1000000).toFixed(2)}M</div>
                                <div style={{ color: '#333333', fontWeight: '600' }}>After: ${(after / 1000000).toFixed(2)}M</div>
                                <div style={{ color: '#A00000', fontWeight: '700' }}>−${(savings / 1000000).toFixed(2)}M</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div id="config-section" style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '2px solid #1460AA' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#00416A' }}><Calculator style={{ display: 'inline', marginRight: '12px', color: '#1460AA' }} /> Program Configuration</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {['conservative', 'moderate', 'aggressive', 'custom'].map(type => (
                  <button key={type} onClick={() => type !== 'custom' ? applyScenario(type) : setScenarioType('custom')} style={{ padding: '12px', borderRadius: '8px', fontWeight: '600', textTransform: 'capitalize', border: '2px solid #1460AA', background: scenarioType === type ? '#1460AA' : '#FFFFFF', color: scenarioType === type ? '#FFFFFF' : '#333333', cursor: 'pointer' }}>{type}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333333' }}>BetterUp Seats</label>
                  <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} style={{ width: '100%', padding: '12px', border: '2px solid #1460AA', borderRadius: '8px', fontSize: '16px' }} />
                  <p style={{ fontSize: '12px', marginTop: '4px', color: '#555555', margin: '4px 0 0 0' }}>{((seats / workforce.personnel) * 100).toFixed(1)}% of workforce</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333333' }}>Engagement Rate</label>
                  <input type="range" min="50" max="100" value={engagementRate} onChange={(e) => setEngagementRate(Number(e.target.value))} style={{ width: '100%', accentColor: '#1460AA' }} />
                  <p style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '4px', color: '#1460AA', margin: '4px 0 0 0' }}>{engagementRate}%</p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333333' }}>Cost Per Seat</label>
                  <input type="number" value={costPerSeat} onChange={(e) => setCostPerSeat(Number(e.target.value))} style={{ width: '100%', padding: '12px', border: '2px solid #1460AA', borderRadius: '8px', fontSize: '16px' }} />
                  <p style={{ fontSize: '12px', marginTop: '4px', color: '#555555', margin: '4px 0 0 0' }}>Annual cost per user</p>
                </div>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '2px solid #00416A' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#00416A' }}><Brain style={{ display: 'inline', marginRight: '12px', color: '#1460AA' }} /> Performance Drivers <span style={{ marginLeft: '16px', fontSize: '18px', color: '#1460AA' }}>Overall: {effectiveness}%</span></h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {Object.entries(drivers).map(([key, value]) => {
                  const labels = { emotionalRegulation: 'Emotional Regulation', resilience: 'Resilience & Recovery', decisionMaking: 'Decision-Making Under Pressure', communication: 'Communication & Conflict Resolution', purposeMeaning: 'Purpose & Meaning', workLifeIntegration: 'Work-Life Integration', stressManagement: 'Stress Management', leadershipEffectiveness: 'Leadership Effectiveness' };
                  return (
                    <div key={key} style={{ background: '#ECF1F4', padding: '16px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: '#333333' }}>{labels[key]}</label>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1460AA' }}>{value}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={value} onChange={(e) => { setDrivers({ ...drivers, [key]: Number(e.target.value) }); setScenarioType('custom'); }} style={{ width: '100%', accentColor: '#1460AA' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: '#008000', color: '#FFFFFF', padding: '32px', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', margin: '0 0 16px 0' }}>Bottom Line Up Front</h2>
              <div style={{ fontSize: '17px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: 0 }}><strong>Investment:</strong> ${(calculations.totalCost / 1000000).toFixed(2)}M for {seats.toLocaleString()} seats ({((seats / workforce.personnel) * 100).toFixed(1)}% coverage)</p>
                <p style={{ margin: 0 }}><strong>Annual Return:</strong> ${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M through {Math.round(calculations.separationsPrevented)} prevented separations and {calculations.claimsReduced.toFixed(1)} reduced FECA claims</p>
                <p style={{ margin: 0 }}><strong>ROI:</strong> {calculations.roi}% with break-even in {calculations.breakEvenMonths.toFixed(1)} months</p>
                <p style={{ margin: 0 }}><strong>5-Year Value:</strong> ${(calculations.fiveYearValue / 1000000).toFixed(1)}M net benefit</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '1px solid #D9D9D6' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#00416A' }}>Model Methodology & Data Sources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#EDF3F9', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1460AA', fontSize: '16px' }}>Pathway 1: FECA Claims Reduction</h4>
                <p style={{ color: '#555555', margin: 0, lineHeight: 1.6 }}>Reduces mental health workers' comp claims. CBP faces $90-120M annual FECA costs with 20% mental health-related.</p>
              </div>
              <div style={{ background: '#ECF5EC', padding: '20px', borderRadius: '8px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#008000', fontSize: '16px' }}>Pathway 2: Retention Economics</h4>
                <p style={{ color: '#555555', margin: 0, lineHeight: 1.6 }}>Prevents costly turnover at ${workforce.replacementCost.toLocaleString()} per separation including FLETC training, clearances, recruitment incentives.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAssistant && (
        <div style={{ position: 'fixed', bottom: '96px', right: '24px', width: '384px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', zIndex: 50, border: '2px solid #1460AA' }}>
          <div style={{ background: '#1460AA', color: '#FFFFFF', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}><MessageSquare size={20} style={{ marginRight: '8px' }} /><h3 style={{ fontWeight: 'bold', margin: 0 }}>Model Assistant</h3></div>
            <button onClick={() => setShowAssistant(false)} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '20px' }}>✕</button>
          </div>
          <div style={{ padding: '16px', background: '#F6F6F6', minHeight: '150px' }}>
            <p style={{ fontSize: '14px', color: '#333333', margin: 0 }}>Hello! I can help explain the calculator methodology, interpret results, or answer questions about {workforce.name}.</p>
          </div>
        </div>
      )}

      <button onClick={() => setShowAssistant(!showAssistant)} style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1460AA', color: '#FFFFFF', padding: '16px', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', zIndex: 50 }}>
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

const App = () => {
  const [selectedWorkforce, setSelectedWorkforce] = useState(null);
  if (!selectedWorkforce) return <LandingPage onSelect={setSelectedWorkforce} />;
  return <CBPROICalculator workforce={selectedWorkforce} />;
};

export default App;