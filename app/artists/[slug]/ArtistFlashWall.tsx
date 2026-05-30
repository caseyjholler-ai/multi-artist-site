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

const MARGIN_TILE_HEIGHT = 480

const MARGIN_TILE_SVG = '%3Csvg%20width%3D%2256%22%20height%3D%22480%22%20viewBox%3D%220%200%2056%20480%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%2230%22%20r%3D%2213%22%20fill%3D%22%2523ddd5c5%22%20stroke%3D%22%2523b8b0a0%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%2230%22%20r%3D%2210%22%20fill%3D%22%2523c8bfae%22%2F%3E%3Cg%20transform%3D%22translate(10%2C75)%22%20opacity%3D%220.45%22%3E%3Cellipse%20cx%3D%2218%22%20cy%3D%2217%22%20rx%3D%2213%22%20ry%3D%2214%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.5%22%2F%3E%3Crect%20x%3D%2210%22%20y%3D%2228%22%20width%3D%2216%22%20height%3D%2210%22%20rx%3D%222%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%2218%22%20y1%3D%2228%22%20x2%3D%2218%22%20y2%3D%2238%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%2F%3E%3Cline%20x1%3D%2210%22%20y1%3D%2233%22%20x2%3D%2226%22%20y2%3D%2233%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2216%22%20r%3D%223%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%2223%22%20cy%3D%2216%22%20r%3D%223%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%2F%3E%3Cpath%20d%3D%22M15%2023%20Q18%2026%2021%2023%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%20fill%3D%22none%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%22150%22%20r%3D%2213%22%20fill%3D%22%2523ddd5c5%22%20stroke%3D%22%2523b8b0a0%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%22150%22%20r%3D%2210%22%20fill%3D%22%2523c8bfae%22%2F%3E%3Cg%20transform%3D%22translate(12%2C192)%22%20opacity%3D%220.45%22%3E%3Cline%20x1%3D%2216%22%20y1%3D%2220%22%20x2%3D%2216%22%20y2%3D%2258%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.5%22%2F%3E%3Cpath%20d%3D%22M16%2020%20Q8%2014%2010%208%20Q16%204%2016%2012%20Q16%204%2022%208%20Q24%2014%2016%2020Z%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M12%2032%20Q8%2030%2010%2034%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M20%2044%20Q24%2042%2022%2046%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%20fill%3D%22none%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%22280%22%20r%3D%2213%22%20fill%3D%22%2523ddd5c5%22%20stroke%3D%22%2523b8b0a0%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%22280%22%20r%3D%2210%22%20fill%3D%22%2523c8bfae%22%2F%3E%3Cg%20transform%3D%22translate(16%2C312)%22%20opacity%3D%220.45%22%3E%3Cpath%20d%3D%22M12%202%20L16%2014%20L12%2052%20L8%2014%20Z%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.3%22%20fill%3D%22none%22%2F%3E%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2212%22%20height%3D%224%22%20rx%3D%221%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.3%22%2F%3E%3Crect%20x%3D%229%22%20y%3D%2218%22%20width%3D%226%22%20height%3D%228%22%20rx%3D%221%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.3%22%2F%3E%3C%2Fg%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%22400%22%20r%3D%2213%22%20fill%3D%22%2523ddd5c5%22%20stroke%3D%22%2523b8b0a0%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%2228%22%20cy%3D%22400%22%20r%3D%2210%22%20fill%3D%22%2523c8bfae%22%2F%3E%3Cg%20transform%3D%22translate(13%2C422)%22%20opacity%3D%220.45%22%3E%3Cpath%20d%3D%22M15%2050%20Q5%2043%2015%2035%20Q25%2027%2015%2019%20Q5%2011%2015%203%20Q20%20-1%2022%203%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3Cellipse%20cx%3D%2222%22%20cy%3D%221%22%20rx%3D%224%22%20ry%3D%223%22%20stroke%3D%22%25231a1a1a%22%20stroke-width%3D%221.2%22%2F%3E%3Ccircle%20cx%3D%2221%22%20cy%3D%221%22%20r%3D%221%22%20fill%3D%22%25231a1a1a%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'

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
      backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #b8c4d4 31px, #b8c4d4 32px)',
      backgroundSize: '100% 32px',
      backgroundPosition: '0 60px',
      position: 'relative',
      fontFamily: '"Courier New", Courier, monospace',
      display: 'flex',
    }}>

      {/* Left margin column — scrolls with page, tiles forever */}
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
        {/* Tiling SVG — holes + doodles repeat forever */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: '2px',
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,' + MARGIN_TILE_SVG + '")',
          backgroundRepeat: 'repeat-y',
          backgroundSize: '56px ' + MARGIN_TILE_HEIGHT + 'px',
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
                    {loadingId === artwork.id ? 'Redirecting to checkout...' : 'Buy Now — $' + artwork.price}
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
