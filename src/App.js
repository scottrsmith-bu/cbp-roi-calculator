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

const ExecutiveSummary = ({ onContinue }) => {
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', overflow: 'hidden', border: '8px solid #0066cc' }}>
          
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #003d82 0%, #0066cc 100%)', padding: '48px', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
              <Shield size={64} color="#ffcc00" strokeWidth={2.5} />
              <div>
                <h1 style={{ fontSize: '52px', fontWeight: 'bold', margin: '0 0 12px 0', lineHeight: 1.1 }}>BetterUp CBP Leadership Dashboard</h1>
                <p style={{ fontSize: '24px', color: '#ffcc00', margin: 0, fontWeight: 'bold' }}>FECA Claims & Retention ROI Projections</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px', borderLeft: '5px solid #ffcc00' }}>
              <p style={{ fontSize: '20px', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                <strong style={{ color: '#ffcc00' }}>Evidence-based ROI dashboard</strong> projecting the financial impact of precision resilience development—targeting the mindsets and behaviors that drive DHS/CBP strategic priorities: <strong>Mission Readiness, Officer Safety, Professional Standards, and Career Retention</strong>.
              </p>
              <p style={{ fontSize: '18px', color: '#e0f2fe', margin: 0 }}>
                Built on <strong style={{ color: '#ffcc00' }}>4 years of proven Air Force results</strong> (77K+ sessions, 11K+ participants) and <strong>JAMA 2024 peer-reviewed research</strong> showing 22% reduction in mental health conditions.
              </p>
            </div>
          </div>

          <div style={{ padding: '48px' }}>
            
            {/* What This Tool Provides */}
            <div style={{ background: '#dbeafe', border: '4px solid #3b82f6', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '20px', marginBottom: '20px' }}>
                <div style={{ background: '#3b82f6', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '32px' }}>ℹ️</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e40af', margin: '0 0 16px 0' }}>What This Tool Provides: Projections for Decision Support</h2>
                  <p style={{ fontSize: '18px', color: '#1e3a8a', margin: '0 0 20px 0', lineHeight: 1.7 }}>
                    This dashboard generates <strong>financial projections</strong> based on proven Air Force outcomes and peer-reviewed research applied to CBP FECA claim rates, separation data, and training costs from government sources (GAO, DHS OIG, NTEU testimony). These are <strong>evidence-based forecasts</strong>, not guarantees.
                  </p>
                  
                  <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #60a5fa' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px' }}>Real Results Come After Implementation:</h3>
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {[
                        { num: 1, title: 'Action Layer', text: "BetterUp's Human Transformation Platform delivers virtual, just-in-time resilience development through human expertise, behavioral assessments, personalized learning journeys, and an AI development partner—improving mindsets and behaviors driving retention and operational readiness" },
                        { num: 2, title: 'Sensing Layer', text: 'Real-time people analytics dashboard aggregates anonymized data from pre/post assessments, Reflection Points, and engagement patterns at individual, sector, and organizational levels—providing leadership measurable visibility into wellness, resilience, and retention trends' },
                        { num: 3, title: 'Measured Outcomes', text: 'After program implementation, your sector\'s actual results replace these projections with data from your agents, your teams, your command' }
                      ].map(item => (
                        <div key={item.num} style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ background: '#3b82f6', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '16px', flexShrink: 0 }}>{item.num}</div>
                          <div>
                            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '4px' }}>{item.title}:</div>
                            <div style={{ fontSize: '15px', color: '#1e3a8a', lineHeight: 1.6 }}>{item.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Precision Development */}
            <div style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)', border: '4px solid #64748b', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '20px' }}>
                <div style={{ background: '#475569', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '32px' }}>⚡</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>Why Precision Development vs. Traditional Training?</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #ef4444' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#991b1b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '28px' }}>📚</span>
                        Traditional Training Approach
                      </h3>
                      <ul style={{ fontSize: '16px', color: '#7f1d1d', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                        <li><strong>Event-based:</strong> Annual refreshers, mandatory courses</li>
                        <li><strong>Knowledge transfer:</strong> Teaching what to do</li>
                        <li><strong>Episodic:</strong> One-time interventions</li>
                        <li><strong>Generic curriculum:</strong> Same for everyone</li>
                        <li><strong>Output focus:</strong> Completion certificates</li>
                      </ul>
                    </div>
                    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #10b981' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#065f46', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '28px' }}>🎯</span>
                        BetterUp Human Transformation Platform
                      </h3>
                      <ul style={{ fontSize: '16px', color: '#064e3b', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                        <li><strong>Virtual delivery:</strong> Human expertise + AI partner</li>
                        <li><strong>Just-in-time support:</strong> During critical moments</li>
                        <li><strong>AI role-play:</strong> Use-of-force scenarios, career decisions</li>
                        <li><strong>Personalized learning:</strong> Individual development paths</li>
                        <li><strong>Measured outcomes:</strong> Assessments & Reflection Points</li>
                      </ul>
                    </div>
                  </div>
                  <div style={{ background: '#ecfdf5', borderRadius: '12px', padding: '24px', marginTop: '24px', border: '2px solid #10b981' }}>
                    <p style={{ fontSize: '16px', color: '#065f46', margin: 0, lineHeight: 1.7 }}>
                      <strong style={{ color: '#047857' }}>The Key Difference:</strong> Traditional training teaches <em>what</em> to do. BetterUp's Human Transformation Platform develops the underlying <strong>mindsets and behaviors</strong> (Resilience, Decision-Making, Emotional Regulation, Stress Management) that drive performance across all situations—<strong>delivered virtually with human expertise and AI support</strong>. Unlike mandatory training that produces completion certificates, BetterUp produces <strong>measurable outcomes</strong> through anonymized assessment data and Reflection Points feeding your People Analytics dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Development Partner */}
            <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', border: '4px solid #6366f1', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: '#6366f1', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '32px' }}>🤖</span>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#4338ca', margin: 0 }}>AI Development Partner: Always-Available Support</h2>
              </div>
              <p style={{ fontSize: '18px', color: '#4338ca', marginBottom: '24px', lineHeight: 1.6 }}>
                BetterUp's AI development partner provides agents and officers with 24/7 access to resilience support—critical when facing high-stakes situations:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {[
                  { icon: '🎭', title: 'Role-Play & Rehearsal', text: 'Practice use-of-force scenarios, difficult apprehensions, public interactions before real encounters' },
                  { icon: '⚡', title: 'Critical Incident Support', text: 'Immediate decompression after traumatic events, stress management during high-tempo operations' },
                  { icon: '🎯', title: 'Career Decision Support', text: 'Explore career paths, specialty transitions, retirement planning at critical decision points' },
                  { icon: '📊', title: 'Real-Time Feedback', text: 'Immediate insights on communication strategies, de-escalation techniques, decision-making patterns' }
                ].map((item, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #818cf8' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#4338ca', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      {item.title}
                    </div>
                    <p style={{ fontSize: '15px', color: '#4f46e5', margin: 0, lineHeight: 1.6 }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: '#c7d2fe', borderRadius: '12px', padding: '20px', marginTop: '24px', border: '2px solid #818cf8' }}>
                <p style={{ fontSize: '16px', color: '#3730a3', margin: 0, lineHeight: 1.6 }}>
                  <strong>Virtual + Human Expertise:</strong> The AI development partner complements (not replaces) human expertise—agents and officers get immediate support 24/7, with human experts available for deeper development work and complex challenges.
                </p>
              </div>
            </div>

            {/* Air Force Results */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', textAlign: 'center', marginBottom: '24px' }}>Air Force Proven Results (2021-2025)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: 'DAF Members', value: '11,215' },
                  { label: 'Total Sessions', value: '77,333' },
                  { label: 'Hours Delivered', value: '54,377' },
                  { label: 'Satisfaction', value: '79%' }
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: '+17% Mission Readiness', color: '#3b82f6' },
                  { label: '+6% Career Commitment', color: '#3b82f6' },
                  { label: '+15% Resilience', color: '#3b82f6' }
                ].map((result, i) => (
                  <div key={i} style={{ background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a' }}>{result.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => setShowCommercialResults(!showCommercialResults)}
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '17px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}
                >
                  {showCommercialResults ? '− Hide' : '+ Show'} Commercial Proven Results
                </button>
              </div>
              
              {showCommercialResults && (
                <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', border: '3px solid #7c3aed', borderRadius: '16px', padding: '32px' }}>
                  <h3 style={{ fontSize: '26px', fontWeight: 'bold', color: '#6b21a8', textAlign: 'center', marginBottom: '16px' }}>Enterprise & Federal Proven Results</h3>
                  <p style={{ fontSize: '15px', color: '#7e22ce', textAlign: 'center', fontStyle: 'italic', marginBottom: '24px' }}>Aggregate outcomes across Fortune 500 enterprises and federal agencies (client-confidential)</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {[
                      { value: '+18%', label: 'Leadership Capability', sub: 'Avg across enterprise clients' },
                      { value: '+22%', label: 'Manager Effectiveness', sub: 'Measured via 360° assessments' },
                      { value: '85%', label: 'Client Satisfaction', sub: 'Commercial & government' }
                    ].map((metric, i) => (
                      <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #a78bfa', boxShadow: '0 2px 8px rgba(124,58,237,0.2)' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#6b21a8', marginBottom: '8px' }}>{metric.value}</div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#7e22ce', marginBottom: '4px' }}>{metric.label}</div>
                        <div style={{ fontSize: '13px', color: '#9333ea' }}>{metric.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#c4b5fd', borderRadius: '10px', padding: '16px', marginTop: '24px', border: '2px solid #7c3aed' }}>
                    <p style={{ fontSize: '14px', color: '#581c87', textAlign: 'center', margin: 0 }}>
                      <strong>Note:</strong> Specific client names and detailed metrics available upon request with proper authorization. These aggregate results demonstrate proven impact across multiple sectors including defense, technology, financial services, and federal agencies.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Dual-Pathway Model */}
            <div style={{ background: '#fef3c7', border: '4px solid #f59e0b', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#78350f', marginBottom: '24px' }}>How the Model Works: Dual-Pathway Impact</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '28px', border: '2px solid #78716c' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ background: '#dc2626', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 'bold' }}>1</div>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1c1917', margin: 0 }}>FECA Claims Reduction</h3>
                  </div>
                  <p style={{ fontSize: '16px', color: '#44403c', marginBottom: '16px', lineHeight: 1.6 }}>
                    BetterUp helps agents and officers build resilience to prevent mental health claims (PTSD, depression, anxiety, SUD) that drive FECA costs and operational degradation.
                  </p>
                  <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '16px' }}>
                    <strong style={{ fontSize: '15px', color: '#7f1d1d' }}>Value:</strong>
                    <div style={{ fontSize: '14px', color: '#991b1b', marginTop: '4px', lineHeight: 1.6 }}>22% reduction in mental health claims = lower medical costs, reduced lost time, fewer disability payments</div>
                    <div style={{ fontSize: '12px', color: '#7f1d1d', marginTop: '8px', fontStyle: 'italic' }}>Source: JAMA 2024 peer-reviewed research (21.6% burnout reduction)</div>
                  </div>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '28px', border: '2px solid #78716c' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ background: '#f59e0b', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 'bold' }}>2</div>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1c1917', margin: 0 }}>Retention Economics</h3>
                  </div>
                  <p style={{ fontSize: '16px', color: '#44403c', marginBottom: '16px', lineHeight: 1.6 }}>
                    BetterUp helps agents and officers at critical decision points (3-5 years, 10-15 years, pre-2028 retirement) choose to stay through career clarity, purpose development, and resilience building.
                  </p>
                  <div style={{ background: '#fed7aa', borderRadius: '10px', padding: '16px' }}>
                    <strong style={{ fontSize: '15px', color: '#78350f' }}>Value:</strong>
                    <div style={{ fontSize: '14px', color: '#92400e', marginTop: '4px', lineHeight: 1.6 }}>Each prevented separation avoids $87K-$130K in recruiting, FLETC training, field training, and lost productivity</div>
                    <div style={{ fontSize: '12px', color: '#78350f', marginTop: '8px', fontStyle: 'italic' }}>Source: GAO-24-107029, DHS OIG reports on CBP workforce challenges</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Drivers Explanation */}
            <div style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '4px solid #3b82f6', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: '#3b82f6', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '32px' }}>📊</span>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>How Performance Drivers Work</h2>
              </div>
              <p style={{ fontSize: '18px', color: '#1e40af', marginBottom: '24px', lineHeight: 1.6 }}>
                Performance Driver sliders let you model <strong>how much you prioritize each CBP strategic objective</strong>. Moving these sliders simulates allocating more or less development resources to each area.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #60a5fa' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>🎯</span>
                    What the Sliders Mean
                  </h3>
                  <ul style={{ fontSize: '16px', color: '#1e3a8a', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><strong>High value (15-20%):</strong> Maximum focus—dedicated learning paths, frequent development sessions, AI-assisted practice</li>
                    <li><strong>Medium value (8-14%):</strong> Balanced investment in this area</li>
                    <li><strong>Low value (0-7%):</strong> Minimal focus—resources directed elsewhere</li>
                  </ul>
                </div>
                
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #60a5fa' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>⚡</span>
                    How They Affect ROI
                  </h3>
                  <ul style={{ fontSize: '16px', color: '#1e3a8a', margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                    <li><strong>Mission Readiness, Resilience, Standards</strong> → Drive operational effectiveness and FECA claim reduction</li>
                    <li><strong>Career Commitment, Leadership</strong> → Drive retention and prevent costly turnover</li>
                    <li>Higher slider values = Bigger behavioral improvements = Greater financial impact</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: '#bfdbfe', borderRadius: '12px', padding: '24px', border: '2px solid #3b82f6' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '16px' }}>Example Scenario:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '20px', border: '2px solid #60a5fa' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px' }}>❌ Generic Approach</div>
                    <div style={{ fontSize: '15px', color: '#1e3a8a', marginBottom: '12px', lineHeight: 1.6 }}>All sliders at 10%—spreading resources thin across all priorities</div>
                    <div style={{ fontSize: '14px', color: '#3b82f6' }}><strong>Result:</strong> Moderate gains, no exceptional outcomes</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '10px', padding: '20px', border: '2px solid #60a5fa' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '12px' }}>✅ Focused Approach</div>
                    <div style={{ fontSize: '15px', color: '#1e3a8a', marginBottom: '12px', lineHeight: 1.6 }}>Resilience at 18%, Career Commitment at 16%—targeting FECA crisis and 2028 retirement cliff</div>
                    <div style={{ fontSize: '14px', color: '#10b981' }}><strong>Result:</strong> Maximum impact on mental health claims and retention where it matters most</div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fed7aa', borderRadius: '12px', padding: '20px', marginTop: '24px', border: '2px solid #f59e0b' }}>
                <p style={{ fontSize: '16px', color: '#78350f', margin: 0, lineHeight: 1.6 }}>
                  <strong>💡 Leadership Decision:</strong> Adjust these sliders to match your sector's priorities. If FECA mental health claims are your crisis, max out Resilience. If 2028 retirement cliff threatens operations, prioritize Career Commitment and Leadership. The model shows the financial impact of those strategic choices.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Ready to See Your Sector's Projected Impact?</h2>
              <p style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '32px', lineHeight: 1.6 }}>
                Select your CBP component to model ROI with adjustable parameters specific to your personnel, FECA claim patterns, and retention challenges
              </p>
              <button 
                onClick={onContinue}
                style={{ background: '#ffcc00', color: '#000', border: 'none', padding: '20px 48px', borderRadius: '12px', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,204,0,0.5)', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Select Your Sector →
              </button>
              <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '16px' }}>All data sources documented | Every assumption adjustable | Transparent methodology</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

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
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
const CBPROICalculator = ({ workforce, onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seats, setSeats] = useState(Math.round(workforce.personnel * 0.15));
  const [engagementRate, setEngagementRate] = useState(65);
  const [costPerSeat, setCostPerSeat] = useState(150);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showOnClaimBreakdown, setShowOnClaimBreakdown] = useState(false);
  const [showOffClaimBreakdown, setShowOffClaimBreakdown] = useState(false);
  const [showFactorBreakdown, setShowFactorBreakdown] = useState(false);
  const [expandedFactor, setExpandedFactor] = useState(null);
  
  // NEW: Manual Override State
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
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

  // Effectiveness calculation with manual override
  const retentionEffectiveness = useMemo(() => {
    if (manualRetentionOverride) {
      return manualRetentionValue;
    }
    return drivers.careerCommitment + drivers.leadership;
  }, [drivers.careerCommitment, drivers.leadership, manualRetentionOverride, manualRetentionValue]);
  
  const readinessEffectiveness = drivers.missionReadiness + drivers.resilience + drivers.professionalStandards;

  const calculations = useMemo(() => {
    const engaged = Math.round(seats * (engagementRate / 100));
    const separationsPrevented = Math.round(engaged * (retentionEffectiveness / 100));
    const retentionSavings = separationsPrevented * workforce.replacementCost;
    
    const avgClaimCost = 65000;
    const totalClaimsRate = workforce.workersCompClaims / workforce.personnel;
    const mentalHealthClaimsPct = 0.35;
    const mentalHealthClaimsRate = totalClaimsRate * mentalHealthClaimsPct;
    const expectedMentalHealthClaims = seats * mentalHealthClaimsRate;
    const claimsPrevented = Math.round(expectedMentalHealthClaims * 0.22);
    const fecaSavings = claimsPrevented * avgClaimCost;
    
    const readinessImproved = Math.round(engaged * (readinessEffectiveness / 100));
    const readinessEconomicValue = readinessImproved * 15000;
    
    const totalAnnualSavings = retentionSavings + fecaSavings + readinessEconomicValue;
    const totalCost = seats * costPerSeat;
    const netSavings = totalAnnualSavings - totalCost;
    const roi = Math.round((netSavings / totalCost) * 100);
    const breakEvenMonths = (totalCost / totalAnnualSavings) * 12;
    
    const baselineFecaCost = (claimsPrevented * avgClaimCost) / 0.22;
    const afterFecaCost = baselineFecaCost - fecaSavings;
    const baselineOffClaim = (retentionSavings + readinessEconomicValue) / 0.3;
    const afterOffClaim = baselineOffClaim - (retentionSavings + readinessEconomicValue);
    
    return { 
      engaged, separationsPrevented, retentionSavings, claimsPrevented, fecaSavings, 
      readinessImproved, readinessEconomicValue, totalAnnualSavings, totalCost, 
      netSavings, roi, breakEvenMonths,
      baselineFecaCost, afterFecaCost, baselineOffClaim, afterOffClaim
    };
  }, [seats, engagementRate, workforce, retentionEffectiveness, readinessEffectiveness, costPerSeat]);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '16px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <button 
          onClick={onBack} 
          style={{ marginBottom: '16px', color: '#0066cc', background: 'transparent', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ← Back to Sector Selection
        </button>
        
        <div style={{ background: '#0066cc', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Shield size={40} color="white" />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{workforce.name}</h1>
              <p style={{ color: 'white', margin: '4px 0 0 0', fontSize: '15px' }}>{workforce.personnel.toLocaleString()} Personnel</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0066cc 0%, #0052a3 100%)', borderRadius: '20px', padding: '32px', marginBottom: '32px', border: '3px solid #ffcc00', boxShadow: '0 8px 30px rgba(0,102,204,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#ffcc00', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(255,204,0,0.5)' }}>
              <DollarSign size={32} color="#0066cc" strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: '17px', color: 'white', fontWeight: '600', marginBottom: '4px' }}>NET ANNUAL SAVINGS</div>
              <div style={{ fontSize: '11px', color: '#cbd5e0', marginBottom: '8px' }}>(After program cost)</div>
              <div style={{ fontSize: '52px', fontWeight: 'bold', color: 'white', lineHeight: 1 }}>${(calculations.netSavings / 1000000).toFixed(1)}M</div>
            </div>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '20px', color: '#333', fontWeight: '500', lineHeight: 1.7 }}>
              BetterUp saves {workforce.name} <strong style={{ color: '#0066cc', fontSize: '24px' }}>${(calculations.totalAnnualSavings / 1000000).toFixed(1)}M annually</strong> through 
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
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#00ff88' }}>{(calculations.roi / 100 + 1).toFixed(1)}×</div>
              <div style={{ fontSize: '13px', color: '#cbd5e0', marginTop: '4px' }}>ROI Multiplier</div>
              <div style={{ fontSize: '11px', color: '#a0aec0' }}>Return +{calculations.roi.toLocaleString()}%</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)', borderRadius: '16px', padding: '32px', marginBottom: '24px', border: '1px solid #4a5568' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '34px', fontWeight: 'bold', color: 'white', margin: '0 0 8px 0' }}>BetterUp Seats: {seats.toLocaleString()}</h2>
              <p style={{ color: '#cbd5e0', margin: 0, fontSize: '18px' }}>Population: {workforce.personnel.toLocaleString()}</p>
            </div>
            <button
              onClick={() => {
                const val = prompt('Enter number of seats:', seats);
                if (val && !isNaN(val)) setSeats(parseInt(val));
              }}
              style={{ padding: '14px 32px', borderRadius: '8px', background: '#ffcc00', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#000', fontSize: '17px' }}
            >
              Edit
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
              <label style={{ fontSize: '21px', color: 'white', fontWeight: '600' }}>Engagement Rate: {engagementRate}%</label>
              <button
                onClick={() => {
                  const val = prompt('Enter engagement rate %:', engagementRate);
                  if (val && !isNaN(val) && val >= 0 && val <= 100) setEngagementRate(parseInt(val));
                }}
                style={{ padding: '10px 24px', borderRadius: '6px', border: '1px solid #ffcc00', background: 'transparent', color: '#ffcc00', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
              >
                Edit
              </button>
            </div>
            <p style={{ color: '#cbd5e0', fontSize: '17px', margin: '0 0 8px 0' }}>Controls how many personnel actively use BetterUp development</p>
            <p style={{ color: '#a0aec0', fontSize: '16px', margin: 0 }}>Example: {seats.toLocaleString()} × {engagementRate}% = {calculations.engaged.toLocaleString()} engaged</p>
          </div>

          <div style={{ padding: '24px', background: '#1a202c', borderRadius: '12px', border: '1px solid #4a5568' }}>
            <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Key Model Parameters</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '18px', color: '#cbd5e0', marginBottom: '6px', fontWeight: '600' }}>Engagement Rate ({engagementRate}%)</div>
                <div style={{ fontSize: '16px', color: '#a0aec0', lineHeight: 1.5 }}>Controls <strong style={{ color: 'white' }}>how many</strong> personnel use development</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', color: '#cbd5e0', marginBottom: '6px', fontWeight: '600' }}>Readiness Rate ({readinessEffectiveness}%)</div>
                <div style={{ fontSize: '16px', color: '#a0aec0', lineHeight: 1.5 }}>Controls <strong style={{ color: 'white' }}>how much</strong> performance improves</div>
                <div style={{ fontSize: '15px', color: '#718096', marginTop: '4px' }}>Auto-calculated from Performance Drivers</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', color: '#cbd5e0', marginBottom: '6px', fontWeight: '600' }}>Retention Effectiveness ({retentionEffectiveness}%)</div>
                <div style={{ fontSize: '16px', color: '#a0aec0', lineHeight: 1.5 }}>Prevented separations rate</div>
                <div style={{ fontSize: '15px', color: manualRetentionOverride ? '#fbbf24' : '#718096', marginTop: '4px' }}>
                  {manualRetentionOverride ? '🔓 Manual Override Active' : 'Auto-calculated from Performance Drivers'}
                </div>
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
                { label: 'Total Savings', value: `$${(calculations.totalAnnualSavings / 1000000).toFixed(1)}M`, color: '#0066cc', icon: DollarSign },
                { label: 'Program Cost', value: `$${(calculations.totalCost / 1000000).toFixed(1)}M`, color: '#666', icon: Calculator },
                { label: 'Net Benefit', value: `$${(calculations.netSavings / 1000000).toFixed(1)}M`, color: '#00cc66', icon: TrendingUp },
                { label: 'Break-Even', value: `${calculations.breakEvenMonths.toFixed(1)} months`, color: '#ff9900', icon: Activity }
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} style={{ background: 'white', borderRadius: '12px', padding: '26px', borderLeft: `5px solid ${metric.color}`, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ fontSize: '19px', color: '#666', fontWeight: '600' }}>{metric.label}</div>
                      <Icon size={24} color={metric.color} />
                    </div>
                    <div style={{ fontSize: '42px', fontWeight: 'bold', color: metric.color }}>{metric.value}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#8B4513', margin: '0 0 6px 0' }}>Mental Health FECA Claims</h3>
                  <p style={{ color: '#888', fontSize: '14px', margin: '0 0 12px 0', lineHeight: 1.5 }}>BetterUp targets mental health claims only (PTSD, depression, anxiety, SUD) — approximately 35% of total CBP FECA claims</p>
                  <div style={{ padding: '8px 16px', borderRadius: '20px', background: '#fef3c7', border: '1px solid #d97706', display: 'inline-block' }}>
                    <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Savings </span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#d97706' }}>${(calculations.fecaSavings / 1000000).toFixed(1)}M</span>
                    <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}> (22%)</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#92400e', marginTop: '4px', fontStyle: 'italic' }}>Mental health claims only</div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                    <span>Before: ${(calculations.baselineFecaCost / 1000000).toFixed(1)}M</span>
                    <span>After: ${(calculations.afterFecaCost / 1000000).toFixed(1)}M</span>
                  </div>
                  <div style={{ height: '32px', background: '#fbbf24', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(calculations.afterFecaCost / calculations.baselineFecaCost) * 100}%`, background: '#f97316', borderRadius: '6px' }}></div>
                  </div>
                </div>

                <button onClick={() => setShowOnClaimBreakdown(!showOnClaimBreakdown)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d97706', background: 'white', color: '#d97706', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                  {showOnClaimBreakdown ? 'Hide' : 'Show'} breakdown
                </button>

                {showOnClaimBreakdown && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: 1.5 }}>BetterUp validated effectiveness on mental health conditions. Physical injuries excluded.</p>
                    {[
                      { label: 'PTSD', savings: calculations.fecaSavings * 0.92 },
                      { label: 'Depression', savings: calculations.fecaSavings * 0.064 },
                      { label: 'Anxiety', savings: calculations.fecaSavings * 0.014 },
                      { label: 'SUD', savings: 0 }
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                        <span style={{ color: '#333', fontWeight: '600' }}>{item.label}</span>
                        <span style={{ color: '#d97706', fontWeight: 'bold' }}>${(item.savings / 1000000).toFixed(1)}M</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#8B4513', margin: '0 0 6px 0' }}>Off-Claim Economic Costs</h3>
                  <p style={{ color: '#888', fontSize: '14px', margin: '0 0 12px 0' }}>Productivity loss, absenteeism, and turnover</p>
                  <div style={{ padding: '8px 16px', borderRadius: '20px', background: '#fef3c7', border: '1px solid #d97706', display: 'inline-block' }}>
                    <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Savings </span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#d97706' }}>${((calculations.retentionSavings + calculations.readinessEconomicValue) / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                    <span>Before: ${(calculations.baselineOffClaim / 1000000).toFixed(1)}M</span>
                    <span>After: ${(calculations.afterOffClaim / 1000000).toFixed(1)}M</span>
                  </div>
                  <div style={{ height: '32px', background: '#fbbf24', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(calculations.afterOffClaim / calculations.baselineOffClaim) * 100}%`, background: '#f97316', borderRadius: '6px' }}></div>
                  </div>
                </div>

                <button onClick={() => setShowOffClaimBreakdown(!showOffClaimBreakdown)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d97706', background: 'white', color: '#d97706', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                  {showOffClaimBreakdown ? 'Hide' : 'Show'} breakdown
                </button>

                {showOffClaimBreakdown && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                    {[
                      { label: 'PTSD', pct: 0.672 },
                      { label: 'Depression', pct: 0.172 },
                      { label: 'Anxiety', pct: 0.041 },
                      { label: 'SUD', pct: 0.115 }
                    ].map((item, i) => (
                      <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                        <span style={{ color: '#333', fontWeight: '600' }}>{item.label}</span>
                        <span style={{ color: '#d97706', fontWeight: 'bold' }}>${((calculations.retentionSavings + calculations.readinessEconomicValue) * item.pct / 1000000).toFixed(1)}M</span>
                      </div>
                    ))}
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
                <strong>Retention ({retentionEffectiveness}%):</strong> Conservative conversion from Air Force +20% commitment intent to actual behavioral retention (4% Career + 3% Leadership). Prevents approximately {((calculations.separationsPrevented / (workforce.personnel * workforce.attritionRate / 100)) * 100).toFixed(1)}% of total organizational attrition.
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
                  title: 'Development Effectiveness',
                  color: '#00cc66',
                  content: `Retention: ${retentionEffectiveness}% | Readiness: ${readinessEffectiveness}%. Air Force: +20% commitment, +17% readiness.`,
                  links: [{ url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2816987', label: 'JAMA 2024' }]
                },
                {
                  num: 4,
                  title: 'FECA Mental Health Claims',
                  color: '#ff9900',
                  content: '$65,000 avg claim. 22% prevention rate (JAMA 2024). Model applies BetterUp effectiveness ONLY to mental health claims (PTSD, depression, anxiety, SUD), which represent ~35% of total CBP FECA claims. Physical injury claims are excluded. NTEU reports 156 CBP suicides (2007-2022).',
                  links: [
                    { url: 'https://www.nteu.org/legislative-action/congressional-testimony/fy-2025-budget-request-cbp', label: 'NTEU Testimony' },
                    { url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2816987', label: 'JAMA 2024 Study' }
                  ]
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

            {/* Performance Driver Explanation in Model Details */}
            <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', border: '4px solid #6366f1', borderRadius: '16px', padding: '32px', marginTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: '#6366f1', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '32px' }}>📊</span>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#4338ca', margin: 0 }}>Understanding Performance Drivers & Effectiveness Rates</h2>
              </div>
              
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #818cf8' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4338ca', marginBottom: '16px' }}>How Performance Drivers Work:</h3>
                  <p style={{ fontSize: '16px', color: '#4f46e5', marginBottom: '20px', lineHeight: 1.6 }}>
                    Performance Driver sliders model <strong>how much you prioritize/invest in each CBP strategic objective</strong>. Moving these sliders simulates allocating development resources (learning journeys, development focus, AI partner usage) to different behavioral foundations.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { label: 'High Priority (15-20%)', desc: 'Maximum focus—dedicated learning paths, frequent sessions, AI-assisted practice' },
                      { label: 'Medium Priority (8-14%)', desc: 'Balanced investment—regular development activities' },
                      { label: 'Low Priority (0-7%)', desc: 'Minimal focus—resources directed to higher priorities' }
                    ].map((level, i) => (
                      <div key={i} style={{ background: '#f5f3ff', borderRadius: '8px', padding: '16px', border: '1px solid #c4b5fd' }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#5b21b6', marginBottom: '8px' }}>{level.label}</div>
                        <div style={{ fontSize: '13px', color: '#6b21a8', lineHeight: 1.5 }}>{level.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '2px solid #818cf8' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#4338ca', marginBottom: '16px' }}>The Impact Chain:</h3>
                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#3b82f6', color: 'white', borderRadius: '8px', padding: '12px 16px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', minWidth: '140px' }}>Mission<br/>Resilience<br/>Standards</div>
                      <div style={{ fontSize: '24px', color: '#4338ca' }}>→</div>
                      <div style={{ flex: 1, background: '#dbeafe', border: '2px solid #60a5fa', borderRadius: '8px', padding: '16px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af' }}>Drive Readiness Rate ({readinessEffectiveness}%)</div>
                        <div style={{ fontSize: '13px', color: '#3b82f6', marginTop: '4px' }}>Base + driver contributions = operational performance improvement</div>
                      </div>
                      <div style={{ fontSize: '24px', color: '#4338ca' }}>→</div>
                      <div style={{ background: '#10b981', color: 'white', borderRadius: '8px', padding: '12px 16px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', minWidth: '140px' }}>FECA<br/>Claims<br/>Reduction</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#a855f7', color: 'white', borderRadius: '8px', padding: '12px 16px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', minWidth: '140px' }}>Career<br/>Commitment<br/>Leadership</div>
                      <div style={{ fontSize: '24px', color: '#4338ca' }}>→</div>
                      <div style={{ flex: 1, background: '#f3e8ff', border: '2px solid #c084fc', borderRadius: '8px', padding: '16px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#7e22ce' }}>Drive Retention Effectiveness ({retentionEffectiveness}%)</div>
                        <div style={{ fontSize: '13px', color: '#a855f7', marginTop: '4px' }}>Base + driver contributions = separations prevented</div>
                      </div>
                      <div style={{ fontSize: '24px', color: '#4338ca' }}>→</div>
                      <div style={{ background: '#10b981', color: 'white', borderRadius: '8px', padding: '12px 16px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', minWidth: '140px' }}>Retention<br/>Savings</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fed7aa', borderRadius: '12px', padding: '24px', border: '2px solid #f59e0b' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#78350f', marginBottom: '16px' }}>💡 Strategic Use Case Example:</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px' }}>Scenario: FECA Mental Health Crisis</div>
                      <div style={{ fontSize: '15px', color: '#78350f', marginBottom: '16px', lineHeight: 1.6 }}>Sector Chief says: "We're seeing alarming rates of PTSD claims and suicides—mental health is our #1 priority"</div>
                      <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #f59e0b' }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>Recommended Slider Settings:</div>
                        <ul style={{ fontSize: '13px', color: '#78350f', margin: 0, paddingLeft: '20px', lineHeight: 1.7 }}>
                          <li>Resilience: <strong>18%</strong> (max focus)</li>
                          <li>Mission Readiness: <strong>15%</strong> (high)</li>
                          <li>Career Commitment: <strong>10%</strong> (moderate)</li>
                          <li>Leadership: <strong>8%</strong> (moderate)</li>
                        </ul>
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #fbbf24', fontSize: '13px', color: '#059669', fontWeight: 'bold' }}>
                          Result: Maximum FECA claim reduction, improved operational resilience
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#92400e', marginBottom: '12px' }}>Scenario: 2028 Retirement Cliff</div>
                      <div style={{ fontSize: '15px', color: '#78350f', marginBottom: '16px', lineHeight: 1.6 }}>Leadership says: "2,200 retirements in 2028 will devastate operations—retention is critical"</div>
                      <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #f59e0b' }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>Recommended Slider Settings:</div>
                        <ul style={{ fontSize: '13px', color: '#78350f', margin: 0, paddingLeft: '20px', lineHeight: 1.7 }}>
                          <li>Career Commitment: <strong>16%</strong> (max focus)</li>
                          <li>Leadership: <strong>15%</strong> (high)</li>
                          <li>Resilience: <strong>12%</strong> (moderate)</li>
                          <li>Mission Readiness: <strong>10%</strong> (moderate)</li>
                        </ul>
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #fbbf24', fontSize: '13px', color: '#059669', fontWeight: 'bold' }}>
                          Result: Retention effectiveness jumps to 31%, maximizing prevented separations
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                
                {/* Manual Override Toggle */}
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #cbd5e1' }}>
                  <button
                    onClick={() => {
                      setManualRetentionOverride(!manualRetentionOverride);
                      if (!manualRetentionOverride) {
                        setManualRetentionValue(retentionEffectiveness);
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      background: manualRetentionOverride ? '#f59e0b' : '#e5e7eb',
                      color: manualRetentionOverride ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      width: '100%'
                    }}
                  >
                    {manualRetentionOverride ? '🔓 Manual Override ON' : '🔒 Auto-Calculate Retention'}
                  </button>
                  {manualRetentionOverride && (
                    <div style={{ marginTop: '12px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#78350f', marginBottom: '8px' }}>
                        Manual Retention Rate: {manualRetentionValue}%
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="25"
                        value={manualRetentionValue}
                        onChange={(e) => setManualRetentionValue(parseInt(e.target.value))}
                        style={{ width: '100%', height: '6px', accentColor: '#f59e0b' }}
                      />
                      <p style={{ fontSize: '12px', color: '#92400e', marginTop: '6px', fontStyle: 'italic' }}>
                        ⚠️ Override active - test different effectiveness scenarios
                      </p>
                    </div>
                  )}
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
                Configure prevalence rates, coaching effectiveness, and economic pathways for each mental health factor.
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
                          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>${(totalFactorSavings / 1000000).toFixed(1)}M</div>
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
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: factor.color }}>${(wcClaimSavings / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Off-Claim Savings</div>
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: factor.color }}>${(offClaimSavings / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Total Factor Savings</div>
                              <div style={{ fontSize: '24px', fontWeight: 'bold', color: factor.color }}>${(totalFactorSavings / 1000000).toFixed(1)}M</div>
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
                Adjust the estimated overlap between factors. These overrides are used in the ordered attribution method to prevent double-counting.
              </p>

              <div style={{ display: 'grid', gap: '24px' }}>
                {[
                  { key: 'ptsdDepression', label: 'PTSD → Depression' },
                  { key: 'ptsdAnxiety', label: 'PTSD → Anxiety' },
                  { key: 'ptsdSud', label: 'PTSD → SUD' },
                  { key: 'depressionAnxiety', label: 'Depression → Anxiety' },
                  { key: 'depressionSud', label: 'Depression → SUD' },
                  { key: 'anxietySud', label: 'Anxiety → SUD' }
                ].map(overlap => (
                  <div key={overlap.key} style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '1px solid #ddd' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{overlap.label}</h4>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button onClick={() => setShowAssistant(!showAssistant)} style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#0066cc', color: 'white', padding: '18px', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,102,204,0.4)', zIndex: 999 }}>
          <MessageSquare size={26} />
        </button>

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
                  <li>Why is retention {retentionEffectiveness}%?</li>
                  <li>Explain FECA methodology</li>
                  <li>What are Performance Drivers?</li>
                  <li>How do I use manual override?</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedWorkforce, setSelectedWorkforce] = useState(null);
  
  if (showExecutiveSummary) {
    return <ExecutiveSummary onContinue={() => { setShowExecutiveSummary(false); setShowLanding(true); }} />;
  }
  
  if (showLanding || !selectedWorkforce) {
    return <LandingPage onSelect={(org) => { setSelectedWorkforce(org); setShowLanding(false); }} />;
  }
  
  return <CBPROICalculator workforce={selectedWorkforce} onBack={() => setShowLanding(true)} />;
};

export default App;