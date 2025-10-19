import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, Users, DollarSign, Shield, Heart, Brain, MessageSquare, ChevronDown, ChevronUp, Info, Settings, Search } from 'lucide-react';

const organizationData = [
  { id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 97500, fecaAnnual: 105000000, description: 'Entire CBP workforce', category: 'All Units' },
  { id: 'ofo', name: 'Office of Field Operations', personnel: 26000, location: '328 Ports of Entry', preset: 'Yes', attritionRate: 3.5, replacementCost: 87300, fecaAnnual: 42000000, description: 'Airports, seaports, land crossings', category: 'Organization' },
  { id: 'usbp', name: 'U.S. Border Patrol', personnel: 20000, location: '20 Sectors Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 50000000, description: 'Land border patrol', category: 'Organization' },
  { id: 'amo', name: 'Air and Marine Operations', personnel: 1500, location: 'Nationwide', preset: 'Yes', attritionRate: 10.0, replacementCost: 120000, fecaAnnual: 8000000, description: 'Aviation & maritime', category: 'Organization' },
  { id: 'san_diego', name: 'San Diego Sector', personnel: 2400, location: 'California', preset: 'Yes', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 6000000, description: 'Pacific Coast to Imperial County', category: 'USBP Sector', parent: 'USBP' },
  { id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', preset: 'Yes', attritionRate: 6.5, replacementCost: 107700, fecaAnnual: 9500000, description: 'Largest sector, highest activity', category: 'USBP Sector', parent: 'USBP' },
  { id: 'el_paso', name: 'El Paso Sector', personnel: 2200, location: 'New Mexico & Texas', preset: 'Yes', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 5500000, description: 'West Texas operations', category: 'USBP Sector', parent: 'USBP' },
  { id: 'rio_grande', name: 'Rio Grande Valley Sector', personnel: 3500, location: 'Texas', preset: 'Yes', attritionRate: 6.0, replacementCost: 107700, fecaAnnual: 8750000, description: 'Highest apprehension volume', category: 'USBP Sector', parent: 'USBP' },
  { id: 'del_rio', name: 'Del Rio Sector', personnel: 2100, location: 'Texas', preset: 'Partial', attritionRate: 7.0, replacementCost: 107700, fecaAnnual: 5250000, description: 'Eagle Pass, Del Rio', category: 'USBP Sector', parent: 'USBP' },
  { id: 'laredo', name: 'Laredo Sector', personnel: 1800, location: 'Texas', preset: 'Yes', attritionRate: 5.8, replacementCost: 107700, fecaAnnual: 4500000, description: 'Laredo, Zapata County', category: 'USBP Sector', parent: 'USBP' },
  { id: 'yuma', name: 'Yuma Sector', personnel: 1100, location: 'Arizona', preset: 'Partial', attritionRate: 6.5, replacementCost: 107700, fecaAnnual: 2750000, description: 'Colorado River region', category: 'USBP Sector', parent: 'USBP' },
  { id: 'el_centro', name: 'El Centro Sector', personnel: 900, location: 'California', preset: 'No', attritionRate: 5.5, replacementCost: 107700, fecaAnnual: 2250000, description: 'Imperial & Riverside Counties', category: 'USBP Sector', parent: 'USBP' },
  { id: 'big_bend', name: 'Big Bend Sector', personnel: 600, location: 'Texas', preset: 'No', attritionRate: 7.5, replacementCost: 107700, fecaAnnual: 1500000, description: 'Remote Big Bend region', category: 'USBP Sector', parent: 'USBP' },
  { id: 'ofo_southwest', name: 'Southwest Border Ports (OFO)', personnel: 8500, location: 'CA, AZ, NM, TX', preset: 'Yes', attritionRate: 4.0, replacementCost: 87300, fecaAnnual: 13692000, description: 'San Ysidro, Otay Mesa, Calexico', category: 'OFO Region', parent: 'OFO' },
  { id: 'ofo_northern', name: 'Northern Border Ports (OFO)', personnel: 4200, location: 'Northern Tier', preset: 'No', attritionRate: 3.0, replacementCost: 87300, fecaAnnual: 6769000, description: 'Detroit, Buffalo, Blaine', category: 'OFO Region', parent: 'OFO' },
];

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Units');
  const [sortBy, setSortBy] = useState('personnel');

  const filters = ['All Units', 'Preset', 'Organization', 'USBP Sector', 'OFO Region'];

  const filteredAndSorted = useMemo(() => {
    let filtered = organizationData.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All Units' || 
                          (activeFilter === 'Preset' && org.preset === 'Yes') ||
                          org.category === activeFilter;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'personnel') return b.personnel - a.personnel;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchTerm, activeFilter, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6' }}>
      {/* Header */}
      <div style={{ background: '#00416A', borderTop: '6px solid #F09511' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
          <div className="flex items-start">
            <Shield className="w-16 h-16 mr-5 flex-shrink-0" style={{ color: '#F09511' }} />
            <div style={{ flex: 1 }}>
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#FFFFFF', lineHeight: '1.2' }}>
                U.S. Customs and Border Protection
              </h1>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#F09511', lineHeight: '1.3' }}>
                BetterUp Retention & Wellness ROI Calculator
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#95D9FF', maxWidth: '1000px' }}>
                Demonstrating financial impact through dual-pathway methodology: (1) reducing costly FECA mental health claims and (2) preventing high-cost turnover through precision development targeting critical performance drivers. Based on comprehensive GAO, union, and DHS research.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#333333', padding: '24px 32px', borderRadius: '12px', marginBottom: '32px' }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>Select Your Organization or Sector</h2>
          <p style={{ color: '#D9D9D6', fontSize: '15px' }}>Choose a command preset or create a custom region. All parameters can be fine-tuned later.</p>
        </div>

        <div className="mb-6 flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5" style={{ color: '#808080' }} size={20} />
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 48px', 
                border: '2px solid #D9D9D6', 
                borderRadius: '8px',
                fontSize: '16px',
                color: '#333333'
              }}
            />
          </div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ 
              padding: '12px 40px 12px 16px', 
              border: '2px solid #D9D9D6', 
              borderRadius: '8px',
              background: '#FFFFFF',
              color: '#333333',
              fontSize: '16px'
            }}
          >
            <option value="personnel">Sort: Personnel</option>
            <option value="name">Sort: A-Z</option>
          </select>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                border: '2px solid',
                borderColor: activeFilter === filter ? '#1460AA' : '#D9D9D6',
                background: activeFilter === filter ? '#1460AA' : '#FFFFFF',
                color: activeFilter === filter ? '#FFFFFF' : '#333333',
                transition: 'all 0.2s'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D9D9D6' }}>
          {/* Table Header */}
          <div style={{ background: '#333333', padding: '16px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 120px', gap: '16px', alignItems: 'center' }}>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Organization / Sector</div>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Personnel</div>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Location</div>
            <div style={{ color: '#FFFFFF', fontWeight: '600' }}>Preset</div>
            <div></div>
          </div>

          {/* Table Rows */}
          {filteredAndSorted.map((org, idx) => (
            <div
              key={org.id}
              style={{
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1.5fr 1fr 120px',
                gap: '16px',
                alignItems: 'center',
                borderBottom: idx < filteredAndSorted.length - 1 ? '1px solid #EEEEEE' : 'none',
                background: idx % 2 === 0 ? '#FFFFFF' : '#F6F6F6'
              }}
            >
              <div>
                <div style={{ fontWeight: '700', color: '#333333', fontSize: '16px', marginBottom: '4px' }}>
                  {org.name}
                </div>
                <div style={{ color: '#808080', fontSize: '14px', fontStyle: 'italic' }}>
                  "{org.description}"
                </div>
                {org.category !== 'All Units' && org.category !== 'Organization' && (
                  <div style={{ color: '#555555', fontSize: '13px', marginTop: '4px' }}>
                    {org.category}
                  </div>
                )}
              </div>

              <div style={{ fontWeight: '700', color: '#333333', fontSize: '18px' }}>
                {org.personnel.toLocaleString()}
              </div>

              <div style={{ color: '#555555', fontSize: '14px' }}>
                {org.location}
              </div>

              <div>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: org.preset === 'Yes' ? '#C1E8B0' : org.preset === 'Partial' ? '#F3E69C' : '#EEEEEE',
                    color: org.preset === 'Yes' ? '#134D13' : org.preset === 'Partial' ? '#A36900' : '#555555'
                  }}
                >
                  {org.preset}
                </span>
              </div>

              <button
                onClick={() => onSelect(org)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: '#1460AA',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#00416A'}
                onMouseLeave={(e) => e.target.style.background = '#1460AA'}
              >
                Select →
              </button>
            </div>
          ))}
        </div>

        {filteredAndSorted.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#808080' }}>
            <p>No organizations match your search criteria.</p>
          </div>
        )}
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
    const fecaMentalHealthPortion = baseline.fecaAnnual * (advancedSettings.fecaMentalHealthPercent / 100);
    const fecaReductionRate = Math.max(0, (effectiveness - 50) / 100);
    const claimsReduced = (fecaMentalHealthPortion / advancedSettings.avgFecaClaimCost) * fecaReductionRate * (activeSeats / workforce.personnel);
    const fecaSavings = claimsReduced * advancedSettings.avgFecaClaimCost;
    const currentSeparations = workforce.personnel * (baseline.attritionRate / 100);
    const attritionReductionRate = Math.max(0, (effectiveness - 50) / 50 * 0.03);
    const separationsPrevented = workforce.personnel * attritionReductionRate * (activeSeats / workforce.personnel);
    const retentionSavings = separationsPrevented * baseline.replacementCost;
    const productivityGain = separationsPrevented * (baseline.replacementCost * 0.3);
    const overtimeSavings = separationsPrevented * 520 * 35 * (advancedSettings.overtimeCostMultiplier - 1);
    const offClaimTotal = retentionSavings + productivityGain + overtimeSavings;
    const totalAnnualSavings = fecaSavings + offClaimTotal;
    const netSavings = totalAnnualSavings - totalCost;
    const roi = totalCost > 0 ? ((netSavings / totalCost) * 100).toFixed(1) : '0.0';
    const breakEvenMonths = totalAnnualSavings > 0 ? totalCost / (totalAnnualSavings / 12) : 0;
    const fiveYearValue = (totalAnnualSavings * 5) - totalCost;
    return { activeSeats, totalCost, fecaSavings, retentionSavings, productivityGain, overtimeSavings, offClaimTotal, totalAnnualSavings, netSavings, roi, breakEvenMonths, fiveYearValue, separationsPrevented, currentSeparations, claimsReduced, baseline };
  }, [seats, engagementRate, costPerSeat, effectiveness, workforce, advancedSettings]);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F6F6' }}>
      {/* Header */}
      <div style={{ background: '#333333', borderTop: '6px solid #F09511', padding: '32px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="w-14 h-14 mr-4 flex-shrink-0" style={{ color: '#F09511' }} />
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF', lineHeight: '1.3' }}>
                  {workforce.name} - BetterUp Retention & Wellness Program ROI Calculator
                </h1>
                <p className="text-sm mt-2" style={{ color: '#95D9FF' }}>
                  {workforce.location} ({workforce.personnel.toLocaleString()} personnel)
                </p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '14px' }}
            >
              ← Change Selection
            </button>
          </div>
        </div>
      </div>

      {/* Description Banner */}
      <div style={{ background: '#F6F6F6', padding: '24px 0', borderBottom: '1px solid #EEEEEE' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ color: '#555555', lineHeight: '1.7', fontSize: '15px' }}>
            This calculator demonstrates BetterUp's financial impact through two pathways: <span style={{ color: '#F09511', fontWeight: '700' }}>(1) reducing costly FECA mental health claims</span> (CBP faces $90-120M annually with suicide rates 28% higher than other LE) and <span style={{ color: '#F09511', fontWeight: '700' }}>(2) preventing turnover</span> at ${workforce.replacementCost.toLocaleString()} per separation through precision development targeting critical performance drivers. Adjust the inputs below to model ROI for {workforce.name}'s specific context.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: '1200px', margin: '24px auto 0', padding: '0 20px' }}>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('dashboard')} style={{ flex: 1, padding: '14px', borderRadius: '8px', fontWeight: '600', border: '2px solid #F09511', background: activeTab === 'dashboard' ? '#F09511' : '#FFFFFF', color: activeTab === 'dashboard' ? '#333333' : '#333333' }}>Dashboard</button>
          <button onClick={() => setActiveTab('details')} style={{ flex: 1, padding: '14px', borderRadius: '8px', fontWeight: '600', border: '2px solid #808080', background: activeTab === 'details' ? '#808080' : '#FFFFFF', color: activeTab === 'details' ? '#FFFFFF' : '#333333' }}>Model Details</button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Summary Banner */}
            <div style={{ background: '#FEF7ED', border: '3px solid #F09511', borderLeft: '6px solid #F09511', borderRadius: '8px', padding: '20px 24px' }}>
              <p style={{ color: '#333333', fontSize: '16px', lineHeight: '1.6' }}>
                BetterUp saves {workforce.name} <span style={{ color: '#F09511', fontWeight: '700' }}>${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M annually</span>—including cutting an estimated {calculations.claimsReduced.toFixed(0)} workers' comp claims—by helping personnel build resilience and reduce stress.
              </p>
            </div>

            {/* Impact Metrics - Horizontal Cards */}
            <div id="impact-section" className="grid grid-cols-3 gap-6">
              <div style={{ background: '#FFFFFF', border: '1px solid #EEEEEE', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div className="text-sm mb-2" style={{ color: '#555555' }}>Net savings</div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#008000' }}>${(calculations.netSavings / 1000000).toFixed(1)}M</div>
                <div className="text-sm" style={{ color: '#808080' }}>After program cost</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #EEEEEE', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div className="text-sm mb-2" style={{ color: '#555555' }}>ROI multiplier</div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#333333' }}>{(calculations.totalAnnualSavings / calculations.totalCost).toFixed(1)}x</div>
                <div className="text-sm" style={{ color: '#808080' }}>Return +{calculations.roi}%</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #EEEEEE', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div className="text-sm mb-2" style={{ color: '#555555' }}>Personnel impacted</div>
                <div className="text-5xl font-bold mb-2" style={{ color: '#333333' }}>{Math.round(calculations.activeSeats)}</div>
                <div className="text-sm" style={{ color: '#808080' }}>Clinical symptom reduction • 4 factors</div>
              </div>
            </div>

            {/* On/Off Claim Cards with Factor Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div style={{ background: '#FEF7ED', border: '3px solid #F09511', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#F09511', color: '#333333', padding: '20px' }}>
                  <h3 className="text-xl font-bold">On-Claim Workers' Comp</h3>
                  <p className="text-sm" style={{ color: '#63666A' }}>Projected mental health WC claims</p>
                </div>
                <div style={{ padding: '24px' }}>
                  <div className="mb-4">
                    <div className="text-sm mb-1" style={{ color: '#555555' }}>Projected cost:</div>
                    <div className="text-4xl font-bold" style={{ color: '#F09511' }}>${(calculations.fecaSavings / 1000000).toFixed(2)}M</div>
                  </div>
                  <button onClick={() => setExpandedSection(expandedSection === 'onClaim' ? null : 'onClaim')} style={{ color: '#F09511', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {expandedSection === 'onClaim' ? 'Hide' : 'Show'} breakdown ▼
                  </button>
                  {expandedSection === 'onClaim' && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-3" style={{ color: '#333333' }}>Breakdown by Factor</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #F3E69C' }}>
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>PTSD</div>
                            <div className="text-xs" style={{ color: '#808080' }}>11.2% prevalence</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#F09511' }}>${(calculations.fecaSavings * 0.45 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #F3E69C' }}>
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>Depression</div>
                            <div className="text-xs" style={{ color: '#808080' }}>8.5% prevalence</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#F09511' }}>${(calculations.fecaSavings * 0.25 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #F3E69C' }}>
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>Anxiety</div>
                            <div className="text-xs" style={{ color: '#808080' }}>6.2% prevalence</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#F09511' }}>${(calculations.fecaSavings * 0.15 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>Substance Use (SUD)</div>
                            <div className="text-xs" style={{ color: '#808080' }}>3.8% prevalence</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#F09511' }}>${(calculations.fecaSavings * 0.15 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: '#EDF3F9', border: '3px solid #1460AA', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#1460AA', color: '#FFFFFF', padding: '20px' }}>
                  <h3 className="text-xl font-bold">Off-Claim Economic Costs</h3>
                  <p className="text-sm opacity-90">Productivity loss, absenteeism, and turnover</p>
                </div>
                <div style={{ padding: '24px' }}>
                  <div className="mb-4">
                    <div className="text-sm mb-1" style={{ color: '#555555' }}>Projected cost:</div>
                    <div className="text-4xl font-bold" style={{ color: '#1460AA' }}>${(calculations.offClaimTotal / 1000000).toFixed(2)}M</div>
                  </div>
                  <button onClick={() => setExpandedSection(expandedSection === 'offClaim' ? null : 'offClaim')} style={{ color: '#1460AA', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {expandedSection === 'offClaim' ? 'Hide' : 'Show'} breakdown ▼
                  </button>
                  {expandedSection === 'offClaim' && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-3" style={{ color: '#333333' }}>Breakdown by Factor</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #95D9FF' }}>
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>PTSD</div>
                            <div className="text-xs" style={{ color: '#808080' }}>Stress-related turnover</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#1460AA' }}>${(calculations.offClaimTotal * 0.38 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #95D9FF' }}>
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>Depression</div>
                            <div className="text-xs" style={{ color: '#808080' }}>Burnout separations</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#1460AA' }}>${(calculations.offClaimTotal * 0.22 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-2" style={{ borderBottom: '1px solid #95D9FF' }}>
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>Anxiety</div>
                            <div className="text-xs" style={{ color: '#808080' }}>Performance-related costs</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#1460AA' }}>${(calculations.offClaimTotal * 0.18 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                        <div className="flex justify-between py-2">
                          <div>
                            <div className="font-semibold" style={{ color: '#333333' }}>Substance Use (SUD)</div>
                            <div className="text-xs" style={{ color: '#808080' }}>Absenteeism & productivity</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: '#1460AA' }}>${(calculations.offClaimTotal * 0.22 / 1000000).toFixed(2)}M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div id="config-section" style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '2px solid #1460AA' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#00416A' }}>
                <Calculator className="inline mr-3" style={{ color: '#1460AA' }} /> Program Configuration
              </h2>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {['conservative', 'moderate', 'aggressive', 'custom'].map(type => (
                  <button key={type} onClick={() => type !== 'custom' ? applyScenario(type) : setScenarioType('custom')} style={{ padding: '12px', borderRadius: '8px', fontWeight: '600', textTransform: 'capitalize', border: '2px solid #1460AA', background: scenarioType === type ? '#1460AA' : '#FFFFFF', color: scenarioType === type ? '#FFFFFF' : '#333333' }}>{type}</button>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>BetterUp Seats</label>
                  <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} style={{ width: '100%', padding: '12px', border: '2px solid #1460AA', borderRadius: '8px', fontSize: '16px' }} />
                  <p className="text-xs mt-1" style={{ color: '#555555' }}>{((seats / workforce.personnel) * 100).toFixed(1)}% of workforce</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>Engagement Rate</label>
                  <input type="range" min="50" max="100" value={engagementRate} onChange={(e) => setEngagementRate(Number(e.target.value))} style={{ width: '100%', accentColor: '#1460AA' }} />
                  <p className="text-sm font-bold mt-1" style={{ color: '#1460AA' }}>{engagementRate}%</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>Cost Per Seat</label>
                  <input type="number" value={costPerSeat} onChange={(e) => setCostPerSeat(Number(e.target.value))} style={{ width: '100%', padding: '12px', border: '2px solid #1460AA', borderRadius: '8px', fontSize: '16px' }} />
                  <p className="text-xs mt-1" style={{ color: '#555555' }}>Annual cost per user</p>
                </div>
              </div>
            </div>

            {/* Performance Drivers */}
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px', border: '2px solid #00416A' }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#00416A' }}>
                <Brain className="inline mr-3" style={{ color: '#1460AA' }} /> Performance Drivers
                <span className="ml-4 text-lg" style={{ color: '#1460AA' }}>Overall Effectiveness: {effectiveness}%</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(drivers).map(([key, value]) => {
                  const labels = { emotionalRegulation: 'Emotional Regulation', resilience: 'Resilience & Recovery', decisionMaking: 'Decision-Making Under Pressure', communication: 'Communication & Conflict Resolution', purposeMeaning: 'Purpose & Meaning', workLifeIntegration: 'Work-Life Integration', stressManagement: 'Stress Management', leadershipEffectiveness: 'Leadership Effectiveness' };
                  return (
                    <div key={key} style={{ background: '#ECF1F4', padding: '16px', borderRadius: '8px' }}>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-semibold" style={{ color: '#333333' }}>{labels[key]}</label>
                        <span className="text-sm font-bold" style={{ color: '#1460AA' }}>{value}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={value} onChange={(e) => { setDrivers({ ...drivers, [key]: Number(e.target.value) }); setScenarioType('custom'); }} style={{ width: '100%', accentColor: '#1460AA' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Line */}
            <div style={{ background: '#008000', color: '#FFFFFF', padding: '32px', borderRadius: '12px' }}>
              <h2 className="text-3xl font-bold mb-4">Bottom Line Up Front</h2>
              <div className="text-lg space-y-2">
                <p><strong>Investment:</strong> ${(calculations.totalCost / 1000000).toFixed(2)}M for {seats.toLocaleString()} seats ({((seats / workforce.personnel) * 100).toFixed(1)}% coverage)</p>
                <p><strong>Annual Return:</strong> ${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M through {Math.round(calculations.separationsPrevented)} prevented separations and {calculations.claimsReduced.toFixed(1)} reduced FECA claims</p>
                <p><strong>ROI:</strong> {calculations.roi}% with break-even in {calculations.breakEvenMonths.toFixed(1)} months</p>
                <p><strong>5-Year Value:</strong> ${(calculations.fiveYearValue / 1000000).toFixed(1)}M net benefit addressing 2028 retirement crisis</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '12px' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#00416A' }}>Model Methodology & Data Sources</h3>
            <div className="space-y-4">
              <div style={{ background: '#EDF3F9', padding: '20px', borderRadius: '8px' }}>
                <h4 className="font-bold mb-2" style={{ color: '#1460AA' }}>Pathway 1: FECA Claims Reduction</h4>
                <p style={{ color: '#555555' }}>Reduces mental health workers' compensation claims through proactive resilience building. CBP faces $90-120M annual FECA costs with 20% mental health-related (17 Border Patrol suicides in 2022, suicide rate 28% higher than other LE).</p>
              </div>
              <div style={{ background: '#ECF5EC', padding: '20px', borderRadius: '8px' }}>
                <h4 className="font-bold mb-2" style={{ color: '#008000' }}>Pathway 2: Retention Economics</h4>
                <p style={{ color: '#555555' }}>Prevents costly turnover through improved leadership and work-life integration. Replacement cost: ${workforce.replacementCost.toLocaleString()} including FLETC training, clearances, recruitment incentives (up to $36,300), and 18-24 month productivity ramp-up.</p>
              </div>
              <div style={{ background: '#FEF7ED', padding: '20px', borderRadius: '8px', border: '2px solid #F09511' }}>
                <h4 className="font-bold mb-2" style={{ color: '#F09511' }}>2028 Retirement Crisis</h4>
                <p style={{ color: '#333333' }}>Commissioner projects 400% increase in officer retirements in FY2028 (2,220 vs. ~500 annual). With 316-578 day hiring timelines and 1.8% applicant yield, CBP cannot recruit fast enough. Retention is the only viable strategy.</p>
              </div>
              <div style={{ padding: '20px', background: '#F6F6F6', borderRadius: '8px' }}>
                <h4 className="font-bold mb-3" style={{ color: '#333333' }}>Data Sources</h4>
                <ul className="space-y-2 text-sm" style={{ color: '#555555' }}>
                  <li><strong style={{ color: '#1460AA' }}>GAO-24-107029:</strong> CBP recruitment, hiring, retention analysis (September 2024)</li>
                  <li><strong style={{ color: '#1460AA' }}>DHS OIG-12-63:</strong> CBP FECA program audit ($62M annual costs, 11,299 cases)</li>
                  <li><strong style={{ color: '#1460AA' }}>Union Sources (NBPC, NTEU):</strong> Suicide statistics, mandatory overtime, morale rankings (432 of 459 federal subcomponents)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAssistant && (
        <div style={{ position: 'fixed', bottom: '96px', right: '24px', width: '384px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', zIndex: 50, border: '2px solid #1460AA' }}>
          <div style={{ background: '#1460AA', color: '#FFFFFF', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="flex items-center"><MessageSquare size={20} className="mr-2" /><h3 className="font-bold">Model Assistant</h3></div>
            <button onClick={() => setShowAssistant(false)} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '20px' }}>✕</button>
          </div>
          <div style={{ padding: '16px', background: '#F6F6F6', minHeight: '200px' }}>
            <p className="text-sm" style={{ color: '#333333' }}>Hello! I can help explain the calculator methodology, interpret results, or answer questions about {workforce.name}.</p>
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