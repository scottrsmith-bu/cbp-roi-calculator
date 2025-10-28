import React, { useState, useMemo } from 'react';
import { Award, TrendingUp, Shield, Users, DollarSign, Target, ChevronDown, ChevronUp, MessageCircle, X, Sparkles, CheckCircle, BarChart3, FileText, BookOpen, Lightbulb, TrendingDown, Clock, Info, AlertCircle } from 'lucide-react';

const CBPDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPerfDrivers, setShowPerfDrivers] = useState(false);
  const [showCommercial, setShowCommercial] = useState(false);
  const [retentionImprovement, setRetentionImprovement] = useState(7);
  const [readinessImprovement, setReadinessImprovement] = useState(37);
  const [workersCompImprovement, setWorkersCompImprovement] = useState(22);
  const [missionReadinessImprovement, setMissionReadinessImprovement] = useState(17);
  const [resilienceImprovement, setResilienceImprovement] = useState(15);
  const [professionalStandardsImprovement, setProfessionalStandardsImprovement] = useState(5);
  const [careerCommitmentImprovement, setCareerCommitmentImprovement] = useState(4);
  const [leadershipCultureImprovement, setLeadershipCultureImprovement] = useState(3);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const organizations = [
    {id: 'cbp', name: 'CBP-Wide (All Components)', workforce: 60726, attritionRate: 5.5, replacementCost: 150000, workersCompClaims: 8912, avgClaimCost: 41000, betterupSeats: 'Lead:800|Manage:1700|Ready:800|Grow:800'},
    {id: 'ofo', name: 'Office of Field Operations (OFO)', workforce: 27992, attritionRate: 6.3, replacementCost: 150000, workersCompClaims: 4107, avgClaimCost: 41000, betterupSeats: 'Lead:370|Manage:780|Ready:370|Grow:370'},
    {id: 'usbp', name: 'U.S. Border Patrol (USBP)', workforce: 19648, attritionRate: 4.2, replacementCost: 150000, workersCompClaims: 2883, avgClaimCost: 41000, betterupSeats: 'Lead:260|Manage:550|Ready:260|Grow:260'},
    {id: 'amt', name: 'Air and Marine Operations (AMO)', workforce: 3156, attritionRate: 5.8, replacementCost: 150000, workersCompClaims: 463, avgClaimCost: 41000, betterupSeats: 'Lead:40|Manage:90|Ready:40|Grow:40'},
    {id: 'support', name: 'Support & Mission Staff', workforce: 9930, attritionRate: 5.1, replacementCost: 120000, workersCompClaims: 1459, avgClaimCost: 41000, betterupSeats: 'Lead:130|Manage:280|Ready:130|Grow:130'},
    {id: 'swb', name: 'USBP - Southwest Border', workforce: 16810, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 2466, avgClaimCost: 41000, betterupSeats: 'Lead:220|Manage:470|Ready:220|Grow:220'},
    {id: 'swb_bigbend', name: 'USBP - Big Bend Sector', workforce: 1125, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 165, avgClaimCost: 41000, betterupSeats: 'Lead:15|Manage:31|Ready:15|Grow:15'},
    {id: 'swb_delrio', name: 'USBP - Del Rio Sector', workforce: 2385, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 350, avgClaimCost: 41000, betterupSeats: 'Lead:31|Manage:67|Ready:31|Grow:31'},
    {id: 'swb_elpaso', name: 'USBP - El Paso Sector', workforce: 2550, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 374, avgClaimCost: 41000, betterupSeats: 'Lead:34|Manage:71|Ready:34|Grow:34'},
    {id: 'swb_laredo', name: 'USBP - Laredo Sector', workforce: 1605, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 236, avgClaimCost: 41000, betterupSeats: 'Lead:21|Manage:45|Ready:21|Grow:21'},
    {id: 'swb_rgv', name: 'USBP - Rio Grande Valley Sector', workforce: 3180, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 467, avgClaimCost: 41000, betterupSeats: 'Lead:42|Manage:89|Ready:42|Grow:42'},
    {id: 'swb_sandiego', name: 'USBP - San Diego Sector', workforce: 1590, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 233, avgClaimCost: 41000, betterupSeats: 'Lead:21|Manage:44|Ready:21|Grow:21'},
    {id: 'swb_tucson', name: 'USBP - Tucson Sector', workforce: 3225, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 473, avgClaimCost: 41000, betterupSeats: 'Lead:43|Manage:90|Ready:43|Grow:43'},
    {id: 'swb_yuma', name: 'USBP - Yuma Sector', workforce: 1150, attritionRate: 4.5, replacementCost: 150000, workersCompClaims: 169, avgClaimCost: 41000, betterupSeats: 'Lead:15|Manage:32|Ready:15|Grow:15'}
  ];

  const parseSeats = (seatString) => {
    const parts = seatString.split('|').map(s => s.split(':'));
    return {lead: parseInt(parts[0][1]), manage: parseInt(parts[1][1]), ready: parseInt(parts[2][1]), grow: parseInt(parts[3][1])};
  };

  const calculateMetrics = (org) => {
    if (!org) return null;
    const seats = parseSeats(org.betterupSeats);
    const totalSeats = seats.lead + seats.manage + seats.ready + seats.grow;
    const annualAttrition = Math.round(org.workforce * (org.attritionRate / 100));
    const retentionImpact = annualAttrition * (retentionImprovement / 100);
    const separationsPrevented = Math.round(retentionImpact);
    const retentionSavings = separationsPrevented * org.replacementCost;
    const readinessImpact = org.workersCompClaims * (readinessImprovement / 100);
    const claimsPrevented = Math.round(readinessImpact);
    const workersCompBaseline = org.workersCompClaims * org.avgClaimCost;
    const workersCompAfter = Math.round(workersCompBaseline * (1 - (workersCompImprovement / 100)));
    const workersCompSavings = workersCompBaseline - workersCompAfter;
    const totalSavings = retentionSavings + workersCompSavings;
    const leadCost = seats.lead * 15000; const manageCost = seats.manage * 6000; const readyCost = seats.ready * 2400; const growCost = seats.grow * 1200;
    const totalCost = leadCost + manageCost + readyCost + growCost;
    const netSavings = totalSavings - totalCost;
    const roi = ((netSavings / totalCost) * 100).toFixed(0);
    return {totalSeats, annualAttrition, separationsPrevented, retentionSavings, claimsPrevented, workersCompBaseline, workersCompAfter, workersCompSavings, totalSavings, totalCost, netSavings, roi, seats, leadCost, manageCost, readyCost, growCost};
  };

  const metrics = selectedOrganization ? calculateMetrics(selectedOrganization) : null;

  const performanceDrivers = [
    ...(metrics?.seats.lead > 0 ? [{key: 'mission', priority: "MISSION READINESS", drivers: "Strategic Focus • Decision Quality • Crisis Response", baseline: 48, growth: 65, improvement: missionReadinessImprovement, setImprovement: setMissionReadinessImprovement, requiresLead: true}] : []),
    ...(metrics?.seats.lead > 0 ? [{key: 'resilience', priority: "RESILIENCE", drivers: "Stress Management • Emotional Regulation • Adversity Response", baseline: 38, growth: 53, improvement: resilienceImprovement, setImprovement: setResilienceImprovement, requiresLead: false}] : []),
    ...(metrics?.seats.manage > 0 ? [{key: 'standards', priority: "PROFESSIONAL STANDARDS", drivers: "Conduct Compliance • Ethical Framework • Accountability", baseline: 67, growth: 72, improvement: professionalStandardsImprovement, setImprovement: setProfessionalStandardsImprovement, requiresLead: false}] : []),
    ...(metrics?.seats.ready > 0 ? [{key: 'commitment', priority: "CAREER COMMITMENT", drivers: "Organizational Pride • Career Trajectory • Retention Intent", baseline: 44, growth: 48, improvement: careerCommitmentImprovement, setImprovement: setCareerCommitmentImprovement, requiresLead: false}] : []),
    ...(metrics?.seats.lead > 0 ? [{key: 'culture', priority: "LEADERSHIP CULTURE", drivers: "Supervisory Effectiveness • Trust Building • Command Climate", baseline: 42, growth: 58, improvement: leadershipCultureImprovement, setImprovement: setLeadershipCultureImprovement, requiresLead: true}] : [])
  ];

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    if (searchTerm) filtered = filtered.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const responses = {
      'How is the net savings calculated?': 'Net savings = Total Savings (Retention + Workers Comp) - BetterUp Program Cost. For example, if we prevent $50M in costs but BetterUp costs $20M, net savings is $30M.',
      'Why is OFO facing a retirement crisis in 2028?': 'Officers hired in 2003-2008 have Law Enforcement 6(c) coverage, making them eligible for retirement at 25 years of service. This creates a massive wave of eligible retirees starting in 2028.',
      'Explain the dual-pathway model': 'We calculate value through two independent pathways: (1) Retention - preventing costly separations, and (2) Workers Comp - reducing FECA mental health claims. These combine for total organizational savings.',
      'What are workers\' comp claims?': 'Federal Employees Compensation Act (FECA) claims. CBP has ~8,900 annual claims at $41K average. Mental health claims (PTSD, depression, anxiety, SUD) represent ~35% of total costs.',
      'How do Performance Drivers affect ROI?': 'Each driver (Mission Readiness, Resilience, etc.) contributes to either retention improvement or workers comp reduction. Higher driver improvements = higher effectiveness = greater cost savings.'
    };
    const response = responses[chatInput] || `Great question about "${chatInput}". The ${selectedOrganization?.name || 'CBP'} model shows how BetterUp creates measurable value through both retention and readiness improvements based on Air Force proven results.`;
    setChatMessages([...chatMessages, {type: 'user', text: chatInput}, {type: 'assistant', text: response}]);
    setChatInput('');
  };
  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        <div style={{background: 'white', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', marginBottom: '24px', padding: '32px', border: '3px solid #0066cc'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px'}}>
            <Shield size={48} color="#0066cc" />
            <div>
              <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', margin: 0}}>BetterUp CBP Leadership Dashboard</h1>
              <p style={{fontSize: '20px', color: '#666', margin: '4px 0 0 0'}}>Workers' Comp & Retention ROI Projections</p>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '2px solid #e5e7eb'}}>
          {[
            {id: 'dashboard', label: 'Dashboard', icon: BarChart3},
            {id: 'details', label: 'Model Details', icon: FileText},
            {id: 'drivers', label: 'Performance Drivers', icon: Target},
            {id: 'summary', label: 'Executive Summary', icon: Award}
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              style={{
                padding: '14px 24px', 
                background: activeTab === tab.id ? '#0066cc' : 'transparent', 
                color: activeTab === tab.id ? 'white' : '#666', 
                border: 'none', 
                borderRadius: '8px 8px 0 0', 
                fontSize: '16px', 
                fontWeight: '600', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                transition: 'all 0.2s'
              }} 
              onMouseOver={(e) => {if (activeTab !== tab.id) e.currentTarget.style.background = '#f3f4f6';}} 
              onMouseOut={(e) => {if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent';}}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div style={{background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Users size={24} color="#0066cc" />
                Select Organization
              </h2>
              <input 
                type="text" 
                placeholder="Search organizations..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{width: '100%', padding: '14px', fontSize: '16px', border: '2px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px'}} 
              />
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px', maxHeight: '400px', overflowY: 'auto'}}>
                {filteredOrganizations.map(org => (
                  <button 
                    key={org.id} 
                    onClick={() => setSelectedOrganization(org)} 
                    style={{
                      padding: '16px', 
                      textAlign: 'left', 
                      background: selectedOrganization?.id === org.id ? '#e6f2ff' : '#f9fafb', 
                      border: selectedOrganization?.id === org.id ? '2px solid #0066cc' : '2px solid #e5e7eb', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      transition: 'all 0.2s'
                    }} 
                    onMouseOver={(e) => {if (selectedOrganization?.id !== org.id) e.currentTarget.style.background = '#f3f4f6';}} 
                    onMouseOut={(e) => {if (selectedOrganization?.id !== org.id) e.currentTarget.style.background = '#f9fafb';}}
                  >
                    <div style={{fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: '#1a1a1a'}}>{org.name}</div>
                    <div style={{fontSize: '14px', color: '#666'}}>Workforce: {org.workforce.toLocaleString()}</div>
                    <div style={{fontSize: '14px', color: '#666'}}>Attrition: {org.attritionRate}%</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedOrganization && metrics && (
              <>
                <div style={{background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '24px', border: '2px solid #0066cc', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                  <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px'}}>Key Assumptions for {selectedOrganization.name}</h2>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
                    <div style={{background: '#f0f9ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                      <div style={{fontSize: '40px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px'}}>{retentionImprovement}%</div>
                      <div style={{fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px'}}>Retention Improvement</div>
                      <div style={{fontSize: '14px', color: '#666', lineHeight: '1.5'}}>Through Career Commitment (+{careerCommitmentImprovement}%) and Leadership Culture (+{leadershipCultureImprovement}%), preventing ~{((metrics.annualAttrition * (retentionImprovement/100) / metrics.annualAttrition) * 100).toFixed(0)}% of total attrition</div>
                    </div>
                    <div style={{background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0'}}>
                      <div style={{fontSize: '40px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px'}}>{readinessImprovement}%</div>
                      <div style={{fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px'}}>Readiness Improvement</div>
                      <div style={{fontSize: '14px', color: '#666', lineHeight: '1.5'}}>Combines Mission Readiness (+{missionReadinessImprovement}%), Resilience (+{resilienceImprovement}%), and Professional Standards (+{professionalStandardsImprovement}%)</div>
                    </div>
                    <div style={{background: '#fef3c7', padding: '20px', borderRadius: '8px', border: '1px solid #fde68a'}}>
                      <div style={{fontSize: '40px', fontWeight: 'bold', color: '#d97706', marginBottom: '8px'}}>{workersCompImprovement}%</div>
                      <div style={{fontSize: '16px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px'}}>Workers' Comp Reduction</div>
                      <div style={{fontSize: '14px', color: '#666', lineHeight: '1.5'}}>Based on Air Force data showing 63% reduction in mental health treatment costs, conservatively applied to mental health component of claims (~35% of total)</div>
                    </div>
                  </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px'}}>
                  <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '24px', borderRadius: '12px', color: 'white', boxShadow: '0 8px 16px rgba(102,126,234,0.3)'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                      <Users size={28} />
                      <span style={{fontSize: '17px', fontWeight: '600', opacity: 0.95}}>BetterUp Seats</span>
                    </div>
                    <div style={{fontSize: '42px', fontWeight: 'bold', marginBottom: '8px'}}>{metrics.totalSeats.toLocaleString()}</div>
                    <div style={{fontSize: '15px', opacity: 0.9}}>Lead: {metrics.seats.lead} | Manage: {metrics.seats.manage}<br/>Ready: {metrics.seats.ready} | Grow: {metrics.seats.grow}</div>
                  </div>

                  <div style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '24px', borderRadius: '12px', color: 'white', boxShadow: '0 8px 16px rgba(240,147,251,0.3)'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                      <TrendingUp size={28} />
                      <span style={{fontSize: '17px', fontWeight: '600', opacity: 0.95}}>Separations Prevented</span>
                    </div>
                    <div style={{fontSize: '42px', fontWeight: 'bold', marginBottom: '8px'}}>{metrics.separationsPrevented}</div>
                    <div style={{fontSize: '15px', opacity: 0.9}}>From {metrics.annualAttrition} annual attrition<br/>({retentionImprovement}% improvement)</div>
                  </div>

                  <div style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '24px', borderRadius: '12px', color: 'white', boxShadow: '0 8px 16px rgba(79,172,254,0.3)'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                      <Shield size={28} />
                      <span style={{fontSize: '17px', fontWeight: '600', opacity: 0.95}}>Claims Prevented</span>
                    </div>
                    <div style={{fontSize: '42px', fontWeight: 'bold', marginBottom: '8px'}}>{metrics.claimsPrevented}</div>
                    <div style={{fontSize: '15px', opacity: 0.9}}>From {selectedOrganization.workersCompClaims.toLocaleString()} annual claims<br/>({readinessImprovement}% improvement)</div>
                  </div>

                  <div style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', padding: '24px', borderRadius: '12px', color: 'white', boxShadow: '0 8px 16px rgba(250,112,154,0.3)'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                      <DollarSign size={28} />
                      <span style={{fontSize: '17px', fontWeight: '600', opacity: 0.95}}>Net Savings</span>
                    </div>
                    <div style={{fontSize: '42px', fontWeight: 'bold', marginBottom: '8px'}}>${(metrics.netSavings / 1000000).toFixed(1)}M</div>
                    <div style={{fontSize: '15px', opacity: 0.9}}>ROI: {metrics.roi}%<br/>${(metrics.totalSavings / 1000000).toFixed(1)}M savings - ${(metrics.totalCost / 1000000).toFixed(1)}M cost</div>
                  </div>
                </div>

                <div style={{background: 'white', padding: '28px', borderRadius: '12px', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                  <h3 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <BarChart3 size={24} color="#0066cc" />
                    Before & After Breakdown
                  </h3>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                    <div>
                      <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#dc2626'}}>❌ Before BetterUp</h4>
                      <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #fecaca'}}>
                        <div style={{fontSize: '15px', fontWeight: '600', marginBottom: '8px'}}>Annual Attrition</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#dc2626'}}>{metrics.annualAttrition}</div>
                        <div style={{fontSize: '14px', color: '#666'}}>separations per year</div>
                      </div>
                      <div style={{background: '#fef2f2', padding: '16px', borderRadius: '8px', border: '1px solid #fecaca'}}>
                        <div style={{fontSize: '15px', fontWeight: '600', marginBottom: '8px'}}>Workers' Comp Costs</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#dc2626'}}>${(metrics.workersCompBaseline / 1000000).toFixed(1)}M</div>
                        <div style={{fontSize: '14px', color: '#666'}}>{selectedOrganization.workersCompClaims.toLocaleString()} claims @ ${(selectedOrganization.avgClaimCost / 1000).toFixed(0)}K avg</div>
                      </div>
                    </div>
                    <div>
                      <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#16a34a'}}>✅ After BetterUp</h4>
                      <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #bbf7d0'}}>
                        <div style={{fontSize: '15px', fontWeight: '600', marginBottom: '8px'}}>Reduced Attrition</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#16a34a'}}>{metrics.annualAttrition - metrics.separationsPrevented}</div>
                        <div style={{fontSize: '14px', color: '#666'}}>saves ${(metrics.retentionSavings / 1000000).toFixed(1)}M ({((metrics.retentionSavings / (metrics.annualAttrition * selectedOrganization.replacementCost)) * 100).toFixed(0)}% reduction)</div>
                      </div>
                      <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0'}}>
                        <div style={{fontSize: '15px', fontWeight: '600', marginBottom: '8px'}}>Reduced WC Costs</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#16a34a'}}>${(metrics.workersCompAfter / 1000000).toFixed(1)}M</div>
                        <div style={{fontSize: '14px', color: '#666'}}>saves ${(metrics.workersCompSavings / 1000000).toFixed(1)}M ({workersCompImprovement}% reduction)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                  <button 
                    onClick={() => setShowPerfDrivers(!showPerfDrivers)} 
                    style={{
                      width: '100%', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      background: 'transparent', 
                      border: 'none', 
                      cursor: 'pointer', 
                      padding: '12px', 
                      marginBottom: showPerfDrivers ? '20px' : '0'
                    }}
                  >
                    <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <Target size={24} color="#0066cc" />
                      Performance Driver Controls
                    </h3>
                    {showPerfDrivers ? <ChevronUp size={24} color="#0066cc" /> : <ChevronDown size={24} color="#0066cc" />}
                  </button>
                  {showPerfDrivers && performanceDrivers.length > 0 && (
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px'}}>
                      {performanceDrivers.map(driver => (
                        <div key={driver.key} style={{background: '#f9fafb', padding: '20px', borderRadius: '8px', border: '2px solid #e5e7eb'}}>
                          <div style={{fontSize: '16px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px'}}>{driver.priority}</div>
                          <div style={{fontSize: '13px', color: '#666', marginBottom: '16px', lineHeight: '1.4'}}>{driver.drivers}</div>
                          <div style={{marginBottom: '12px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                              <span style={{fontSize: '14px', color: '#666'}}>Baseline: {driver.baseline}%</span>
                              <span style={{fontSize: '14px', fontWeight: 'bold', color: '#0066cc'}}>Growth: {driver.growth}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="30" 
                              value={driver.improvement} 
                              onChange={(e) => driver.setImprovement(Number(e.target.value))} 
                              style={{width: '100%', accentColor: '#0066cc'}} 
                            />
                            <div style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#0066cc', marginTop: '8px'}}>+{driver.improvement}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
        {activeTab === 'details' && (
          <div style={{background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1a1a1a'}}>Model Methodology</h2>
            
            <div style={{marginBottom: '32px'}}>
              <h3 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc'}}>Dual-Pathway Value Model</h3>
              <p style={{fontSize: '16px', lineHeight: '1.7', color: '#4b5563', marginBottom: '16px'}}>
                This model calculates ROI through two independent value streams that both reduce organizational costs: <strong>Retention Improvement</strong> (preventing costly separations) and <strong>Readiness Improvement</strong> (reducing workers' compensation claims).
              </p>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h3 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc'}}>Pathway 1: Retention Value</h3>
              <div style={{background: '#f0f9ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd', marginBottom: '16px'}}>
                <p style={{fontSize: '16px', lineHeight: '1.7', color: '#1e3a8a', marginBottom: '12px'}}>
                  <strong>Calculation:</strong> Annual Attrition × Retention Improvement % × Replacement Cost
                </p>
                <p style={{fontSize: '15px', lineHeight: '1.6', color: '#475569'}}>
                  <strong>Why This Matters:</strong> CBP faces a retention crisis, with Law Enforcement 6(c) coverage making officers eligible for retirement starting in 2028. Each separation costs $150,000 in recruiting, training, and productivity losses. Even small improvements in retention generate substantial savings.
                </p>
              </div>
              <div style={{background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a'}}>
                <p style={{fontSize: '15px', lineHeight: '1.6', color: '#78350f'}}>
                  <strong>Conservative Assumption:</strong> 7% retention improvement through Career Commitment (+4%) and Leadership Culture (+3%). This prevents approximately 10-12% of total attrition, which is highly defensible given BetterUp's proven track record in similar federal contexts.
                </p>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h3 style={{fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc'}}>Pathway 2: Workers' Compensation Value</h3>
              <div style={{background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0', marginBottom: '16px'}}>
                <p style={{fontSize: '16px', lineHeight: '1.7', color: '#166534', marginBottom: '12px'}}>
                  <strong>Calculation:</strong> Annual WC Claims Cost × Workers' Comp Improvement %
                </p>
                <p style={{fontSize: '15px', lineHeight: '1.6', color: '#475569'}}>
                  <strong>Why This Matters:</strong> CBP experiences ~8,900 workers' comp claims annually at $41,000 average cost ($365M total). Mental health claims represent ~35% of total FECA costs. Air Force data showed 63% reduction in mental health treatment costs with BetterUp.
                </p>
              </div>
              <div style={{background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a'}}>
                <p style={{fontSize: '15px', lineHeight: '1.6', color: '#78350f'}}>
                  <strong>Conservative Assumption:</strong> 22% reduction in total workers' comp costs. This assumes Air Force's 63% mental health improvement applies only to the 35% mental health component of claims (0.63 × 0.35 = 22%), providing a highly conservative estimate.
                </p>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <button 
                onClick={() => setExpandedSection(expandedSection === 'factor' ? null : 'factor')} 
                style={{
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: '#f9fafb', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '16px', 
                  cursor: 'pointer', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#1a1a1a'
                }}
              >
                Factor Breakdown Methodology
                {expandedSection === 'factor' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              {expandedSection === 'factor' && (
                <div style={{background: '#f9fafb', padding: '24px', borderRadius: '0 0 8px 8px', border: '2px solid #e5e7eb', borderTop: 'none'}}>
                  <h4 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc'}}>Workers' Compensation Factor Analysis</h4>
                  <p style={{fontSize: '15px', lineHeight: '1.7', color: '#4b5563', marginBottom: '20px'}}>
                    The 22% reduction figure is derived from applying Air Force proven results to CBP's mental health claim patterns:
                  </p>
                  
                  <div style={{display: 'grid', gap: '16px'}}>
                    <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                      <div style={{fontSize: '16px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px'}}>PTSD Claims (15% of total)</div>
                      <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Air Force showed 63% reduction in mental health treatment</div>
                      <div style={{fontSize: '15px', color: '#1a1a1a'}}>Impact: 0.15 × 0.63 = <strong>9.45% total cost reduction</strong></div>
                    </div>
                    
                    <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                      <div style={{fontSize: '16px', fontWeight: 'bold', color: '#ea580c', marginBottom: '8px'}}>Depression/Anxiety Claims (12% of total)</div>
                      <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>BetterUp's resilience & emotional regulation capabilities</div>
                      <div style={{fontSize: '15px', color: '#1a1a1a'}}>Impact: 0.12 × 0.63 = <strong>7.56% total cost reduction</strong></div>
                    </div>
                    
                    <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                      <div style={{fontSize: '16px', fontWeight: 'bold', color: '#d97706', marginBottom: '8px'}}>Substance Use Disorder Claims (8% of total)</div>
                      <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>Stress management & coping mechanism development</div>
                      <div style={{fontSize: '15px', color: '#1a1a1a'}}>Impact: 0.08 × 0.63 = <strong>5.04% total cost reduction</strong></div>
                    </div>
                    
                    <div style={{background: '#dcfce7', padding: '16px', borderRadius: '8px', border: '2px solid #16a34a'}}>
                      <div style={{fontSize: '17px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px'}}>Total Conservative Impact</div>
                      <div style={{fontSize: '15px', color: '#166534'}}>9.45% + 7.56% + 5.04% = <strong style={{fontSize: '20px'}}>22.05%</strong></div>
                      <div style={{fontSize: '14px', color: '#166534', marginTop: '8px', fontStyle: 'italic'}}>Rounded to 22% for conservative projection</div>
                    </div>
                  </div>
                  
                  <div style={{background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a', marginTop: '20px'}}>
                    <p style={{fontSize: '15px', lineHeight: '1.6', color: '#78350f'}}>
                      <strong>Why This Is Conservative:</strong> This model assumes BetterUp only affects mental health claims and has zero impact on physical injury claims (which comprise 65% of costs). In reality, improved resilience, leadership, and professional standards likely reduce physical injuries as well, but we exclude this for maximum defensibility.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{marginBottom: '32px'}}>
              <button 
                onClick={() => setExpandedSection(expandedSection === 'methodology' ? null : 'methodology')} 
                style={{
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  background: '#f9fafb', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px', 
                  padding: '16px', 
                  cursor: 'pointer', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#1a1a1a'
                }}
              >
                BetterUp Continuous Development Model
                {expandedSection === 'methodology' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              {expandedSection === 'methodology' && (
                <div style={{background: '#f9fafb', padding: '24px', borderRadius: '0 0 8px 8px', border: '2px solid #e5e7eb', borderTop: 'none'}}>
                  <h4 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0066cc'}}>Traditional Training vs. BetterUp Mastery</h4>
                  
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px'}}>
                    <div style={{background: '#fef2f2', padding: '20px', borderRadius: '8px', border: '1px solid #fecaca'}}>
                      <h5 style={{fontSize: '16px', fontWeight: 'bold', color: '#dc2626', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <TrendingDown size={20} />
                        Traditional Episodic Training
                      </h5>
                      <div style={{fontSize: '14px', color: '#666', lineHeight: '1.6'}}>
                        <p style={{marginBottom: '8px'}}>• One-time classroom instruction</p>
                        <p style={{marginBottom: '8px'}}>• Knowledge decay after 30 days</p>
                        <p style={{marginBottom: '8px'}}>• No ongoing reinforcement</p>
                        <p style={{marginBottom: '8px'}}>• Generic curriculum</p>
                        <p>• Limited behavior change</p>
                      </div>
                    </div>
                    
                    <div style={{background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0'}}>
                      <h5 style={{fontSize: '16px', fontWeight: 'bold', color: '#16a34a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <TrendingUp size={20} />
                        BetterUp Continuous Mastery
                      </h5>
                      <div style={{fontSize: '14px', color: '#666', lineHeight: '1.6'}}>
                        <p style={{marginBottom: '8px'}}>• Ongoing coaching relationship</p>
                        <p style={{marginBottom: '8px'}}>• Compounding skill development</p>
                        <p style={{marginBottom: '8px'}}>• 24/7 AI coach (Aura) support</p>
                        <p style={{marginBottom: '8px'}}>• Personalized to individual</p>
                        <p>• Measurable behavior change</p>
                      </div>
                    </div>
                  </div>

                  <div style={{background: '#eff6ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                    <h5 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '12px'}}>Air Force Weapons School Framework</h5>
                    <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: '1.6', marginBottom: '12px'}}>
                      BetterUp uses a proven 5-step mastery framework validated at USAF Weapons School (2021-2025):
                    </p>
                    <div style={{display: 'grid', gap: '10px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{background: '#0066cc', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0}}>1</div>
                        <div style={{fontSize: '14px', color: '#1e3a8a'}}><strong>Reflect:</strong> Self-awareness through assessments and coach dialogue</div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{background: '#0066cc', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0}}>2</div>
                        <div style={{fontSize: '14px', color: '#1e3a8a'}}><strong>Learn:</strong> Targeted content based on individual needs</div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{background: '#0066cc', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0}}>3</div>
                        <div style={{fontSize: '14px', color: '#1e3a8a'}}><strong>Practice:</strong> Real-world application with coach support</div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{background: '#0066cc', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0}}>4</div>
                        <div style={{fontSize: '14px', color: '#1e3a8a'}}><strong>Commit:</strong> Accountability through ongoing coaching sessions</div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{background: '#0066cc', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0}}>5</div>
                        <div style={{fontSize: '14px', color: '#1e3a8a'}}><strong>Measure:</strong> Analytics dashboard tracks progress over time</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{background: '#eff6ff', padding: '24px', borderRadius: '8px', border: '2px solid #3b82f6'}}>
              <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1e40af'}}>Key Assumptions & Data Sources</h3>
              <div style={{display: 'grid', gap: '12px'}}>
                <div style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                  • <strong>Replacement Cost ($150K):</strong> GAO standard for federal law enforcement
                </div>
                <div style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                  • <strong>Workers' Comp ($41K avg):</strong> DHS OIG Report 24-26 (FY2023 actuals)
                </div>
                <div style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                  • <strong>Mental Health Impact (63%):</strong> Air Force Weapons School study, 2021-2025
                </div>
                <div style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                  • <strong>Mental Health Share (35%):</strong> DOL FECA national mental health claim percentages
                </div>
                <div style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                  • <strong>Retention Impact (7%):</strong> Conservative estimate vs. commercial benchmarks showing 12-17%
                </div>
                <div style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                  • <strong>BetterUp volume pricing:</strong> Enterprise contract rates (Deal Desk for 1000+ seats)
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'drivers' && (
          <div style={{background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1a1a1a'}}>Performance Drivers Explained</h2>
            
            {selectedOrganization && performanceDrivers.length > 0 ? (
              <div style={{display: 'grid', gap: '24px'}}>
                {performanceDrivers.map(driver => (
                  <div key={driver.key} style={{background: '#f9fafb', padding: '24px', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px'}}>
                      <div>
                        <h3 style={{fontSize: '22px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px'}}>{driver.priority}</h3>
                        <p style={{fontSize: '16px', color: '#666', marginBottom: '12px'}}>{driver.drivers}</p>
                      </div>
                      <div style={{background: '#0066cc', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold'}}>
                        +{driver.improvement}%
                      </div>
                    </div>
                    
                    <div style={{background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                        <span style={{fontSize: '15px', color: '#666'}}>Baseline Score</span>
                        <span style={{fontSize: '18px', fontWeight: 'bold', color: '#dc2626'}}>{driver.baseline}%</span>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontSize: '15px', color: '#666'}}>Target with BetterUp</span>
                        <span style={{fontSize: '18px', fontWeight: 'bold', color: '#16a34a'}}>{driver.growth}%</span>
                      </div>
                    </div>

                    <div style={{marginBottom: '16px'}}>
                      <label style={{fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', display: 'block'}}>
                        Adjust Expected Improvement:
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="30" 
                        value={driver.improvement} 
                        onChange={(e) => driver.setImprovement(Number(e.target.value))} 
                        style={{width: '100%', height: '8px', accentColor: '#0066cc'}} 
                      />
                    </div>

                    {driver.key === 'mission' && (
                      <div style={{background: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                        <p style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                          <strong>Strategic Impact:</strong> Mission Readiness directly correlates with operational effectiveness. Air Force Weapons School showed 17% improvement in decision quality under pressure, which translates to enhanced crisis response and strategic execution across CBP operations.
                        </p>
                      </div>
                    )}

                    {driver.key === 'resilience' && (
                      <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0'}}>
                        <p style={{fontSize: '15px', lineHeight: '1.6', color: '#166534'}}>
                          <strong>Workers' Comp Connection:</strong> Resilience is the primary driver of mental health outcomes. Air Force data showed 63% reduction in mental health treatment costs. CBP officers face similar operational stressors (tactical operations, critical decisions, trauma exposure), making this benchmark highly applicable.
                        </p>
                      </div>
                    )}

                    {driver.key === 'standards' && (
                      <div style={{background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a'}}>
                        <p style={{fontSize: '15px', lineHeight: '1.6', color: '#78350f'}}>
                          <strong>Risk Mitigation:</strong> Professional Standards improvements reduce conduct violations, use-of-force incidents, and ethical lapses. These incidents create both direct costs (investigations, litigation) and indirect costs (reputation damage, decreased morale).
                        </p>
                      </div>
                    )}

                    {driver.key === 'commitment' && (
                      <div style={{background: '#fce7f3', padding: '16px', borderRadius: '8px', border: '1px solid #fbcfe8'}}>
                        <p style={{fontSize: '15px', lineHeight: '1.6', color: '#831843'}}>
                          <strong>Retention Driver:</strong> Career Commitment directly predicts voluntary separation intent. Even a 4% improvement in this metric prevents approximately 6-8% of total attrition, as employees with stronger organizational commitment are significantly less likely to resign.
                        </p>
                      </div>
                    )}

                    {driver.key === 'culture' && (
                      <div style={{background: '#f5f3ff', padding: '16px', borderRadius: '8px', border: '1px solid #e9d5ff'}}>
                        <p style={{fontSize: '15px', lineHeight: '1.6', color: '#6b21a8'}}>
                          <strong>Multiplier Effect:</strong> Leadership Culture creates cascading benefits. Effective supervisors improve team resilience, mission readiness, and retention simultaneously. This makes leadership development one of the highest-leverage interventions available.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '48px', background: '#f9fafb', borderRadius: '12px', border: '2px dashed #e5e7eb'}}>
                <Target size={48} color="#9ca3af" style={{margin: '0 auto 16px'}} />
                <p style={{fontSize: '18px', color: '#6b7280'}}>Select an organization to view performance drivers</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'summary' && (
          <div style={{background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
            <div style={{textAlign: 'center', marginBottom: '32px'}}>
              <Award size={64} color="#0066cc" style={{margin: '0 auto 16px'}} />
              <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '12px'}}>Executive Summary</h1>
              <p style={{fontSize: '18px', color: '#666', maxWidth: '800px', margin: '0 auto'}}>Strategic Value Proposition for CBP Leadership</p>
            </div>

            <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '32px', borderRadius: '12px', color: 'white', marginBottom: '32px', boxShadow: '0 8px 24px rgba(102,126,234,0.3)'}}>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                <CheckCircle size={32} />
                Air Force Proven Results (2021-2025)
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px'}}>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '8px'}}>63%</div>
                  <div style={{fontSize: '16px', opacity: 0.95}}>Reduction in mental health treatment costs</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '8px'}}>17%</div>
                  <div style={{fontSize: '16px', opacity: 0.95}}>Improvement in mission readiness</div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
                  <div style={{fontSize: '48px', fontWeight: 'bold', marginBottom: '8px'}}>4 years</div>
                  <div style={{fontSize: '16px', opacity: 0.95}}>Of continuous validation at Weapons School</div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowCommercial(!showCommercial)} 
                style={{
                  background: 'rgba(255,255,255,0.2)', 
                  border: '2px solid rgba(255,255,255,0.4)', 
                  color: 'white', 
                  padding: '12px 24px', 
                  borderRadius: '8px', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px'
                }} 
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} 
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >
                {showCommercial ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                + Show Commercial Results
              </button>
              
              {showCommercial && (
                <div style={{marginTop: '20px', background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)'}}>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
                    <div>
                      <div style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '4px'}}>12-17%</div>
                      <div style={{fontSize: '14px', opacity: 0.9}}>Retention improvement (Meta, Microsoft, Google)</div>
                    </div>
                    <div>
                      <div style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '4px'}}>24%</div>
                      <div style={{fontSize: '14px', opacity: 0.9}}>Increase in leadership effectiveness</div>
                    </div>
                    <div>
                      <div style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '4px'}}>35%</div>
                      <div style={{fontSize: '14px', opacity: 0.9}}>Improvement in stress management</div>
                    </div>
                    <div>
                      <div style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '4px'}}>600%</div>
                      <div style={{fontSize: '14px', opacity: 0.9}}>Average customer ROI</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>What This Tool Provides</h2>
              <div style={{display: 'grid', gap: '16px'}}>
                <div style={{background: '#f0f9ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>📊 Configurable ROI Projections</h3>
                  <p style={{fontSize: '15px', lineHeight: '1.6', color: '#475569'}}>
                    Model different scenarios across all CBP components and individual Border Patrol sectors. Adjust performance driver assumptions to match your confidence levels and strategic priorities.
                  </p>
                </div>
                <div style={{background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0'}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px'}}>💰 Dual-Value Calculation</h3>
                  <p style={{fontSize: '15px', lineHeight: '1.6', color: '#475569'}}>
                    Quantifies both retention savings (preventing costly separations) and workers' compensation reduction (decreasing FECA mental health claims), providing a complete financial picture.
                  </p>
                </div>
                <div style={{background: '#fef3c7', padding: '20px', borderRadius: '8px', border: '1px solid #fde68a'}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#a16207', marginBottom: '8px'}}>🎯 Evidence-Based Assumptions</h3>
                  <p style={{fontSize: '15px', lineHeight: '1.6', color: '#475569'}}>
                    All baseline figures sourced from official government reports (GAO, DHS OIG, DOL FECA). Conservative methodology ensures defensibility in budget discussions and appropriations processes.
                  </p>
                </div>
              </div>
            </div>

            <div style={{background: '#f9fafb', padding: '24px', borderRadius: '12px', border: '2px solid #e5e7eb', marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1a1a1a'}}>Traditional Training vs. BetterUp Platform</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                <div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#dc2626'}}>❌ Traditional Approach</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <div style={{fontSize: '15px', color: '#666'}}>• One-time classroom sessions</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• Generic curriculum not personalized</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• No ongoing support or accountability</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• Limited measurement of outcomes</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• High cost per seat ($3K-$8K)</div>
                  </div>
                </div>
                <div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#16a34a'}}>✅ BetterUp Model</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <div style={{fontSize: '15px', color: '#666'}}>• Continuous coaching relationship</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• AI-powered personalization at scale</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• 24/7 support through Aura AI Coach</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• Real-time performance analytics</div>
                    <div style={{fontSize: '15px', color: '#666'}}>• Scalable pricing ($1.2K-$15K based on intensity)</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>AI Development Partner, Not Just a Tool</h2>
              <div style={{background: 'linear-gradient(135deg, #fef3c7 0%, #fee2e2 100%)', padding: '24px', borderRadius: '12px', border: '2px solid #fbbf24'}}>
                <div style={{display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '16px'}}>
                  <Sparkles size={32} color="#d97706" style={{flexShrink: 0, marginTop: '4px'}} />
                  <div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px'}}>Aura: CBP's Pocket Executive Coach</h3>
                    <p style={{fontSize: '15px', lineHeight: '1.7', color: '#78350f'}}>
                      Unlike generic AI assistants, Aura functions as a personalized executive coach available 24/7. Officers can practice difficult conversations before approaching supervisors, get real-time guidance during stressful situations, and receive evidence-based strategies for resilience building. Think of it as having a trained psychologist and leadership coach in your pocket, built on BetterUp's proprietary behavioral science models.
                    </p>
                  </div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '8px'}}>
                  <p style={{fontSize: '14px', color: '#78350f', lineHeight: '1.6'}}>
                    <strong>Real CBP Use Case:</strong> A Border Patrol agent facing a high-stress decision can ask Aura "How do I handle this situation?" and receive immediate, context-aware guidance based on CBP values, de-escalation techniques, and stress management strategies—all while maintaining operational tempo.
                  </p>
                </div>
              </div>
            </div>
<div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>How the Model Works</h2>
              <div style={{background: '#f9fafb', padding: '24px', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <div style={{marginBottom: '24px'}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px'}}>Step 1: Baseline Assessment</h3>
                  <p style={{fontSize: '15px', lineHeight: '1.6', color: '#4b5563'}}>
                    We start with CBP's current state: workforce size, attrition rates, and workers' compensation costs. All baseline data comes from official government sources (GAO, DHS OIG, DOL FECA) to ensure accuracy and defensibility in budget discussions.
                  </p>
                </div>

                <div style={{marginBottom: '24px'}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px'}}>Step 2: Performance Driver Improvements</h3>
                  <p style={{fontSize: '15px', lineHeight: '1.6', color: '#4b5563', marginBottom: '12px'}}>
                    BetterUp's coaching and AI-powered development drives improvements across five key areas:
                  </p>
                  <div style={{display: 'grid', gap: '12px', marginLeft: '20px'}}>
                    <div style={{fontSize: '15px', color: '#4b5563'}}>
                      • <strong>Mission Readiness (+{missionReadinessImprovement}%):</strong> Enhanced decision-making under pressure
                    </div>
                    <div style={{fontSize: '15px', color: '#4b5563'}}>
                      • <strong>Resilience (+{resilienceImprovement}%):</strong> Better stress management and emotional regulation
                    </div>
                    <div style={{fontSize: '15px', color: '#4b5563'}}>
                      • <strong>Professional Standards (+{professionalStandardsImprovement}%):</strong> Improved conduct and ethical decision-making
                    </div>
                    <div style={{fontSize: '15px', color: '#4b5563'}}>
                      • <strong>Career Commitment (+{careerCommitmentImprovement}%):</strong> Stronger organizational pride and retention intent
                    </div>
                    <div style={{fontSize: '15px', color: '#4b5563'}}>
                      • <strong>Leadership Culture (+{leadershipCultureImprovement}%):</strong> More effective supervisors and command climate
                    </div>
                  </div>
                </div>

                <div style={{marginBottom: '24px'}}>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px'}}>Step 3: Dual-Pathway Value Calculation</h3>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                    <div style={{background: '#f0f9ff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Retention Pathway</h4>
                      <p style={{fontSize: '14px', color: '#475569', lineHeight: '1.5'}}>
                        Career Commitment and Leadership Culture improvements reduce voluntary separations. Each prevented separation saves $150K in replacement costs.
                      </p>
                    </div>
                    <div style={{background: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px'}}>Readiness Pathway</h4>
                      <p style={{fontSize: '14px', color: '#475569', lineHeight: '1.5'}}>
                        Resilience, Mission Readiness, and Professional Standards reduce mental health claims. Air Force showed 63% reduction in treatment costs.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px'}}>Step 4: ROI Calculation</h3>
                  <div style={{background: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                    <p style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a', marginBottom: '8px'}}>
                      <strong>Total Savings</strong> = Retention Savings + Workers' Comp Reduction
                    </p>
                    <p style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a', marginBottom: '8px'}}>
                      <strong>Net Savings</strong> = Total Savings - BetterUp Program Cost
                    </p>
                    <p style={{fontSize: '15px', lineHeight: '1.6', color: '#1e3a8a'}}>
                      <strong>ROI</strong> = (Net Savings / Program Cost) × 100
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>How Performance Drivers Work</h2>
              <div style={{background: '#f9fafb', padding: '24px', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <p style={{fontSize: '15px', lineHeight: '1.7', color: '#4b5563', marginBottom: '20px'}}>
                  Performance drivers are the measurable behavioral and psychological capabilities that BetterUp develops through coaching. Each driver is assessed at baseline and tracked over time through BetterUp's analytics platform.
                </p>

                <div style={{display: 'grid', gap: '16px'}}>
                  <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px'}}>Assessment → Coaching → Growth</h4>
                    <p style={{fontSize: '14px', color: '#4b5563', lineHeight: '1.6'}}>
                      Each member takes validated assessments measuring their current state across all drivers. Their coach creates a personalized development plan targeting specific growth areas. Progress is measured quarterly through follow-up assessments.
                    </p>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px'}}>Why These Specific Drivers?</h4>
                    <p style={{fontSize: '14px', color: '#4b5563', lineHeight: '1.6'}}>
                      These five drivers were selected based on CBP's specific challenges identified in Federal Employee Viewpoint Survey data, GAO reports, and DHS OIG audits. They map directly to CBP's stated priorities around retention, readiness, and resilience.
                    </p>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px'}}>Compound Effects Over Time</h4>
                    <p style={{fontSize: '14px', color: '#4b5563', lineHeight: '1.6'}}>
                      Unlike one-time training, BetterUp's continuous coaching model creates compounding benefits. A 15% resilience improvement in Year 1 builds the foundation for further growth in Year 2. This is why Air Force Weapons School saw sustained improvements over 4 years.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>What You Can Do With This Tool</h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px'}}>
                <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', borderRadius: '12px', color: 'white'}}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>📊</div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>Model Different Scenarios</h3>
                  <p style={{fontSize: '14px', opacity: 0.95, lineHeight: '1.6'}}>
                    Adjust the performance driver sliders to model conservative, moderate, or aggressive improvement scenarios. See how different assumptions affect ROI.
                  </p>
                </div>

                <div style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '20px', borderRadius: '12px', color: 'white'}}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>🎯</div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>Compare Components</h3>
                  <p style={{fontSize: '14px', opacity: 0.95, lineHeight: '1.6'}}>
                    Switch between OFO, USBP, AMO, and individual Border Patrol sectors to see how ROI varies based on workforce size and attrition patterns.
                  </p>
                </div>

                <div style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '20px', borderRadius: '12px', color: 'white'}}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>💼</div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>Build Business Case</h3>
                  <p style={{fontSize: '14px', opacity: 0.95, lineHeight: '1.6'}}>
                    Use the Before & After breakdown to show leadership the specific cost reductions. The conservative assumptions make this defensible in budget discussions.
                  </p>
                </div>

                <div style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', padding: '20px', borderRadius: '12px', color: 'white'}}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>🔍</div>
                  <h3 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>Understand Methodology</h3>
                  <p style={{fontSize: '14px', opacity: 0.95, lineHeight: '1.6'}}>
                    Click through Model Details to see all assumptions, data sources, and calculation methods. Ask the Model Assistant for clarifications.
                  </p>
                </div>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>Understanding Projections & Risk Factors</h2>
              <div style={{background: '#fef3c7', padding: '24px', borderRadius: '12px', border: '2px solid #fbbf24'}}>
                <div style={{display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '16px'}}>
                  <AlertCircle size={24} color="#d97706" style={{flexShrink: 0, marginTop: '2px'}} />
                  <div>
                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px'}}>These Are Projections, Not Guarantees</h3>
                    <p style={{fontSize: '15px', lineHeight: '1.7', color: '#78350f'}}>
                      This calculator models expected outcomes based on proven Air Force results and conservative assumptions. Actual results will vary based on implementation quality, engagement rates, and organizational factors specific to each CBP component.
                    </p>
                  </div>
                </div>

                <div style={{marginTop: '20px'}}>
                  <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px'}}>Key Risk Factors to Consider:</h4>
                  <div style={{display: 'grid', gap: '12px'}}>
                    <div style={{background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '6px'}}>
                      <p style={{fontSize: '14px', color: '#78350f', lineHeight: '1.6'}}>
                        <strong>Engagement Rate:</strong> Model assumes 70-80% active engagement. Lower engagement reduces impact proportionally.
                      </p>
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '6px'}}>
                      <p style={{fontSize: '14px', color: '#78350f', lineHeight: '1.6'}}>
                        <strong>Implementation Timeline:</strong> Full benefits typically realized in 12-18 months. Year 1 shows 40-60% of projected impact.
                      </p>
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '6px'}}>
                      <p style={{fontSize: '14px', color: '#78350f', lineHeight: '1.6'}}>
                        <strong>External Factors:</strong> Policy changes, budget cuts, or mission shifts can affect outcomes independent of BetterUp.
                      </p>
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '6px'}}>
                      <p style={{fontSize: '14px', color: '#78350f', lineHeight: '1.6'}}>
                        <strong>Measurement Lag:</strong> Workers' comp savings may take 6-12 months to appear in claims data due to processing delays.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{marginTop: '20px', background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '8px'}}>
                  <p style={{fontSize: '14px', color: '#78350f', lineHeight: '1.6'}}>
                    <strong>Why Conservative Assumptions Matter:</strong> By using 7% retention (vs commercial 12-17%) and 22% workers' comp reduction (vs potential 35%+), this model builds in significant safety margins. Even if actual results are 30-40% below projections, ROI remains strongly positive.
                  </p>
                </div>
              </div>
            </div>
<div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>The 2028 OFO Retirement Crisis</h2>
              <div style={{background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', padding: '24px', borderRadius: '12px', border: '2px solid #dc2626'}}>
                <div style={{display: 'flex', alignItems: 'start', gap: '16px', marginBottom: '20px'}}>
                  <Clock size={32} color="#dc2626" style={{flexShrink: 0, marginTop: '4px'}} />
                  <div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#7f1d1d', marginBottom: '12px'}}>Why 2028 Is a Critical Inflection Point</h3>
                    <p style={{fontSize: '15px', lineHeight: '1.7', color: '#991b1b'}}>
                      Officers hired during CBP's massive expansion (2003-2008) have Law Enforcement 6(c) retirement coverage, making them eligible for full retirement benefits at 25 years of service. This creates an unprecedented wave of retirement-eligible officers starting in 2028—potentially losing 40-50% of OFO's institutional knowledge within a 3-year window.
                    </p>
                  </div>
                </div>

                <div style={{background: 'rgba(255,255,255,0.6)', padding: '20px', borderRadius: '8px', marginBottom: '16px'}}>
                  <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#7f1d1d', marginBottom: '12px'}}>The Math That Doesn't Work:</h4>
                  <div style={{display: 'grid', gap: '12px'}}>
                    <div style={{fontSize: '14px', color: '#991b1b', lineHeight: '1.6'}}>
                      • <strong>~17,500 OFO officers become retirement-eligible</strong> between 2028-2030
                    </div>
                    <div style={{fontSize: '14px', color: '#991b1b', lineHeight: '1.6'}}>
                      • <strong>Academy capacity: 1,200 graduates/year</strong> (assuming perfect conditions)
                    </div>
                    <div style={{fontSize: '14px', color: '#991b1b', lineHeight: '1.6'}}>
                      • <strong>18-month training pipeline</strong> from hiring to operational
                    </div>
                    <div style={{fontSize: '14px', color: '#991b1b', lineHeight: '1.6'}}>
                      • <strong>Even 30% retirement rate = 5,250 separations</strong> in 3 years
                    </div>
                    <div style={{fontSize: '14px', color: '#991b1b', lineHeight: '1.6'}}>
                      • <strong>Hiring alone cannot solve this</strong> — retention is the only lever
                    </div>
                  </div>
                </div>

                <div style={{background: 'rgba(255,255,255,0.8)', padding: '16px', borderRadius: '8px'}}>
                  <p style={{fontSize: '14px', color: '#7f1d1d', lineHeight: '1.6', marginBottom: '8px'}}>
                    <strong>BetterUp's Value Proposition:</strong> Even delaying 200-300 retirements by 12-18 months provides critical breathing room for knowledge transfer, succession planning, and backfill hiring. The ROI calculator shows how Career Commitment and Leadership Culture improvements directly impact retirement intent.
                  </p>
                  <p style={{fontSize: '14px', color: '#7f1d1d', lineHeight: '1.6'}}>
                    <strong>Strategic Timing:</strong> BetterUp takes 12-18 months to show full impact. Starting in 2025 means benefits arrive exactly when the crisis hits in 2028.
                  </p>
                </div>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>Implementation Roadmap</h2>
              <div style={{background: '#f9fafb', padding: '24px', borderRadius: '12px', border: '2px solid #e5e7eb'}}>
                <p style={{fontSize: '15px', lineHeight: '1.7', color: '#4b5563', marginBottom: '24px'}}>
                  BetterUp follows a proven 3-phase implementation model that ensures rapid value delivery while building toward enterprise-wide transformation.
                </p>

                <div style={{marginBottom: '24px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{background: '#0066cc', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', flexShrink: 0}}>1</div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#0066cc'}}>Phase 1: Pilot (Months 1-6)</h3>
                  </div>
                  <div style={{background: '#f0f9ff', padding: '20px', borderRadius: '8px', border: '1px solid #bae6fd', marginLeft: '52px'}}>
                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Target Population:</h4>
                      <p style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        200-300 seats focused on high-risk/high-value groups: officers nearing retirement eligibility, sector chiefs, supervisory personnel with documented leadership challenges, international operations (remote/isolated duty).
                      </p>
                    </div>
                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Success Metrics:</h4>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        • 75%+ engagement rate (coaching sessions completed)<br/>
                        • 10+ point improvement in Whole Person Model scores<br/>
                        • Qualitative feedback from participants and supervisors<br/>
                        • Early indicators of retention intent improvement
                      </div>
                    </div>
                    <div>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Key Activities:</h4>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        • Coach matching and onboarding<br/>
                        • Baseline assessments across all performance drivers<br/>
                        • Monthly analytics reviews with CBP leadership<br/>
                        • Rapid iteration based on user feedback
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{marginBottom: '24px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{background: '#16a34a', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', flexShrink: 0}}>2</div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#16a34a'}}>Phase 2: Expansion (Months 7-18)</h3>
                  </div>
                  <div style={{background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0', marginLeft: '52px'}}>
                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px'}}>Target Population:</h4>
                      <p style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        1,000-1,500 seats expanding to entire leadership pipeline (GS-13+), Border Patrol Academy instructors, high-FECA-claim locations, and voluntary enrollment for line personnel showing early interest.
                      </p>
                    </div>
                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px'}}>Success Metrics:</h4>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        • Measurable reduction in voluntary separation rates<br/>
                        • 15-20% reduction in mental health FECA claims (lagging indicator)<br/>
                        • FEVS score improvements in leadership and engagement categories<br/>
                        • Documented ROI reaching 300-400% threshold
                      </div>
                    </div>
                    <div>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#15803d', marginBottom: '8px'}}>Key Activities:</h4>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        • Component-specific customization (OFO vs USBP contexts)<br/>
                        • Integration with existing Resiliency Program infrastructure<br/>
                        • Quarterly business reviews with DHS leadership<br/>
                        • Build internal champion network for peer advocacy
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                    <div style={{background: '#9333ea', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', flexShrink: 0}}>3</div>
                    <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#9333ea'}}>Phase 3: Enterprise Scale (Months 19+)</h3>
                  </div>
                  <div style={{background: '#faf5ff', padding: '20px', borderRadius: '8px', border: '1px solid #e9d5ff', marginLeft: '52px'}}>
                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#7e22ce', marginBottom: '8px'}}>Target Population:</h4>
                      <p style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        4,000+ seats offering voluntary enrollment to all CBP personnel with prioritized access based on risk factors (retirement eligibility, high-stress assignments, supervisory roles, FECA claim history).
                      </p>
                    </div>
                    <div style={{marginBottom: '16px'}}>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#7e22ce', marginBottom: '8px'}}>Success Metrics:</h4>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        • 2-3 percentage point reduction in organization-wide attrition<br/>
                        • 20-25% reduction in total workers' comp costs<br/>
                        • Sustained improvements in FEVS scores year-over-year<br/>
                        • ROI exceeding 500% threshold with full program maturity
                      </div>
                    </div>
                    <div>
                      <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#7e22ce', marginBottom: '8px'}}>Key Activities:</h4>
                      <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                        • Integration with CBP talent management systems<br/>
                        • Expansion to contractor workforce and mission partners<br/>
                        • Aura AI customization for CBP-specific use cases<br/>
                        • Establishment as permanent organizational capability
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{marginBottom: '32px'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a'}}>How CBP Will Measure Success</h2>
              <div style={{background: '#eff6ff', padding: '24px', borderRadius: '12px', border: '2px solid #3b82f6'}}>
                <p style={{fontSize: '15px', lineHeight: '1.7', color: '#1e3a8a', marginBottom: '20px'}}>
                  BetterUp provides a real-time analytics dashboard showing organizational health across all performance drivers. CBP leadership can track progress at component, sector, and individual levels.
                </p>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}>
                  <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Leading Indicators (Months 1-6)</h4>
                    <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                      • Engagement rates<br/>
                      • Assessment score improvements<br/>
                      • Coaching session completion<br/>
                      • User satisfaction scores
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Mid-Term Indicators (Months 6-12)</h4>
                    <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                      • Retention intent surveys<br/>
                      • FEVS score trends<br/>
                      • Conduct incident rates<br/>
                      • Leadership effectiveness ratings
                    </div>
                  </div>

                  <div style={{background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd'}}>
                    <h4 style={{fontSize: '16px', fontWeight: 'bold', color: '#0369a1', marginBottom: '8px'}}>Lagging Indicators (Months 12-24)</h4>
                    <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.6'}}>
                      • Actual separation rates<br/>
                      • Workers' comp claim frequency<br/>
                      • Claim cost reductions<br/>
                      • Calculated ROI vs projections
                    </div>
                  </div>
                </div>

                <div style={{background: 'rgba(59,130,246,0.1)', padding: '16px', borderRadius: '8px', marginTop: '20px'}}>
                  <p style={{fontSize: '14px', color: '#1e3a8a', lineHeight: '1.6'}}>
                    <strong>Transparency Commitment:</strong> BetterUp provides quarterly business reviews showing actual performance against projected outcomes. If results significantly underperform projections, contract includes provisions for scope adjustments or additional support at no extra cost.
                  </p>
                </div>
              </div>
            </div>

            <div style={{background: '#eff6ff', padding: '24px', borderRadius: '12px', border: '2px solid #3b82f6', textAlign: 'center'}}>
              <h2 style={{fontSize: '22px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px'}}>Ready to Explore Your Organization's ROI?</h2>
              <p style={{fontSize: '16px', color: '#1e3a8a', marginBottom: '20px'}}>
                Switch to the Dashboard tab to select your component and see customized projections
              </p>
              <button 
                onClick={() => setActiveTab('dashboard')} 
                style={{
                  background: '#0066cc', 
                  color: 'white', 
                  padding: '14px 32px', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  boxShadow: '0 4px 12px rgba(0,102,204,0.3)'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#0052a3'}
                onMouseOut={(e) => e.currentTarget.style.background = '#0066cc'}
              >
                Go to Dashboard →
              </button>
            </div>
          </div>
        )}
        {!showAssistant && (
          <button 
            onClick={() => setShowAssistant(true)} 
            style={{
              position: 'fixed', 
              bottom: '24px', 
              right: '24px', 
              width: '64px', 
              height: '64px', 
              background: '#0066cc', 
              color: 'white', 
              borderRadius: '50%', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,102,204,0.4)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              zIndex: 1000
            }}
          >
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
              <button 
                onClick={() => setShowAssistant(false)} 
                style={{background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '4px'}} 
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} 
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{padding: '16px', height: '384px', overflowY: 'auto', background: '#f9fafb'}}>
              {chatMessages.length === 0 ? (
                <div style={{textAlign: 'center', paddingTop: '32px'}}>
                  <p style={{fontWeight: '500', color: '#6b7280', marginBottom: '16px'}}>Ask anything about the model!</p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    {["How is the net savings calculated?", "Why is OFO facing a retirement crisis in 2028?", "Explain the dual-pathway model", "What are workers' comp claims?", "How do Performance Drivers affect ROI?"].map((q, i) => (
                      <button 
                        key={i} 
                        onClick={() => setChatInput(q)} 
                        style={{width: '100%', textAlign: 'left', padding: '12px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer'}} 
                        onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'} 
                        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                      >
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
              <button 
                onClick={handleSendMessage} 
                style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CBPDashboard;