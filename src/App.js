import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, Users, DollarSign, AlertCircle, Shield, Heart, Brain, MessageSquare, ChevronDown, ChevronUp, Info, Settings } from 'lucide-react';

const organizationData = {
  ofo: {
    id: 'ofo',
    name: 'Office of Field Operations',
    shortName: 'OFO',
    description: 'Manages 328 U.S. ports of entry - airports, seaports, land crossings',
    personnel: 26000,
    attritionRate: 3.5,
    replacementCost: 87300,
    fecaAnnual: 42000000,
    regions: [
      { id: 'ofo_all', name: 'All OFO Combined', personnel: 26000 },
      { id: 'ofo_southwest', name: 'Southwest Border Ports', personnel: 8500, description: 'San Ysidro, Otay Mesa, Calexico, Nogales' },
      { id: 'ofo_northern', name: 'Northern Border Ports', personnel: 4200, description: 'Detroit, Buffalo, Blaine, Portal' },
      { id: 'ofo_coastal', name: 'Coastal Seaports', personnel: 6800, description: 'LA/Long Beach, NY/NJ, Miami, Houston' },
      { id: 'ofo_airports', name: 'Major Airports', personnel: 6500, description: 'JFK, LAX, ORD, ATL, DFW' },
    ],
  },
  usbp: {
    id: 'usbp',
    name: 'U.S. Border Patrol',
    shortName: 'USBP',
    description: 'Patrols land borders between ports of entry - 20 sectors nationwide',
    personnel: 20000,
    attritionRate: 5.5,
    replacementCost: 107700,
    fecaAnnual: 50000000,
    regions: [
      { id: 'usbp_all', name: 'All Border Patrol Combined', personnel: 20000 },
      { id: 'san_diego', name: 'San Diego Sector', personnel: 2400, description: 'California - Pacific Coast to Imperial County' },
      { id: 'el_centro', name: 'El Centro Sector', personnel: 900, description: 'California - Imperial & Riverside Counties' },
      { id: 'yuma', name: 'Yuma Sector', personnel: 1100, description: 'Arizona - Yuma County & Colorado River' },
      { id: 'tucson', name: 'Tucson Sector', personnel: 3800, description: 'Arizona - Largest sector, highest activity' },
      { id: 'el_paso', name: 'El Paso Sector', personnel: 2200, description: 'New Mexico & West Texas' },
      { id: 'big_bend', name: 'Big Bend Sector', personnel: 600, description: 'Texas - Remote Big Bend region' },
      { id: 'del_rio', name: 'Del Rio Sector', personnel: 2100, description: 'Texas - Eagle Pass, Del Rio' },
      { id: 'laredo', name: 'Laredo Sector', personnel: 1800, description: 'Texas - Laredo, Zapata County' },
      { id: 'rio_grande', name: 'Rio Grande Valley Sector', personnel: 3500, description: 'Texas - Highest apprehension volume' },
      { id: 'swanton', name: 'Swanton Sector', personnel: 350, description: 'Vermont, New Hampshire, New York' },
      { id: 'grand_forks', name: 'Grand Forks Sector', personnel: 220, description: 'North Dakota - Northern border' },
    ],
  },
  amo: {
    id: 'amo',
    name: 'Air and Marine Operations',
    shortName: 'AMO',
    description: 'Aerial and maritime support - surveillance, interdiction',
    personnel: 1500,
    attritionRate: 10.0,
    replacementCost: 120000,
    fecaAnnual: 8000000,
    regions: [
      { id: 'amo_all', name: 'All AMO Combined', personnel: 1500 },
      { id: 'amo_southwest', name: 'Southwest Air Operations', personnel: 600, description: 'Arizona, New Mexico, Texas' },
      { id: 'amo_coastal', name: 'Coastal Marine Operations', personnel: 500, description: 'FL, CA, PR, VI' },
      { id: 'amo_northern', name: 'Northern Border Air', personnel: 400, description: 'Great Lakes, Northern tier' },
    ],
  },
  all: {
    id: 'all',
    name: 'All CBP Combined',
    shortName: 'CBP',
    description: 'Entire U.S. Customs and Border Protection workforce',
    personnel: 60000,
    attritionRate: 5.5,
    replacementCost: 97500,
    fecaAnnual: 105000000,
    regions: [{ id: 'all_cbp', name: 'All CBP Combined', personnel: 60000 }],
  },
};

