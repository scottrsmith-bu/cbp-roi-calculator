import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp, DollarSign, Shield, MessageSquare, Info, Activity, ExternalLink } from 'lucide-react';

const organizationData = [
  { id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', preset: 'Yes', attritionRate: 5.5, replacementCost: 97500, workersCompClaims: 3100, category: 'All Units', description: 'Entire CBP workforce' },
  { id: 'ofo', name: 'Office of Field Operations', personnel: 26000, location: '328 Ports of Entry', preset: 'Yes', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 1340, category: 'Organization', description: 'Airports, seaports, land crossings' },
  { id: 'usbp', name: 'U.S. Border Patrol', personnel: 20000, location: '20 Sectors Nationwide', preset: 'Yes', attritionRate: 7.2, replacementCost: 125000, workersCompClaims: 1500, category: 'Organization', description: 'Land border patrol' },
  { id: 'swb_all', name: 'Southwest Border (All 9 Sectors)', personnel: 12000, location: 'CA, AZ, NM, TX', preset: 'Yes', attritionRate: 7.5, replacementCost: 125000, workersCompClaims: 900, category: 'USBP Region', description: 'San Diego, El Centro, Yuma, Tucson, El Paso, Big Bend, Del Rio, Laredo, RGV' },
  { id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', preset: 'Yes', attritionRate: 7.5, replacementCost: 115000, workersCompClaims: 285, category: 'USBP Sector', description: 'Largest sector, highest activity' },
  { id: 'rgv', name: 'Rio Grande Valley Sector', personnel: 3200, location: 'Texas', preset: 'Yes', attritionRate: 7.8, replacementCost: 120000, workersCompClaims: 240, category: 'USBP Sector', description: 'Highest apprehension volume' },
  { id: 'sandiego', name: 'San Diego Sector', personnel: 2800, location: 'California', preset: 'Yes', attritionRate: 6.5, replacementCost: 130000, workersCompClaims: 210, category: 'USBP Sector', description: 'Urban border operations' },
  { id: 'elpaso', name: 'El Paso Sector', personnel: 2600, location: 'West Texas, New Mexico', preset: 'Yes', attritionRate: 7.2, replacementCost: 118000, workersCompClaims: 195, category: 'USBP Sector', description: 'Multi-state operations' },
];

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Units');

  const categories = ['All Units', 'Organization', 'USBP Region', 'USBP Sector'];

  const filteredOrgs = organizationData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Units' || org.category === selectedCategory;
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
            <p style={{ color: '#333', fontSize: '16px', margin: 0, lineHeight: 1.6 }}>
              This calculator projects financial impact through a <strong>dual-pathway methodology</strong>: (1) reducing costly FECA mental health claims (PTSD, depression, anxiety, substance use disorders) and (2) preventing high-cost personnel turnover through precision resilience development. Based on 4 years of proven Air Force results (2021-2025) and comprehensive GAO research documenting CBP workforce challenges including 156 employee suicides (2007-2022), morale ranked 432 of 459 federal agencies, and the impending 2028 retirement crisis (2,200+ officers retiring).
            </p>
          </div>
        </div>

        <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Select Your Organization or Sector</h2>
          <p style={{ color: '#aaa', marginBottom: '24px' }}>Choose your CBP component. All parameters can be customized after selection.</p>
          
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
                  <th style={{ padding: '16px', textAlign: 'left', color: '#aaa' }}>Organization / Sector</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa' }}>Personnel</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa' }}>Location</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa' }}>Preset</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#aaa' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org, idx) => (
                  <tr key={org.id} style={{ borderTop: idx > 0 ? '1px solid #333' : 'none' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ color: 'white', fontWeight: '600', marginBottom: '4px' }}>{org.name}</div>
                      <div style={{ color: '#888', fontSize: '13px' }}>{org.description}</div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', color: 'white', fontWeight: '600' }}>{org.personnel.toLocaleString()}</td>
                    <td style={{ padding: '16px', textAlign: 'center', color: '#aaa', fontSize: '13px' }}>{org.location}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', background: '#00cc66', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>{org.preset}</span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button onClick={() => onSelect(org)} style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: '#0066cc', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
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
  
  const [drivers, setDrivers] = useState({
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
    
    return { engaged, separationsPrevented, retentionSavings, claimsPrevented, fecaSavings, readinessImproved, readinessEconomicValue, totalAnnualSavings, totalCost, netSavings, roi, breakEvenMonths, fiveYearValue };
  }, [seats, engagementRate, workforce, retentionEffectiveness, readinessEffectiveness, costPerSeat]);

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

  const driverDetails = [
    {
      key: 'missionReadiness',
      label: 'Mission Readiness & Operational Effectiveness',
      desc: 'Rapid decision-making • Cognitive agility • Sustained performance under pressure',
      opm: 'OPM Standard: "Analyze information rapidly and take prompt law enforcement action"',
      affects: 'Readiness (62%)',
      color: '#0066cc',
      impact: 'Drives operational performance during mandatory 12-16 hour shifts and high-activity periods. Addresses GAO findings that agents feel unable to perform primary duties.',
      source: 'Air Force: +17% mission readiness improvement (11,215 participants, 77,333 sessions, 2021-2025). Enhanced through precision development targeting focus, cognitive agility, emotional regulation, recovery, and prioritization.',
      alignment: 'CBP Strategic Objective 1.2 (Awareness and Enforcement). Directly supports "analyze information rapidly" competency required for both Border Patrol Agents (Series 1896) and CBP Officers (Series 1895).'
    },
    {
      key: 'resilience',
      label: 'Resilience & Mental Wellness',
      desc: 'Burnout prevention • Stress management • Emotional regulation • Recovery strategies • PTSD mitigation',
      opm: 'Addresses: 156 employee suicides (2007-2022), morale ranked 432 of 459 agencies, mental health crisis',
      affects: 'Both Retention & Readiness',
      color: '#00cc66',
      impact: 'Directly addresses documented mental health crisis. Complements CBP Resiliency Program, Safe Harbor Policy, and Holistic Health Support Centers. Critical for personnel experiencing trauma from hostile encounters, family separation during TDYs, and sustained operational stress.',
      source: 'Air Force: +21.6% burnout reduction (JAMA 2024 peer-reviewed validation), +15% resilience gains across 11,215 participants. Behavioral science research demonstrates coaching addresses the five root causes of federal employee burnout: unfair treatment, unmanageable workloads, unclear communication, lack of support, and unreasonable time pressure.',
      alignment: 'CBP Strategic Objective 2.2 (Wellness and Resilience). Supports CBP Workforce Care Directorate mission to "deliver robust resilience, health, and wellness programs." Addresses NTEU testimony documenting mental health claims totaling $105M+ annually.'
    },
    {
      key: 'careerCommitment',
      label: 'Career Commitment & Retention Intent',
      desc: 'Purpose & meaning • Career development • Work-life integration • Organizational commitment • Belonging',
      opm: 'Critical for 2028 retirement cliff: 2,200+ CBP Officers retiring (400% increase from annual average)',
      affects: 'Retention (38%)',
      color: '#ff9900',
      impact: 'Prevents early departures and addresses exit survey findings: 50% of retirees leave before mandatory age, 31% depart for private sector (32.71% pay gap), 28% move to other federal agencies. Directly targets top exit reasons: undesirable locations, poor leadership communication, lack of work-life balance.',
      source: 'Air Force: +20% military commitment (88 pilots, p<.001 statistical significance), +15% officer retention intent, +22% enlisted career commitment (523 participants). Top retention drivers: purpose/meaning (+21.6% improvement), belonging (+26.2%), engagement (+14.6%).',
      alignment: 'CBP Strategic Objective 2.1 (Talent Acquisition and Workforce Development). Addresses GAO-24-107029 findings that CBP has frequently fallen short of staffing targets with immediate need for 4,000+ new officers beyond current 5,850-officer shortage.'
    },
    {
      key: 'leadership',
      label: 'Leadership Effectiveness Under Pressure',
      desc: 'Communication • Authenticity • Strategic thinking • Leading through ambiguity • Supervisory competencies',
      opm: 'Addresses #1 exit survey reason: "Poor senior leadership communication." Required for GS-13+ supervisory promotion.',
      affects: 'Both Retention & Readiness',
      color: '#9966cc',
      impact: 'Develops leadership competencies required for Border Patrol Promotional Assessment: leadership, adaptability, strategic planning, ethics. Addresses leadership instability (6 DHS Secretaries 2003-2019, multiple acting officials) and GAO findings that CBP lacks published leadership competency model or succession planning documentation.',
      source: 'Air Force: +21% improvements in accountability drivers (self-confidence, growth mindset, clarity, authenticity). Leadership presence and strategic thinking improvements correlate with retention and team readiness.',
      alignment: 'Supervisory competencies for GS-13+ positions. Supports CBP need for leadership pipeline ahead of retirement wave creating vacancies. Addresses union testimony: "poor senior leadership communication" driving departures and low morale.'
    },
    {
      key: 'professionalStandards',
      label: 'Professional Standards & Decision-Making',
      desc: 'Ethical decision-making • Sound judgment • Professional demeanor • Standards adherence • Tactical communication',
      opm: 'OPM Standard: "Deal tactfully with persons of all economic, social, and ethnic backgrounds" • CBP Standards of Conduct (Directive 51735-013B) compliance',
      affects: 'Both Retention & Readiness',
      color: '#cc3333',
      impact: 'Maintains professionalism during hostile encounters. Union testimony documents agents experiencing verbal threats, physical assault, and emotional trauma. OPM standards require "sound judgment in use of firearms," "make arrests with sound judgment," and "represent the United States in international contacts satisfactorily."',
      source: 'Air Force: +10% improvements in coaching, recognition, and courageous communication (Standards driver). Command climate and performance consistency enhancements.',
      alignment: 'CBP Standards of Conduct requirements: integrity, professional demeanor, accountability, conscientious duty performance. Constitutional law enforcement (4th Amendment search/seizure) requiring ethical decision-making under political scrutiny and public visibility.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '16px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ background: '#0066cc', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Shield size={40} color="white" />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{workforce.name}</h1>
              <p style={{ color: 'white', margin: '4px 0 0 0', fontSize: '14px' }}>{workforce.personnel.toLocaleString()} Personnel</p>
            </div>
          </div>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', borderRadius: '8px', border: '2px solid white', background: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            Change Organization
          </button>
        </div>

        <div style={{ background: '#0066cc', borderRadius: '20px', padding: '32px', marginBottom: '32px', border: '3px solid #ffcc00', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,204,0,0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
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
              <div style={{ fontSize: '18px', color: 'white', lineHeight: 1.6 }}>
                BetterUp saves {workforce.name} <strong style={{ color: '#ffcc00', fontSize: '20px' }}>${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M annually</strong> through 
                <strong style={{ color: '#ff6b6b' }}> (1) reducing costly FECA mental health claims</strong> and 
                <strong style={{ color: '#ffcc00' }}> (2) preventing high-cost turnover</strong> ahead of the 2028 retirement crisis.
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
        </div>

        <div style={{ background: '#2a2a2a', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>BetterUp Seats: {seats.toLocaleString()}</h2>
              <p style={{ color: '#aaa', margin: 0 }}>Population: {workforce.personnel.toLocaleString()}</p>
            </div>
            <button
              onClick={() => {
                const val = prompt('Enter seats:', seats);
                if (val && !isNaN(val)) setSeats(parseInt(val));
              }}
              style={{ padding: '10px 24px', borderRadius: '8px', background: '#ffcc00', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#000' }}
            >
              Edit
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
              <label style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>Engagement Rate: {engagementRate}%</label>
              <button
                onClick={() => {
                  const val = prompt('Enter rate:', engagementRate);
                  if (val && !isNaN(val) && val >= 0 && val <= 100) setEngagementRate(parseInt(val));
                }}
                style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #ffcc00', background: 'transparent', color: '#ffcc00', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Edit
              </button>
            </div>
            <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 8px 0' }}>Controls how many personnel actively use BetterUp coaching</p>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Example: {seats.toLocaleString()} × {engagementRate}% = {calculations.engaged.toLocaleString()} engaged</p>
          </div>

          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Key Model Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>Engagement Rate ({engagementRate}%)</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Controls <strong style={{ color: 'white' }}>how many</strong> personnel use coaching</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>Readiness Rate ({readinessEffectiveness}%)</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Controls <strong style={{ color: 'white' }}>how much</strong> performance improves</div>
                <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Auto-calculated from Performance Drivers</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #ddd', flexWrap: 'wrap' }}>
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

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {[
                { label: 'Total Savings', value: `$${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M`, color: '#0066cc', icon: DollarSign },
                { label: 'Program Cost', value: `$${(calculations.totalCost / 1000000).toFixed(2)}M`, color: '#666', icon: Calculator },
                { label: 'Net Benefit', value: `$${(calculations.netSavings / 1000000).toFixed(2)}M`, color: '#00cc66', icon: TrendingUp },
                { label: 'Break-Even', value: `${calculations.breakEvenMonths.toFixed(1)} months`, color: '#ff9900', icon: Activity }
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} style={{ background: 'white', borderRadius: '12px', padding: '24px', borderLeft: `4px solid ${metric.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>{metric.label}</div>
                      <Icon size={20} color={metric.color} />
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: metric.color }}>{metric.value}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Savings Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={savingsBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} dataKey="value">
                      {savingsBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>5-Year Impact</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={impactTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(v) => `$${(v / 1000000).toFixed(2)}M`} />
                    <Legend />
                    <Bar dataKey="savings" fill="#0066cc" name="Annual" />
                    <Bar dataKey="cumulative" fill="#00cc66" name="Cumulative" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#cc3333', margin: 0 }}>On-Claim Workers Comp</h3>
                  <button onClick={() => setShowOnClaimBreakdown(!showOnClaimBreakdown)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cc3333', background: 'white', color: '#cc3333', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    {showOnClaimBreakdown ? 'Hide' : 'Show'} Breakdown
                  </button>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#cc3333', marginBottom: '8px' }}>${(calculations.fecaSavings / 1000000).toFixed(2)}M</div>
                <p style={{ color: '#666', fontSize: '14px' }}>Projected mental health WC claims</p>
                
                {showOnClaimBreakdown && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#fff5f5', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#cc3333' }}>Breakdown by Factor</h4>
                    {[
                      { label: 'PTSD', pct: 0.92 },
                      { label: 'Depression', pct: 0.064 },
                      { label: 'Anxiety', pct: 0.014 },
                      { label: 'Substance Use (SUD)', pct: 0 }
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: i < 3 ? '1px solid #ffe0e0' : 'none', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>{item.label}</span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                          ${((calculations.fecaSavings * item.pct) / 1000000).toFixed(2)}M
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066cc', margin: 0 }}>Off-Claim Economic Costs</h3>
                  <button onClick={() => setShowOffClaimBreakdown(!showOffClaimBreakdown)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #0066cc', background: 'white', color: '#0066cc', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    {showOffClaimBreakdown ? 'Hide' : 'Show'} Breakdown
                  </button>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px' }}>
                  ${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(2)}M
                </div>
                <p style={{ color: '#666', fontSize: '14px' }}>Productivity loss, absenteeism, and turnover</p>
                
                {showOffClaimBreakdown && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#f0f7ff', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#0066cc' }}>Breakdown by Factor</h4>
                    {[
                      { label: 'PTSD', pct: 0.672 },
                      { label: 'Depression', pct: 0.172 },
                      { label: 'Anxiety', pct: 0.041 },
                      { label: 'Substance Use (SUD)', pct: 0.115 }
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: i < 3 ? '1px solid #d4e5f7' : 'none', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>{item.label}</span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                          ${(((calculations.retentionSavings + calculations.readinessEconomicValue) * item.pct) / 1000000).toFixed(2)}M
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc' }}>Model Assumptions & Methodology</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
              This ROI model is built on proven Air Force results (2021-2025) and comprehensive government research.
            </p>

            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                {
                  num: 1,
                  title: 'Attrition Rates',
                  color: '#0066cc',
                  content: `Current ${workforce.name} attrition: ${workforce.attritionRate}%. Critical challenge: 2,200+ officers retire in 2028 (400% increase).`,
                  links: [
                    { url: 'https://www.gao.gov/products/gao-24-107029', label: 'GAO-24-107029' },
                    { url: 'https://www.nteu.org/media-center/news-releases/2024/08/21/officers', label: 'NTEU Warning' }
                  ]
                },
                {
                  num: 2,
                  title: 'Replacement Costs',
                  color: '#cc3333',
                  content: `Average: $${workforce.replacementCost.toLocaleString()} per separation. Includes recruitment, background investigations, academy training, and 12+ month time-to-hire.`,
                  links: [
                    { url: 'https://www.gao.gov/products/gao-24-107029', label: 'GAO Report' }
                  ]
                },
                {
                  num: 3,
                  title: 'Coaching Effectiveness',
                  color: '#00cc66',
                  content: `Retention: ${retentionEffectiveness}% | Readiness: ${readinessEffectiveness}%. Air Force: +20% commitment (pilots), +17% mission readiness (11,215 participants).`,
                  links: [
                    { url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2816987', label: 'JAMA 2024' }
                  ]
                },
                {
                  num: 4,
                  title: 'FECA Mental Health Claims',
                  color: '#ff9900',
                  content: 'Avg claim: $65,000. Prevention rate: 22%. NTEU: 156 CBP suicides (2007-2022). $105M+ annual mental health claims.',
                  links: [
                    { url: 'https://www.nteu.org/legislative-action/congressional-testimony/fy-2025-budget-request-cbp', label: 'NTEU Testimony' }
                  ]
                }
              ].map((section) => (
                <div key={section.num} style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px', borderLeft: `4px solid ${section.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ background: section.color, color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{section.num}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{section.title}</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px', paddingLeft: '44px' }}>{section.content}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingLeft: '44px' }}>
                    {section.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: section.color, color: 'white', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>
                        {link.label} <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', padding: '24px', background: '#e6f2ff', borderRadius: '12px', border: '2px solid #0066cc' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px' }}>Data Integrity</h3>
              <p style={{ fontSize: '14px', color: '#333', margin: 0 }}>
                All assumptions based on government research (GAO, CBO, DHS OIG), union testimony (NTEU, NBPC), and 4+ years of proven Air Force results (2021-2025).
              </p>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: '#0066cc' }}>Performance Drivers Aligned to CBP Priorities</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
              Mapped to CBP OPM competencies, strategic objectives, and documented workforce challenges.
            </p>

            <div style={{ display: 'grid', gap: '24px' }}>
              {driverDetails.map(driver => (
                <div key={driver.key} style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px', borderLeft: `4px solid ${driver.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>{driver.label}</h3>
                      <p style={{ fontSize: '13px', color: '#666', margin: '0 0 8px 0' }}>{driver.desc}</p>
                      <p style={{ fontSize: '12px', color: '#888', margin: '0 0 12px 0', fontStyle: 'italic' }}>{driver.opm}</p>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        <strong style={{ color: driver.color }}>Impact:</strong> {driver.impact}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        <strong style={{ color: driver.color }}>Evidence:</strong> {driver.source}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        <strong style={{ color: driver.color }}>Alignment:</strong> {driver.alignment}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: driver.color }}>{drivers[driver.key]}%</div>
                      <div style={{ fontSize: '11px', color: '#888' }}>Affects {driver.affects}</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={drivers[driver.key]}
                    onChange={(e) => setDrivers({ ...drivers, [driver.key]: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: driver.color }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginTop: '8px' }}>
                    <span>0%</span>
                    <span>15%</span>
                    <span>30%</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', padding: '20px', background: '#e6f2ff', borderRadius: '12px' }}>
              <p style={{ fontSize: '14px', margin: 0 }}>
                <strong>Combined Impact:</strong> Retention = {retentionEffectiveness}% | Readiness = {readinessEffectiveness}%
              </p>
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#0066cc' }}>Model Parameters</h2>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Program Seats: {seats.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={Math.round(workforce.personnel * 0.05)}
                  max={Math.round(workforce.personnel * 0.3)}
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#0066cc' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginTop: '8px' }}>
                  <span>{Math.round(workforce.personnel * 0.05).toLocaleString()} (5%)</span>
                  <span>{Math.round(workforce.personnel * 0.15).toLocaleString()} (15%)</span>
                  <span>{Math.round(workforce.personnel * 0.3).toLocaleString()} (30%)</span>
                </div>
              </div>

              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Engagement Rate: {engagementRate}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="85"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#00cc66' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginTop: '8px' }}>
                  <span>50%</span>
                  <span>65%</span>
                  <span>85%</span>
                </div>
              </div>

              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Cost per Seat: ${costPerSeat}/year
                </label>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="50"
                  value={costPerSeat}
                  onChange={(e) => setCostPerSeat(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ff9900' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666', marginTop: '8px' }}>
                  <span>$100</span>
                  <span>$200</span>
                  <span>$300</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAssistant && (
          <div style={{ position: 'fixed', bottom: '100px', right: '24px', width: '380px', maxWidth: '90vw', background: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', zIndex: 1000, border: '2px solid #0066cc' }}>
            <div style={{ background: '#0066cc', padding: '16px', borderRadius: '14px 14px 0 0', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={20} color="white" />
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }}>Model Assistant</h3>
              </div>
              <button onClick={() => setShowAssistant(false)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '20px' }}>
              <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                I can help explain the calculator methodology and interpret results for {workforce.name}.
              </p>
            </div>
          </div>
        )}

        <button onClick={() => setShowAssistant(!showAssistant)} style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#0066cc', color: 'white', padding: '16px', borderRadius: '50%', border: 'none', cursor: 'pointer', zIndex: 999 }}>
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