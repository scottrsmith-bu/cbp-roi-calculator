import React, { useState, useMemo } from 'react';
import { Shield, Calculator, MessageCircle, X, ChevronDown, Settings, Search, Plus, Info } from 'lucide-react';

function CBPROICalculator() {
  // Navigation state
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showImpact, setShowImpact] = useState(false);
  const [showWorkersCompBreakdown, setShowWorkersCompBreakdown] = useState(false);
  const [expandedFactor, setExpandedFactor] = useState(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMinimized, setAssistantMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // Editing state
  const [editingSeats, setEditingSeats] = useState(false);
  const [editingEngagement, setEditingEngagement] = useState(false);
  const [tempSeats, setTempSeats] = useState(5000);
  const [tempEngagement, setTempEngagement] = useState(65);
  
  // Performance drivers
  const [missionReadinessImprovement, setMissionReadinessImprovement] = useState(17);
  const [resilienceImprovement, setResilienceImprovement] = useState(15);
  const [careerCommitmentImprovement, setCareerCommitmentImprovement] = useState(13);
  const [leadershipImprovement, setLeadershipImprovement] = useState(12);
  const [standardsImprovement, setStandardsImprovement] = useState(10);
  
  // Manual overrides
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
  // Global parameters
  const [totalPersonnel, setTotalPersonnel] = useState(25879);
  const [targetPopulation, setTargetPopulation] = useState(5000);
  const [seats, setSeats] = useState(5000);
  const [costPerSeat, setCostPerSeat] = useState(150);
  const [engagementRate, setEngagementRate] = useState(65);
  
  // Organizational data - UPDATED with correct terminology and numbers
  const organizations = [
    {id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', type: 'cbp-wide', preset: 'yes', description: 'Entire CBP workforce (OFO + USBP + AMO)', attritionRate: 5.5, replacementCost: 97500, workersCompClaims: 3100},
    {id: 'ofo', name: 'Office of Field Operations (OFO)', personnel: 25879, location: '20 Field Offices', type: 'component', preset: 'yes', highlight: true, description: 'CBP Officers at 328 ports of entry', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 1340},
    {id: 'usbp', name: 'U.S. Border Patrol (USBP)', personnel: 20000, location: '20 Sectors Nationwide', type: 'component', preset: 'yes', description: 'Border Patrol Agents across all sectors', attritionRate: 7.2, replacementCost: 125000, workersCompClaims: 1500},
    {id: 'amo', name: 'Air and Marine Operations (AMO)', personnel: 1800, location: 'Aviation & Maritime', type: 'component', preset: 'yes', description: 'Air interdiction and marine operations', attritionRate: 4.5, replacementCost: 105000, workersCompClaims: 135},
    {id: 'swb', name: 'Southwest Border - All 9 Sectors', personnel: 12000, location: 'CA, AZ, NM, TX', type: 'usbp-region', preset: 'yes', description: 'San Diego, El Centro, Yuma, Tucson, El Paso, Big Bend, Del Rio, Laredo, RGV', attritionRate: 7.5, replacementCost: 125000, workersCompClaims: 900},
    {id: 'northern', name: 'Northern Border - All 8 Sectors', personnel: 4500, location: 'Northern U.S.', type: 'usbp-region', preset: 'yes', description: 'Spokane, Havre, Grand Forks, Detroit, Buffalo, Swanton, Houlton, Blaine', attritionRate: 5.5, replacementCost: 115000, workersCompClaims: 340},
    {id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', type: 'usbp-sector', preset: 'yes', description: 'Largest USBP sector by geography', attritionRate: 7.5, replacementCost: 115000, workersCompClaims: 285},
    {id: 'rgv', name: 'Rio Grande Valley Sector', personnel: 3200, location: 'South Texas', type: 'usbp-sector', preset: 'yes', description: 'Highest apprehension volume', attritionRate: 7.8, replacementCost: 120000, workersCompClaims: 240},
    {id: 'sandiego_sector', name: 'San Diego Sector', personnel: 2800, location: 'California', type: 'usbp-sector', preset: 'yes', description: 'Urban USBP operations', attritionRate: 6.5, replacementCost: 130000, workersCompClaims: 210},
    {id: 'ofo_ny', name: 'New York Field Office', personnel: 2588, location: 'New York, NY', type: 'ofo-field', preset: 'yes', description: 'JFK, Newark, LaGuardia - Major international air hub', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 134},
    {id: 'ofo_la', name: 'Los Angeles Field Office', personnel: 2329, location: 'Long Beach, CA', type: 'ofo-field', preset: 'yes', description: 'LAX, Long Beach Port - Major air and sea operations', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 120},
    {id: 'ofo_miami', name: 'Miami Field Office', personnel: 2070, location: 'Miami, FL', type: 'ofo-field', preset: 'yes', description: 'MIA and seaport operations', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 107},
    {id: 'ofo_sandiego', name: 'San Diego Field Office', personnel: 1811, location: 'San Diego, CA', type: 'ofo-field', preset: 'yes', description: 'San Ysidro - Busiest land border crossing', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 94},
    {id: 'ofo_laredo', name: 'Laredo Field Office', personnel: 1811, location: 'Laredo, TX', type: 'ofo-field', preset: 'yes', description: 'Highest trade volume land border crossing', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 94},
    {id: 'ofo_chicago', name: 'Chicago Field Office', personnel: 1552, location: 'Chicago, IL', type: 'ofo-field', preset: 'yes', description: "O'Hare International Airport", attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 80},
    {id: 'ofo_houston', name: 'Houston Field Office', personnel: 1552, location: 'Houston, TX', type: 'ofo-field', preset: 'yes', description: 'George Bush Intercontinental and seaport', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 80},
    {id: 'ofo_elpaso', name: 'El Paso Field Office', personnel: 1294, location: 'El Paso, TX', type: 'ofo-field', preset: 'yes', description: 'Paso del Norte and area crossings', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 67},
    {id: 'ofo_sf', name: 'San Francisco Field Office', personnel: 1294, location: 'San Francisco, CA', type: 'ofo-field', preset: 'yes', description: 'SFO International and Oakland seaport', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 67},
    {id: 'ofo_detroit', name: 'Detroit Field Office', personnel: 1294, location: 'Detroit, MI', type: 'ofo-field', preset: 'yes', description: 'Ambassador Bridge and tunnel crossings', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 67},
    {id: 'ofo_tucson', name: 'Tucson Field Office', personnel: 1035, location: 'Tucson, AZ', type: 'ofo-field', preset: 'partial', description: 'Nogales and Arizona border crossings', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 54},
    {id: 'ofo_seattle', name: 'Seattle Field Office', personnel: 1035, location: 'Seattle, WA', type: 'ofo-field', preset: 'partial', description: 'Sea-Tac Airport and seaport', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 54},
    {id: 'ofo_buffalo', name: 'Buffalo Field Office', personnel: 1035, location: 'Buffalo, NY', type: 'ofo-field', preset: 'partial', description: 'Peace Bridge and Rainbow Bridge', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 54},
    {id: 'ofo_atlanta', name: 'Atlanta Field Office', personnel: 776, location: 'Atlanta, GA', type: 'ofo-field', preset: 'partial', description: 'Hartsfield-Jackson International', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 40},
    {id: 'ofo_boston', name: 'Boston Field Office', personnel: 776, location: 'Boston, MA', type: 'ofo-field', preset: 'partial', description: 'Logan International and seaport', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 40},
    {id: 'ofo_baltimore', name: 'Baltimore Field Office', personnel: 776, location: 'Baltimore, MD', type: 'ofo-field', preset: 'partial', description: 'BWI Airport and Port of Baltimore', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 40},
    {id: 'ofo_portland', name: 'Portland Field Office', personnel: 518, location: 'Portland, OR', type: 'ofo-field', preset: 'no', description: 'PDX Airport and Pacific Northwest', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 27},
    {id: 'ofo_nola', name: 'New Orleans Field Office', personnel: 518, location: 'New Orleans, LA', type: 'ofo-field', preset: 'no', description: 'Port of New Orleans and Gulf Coast', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 27},
    {id: 'ofo_tampa', name: 'Tampa Field Office', personnel: 518, location: 'Tampa, FL', type: 'ofo-field', preset: 'no', description: 'Tampa International and Port Tampa', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 27},
    {id: 'ofo_sanjuan', name: 'San Juan Field Office', personnel: 518, location: 'San Juan, PR', type: 'ofo-field', preset: 'no', description: 'Luis Muñoz Marín International and seaport', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 27},
  ];

  const selectOrganization = (org) => {
    setSelectedOrganization(org);
    setTotalPersonnel(org.personnel);
    setTargetPopulation(Math.round(org.personnel * 0.2));
    setSeats(Math.round(org.personnel * 0.2));
    setShowLanding(false);
    setShowExecutiveSummary(false);
  };

  // Calculated retention effectiveness from performance drivers
  const retentionEffectiveness = useMemo(() => {
    if (manualRetentionOverride) {
      return manualRetentionValue;
    }
    const base = 3;
    const careerContribution = (careerCommitmentImprovement / 100) * 20;
    const leadershipContribution = (leadershipImprovement / 100) * 15;
    return Math.round(base + careerContribution + leadershipContribution);
  }, [careerCommitmentImprovement, leadershipImprovement, manualRetentionOverride, manualRetentionValue]);

  // Calculated readiness percentage from performance drivers
  const readinessPercentage = useMemo(() => {
    const base = 12;
    const missionContribution = (missionReadinessImprovement / 100) * 30;
    const resilienceContribution = (resilienceImprovement / 100) * 25;
    const standardsContribution = (standardsImprovement / 100) * 15;
    return Math.round(base + missionContribution + resilienceContribution + standardsContribution);
  }, [missionReadinessImprovement, resilienceImprovement, standardsImprovement]);

  const fmt = (v) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(v);
  const fmtNum = (v) => new Intl.NumberFormat('en-US').format(v);

  const suggestedQuestions = [
    "How is the net savings calculated?",
    "Why is OFO facing a retirement crisis in 2028?",
    "Explain the dual-pathway model",
    "What are workers' comp claims?",
    "How do Performance Drivers affect ROI?",
    "Explain the difference between officers and agents"
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, {type: 'user', text: chatInput}, {type: 'assistant', text: `Based on the model for ${selectedOrganization?.name || 'CBP'}: ${chatInput}`}]);
    setChatInput('');
  };

  const performanceDrivers = [
    {
      key: 'mission', 
      priority: "ENHANCING MISSION READINESS", 
      drivers: "Rapid Decision-Making • Cognitive Agility • Sustained Performance • Situational Awareness • Operational Effectiveness", 
      baseline: 45, 
      growth: 62, 
      improvement: missionReadinessImprovement, 
      setImprovement: setMissionReadinessImprovement, 
      affectsReadiness: true, 
      impact: "Drives operational performance and decision-making in high-pressure situations"
    },
    {
      key: 'resilience', 
      priority: "STRENGTHENING RESILIENCE & MENTAL WELLNESS", 
      drivers: "Burnout Prevention • Stress Management • Emotional Regulation • Recovery • Optimism", 
      baseline: 47, 
      growth: 62, 
      improvement: resilienceImprovement, 
      setImprovement: setResilienceImprovement, 
      affectsReadiness: true, 
      affectsWorkersComp: true,
      impact: "Reduces mental health claims (PTSD, depression, anxiety) and improves sustained performance"
    },
    {
      key: 'career', 
      priority: "INCREASING CAREER COMMITMENT", 
      drivers: "Purpose & Meaning • Career Development • Work-Life Integration • Job Satisfaction", 
      baseline: 48, 
      growth: 54, 
      improvement: careerCommitmentImprovement, 
      setImprovement: setCareerCommitmentImprovement, 
      affectsRetention: true, 
      impact: "Reduces separation intent, especially critical for 2028 OFO retirement cliff"
    },
    {
      key: 'leadership', 
      priority: "IMPROVING LEADERSHIP EFFECTIVENESS", 
      drivers: "Communication • Strategic Thinking • Empowerment • Active Listening • Coaching Culture", 
      baseline: 50, 
      growth: 56, 
      improvement: leadershipImprovement, 
      setImprovement: setLeadershipImprovement, 
      affectsRetention: true, 
      impact: "Enhances command climate and retention of high-performers"
    },
    {
      key: 'standards', 
      priority: "MAINTAINING PROFESSIONAL STANDARDS", 
      drivers: "Ethical Decision-Making • Sound Judgment • Professional Demeanor • Courageous Communication", 
      baseline: 49, 
      growth: 59, 
      improvement: standardsImprovement, 
      setImprovement: setStandardsImprovement, 
      affectsReadiness: true, 
      impact: "Strengthens CBP Standards of Conduct compliance and professional culture"
    }
  ];

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    
    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      if (filterType === 'preset') {
        filtered = filtered.filter(org => org.preset === 'yes');
      } else if (filterType === 'custom') {
        filtered = filtered.filter(org => org.preset === 'no' || org.preset === 'partial');
      } else {
        filtered = filtered.filter(org => org.type === filterType);
      }
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'personnel') return b.personnel - a.personnel;
      return 0;
    });
  }, [searchTerm, filterType, sortBy]);
  if (showExecutiveSummary) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#0066cc]">
          
          <div className="bg-gradient-to-r from-[#003d82] to-[#0066cc] text-white p-12">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-16 h-16 text-[#ffcc00]" />
              <div>
                <h1 className="text-5xl font-bold mb-2">BetterUp CBP Leadership Dashboard</h1>
                <p className="text-xl text-[#ffcc00]">Workers' Comp & Retention ROI Projections</p>
              </div>
            </div>
            <div className="bg-[#0052a3]/50 rounded-lg p-4 border-l-4 border-[#ffcc00]">
              <p className="text-lg leading-relaxed mb-3">
                <strong className="text-[#ffcc00]">Evidence-based ROI dashboard</strong> projecting the financial impact of precision resilience development—targeting the mindsets and behaviors that drive DHS/CBP strategic priorities: <strong>Mission Readiness, Officer Safety, Professional Standards, and Career Retention</strong>.
              </p>
              <p className="text-base text-gray-300">
                Built on <strong className="text-[#ffcc00]">4 years of proven Air Force results</strong> (77K+ sessions, 11K+ participants) and <strong>JAMA 2024 peer-reviewed research</strong> showing 22% reduction in mental health conditions.
              </p>
            </div>
          </div>

          <div className="p-12 space-y-8">
            
            <div className="bg-blue-50 border-4 border-blue-400 rounded-xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">ℹ️</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-900 mb-3">What This Tool Provides: Projections for Decision Support</h2>
                  <p className="text-blue-900 mb-4 leading-relaxed">
                    This dashboard generates <strong>financial projections</strong> based on proven Air Force outcomes and peer-reviewed research applied to CBP workers' comp claim rates, separation data, and training costs from government sources (GAO, DHS OIG, NTEU testimony). These are <strong>evidence-based forecasts</strong>, not guarantees.
                  </p>
                  <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                    <h3 className="font-bold text-blue-900 mb-3">Real Results Come After Implementation:</h3>
                    <div className="space-y-3 text-sm text-blue-900">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                        <div>
                          <strong>Action Layer:</strong> BetterUp's Human Transformation Platform delivers virtual, just-in-time resilience development through human expertise, behavioral assessments, personalized learning journeys, and an AI development partner—improving mindsets and behaviors driving retention and operational readiness
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                        <div>
                          <strong>Sensing Layer:</strong> Real-time people analytics dashboard aggregates anonymized data from pre/post assessments, Reflection Points, and engagement patterns at individual, sector/field office, and organizational levels—providing leadership measurable visibility into wellness, resilience, and retention trends
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                        <div>
                          <strong>Measured Outcomes:</strong> After program implementation, your sector's or field office's actual results replace these projections with data from your agents, your officers, your command
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-purple-50 border-4 border-slate-600 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">⚡</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Precision Development vs. Traditional Training?</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-5 border-2 border-red-300">
                      <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                        <div className="text-2xl">📚</div>
                        Traditional Training Approach
                      </h3>
                      <ul className="text-sm text-red-800 space-y-2">
                        <li>• <strong>Event-based:</strong> Annual refreshers, mandatory courses, EAP programs</li>
                        <li>• <strong>Knowledge transfer:</strong> Teaching what to do</li>
                        <li>• <strong>Episodic:</strong> One-time interventions</li>
                        <li>• <strong>Generic curriculum:</strong> Same for everyone</li>
                        <li>• <strong>Output focus:</strong> Completion certificates, attendance tracking</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-5 border-2 border-emerald-400">
                      <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                        <div className="text-2xl">🎯</div>
                        BetterUp Human Transformation Platform
                      </h3>
                      <ul className="text-sm text-emerald-800 space-y-2">
                        <li>• <strong>Virtual delivery:</strong> Human expertise + AI development partner</li>
                        <li>• <strong>Just-in-time support:</strong> Available during critical moments</li>
                        <li>• <strong>AI role-play:</strong> Use-of-force scenarios, difficult interactions, career decisions</li>
                        <li>• <strong>Personalized learning:</strong> Individual resilience development paths</li>
                        <li>• <strong>Measured outcomes:</strong> Behavioral tracking via assessments & Reflection Points</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-5 mt-6 border-2 border-emerald-400">
                    <p className="text-sm text-emerald-900">
                      <strong className="text-emerald-800">The Key Difference:</strong> Traditional training teaches <em>what</em> to do. BetterUp's Human Transformation Platform develops the underlying <strong>mindsets and behaviors</strong> (Resilience, Decision-Making, Emotional Regulation, Stress Management) that drive performance across all situations—<strong>delivered virtually with human expertise and AI support</strong>. Unlike mandatory training that produces completion certificates, BetterUp produces <strong>measurable outcomes</strong> through anonymized assessment data and Reflection Points feeding your People Analytics dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-4 border-indigo-600 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">🤖</div>
                <h2 className="text-2xl font-bold text-indigo-900">AI Development Partner: Always-Available Support</h2>
              </div>
              <p className="text-indigo-900 mb-4">
                BetterUp's AI development partner provides agents and officers with 24/7 access to resilience support—critical when facing high-stakes law enforcement situations:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-5 border-2 border-indigo-400">
                  <div className="text-sm font-semibold text-indigo-900 mb-2">🎭 Role-Play & Rehearsal</div>
                  <p className="text-sm text-indigo-800">Practice use-of-force scenarios, difficult apprehensions, contentious public interactions before real encounters</p>
                </div>
                <div className="bg-white rounded-lg p-5 border-2 border-indigo-400">
                  <div className="text-sm font-semibold text-indigo-900 mb-2">⚡ Critical Incident Support</div>
                  <p className="text-sm text-indigo-800">Immediate decompression after traumatic events, stress management during surge operations</p>
                </div>
                <div className="bg-white rounded-lg p-5 border-2 border-indigo-400">
                  <div className="text-sm font-semibold text-indigo-900 mb-2">🎯 Career Decision Support</div>
                  <p className="text-sm text-indigo-800">Explore specialty transitions, leadership opportunities, retirement planning at critical retention decision points</p>
                </div>
                <div className="bg-white rounded-lg p-5 border-2 border-indigo-400">
                  <div className="text-sm font-semibold text-indigo-900 mb-2">📊 Real-Time Feedback</div>
                  <p className="text-sm text-indigo-800">Immediate insights on de-escalation techniques, communication strategies, decision-making patterns</p>
                </div>
              </div>
              <div className="bg-indigo-100 rounded-lg p-4 mt-6 border-2 border-indigo-400">
                <p className="text-sm text-indigo-900">
                  <strong>Virtual + Human Expertise:</strong> The AI development partner complements (not replaces) human expertise—agents and officers get immediate support 24/7, with human experts available for deeper development work and complex challenges.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#003d82] mb-6 text-center">Air Force Proven Results (2021-2025)</h2>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-sm opacity-90 mb-2">DAF Members</div>
                  <div className="text-4xl font-bold">11,215</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-sm opacity-90 mb-2">Total Sessions</div>
                  <div className="text-4xl font-bold">77,333</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-sm opacity-90 mb-2">Hours Delivered</div>
                  <div className="text-4xl font-bold">54,377</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 text-center shadow-lg">
                  <div className="text-sm opacity-90 mb-2">Satisfaction</div>
                  <div className="text-4xl font-bold">79%</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">+17%</div>
                  <div className="text-sm text-blue-800 font-semibold">Mission Readiness</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">+6%</div>
                  <div className="text-sm text-blue-800 font-semibold">Career Commitment</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5 text-center">
                  <div className="text-3xl font-bold text-blue-900 mb-2">+15%</div>
                  <div className="text-sm text-blue-800 font-semibold">Resilience</div>
                </div>
              </div>
              <div className="text-center">
                <button 
                  onClick={() => setShowCommercialResults(!showCommercialResults)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
                >
                  {showCommercialResults ? '− Hide' : '+ Show'} Commercial Proven Results
                </button>
              </div>
              
              {showCommercialResults && (
                <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-3 border-purple-600 rounded-xl p-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4 text-center">Enterprise & Federal Proven Results</h3>
                  <p className="text-sm text-purple-800 mb-6 text-center italic">Aggregate outcomes across Fortune 500 enterprises and federal agencies (client-confidential)</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-5 text-center border-2 border-purple-300 shadow-md">
                      <div className="text-3xl font-bold text-purple-900 mb-2">+18%</div>
                      <div className="text-sm text-purple-800 font-semibold">Leadership Capability</div>
                      <div className="text-xs text-purple-700 mt-2">Avg across enterprise clients</div>
                    </div>
                    <div className="bg-white rounded-lg p-5 text-center border-2 border-purple-300 shadow-md">
                      <div className="text-3xl font-bold text-purple-900 mb-2">+22%</div>
                      <div className="text-sm text-purple-800 font-semibold">Manager Effectiveness</div>
                      <div className="text-xs text-purple-700 mt-2">Measured via 360° assessments</div>
                    </div>
                    <div className="bg-white rounded-lg p-5 text-center border-2 border-purple-300 shadow-md">
                      <div className="text-3xl font-bold text-purple-900 mb-2">85%</div>
                      <div className="text-sm text-purple-800 font-semibold">Client Satisfaction</div>
                      <div className="text-xs text-purple-700 mt-2">Commercial & government</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-amber-50 border-4 border-amber-500 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">How the Model Works: Dual-Pathway Impact</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 border-2 border-stone-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                    <h3 className="text-xl font-bold text-stone-900">Federal Workers' Comp Claims Reduction</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    BetterUp helps agents and officers build resilience to prevent mental health claims (PTSD, depression, anxiety, SUD) that drive workers' comp costs and operational degradation.
                  </p>
                  <div className="bg-red-50 rounded p-4 text-sm">
                    <strong className="text-red-900">Value:</strong>
                    <div className="text-red-800 mt-1">22% reduction in mental health claims = lower medical costs, reduced lost time, fewer disability payments</div>
                    <div className="text-xs text-red-700 mt-2 italic">Source: JAMA 2024 peer-reviewed research (21.6% burnout reduction)</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 border-2 border-stone-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                    <h3 className="text-xl font-bold text-stone-900">Retention Economics</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    BetterUp helps agents and officers at critical decision points (3-5 years, 10-15 years, pre-2028 retirement) choose to stay through career clarity, purpose development, and resilience building.
                  </p>
                  <div className="bg-amber-50 rounded p-4 text-sm">
                    <strong className="text-amber-900">Value:</strong>
                    <div className="text-amber-800 mt-1">Each prevented separation avoids $87K-$130K in recruiting, FLETC training, field training, and lost productivity</div>
                    <div className="text-xs text-amber-700 mt-2 italic">Source: GAO-24-107029, DHS OIG reports on CBP workforce challenges</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-600 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">📊</div>
                <h2 className="text-2xl font-bold text-blue-900">How Performance Drivers Work</h2>
              </div>
              <p className="text-blue-900 mb-6">
                Performance Driver sliders let you model <strong>how much you prioritize each CBP strategic objective</strong>. Moving these sliders simulates allocating more or less development resources to each area.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg p-5 border-2 border-blue-400">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <div className="text-2xl">🎯</div>
                    What the Sliders Mean
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• <strong>High value (20-30%):</strong> Maximum focus—dedicated learning paths, frequent coaching sessions, AI-assisted practice</li>
                    <li>• <strong>Medium value (10-19%):</strong> Balanced investment in this area</li>
                    <li>• <strong>Low value (0-9%):</strong> Minimal focus—resources directed to higher priorities</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-5 border-2 border-blue-400">
                  <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <div className="text-2xl">⚡</div>
                    How They Affect ROI
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• <strong>Mission Readiness, Resilience, Standards</strong> → Drive operational effectiveness and workers' comp claim reduction</li>
                    <li>• <strong>Career Commitment, Leadership</strong> → Drive retention and prevent costly turnover</li>
                    <li>• Higher slider values = Bigger behavioral improvements = Greater financial impact</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg p-5 border-2 border-blue-400">
                <h3 className="font-bold text-blue-900 mb-3">Example Scenario:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-4 border border-blue-300">
                    <div className="font-semibold text-blue-900 mb-2">❌ Generic Approach</div>
                    <div className="text-blue-800 mb-2">All sliders at 12%—spreading resources thin across all priorities</div>
                    <div className="text-xs text-blue-600"><strong>Result:</strong> Moderate gains, no exceptional outcomes</div>
                  </div>
                  <div className="bg-white rounded p-4 border border-blue-300">
                    <div className="font-semibold text-blue-900 mb-2">✅ Focused Approach</div>
                    <div className="text-blue-800 mb-2">Resilience at 25%, Career Commitment at 20%—targeting mental health crisis and 2028 retirement cliff</div>
                    <div className="text-xs text-emerald-600"><strong>Result:</strong> Maximum impact on workers' comp claims and retention where it matters most</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 mt-6 border-2 border-amber-400">
                <p className="text-sm text-amber-900">
                  <strong>💡 Leadership Decision:</strong> Adjust these sliders to match your sector's or field office's priorities. If workers' comp mental health claims are your crisis, max out Resilience. If 2028 OFO retirement cliff threatens operations, prioritize Career Commitment and Leadership. The model shows the financial impact of those strategic choices.
                </p>
              </div>
            </div>

            <div className="bg-white border-4 border-[#003d82] rounded-xl p-8">
              <h2 className="text-3xl font-bold text-[#003d82] mb-6">What You Can Do With This Dashboard</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0066cc] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">📊</div>
                  <h3 className="font-bold text-[#003d82] mb-2">Model Your Component</h3>
                  <p className="text-sm text-gray-700">Select your sector or field office and see projected ROI based on your personnel strength and operational challenges</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0066cc] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">⚙️</div>
                  <h3 className="font-bold text-[#003d82] mb-2">Adjust Assumptions</h3>
                  <p className="text-sm text-gray-700">Change attrition rates, engagement levels, and priority focus to match your operational context</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0066cc] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🎯</div>
                  <h3 className="font-bold text-[#003d82] mb-2">Scenario Planning</h3>
                  <p className="text-sm text-gray-700">Test conservative, moderate, or aggressive assumptions to understand potential range of outcomes</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-4 border-amber-500 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">!</div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-4">Understanding Projections vs. Actual Results</h2>
                  <div className="space-y-4 text-amber-900">
                    <div className="bg-white rounded-lg p-5 border-2 border-amber-400">
                      <h3 className="font-bold mb-2 text-lg">This Dashboard Shows: <span className="text-amber-700">Projections</span></h3>
                      <p className="text-sm">
                        Financial forecasts applying proven Air Force outcomes to CBP's publicly available attrition rates and government-sourced training costs. All assumptions are adjustable and transparent.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-5 border-2 border-amber-400">
                      <h3 className="font-bold mb-2 text-lg">After Implementation: <span className="text-emerald-700">Measured Results</span></h3>
                      <p className="text-sm mb-3">
                        BetterUp's <strong>Human Transformation Platform</strong> operates as both an <strong>action layer</strong> (virtual precision development creating behavioral change) and a <strong>sensing layer</strong> (people analytics providing real-time visibility):
                      </p>
                      <ul className="text-sm space-y-2 ml-4">
                        <li>• <strong>Individual level:</strong> Pre/post assessments and Reflection Points track growth in resilience, decision-making, emotional regulation, and stress management</li>
                        <li>• <strong>Sector/Field Office level:</strong> Anonymized, aggregated data shows team cohesion, morale trends, and wellness patterns</li>
                        <li>• <strong>Organizational level:</strong> CBP dashboard reports wellness, resilience, and retention outcomes in real-time—without compromising employee privacy</li>
                      </ul>
                      <div className="bg-emerald-50 rounded p-3 mt-3 border border-emerald-400">
                        <p className="text-xs font-semibold text-emerald-900">
                          Your actual results—measured from anonymized assessments, Reflection Points, and engagement data—replace these projections and provide ongoing decision intelligence for leadership.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#003d82] mb-6 text-center">Performance Drivers Aligned to CBP Strategic Priorities</h2>
              <p className="text-center text-gray-700 mb-6">BetterUp targets the behavioral foundations that drive DHS and CBP mission success</p>
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300 text-center">
                  <div className="font-bold text-[#003d82] mb-2 text-sm">MISSION READINESS</div>
                  <div className="text-xs text-gray-700">Rapid Decision-Making, Cognitive Agility, Sustained Performance</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300 text-center">
                  <div className="font-bold text-[#003d82] mb-2 text-sm">RESILIENCE</div>
                  <div className="text-xs text-gray-700">Burnout Prevention, Stress Management, Emotional Regulation</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300 text-center">
                  <div className="font-bold text-[#003d82] mb-2 text-sm">CAREER COMMITMENT</div>
                  <div className="text-xs text-gray-700">Purpose & Meaning, Career Development, Work-Life Integration</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300 text-center">
                  <div className="font-bold text-[#003d82] mb-2 text-sm">LEADERSHIP</div>
                  <div className="text-xs text-gray-700">Communication, Strategic Thinking, Supervisory Effectiveness</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300 text-center">
                  <div className="font-bold text-[#003d82] mb-2 text-sm">STANDARDS</div>
                  <div className="text-xs text-gray-700">Ethical Decision-Making, Professional Demeanor, Sound Judgment</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#003d82] to-[#0066cc] text-white rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to See Your Component's Projected Impact?</h2>
              <p className="text-lg mb-6 text-gray-200">
                Select your CBP component, sector, or field office to model ROI with adjustable parameters specific to your personnel, workers' comp patterns, and retention challenges
              </p>
              <button 
                onClick={() => {setShowExecutiveSummary(false); setShowLanding(true);}}
                className="bg-[#ffcc00] hover:bg-[#ffd633] text-[#003d82] font-bold py-4 px-12 rounded-lg text-xl shadow-xl transition-all hover:scale-105"
              >
                Select Your Component →
              </button>
              <p className="text-sm text-gray-300 mt-4">All data sources documented | Every assumption adjustable | Transparent methodology</p>
            </div>

          </div>
        </div>
      </div>
    );
  }
  if (showLanding) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <button onClick={() => {setShowExecutiveSummary(true); setShowLanding(false);}} className="mb-4 text-gray-600 hover:underline text-sm flex items-center gap-1">
          ← Back to Executive Summary
        </button>
        
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-[#0066cc]">
          <div className="bg-[#003d82] text-white p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Shield className="w-12 h-12 text-[#ffcc00]" />
                <div>
                  <h1 className="text-4xl font-bold">Select Your Component, Sector, or Field Office</h1>
                  <p className="text-gray-300 mt-2">Choose a CBP organization. All parameters can be fine-tuned after selection.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-4 mb-6 items-center flex-wrap">
              <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search components, sectors, field offices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#0066cc] focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'all' ? 'bg-[#0066cc] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>All</button>
                <button onClick={() => setFilterType('preset')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'preset' ? 'bg-[#0066cc] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Preset</button>
                <button onClick={() => setFilterType('component')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'component' ? 'bg-[#0066cc] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Components</button>
                <button onClick={() => setFilterType('usbp-sector')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'usbp-sector' ? 'bg-[#0066cc] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>USBP Sectors</button>
                <button onClick={() => setFilterType('ofo-field')} className={`px-4 py-2 rounded-lg font-medium ${filterType === 'ofo-field' ? 'bg-[#0066cc] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>OFO Field Offices</button>
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white">
                <option value="name">Sort: A-Z</option>
                <option value="personnel">Sort: Personnel</option>
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
              <div className="grid grid-cols-12 gap-4 p-4 bg-[#003d82] text-white font-semibold text-sm">
                <div className="col-span-4">Component / Sector / Field Office</div>
                <div className="col-span-2 text-center">Personnel</div>
                <div className="col-span-3">Location</div>
                <div className="col-span-2 text-center">Preset</div>
                <div className="col-span-1"></div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredOrganizations.map((org) => (
                  <div key={org.id} className={`grid grid-cols-12 gap-4 p-4 hover:bg-blue-50 transition-colors ${org.highlight ? 'bg-amber-50' : 'bg-white'}`}>
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-lg text-[#003d82]">{org.name}</div>
                        {org.highlight && <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded font-bold">⚠️ 2028</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{org.description}</div>
                      {org.id === 'ofo' && <div className="text-xs text-red-700 font-bold mt-1">🚨 2,220 officers retiring in 2028 (400% increase)</div>}
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="font-bold text-[#003d82]">{fmtNum(org.personnel)}</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-700">{org.location}</span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      {org.preset === 'yes' && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">Yes</span>}
                      {org.preset === 'partial' && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">Partial</span>}
                      {org.preset === 'no' && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">No</span>}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <button onClick={() => selectOrganization(org)} className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-4 py-2 rounded font-semibold text-sm">
                        Select →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredOrganizations.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No organizations found matching "{searchTerm}"</p>
                <p className="text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-6 border-t-2 border-gray-200">
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-bold text-[#003d82] mb-2">Terminology Guide:</div>
                <div className="space-y-1 text-gray-700">
                  <div><span className="font-semibold text-blue-700">OFO:</span> CBP Officers (not agents)</div>
                  <div><span className="font-semibold text-blue-700">USBP:</span> Border Patrol Agents (not officers)</div>
                  <div><span className="font-semibold text-blue-700">Field Offices:</span> OFO administrative units (20 total)</div>
                  <div><span className="font-semibold text-blue-700">Sectors:</span> USBP operational units (20 total)</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-[#003d82] mb-2">Data Sources:</div>
                <div className="text-gray-700">Based on GAO reports (GAO-24-107029), DHS OIG audits, NTEU congressional testimony, and official CBP data (2024-2025)</div>
              </div>
              <div>
                <div className="font-bold text-[#003d82] mb-2">Special Note:</div>
                <div className="text-gray-700"><strong className="text-red-700">OFO 2028 Crisis:</strong> 2,220 officers (400% increase) projected to retire due to enhanced retirement eligibility granted July 6, 2008</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
    // Main calculations
  const calculations = useMemo(() => {
    const engaged = Math.round((targetPopulation * engagementRate) / 100);
    
    // Retention pathway
    const expectedSeparations = Math.round(targetPopulation * ((selectedOrganization?.attritionRate || 5.5) / 100));
    const preventedSeparations = Math.round((engaged * retentionEffectiveness) / 100);
    const avgReplacementCost = selectedOrganization?.replacementCost || 97500;
    const retentionSavings = preventedSeparations * avgReplacementCost;
    
    // Workers comp pathway
    const avgClaimCost = 65000;
    const totalClaimsRate = (selectedOrganization?.workersCompClaims || 3100) / (selectedOrganization?.personnel || 60000);
    const mentalHealthClaimsPct = 0.35;
    const mentalHealthClaimsRate = totalClaimsRate * mentalHealthClaimsPct;
    const expectedMentalHealthClaims = targetPopulation * mentalHealthClaimsRate;
    const claimsPrevented = Math.round(expectedMentalHealthClaims * 0.22);
    const workersCompSavings = claimsPrevented * avgClaimCost;
    
    // Readiness pathway
    const readinessImproved = Math.round(engaged * (readinessPercentage / 100));
    const readinessValue = 15000;
    const readinessSavings = readinessImproved * readinessValue;
    
    // Totals
    const totalSavings = retentionSavings + workersCompSavings + readinessSavings;
    const programCost = seats * costPerSeat;
    const netSavings = totalSavings - programCost;
    const roi = programCost > 0 ? ((netSavings / programCost) * 100).toFixed(0) : 0;
    const baselineRetentionCost = expectedSeparations * avgReplacementCost;
    const afterRetentionCost = (expectedSeparations - preventedSeparations) * avgReplacementCost;
    
    return {
      engaged, expectedSeparations, preventedSeparations, avgReplacementCost, retentionSavings,
      claimsPrevented, workersCompSavings, readinessImproved, readinessSavings,
      totalSavings, programCost, netSavings, roi, baselineRetentionCost, afterRetentionCost
    };
  }, [seats, costPerSeat, engagementRate, retentionEffectiveness, targetPopulation, selectedOrganization, readinessPercentage]);

  const isOFO = selectedOrganization?.id === 'ofo' || selectedOrganization?.type === 'ofo-field';

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen relative">
      <style>{`
        input[type="range"]{-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer;width:100%;height:0.5rem}
        input[type="range"]::-webkit-slider-track{background:#cbd5e1;height:0.5rem;border-radius:0.5rem}
        input[type="range"]::-moz-range-track{background:#cbd5e1;height:0.5rem;border-radius:0.5rem}
        input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;margin-top:-4px;background-color:#003d82;height:1.2rem;width:1.2rem;border-radius:50%;border:3px solid #ffcc00}
        input[type="range"]::-moz-range-thumb{border:none;background-color:#003d82;height:1.2rem;width:1.2rem;border-radius:50%;border:3px solid #ffcc00}
        input[type="range"]:focus{outline:none}
        input[type="range"]::-moz-range-progress{background-color:#0066cc;height:0.5rem;border-radius:0.5rem}
      `}</style>

      <button onClick={() => setShowLanding(true)} className="mb-4 text-[#0066cc] hover:underline font-semibold flex items-center gap-2">
        ← Change Component/Sector/Field Office
      </button>
      
      <button onClick={() => {setShowExecutiveSummary(true); setShowLanding(false);}} className="mb-2 text-gray-600 hover:underline text-sm flex items-center gap-1">
        ← Back to Executive Summary
      </button>

      <div className="bg-[#003d82] text-white rounded-lg shadow-xl p-6 mb-6 border-t-4 border-[#ffcc00]">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-10 h-10 text-[#ffcc00]" />
          <h1 className="text-3xl font-bold">{selectedOrganization ? `${selectedOrganization.name} - ` : ''}BetterUp Workers' Comp & Retention Dashboard</h1>
        </div>
        {selectedOrganization && (
          <p className="text-sm text-gray-300 mb-3">{selectedOrganization.location} ({fmtNum(totalPersonnel)} personnel)</p>
        )}
        <div className="bg-[#0052a3] rounded-lg p-4 border-l-4 border-[#ffcc00] mt-4">
          <p className="text-sm text-gray-200 leading-relaxed">
            This dashboard demonstrates BetterUp's financial impact through dual pathways: <strong className="text-[#ffcc00]">(1) reducing costly federal workers' comp mental health claims</strong> and <strong className="text-[#ffcc00]">(2) preventing high-cost personnel turnover{isOFO && ' ahead of the 2028 retirement crisis'}</strong> through precision resilience development targeting the mindsets and behaviors underlying CBP strategic priorities. Based on 4 years of proven Air Force results, adjust the inputs below to model ROI for {selectedOrganization ? selectedOrganization.name : "your component"}'s specific context.
          </p>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 font-semibold rounded ${activeTab === 'dashboard' ? 'text-white bg-[#0066cc] shadow-md' : 'text-[#003d82] bg-white border-2 border-gray-300'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('details')} className={`px-6 py-2 font-semibold rounded ${activeTab === 'details' ? 'text-white bg-[#0066cc] shadow-md' : 'text-[#003d82] bg-white border-2 border-gray-300'}`}>Model Details</button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="bg-[#003d82] text-white rounded-lg p-6 border-l-4 border-[#ffcc00] shadow-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mb-4">
                  {!editingSeats ? (
                    <>
                      <span className="text-2xl font-bold">BetterUp Seats: {fmtNum(seats)}</span>
                      <button onClick={() => {setEditingSeats(true); setTempSeats(seats);}} className="ml-3 text-[#ffcc00] text-sm underline hover:text-white">Edit</button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold mr-2">BetterUp Seats:</span>
                      <input 
                        type="number" 
                        value={tempSeats} 
                        onChange={(e) => setTempSeats(Number(e.target.value))}
                        className="w-32 px-3 py-1 border border-[#ffcc00] rounded bg-white text-[#003d82] font-bold"
                        min="1000"
                        max="30000"
                      />
                      <button onClick={() => {setSeats(tempSeats); setTargetPopulation(tempSeats); setEditingSeats(false);}} className="px-3 py-1 bg-[#ffcc00] text-[#003d82] rounded font-semibold text-sm hover:bg-[#ffd633]">Save</button>
                      <button onClick={() => setEditingSeats(false)} className="px-3 py-1 bg-gray-600 text-white rounded font-semibold text-sm hover:bg-gray-700">Cancel</button>
                    </div>
                  )}
                </div>
                <div className="mb-1 text-sm"><span className="opacity-90">Total {selectedOrganization?.name || 'CBP'} Population: {fmtNum(totalPersonnel)}</span></div>
                <div className="mb-4 pb-4 border-b border-white/20">
                  {!editingEngagement ? (
                    <>
                      <span className="text-sm">Engagement rate: {engagementRate}%</span>
                      <button onClick={() => {setEditingEngagement(true); setTempEngagement(engagementRate);}} className="ml-3 text-[#ffcc00] text-xs underline hover:text-white">Edit</button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm mr-2">Engagement rate:</span>
                      <input 
                        type="number" 
                        value={tempEngagement} 
                        onChange={(e) => setTempEngagement(Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-[#ffcc00] rounded bg-white text-[#003d82] font-bold text-sm"
                        min="40"
                        max="90"
                      />
                      <span className="text-sm">%</span>
                      <button onClick={() => {setEngagementRate(tempEngagement); setEditingEngagement(false);}} className="px-2 py-1 bg-[#ffcc00] text-[#003d82] rounded font-semibold text-xs hover:bg-[#ffd633]">Save</button>
                      <button onClick={() => setEditingEngagement(false)} className="px-2 py-1 bg-gray-600 text-white rounded font-semibold text-xs hover:bg-gray-700">Cancel</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => setShowImpact(!showImpact)} className="bg-[#ffcc00] hover:bg-[#ffd633] text-[#003d82] font-bold py-3 px-8 rounded text-lg shadow-lg">
                  {showImpact ? 'Hide Impact' : 'Show Impact →'}
                </button>
                <p className="text-xs text-[#ffcc00]">See results for {engagementRate}% engagement rate</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5 shadow-md">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Key Model Parameters</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-3 border border-blue-300">
                    <div className="font-semibold text-blue-900 mb-1">Engagement Rate ({engagementRate}%)</div>
                    <div className="text-blue-800">Controls <strong>how many</strong> personnel actively use BetterUp development</div>
                    <div className="text-xs text-blue-600 mt-1">Example: {fmtNum(targetPopulation)} target × {engagementRate}% = {fmtNum(calculations.engaged)} engaged</div>
                  </div>
                  <div className="bg-white rounded p-3 border border-blue-300">
                    <div className="font-semibold text-blue-900 mb-1">Readiness Rate ({readinessPercentage}%)</div>
                    <div className="text-blue-800">Controls <strong>how much</strong> each engaged person's performance improves</div>
                    <div className="text-xs text-blue-600 mt-1">Auto-calculated from Performance Drivers (Mission Readiness, Resilience, Standards)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showImpact && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 border-3 border-slate-600 rounded-lg p-6 shadow-xl">
                <p className="text-lg text-slate-700">BetterUp saves {selectedOrganization?.name || 'CBP'} <strong className="text-emerald-700">{fmt(calculations.netSavings)}</strong> annually—preventing <strong className="text-slate-800">{fmtNum(calculations.preventedSeparations)} separations</strong> and <strong className="text-slate-800">{fmtNum(calculations.claimsPrevented)} mental health claims</strong>—by building resilience and career commitment.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 border-3 border-slate-600 rounded-lg p-6 shadow-xl">
                  <div className="text-xs text-slate-700 mb-2 font-semibold">Net savings</div>
                  <div className="text-4xl font-bold text-emerald-700">{fmt(calculations.netSavings)}</div>
                  <div className="text-xs text-slate-700 mt-1 font-medium">After program cost</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-[#0066cc] rounded-lg p-6 shadow-xl">
                  <div className="text-xs text-blue-800 mb-2 font-semibold">ROI multiplier</div>
                  <div className="text-4xl font-bold text-blue-900">{(parseFloat(calculations.roi) / 100 + 1).toFixed(1)}×</div>
                  <div className="text-xs text-blue-800 mt-1 font-medium">Return +{calculations.roi}%</div>
                </div>
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 border-3 border-slate-600 rounded-lg p-6 shadow-xl">
                  <div className="text-xs text-slate-700 mb-2 font-semibold">Personnel impacted</div>
                  <div className="text-4xl font-bold text-slate-800">{fmtNum(calculations.preventedSeparations + calculations.readinessImproved)}</div>
                  <div className="text-xs text-slate-700 mt-1 font-medium">Retention & readiness combined</div>
                </div>
              </div>

              {isOFO && (
                <div className="bg-amber-50 border-4 border-amber-500 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">⚠️</div>
                    <h3 className="text-2xl font-bold text-amber-900">2028 OFO Retirement Crisis</h3>
                  </div>
                  <p className="text-amber-900 mb-4">
                    <strong>2,220 CBP Officers</strong> are projected to retire in 2028—a <strong>400% increase</strong> over the normal ~500 per year. Officers hired after July 6, 2008 received enhanced retirement coverage allowing retirement at age 50 with 20 years of service, creating a concentrated retirement wave when the 2008 hiring cohort reaches eligibility.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-amber-400">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-amber-800 mb-1">BetterUp addresses this crisis through:</div>
                        <ul className="text-xs text-amber-700 space-y-1 ml-4">
                          <li>• Career development support at critical decision points</li>
                          <li>• Retirement planning and transition preparation</li>
                          <li>• Purpose and meaning reinforcement</li>
                          <li>• Leadership effectiveness to improve command climate</li>
                        </ul>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-amber-700">Prevented Separations</div>
                        <div className="text-3xl font-bold text-amber-900">{fmtNum(calculations.preventedSeparations)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border-2 border-gray-400 shadow-lg overflow-hidden">
                  <div className="p-4 bg-[#003d82] text-white">
                    <h3 className="font-bold text-lg">Retention Economics</h3>
                    <p className="text-xs text-[#ffcc00] mt-1">Preventing costly separations</p>
                  </div>
                  <div className="p-6 bg-slate-50">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-sm font-medium">Savings</span>
                      <span className="text-3xl font-bold text-[#003d82]">{fmt(calculations.retentionSavings)}</span>
                    </div>
                    <div className="mb-4">
                      <div className="w-full h-8 rounded-full overflow-hidden border-2 border-gray-400 shadow-inner bg-amber-200">
                        <div className="bg-[#003d82] h-full rounded-full" style={{width: `${(calculations.afterRetentionCost / calculations.baselineRetentionCost) * 100}%`}}></div>
                      </div>
                      <div className="flex justify-between items-center text-xs mt-2 font-medium">
                        <span>Before: {fmt(calculations.baselineRetentionCost)}</span>
                        <span>After: {fmt(calculations.afterRetentionCost)}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 text-sm space-y-1 border-2 border-gray-300">
                      <div className="flex justify-between"><span className="text-gray-600">Expected separations:</span><span className="font-semibold">{fmtNum(calculations.expectedSeparations)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Cases prevented:</span><span className="font-semibold text-[#003d82]">{fmtNum(calculations.preventedSeparations)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Retention effectiveness:</span><span className="font-semibold text-[#0066cc]">{retentionEffectiveness}%</span></div>
                      <div className="flex justify-between pt-2 border-t"><span className="font-medium">Total savings:</span><span className="font-bold text-[#003d82]">{fmt(calculations.retentionSavings)}</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border-2 border-gray-400 shadow-lg overflow-hidden">
                  <div className="p-4 bg-[#003d82] text-white">
                    <h3 className="font-bold text-lg">Workers' Comp Claims Reduction</h3>
                    <p className="text-xs text-[#ffcc00] mt-1">Mental health claims only</p>
                  </div>
                  <div className="p-6 bg-slate-50">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-sm font-medium">Savings</span>
                      <span className="text-3xl font-bold text-[#003d82]">{fmt(calculations.workersCompSavings)}</span>
                    </div>
                    <div className="bg-white rounded p-4 text-sm space-y-2 border-2 border-gray-300">
                      <div className="flex justify-between"><span className="text-gray-600">Claims prevented:</span><span className="font-bold">{fmtNum(calculations.claimsPrevented)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Avg claim cost:</span><span className="font-bold">$65,000</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Prevention rate:</span><span className="font-bold text-[#0066cc]">22%</span></div>
                      <div className="text-xs text-gray-500 mt-2 italic">JAMA 2024: 21.6% burnout reduction</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#003d82]">
                <h3 className="text-xl font-bold mb-4">Savings Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between pb-2"><span className="font-medium">Retention savings:</span><span className="text-2xl font-bold text-emerald-600">{fmt(calculations.retentionSavings)}</span></div>
                  <div className="flex justify-between pb-2"><span className="font-medium">Workers' comp savings:</span><span className="text-2xl font-bold text-emerald-600">{fmt(calculations.workersCompSavings)}</span></div>
                  <div className="flex justify-between pb-2"><span className="font-medium">Readiness savings:</span><span className="text-2xl font-bold text-emerald-600">{fmt(calculations.readinessSavings)}</span></div>
                  <div className="flex justify-between pb-2 pt-2 border-t border-gray-300"><span className="font-medium">Total savings:</span><span className="text-2xl font-bold text-emerald-600">{fmt(calculations.totalSavings)}</span></div>
                  <div className="flex justify-between text-sm text-gray-600 pl-4"><span>Program cost:</span><span className="font-semibold text-red-600">-{fmt(calculations.programCost)}</span></div>
                  <div className="text-xs text-gray-500 pl-4 mb-2">{fmtNum(seats)} × ${costPerSeat}/seat</div>
                  <div className="flex justify-between pt-3 border-t-2 border-[#003d82]"><span className="font-bold text-lg">Net savings:</span><span className="text-3xl font-bold text-emerald-600">{fmt(calculations.netSavings)}</span></div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#003d82]">
            <h3 className="text-2xl font-bold mb-2">Performance Drivers Aligned to CBP Priorities</h3>
            <p className="text-sm text-gray-600 mb-4">Air Force proven results from 4 years of data.</p>
            <div className="space-y-4">
              {performanceDrivers.map(d => (
                <div key={d.key} className="border-2 border-blue-200 rounded-lg p-5 bg-blue-50">
                  <div className="mb-4">
                    <h4 className="font-bold text-sm mb-1 text-[#003d82]">{d.priority}</h4>
                    <p className="text-xs text-gray-600">{d.drivers}</p>
                    {d.affectsWorkersComp && <p className="text-xs text-red-700 font-semibold mt-1">🎯 Directly reduces workers' comp mental health claims</p>}
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">{d.baseline}</div>
                      <div className="flex-1 h-10 relative">
                        <div className="absolute w-full h-10 bg-blue-300 rounded-full"></div>
                        <div className="absolute h-10 bg-blue-700 rounded-full" style={{width: `${(d.growth / 70) * 100}%`}}></div>
                      </div>
                      <div className="text-3xl font-bold text-[#003d82]">+{d.improvement}%</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                    <label className="block text-sm font-semibold mb-3">Adjust Priority: +{d.improvement}%</label>
                    <div className="relative h-2">
                      <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>
                      <div className="absolute h-2 bg-[#0066cc] rounded-full" style={{width: `${(d.improvement / 30) * 100}%`}}></div>
                      <input type="range" min="0" max="30" value={d.improvement} onChange={(e) => d.setImprovement(Number(e.target.value))} className="absolute w-full top-0" style={{background: 'transparent'}} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#003d82]">
            <div className="bg-[#003d82] text-white rounded-lg p-4 mb-4">
              <Calculator className="w-5 h-5 text-[#ffcc00] inline mr-2" />
              <h3 className="text-lg font-bold inline">Global Parameters</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-3">Seats: {fmtNum(seats)}</label>
                <div className="relative h-2">
                  <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute h-2 bg-[#0066cc] rounded-full" style={{width: `${((seats - 1000) / 29000) * 100}%`}}></div>
                  <input type="range" min="1000" max="30000" step="100" value={seats} onChange={(e) => {setSeats(Number(e.target.value)); setTargetPopulation(Number(e.target.value));}} className="absolute w-full top-0" style={{background: 'transparent'}} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">Cost/Seat: ${costPerSeat}</label>
                <div className="relative h-2">
                  <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute h-2 bg-[#0066cc] rounded-full" style={{width: `${((costPerSeat - 100) / 200) * 100}%`}}></div>
                  <input type="range" min="100" max="300" step="10" value={costPerSeat} onChange={(e) => setCostPerSeat(Number(e.target.value))} className="absolute w-full top-0" style={{background: 'transparent'}} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3">Engagement: {engagementRate}%</label>
                <div className="relative h-2">
                  <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute h-2 bg-[#0066cc] rounded-full" style={{width: `${((engagementRate - 40) / 50) * 100}%`}}></div>
                  <input type="range" min="40" max="90" value={engagementRate} onChange={(e) => setEngagementRate(Number(e.target.value))} className="absolute w-full top-0" style={{background: 'transparent'}} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#003d82]">
            <div className="bg-[#003d82] text-white rounded-lg p-3 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#ffcc00]" />
              <h4 className="font-semibold">Advanced Settings</h4>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <h5 className="font-semibold mb-3">Scenario Planning</h5>
                <div className="flex gap-2">
                  <button onClick={() => {
                    setEngagementRate(55);
                    setMissionReadinessImprovement(12);
                    setResilienceImprovement(10);
                    setCareerCommitmentImprovement(8);
                    setLeadershipImprovement(7);
                    setStandardsImprovement(6);
                  }} className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 hover:text-white rounded font-medium text-sm">Conservative</button>
                  <button onClick={() => {
                    setEngagementRate(65);
                    setMissionReadinessImprovement(17);
                    setResilienceImprovement(15);
                    setCareerCommitmentImprovement(13);
                    setLeadershipImprovement(12);
                    setStandardsImprovement(10);
                  }} className="flex-1 px-4 py-2 bg-gray-500 text-white rounded font-medium text-sm">Moderate</button>
                  <button onClick={() => {
                    setEngagementRate(75);
                    setMissionReadinessImprovement(25);
                    setResilienceImprovement(23);
                    setCareerCommitmentImprovement(20);
                    setLeadershipImprovement(18);
                    setStandardsImprovement(15);
                  }} className="flex-1 px-4 py-2 bg-[#003d82] text-white rounded font-medium text-sm">Aggressive</button>
                </div>
              </div>
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold">
                    Retention Effectiveness: {retentionEffectiveness}%
                  </label>
                  <button
                    onClick={() => {
                      setManualRetentionOverride(!manualRetentionOverride);
                      if (!manualRetentionOverride) {
                        setManualRetentionValue(retentionEffectiveness);
                      }
                    }}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      manualRetentionOverride 
                        ? 'bg-amber-500 text-white hover:bg-amber-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {manualRetentionOverride ? '🔓 Manual Override ON' : '🔒 Auto-Calculate'}
                  </button>
                </div>
                
                <div className="relative h-2">
                  <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute h-2 bg-[#0066cc] rounded-full" style={{width: `${((retentionEffectiveness - 3) / 22) * 100}%`}}></div>
                  <input 
                    type="range" 
                    min="3" 
                    max="25" 
                    value={manualRetentionOverride ? manualRetentionValue : retentionEffectiveness}
                    onChange={(e) => {
                      if (manualRetentionOverride) {
                        setManualRetentionValue(Number(e.target.value));
                      }
                    }}
                    className="absolute w-full top-0" 
                    style={{
                      background: 'transparent',
                      pointerEvents: manualRetentionOverride ? 'auto' : 'none',
                      cursor: manualRetentionOverride ? 'pointer' : 'not-allowed'
                    }}
                  />
                </div>
                
                {manualRetentionOverride ? (
                  <p className="text-xs text-amber-700 mt-2 font-medium">
                    ⚠️ Manual override active - drag slider to test different effectiveness rates
                  </p>
                ) : (
                  <p className="text-xs text-[#0066cc] mt-2 font-medium">
                    ⚡ Auto-calculated from Performance Drivers (Career Commitment + Leadership)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'details' && (
        <div className="space-y-6">
          
          <div className="bg-blue-50 border-4 border-blue-400 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-10 h-10 text-blue-700" />
              <h2 className="text-3xl font-bold text-blue-900">How to Use This Dashboard</h2>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  Review Dashboard Tab
                </h3>
                <ul className="text-sm text-blue-900 space-y-2 ml-4">
                  <li>• Click <strong>"Show Impact"</strong> to see projected savings</li>
                  <li>• Review retention and workers' comp claim reduction</li>
                  <li>• Adjust sliders in <strong>Performance Drivers</strong> to model priority focus</li>
                  <li>• Use <strong>Scenario Planning</strong> buttons (Conservative/Moderate/Aggressive)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  Challenge Assumptions
                </h3>
                <ul className="text-sm text-blue-900 space-y-2 ml-4">
                  <li>• Scroll through <strong>Model Assumptions</strong> below</li>
                  <li>• Click any assumption section to see sources</li>
                  <li>• Adjust attrition rates if you have sector-specific data</li>
                  <li>• Modify engagement rate based on implementation strategy</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  Understand the Model
                </h3>
                <ul className="text-sm text-blue-900 space-y-2 ml-4">
                  <li>• Review <strong>Evidence & References</strong> for all sources</li>
                  <li>• Understand the dual-pathway methodology</li>
                  <li>• See how Performance Drivers calculate effectiveness rates</li>
                  <li>• Use <strong>Model Assistant</strong> (chat icon) to ask questions</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 border-2 border-blue-300">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  Apply to Your Context
                </h3>
                <ul className="text-sm text-blue-900 space-y-2 ml-4">
                  <li>• Input actual attrition rates from your sector/field office</li>
                  <li>• Model different target populations</li>
                  <li>• Compare OFO vs USBP dynamics</li>
                  <li>• Plan for the 2028 OFO retirement wave</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 mt-6 border-2 border-blue-400">
              <p className="text-sm text-blue-900 text-center">
                <strong>Remember:</strong> These are projections for decision support. Actual results are measured after implementation through BetterUp's people analytics dashboard tracking real behavioral and performance data.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg border-t-4 border-[#0066cc]">
            <h3 className="text-2xl font-bold mb-4">Model Assumptions & Methodology</h3>
            <p className="text-sm text-gray-600 mb-6">This ROI model is built on empirical research and proven Air Force results. All assumptions are documented below with sources.</p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  Attrition Rates
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">OFO (CBP Officers):</span>
                    <span className="font-bold text-[#003d82]">3.5% annually</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">USBP (Border Patrol Agents):</span>
                    <span className="font-bold text-[#003d82]">7.2% annually</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">AMO:</span>
                    <span className="font-bold text-[#003d82]">4.5% annually</span>
                  </div>
                  {isOFO && (
                    <div className="bg-amber-50 rounded p-3 mt-3 border border-amber-400">
                      <div className="text-xs font-semibold text-amber-900 mb-1">⚠️ 2028 OFO Retirement Crisis</div>
                      <div className="text-xs text-amber-800">2,220 officers projected to retire in 2028 (400% increase over ~500/year normal rate)</div>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 mt-3 italic">Source: GAO-24-107029, NTEU congressional testimony (April 2024), DHS workforce reports</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  Replacement Costs
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">OFO Officer:</span>
                    <span className="font-bold text-[#003d82]">$87,300</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">USBP Agent:</span>
                    <span className="font-bold text-[#003d82]">$115,000-$130,000</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Includes:</span>
                    <span className="font-bold text-[#003d82]">Recruiting, FLETC, field training, productivity ramp</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">Source: GAO-24-107029 analysis of CBP recruitment and training pipeline (12+ month cycle)</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  Retention Effectiveness
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Current Rate (Baseline):</span>
                    <span className="font-bold text-[#0066cc]">{retentionEffectiveness}%</span>
                  </div>
                  <p className="text-xs mt-2">Auto-calculated based on Performance Driver configuration:</p>
                  <div className="bg-white rounded p-3 mt-2 border">
                    <div className="text-xs space-y-1">
                      <div>• Base effectiveness: 3%</div>
                      <div>• Career Commitment contribution: +{((careerCommitmentImprovement / 100) * 20).toFixed(1)}% (from {careerCommitmentImprovement}% improvement)</div>
                      <div>• Leadership contribution: +{((leadershipImprovement / 100) * 15).toFixed(1)}% (from {leadershipImprovement}% improvement)</div>
                      <div className="pt-2 border-t font-semibold">• Total: {(3 + (careerCommitmentImprovement / 100) * 20 + (leadershipImprovement / 100) * 15).toFixed(1)}% → rounds to {retentionEffectiveness}%</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">Source: Air Force +20% military commitment, +6% career commitment intent across 11,215 participants (2021-2025). Conservative 7% conversion to actual retention behavior.</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  Workers' Comp Claims Prevention
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Mental Health Claims Reduction:</span>
                    <span className="font-bold text-red-700">22%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Average Claim Cost:</span>
                    <span className="font-bold text-[#003d82]">$65,000</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Targeted Conditions:</span>
                    <span className="font-bold text-[#003d82]">PTSD, Depression, Anxiety, SUD</span>
                  </div>
                  <div className="bg-amber-50 rounded p-3 mt-3 border border-amber-400">
                    <div className="text-xs font-semibold text-amber-900 mb-1">NTEU Data Point</div>
                    <div className="text-xs text-amber-800">156 CBP suicides from 2007-2022 underscore mental health crisis</div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">Source: JAMA 2024 peer-reviewed research (21.6% burnout reduction), NTEU FY2025 budget testimony</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  Mission Readiness Enhancement
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Readiness Improvement (Baseline):</span>
                    <span className="font-bold text-[#0066cc]">{readinessPercentage}%</span>
                  </div>
                  <p className="text-xs mt-2">Auto-calculated based on Performance Driver configuration:</p>
                  <div className="bg-white rounded p-3 mt-2 border">
                    <div className="text-xs space-y-1">
                      <div>• Base readiness: 12%</div>
                      <div>• Mission Readiness contribution: +{((missionReadinessImprovement / 100) * 30).toFixed(1)}% (from {missionReadinessImprovement}% improvement)</div>
                      <div>• Resilience contribution: +{((resilienceImprovement / 100) * 25).toFixed(1)}% (from {resilienceImprovement}% improvement)</div>
                      <div>• Standards contribution: +{((standardsImprovement / 100) * 15).toFixed(1)}% (from {standardsImprovement}% improvement)</div>
                      <div className="pt-2 border-t font-semibold">• Total: {(12 + (missionReadinessImprovement / 100) * 30 + (resilienceImprovement / 100) * 25 + (standardsImprovement / 100) * 15).toFixed(1)}% → rounds to {readinessPercentage}%</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">Source: Air Force +17% mission readiness improvement and +15% resilience gains across 11,215 participants, 77,333 sessions (2021-2025).</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">6</div>
                  Engagement & Utilization
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Engagement Rate:</span>
                    <span className="font-bold text-[#003d82]">{engagementRate}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Cost per Seat:</span>
                    <span className="font-bold text-[#003d82]">${costPerSeat}/year</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Program Seats:</span>
                    <span className="font-bold text-[#003d82]">{fmtNum(seats)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">Assumption: {engagementRate}% of seats are actively utilized. Adjustable based on implementation strategy and deployment approach.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#003d82]">
            <h3 className="text-2xl font-bold mb-4">Evidence & References</h3>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-blue-900 mb-3">Air Force Results (2021-2025)</h4>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Members</div><div className="text-2xl font-bold">11,215</div></div>
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Sessions</div><div className="text-2xl font-bold">77,333</div></div>
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Hours</div><div className="text-2xl font-bold">54,377</div></div>
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Satisfaction</div><div className="text-2xl font-bold">79%</div></div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white rounded p-3 text-center border border-blue-300">
                  <div className="text-2xl font-bold text-blue-900">+17%</div>
                  <div className="text-xs text-blue-800">Mission Readiness</div>
                </div>
                <div className="bg-white rounded p-3 text-center border border-blue-300">
                  <div className="text-2xl font-bold text-blue-900">+6%</div>
                  <div className="text-xs text-blue-800">Career Commitment</div>
                </div>
                <div className="bg-white rounded p-3 text-center border border-blue-300">
                  <div className="text-2xl font-bold text-blue-900">+15%</div>
                  <div className="text-xs text-blue-800">Resilience</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">Key Government Sources:</h5>
                <ul className="text-xs text-gray-700 space-y-1 ml-4">
                  <li>• <strong>GAO-24-107029:</strong> U.S. Customs and Border Protection: Efforts to Improve Recruitment, Hiring, and Retention</li>
                  <li>• <strong>NTEU Testimony (April 2024):</strong> FY 2025 Budget Request for Customs and Border Protection</li>
                  <li>• <strong>JAMA 2024:</strong> Peer-reviewed study on coaching effectiveness for mental health (21.6% burnout reduction)</li>
                  <li>• <strong>DHS OIG Reports:</strong> CBP staffing challenges and workforce optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showAssistant && (
        <button onClick={() => setShowAssistant(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-full shadow-lg flex items-center justify-center z-50">
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {showAssistant && (
        <div className={`fixed right-6 bg-white rounded-lg shadow-2xl z-50 border-2 border-[#0066cc] ${assistantMinimized ? 'bottom-6 w-80' : 'bottom-6 top-24 w-96'}`}>
          <div className="bg-[#0066cc] text-white p-4 rounded-t-lg flex justify-between">
            <div>
              <h3 className="font-bold text-lg">Model Assistant</h3>
              <p className="text-xs opacity-90">Ask about calculations</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setAssistantMinimized(!assistantMinimized)} className="hover:bg-white/20 p-1 rounded">
                <ChevronDown className={`w-5 h-5 ${assistantMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button onClick={() => setShowAssistant(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {!assistantMinimized && (
            <>
              <div className="p-4 h-96 overflow-y-auto bg-gray-50">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-medium text-gray-500 mb-4">Ask anything about the model!</p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((q, i) => (
                        <button key={i} onClick={() => setChatInput(q)} className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded text-sm border">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatMessages.map((m, i) => (
                      <div key={i} className={m.type === 'user' ? 'text-right' : 'text-left'}>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#003d82] rounded-full flex items-center justify-center text-white text-sm font-bold">6</div>
                  Engagement & Utilization
                </h4>
                <div className="ml-10 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Engagement Rate:</span>
                    <span className="font-bold text-[#003d82]">{engagementRate}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-blue-200">
                    <span className="font-medium">Cost per Seat:</span>
                    <span className="font-bold text-[#003d82]">${costPerSeat}/year</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Program Seats:</span>
                    <span className="font-bold text-[#003d82]">{fmtNum(seats)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">Assumption: {engagementRate}% of seats are actively utilized. Adjustable based on implementation strategy and deployment approach.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-[#003d82]">
            <h3 className="text-2xl font-bold mb-4">Evidence & References</h3>
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-blue-900 mb-3">Air Force Results (2021-2025)</h4>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Members</div><div className="text-2xl font-bold">11,215</div></div>
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Sessions</div><div className="text-2xl font-bold">77,333</div></div>
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Hours</div><div className="text-2xl font-bold">54,377</div></div>
                <div className="bg-white rounded p-3 text-center"><div className="text-xs text-gray-600">Satisfaction</div><div className="text-2xl font-bold">79%</div></div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white rounded p-3 text-center border border-blue-300">
                  <div className="text-2xl font-bold text-blue-900">+17%</div>
                  <div className="text-xs text-blue-800">Mission Readiness</div>
                </div>
                <div className="bg-white rounded p-3 text-center border border-blue-300">
                  <div className="text-2xl font-bold text-blue-900">+6%</div>
                  <div className="text-xs text-blue-800">Career Commitment</div>
                </div>
                <div className="bg-white rounded p-3 text-center border border-blue-300">
                  <div className="text-2xl font-bold text-blue-900">+15%</div>
                  <div className="text-xs text-blue-800">Resilience</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">Key Government Sources:</h5>
                <ul className="text-xs text-gray-700 space-y-1 ml-4">
                  <li>• <strong>GAO-24-107029:</strong> U.S. Customs and Border Protection: Efforts to Improve Recruitment, Hiring, and Retention</li>
                  <li>• <strong>NTEU Testimony (April 2024):</strong> FY 2025 Budget Request for Customs and Border Protection</li>
                  <li>• <strong>JAMA 2024:</strong> Peer-reviewed study on coaching effectiveness for mental health (21.6% burnout reduction)</li>
                  <li>• <strong>DHS OIG Reports:</strong> CBP staffing challenges and workforce optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showAssistant && (
        <button onClick={() => setShowAssistant(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-full shadow-lg flex items-center justify-center z-50">
          <MessageCircle className="w-8 h-8" />
        </button>
      )}

      {showAssistant && (
        <div className={`fixed right-6 bg-white rounded-lg shadow-2xl z-50 border-2 border-[#0066cc] ${assistantMinimized ? 'bottom-6 w-80' : 'bottom-6 top-24 w-96'}`}>
          <div className="bg-[#0066cc] text-white p-4 rounded-t-lg flex justify-between">
            <div>
              <h3 className="font-bold text-lg">Model Assistant</h3>
              <p className="text-xs opacity-90">Ask about calculations</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setAssistantMinimized(!assistantMinimized)} className="hover:bg-white/20 p-1 rounded">
                <ChevronDown className={`w-5 h-5 ${assistantMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button onClick={() => setShowAssistant(false)} className="hover:bg-white/20 p-1 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {!assistantMinimized && (
            <>
              <div className="p-4 h-96 overflow-y-auto bg-gray-50">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-medium text-gray-500 mb-4">Ask anything about the model!</p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((q, i) => (
                        <button key={i} onClick={() => setChatInput(q)} className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded text-sm border">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {chatMessages.map((m, i) => (
                      <div key={i} className={m.type === 'user' ? 'text-right' : 'text-left'}>
                        <div className={`inline-block max-w-[80%] p-3 rounded ${m.type === 'user' ? 'bg-[#0066cc] text-white' : 'bg-white border'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} 
                    placeholder="Ask about the model..." 
                    className="flex-1 px-3 py-2 border rounded text-sm" 
                  />
                  <button onClick={handleSendMessage} className="px-4 py-2 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded text-sm font-semibold">
                    Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CBPROICalculator;