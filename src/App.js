}))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>25%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% of personnel who have this condition</p>
                          </div>

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
                              onChange={(e) => setFactorConfig(prev => ({
                                ...prev,
                                [factor.key]: { ...prev[factor.key], coachingEffectiveness: parseInt(e.target.value) }
                              }))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>40%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% reduction in symptom severity</p>
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
                              onChange={(e) => setFactorConfig(prev => ({
                                ...prev,
                                [factor.key]: { ...prev[factor.key], wcFilingRate: parseInt(e.target.value) }
                              }))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>20%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% of clinical cases who file WC claims</p>
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
                              onChange={(e) => setFactorConfig(prev => ({
                                ...prev,
                                [factor.key]: { ...prev[factor.key], wcAcceptanceRate: parseInt(e.target.value) }
                              }))}
                              style={{ width: '100%', height: '8px', accentColor: factor.color }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginTop: '6px' }}>
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: 1.4 }}>% of filed claims that are accepted</p>
                          </div>
                        </div>

                        <div style={{ padding: '20px', background: 'white', borderRadius: '10px', marginBottom: '20px', border: '2px solid #e0e0e0' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>Economic Pathways</h4>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                Healthcare Cost per Case
                              </label>
                              <input
                                type="number"
                                value={config.healthcareCost}
                                onChange={(e) => setFactorConfig(prev => ({
                                  ...prev,
                                  [factor.key]: { ...prev[factor.key], healthcareCost: parseInt(e.target.value) || 0 }
                                }))}
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
                                onChange={(e) => setFactorConfig(prev => ({
                                  ...prev,
                                  [factor.key]: { ...prev[factor.key], absentDays: parseFloat(e.target.value) || 0 }
                                }))}
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
                                onChange={(e) => setFactorConfig(prev => ({
                                  ...prev,
                                  [factor.key]: { ...prev[factor.key], presenteeismDays: parseFloat(e.target.value) || 0 }
                                }))}
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
                                onChange={(e) => setFactorConfig(prev => ({
                                  ...prev,
                                  [factor.key]: { ...prev[factor.key], otPremium: parseFloat(e.target.value) || 1 }
                                }))}
                                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px' }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#666' }}>
                                Average Wage
                              </label>
                              <input
                                type="number"
                                value={config.avgWage}
                                onChange={(e) => setFactorConfig(prev => ({
                                  ...prev,
                                  [factor.key]: { ...prev[factor.key], avgWage: parseInt(e.target.value) || 0 }
                                }))}
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
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: factor.color }}>${(wcClaimSavings / 1000000).toFixed(2)}M</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Off-Claim Savings</div>
                              <div style={{ fontSize: '20px', fontWeight: 'bold', color: factor.color }}>${(offClaimSavings / 1000000).toFixed(2)}M</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>Total Factor Savings</div>
                              <div style={{ fontSize: '24px', fontWeight: 'bold', color: factor.color }}>${(totalFactorSavings / 1000000).toFixed(2)}M</div>
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
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px', color: '#0066cc' }}>Model Parameters</h2>
            
            <div style={{ display: 'grid', gap: '26px' }}>
              <div style={{ padding: '22px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#333' }}>
                  Program Seats: {seats.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={Math.round(workforce.personnel * 0.05)}
                  max={Math.round(workforce.personnel * 0.3)}
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#0066cc' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#666', marginTop: '10px' }}>
                  <span>{Math.round(workforce.personnel * 0.05).toLocaleString()} (5%)</span>
                  <span>{Math.round(workforce.personnel * 0.15).toLocaleString()} (15%)</span>
                  <span>{Math.round(workforce.personnel * 0.3).toLocaleString()} (30%)</span>
                </div>
              </div>

              <div style={{ padding: '22px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#333' }}>
                  Engagement Rate: {engagementRate}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="85"
                  value={engagementRate}
                  onChange={(e) => setEngagementRate(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#00cc66' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#666', marginTop: '10px' }}>
                  <span>50%</span>
                  <span>65%</span>
                  <span>85%</span>
                </div>
              </div>

              <div style={{ padding: '22px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#333' }}>
                  Cost per Seat: ${costPerSeat}/year
                </label>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="50"
                  value={costPerSeat}
                  onChange={(e) => setCostPerSeat(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: '#ff9900' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#666', marginTop: '10px' }}>
                  <span>$100</span>
                  <span>$200</span>
                  <span>$300</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <li>Why is retention 7%?</li>
                  <li>Explain FECA methodology</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <button onClick={() => setShowAssistant(!showAssistant)} style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#0066cc', color: 'white', padding: '18px', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,102,204,0.4)', zIndex: 999 }}>
          <MessageSquare size={26} />
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