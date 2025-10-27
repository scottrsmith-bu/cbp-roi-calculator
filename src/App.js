import React, { useState, useMemo } from 'react';
import { Shield, Calculator, MessageCircle, X, ChevronDown, Settings, Info } from 'lucide-react';

function CBPROICalculator() {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showImpact, setShowImpact] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMinimized, setAssistantMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  const [editingSeats, setEditingSeats] = useState(false);
  const [editingEngagement, setEditingEngagement] = useState(false);
  const [tempSeats, setTempSeats] = useState(5000);
  const [tempEngagement, setTempEngagement] = useState(65);
  
  const [missionReadinessImprovement, setMissionReadinessImprovement] = useState(17);
  const [resilienceImprovement, setResilienceImprovement] = useState(15);
  const [careerCommitmentImprovement, setCareerCommitmentImprovement] = useState(13);
  const [leadershipImprovement, setLeadershipImprovement] = useState(12);
  const [standardsImprovement, setStandardsImprovement] = useState(10);
  
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
  const [totalPersonnel, setTotalPersonnel] = useState(25879);
  const [targetPopulation, setTargetPopulation] = useState(5000);
  const [seats, setSeats] = useState(5000);
  const [costPerSeat, setCostPerSeat] = useState(150);
  const [engagementRate, setEngagementRate] = useState(65);

  const organizations = [
    {id: 'all', name: 'All CBP Combined', personnel: 60000, location: 'Nationwide', type: 'cbp-wide', preset: 'yes', description: 'Entire CBP workforce', attritionRate: 5.5, replacementCost: 97500, workersCompClaims: 3100},
    {id: 'ofo', name: 'Office of Field Operations (OFO)', personnel: 25879, location: '20 Field Offices', type: 'component', preset: 'yes', highlight: true, description: 'CBP Officers at ports', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 1340},
    {id: 'usbp', name: 'U.S. Border Patrol (USBP)', personnel: 20000, location: '20 Sectors', type: 'component', preset: 'yes', description: 'Border Patrol Agents', attritionRate: 7.2, replacementCost: 125000, workersCompClaims: 1500},
    {id: 'tucson', name: 'Tucson Sector', personnel: 3800, location: 'Arizona', type: 'usbp-sector', preset: 'yes', description: 'Largest USBP sector', attritionRate: 7.5, replacementCost: 115000, workersCompClaims: 285},
    {id: 'ofo_ny', name: 'New York Field Office', personnel: 2588, location: 'NY', type: 'ofo-field', preset: 'yes', description: 'JFK, Newark, LaGuardia', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 134},
    {id: 'ofo_la', name: 'Los Angeles Field Office', personnel: 2329, location: 'CA', type: 'ofo-field', preset: 'yes', description: 'LAX, Long Beach', attritionRate: 3.5, replacementCost: 87300, workersCompClaims: 120},
  ];

  const selectOrganization = (org) => {
    setSelectedOrganization(org);
    setTotalPersonnel(org.personnel);
    setTargetPopulation(Math.round(org.personnel * 0.2));
    setSeats(Math.round(org.personnel * 0.2));
    setShowLanding(false);
    setShowExecutiveSummary(false);
  };

  const retentionEffectiveness = useMemo(() => {
    if (manualRetentionOverride) return manualRetentionValue;
    const base = 3;
    return Math.round(base + (careerCommitmentImprovement / 100) * 20 + (leadershipImprovement / 100) * 15);
  }, [careerCommitmentImprovement, leadershipImprovement, manualRetentionOverride, manualRetentionValue]);

  const readinessPercentage = useMemo(() => {
    const base = 12;
    return Math.round(base + (missionReadinessImprovement / 100) * 30 + (resilienceImprovement / 100) * 25 + (standardsImprovement / 100) * 15);
  }, [missionReadinessImprovement, resilienceImprovement, standardsImprovement]);

  const calculations = useMemo(() => {
    const org = selectedOrganization || organizations[0];
    const engaged = Math.round((targetPopulation * engagementRate) / 100);
    const expectedSeparations = Math.round(targetPopulation * (org.attritionRate / 100));
    const preventedSeparations = Math.round((engaged * retentionEffectiveness) / 100);
    const retentionSavings = preventedSeparations * org.replacementCost;
    const avgClaimCost = 65000;
    const totalClaimsRate = org.workersCompClaims / org.personnel;
    const mentalHealthClaimsRate = totalClaimsRate * 0.35;
    const expectedClaims = targetPopulation * mentalHealthClaimsRate;
    const claimsPrevented = Math.round(expectedClaims * 0.22);
    const workersCompSavings = claimsPrevented * avgClaimCost;
    const readinessImproved = Math.round(engaged * (readinessPercentage / 100));
    const readinessSavings = readinessImproved * 15000;
    const totalSavings = retentionSavings + workersCompSavings + readinessSavings;
    const programCost = seats * costPerSeat;
    const netSavings = totalSavings - programCost;
    const roi = programCost > 0 ? ((netSavings / programCost) * 100).toFixed(0) : 0;
    const baselineRetentionCost = expectedSeparations * org.replacementCost;
    const afterRetentionCost = (expectedSeparations - preventedSeparations) * org.replacementCost;
    
    return {engaged, expectedSeparations, preventedSeparations, retentionSavings, claimsPrevented, workersCompSavings, readinessImproved, readinessSavings, totalSavings, programCost, netSavings, roi, baselineRetentionCost, afterRetentionCost};
  }, [seats, costPerSeat, engagementRate, retentionEffectiveness, targetPopulation, selectedOrganization, readinessPercentage]);

  const fmt = (v) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(v);
  const fmtNum = (v) => new Intl.NumberFormat('en-US').format(v);

  const isOFO = selectedOrganization?.id === 'ofo' || selectedOrganization?.type === 'ofo-field';

  const performanceDrivers = [
    {key: 'mission', priority: "ENHANCING MISSION READINESS", drivers: "Rapid Decision-Making • Cognitive Agility • Sustained Performance", baseline: 45, growth: 62, improvement: missionReadinessImprovement, setImprovement: setMissionReadinessImprovement, affectsReadiness: true, impact: "Drives operational performance in high-pressure situations"},
    {key: 'resilience', priority: "STRENGTHENING RESILIENCE & MENTAL WELLNESS", drivers: "Burnout Prevention • Stress Management • Emotional Regulation", baseline: 47, growth: 62, improvement: resilienceImprovement, setImprovement: setResilienceImprovement, affectsReadiness: true, affectsWorkersComp: true, impact: "Reduces mental health claims and improves performance"},
    {key: 'career', priority: "INCREASING CAREER COMMITMENT", drivers: "Purpose & Meaning • Career Development • Work-Life Integration", baseline: 48, growth: 54, improvement: careerCommitmentImprovement, setImprovement: setCareerCommitmentImprovement, affectsRetention: true, impact: "Critical for 2028 OFO retirement cliff"},
    {key: 'leadership', priority: "IMPROVING LEADERSHIP EFFECTIVENESS", drivers: "Communication • Strategic Thinking • Empowerment • Active Listening", baseline: 50, growth: 56, improvement: leadershipImprovement, setImprovement: setLeadershipImprovement, affectsRetention: true, impact: "Enhances command climate and retention"},
    {key: 'standards', priority: "MAINTAINING PROFESSIONAL STANDARDS", drivers: "Ethical Decision-Making • Sound Judgment • Professional Demeanor", baseline: 49, growth: 59, improvement: standardsImprovement, setImprovement: setStandardsImprovement, affectsReadiness: true, impact: "Strengthens CBP Standards of Conduct compliance"}
  ];

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;
    if (searchTerm) filtered = filtered.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.description.toLowerCase().includes(searchTerm.toLowerCase()) || org.location.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterType !== 'all' && filterType !== 'preset') filtered = filtered.filter(org => org.type === filterType);
    if (filterType === 'preset') filtered = filtered.filter(org => org.preset === 'yes');
    return filtered.sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : b.personnel - a.personnel);
  }, [searchTerm, filterType, sortBy]);

  const suggestedQuestions = ["How is the net savings calculated?", "Why is OFO facing a retirement crisis in 2028?", "Explain the dual-pathway model", "What are workers' comp claims?", "How do Performance Drivers affect ROI?"];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, {type: 'user', text: chatInput}, {type: 'assistant', text: `Based on ${selectedOrganization?.name || 'CBP'}: ${chatInput}`}]);
    setChatInput('');
  };

  if (showExecutiveSummary) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#0066cc]">
          <div className="bg-gradient-to-r from-[#003d82] to-[#0066cc] text-white p-12">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-16 h-16 text-[#ffcc00]" />
              <div>
                <h1 className="text-5xl font-bold mb-2">BetterUp CBP Leadership Dashboard</h1>
                <p className="text-xl text-[#ffcc00]">Workers' Comp & Retention ROI</p>
              </div>
            </div>
          </div>
          <div className="p-12">
            <button onClick={() => {setShowExecutiveSummary(false); setShowLanding(true);}} className="bg-[#ffcc00] hover:bg-[#ffd633] text-[#003d82] font-bold py-4 px-12 rounded-lg text-xl shadow-xl">Select Your Component →</button>
          </div>
        </div>
      </div>
    );
  }

  if (showLanding) {
    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <button onClick={() => {setShowExecutiveSummary(true); setShowLanding(false);}} className="mb-4 text-gray-600 hover:underline">← Back</button>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-[#0066cc]">
          <div className="bg-[#003d82] text-white p-8">
            <h1 className="text-4xl font-bold">Select Your Component</h1>
          </div>
          <div className="p-8">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 border-2 rounded-lg mb-6"/>
            <div className="space-y-2">
              {filteredOrganizations.map((org) => (
                <div key={org.id} className="bg-white border-2 rounded-lg p-4 hover:bg-blue-50 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg text-[#003d82]">{org.name}</div>
                    <div className="text-sm text-gray-600">{org.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{fmtNum(org.personnel)} personnel</div>
                    {org.id === 'ofo' && <div className="text-xs text-red-700 font-bold mt-1">⚠️ 2,220 officers retiring 2028</div>}
                  </div>
                  <button onClick={() => selectOrganization(org)} className="bg-[#0066cc] text-white px-6 py-2 rounded font-semibold">Select</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <button onClick={() => setShowLanding(true)} className="mb-4 text-[#0066cc] hover:underline font-semibold">← Change Component</button>

      <div className="bg-[#003d82] text-white rounded-lg shadow-xl p-6 mb-6">
        <h1 className="text-3xl font-bold">{selectedOrganization?.name || 'CBP'} Dashboard</h1>
        <p className="text-sm text-gray-300 mt-2">{fmtNum(totalPersonnel)} personnel</p>
      </div>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 font-semibold rounded ${activeTab === 'dashboard' ? 'bg-[#0066cc] text-white' : 'bg-white border-2'}`}>Dashboard</button>
        <button onClick={() => setActiveTab('details')} className={`px-6 py-2 font-semibold rounded ${activeTab === 'details' ? 'bg-[#0066cc] text-white' : 'bg-white border-2'}`}>Model Details</button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="bg-[#003d82] text-white rounded-lg p-6">
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold mb-2">Seats: {fmtNum(seats)}</div>
                <div className="text-sm">Engagement: {engagementRate}%</div>
              </div>
              <button onClick={() => setShowImpact(!showImpact)} className="bg-[#ffcc00] text-[#003d82] font-bold py-3 px-8 rounded">{showImpact ? 'Hide' : 'Show'} Impact</button>
            </div>
          </div>

          {showImpact && (
            <div className="space-y-4">
              <div className="bg-slate-100 border-2 rounded-lg p-6">
                <p className="text-lg">BetterUp saves <strong className="text-emerald-700">{fmt(calculations.netSavings)}</strong> annually</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border-2 rounded-lg p-6">
                  <div className="text-xs mb-2">Net Savings</div>
                  <div className="text-4xl font-bold text-emerald-700">{fmt(calculations.netSavings)}</div>
                </div>
                <div className="bg-blue-100 border-4 border-[#0066cc] rounded-lg p-6">
                  <div className="text-xs mb-2">ROI</div>
                  <div className="text-4xl font-bold">{(parseFloat(calculations.roi) / 100 + 1).toFixed(1)}×</div>
                </div>
                <div className="bg-white border-2 rounded-lg p-6">
                  <div className="text-xs mb-2">Personnel</div>
                  <div className="text-4xl font-bold">{fmtNum(calculations.preventedSeparations + calculations.readinessImproved)}</div>
                </div>
              </div>

              {isOFO && (
                <div className="bg-amber-50 border-4 border-amber-500 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-amber-900">⚠️ 2028 Crisis</h3>
                  <p className="text-amber-900"><strong>2,220 officers</strong> retiring (400% increase)</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-2 p-6 rounded-lg">
                  <h3 className="font-bold mb-2">Retention</h3>
                  <div className="text-3xl font-bold text-[#003d82]">{fmt(calculations.retentionSavings)}</div>
                  <div className="text-sm mt-2">Prevented: {fmtNum(calculations.preventedSeparations)}</div>
                </div>
                <div className="bg-white border-2 p-6 rounded-lg">
                  <h3 className="font-bold mb-2">Workers' Comp</h3>
                  <div className="text-3xl font-bold text-[#003d82]">{fmt(calculations.workersCompSavings)}</div>
                  <div className="text-sm mt-2">Claims: {fmtNum(calculations.claimsPrevented)}</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2">
                <h3 className="text-xl font-bold mb-4">Performance Drivers</h3>
                <div className="space-y-4">
                  {performanceDrivers.map(d => (
                    <div key={d.key} className="border-2 rounded-lg p-4 bg-blue-50">
                      <h4 className="font-bold text-sm mb-1">{d.priority}</h4>
                      <p className="text-xs text-gray-600 mb-2">{d.drivers}</p>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">{d.baseline}</div>
                        <div className="flex-1 h-8 relative">
                          <div className="absolute w-full h-8 bg-blue-300 rounded-full"></div>
                          <div className="absolute h-8 bg-blue-700 rounded-full" style={{width: `${(d.growth / 70) * 100}%`}}></div>
                        </div>
                        <div className="text-2xl font-bold">+{d.improvement}%</div>
                      </div>
                      <input type="range" min="0" max="30" value={d.improvement} onChange={(e) => d.setImprovement(Number(e.target.value))} className="w-full"/>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2">
                <h3 className="text-xl font-bold mb-4">Parameters</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-2">Seats: {fmtNum(seats)}</label>
                    <input type="range" min="1000" max="30000" step="100" value={seats} onChange={(e) => {setSeats(Number(e.target.value)); setTargetPopulation(Number(e.target.value));}} className="w-full"/>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Engagement: {engagementRate}%</label>
                    <input type="range" min="40" max="90" value={engagementRate} onChange={(e) => setEngagementRate(Number(e.target.value))} className="w-full"/>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2">
                <h3 className="text-xl font-bold mb-4">Scenario Planning</h3>
                <div className="flex gap-2">
                  <button onClick={() => {setEngagementRate(55); setMissionReadinessImprovement(12); setResilienceImprovement(10); setCareerCommitmentImprovement(8); setLeadershipImprovement(7); setStandardsImprovement(6);}} className="flex-1 px-4 py-2 bg-gray-300 rounded">Conservative</button>
                  <button onClick={() => {setEngagementRate(65); setMissionReadinessImprovement(17); setResilienceImprovement(15); setCareerCommitmentImprovement(13); setLeadershipImprovement(12); setStandardsImprovement(10);}} className="flex-1 px-4 py-2 bg-gray-500 text-white rounded">Moderate</button>
                  <button onClick={() => {setEngagementRate(75); setMissionReadinessImprovement(25); setResilienceImprovement(23); setCareerCommitmentImprovement(20); setLeadershipImprovement(18); setStandardsImprovement(15);}} className="flex-1 px-4 py-2 bg-[#003d82] text-white rounded">Aggressive</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'details' && (
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Model Assumptions</h2>
          <div className="space-y-4">
            <div className="border-2 rounded-lg p-4">
              <h4 className="font-bold mb-2">Attrition Rates</h4>
              <div className="text-sm">OFO: 3.5% | USBP: 7.2%</div>
              {isOFO && <div className="text-red-700 font-bold mt-2">⚠️ 2028: 2,220 officers retiring</div>}
            </div>
            <div className="border-2 rounded-lg p-4">
              <h4 className="font-bold mb-2">Sources</h4>
              <div className="text-xs">• GAO-24-107029 • JAMA 2024 • NTEU</div>
            </div>
          </div>
        </div>
      )}

      {!showAssistant && (
        <button onClick={() => setShowAssistant(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-[#0066cc] text-white rounded-full shadow-lg flex items-center justify-center">
          <MessageCircle className="w-8 h-8"/>
        </button>
      )}

      {showAssistant && (
        <div className="fixed right-6 bottom-6 bg-white rounded-lg shadow-2xl border-2 border-[#0066cc] w-96">
          <div className="bg-[#0066cc] text-white p-4 rounded-t-lg flex justify-between">
            <h3 className="font-bold">Model Assistant</h3>
            <button onClick={() => setShowAssistant(false)} className="hover:bg-white/20 p-1 rounded"><X className="w-5 h-5"/></button>
          </div>
          <div className="p-4 h-96 bg-gray-50">
            {chatMessages.length === 0 ? (
              <div className="text-center py-8">
                <p className="font-medium text-gray-500 mb-4">Ask anything!</p>
                {suggestedQuestions.map((q, i) => (
                  <button key={i} onClick={() => setChatInput(q)} className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded text-sm border mb-2">{q}</button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {chatMessages.map((m, i) => (
                  <div key={i} className={m.type === 'user' ? 'text-right' : 'text-left'}>
                    <div className={`inline-block max-w-[80%] p-3 rounded ${m.type === 'user' ? 'bg-[#0066cc] text-white' : 'bg-white border'}`}>{m.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Ask..." className="flex-1 px-3 py-2 border rounded text-sm"/>
            <button onClick={handleSendMessage} className="px-4 py-2 bg-[#0066cc] text-white rounded text-sm">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CBPROICalculator;