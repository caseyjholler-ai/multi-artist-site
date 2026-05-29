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

export default function ArtistGothicGallery({ artistName, artistBio, artworks }: Props) {
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

  const handleCardClick = (id: number) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  // Pair artworks into rows of 2
  const rows: Artwork[][] = []
  for (let i = 0; i < artworks.length; i += 2) {
    rows.push(artworks.slice(i, i + 2))
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#2a1a35',
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.022) 3px, rgba(255,255,255,0.022) 4px),
        repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.014) 3px, rgba(255,255,255,0.014) 4px)
      `,
      fontFamily: '"IM Fell English", Georgia, serif',
      position: 'relative',
      overflowX: 'hidden',
    }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap');

        .gothic-card {
          cursor: pointer;
          transition: transform 0.15s ease;
          border: 2px solid #b040d8;
          padding: 8px;
          background: #3a2248;
          box-shadow: 0 0 0 1px rgba(200,80,255,0.2), 0 0 18px rgba(180,50,240,0.15), inset 0 0 10px rgba(0,0,0,0.25);
          position: relative;
        }
        .gothic-card::before {
          content: '';
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(220,100,255,0.2);
          pointer-events: none;
          z-index: 1;
        }
        .gothic-card:hover {
          transform: translateY(-3px);
        }
        .gothic-card.is-expanded {
          border-color: #ff55ff;
          background: #3d2050;
          box-shadow: 0 0 0 1px rgba(255,80,255,0.35), 0 0 40px rgba(220,60,255,0.25), inset 0 0 14px rgba(0,0,0,0.2);
          cursor: default;
          transform: none;
        }
        .gothic-card.is-expanded:hover {
          transform: none;
        }
        .buy-btn-gothic {
          width: 100%;
          padding: 13px;
          background: #f5e8ff;
          border: 1px solid #cc88ff;
          color: #5500aa;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 0 16px rgba(200,100,255,0.3);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .buy-btn-gothic:hover:not(:disabled) {
          background: #eedeff;
        }
        .buy-btn-gothic:disabled {
          background: #c8b0e0;
          color: #8866aa;
          cursor: not-allowed;
        }
        .fc-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .fc-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .fc-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .fc-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
      `}</style>

      {/* Top-left cobweb */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: 160, height: 160, pointerEvents: 'none', zIndex: 5 }} viewBox="0 0 160 160">
        <g stroke="rgba(240,100,255,0.28)" strokeWidth="0.8" fill="none">
          <line x1="0" y1="0" x2="160" y2="0"/>
          <line x1="0" y1="0" x2="0" y2="160"/>
          <line x1="0" y1="0" x2="112" y2="112"/>
          <line x1="0" y1="0" x2="58" y2="138"/>
          <line x1="0" y1="0" x2="138" y2="58"/>
          <path d="M 24 0 Q 17 17 0 24"/>
          <path d="M 56 0 Q 40 40 0 56"/>
          <path d="M 96 0 Q 68 68 0 96"/>
          <path d="M 132 0 Q 93 93 0 132"/>
        </g>
      </svg>

      {/* Top-right cobweb */}
      <svg style={{ position: 'fixed', top: 0, right: 0, width: 130, height: 130, pointerEvents: 'none', zIndex: 5, transform: 'scaleX(-1)' }} viewBox="0 0 130 130">
        <g stroke="rgba(240,100,255,0.2)" strokeWidth="0.7" fill="none">
          <line x1="0" y1="0" x2="130" y2="0"/>
          <line x1="0" y1="0" x2="0" y2="130"/>
          <line x1="0" y1="0" x2="91" y2="91"/>
          <line x1="0" y1="0" x2="44" y2="112"/>
          <line x1="0" y1="0" x2="112" y2="44"/>
          <path d="M 20 0 Q 14 14 0 20"/>
          <path d="M 50 0 Q 36 36 0 50"/>
          <path d="M 90 0 Q 64 64 0 90"/>
        </g>
      </svg>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '52px 40px 32px',
        borderBottom: '1px solid rgba(255,100,255,0.28)',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: '"Cinzel", serif',
          fontSize: '0.65rem',
          letterSpacing: '0.55em',
          color: 'rgba(255,160,255,0.8)',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          ✦ Original Works ✦
        </div>
        <h1 style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 700,
          color: '#ff55ff',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          margin: '0 0 10px',
          textShadow: '0 0 20px rgba(255,80,255,0.7), 0 0 50px rgba(220,50,255,0.35)',
        }}>
          {artistName}
        </h1>
        {artistBio && (
          <p style={{
            fontStyle: 'italic',
            color: '#e8c8ff',
            fontSize: '0.95rem',
            letterSpacing: '0.04em',
            margin: 0,
          }}>
            {artistBio}
          </p>
        )}
        <div style={{ color: 'rgba(255,120,255,0.45)', fontSize: '1rem', letterSpacing: '0.5em', marginTop: '10px' }}>
          — ✦ —
        </div>
      </div>

      {/* Gallery */}
      <div style={{
        maxWidth: '780px',
        margin: '0 auto',
        padding: '40px 32px 80px',
      }}>
        {artworks.length === 0 ? (
          <p style={{ color: '#ddb8f5', fontStyle: 'italic', textAlign: 'center' }}>
            No artwork available right now.
          </p>
        ) : (
          rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {/* Divider between rows */}
              {rowIndex > 0 && (
                <div style={{
                  textAlign: 'center',
                  color: 'rgba(220,100,255,0.35)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.4em',
                  padding: '8px 0 16px',
                }}>
                  ✦ · · · ✦ · · · ✦
                </div>
              )}

              {/* Row grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
              }}>
                {row.map((artwork, colIndex) => {
                  const isExpanded = openId === artwork.id
                  const rowHasExpanded = row.some(a => a.id === openId)
                  const partnerIndex = colIndex === 0 ? 1 : 0
                  const partner = row[partnerIndex]
                  const isDisplaced = rowHasExpanded && !isExpanded && partner && openId === partner.id

                  return (
                    <div
                      key={artwork.id}
                      style={{
                        gridColumn: isExpanded ? '1 / -1' : isDisplaced ? '1 / 2' : 'auto',
                        transition: 'grid-column 0.35s ease',
                      }}
                    >
                      <div
                        className={`gothic-card${isExpanded ? ' is-expanded' : ''}`}
                        onClick={() => !isExpanded && handleCardClick(artwork.id)}
                      >
                        {/* Corner brackets */}
                        {(['tl','tr','bl','br'] as const).map(pos => (
                          <div key={pos} className={`fc-${pos}`} style={{
                            position: 'absolute',
                            width: 14,
                            height: 14,
                            borderColor: '#e060ff',
                            borderStyle: 'solid',
                            opacity: 0.9,
                            zIndex: 2,
                          }} />
                        ))}

                        {isExpanded ? (
                          /* EXPANDED layout: image left, details right */
                          <div style={{ display: 'flex', alignItems: 'stretch' }}>
                            {/* Image */}
                            <div style={{
                              width: '55%',
                              flexShrink: 0,
                              background: '#4a2860',
                              minHeight: '280px',
                              overflow: 'hidden',
                            }}>
                              {artwork.image_url ? (
                                <img
                                  src={artwork.image_url}
                                  alt={artwork.title}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                  }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'rgba(220,140,255,0.25)',
                                  fontFamily: '"Cinzel", serif',
                                  fontSize: '0.65rem',
                                  letterSpacing: '0.1em',
                                }}>
                                  no image
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div style={{
                              flex: 1,
                              padding: '22px 24px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              borderLeft: '1px solid rgba(220,100,255,0.3)',
                              background: '#3d2050',
                            }}>
                              <div>
                                <div style={{
                                  fontFamily: '"Cinzel", serif',
                                  fontSize: '1.1rem',
                                  fontWeight: 700,
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase',
                                  color: '#ff77ff',
                                  textShadow: '0 0 16px rgba(255,100,255,0.5)',
                                  marginBottom: '6px',
                                }}>
                                  {artwork.title}
                                </div>
                                <div style={{
                                  fontSize: '1.6rem',
                                  fontStyle: 'italic',
                                  color: '#f8e0ff',
                                  marginBottom: '10px',
                                }}>
                                  ${artwork.price}
                                </div>
                                <div style={{
                                  display: 'inline-block',
                                  marginBottom: '12px',
                                  fontSize: '0.62rem',
                                  letterSpacing: '0.14em',
                                  textTransform: 'uppercase',
                                  color: '#f0c0ff',
                                  border: '1px solid rgba(220,120,255,0.45)',
                                  padding: '3px 10px',
                                  fontFamily: '"Cinzel", serif',
                                  background: 'rgba(180,60,220,0.2)',
                                }}>
                                  {artwork.type}
                                </div>
                                {artwork.description && (
                                  <p style={{
                                    fontStyle: 'italic',
                                    color: '#ddb8f5',
                                    fontSize: '0.88rem',
                                    lineHeight: 1.65,
                                    margin: '0 0 16px',
                                  }}>
                                    {artwork.description}
                                  </p>
                                )}
                              </div>

                              <div>
                                <button
                                  className="buy-btn-gothic"
                                  disabled={loadingId === artwork.id}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleBuy(artwork)
                                  }}
                                >
                                  {loadingId === artwork.id
                                    ? 'Redirecting to checkout...'
                                    : `✦ Purchase This Work ✦`}
                                </button>
                                <div
                                  onClick={() => setOpenId(null)}
                                  style={{
                                    fontSize: '0.62rem',
                                    letterSpacing: '0.08em',
                                    color: 'rgba(220,160,240,0.5)',
                                    fontStyle: 'italic',
                                    textAlign: 'right',
                                    marginTop: '8px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  tap to collapse
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* COLLAPSED layout: image + label */
                          <>
                            <div style={{
                              width: '100%',
                              aspectRatio: '3/4',
                              background: '#4a2860',
                              overflow: 'hidden',
                            }}>
                              {artwork.image_url ? (
                                <img
                                  src={artwork.image_url}
                                  alt={artwork.title}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                  }}
                                />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'rgba(220,140,255,0.25)',
                                  fontFamily: '"Cinzel", serif',
                                  fontSize: '0.65rem',
                                  letterSpacing: '0.1em',
                                }}>
                                  no image
                                </div>
                              )}
                            </div>
                            <div style={{
                              padding: '8px 4px 2px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'baseline',
                            }}>
                              <span style={{
                                fontFamily: '"Cinzel", serif',
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: '#ff77ff',
                                textShadow: '0 0 8px rgba(255,100,255,0.4)',
                              }}>
                                {artwork.title}
                              </span>
                              <span style={{
                                fontStyle: 'italic',
                                color: '#f0c8ff',
                                fontSize: '0.85rem',
                              }}>
                                ${artwork.price}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '28px 40px 40px',
        borderTop: '1px solid rgba(200,80,255,0.2)',
        margin: '0 40px',
      }}>
        <div style={{
          fontFamily: '"Cinzel", serif',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          color: 'rgba(220,140,255,0.5)',
          textTransform: 'uppercase',
        }}>
          {artistName} · ArtistShop
        </div>
      </div>
    </div>
  )
}
