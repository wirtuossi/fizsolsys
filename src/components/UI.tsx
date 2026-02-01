import { useStore } from '../store';
import { TOPICS } from '../data/Topics';

export function UI() {
    const { activeTopic, setTopic } = useStore();
    const currentTopic = TOPICS[activeTopic];

    return (
        <div id="ui-layer" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            {/* Sidebar */}
            <div style={{
                pointerEvents: 'auto',
                width: '320px',
                height: '100vh',
                background: 'rgba(10, 10, 25, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <h1 style={{ margin: 0, color: '#4da6ff', textShadow: '0 0 10px rgba(77, 166, 255, 0.5)' }}>FizSolSys</h1>
                    <p style={{ margin: '4px 0 0 0', opacity: 0.6, fontSize: '0.9rem' }}>Навчальний симулятор 7-9 клас</p>
                </div>

                {Object.values(TOPICS).map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => setTopic(topic.id as any)}
                        style={{
                            background: activeTopic === topic.id ? 'rgba(77, 166, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${activeTopic === topic.id ? '#4da6ff' : 'rgba(255, 255, 255, 0.1)'}`,
                            padding: '12px',
                            borderRadius: '8px',
                            color: 'white',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{topic.title}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{topic.desc}</span>
                    </button>
                ))}
            </div>

            {/* Info Panel */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '250px', // Adjusted to not overlap Leva defaults
                width: '320px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #4da6ff',
                borderRadius: '8px',
                padding: '20px',
                color: '#e2e8f0',
                pointerEvents: 'auto'
            }}>
                <h2 style={{ margin: '0 0 10px 0', color: '#ffd700' }}>{currentTopic.title}</h2>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{currentTopic.desc}</p>
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '15px 0' }} />
                <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                    <p>Дослідницький режим активовано.</p>
                    <p>Використовуйте панель керування для зміни параметрів.</p>
                </div>
            </div>
        </div>
    );
}
