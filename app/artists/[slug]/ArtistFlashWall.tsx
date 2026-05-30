'use client'

import { useState } from 'react'

interface Artwork {
  id: number
  title: string
  description: string | null
  price: number
  image_url: string | null
  type: string
  status: string
}

interface Props {
  artistName: string
  artistBio: string | null
  artworks: Artwork[]
}

// SVG tile for the margin — one repeating unit:
// hole → skull → hole → rose → hole → dagger → hole → snake
// Each unit is 480px tall, tiling vertically forever
const MARGIN_TILE_HEIGHT = 480

const MarginTileSVG = () => (
  <svg
    width="56"
    height={MARGIN_TILE_HEIGHT}
    viewBox={`0 0 56 ${MARGIN_TILE_HEIGHT}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    {/* ── Hole 1 at y=20 ── */}
    <circle cx="28" cy="30" r="13" fill="#e8e0d0" stroke="#c8bfae" strokeWidth="1"/>
    <circle cx="28" cy="30" r="12" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>

    {/* ── Skull at y=80 ── */}
    <g transform="translate(10, 80)" opacity="0.22">
      <ellipse cx="18" cy="17" rx="13" ry="14" stroke="#1a1a1a" strokeWidth="1.5"/>
      <rect x="10" y="28" width="16" height="10" rx="2" stroke="#1a1a1a" strokeWidth="1.5"/>
      <line x1="18" y1="28" x2="18" y2="38" stroke="#1a1a1a" strokeWidth="1.2"/>
      <line x1="10" y1="33" x2="26" y2="33" stroke="#1a1a1a" strokeWidth="1.2"/>
      <circle cx="13" cy="16" r="3" stroke="#1a1a1a" strokeWidth="1.2"/>
      <circle cx="23" cy="16" r="3" stroke="#1a1a1a" strokeWidth="1.2"/>
      <path d="M15 23 Q18 26 21 23" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
    </g>

    {/* ── Hole 2 at y=150 ── */}
    <circle cx="28" cy="150" r="13" fill="#e8e0d0" stroke="#c8bfae" strokeWidth="1"/>
    <circle cx="28" cy="150" r="12" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>

    {/* ── Rose at y=200 ── */}
    <g transform="translate(12, 200)" opacity="0.22">
      <line x1="16" y1="20" x2="16" y2="58" stroke="#1a1a1a" strokeWidth="1.5"/>
      <path d="M16 20 Q8 14 10 8 Q16 4 16 12 Q16 4 22 8 Q24 14 16 20Z" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
      <path d="M12 32 Q8 30 10 34" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
      <path d="M20 44 Q24 42 22 46" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
    </g>

    {/* ── Hole 3 at y=280 ── */}
    <circle cx="28" cy="280" r="13" fill="#e8e0d0" stroke="#c8bfae" strokeWidth="1"/>
    <circle cx="28" cy="280" r="12" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>

    {/* ── Dagger at y=318 ── */}
    <g transform="translate(16, 318)" opacity="0.22">
      <path d="M12 2 L16 14 L12 52 L8 14 Z" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
      <rect x="6" y="14" width="12" height="4" rx="1" stroke="#1a1a1a" strokeWidth="1.3"/>
      <rect x="9" y="18" width="6" height="8" rx="1" stroke="#1a1a1a" strokeWidth="1.3"/>
    </g>

    {/* ── Hole 4 at y=400 ── */}
    <circle cx="28" cy="400" r="13" fill="#e8e0d0" stroke="#c8bfae" strokeWidth="1"/>
    <circle cx="28" cy="400" r="12" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>

    {/* ── Snake at y=425 ── */}
    <g transform="translate(13, 425)" opacity="0.22">
      <path d="M15 50 Q5 43 15 35 Q25 27 15 19 Q5 11 15 3 Q20 -1 22 3" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
      <ellipse cx="22" cy="1" rx="4" ry="3" stroke="#1a1a1a" strokeWidth="1.2"/>
      <path d="M20 -1 L18 -3 M24 -1 L26 -3" stroke="#1a1a1a" strokeWidth="1"/>
      <circle cx="21" cy="1" r="1" fill="#1a1a1a"/>
    </g>
  </svg>
)

export default function ArtistFlashWall({ artistName, artistBio, artworks }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const handleBuy = async (artwork: Artwork) => {
    setLoadingId(artwork.id)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artworkId: artwork.id,
          title: artwork.title,
          price: artwork.price,
          artistName,
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f0e8',
      backgroundImage: `
        repeating-linear-gradient(
          transparent,
          transparent 31px,
          #b8c4d4 31px,
          #b8c4d4 32px
        )
      `,
      backgroundSize: '100% 32px',
      backgroundPosition: '0 60px',
      position: 'relative',
      fontFamily: '"Courier New", Courier, monospace',
      display: 'flex',
    }}>

      {/* Left margin column — CSS tiling, fills full page height */}
      <div style={{
        width: '72px',
        flexShrink: 0,
        position: 'relative',
        alignSelf: 'stretch',
        zIndex: 2,
      }}>
        {/* Red margin line */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: '#c0392b',
          opacity: 0.5,
        }} />
        {/* Tiling SVG background — repeats forever down the page */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: '2px',
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="56" height="${MARGIN_TILE_HEIGHT}" viewBox="0 0 56 ${MARGIN_TILE_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="28" cy="30" r="13" fill="%23e8e0d0" stroke="%23c8bfae" stroke-width="1"/>
  <circle cx="28" cy="30" r="12" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>
  <g transform="translate(10,80)" opacity="0.22">
    <ellipse cx="18" cy="17" rx="13" ry="14" stroke="%231a1a1a" stroke-width="1.5"/>
    <rect x="10" y="28" width="16" height="10" rx="2" stroke="%231a1a1a" stroke-width="1.5"/>
    <line x1="18" y1="28" x2="18" y2="38" stroke="%231a1a1a" stroke-width="1.2"/>
    <line x1="10" y1="33" x2="26" y2="33" stroke="%231a1a1a" stroke-width="1.2"/>
    <circle cx="13" cy="16" r="3" stroke="%231a1a1a" stroke-width="1.2"/>
    <circle cx="23" cy="16" r="3" stroke="%231a1a1a" stroke-width="1.2"/>
    <path d="M15 23 Q18 26 21 23" stroke="%231a1a1a" stroke-width="1.2" fill="none"/>
  </g>
  <circle cx="28" cy="150" r="13" fill="%23e8e0d0" stroke="%23c8bfae" stroke-width="1"/>
  <circle cx="28" cy="150" r="12" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>
  <g transform="translate(12,200)" opacity="0.22">
    <line x1="16" y1="20" x2="16" y2="58" stroke="%231a1a1a" stroke-width="1.5"/>
    <path d="M16 20 Q8 14 10 8 Q16 4 16 12 Q16 4 22 8 Q24 14 16 20Z" stroke="%231a1a1a" stroke-width="1.2" fill="none"/>
    <path d="M12 32 Q8 30 10 34" stroke="%231a1a1a" stroke-width="1.2" fill="none"/>
    <path d="M20 44 Q24 42 22 46" stroke="%231a1a1a" stroke-width="1.2" fill="none"/>
  </g>
  <circle cx="28" cy="280" r="13" fill="%23e8e0d0" stroke="%23c8bfae" stroke-width="1"/>
  <circle cx="28" cy="280" r="12" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>
  <g transform="translate(16,318)" opacity="0.22">
    <path d="M12 2 L16 14 L12 52 L8 14 Z" stroke="%231a1a1a" stroke-width="1.3" fill="none"/>
    <rect x="6" y="14" width="12" height="4" rx="1" stroke="%231a1a1a" stroke-width="1.3"/>
    <rect x="9" y="18" width="6" height="8" rx="1" stroke="%231a1a1a" stroke-width="1.3"/>
  </g>
  <circle cx="28" cy="400" r="13" fill="%23e8e0d0" stroke="%23c8bfae" stroke-width="1"/>
  <circle cx="28" cy="400" r="12" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>
  <g transform="translate(13,425)" opacity="0.22">
    <path d="M15 50 Q5 43 15 35 Q25 27 15 19 Q5 11 15 3 Q20 -1 22 3" stroke="%231a1a1a" stroke-width="1.5" fill="none"/>
    <ellipse cx="22" cy="1" rx="4" ry="3" stroke="%231a1a1a" stroke-width="1.2"/>
    <circle cx="21" cy="1" r="1" fill="%231a1a1a"/>
  </g>
</svg>`)}`)`,
          backgroundRepeat: 'repeat-y',
          backgroundSize: `56px ${MARGIN_TILE_HEIGHT}px`,
          backgroundPosition: '0 0',
        }} />
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '48px',
        paddingBottom: '80px',
        maxWidth: '760px',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            marginBottom: '6px',
            fontFamily: '"Courier New", Courier, monospace',
          }}>
            ✦ {artistName} ✦
          </h1>
          <div style={{ height: '2px', background: '#1a1a1a', marginBottom: '8px' }} />
          {artistBio && (
            <p style={{ fontSize: '0.85rem', color: '#444', fontStyle: 'italic', letterSpacing: '0.04em' }}>
              {artistBio}
            </p>
          )}
        </div>

        {/* Artwork cards */}
        {artworks.length === 0 ? (
          <p style={{ color: '#666', fontStyle: 'italic' }}>No artwork available right now.</p>
        ) : (
          artworks.map((artwork, index) => (
            <div key={artwork.id}>
              <div
                onClick={() => setOpenId(openId === artwork.id ? null : artwork.id)}
                style={{
                  cursor: 'pointer',
                  marginBottom: '8px',
                  padding: '12px',
                  border: '3px solid #1a1a1a',
                  boxShadow: '4px 4px 0 #1a1a1a',
                  background: '#faf7f2',
                  position: 'relative',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translate(-2px, -2px)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '6px 6px 0 #1a1a1a'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translate(0, 0)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 0 #1a1a1a'
                }}
              >
                <div style={{ border: '1px solid #8a7a6a', padding: '8px' }}>
                  {artwork.image_url && (
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'contain',
                        display: 'block',
                        background: '#faf7f2',
                      }}
                    />
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '8px',
                  paddingTop: '6px',
                  borderTop: '1px dashed #aaa',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {artwork.title}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#c0392b', fontWeight: 'bold' }}>
                    {openId === artwork.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {openId === artwork.id && (
                <div style={{
                  marginBottom: '16px',
                  padding: '20px',
                  border: '2px solid #1a1a1a',
                  borderTop: 'none',
                  background: '#fff9f0',
                  boxShadow: '4px 4px 0 #1a1a1a',
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1a1a1a', display: 'block', marginBottom: '4px' }}>
                      ${artwork.price}
                    </span>
                    {artwork.description && (
                      <p style={{ fontSize: '0.85rem', color: '#555', fontStyle: 'italic', margin: 0 }}>
                        {artwork.description}
                      </p>
                    )}
                    <span style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#888',
                      border: '1px solid #ccc',
                      padding: '2px 6px',
                    }}>
                      {artwork.type}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleBuy(artwork) }}
                    disabled={loadingId === artwork.id}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: loadingId === artwork.id ? '#888' : '#1a1a1a',
                      color: '#f5f0e8',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: loadingId === artwork.id ? 'not-allowed' : 'pointer',
                      fontFamily: '"Courier New", Courier, monospace',
                      transition: 'background 0.2s',
                    }}
                  >
                    {loadingId === artwork.id ? 'Redirecting to checkout...' : `Buy Now — $${artwork.price}`}
                  </button>
                  <div style={{
                    marginTop: '14px',
                    paddingTop: '10px',
                    borderTop: '1px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <div style={{
                      width: '28px', height: '28px',
                      background: '#c0392b', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 'bold', fontSize: '0.9rem', flexShrink: 0,
                    }}>
                      {artistName.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>
                      Original work by {artistName}
                    </span>
                  </div>
                </div>
              )}

              {index < artworks.length - 1 && (
                <div style={{ textAlign: 'center', color: '#aaa', fontSize: '0.7rem', letterSpacing: '0.3em', margin: '8px 0 16px' }}>
                  · · ·
                </div>
              )}
            </div>
          ))
        )}

        {/* Page footer */}
        <div style={{
          marginTop: '48px', paddingTop: '16px',
          borderTop: '2px solid #1a1a1a',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '36px', height: '36px',
            background: '#c0392b', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1rem',
          }}>
            {artistName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#c8a84b', letterSpacing: '0.06em' }}>
              {artistName}
            </div>
            {artistBio && (
              <div style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>{artistBio}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
