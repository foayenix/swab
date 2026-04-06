import { useState } from 'react';
import { FORMULATIONS, PATIENTS, COLORS } from '../data';

const NAV = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'vault', icon: '🌿', label: 'My vault', badge: '43' },
  { id: 'patients', icon: '👥', label: 'Patients' },
  { id: 'outcomes', icon: '📈', label: 'Outcomes' },
  { id: 'community', icon: '👨‍👩‍👧', label: 'Community' },
  { id: 'reports', icon: '📄', label: 'Practice reports' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

function getOutcomeSegments(outcomes) {
  return [
    { key: 'recovered', label: 'Recovered', color: COLORS.forest, value: outcomes.recovered },
    { key: 'improved', label: 'Improved', color: '#4ADE80', value: outcomes.improved },
    { key: 'noChange', label: 'No change', color: COLORS.gold, value: outcomes.noChange },
    { key: 'worsened', label: 'Worsened', color: COLORS.terra, value: outcomes.worsened },
  ];
}

function DashboardView({ onOpenVault, onOpenPatient, onOpenFormulation, onOpenPatients }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          type="button"
          onClick={onOpenPatient}
          style={{
            textAlign: 'left',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(27,107,58,0.12)',
            background: 'rgba(27,107,58,0.06)',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>✅</span>
          <span style={{ fontSize: 12, lineHeight: 1.5 }}>
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Patient #47</strong> — Day 7 check-in: fever broke, appetite returned. Agbo Iba.
            <span style={{ display: 'block', marginTop: 4, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>2 hours ago</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenFormulation}
          style={{
            textAlign: 'left',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(184,134,11,0.12)',
            background: 'rgba(184,134,11,0.06)',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>🔬</span>
          <span style={{ fontSize: 12, lineHeight: 1.5 }}>
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Research interest:</strong> University of Ibadan flagged Omi Isu Diabetis. 2 researchers interested.
            <span style={{ display: 'block', marginTop: 4, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Yesterday</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenPatients}
          style={{
            textAlign: 'left',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>📋</span>
          <span style={{ fontSize: 12, lineHeight: 1.5 }}>
            3 patients due for follow-up today. <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Patient #51</strong> (Day 3), <strong style={{ color: 'rgba(255,255,255,0.85)' }}>#44</strong> (Day 7), <strong style={{ color: 'rgba(255,255,255,0.85)' }}>#39</strong> (Day 14 final).
            <span style={{ display: 'block', marginTop: 4, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Scheduled</span>
          </span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: COLORS.forest }}>43</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Formulations in vault</div>
          <div style={{ marginTop: 4, fontSize: 11, color: COLORS.forest, fontWeight: 600 }}>+3 this month</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#fff' }}>284</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Patients tracked</div>
          <div style={{ marginTop: 4, fontSize: 11, color: COLORS.forest, fontWeight: 600 }}>+18 this month</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: COLORS.forest }}>87%</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Overall effectiveness</div>
          <div style={{ marginTop: 4, fontSize: 11, color: COLORS.forest, fontWeight: 600 }}>Across all formulations</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: COLORS.gold }}>4.1</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Avg days to recovery</div>
          <div style={{ marginTop: 4, fontSize: 11, color: COLORS.forest, fontWeight: 600 }}>Fever formulations</div>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 16px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'rgba(255,255,255,0.45)' }}>
            Top formulations by outcomes
          </div>
          <button
            type="button"
            onClick={onOpenVault}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.forest,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            See all 43 →
          </button>
        </div>

        {FORMULATIONS.map((formulation, index) => {
          const segments = getOutcomeSegments(formulation.outcomes);
          const effectivenessColor = formulation.effectiveness >= 80 ? COLORS.forest : formulation.effectiveness >= 70 ? COLORS.gold : 'rgba(255,255,255,0.5)';

          return (
            <button
              key={formulation.id}
              type="button"
              onClick={() => onOpenFormulation(formulation.id)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: index === FORMULATIONS.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                padding: '10px 0',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(27,107,58,${0.08 + (index % 3) * 0.04})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  {index % 2 === 0 ? '🌿' : '🍯'}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{formulation.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{formulation.conditions.join(', ')} · {formulation.ingredients.length} ingredients</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: effectivenessColor }}>{formulation.effectiveness}%</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{formulation.tracked} tracked</div>
                </div>
              </div>

              <div style={{ marginTop: 8, display: 'flex', gap: 2, height: 20, borderRadius: 6, overflow: 'hidden' }}>
                {segments.map((segment) => (
                  <div
                    key={segment.key}
                    style={{
                      width: `${segment.value}%`,
                      background: segment.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 9,
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    {segment.value >= 12 ? `${segment.value}%` : ''}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 6, display: 'flex', gap: 12, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                <span>● Recovered</span>
                <span>● Improved</span>
                <span>● No change</span>
                <span>● Worsened</span>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>HTSN community — Lagos chapter</div>
          <button
            type="button"
            style={{ background: 'none', border: 'none', color: COLORS.forest, fontSize: 12, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            View full →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginBottom: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#fff' }}>214</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Active practitioners</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: '#fff' }}>8,420</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Total formulations</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 10, padding: 10 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: COLORS.forest }}>84%</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Avg effectiveness</div>
          </div>
        </div>

        <p style={{ fontSize: 12, lineHeight: 1.55, color: 'rgba(255,255,255,0.35)' }}>
          Aggregated across all members. Individual formulations remain private unless shared. These numbers can be shown to regulators, health authorities, and partners.
        </p>
      </div>
    </div>
  );
}

export default function PractitionerView() {
  const [subView, setSubView] = useState('dashboard');
  const [selectedFormulation, setSelectedFormulation] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patientExists = PATIENTS.some((patient) => patient.id === 'p47');

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        <aside style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20, alignSelf: 'start' }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS.forest, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
              BA
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 4 }}>Baba Adeyemi</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Lagos, Nigeria · HTSN Member</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV.map((item) => {
              const active = subView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSubView(item.id);
                    setSelectedFormulation(null);
                    setSelectedPatient(null);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    background: active ? 'rgba(27,107,58,0.08)' : 'transparent',
                    color: active ? COLORS.forest : 'rgba(255,255,255,0.65)',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textAlign: 'left',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span style={{ marginLeft: 'auto', padding: '2px 7px', borderRadius: 999, fontSize: 10, border: '1px solid rgba(27,107,58,0.3)', color: COLORS.forest, background: 'rgba(27,107,58,0.1)' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        <section>
          {subView === 'dashboard' ? (
            <DashboardView
              onOpenVault={() => {
                setSubView('vault');
                setSelectedFormulation(null);
                setSelectedPatient(null);
              }}
              onOpenPatient={() => {
                if (patientExists) {
                  setSelectedPatient('p47');
                }
              }}
              onOpenFormulation={(id = 'f2') => setSelectedFormulation(id)}
              onOpenPatients={() => {
                setSubView('patients');
                setSelectedFormulation(null);
                setSelectedPatient(null);
              }}
            />
          ) : (
            <div style={{ padding: 40, color: 'rgba(255,255,255,0.3)' }}>Coming in next phase</div>
          )}
        </section>
      </div>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 16, color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(27,107,58,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>🌿</span> Practitioners</span>
        <span style={{ color: 'rgba(27,107,58,0.6)' }}>→</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>📊</span> Outcome data</span>
        <span style={{ color: 'rgba(184,134,11,0.6)' }}>→</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(45,75,142,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>🔬</span> Research</span>
        <span style={{ color: 'rgba(45,75,142,0.7)' }}>→</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✅</span> Validation</span>
        <span style={{ color: 'rgba(255,255,255,0.28)' }}>→</span>
        <span style={{ color: 'rgba(255,255,255,0.55)' }}>↩ cycle accelerates</span>
      </div>
    </div>
  );
}