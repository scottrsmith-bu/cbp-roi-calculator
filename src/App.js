import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp, Users, DollarSign, Shield, Heart, Brain, MessageSquare, ChevronDown, ChevronUp, Info, AlertCircle, Target, Award, Activity, ExternalLink } from 'lucide-react';

const organizationData = [
  { id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 97500, fecaAnnual: 105000000, workersCompClaims: 3100, description: 'Entire CBP workforce', category: 'All Units' },
  { id: 'ofo', name: 'Office of Field Operations', personnel: 26000, location: '328 Ports of Entry', preset: 'Yes', attritionRate: 3.5, replacementCost: 87300, fecaAnnual: 42000000, workersCompClaims: 1340, description: 'Airports, seaports, land crossings', category: 'Organization' },
  { id: 'usbp', name: 'U.S. Border Patrol', personnel: 20000, location: '20 Sectors Nationwide', preset: 'Yes', attritionRate: 7.2, replacementCost: 125000, fecaAnnual: 55000000, workersCompClaims: 1500, description: 'Land border patrol', category: 'Organization' },
  { id: 'swb', name: 'Southwest Border Ports', personnel: 8500, location: 'CA, AZ, NM, TX', preset: 'Yes', attritionRate: 6.8, replacementCost: 95000, fecaAnnual: 18000000, workersCompClaims: 520, description: 'San Ysidro, Otay Mesa, Calexico', category: 'USBP Sector' },
  { id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', preset: 'Yes', attritionRate: 7.5, replacementCost: 115000, fecaAnnual: 12000000, workersCompClaims: 285, description: 'Largest sector, highest activity', category: 'USBP Sector' },
];

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Units');

  const categories = ['All Units', 'Organization', 'USBP Sector'];

  const filteredOrgs = organizationData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Units' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2f5c 0%, #1e5a8e 50%, #004d7a 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Shield size={48} color="#0066cc" />
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', margin: 0 }}>U.S. Customs and Border Protection</h1>
              <p style={{ fontSize: '20px', color: '#666', margin: '8px 0 0 0' }}>BetterUp Retention & Wellness ROI Calculator</p>
            </div>
          </div>
          <p style={{ color: '#555', fontSize: '16px', margin: 0 }}>
            Demonstrating financial impact through dual-pathway methodology: (1) reducing costly FECA mental health claims and (2) preventing high-cost turnover through precision development. Based on proven Air Force results (2021-2025) and comprehensive GAO research.
          </p>
        </div>

        <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Select Your Organization or Sector</h2>
          <p style={{ color: '#aaa', marginBottom: '24px' }}>Choose a command preset or create a custom region. All parameters can be fine-tuned later.</p>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '300px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #444', background: '#2a2a2a', color: 'white', fontSize: '16px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
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
                  fontSize: '14px',
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
                  <th style={{ padding: '16px', textAlign: 'left', color: '#aaa', fontWeight: '600' }}>Organization / Sector</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600' }}>Personnel</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600' }}>Location</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600' }}>Preset</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontWeight: '600' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org, idx) => (
                  <tr key={org.id} style={{ borderTop: idx > 0 ? '1px solid #333' : 'none' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ color: 'white', fontWeight: '600', marginBottom: '4px' }}>{org.name}</div>
                      <div style={{ color: '#888', fontSize: '14px' }}>{org.description}</div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'white', fontWeight: '600' }}>
                      {org.personnel.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#aaa' }}>{org.location}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        background: org.preset === 'Yes' ? '#00cc66' : '#666',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {org.preset}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => onSelect(org)}
                        style={{
                          padding: '8px 24px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#0066cc',
                          color: 'white',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}
                      >
                        Select →
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
  
  const [drivers, setDrivers] = useState({
    missionReadiness: 27,
    resilience: 22,
    careerCommitment: 20,
    leadership: 18,
    professionalStandards: 13
  });

  const totalDriverImpact = Object.values(drivers).reduce((a, b) => a + b, 0);
  const retentionEffectiveness = drivers.careerCommitment + drivers.leadership;
  const readinessEffectiveness = drivers.missionReadiness + drivers.resilience + drivers.professionalStandards;

  const calculations = useMemo(() => {
    const engaged = Math.round(seats * (engagementRate / 100));
    
    const annualAttrition = workforce.personnel * (workforce.attritionRate / 100);
    const separationsPrevented = Math.round(engaged * (retentionEffectiveness / 100));
    const retentionSavings = separationsPrevented * workforce.replacementCost;
    
    const avgClaimCost = 65000;
    const claimsRate = workforce.workersCompClaims / workforce.personnel;
    const expectedClaims = seats * claimsRate;
    const claimsPrevented = Math.round(expectedClaims * 0.22);
    const fecaSavings = claimsPrevented * avgClaimCost;
    
    const readinessImproved = Math.round(engaged * (readinessEffectiveness / 100));
    const readinessValuePerPerson = 15000;
    const readinessEconomicValue = readinessImproved * readinessValuePerPerson;
    
    const totalAnnualSavings = retentionSavings + fecaSavings + readinessEconomicValue;
    const totalCost = seats * costPerSeat;
    const netSavings = totalAnnualSavings - totalCost;
    const roi = Math.round((netSavings / totalCost) * 100);
    const breakEvenMonths = (totalCost / totalAnnualSavings) * 12;
    const fiveYearValue = (totalAnnualSavings * 5) - totalCost;
    
    return {
      engaged,
      annualAttrition,
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
  }, [seats, engagementRate, costPerSeat, workforce, retentionEffectiveness, readinessEffectiveness]);

  const savingsBreakdown = [
    { name: 'Retention', value: calculations.retentionSavings, color: '#0066cc' },
    { name: 'FECA Prevention', value: calculations.fecaSavings, color: '#cc3333' },
    { name: 'Readiness Value', value: calculations.readinessEconomicValue, color: '#00cc66' }
  ];

  const impactTimeline = [
    { year: 'Year 1', savings: calculations.netSavings, cumulative: calculations.netSavings },
    { year: 'Year 2', savings: calculations.totalAnnualSavings, cumulative: calculations.netSavings + calculations.totalAnnualSavings },
    { year: 'Year 3', savings: calculations.totalAnnualSavings, cumulative: calculations.netSavings + (calculations.totalAnnualSavings * 2) },
    { year: 'Year 4', savings: calculations.totalAnnualSavings, cumulative: calculations.netSavings + (calculations.totalAnnualSavings * 3) },
    { year: 'Year 5', savings: calculations.totalAnnualSavings, cumulative: calculations.fiveYearValue }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)', padding: '16px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ background: 'linear-gradient(135deg, #0a2f5c 0%, #0066cc 100%)', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Shield size={40} color="white" />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                {workforce.name} ROI Calculator
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', margin: '4px 0 0 0', fontSize: '14px' }}>
                {workforce.personnel.toLocaleString()} Personnel • {workforce.location}
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            ← Change Organization
          </button>
        </div>

        {/* ENHANCED SAVINGS CALLOUT */}
        <div style={{
          background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 30px rgba(0, 102, 204, 0.3)',
          border: '3px solid #ffcc00',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,204,0,0.2) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                background: '#ffcc00',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(255, 204, 0, 0.4)'
              }}>
                <DollarSign size={32} color="#0066cc" strokeWidth={3} />
              </div>
              <div>
                <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', fontWeight: '600', marginBottom: '4px' }}>
                  ANNUAL IMPACT PROJECTION
                </div>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', lineHeight: 1 }}>
                  ${(calculations.netSavings / 1000000).toFixed(2)}M
                </div>
              </div>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <p style={{
                fontSize: '18px',
                color: 'white',
                margin: 0,
                fontWeight: '500',
                lineHeight: 1.5
              }}>
                BetterUp saves <span style={{ fontWeight: 'bold', color: '#ffcc00' }}>{workforce.name}</span> <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#ffcc00' }}>${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M annually</span>—including cutting an estimated <span style={{ fontWeight: 'bold', color: '#ff6b6b' }}>{calculations.claimsPrevented} workers' comp claims</span>—by helping personnel build resilience ahead of the 2028 retirement crisis.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffcc00' }}>
                  {calculations.separationsPrevented}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                  Separations Prevented
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  {calculations.claimsPrevented}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                  Claims Prevented
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ff88' }}>
                  {calculations.roi}%
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                  Return on Investment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #ddd', paddingBottom: '0', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Calculator },
            { id: 'details', label: 'Model Details', icon: Info },
            { id: 'drivers', label: 'Performance Drivers', icon: TrendingUp },
            { id: 'parameters', label: 'Parameters', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '14px 24px',
                  border: 'none',
                  background: activeTab === tab.id ? '#0066cc' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#666',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  fontSize: '15px',
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* DASHBOARD TAB */}
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
                  <div key={idx} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: `4px solid ${metric.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>{metric.label}</div>
                      <Icon size={20} color={metric.color} />
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: metric.color }}>{metric.value}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Savings Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={savingsBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {savingsBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>5-Year Impact</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={impactTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
                    <Legend />
                    <Bar dataKey="savings" fill="#0066cc" name="Annual Savings" />
                    <Bar dataKey="cumulative" fill="#00cc66" name="Cumulative" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Workers Comp Breakdown - BOTH VISIBLE */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#cc3333', margin: 0 }}>On-Claim Workers' Comp</h3>
                  <button
                    onClick={() => setShowOnClaimBreakdown(!showOnClaimBreakdown)}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cc3333', background: 'white', color: '#cc3333', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {showOnClaimBreakdown ? 'Hide' : 'Show'} Breakdown
                  </button>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#cc3333', marginBottom: '8px' }}>
                  ${(calculations.fecaSavings / 1000000).toFixed(2)}M
                </div>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Estimated {calculations.claimsPrevented} workers' comp claims prevented annually
                </p>
                {showOnClaimBreakdown && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#fff5f5', borderRadius: '8px', borderLeft: '3px solid #cc3333' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Avg Claim Cost</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>$65,000</div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Prevention Rate</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>22%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Total Annual Savings</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#cc3333' }}>
                        ${(calculations.fecaSavings / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066cc', margin: 0 }}>Off-Claim Economic Costs</h3>
                  <button
                    onClick={() => setShowOffClaimBreakdown(!showOffClaimBreakdown)}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #0066cc', background: 'white', color: '#0066cc', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {showOffClaimBreakdown ? 'Hide' : 'Show'} Breakdown
                  </button>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px' }}>
                  ${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(2)}M
                </div>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Retention savings + readiness economic value
                </p>
                {showOffClaimBreakdown && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#f0f7ff', borderRadius: '8px', borderLeft: '3px solid #0066cc' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Retention Savings</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                        ${(calculations.retentionSavings / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Readiness Value</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                        ${(calculations.readinessEconomicValue / 1000000).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Total Economic Value</div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0066cc' }}>
                        ${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(2)}M
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'dashboard' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc' }}>
              {activeTab === 'details' && 'Model Details & Methodology'}
              {activeTab === 'drivers' && 'Performance Drivers'}
              {activeTab === 'parameters' && 'Model Parameters'}
            </h2>
            <p style={{ color: '#666' }}>Content for {activeTab} tab coming soon...</p>
          </div>
        )}

        {/* Assistant Chatbot */}
        {showAssistant && (
          <div style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: '380px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            zIndex: 1000,
            border: '2px solid #0066cc'
          }}>
            <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', padding: '16px', borderRadius: '14px 14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={20} color="white" />
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }}>Model Assistant</h3>
              </div>
              <button
                onClick={() => setShowAssistant(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: '14px', color: '#333', marginBottom: '16px' }}>
                Hello! I can help explain the calculator methodology, interpret results, or answer questions about {workforce.name}.
              </p>
              <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', fontSize: '13px', color: '#666' }}>
                💡 <strong>Try asking:</strong>
                <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                  <li>How is ROI calculated?</li>
                  <li>What drives retention savings?</li>
                  <li>Explain the FECA methodology</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAssistant(!showAssistant)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#0066cc',
            color: 'white',
            padding: '16px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 102, 204, 0.4)',
            zIndex: 999
          }}
        >
          <MessageSquare size={24} />
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