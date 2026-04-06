import { useMemo, useState } from 'react';
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

const GHOST_FORMULATIONS = [
  { name: 'Agbo Ẹjẹ', conditions: ['Blood cleansing'] },
  { name: 'Omi Ara', conditions: ['Wellness', 'Detox'] },
  { name: 'Aseje Omo', conditions: ['Children tonic'] },
  { name: 'Agbo Ọgbẹ', conditions: ['Wound care'] },
  { name: 'Ewe Ìwòsàn', conditions: ['General healing'] },
];

function filterVault(formulations, term) {
  const words = term
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (!words.length) {
    return formulations;
  }

  return formulations.filter((formulation) => {
    const haystack = [
      formulation.name,
      ...formulation.conditions,
      ...formulation.ingredients.flatMap((ingredient) => [ingredient.local, ingredient.english, ingredient.botanical]),
    ]
      .join(' ')
      .toLowerCase();

    return words.some((word) => haystack.includes(word));
  });
}

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

function VaultView({ search, onSearchChange, formulations, onSelectFormulation }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 16px', marginBottom: 16 }}>
        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.2)' }}>🔍</span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search medicines..."
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        />
      </div>

      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 12 }}>
        {search.trim() ? `${formulations.length} results for '${search}'` : `${formulations.length} formulations`}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {formulations.map((formulation) => {
          const badgeColor = formulation.effectiveness >= 80 ? COLORS.forest : formulation.effectiveness >= 70 ? COLORS.gold : 'rgba(255,255,255,0.5)';

          return (
            <button
              key={formulation.id}
              type="button"
              onClick={() => onSelectFormulation(formulation.id)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: 20,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.2s ease',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 10 }}>{formulation.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {formulation.conditions.map((condition) => (
                  <span key={condition} style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>
                    {condition}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{formulation.ingredients.length} ingredients</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: badgeColor }}>{formulation.effectiveness}%</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>🔒 Private</span>
              </div>
            </button>
          );
        })}

        {GHOST_FORMULATIONS.map((ghost) => (
          <div key={ghost.name} style={{ opacity: 0.3, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 10 }}>{ghost.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {ghost.conditions.map((condition) => (
                <span key={condition} style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>
                  {condition}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>🔒 Private</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulationDetailView({ formulation, playingAudio, onToggleAudio, onBack }) {
  const segments = getOutcomeSegments(formulation.outcomes);
  const confidenceLabel = formulation.tracked >= 200 ? `🟢 High confidence (${formulation.tracked}+ outcomes)` : formulation.tracked >= 50 ? `🟡 Medium (${formulation.tracked})` : `🔴 Low (${formulation.tracked})`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <button
        type="button"
        onClick={onBack}
        style={{ alignSelf: 'flex-start', marginBottom: 4, fontSize: 13, color: COLORS.forest, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        ← My vault
      </button>

      <div>
        <h2 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontSize: 24, color: 'rgba(255,255,255,0.9)' }}>{formulation.name}</h2>
        <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Documented {formulation.documented} · 🔒 Private</div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {formulation.conditions.map((condition) => (
          <span key={condition} style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>
            {condition}
          </span>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Ingredients ({formulation.ingredients.length})</div>
        {formulation.ingredients.map((ingredient, index) => (
          <div key={ingredient.local} style={{ paddingBottom: 8, marginBottom: 8, borderBottom: index === formulation.ingredients.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
              <strong>{ingredient.local}</strong> — <span style={{ color: 'rgba(255,255,255,0.5)' }}>{ingredient.english}</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>{ingredient.botanical}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>Preparation</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 12 }}>{formulation.preparation}</div>
        <button
          type="button"
          onClick={onToggleAudio}
          style={{ borderRadius: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', fontSize: 12, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          🎤 Play original voice recording
        </button>

        {playingAudio && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 24 }}>
              {[14, 20, 11, 22, 16, 19, 13].map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  style={{
                    width: 3,
                    height,
                    borderRadius: 99,
                    background: COLORS.forest,
                    animation: `wave 1s ${index * 0.07}s infinite ease-in-out alternate`,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Playing... 1:12</span>
          </div>
        )}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Dosing</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{formulation.dosing}</div>
      </div>

      {!!formulation.warnings?.length && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {formulation.warnings.map((warning) => (
            <span key={warning} style={{ background: 'rgba(158,74,47,0.12)', color: '#F87171', padding: '3px 10px', fontSize: 10, fontWeight: 700, borderRadius: 6 }}>
              ⚠️ {warning}
            </span>
          ))}
        </div>
      )}

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Expected outcome</div>
        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 99, background: 'rgba(184,134,11,0.12)', border: '1px solid rgba(184,134,11,0.3)', color: COLORS.gold, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
          ⏱️ {formulation.timeline}
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {formulation.successIndicators.map((indicator) => (
            <span key={indicator} style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>
              {indicator}
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>📊 Patient outcomes</div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, color: '#4ADE80', lineHeight: 1 }}>{formulation.effectiveness}%</div>

        <div style={{ marginTop: 12, display: 'flex', gap: 3, height: 28, borderRadius: 8, overflow: 'hidden' }}>
          {segments.map((segment) => (
            <div key={segment.key} style={{ width: `${segment.value}%`, background: segment.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>
              {segment.value >= 10 ? `${segment.value}%` : ''}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 8, display: 'flex', gap: 12, fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
          <span>● Recovered</span>
          <span>● Improved</span>
          <span>● No change</span>
          <span>● Worsened</span>
        </div>

        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff' }}>4.2</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Avg days to improvement</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff' }}>91%</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Completed full course</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, color: '#fff' }}>{formulation.sideEffects.count}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Side effects ({formulation.sideEffects.severity})</div>
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
          {confidenceLabel}
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>Monthly trend</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {formulation.monthlyOutcomes.map((monthData) => (
              <div key={monthData.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 4 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{monthData.tracked}</div>
                <div style={{ width: '100%', maxWidth: 32, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #4ADE80 0%, #1B6B3A 100%)', height: `${Math.max(8, (monthData.eff / 100) * 100)}px` }} />
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{monthData.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {formulation.researchInterest > 0 && (
        <div style={{ background: 'rgba(45,75,142,0.06)', border: '1px solid rgba(45,75,142,0.12)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 10 }}>
            🔬 {formulation.researchInterest} researchers have expressed interest in this formulation.
          </div>
          <button
            type="button"
            style={{ borderRadius: 8, padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.78)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12 }}
          >
            View requests →
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" style={{ borderRadius: 8, padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12 }}>✏️ Edit</button>
        <button type="button" style={{ borderRadius: 8, padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12 }}>📤 Share</button>
      </div>
    </div>
  );
}

export default function PractitionerView() {
  const [subView, setSubView] = useState('dashboard');
  const [selectedFormulation, setSelectedFormulation] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [vaultSearch, setVaultSearch] = useState('');
  const [playingAudio, setPlayingAudio] = useState(false);

  const filteredVault = useMemo(() => filterVault(FORMULATIONS, vaultSearch), [vaultSearch]);

  const patientExists = PATIENTS.some((patient) => patient.id === 'p47');
  const activeFormulation = selectedFormulation ? FORMULATIONS.find((formulation) => formulation.id === selectedFormulation) : null;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.5); opacity: 0.5; }
          to { transform: scaleY(1); opacity: 1; }
        }
      `}</style>

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
                    setPlayingAudio(false);
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
          {activeFormulation ? (
            <FormulationDetailView
              formulation={activeFormulation}
              playingAudio={playingAudio}
              onToggleAudio={() => setPlayingAudio((value) => !value)}
              onBack={() => {
                setSelectedFormulation(null);
                setSubView('vault');
                setPlayingAudio(false);
              }}
            />
          ) : subView === 'dashboard' ? (
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
              onOpenFormulation={(id = 'f2') => {
                setSelectedFormulation(id);
                setPlayingAudio(false);
              }}
              onOpenPatients={() => {
                setSubView('patients');
                setSelectedFormulation(null);
                setSelectedPatient(null);
              }}
            />
          ) : subView === 'vault' ? (
            <VaultView
              search={vaultSearch}
              onSearchChange={setVaultSearch}
              formulations={filteredVault}
              onSelectFormulation={(id) => {
                setSelectedFormulation(id);
                setPlayingAudio(false);
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