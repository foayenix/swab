import { useEffect, useState } from 'react';
import { COLORS } from './data';
import HomeView from './views/HomeView';
import PractitionerView from './views/PractitionerView';
import ResearcherView from './views/ResearcherView';
import RegulatorView from './views/RegulatorView';
import PublicView from './views/PublicView';

const VIEWS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'pract', label: 'Practitioner', icon: '🌿' },
  { id: 'research', label: 'Researcher', icon: '🔬' },
  { id: 'regulator', label: 'Regulator', icon: '🏛️' },
  { id: 'public', label: 'Public data', icon: '🌍' },
];

export default function App() {
  const [view, setView] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Sticky nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,9,8,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
            <div style={{ width: 28, height: 28, background: COLORS.forest, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontStyle: 'normal', fontSize: 14, fontFamily: "'Instrument Serif', serif" }}>S</div>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: COLORS.forest }}>Sanko</span>
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Experience as:</span>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {VIEWS.map(v => (
              <button key={v.id} onClick={() => setView(v.id)} style={{
                padding: '8px 16px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                color: view === v.id ? '#fff' : 'rgba(255,255,255,0.4)',
                background: view === v.id ? COLORS.forest : 'transparent',
                border: view === v.id ? `1px solid ${COLORS.forest}` : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 14 }}>{v.icon}</span> {v.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* View content */}
      <main>
        {view === 'home' && <HomeView onNavigate={setView} />}
        {view === 'pract' && <PractitionerView />}
        {view === 'research' && <ResearcherView />}
        {view === 'regulator' && <RegulatorView />}
        {view === 'public' && <PublicView />}
      </main>
    </div>
  );
}
