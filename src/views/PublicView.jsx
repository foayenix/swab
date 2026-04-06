import { useEffect, useState } from 'react';
import { COLORS, COUNTRIES } from '../data';

export default function PublicView() {
  const [expandedCountry, setExpandedCountry] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;

    const timeoutId = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [toast]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, background: 'rgba(184,134,11,0.12)', border: '1px solid rgba(184,134,11,0.24)', color: COLORS.gold, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>
          🌍 Open data
        </div>
        <h2 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontSize: 28, color: 'rgba(255,255,255,0.92)' }}>The state of African traditional medicine</h2>
        <div style={{ margin: '8px auto 0', maxWidth: 520, fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>
          Population-level data from the Sanko platform. No individual practitioners, formulations, or patients identified. Updated monthly.
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, textAlign: 'center' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14 }}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: COLORS.forest }}>52,400</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Practitioners</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>15 countries</div></div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14 }}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32 }}>148,000</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Formulations</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>+4,200 this month</div></div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14 }}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: '#4ADE80' }}>620,000</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Patient outcomes</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>Tracked and linked</div></div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14 }}><div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, color: COLORS.gold }}>2,100+</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Unique botanicals</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.32)' }}>Mapped to Latin names</div></div>
      </div>

      <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>Coverage by country</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.5fr 0.7fr', gap: 8, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          <div>Country</div><div>Practitioners</div><div>Formulations</div><div>Outcomes</div><div>Languages</div><div>Since</div>
        </div>

        {COUNTRIES.map((country) => {
          const expanded = expandedCountry === country.name;
          return (
            <div key={country.name}>
              <button
                type="button"
                onClick={() => setExpandedCountry((prev) => (prev === country.name ? null : country.name))}
                style={{ width: '100%', background: 'none', border: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', textAlign: 'left', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.5fr 0.7fr', gap: 8, alignItems: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'rgba(255,255,255,0.72)', fontSize: 12 }}
              >
                <div>{country.flag} {country.name}</div>
                <div>{country.practitioners.toLocaleString()}</div>
                <div>{country.formulations.toLocaleString()}</div>
                <div>{country.outcomes.toLocaleString()}</div>
                <div style={{ color: 'rgba(255,255,255,0.48)' }}>{country.languages}</div>
                <div>{country.since}</div>
              </button>

              {expanded && (
                <div style={{ marginBottom: 8, padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ marginBottom: 6, fontSize: 12, color: 'rgba(255,255,255,0.52)' }}>Top conditions:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                    {country.topConditions.map((condition) => (
                      <span key={condition} style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: 'rgba(27,107,58,0.12)', color: '#4ADE80' }}>{condition}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>Top botanicals: {country.topBotanicals.join(', ')}</div>
                  <div style={{ fontSize: 12, color: country.eff >= 80 ? '#4ADE80' : '#FCD34D' }}>Average effectiveness: {country.eff}%</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.52)' }}>Growth: +{country.growth} new practitioners/month</div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ padding: '10px 0 4px', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          + 8 more countries · 2,500 practitioners · 6,000 formulations · 17,000 outcomes
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ borderLeft: `3px solid ${COLORS.forest}`, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>Across 48,000 tracked malaria/fever cases treated with traditional formulations in Nigeria, Ghana, and Kenya, practitioners reported an <strong>82% improvement rate</strong> within 5 days.</div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Based on patient-reported outcomes via WhatsApp and SMS follow-up</div>
        </div>

        <div style={{ borderLeft: `3px solid ${COLORS.gold}`, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}><strong>14 formulations</strong> have crossed 200+ tracked outcomes with effectiveness above 80% and adverse event rates below 5% — making them candidates for formal pharmacological investigation.</div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Research readiness scores available to approved research institutions</div>
        </div>

        <div style={{ borderLeft: '3px solid #2D4B8E', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}><strong>2,100+ unique botanical species</strong> documented with local-to-Latin name mappings across 28 languages — the most comprehensive African medicinal plant nomenclature database ever assembled.</div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Contributed by practitioners across 15 countries</div>
        </div>
      </div>

      <div style={{ marginTop: 14, border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 12, textAlign: 'center', padding: 20 }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: 'rgba(255,255,255,0.9)' }}>Annual report: The state of African traditional medicine 2030</div>
        <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
          The population-level data WHO has been asking for since 2002 — produced by practitioners, for the first time.
        </div>
        <button
          type="button"
          onClick={() => setToast('Demo — report not available in preview')}
          style={{ marginTop: 12, borderRadius: 8, padding: '10px 16px', background: COLORS.forest, border: `1px solid ${COLORS.forest}`, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
        >
          Download PDF report →
        </button>
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

      <div style={{ position: 'fixed', left: '50%', bottom: 24, transform: 'translateX(-50%)', transition: 'all 0.2s ease', opacity: toast ? 1 : 0, pointerEvents: 'none' }}>
        <div style={{ background: 'rgba(10,9,8,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '8px 14px', fontSize: 12, color: 'rgba(255,255,255,0.84)' }}>
          {toast || ''}
        </div>
      </div>
    </div>
  );
}
