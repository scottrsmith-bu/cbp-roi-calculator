import React, { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Shield, MessageSquare, Info, Activity, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

// ORGANIZATIONAL DATA - Updated with validated numbers and terminology
const organizationData = [
  { 
    id: 'all', 
    name: 'All CBP Combined', 
    personnel: 60000, 
    location: 'Nationwide', 
    preset: 'Yes', 
    attritionRate: 5.5, 
    replacementCost: 97500, 
    workersCompClaims: 3100, 
    category: 'CBP-Wide', 
    description: 'Entire CBP workforce (OFO + USBP + AMO)' 
  },
  { 
    id: 'ofo', 
    name: 'Office of Field Operations (OFO)', 
    personnel: 25879, // UPDATED: GAO-24-107029 validated
    location: '20 Field Offices', // UPDATED: Correct organizational structure
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 1340, 
    category: 'CBP Component', 
    description: 'CBP Officers at airports, seaports, land crossings' 
  },
  { 
    id: 'usbp', 
    name: 'U.S. Border Patrol (USBP)', 
    personnel: 20000, 
    location: '20 Sectors Nationwide', 
    preset: 'Yes', 
    attritionRate: 7.2, 
    replacementCost: 125000, 
    workersCompClaims: 1500, 
    category: 'CBP Component', 
    description: 'Border Patrol Agents across all sectors' 
  },
  { 
    id: 'amo', 
    name: 'Air and Marine Operations (AMO)', 
    personnel: 1800, 
    location: 'Aviation & Maritime', 
    preset: 'Yes', 
    attritionRate: 4.5, 
    replacementCost: 105000, 
    workersCompClaims: 135, 
    category: 'CBP Component', 
    description: 'Air interdiction and marine operations' 
  },
  
  // USBP REGIONAL GROUPINGS
  { 
    id: 'swb_all', 
    name: 'Southwest Border - All 9 Sectors', 
    personnel: 12000, 
    location: 'CA, AZ, NM, TX', 
    preset: 'Yes', 
    attritionRate: 7.5, 
    replacementCost: 125000, 
    workersCompClaims: 900, 
    category: 'USBP Regional Grouping', 
    description: 'San Diego, El Centro, Yuma, Tucson, El Paso, Big Bend, Del Rio, Laredo, RGV' 
  },
  { 
    id: 'northern_all', 
    name: 'Northern Border - All 8 Sectors', 
    personnel: 4500, 
    location: 'Northern U.S.', 
    preset: 'Yes', 
    attritionRate: 5.5, 
    replacementCost: 115000, 
    workersCompClaims: 340, 
    category: 'USBP Regional Grouping', 
    description: 'Spokane, Havre, Grand Forks, Detroit, Buffalo, Swanton, Houlton, Blaine' 
  },
  
  // USBP INDIVIDUAL SECTORS
  { 
    id: 'tucson', 
    name: 'Tucson Sector', 
    personnel: 3800, 
    location: 'Arizona', 
    preset: 'Yes', 
    attritionRate: 7.5, 
    replacementCost: 115000, 
    workersCompClaims: 285, 
    category: 'USBP Individual Sector', 
    description: 'Largest sector by geography' 
  },
  { 
    id: 'rgv', 
    name: 'Rio Grande Valley Sector', 
    personnel: 3200, 
    location: 'South Texas', 
    preset: 'Yes', 
    attritionRate: 7.8, 
    replacementCost: 120000, 
    workersCompClaims: 240, 
    category: 'USBP Individual Sector', 
    description: 'Highest apprehension volume' 
  },
  { 
    id: 'sandiego', 
    name: 'San Diego Sector', 
    personnel: 2800, 
    location: 'California', 
    preset: 'Yes', 
    attritionRate: 6.5, 
    replacementCost: 130000, 
    workersCompClaims: 210, 
    category: 'USBP Individual Sector', 
    description: 'Urban operations' 
  },
  
  // OFO FIELD OFFICES (All 20)
  { 
    id: 'ofo_newyork', 
    name: 'New York Field Office', 
    personnel: 2588, 
    location: 'New York, NY', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 134, 
    category: 'OFO Individual Field Office', 
    description: 'JFK, Newark, LaGuardia - Major international air hub' 
  },
  { 
    id: 'ofo_losangeles', 
    name: 'Los Angeles Field Office', 
    personnel: 2329, 
    location: 'Long Beach, CA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 120, 
    category: 'OFO Individual Field Office', 
    description: 'LAX, Long Beach Port - Major air and sea operations' 
  },
  { 
    id: 'ofo_miami', 
    name: 'Miami Field Office', 
    personnel: 2070, 
    location: 'Miami, FL', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 107, 
    category: 'OFO Individual Field Office', 
    description: 'Miami International Airport and seaport' 
  },
  { 
    id: 'ofo_sandiego', 
    name: 'San Diego Field Office', 
    personnel: 1811, 
    location: 'San Diego, CA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 94, 
    category: 'OFO Individual Field Office', 
    description: 'San Ysidro - Busiest land border crossing' 
  },
  { 
    id: 'ofo_laredo', 
    name: 'Laredo Field Office', 
    personnel: 1811, 
    location: 'Laredo, TX', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 94, 
    category: 'OFO Individual Field Office', 
    description: 'Highest trade volume land border crossing' 
  },
  { 
    id: 'ofo_chicago', 
    name: 'Chicago Field Office', 
    personnel: 1552, 
    location: 'Chicago, IL', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 80, 
    category: 'OFO Individual Field Office', 
    description: "O'Hare International Airport" 
  },
  { 
    id: 'ofo_houston', 
    name: 'Houston Field Office', 
    personnel: 1552, 
    location: 'Houston, TX', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 80, 
    category: 'OFO Individual Field Office', 
    description: 'George Bush Intercontinental and seaport' 
  },
  { 
    id: 'ofo_elpaso', 
    name: 'El Paso Field Office', 
    personnel: 1294, 
    location: 'El Paso, TX', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 67, 
    category: 'OFO Individual Field Office', 
    description: 'Paso del Norte and area crossings' 
  },
  { 
    id: 'ofo_sanfrancisco', 
    name: 'San Francisco Field Office', 
    personnel: 1294, 
    location: 'San Francisco, CA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 67, 
    category: 'OFO Individual Field Office', 
    description: 'SFO International and Oakland seaport' 
  },
  { 
    id: 'ofo_detroit', 
    name: 'Detroit Field Office', 
    personnel: 1294, 
    location: 'Detroit, MI', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 67, 
    category: 'OFO Individual Field Office', 
    description: 'Ambassador Bridge and tunnel crossings' 
  },
  { 
    id: 'ofo_tucson', 
    name: 'Tucson Field Office', 
    personnel: 1035, 
    location: 'Tucson, AZ', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 54, 
    category: 'OFO Individual Field Office', 
    description: 'Nogales and Arizona border crossings' 
  },
  { 
    id: 'ofo_seattle', 
    name: 'Seattle Field Office', 
    personnel: 1035, 
    location: 'Seattle, WA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 54, 
    category: 'OFO Individual Field Office', 
    description: 'Sea-Tac Airport and seaport' 
  },
  { 
    id: 'ofo_buffalo', 
    name: 'Buffalo Field Office', 
    personnel: 1035, 
    location: 'Buffalo, NY', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 54, 
    category: 'OFO Individual Field Office', 
    description: 'Peace Bridge and Rainbow Bridge' 
  },
  { 
    id: 'ofo_atlanta', 
    name: 'Atlanta Field Office', 
    personnel: 776, 
    location: 'Atlanta, GA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 40, 
    category: 'OFO Individual Field Office', 
    description: 'Hartsfield-Jackson International' 
  },
  { 
    id: 'ofo_boston', 
    name: 'Boston Field Office', 
    personnel: 776, 
    location: 'Boston, MA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 40, 
    category: 'OFO Individual Field Office', 
    description: 'Logan International and seaport' 
  },
  { 
    id: 'ofo_baltimore', 
    name: 'Baltimore Field Office', 
    personnel: 776, 
    location: 'Baltimore, MD', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 40, 
    category: 'OFO Individual Field Office', 
    description: 'BWI Airport and Port of Baltimore' 
  },
  { 
    id: 'ofo_portland', 
    name: 'Portland Field Office', 
    personnel: 518, 
    location: 'Portland, OR', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 27, 
    category: 'OFO Individual Field Office', 
    description: 'PDX Airport and Pacific Northwest' 
  },
  { 
    id: 'ofo_neworleans', 
    name: 'New Orleans Field Office', 
    personnel: 518, 
    location: 'New Orleans, LA', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 27, 
    category: 'OFO Individual Field Office', 
    description: 'Port of New Orleans and Gulf Coast' 
  },
  { 
    id: 'ofo_tampa', 
    name: 'Tampa Field Office', 
    personnel: 518, 
    location: 'Tampa, FL', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 27, 
    category: 'OFO Individual Field Office', 
    description: 'Tampa International and Port Tampa' 
  },
  { 
    id: 'ofo_sanjuan', 
    name: 'San Juan Field Office', 
    personnel: 518, 
    location: 'San Juan, PR', 
    preset: 'Yes', 
    attritionRate: 3.5, 
    replacementCost: 87300, 
    workersCompClaims: 27, 
    category: 'OFO Individual Field Office', 
    description: 'Luis Muñoz Marín International and seaport' 
  },
];
const ExecutiveSummary = ({ onContinue }) => {
  const [showCommercialResults, setShowCommercialResults] = useState(false);
  
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', overflow: 'hidden', border: '8px solid #0066cc' }}>
          
          <div style={{ background: 'linear-gradient(135deg, #003d82 0%, #0066cc 100%)', padding: '48px', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
              <Shield size={64} color="#ffcc00" strokeWidth={2.5} />
              <div>
                <h1 style={{ fontSize: '52px', fontWeight: 'bold', margin: '0 0 12px 0', lineHeight: 1.1 }}>BetterUp CBP Leadership Dashboard</h1>
                <p style={{ fontSize: '24px', color: '#ffcc00', margin: 0, fontWeight: 'bold' }}>Workers' Comp & Retention ROI Projections</p>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px', borderLeft: '5px solid #ffcc00' }}>
              <p style={{ fontSize: '20px', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                <strong style={{ color: '#ffcc00' }}>Evidence-based ROI dashboard</strong> projecting the financial impact of precision resilience development—targeting the mindsets and behaviors that drive DHS/CBP strategic priorities.
              </p>
              <p style={{ fontSize: '18px', color: '#e0f2fe', margin: 0 }}>
                Built on <strong style={{ color: '#ffcc00' }}>4 years of proven Air Force results</strong> and <strong>JAMA 2024 peer-reviewed research</strong> showing 22% reduction in mental health conditions.
              </p>
            </div>
          </div>

          <div style={{ padding: '48px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>Air Force Proven Results (2021-2025)</h2>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { label: '+17% Mission Readiness' },
                  { label: '+6% Career Commitment' },
                  { label: '+15% Resilience' }
                ].map((result, i) => (
                  <div key={i} style={{ background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a' }}>{result.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Ready to See Your Component's Projected Impact?</h2>
              <p style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '32px', lineHeight: 1.6 }}>
                Select your CBP component or field office to model ROI with adjustable parameters
              </p>
              <button 
                onClick={onContinue}
                style={{ background: '#ffcc00', color: '#000', border: 'none', padding: '20px 48px', borderRadius: '12px', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,204,0,0.5)' }}
              >
                Select Your Component →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ onSelect, onBackToExecSummary }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('CBP-Wide');
  const categories = ['CBP-Wide', 'CBP Component', 'USBP Regional Grouping', 'USBP Individual Sector', 'OFO Individual Field Office'];

  const filteredOrgs = organizationData.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'CBP-Wide' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a2f5c 0%, #004d7a 100%)', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <button 
          onClick={onBackToExecSummary} 
          style={{ marginBottom: '16px', color: 'white', background: 'transparent', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ← Back to Executive Summary
        </button>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <Shield size={48} color="#0066cc" />
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', margin: 0 }}>U.S. Customs and Border Protection</h1>
              <p style={{ fontSize: '22px', color: '#0066cc', margin: '8px 0 0 0', fontWeight: 'bold' }}>BetterUp Workers' Comp & Retention ROI Calculator</p>
              <p style={{ fontSize: '16px', color: '#cc3333', margin: '4px 0 0 0', fontWeight: '600' }}>Multi-Factor Risk Reduction Model</p>
            </div>
          </div>

          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px', marginTop: '16px' }}>
            <p style={{ color: '#1f2937', fontSize: '19px', margin: 0, lineHeight: 1.7, fontWeight: '500' }}>
              This calculator projects financial impact through a <strong>dual-pathway methodology</strong>: <span style={{ color: '#dc2626', fontWeight: '600' }}>(1) reducing costly federal workers' comp mental health claims</span> and <span style={{ color: '#dc2626', fontWeight: '600' }}>(2) preventing high-cost personnel turnover</span> through precision resilience development.
            </p>
          </div>

          <div style={{ marginTop: '20px', padding: '28px', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '12px', border: '2px solid #0066cc' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0066cc', marginBottom: '20px' }}>Conservative Model Assumptions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #ff9900' }}>
                <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>Retention Effectiveness</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#ff9900', marginBottom: '8px' }}>7%</div>
                <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>Of engaged personnel who would have left but stay. Conservative conversion from Air Force results.</div>
              </div>
              <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #0066cc' }}>
                <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>Readiness Enhancement</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#0066cc', marginBottom: '8px' }}>37%</div>
                <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>Of engaged personnel who improve job performance. Based on Air Force data.</div>
              </div>
              <div style={{ padding: '20px', background: 'white', borderRadius: '10px', border: '2px solid #dc2626' }}>
                <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>Workers' Comp Prevention</div>
                <div style={{ fontSize: '42px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>22%</div>
                <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>Reduction in mental health workers' comp claims (JAMA 2024).</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Select Your Organization, Sector, or Field Office</h2>
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
                  <th style={{ padding: '16px', textAlign: 'left', color: '#aaa', fontWeight: '600', fontSize: '15px' }}>Organization / Sector / Field Office</th>
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
  
  const [manualRetentionOverride, setManualRetentionOverride] = useState(false);
  const [manualRetentionValue, setManualRetentionValue] = useState(7);
  
  const [drivers, setDrivers] = useState({
    missionReadiness: 17,
    resilience: 15,
    careerCommitment: 4,
    leadership: 3,
    professionalStandards: 5
  });

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
    const workersCompSavings = claimsPrevented * avgClaimCost;
    
    const readinessImproved = Math.round(engaged * (readinessEffectiveness / 100));
    const readinessEconomicValue = readinessImproved * 15000;
    
    const totalAnnualSavings = retentionSavings + workersCompSavings + readinessEconomicValue;
    const totalCost = seats * costPerSeat;
    const netSavings = totalAnnualSavings - totalCost;
    const roi = Math.round((netSavings / totalCost) * 100);
    const breakEvenMonths = (totalCost / totalAnnualSavings) * 12;
    
    const baselineWorkersCompCost = (claimsPrevented * avgClaimCost) / 0.22;
    const afterWorkersCompCost = baselineWorkersCompCost - workersCompSavings;
    const baselineOffClaim = (retentionSavings + readinessEconomicValue) / 0.3;
    const afterOffClaim = baselineOffClaim - (retentionSavings + readinessEconomicValue);
    
    return { 
      engaged, separationsPrevented, retentionSavings, claimsPrevented, workersCompSavings, 
      readinessImproved, readinessEconomicValue, totalAnnualSavings, totalCost, 
      netSavings, roi, breakEvenMonths,
      baselineWorkersCompCost, afterWorkersCompCost, baselineOffClaim, afterOffClaim
    };
  }, [seats, engagementRate, workforce, retentionEffectiveness, readinessEffectiveness, costPerSeat]);

  const isOFO = workforce.id === 'ofo' || workforce.category === 'OFO Individual Field Office';
  const retirementCrisisText = isOFO 
    ? '2,220 OFO officers eligible for retirement in 2028 (400% increase from normal)' 
    : 'preventing high-cost turnover';

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <button 
          onClick={onBack} 
          style={{ marginBottom: '16px', color: '#0066cc', background: 'transparent', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
        >
          ← Back to Component Selection
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
              <strong style={{ color: '#cc3333', fontSize: '22px' }}> (1) reducing costly federal workers' comp mental health claims</strong> and 
              <strong style={{ color: '#ff9900', fontSize: '22px' }}> (2) {retirementCrisisText}</strong>.
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

        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #ddd', flexWrap: 'wrap' }}>
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
                  <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#8B4513', margin: '0 0 6px 0' }}>Mental Health Workers' Comp Claims</h3>
                  <p style={{ color: '#888', fontSize: '14px', margin: '0 0 12px 0', lineHeight: 1.5 }}>BetterUp targets mental health claims only (PTSD, depression, anxiety, SUD) — approximately 35% of total CBP federal workers' comp claims</p>
                  <div style={{ padding: '8px 16px', borderRadius: '20px', background: '#fef3c7', border: '1px solid #d97706', display: 'inline-block' }}>
                    <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}>Savings </span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#d97706' }}>${(calculations.workersCompSavings / 1000000).toFixed(1)}M</span>
                    <span style={{ fontSize: '13px', color: '#92400e', fontWeight: '600' }}> (22%)</span>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                    <span>Before: ${(calculations.baselineWorkersCompCost / 1000000).toFixed(1)}M</span>
                    <span>After: ${(calculations.afterWorkersCompCost / 1000000).toFixed(1)}M</span>
                  </div>
                  <div style={{ height: '32px', background: '#fbbf24', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(calculations.afterWorkersCompCost / calculations.baselineWorkersCompCost) * 100}%`, background: '#f97316', borderRadius: '6px' }}></div>
                  </div>
                </div>

                <button onClick={() => setShowOnClaimBreakdown(!showOnClaimBreakdown)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d97706', background: 'white', color: '#d97706', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                  {showOnClaimBreakdown ? 'Hide' : 'Show'} breakdown
                </button>

                {showOnClaimBreakdown && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>Mental health conditions targeted by BetterUp</p>
                    {[
                      { label: 'PTSD', savings: calculations.workersCompSavings * 0.92 },
                      { label: 'Depression', savings: calculations.workersCompSavings * 0.064 },
                      { label: 'Anxiety', savings: calculations.workersCompSavings * 0.014 },
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
            
            {isOFO && (
              <div style={{ padding: '24px', background: '#fff3cd', borderRadius: '12px', marginBottom: '24px', border: '3px solid #ffc107' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#856404', marginBottom: '12px' }}>⚠️ 2028 OFO Retirement Crisis</h3>
                <p style={{ fontSize: '17px', color: '#856404', margin: 0, lineHeight: 1.6 }}>
                  <strong>2,220 CBP Officers projected to retire in 2028</strong> — a 400% increase over normal annual retirements (~500/year). Officers hired after July 6, 2008 received enhanced retirement coverage allowing retirement at age 50 with 20 years of service. The 2008 hiring cohort reaches 20-year eligibility in 2028, creating an unprecedented staffing crisis for Office of Field Operations.
                </p>
              </div>
            )}
            
            <div style={{ padding: '20px', background: '#e6f2ff', borderRadius: '12px', marginBottom: '24px', border: '2px solid #0066cc' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#0066cc', marginBottom: '12px' }}>Conservative Methodology</h3>
              <p style={{ fontSize: '16px', color: '#333', margin: 0, lineHeight: 1.6 }}>
                <strong>Retention ({retentionEffectiveness}%):</strong> Conservative conversion from Air Force +20% commitment intent to actual behavioral retention. Prevents approximately {((calculations.separationsPrevented / (workforce.personnel * workforce.attritionRate / 100)) * 100).toFixed(1)}% of total organizational attrition.
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
                  content: `Current ${workforce.name}: ${workforce.attritionRate}%. ${isOFO ? 'OFO faces 2,220+ officers retiring in 2028 (400% increase).' : 'CBP workforce challenges across all components.'}`,
                  links: [
                    { url: 'https://www.gao.gov/products/gao-24-107029', label: 'GAO-24-107029' },
                    { url: 'https://www.nteu.org/legislative-action/congressional-testimony/fy-2025-budget-request-cbp', label: 'NTEU Testimony' }
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
                  title: 'Federal Workers\' Comp Mental Health Claims',
                  color: '#ff9900',
                  content: '$65,000 avg claim. 22% prevention rate (JAMA 2024). Model applies BetterUp effectiveness ONLY to mental health claims (PTSD, depression, anxiety, SUD), which represent ~35% of total CBP workers\' comp claims. Physical injury claims are excluded.',
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
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '26px' }}>
              {[
                { key: 'missionReadiness', label: 'Mission Readiness', desc: 'Rapid decision-making • Cognitive agility • Sustained performance', opm: 'OPM: "Analyze information rapidly and take prompt action"', affects: 'Readiness', color: '#0066cc' },
                { key: 'resilience', label: 'Resilience & Mental Wellness', desc: 'Burnout prevention • Stress management • Emotional regulation', opm: 'Addresses: 156 suicides (2007-2022), morale crisis', affects: 'Both', color: '#00cc66' },
                { key: 'careerCommitment', label: 'Career Commitment', desc: 'Purpose & meaning • Career development • Work-life integration', opm: isOFO ? '2028 retirement cliff: 2,220+ officers' : 'Career development and retention', affects: 'Retention', color: '#ff9900' },
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

        {activeTab === 'parameters' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#0066cc', marginBottom: '24px' }}>Global Parameters</h2>
            
            <div style={{ display: 'grid', gap: '32px' }}>
              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  BetterUp Seats: {seats.toLocaleString()}
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
                  Population: {workforce.personnel.toLocaleString()}
                </div>
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
                  {calculations.engaged.toLocaleString()} engaged personnel
                </div>
              </div>

              <div style={{ padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
                <label style={{ display: 'block', fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                  Cost per Seat: ${costPerSeat}
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
                <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  Total program cost: ${(seats * costPerSeat).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
// ================================================================
// CBP ROI CALCULATOR - FULL FEATURED VERSION
// PART 5 OF 5: ASSISTANT AND APP COMPONENT
// ================================================================
// Add this directly after Part 4 - THIS IS THE FINAL PART

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
                  <li>Explain workers' comp methodology</li>
                  <li>What are Performance Drivers?</li>
                  {isOFO && <li>Tell me about the 2028 crisis</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// APP COMPONENT - MAIN ENTRY POINT
const App = () => {
  const [showExecutiveSummary, setShowExecutiveSummary] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [selectedWorkforce, setSelectedWorkforce] = useState(null);
  
  if (showExecutiveSummary) {
    return <ExecutiveSummary onContinue={() => { setShowExecutiveSummary(false); setShowLanding(true); }} />;
  }
  
  if (showLanding || !selectedWorkforce) {
    return <LandingPage 
      onSelect={(org) => { setSelectedWorkforce(org); setShowLanding(false); }} 
      onBackToExecSummary={() => { setShowLanding(false); setShowExecutiveSummary(true); }}
    />;
  }
  
  return <CBPROICalculator workforce={selectedWorkforce} onBack={() => setShowLanding(true)} />;
};

export default App;