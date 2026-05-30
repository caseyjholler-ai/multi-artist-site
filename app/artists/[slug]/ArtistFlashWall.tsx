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

// SVG doodles
const SkullDoodle = () => (
  <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.22}}>
    <ellipse cx="18" cy="17" rx="13" ry="14" stroke="#1a1a1a" strokeWidth="1.5"/>
    <rect x="10" y="28" width="16" height="10" rx="2" stroke="#1a1a1a" strokeWidth="1.5"/>
    <line x1="18" y1="28" x2="18" y2="38" stroke="#1a1a1a" strokeWidth="1.2"/>
    <line x1="10" y1="33" x2="26" y2="33" stroke="#1a1a1a" strokeWidth="1.2"/>
    <circle cx="13" cy="16" r="3" stroke="#1a1a1a" strokeWidth="1.2"/>
    <circle cx="23" cy="16" r="3" stroke="#1a1a1a" strokeWidth="1.2"/>
    <path d="M15 23 Q18 26 21 23" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
  </svg>
)

const RoseDoodle = () => (
  <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.22}}>
    <line x1="16" y1="20" x2="16" y2="48" stroke="#1a1a1a" strokeWidth="1.5"/>
    <path d="M16 20 Q8 14 10 8 Q16 4 16 12 Q16 4 22 8 Q24 14 16 20Z" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
    <path d="M12 28 Q8 26 10 30" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
    <path d="M20 34 Q24 32 22 36" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
  </svg>
)

const DaggerDoodle = () => (
  <svg width="24" height="56" viewBox="0 0 24 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.22}}>
    <path d="M12 2 L16 14 L12 52 L8 14 Z" stroke="#1a1a1a" strokeWidth="1.3" fill="none"/>
    <rect x="6" y="14" width="12" height="4" rx="1" stroke="#1a1a1a" strokeWidth="1.3"/>
    <rect x="9" y="18" width="6" height="8" rx="1" stroke="#1a1a1a" strokeWidth="1.3"/>
  </svg>
)

const SnakeDoodle = () => (
  <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.22}}>
    <path d="M15 55 Q5 48 15 40 Q25 32 15 24 Q5 16 15 8 Q20 4 22 8" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
    <ellipse cx="22" cy="6" rx="4" ry="3" stroke="#1a1a1a" strokeWidth="1.2"/>
    <path d="M20 4 L18 2 M24 4 L26 2" stroke="#1a1a1a" strokeWidth="1"/>
    <circle cx="21" cy="6" r="1" fill="#1a1a1a"/>
  </svg>
)

// One doodle per slot, cycling through 4
const DOODLES = [SkullDoodle, RoseDoodle, DaggerDoodle, SnakeDoodle]

// PunchHole component
const PunchHole = () => (
  <div style={{
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#e8e0d0',
    border: '1px solid #c8bfae',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
    margin: '0 auto',
  }} />
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

  // Build margin column: header gets first hole, then each artwork
  // gets: hole → doodle → hole
  // Pattern repeats: skull, rose, dagger, snake, skull, rose...
  const marginItems: React.ReactNode[] = []

  // Top hole (before header)
  marginItems.push(
    <div key="top-hole" style={{ padding: '20px 0 16px' }}>
      <PunchHole />
    </div>
  )

  // One margin unit per artwork
  artworks.forEach((artwork, i) => {
    const Doodle = DOODLES[i % DOODLES.length]
    marginItems.push(
      <div key={`unit-${artwork.id}`} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '24px 0',
      }}>
        <Doodle />
        <PunchHole />
      </div>
    )
  })

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

      {/* Left margin column — scrolls with page */}
      <div style={{
        width: '72px',
        flexShrink: 0,
        position: 'relative',
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
        {/* Scrolling holes and doodles */}
        <div style={{ paddingLeft: '8px' }}>
          {marginItems}
        </div>
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
          <div style={{
            height: '2px',
            background: '#1a1a1a',
            marginBottom: '8px',
          }} />
          {artistBio && (
            <p style={{
              fontSize: '0.85rem',
              color: '#444',
              fontStyle: 'italic',
              letterSpacing: '0.04em',
            }}>
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
              {/* Frame card */}
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
                {/* Inner frame */}
                <div style={{
                  border: '1px solid #8a7a6a',
                  padding: '8px',
                }}>
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

                {/* Card label */}
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

              {/* Expanded buy panel */}
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
                    <span style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                      display: 'block',
                      marginBottom: '4px',
                    }}>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBuy(artwork)
                    }}
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

                  {/* Stamp footer */}
                  <div style={{
                    marginTop: '14px',
                    paddingTop: '10px',
                    borderTop: '1px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      background: '#c0392b',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}>
                      {artistName.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>
                      Original work by {artistName}
                    </span>
                  </div>
                </div>
              )}

              {/* Divider between cards */}
              {index < artworks.length - 1 && (
                <div style={{
                  textAlign: 'center',
                  color: '#aaa',
                  fontSize: '0.7rem',
                  letterSpacing: '0.3em',
                  margin: '8px 0 16px',
                }}>
                  · · ·
                </div>
              )}
            </div>
          ))
        )}

        {/* Page footer */}
        <div style={{
          marginTop: '48px',
          paddingTop: '16px',
          borderTop: '2px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#c0392b',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}>
            {artistName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#c8a84b', letterSpacing: '0.06em' }}>
              {artistName}
            </div>
            {artistBio && (
              <div style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>
                {artistBio}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
