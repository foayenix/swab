import { useMemo, useState } from 'react';
import { COLORS, COMPOUNDS, FORMULATIONS } from '../data';

function getPreparationType(preparation) {
  const normalized = preparation.toLowerCase();
  if (normalized.includes('boil')) return 'Decoction';
  if (normalized.includes('grind')) return 'Powder';
  if (normalized.includes('soak')) return 'Maceration';
  return 'Mixed';
}

function getOutcomeSegments(outcomes) {
  return [
    { key: 'recovered', label: 'Recovered', color: COLORS.forest, value: outcomes.recovered },
    { key: 'improved', label: 'Improved', color: '#4ADE80', value: outcomes.improved },
    { key: 'noChange', label: 'No change', color: COLORS.gold, value: outcomes.noChange },
    { key: 'worsened', label: 'Worsened', color: COLORS.terra, value: outcomes.worsened },
  ];
}

function getReadiness(effectiveness) {
  if (effectiveness >= 80) return { label: 'High', color: '#4ADE80', bg: 'rgba(27,107,58,0.16)' };
  if (effectiveness >= 60) return { label: 'Medium', color: '#FCD34D', bg: 'rgba(184,134,11,0.16)' };
  return { label: 'Low', color: 'rgba(255,255,255,0.55)', bg: 'rgba(255,255,255,0.1)' };
}

