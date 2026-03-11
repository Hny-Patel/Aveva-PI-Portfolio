import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Hiren Patel | AVEVA PI Data Historian Specialist';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(to right, #0D1B2A, #1B263B)",
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    padding: 80,
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '4px solid rgba(212, 82, 26, 0.4)',
                        backgroundColor: '#0D1B2A',
                        borderRadius: 30,
                        padding: 60,
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    {/* Accent blob */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -100,
                            right: -100,
                            width: 300,
                            height: 300,
                            background: 'rgba(212, 82, 26, 0.2)',
                            borderRadius: '50%',
                            filter: 'blur(80px)',
                        }}
                    />

                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 800,
                            margin: 0,
                            letterSpacing: '-0.05em',
                            background: 'white',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Hiren Patel
                    </h1>
                    <div
                        style={{
                            fontSize: 40,
                            color: '#d4521a',
                            fontWeight: 500,
                            opacity: 0.9,
                            marginTop: 20,
                            textAlign: 'center',
                            letterSpacing: '0.05em',
                        }}
                    >
                        AVEVA PI Data Historian Specialist
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: 40,
                            marginTop: 60,
                        }}
                    >
                        <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>30+ Dashboards</div>
                        <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>•</div>
                        <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>5+ Certifications</div>
                        <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>•</div>
                        <div style={{ display: 'flex', fontSize: 28, color: '#94a3b8' }}>Enterprise Scale</div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
