import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Artist {
  id: number
  name: string
  slug: string
  bio: string | null
  avatar_url: string | null
  theme: string | null
}

export default async function HomePage() {
  const { data: artists } = await supabase
    .from('artists')
    .select('*')
    .order('id')

  return (
    <main style={{
      minHeight: '100vh',
      background: '#111111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Rose glow — left */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '55%',
        height: '100%',
        background: 'radial-gradient(ellipse at 25% 55%, #6a0d8840 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Cody glow — right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '55%',
        height: '100%',
        background: 'radial-gradient(ellipse at 75% 55%, #7a5a2028 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Architectural frame */}
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        right: '16px',
        bottom: '16px',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      {/* Corner accents */}
      {(['tl','tr','bl','br'] as const).map((pos) => (
        <div key={pos} style={{
          position: 'fixed',
          width: '16px',
          height: '16px',
          top: pos.startsWith('t') ? '16px' : undefined,
          bottom: pos.startsWith('b') ? '16px' : undefined,
          left: pos.endsWith('l') ? '16px' : undefined,
          right: pos.endsWith('r') ? '16px' : undefined,
          borderTop: pos.startsWith('t') ? '1px solid rgba(255,255,255,0.18)' : undefined,
          borderBottom: pos.startsWith('b') ? '1px solid rgba(255,255,255,0.18)' : undefined,
          borderLeft: pos.endsWith('l') ? '1px solid rgba(255,255,255,0.18)' : undefined,
          borderRight: pos.endsWith('r') ? '1px solid rgba(255,255,255,0.18)' : undefined,
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '760px' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: '#e8e0d0',
            textTransform: 'uppercase',
            margin: '0 0 8px',
          }}>
            ArtistShop
          </h1>
          <p style={{
            fontSize: '11px',
            color: '#555',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}>
            An independent art collective
          </p>
          <div style={{
            width: '36px',
            height: '0.5px',
            background: '#333',
            margin: '0 auto',
          }} />
        </header>

        {/* Artist cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {(artists ?? []).map((artist: Artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <div style={{
            width: '100%',
            height: '0.5px',
            background: 'rgba(255,255,255,0.05)',
            marginBottom: '14px',
          }} />
          <span style={{
            fontSize: '10px',
            color: '#333',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}>
            Handmade · Independent · Yours
          </span>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500&display=swap');

        .artist-card-link {
          text-decoration: none;
          display: block;
        }

        .card-rose {
          background: #2a1a35;
          border: 0.5px solid #3d2550;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-rose:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(180, 0, 200, 0.18);
        }

        .card-sketchbook {
          background: #f5f0e8;
          border: 0.5px solid #ddd8cc;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-sketchbook:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(120, 90, 40, 0.15);
        }

        .enter-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .artist-card-link:hover .enter-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </main>
  )
}

function ArtistCard({ artist }: { artist: Artist }) {
  const isGothic = artist.theme === 'gothic'

  if (isGothic) {
    return (
      <Link href={`/artists/${artist.slug}`} className="artist-card-link">
        <div className="card-rose">
          {/* Header */}
          <div style={{ padding: '1.25rem 1.25rem 0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px', color: '#cc55ff', opacity: 0.5 }}>✦</span>
              <span style={{ fontSize: '12px', color: '#cc55ff', opacity: 0.25 }}>✦</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: 700,
              color: '#ff55ff',
              textShadow: '0 0 20px rgba(200, 0, 200, 0.5)',
              letterSpacing: '0.08em',
              margin: '0 0 4px',
            }}>
              {artist.name}
            </h2>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#a070c0',
              margin: 0,
            }}>
              Mixed media · Originals
            </p>
          </div>

          {/* Image area */}
          <div style={{
            height: '160px',
            background: '#1e1228',
            margin: '0.75rem',
            borderRadius: '6px',
            border: '1px solid rgba(204, 85, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Gothic corner brackets */}
            {(['tl','tr','bl','br'] as const).map((pos) => (
              <div key={pos} style={{
                position: 'absolute',
                width: '18px',
                height: '18px',
                top: pos.startsWith('t') ? '8px' : undefined,
                bottom: pos.startsWith('b') ? '8px' : undefined,
                left: pos.endsWith('l') ? '8px' : undefined,
                right: pos.endsWith('r') ? '8px' : undefined,
                borderTop: pos.startsWith('t') ? '1.5px solid rgba(204,85,255,0.7)' : undefined,
                borderBottom: pos.startsWith('b') ? '1.5px solid rgba(204,85,255,0.7)' : undefined,
                borderLeft: pos.endsWith('l') ? '1.5px solid rgba(204,85,255,0.7)' : undefined,
                borderRight: pos.endsWith('r') ? '1.5px solid rgba(204,85,255,0.7)' : undefined,
              }} />
            ))}
            <div style={{
              width: '64px',
              height: '80px',
              background: '#3a1f4a',
              borderRadius: '3px',
              border: '1px solid rgba(204,85,255,0.3)',
            }} />
          </div>

          {/* Footer */}
          <div style={{
            padding: '0.5rem 1.25rem 1.1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '11px', color: '#906aaa', letterSpacing: '0.08em' }}>
              1 piece available
            </span>
            <span style={{
              fontSize: '11px',
              color: '#ff55ff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Enter <span className="enter-arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  // Sketchbook / Cody
  return (
    <Link href={`/artists/${artist.slug}`} className="artist-card-link">
      <div className="card-sketchbook">
        {/* Header */}
        <div style={{ padding: '1.25rem 1.25rem 0.5rem', background: '#f5f0e8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: '#ccc6b8',
                  border: '0.5px solid #b8b2a5',
                }} />
              ))}
            </div>
            <div style={{ width: '1.5px', height: '28px', background: 'rgba(220,80,80,0.2)' }} />
          </div>
          <h2 style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '20px',
            fontWeight: 700,
            color: '#2a2520',
            letterSpacing: '0.04em',
            margin: '0 0 4px',
          }}>
            {artist.name}
          </h2>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#888070',
            margin: 0,
          }}>
            Flash · Traditional tattoo
          </p>
        </div>

        {/* Image area */}
        <div style={{
          height: '160px',
          background: '#ece7da',
          margin: '0.75rem',
          borderRadius: '4px',
          border: '0.5px solid #ccc6b5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ruled lines */}
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} style={{
              position: 'absolute',
              left: 0, right: 0,
              top: `${20 + i * 20}px`,
              height: '0.5px',
              background: 'rgba(180,175,160,0.5)',
            }} />
          ))}
          {[0,1].map(i => (
            <div key={i} style={{
              width: '46px',
              height: '62px',
              background: '#f5f0e8',
              borderRadius: '2px',
              border: '0.5px solid #b8b2a5',
              position: 'relative',
              zIndex: 1,
              marginTop: i === 1 ? '14px' : '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '22px', height: '22px',
                border: '1px solid #c8c2b5',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', color: '#c8c2b5',
              }}>×</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.5rem 1.25rem 1.1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f5f0e8',
        }}>
          <span style={{ fontSize: '11px', color: '#888070', letterSpacing: '0.08em' }}>
            2 pieces available
          </span>
          <span style={{
            fontSize: '11px',
            color: '#5a4a30',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Enter <span className="enter-arrow">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