function filterFormulations(search) {
  const words = search
    .toLowerCase()
    .split(/[\s,]+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (!words.length) return FORMULATIONS;

  return FORMULATIONS.filter((formulation) => {
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

function CollaborationModal({ step, onClose, onNext }) {
  const isSent = step === 'sent';

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,9,8,0.75)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 540, background: '#151311', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 20 }}>
        {step === 1 && (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>Request collaboration</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.58)', marginBottom: 14 }}>
              Your request will be sent to the practitioner in their preferred language (Yoruba). They will receive a clear explanation of your research interest and what data you're requesting.
            </div>
            <button type="button" onClick={onNext} style={{ borderRadius: 8, padding: '9px 14px', background: COLORS.forest, border: `1px solid ${COLORS.forest}`, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>Benefit-sharing terms</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
              <div>✓ Co-authorship on all publications using this formulation's data</div>
              <div>✓ Intellectual property protection — full recipe remains with practitioner</div>
              <div>✓ Compensation framework — terms agreed before any data sharing</div>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 14 }}>
              These terms comply with the Nagoya Protocol on Access and Benefit-Sharing.
            </div>
            <button type="button" onClick={onNext} style={{ borderRadius: 8, padding: '9px 14px', background: COLORS.forest, border: `1px solid ${COLORS.forest}`, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>The practitioner decides</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.58)', marginBottom: 14 }}>
              Your request will be reviewed by the practitioner. Average response time: 5 days. You'll be notified by email when they respond.
            </div>
            <button type="button" onClick={onNext} style={{ borderRadius: 8, padding: '9px 14px', background: COLORS.forest, border: `1px solid ${COLORS.forest}`, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Send request →</button>
          </>
        )}

        {isSent && (
          <>
            <div style={{ fontSize: 26, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: 8 }}>Request sent successfully</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.58)', marginBottom: 14 }}>
              You'll be notified when the practitioner responds.
            </div>
            <button type="button" onClick={onClose} style={{ borderRadius: 8, padding: '9px 14px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

function FormulationCard({ formulation, onRequest, onViewProfile }) {
  const readiness = getReadiness(formulation.effectiveness);
  const segments = getOutcomeSegments(formulation.outcomes);
  const sideEffectRate = ((formulation.sideEffects.count / formulation.tracked) * 100).toFixed(1);

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{formulation.anonId}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
        Southwest Nigeria · {getPreparationType(formulation.preparation)} · {formulation.ingredients.length} ingredients
      </div>

      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {formulation.conditions.map((condition) => (
          <span key={condition} style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>{condition}</span>
        ))}
      </div>

      <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {formulation.ingredients.map((ingredient) => (
          <span key={ingredient.botanical} style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, background: 'rgba(184,134,11,0.14)', color: '#FCD34D' }}>{ingredient.botanical}</span>
        ))}
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
        {formulation.tracked} outcomes · {formulation.effectiveness}% effectiveness · {formulation.timeline} avg recovery · {formulation.sideEffects.count} side effects ({sideEffectRate}% rate)
      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 2, height: 20, borderRadius: 6, overflow: 'hidden' }}>
        {segments.map((segment) => (
          <div key={segment.key} style={{ width: `${segment.value}%`, background: segment.color }} />
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: readiness.bg, color: readiness.color }}>{readiness.label}</span>
      </div>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="button" onClick={onRequest} style={{ borderRadius: 8, padding: '8px 14px', background: COLORS.forest, border: `1px solid ${COLORS.forest}`, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Request collaboration →</button>
        <button type="button" onClick={onViewProfile} style={{ borderRadius: 8, padding: '8px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>View full profile</button>
      </div>
    </div>
  );
}

function FullProfile({ formulation, onBack }) {
  const segments = getOutcomeSegments(formulation.outcomes);

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 18 }}>
      <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', color: COLORS.forest, cursor: 'pointer', fontSize: 13, marginBottom: 10 }}>← Back to results</button>
      <FormulationCard formulation={formulation} onRequest={() => {}} onViewProfile={() => {}} />

      <div style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
        Age distribution: 18-35 (24%), 35-50 (41%), 50+ (35%). Sex: Male 38%, Female 62%.
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Monthly outcome trend</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {formulation.monthlyOutcomes.map((item) => (
            <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{item.tracked}</div>
              <div style={{ width: '100%', maxWidth: 34, height: `${Math.max(8, item.eff)}px`, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #4ADE80 0%, #1B6B3A 100%)' }} />
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{item.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Ingredient analysis</div>
        {formulation.ingredients.map((ingredient) => {
          const compound = COMPOUNDS.find((item) => item.botanical === ingredient.botanical);
          return (
            <div key={ingredient.botanical} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{ingredient.botanical}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                {compound
                  ? `${compound.count} formulations · ${compound.conditions.join(', ')} · ${compound.eff}% avg effectiveness`
                  : 'No aggregate compound profile available in this demo dataset'}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
        This formulation has been documented by a practitioner with 40+ years of experience. Nagoya Protocol-compliant collaboration terms are available.
      </div>

      <div style={{ marginTop: 10, display: 'flex', gap: 2, height: 20, borderRadius: 6, overflow: 'hidden' }}>
        {segments.map((segment) => (
          <div key={segment.key} style={{ width: `${segment.value}%`, background: segment.color }} />
        ))}
      </div>
    </div>
  );
}

export default function ResearcherView() {
  const [search, setSearch] = useState('anti-inflammatory, Yoruba, Southwest Nigeria');
  const [selectedFormulation, setSelectedFormulation] = useState(null);
  const [collaborationStep, setCollaborationStep] = useState(null);
  const [expandedCompound, setExpandedCompound] = useState(null);

  const filtered = useMemo(() => filterFormulations(search), [search]);
  const withOutcomeData = filtered.filter((item) => item.tracked > 0).length;
  const highReadiness = filtered.filter((item) => item.effectiveness >= 80).length;

  const selected = selectedFormulation ? FORMULATIONS.find((item) => item.id === selectedFormulation) : null;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, background: 'rgba(184,134,11,0.12)', border: '1px solid rgba(184,134,11,0.24)', color: COLORS.gold, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
        🔬 Sanko Research Portal
      </div>
      <h2 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontSize: 24, color: 'rgba(255,255,255,0.92)' }}>Explore Africa's traditional medicine evidence</h2>
      <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
        Search anonymised formulation data with consent-gated access. No recipes without practitioner approval.
      </div>

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 16px' }}>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>🔍</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'rgba(255,255,255,0.78)', fontSize: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        />
      </div>

      <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
        {filtered.length} formulations found · {withOutcomeData} with outcome data · {highReadiness} high research readiness
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {selected ? (
          <FullProfile formulation={selected} onBack={() => setSelectedFormulation(null)} />
        ) : (
          filtered.map((formulation) => (
            <FormulationCard
              key={formulation.id}
              formulation={formulation}
              onRequest={() => setCollaborationStep(1)}
              onViewProfile={() => setSelectedFormulation(formulation.id)}
            />
          ))
        )}
      </div>

      <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 700 }}>Compound frequency explorer</div>
          <button type="button" style={{ background: 'none', border: 'none', color: COLORS.forest, fontSize: 12, cursor: 'pointer' }}>Export dataset →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 2fr 1fr', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
          <div>Botanical name</div><div>Local name(s)</div><div>Formulations</div><div>Top conditions</div><div>Avg effectiveness</div>
        </div>

        {COMPOUNDS.map((compound) => (
          <div key={compound.botanical}>
            <button
              type="button"
              onClick={() => setExpandedCompound((prev) => (prev === compound.botanical ? null : compound.botanical))}
              style={{ width: '100%', background: 'none', border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', textAlign: 'left', padding: '8px 0', display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 2fr 1fr', gap: 8, alignItems: 'center', color: 'rgba(255,255,255,0.72)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12 }}
            >
              <div style={{ fontWeight: 700 }}>{compound.botanical}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>{compound.local}</div>
              <div>{compound.count}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {compound.conditions.map((condition) => (
                  <span key={condition} style={{ padding: '1px 6px', borderRadius: 6, fontSize: 10, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>{condition}</span>
                ))}
              </div>
              <div style={{ color: compound.eff >= 80 ? '#4ADE80' : '#FCD34D' }}>{compound.eff}%</div>
            </button>

            {expandedCompound === compound.botanical && (
              <div style={{ padding: '0 0 10px 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                This ingredient appears in {compound.count} formulations across the Sanko database, primarily for {compound.conditions.join(', ')}. Average effectiveness in formulations containing this compound: {compound.eff}%.
              </div>
            )}
          </div>
        ))}
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

      {collaborationStep && (
        <CollaborationModal
          step={collaborationStep}
          onClose={() => setCollaborationStep(null)}
          onNext={() => {
            if (collaborationStep === 1) setCollaborationStep(2);
            else if (collaborationStep === 2) setCollaborationStep(3);
            else if (collaborationStep === 3) setCollaborationStep('sent');
          }}
        />
      )}
    </div>
  );
}
