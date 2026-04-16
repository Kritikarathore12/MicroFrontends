import React from 'react';

export default function Dashboard() {
    return (
        <div style={{
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <h2 style={{
                margin: '0 0 8px 0',
                fontSize: '36px',
                fontWeight: '800',
                background: 'linear-gradient(to right, #a855f7 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
            }}>
                Overview Dashboard
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>
                Real-time metrics rendered natively from the React micro-frontend.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {/* Stats Card 1 */}
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.2s, background 0.2s',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'; }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Views</p>
                    <p style={{ margin: '12px 0 0 0', fontSize: '32px', fontWeight: '700', color: '#f8fafc' }}>24.8K</p>
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ padding: '4px 8px', background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>↑ 12%</span>
                        <span style={{ color: '#64748b', fontSize: '13px' }}> vs last week</span>
                    </div>
                </div>

                {/* Stats Card 2 */}
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.2s, background 0.2s',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'; }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Users</p>
                    <p style={{ margin: '12px 0 0 0', fontSize: '32px', fontWeight: '700', color: '#f8fafc' }}>1,294</p>
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ padding: '4px 8px', background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>↓ 2.4%</span>
                        <span style={{ color: '#64748b', fontSize: '13px' }}> vs last week</span>
                    </div>
                </div>
                
                {/* Stats Card 3 */}
                <div style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'transform 0.2s, background 0.2s',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(0, 0, 0, 0.2)'; }}>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Engagement</p>
                    <p style={{ margin: '12px 0 0 0', fontSize: '32px', fontWeight: '700', color: '#f8fafc' }}>68%</p>
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ padding: '4px 8px', background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>↑ 5.1%</span>
                        <span style={{ color: '#64748b', fontSize: '13px' }}> vs last week</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