const LandingPage = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(null);
  const organizations = Object.values(organizationData).filter(org => org.id !== 'all');
  const allCBP = organizationData.all;
  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedOrg) {
    const org = organizationData[selectedOrg];
    const filteredRegions = org.regions.filter(region =>
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (region.description && region.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="min-h-screen p-8" style={{ background: 'linear-gradient(to bottom right, #00416A, #003865)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 mr-3" style={{ color: '#95D9FF' }} />
              <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>CBP ROI Calculator</h1>
            </div>
            <p className="text-lg" style={{ color: '#95D9FF' }}>Select {org.name} Region/Sector</p>
          </div>
          <button onClick={() => { setSelectedOrg(null); setSearchTerm(''); }} className="mb-6 px-4 py-2 rounded-lg transition-all" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF' }}>
            ← Back to Organizations
          </button>
          <input type="text" placeholder="Search sectors/regions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 rounded-lg mb-6 border focus:outline-none" style={{ background: 'rgba(255, 255, 255, 0.25)', borderColor: 'rgba(149, 217, 255, 0.5)', color: '#FFFFFF' }} />
          <div className="grid md:grid-cols-2 gap-4">
            {filteredRegions.map(region => (
              <button key={region.id} onClick={() => onSelect({ ...region, orgData: org, attritionRate: org.attritionRate, replacementCost: org.replacementCost, fecaAnnual: org.fecaAnnual * (region.personnel / org.personnel) })} className="p-6 rounded-xl text-left transition-all transform hover:scale-105 border shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(149, 217, 255, 0.5)' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>{region.name}</h3>
                {region.description && <p className="text-sm mb-3" style={{ color: '#95D9FF' }}>{region.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: '#95D9FF' }}>{region.personnel.toLocaleString()}</span>
                  <span className="text-sm" style={{ color: '#D9D9D6' }}>personnel</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(to bottom right, #00416A, #003865)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 mr-4" style={{ color: '#95D9FF' }} />
            <h1 className="text-5xl font-bold" style={{ color: '#FFFFFF' }}>CBP ROI Calculator</h1>
          </div>
          <p className="text-xl mb-4" style={{ color: '#95D9FF' }}>Financial Impact of Retention & Wellness Investment</p>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#D9D9D6' }}>Model BetterUp's dual-pathway impact across U.S. Customs and Border Protection</p>
        </div>
        <div className="rounded-xl p-8 mb-8 shadow-xl" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#FFFFFF' }}>
            <Users className="mr-3" style={{ color: '#95D9FF' }} /> Select Your Organization
          </h2>
          <input type="text" placeholder="Search organizations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-4 rounded-lg mb-6 border focus:outline-none" style={{ background: 'rgba(255, 255, 255, 0.25)', borderColor: 'rgba(149, 217, 255, 0.5)', color: '#FFFFFF' }} />
          <button onClick={() => onSelect({ id: allCBP.id, name: allCBP.name, personnel: allCBP.personnel, description: allCBP.description, attritionRate: allCBP.attritionRate, replacementCost: allCBP.replacementCost, fecaAnnual: allCBP.fecaAnnual, orgData: allCBP })} className="w-full p-6 rounded-xl text-left transition-all transform hover:scale-105 border-2 mb-6 shadow-lg" style={{ background: '#1460AA', borderColor: '#95D9FF' }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>{allCBP.name}</h3>
            <p className="mb-3" style={{ color: '#95D9FF' }}>{allCBP.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>{allCBP.personnel.toLocaleString()}</span>
              <span className="text-lg" style={{ color: '#95D9FF' }}>total personnel</span>
            </div>
          </button>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredOrgs.map(org => (
              <button key={org.id} onClick={() => setSelectedOrg(org.id)} className="p-6 rounded-xl text-left transition-all transform hover:scale-105 border shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(149, 217, 255, 0.5)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>{org.name}</h3>
                  <span className="text-xs px-2 py-1 rounded" style={{ background: '#1460AA', color: '#FFFFFF' }}>{org.shortName}</span>
                </div>
                <p className="text-sm mb-3" style={{ color: '#95D9FF' }}>{org.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: '#95D9FF' }}>{org.personnel.toLocaleString()}</span>
                  <span className="text-sm" style={{ color: '#D9D9D6' }}>personnel →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl border shadow-lg" style={{ background: 'rgba(160, 0, 0, 0.3)', borderColor: 'rgba(250, 178, 170, 0.5)' }}>
            <AlertCircle className="w-12 h-12 mx-auto mb-3" style={{ color: '#FAB2AA' }} />
            <div className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>2028 Crisis</div>
            <p className="text-sm" style={{ color: '#FAB2AA' }}>400% retirement surge threatens capacity</p>
          </div>
          <div className="p-6 rounded-xl border shadow-lg" style={{ background: 'rgba(20, 96, 170, 0.3)', borderColor: 'rgba(149, 217, 255, 0.5)' }}>
            <TrendingUp className="w-12 h-12 mx-auto mb-3" style={{ color: '#95D9FF' }} />
            <div className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>$198M Annual</div>
            <p className="text-sm" style={{ color: '#95D9FF' }}>Current replacement costs</p>
          </div>
          <div className="p-6 rounded-xl border shadow-lg" style={{ background: 'rgba(103, 30, 117, 0.3)', borderColor: 'rgba(201, 177, 208, 0.5)' }}>
            <Heart className="w-12 h-12 mx-auto mb-3" style={{ color: '#C9B1D0' }} />
            <div className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>28% Higher</div>
            <p className="text-sm" style={{ color: '#C9B1D0' }}>CBP suicide rate vs other LE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FactorBreakdownItem = ({ title, isExpanded, onToggle, rolePrevalence, weightedAvg, coachingEffectiveness, pathways }) => {
  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#D9D9D6' }}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between transition-all" style={{ background: isExpanded ? '#EDF3F9' : '#F6F6F6' }}>
        <div className="flex items-center">
          {isExpanded ? <ChevronDown className="w-5 h-5 mr-2" style={{ color: '#1460AA' }} /> : <ChevronUp className="w-5 h-5 mr-2" style={{ color: '#808080' }} />}
          <h3 className="text-lg font-bold" style={{ color: '#333333' }}>{title}</h3>
        </div>
        <div className="text-right">
          <div className="text-sm" style={{ color: '#555555' }}>Coaching Effectiveness</div>
          <div className="text-xl font-bold" style={{ color: '#1460AA' }}>{coachingEffectiveness}</div>
        </div>
      </button>
      {isExpanded && (
        <div className="p-6 bg-white space-y-4">
          <div className="p-4 rounded-lg" style={{ background: '#EDF3F9' }}>
            <h4 className="font-semibold mb-3" style={{ color: '#333333' }}>Role-Specific Prevalence</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(rolePrevalence).map(([role, rate]) => (
                <div key={role} className="flex justify-between text-sm">
                  <span style={{ color: '#333333' }}>{role}:</span>
                  <span className="font-bold" style={{ color: '#1460AA' }}>{rate}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t flex justify-between font-semibold" style={{ borderColor: '#95D9FF' }}>
              <span style={{ color: '#333333' }}>Weighted Avg:</span>
              <span style={{ color: '#1460AA' }}>{weightedAvg}</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3" style={{ color: '#333333' }}>Pathways</h4>
            <div className="space-y-3">
              {pathways.map((pathway, idx) => (
                <div key={idx} className="p-4 rounded-lg" style={{ background: '#ECF1F4' }}>
                  <div className="font-semibold mb-1" style={{ color: '#333333' }}>{pathway.name}</div>
                  {pathway.cost && <div className="text-sm" style={{ color: '#555555' }}>Cost: <span className="font-bold" style={{ color: '#1460AA' }}>${typeof pathway.cost === 'number' ? pathway.cost.toLocaleString() : pathway.cost}</span></div>}
                  {pathway.prevented && <div className="text-sm" style={{ color: '#555555' }}>Prevented: <span className="font-bold" style={{ color: '#008000' }}>{pathway.prevented}</span></div>}
                  {pathway.days && <div className="text-sm" style={{ color: '#555555' }}>Days: {pathway.days} {pathway.value && <span>({pathway.value})</span>}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CBPROICalculator = ({ workforce }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seats, setSeats] = useState(Math.round(workforce.personnel * 0.15));
  const [engagementRate, setEngagementRate] = useState(75);
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
    recruitmentCostPerHire: 5000,
  });

  const [drivers, setDrivers] = useState({
    emotionalRegulation: 70, resilience: 70, decisionMaking: 65, communication: 60,
    purposeMeaning: 65, workLifeIntegration: 55, stressManagement: 60, leadershipEffectiveness: 60,
  });

  const calculateEffectiveness = () => {
    const avgDriver = Object.values(drivers).reduce((a, b) => a + b, 0) / Object.keys(drivers).length;
    return Math.round(avgDriver);
  };

  const effectiveness = calculateEffectiveness();

  const applyScenario = (type) => {
    setScenarioType(type);
    if (type === 'conservative') {
      setDrivers({ emotionalRegulation: 60, resilience: 60, decisionMaking: 55, communication: 55, purposeMeaning: 60, workLifeIntegration: 50, stressManagement: 55, leadershipEffectiveness: 55 });
    } else if (type === 'moderate') {
      setDrivers({ emotionalRegulation: 70, resilience: 70, decisionMaking: 65, communication: 65, purposeMeaning: 70, workLifeIntegration: 60, stressManagement: 65, leadershipEffectiveness: 65 });
    } else if (type === 'aggressive') {
      setDrivers({ emotionalRegulation: 80, resilience: 80, decisionMaking: 75, communication: 75, purposeMeaning: 80, workLifeIntegration: 70, stressManagement: 75, leadershipEffectiveness: 75 });
    }
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
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(to bottom right, #ECF1F4, #FFFFFF)' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ background: '#00416A' }} className="text-white rounded-xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-10 h-10 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">{workforce.name}</h1>
                <p className="text-sm" style={{ color: '#95D9FF' }}>{workforce.orgData?.name || 'CBP'} • {workforce.personnel.toLocaleString()} Personnel</p>
              </div>
            </div>
            <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg transition-all text-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>Change Selection</button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('dashboard')} style={{ background: activeTab === 'dashboard' ? '#F09511' : '#FFFFFF', color: '#333333', border: '2px solid #F09511' }} className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all shadow-md">Dashboard</button>
          <button onClick={() => setActiveTab('details')} style={{ background: activeTab === 'details' ? '#F09511' : '#FFFFFF', color: '#333333', border: '2px solid #808080' }} className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all shadow-md">Model Details</button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div style={{ background: '#333333', borderLeftColor: '#1460AA' }} className="text-white rounded-xl p-8 shadow-xl border-l-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: '#F09511' }}>BetterUp Seats: {seats.toLocaleString()}</h2>
                  <button onClick={() => document.getElementById('config-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ color: '#F09511' }} className="hover:opacity-80 underline text-sm">Edit</button>
                  <div className="mt-4 space-y-2">
                    <p className="text-white">Total {workforce.name} Population: <span className="font-bold">{workforce.personnel.toLocaleString()}</span></p>
                    <p className="text-white">Engagement rate: <span className="font-bold">{engagementRate}%</span> <button onClick={() => document.getElementById('config-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ color: '#F09511' }} className="hover:opacity-80 underline text-sm ml-2">Edit</button></p>
                  </div>
                </div>
                <div className="text-right">
                  <button onClick={() => document.getElementById('impact-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: '#F09511', color: '#333333' }} className="font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg">Show Impact →</button>
                  <div className="text-xs mt-2" style={{ color: '#F09511' }}>See results for {engagementRate}% engagement rate</div>
                </div>
              </div>
              <div className="border-t pt-6" style={{ borderColor: '#555555' }}>
                <p className="text-white mb-3 font-semibold">{workforce.orgData?.name || 'CBP'} Context:</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div><span className="text-white">Current Attrition:</span><span className="font-bold ml-2">{calculations.baseline.attritionRate}%</span></div>
                  <div><span className="text-white">Replacement Cost:</span><span className="font-bold ml-2">${calculations.baseline.replacementCost.toLocaleString()}</span></div>
                  <div><span className="text-white">Annual Separations:</span><span className="font-bold ml-2">{Math.round(calculations.currentSeparations)}</span></div>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 border-2 shadow-lg" style={{ background: '#EDF3F9', borderColor: '#1460AA' }}>
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 mr-3" style={{ color: '#1460AA' }} />
                <h3 className="text-xl font-bold" style={{ color: '#1460AA' }}>Key Model Parameters</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg p-4" style={{ background: '#FFFFFF', border: '1px solid #95D9FF' }}>
                  <h4 className="font-bold mb-2" style={{ color: '#1460AA' }}>Engagement Rate ({engagementRate}%)</h4>
                  <p style={{ color: '#333333' }}>Controls <strong>how many</strong> personnel actively use BetterUp</p>
                  <p className="text-sm mt-2" style={{ color: '#1460AA' }}>Example: {seats.toLocaleString()} × {engagementRate}% = {Math.round(seats * engagementRate / 100).toLocaleString()} engaged</p>
                </div>
                <div className="rounded-lg p-4" style={{ background: '#FFFFFF', border: '1px solid #95D9FF' }}>
                  <h4 className="font-bold mb-2" style={{ color: '#1460AA' }}>Readiness Rate ({effectiveness}%)</h4>
                  <p style={{ color: '#333333' }}>Controls <strong>how much</strong> each person improves</p>
                  <p className="text-sm mt-2" style={{ color: '#1460AA' }}>Auto-calculated from Performance Drivers</p>
                </div>
              </div>
            </div>

            <div id="impact-section" className="grid md:grid-cols-4 gap-4">
              <div style={{ background: '#008000' }} className="text-white p-6 rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
                <div className="text-3xl font-bold mb-1">{calculations.roi}%</div>
                <div className="text-sm opacity-90">Return on Investment</div>
              </div>
              <div style={{ background: '#1460AA' }} className="text-white p-6 rounded-xl shadow-lg">
                <DollarSign className="w-8 h-8 mb-2 opacity-80" />
                <div className="text-3xl font-bold mb-1">${(calculations.netSavings / 1000000).toFixed(1)}M</div>
                <div className="text-sm opacity-90">Net Annual Savings</div>
              </div>
              <div style={{ background: '#00416A' }} className="text-white p-6 rounded-xl shadow-lg">
                <Calculator className="w-8 h-8 mb-2 opacity-80" />
                <div className="text-3xl font-bold mb-1">{calculations.breakEvenMonths > 0 ? calculations.breakEvenMonths.toFixed(1) : 'Immediate'}</div>
                <div className="text-sm opacity-90">Months to Break-Even</div>
              </div>
              <div style={{ background: '#F09511', color: '#333333' }} className="p-6 rounded-xl shadow-lg">
                <Users className="w-8 h-8 mb-2 opacity-80" />
                <div className="text-3xl font-bold mb-1">{Math.round(calculations.separationsPrevented)}</div>
                <div className="text-sm opacity-90">Separations Prevented</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div style={{ background: '#FEF7ED', borderColor: '#F09511' }} className="border-2 rounded-xl shadow-lg overflow-hidden">
                <div style={{ background: '#F09511', color: '#333333' }} className="p-4">
                  <h3 className="text-xl font-bold flex items-center"><Heart className="mr-2" />On-Claim Workers' Comp</h3>
                  <p className="text-sm" style={{ color: '#63666A' }}>Projected mental health WC claims</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm mb-1" style={{ color: '#555555' }}>Projected cost:</div>
                    <div className="text-4xl font-bold" style={{ color: '#F09511' }}>${(calculations.fecaSavings / 1000000).toFixed(2)}M</div>
                  </div>
                  <button onClick={() => setExpandedSection(expandedSection === 'onClaim' ? null : 'onClaim')} style={{ color: '#F09511' }} className="font-semibold">Show breakdown {expandedSection === 'onClaim' ? '▼' : '▶'}</button>
                  {expandedSection === 'onClaim' && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b" style={{ borderColor: '#F3E69C' }}>
                        <span style={{ color: '#555555' }}>Claims Reduced:</span>
                        <span className="font-bold" style={{ color: '#F09511' }}>{calculations.claimsReduced.toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: '#EDF3F9', borderColor: '#1460AA' }} className="border-2 rounded-xl shadow-lg overflow-hidden">
                <div style={{ background: '#1460AA' }} className="text-white p-4">
                  <h3 className="text-xl font-bold flex items-center"><TrendingUp className="mr-2" />Off-Claim Economic Costs</h3>
                  <p className="text-sm opacity-90">Productivity loss, turnover</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm mb-1" style={{ color: '#555555' }}>Projected cost:</div>
                    <div className="text-4xl font-bold" style={{ color: '#1460AA' }}>${(calculations.offClaimTotal / 1000000).toFixed(2)}M</div>
                  </div>
                  <button onClick={() => setExpandedSection(expandedSection === 'offClaim' ? null : 'offClaim')} style={{ color: '#1460AA' }} className="font-semibold">Show breakdown {expandedSection === 'offClaim' ? '▼' : '▶'}</button>
                  {expandedSection === 'offClaim' && (
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between py-2">
                        <span style={{ color: '#555555' }}>Separations Prevented:</span>
                        <span className="font-bold" style={{ color: '#1460AA' }}>{Math.round(calculations.separationsPrevented)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div id="config-section" className="bg-white rounded-xl shadow-lg p-6 border-2" style={{ borderColor: '#1460AA' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#00416A' }}>
                <Calculator className="mr-3" style={{ color: '#1460AA' }} /> Program Configuration
              </h2>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {['conservative', 'moderate', 'aggressive', 'custom'].map(type => (
                  <button key={type} onClick={() => type !== 'custom' ? applyScenario(type) : setScenarioType('custom')} style={{ background: scenarioType === type ? '#1460AA' : '#FFFFFF', color: scenarioType === type ? '#FFFFFF' : '#333333', border: '2px solid #1460AA' }} className="py-3 px-4 rounded-lg font-semibold transition-all capitalize">{type}</button>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>BetterUp Seats</label>
                  <input type="number" value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="w-full p-3 border-2 rounded-lg focus:outline-none" style={{ borderColor: '#1460AA' }} />
                  <p className="text-xs mt-1" style={{ color: '#555555' }}>{((seats / workforce.personnel) * 100).toFixed(1)}% of workforce</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>Engagement Rate</label>
                  <input type="range" min="50" max="100" value={engagementRate} onChange={(e) => setEngagementRate(Number(e.target.value))} className="w-full" style={{ accentColor: '#1460AA' }} />
                  <p className="text-sm font-bold mt-1" style={{ color: '#1460AA' }}>{engagementRate}%</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>Cost Per Seat</label>
                  <input type="number" value={costPerSeat} onChange={(e) => setCostPerSeat(Number(e.target.value))} className="w-full p-3 border-2 rounded-lg focus:outline-none" style={{ borderColor: '#1460AA' }} />
                  <p className="text-xs mt-1" style={{ color: '#555555' }}>Annual cost per user</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2" style={{ borderColor: '#00416A' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#00416A' }}>
                <Brain className="mr-3" style={{ color: '#1460AA' }} /> Performance Drivers
                <span className="ml-auto text-lg font-semibold" style={{ color: '#1460AA' }}>Overall: {effectiveness}%</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(drivers).map(([key, value]) => {
                  const labels = { emotionalRegulation: 'Emotional Regulation', resilience: 'Resilience & Recovery', decisionMaking: 'Decision-Making Under Pressure', communication: 'Communication & Conflict Resolution', purposeMeaning: 'Purpose & Meaning', workLifeIntegration: 'Work-Life Integration', stressManagement: 'Stress Management', leadershipEffectiveness: 'Leadership Effectiveness' };
                  return (
                    <div key={key} className="p-4 rounded-lg" style={{ background: '#ECF1F4' }}>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-semibold" style={{ color: '#333333' }}>{labels[key]}</label>
                        <span className="text-sm font-bold" style={{ color: '#1460AA' }}>{value}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={value} onChange={(e) => { setDrivers({ ...drivers, [key]: Number(e.target.value) }); setScenarioType('custom'); }} className="w-full" style={{ accentColor: '#1460AA' }} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4" style={{ background: 'linear-gradient(to right, #1460AA, #00416A)' }}>
                <h2 className="text-2xl font-bold text-white flex items-center"><Info className="mr-3" /> Factor Breakdown</h2>
                <p className="text-sm mt-1" style={{ color: '#95D9FF' }}>Per-factor cost savings and cases avoided</p>
              </div>
              <div className="p-6 space-y-4">
                <FactorBreakdownItem title="PTSD / Operational Stress" isExpanded={expandedSection === 'ptsd'} onToggle={() => setExpandedSection(expandedSection === 'ptsd' ? null : 'ptsd')} rolePrevalence={{ 'Officers': '8.5%', 'Border Patrol': '13.5%', 'AMO': '11.0%' }} weightedAvg="11.2%" coachingEffectiveness={`${((drivers.resilience + drivers.stressManagement) / 2).toFixed(0)}%`} pathways={[{ name: 'Mental Health Claims', cost: (calculations.fecaSavings * 0.4).toFixed(0) }, { name: 'Sick Leave', days: '9.7', value: '$4,179' }]} />
                <FactorBreakdownItem title="Burnout / Emotional Exhaustion" isExpanded={expandedSection === 'burnout'} onToggle={() => setExpandedSection(expandedSection === 'burnout' ? null : 'burnout')} rolePrevalence={{ 'Officers': '22.0%', 'Border Patrol': '28.5%' }} weightedAvg="25.3%" coachingEffectiveness={`${((drivers.workLifeIntegration + drivers.emotionalRegulation) / 2).toFixed(0)}%`} pathways={[{ name: 'Voluntary Separations', prevented: (calculations.separationsPrevented * 0.35).toFixed(1), cost: calculations.baseline.replacementCost }]} />
                <FactorBreakdownItem title="Leadership Conflict" isExpanded={expandedSection === 'leadership'} onToggle={() => setExpandedSection(expandedSection === 'leadership' ? null : 'leadership')} rolePrevalence={{ 'Officers': '32.0%', 'Border Patrol': '38.5%' }} weightedAvg="35.2%" coachingEffectiveness={`${((drivers.leadershipEffectiveness + drivers.communication) / 2).toFixed(0)}%`} pathways={[{ name: 'Turnover (Exit Survey #1)', prevented: (calculations.separationsPrevented * 0.32).toFixed(1), cost: calculations.baseline.replacementCost }]} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between text-xl font-bold mb-4" style={{ color: '#333333' }}>
                <span className="flex items-center"><Settings className="mr-3" style={{ color: '#555555' }} /> Advanced Settings</span>
                {showAdvanced ? <ChevronUp /> : <ChevronDown />}
              </button>
              {showAdvanced && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>FECA Mental Health %</label>
                    <input type="number" value={advancedSettings.fecaMentalHealthPercent} onChange={(e) => setAdvancedSettings({...advancedSettings, fecaMentalHealthPercent: Number(e.target.value)})} className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>Avg Claim Cost</label>
                    <input type="number" value={advancedSettings.avgFecaClaimCost} onChange={(e) => setAdvancedSettings({...advancedSettings, avgFecaClaimCost: Number(e.target.value)})} className="w-full p-3 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#333333' }}>OT Multiplier</label>
                    <input type="number" step="0.1" value={advancedSettings.overtimeCostMultiplier} onChange={(e) => setAdvancedSettings({...advancedSettings, overtimeCostMultiplier: Number(e.target.value)})} className="w-full p-3 border rounded-lg" />
                  </div>
                </div>
              )}
            </div>

            <div className="text-white rounded-xl shadow-lg p-8" style={{ background: '#008000' }}>
              <h2 className="text-3xl font-bold mb-4">Bottom Line Up Front</h2>
              <div className="text-lg space-y-2">
                <p><strong>Investment:</strong> ${(calculations.totalCost / 1000000).toFixed(2)}M for {seats.toLocaleString()} seats</p>
                <p><strong>Annual Return:</strong> ${(calculations.totalAnnualSavings / 1000000).toFixed(2)}M through {Math.round(calculations.separationsPrevented)} prevented separations</p>
                <p><strong>ROI:</strong> {calculations.roi}% with break-even in {calculations.breakEvenMonths.toFixed(1)} months</p>
                <p><strong>5-Year Value:</strong> ${(calculations.fiveYearValue / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2" style={{ borderColor: '#1460AA' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#00416A' }}>Model Methodology</h3>
            <div className="space-y-4" style={{ color: '#333333' }}>
              <p>This ROI calculator employs a <strong>dual-pathway model</strong> proven in first responder and military applications.</p>
              <div className="p-4 rounded-lg" style={{ background: '#EDF3F9' }}>
                <h4 className="font-bold mb-2" style={{ color: '#1460AA' }}>Pathway 1: FECA Claims Reduction</h4>
                <p style={{ color: '#555555' }}>Reduces mental health workers' comp claims. CBP faces $90-120M annual FECA costs.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ background: '#ECF5EC' }}>
                <h4 className="font-bold mb-2" style={{ color: '#008000' }}>Pathway 2: Retention Economics</h4>
                <p style={{ color: '#555555' }}>Prevents costly turnover at ${calculations.baseline.replacementCost.toLocaleString()} per separation.</p>
              </div>
            </div>
          </div>
        )}

        {showAssistant && (
          <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 border-2" style={{ borderColor: '#1460AA' }}>
            <div className="p-4 flex items-center justify-between text-white" style={{ background: '#1460AA' }}>
              <div className="flex items-center"><MessageSquare className="w-5 h-5 mr-2" /><h3 className="font-bold">Model Assistant</h3></div>
              <button onClick={() => setShowAssistant(false)}>✕</button>
            </div>
            <div className="p-4" style={{ background: '#F6F6F6' }}>
              <p className="text-sm" style={{ color: '#333333' }}>Hello! I can help explain the calculator for {workforce.name}.</p>
            </div>
          </div>
        )}

        <button onClick={() => setShowAssistant(!showAssistant)} className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-2xl z-50" style={{ background: '#1460AA' }}>
          <MessageSquare className="w-6 h-6" />
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