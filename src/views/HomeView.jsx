import { COLORS } from '../data';

const phases = [
  { date: 'Today', color: '#1B6B3A', icon: '💬', title: 'WhatsApp MVP', desc: 'Voice + photo documentation\n20 practitioners piloting\nHTSN network' },
  { date: '6 months', color: '#2D4B8E', icon: '📱', title: 'Mobile app + tracking', desc: 'Outcome tracking live\n1,000 practitioners\n3 languages' },
  { date: '18 months', color: '#7F77DD', icon: '🔬', title: 'Research data layer', desc: 'Anonymised datasets\nUniversity partnerships\nFirst revenue' },
  { date: '3+ years', color: '#D85A30', icon: '🌍', title: 'Pan-African platform', desc: '15+ countries\nWHO engagement\nWhat you\'re about to see ↓' },
];

const flywheelNodes = [
  { icon: '🌿', label: 'More practitioners', sub: 'document formulations', color: COLORS.forest },
  { icon: '📊', label: 'More outcome data', sub: 'linked to formulations', color: COLORS.gold },
  { icon: '🔬', label: 'Research interest', sub: 'universities + pharma', color: COLORS.indigo },
  { icon: '✅', label: 'Validated medicines', sub: 'credibility + trust', color: '#7F77DD' },
];

const roleCards = [
  { id: 'pract', icon: '🌿', title: 'Practitioner', desc: 'Practice dashboard, vault with outcome data, community view, research interest notifications.' },
  { id: 'research', icon: '🔬', title: 'Researcher', desc: 'Search anonymised formulations, explore compound frequency, request Nagoya-compliant collaboration.' },
  { id: 'regulator', icon: '🏛️', title: 'Regulator', desc: 'Population-level intelligence, pharmacovigilance signals, formulations of regulatory interest.' },
  { id: 'public', icon: '🌍', title: 'Public data portal', desc: 'Aggregate numbers across 15 countries, key evidence findings, annual state of African TM report.' },
];

export default function HomeView({ onNavigate }) {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
      {/* Badge */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span style={{
          display: 'inline-block', padding: '6px 16px', borderRadius: 99,
          background: 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.15)',
          color: COLORS.gold, fontSize: 11, fontWeight: 600,
        }}>🔮 Vision demo — Sanko 2030</span>
      </div>

      {/* Section A: Journey Timeline */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ color: COLORS.gold, textTransform: 'uppercase', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
            The journey — from today to what you're about to see
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', gap: 12 }}>
          {/* Gradient line */}
          <div style={{
            position: 'absolute', top: 28, left: 28, right: 28, height: 2,
            background: 'linear-gradient(to right, #1B6B3A, #2D4B8E, #7F77DD, #D85A30)',
            zIndex: 0,
          }} />
          {phases.map((p, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: `${p.color}15`,
                border: `1px solid ${p.color}30`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 24, margin: '0 auto 8px',
              }}>{p.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 2 }}>{p.date}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section B: Data Flywheel */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 14, padding: 24, marginBottom: 48,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ color: COLORS.forest, textTransform: 'uppercase', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
            Why this compounds — the data flywheel
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 16 }}>
          {flywheelNodes.map((n, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', border: `2px solid ${n.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                marginBottom: 6, background: `${n.color}10`,
              }}>{n.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{n.label}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{n.sub}</div>
              {i < 3 && <div style={{ position: 'absolute', display: 'none' }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{
          textAlign: 'center', padding: '8px 16px', borderRadius: 99,
          background: 'rgba(27,107,58,0.06)', border: '1px solid rgba(27,107,58,0.1)',
          fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 16,
        }}>
          ↩ Validated medicines attract <strong style={{ color: 'rgba(255,255,255,0.7)' }}>more practitioners</strong> — the cycle accelerates
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6, textAlign: 'center' }}>
          Each practitioner who joins makes the platform more valuable for every other practitioner, researcher, and regulator. This is why Sanko compounds — and why no one can replicate the dataset once it reaches scale.
        </p>
      </div>

      {/* Section C: Role Selector */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>
            Experience the 2030 platform
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {roleCards.map(c => (
            <div
              key={c.id}
              onClick={() => onNavigate(c.id)}
              style={{
                padding: 20, borderRadius: 12, cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.forest; e.currentTarget.style.background = 'rgba(27,107,58,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: 'rgba(255,255,255,0.85)' }}>{c.title}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
