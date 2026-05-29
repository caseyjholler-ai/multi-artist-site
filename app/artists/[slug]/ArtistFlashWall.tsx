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
  artistBio: string
  artworks: Artwork[]
}

export default function ArtistFlashWall({ artistName, artistBio, artworks }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)
  const initial = artistName.charAt(0).toUpperCase()

  function toggle(id: number) {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Special+Elite&display=swap');

        .sb-root {
          background: #f5f0e0;
          font-family: 'Special Elite', serif;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }
        .sb-lines {
          position: fixed; inset: 0;
          background-image: linear-gradient(#b8c8d8 1px, transparent 1px);
          background-size: 100% 32px; background-position: 0 48px;
          pointer-events: none; z-index: 0;
        }
        .sb-margin {
          position: fixed; top: 0; bottom: 0; left: 52px;
          width: 2px; background: #e8a0a0; z-index: 1; pointer-events: none;
        }
        .sb-holes {
          position: fixed; top: 0; bottom: 0; left: 0; width: 26px;
          display: flex; flex-direction: column; align-items: center;
          justify-content: space-evenly; padding: 24px 0;
          pointer-events: none; z-index: 4;
        }
        .sb-hole {
          width: 18px; height: 18px; border-radius: 50%;
          background: #ddd8c4; border: 1.5px solid #b8b0a0;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.15);
        }
        .margin-doodle {
          position: fixed; pointer-events: none; z-index: 2; opacity: 0.22;
        }
        .sb-content {
          position: relative; z-index: 3; padding: 28px 20px 0 72px;
        }
        .sb-header {
          text-align: center; padding-bottom: 20px;
          border-bottom: 2px solid #2a2320; margin-bottom: 28px;
        }
        .sb-title {
          font-family: 'Permanent Marker', cursive;
          font-size: clamp(28px, 5vw, 42px);
          color: #2a2320; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px;
        }
        .sb-sub {
          font-size: 10px; letter-spacing: 6px; text-transform: uppercase;
          color: #7a5c2e; margin: 0 0 4px;
        }
        .sb-hint {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: #9a8060; margin: 8px 0 0;
        }
        .sb-sheet {
          display: flex; flex-direction: column; align-items: center;
          gap: 28px; padding-bottom: 28px; max-width: 560px; margin: 0 auto;
        }
        .sb-card { width: 100%; }
        .frame-btn {
          width: 100%; background: none; border: none; padding: 0;
          cursor: pointer; display: block;
        }
        .frame-outer {
          background: #f2ead6; border: 3px solid #2a2320;
          box-shadow: inset 0 0 0 5px #f5f0e0, inset 0 0 0 7px #2a2320;
          padding: 10px; transition: box-shadow 0.15s;
        }
        .frame-btn:hover .frame-outer {
          box-shadow: inset 0 0 0 5px #f5f0e0, inset 0 0 0 7px #c0392b;
        }
        .frame-outer.open {
          box-shadow: inset 0 0 0 5px #f5f0e0, inset 0 0 0 7px #c0392b;
          border: 3px solid #c0392b;
        }
        .frame-inner { border: 1.5px solid #2a2320; overflow: hidden; }
        .frame-img {
          width: 100%; display: block; aspect-ratio: 4/3; object-fit: cover;
        }
        .frame-img-placeholder {
          width: 100%; aspect-ratio: 4/3; background: #e0d8c0;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; color: #9a8060; letter-spacing: 2px; text-transform: uppercase;
        }
        .frame-nameplate {
          background: #2a2320; color: #c8a84b; padding: 7px 12px;
          border-top: 1.5px solid #2a2320;
          display: flex; justify-content: space-between; align-items: center;
        }
        .nameplate-title { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; }
        .nameplate-price {
          font-family: 'Permanent Marker', cursive; font-size: 15px; color: #c0392b;
        }
        .expand-panel {
          background: #f2ead6; border: 2px solid #c0392b; border-top: none;
          animation: slideDown 0.2s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .expand-body { padding: 20px 18px 16px; }
        .expand-title {
          font-family: 'Permanent Marker', cursive; font-size: 22px;
          color: #2a2320; margin-bottom: 10px; line-height: 1.2;
        }
        .expand-desc {
          font-size: 12px; color: #7a6040; line-height: 1.7; margin-bottom: 18px;
        }
        .expand-meta {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px; flex-wrap: wrap; gap: 8px;
        }
        .expand-price {
          font-family: 'Permanent Marker', cursive; font-size: 36px; color: #c0392b;
        }
        .expand-specs {
          font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
          color: #9a8060; text-align: right; line-height: 1.7;
        }
        .buy-btn {
          display: block; width: 100%; background: #2a2320; color: #f2ead6;
          border: none; padding: 12px; font-family: 'Special Elite', serif;
          font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
          cursor: pointer; transition: background 0.15s;
        }
        .buy-btn:hover { background: #c0392b; }
        .expand-stamp {
          background: rgba(200,168,75,0.12); border-top: 1px dashed #c8a84b;
          text-align: center; padding: 6px; font-size: 9px; letter-spacing: 3px;
          text-transform: uppercase; color: #7a6040;
        }
        .sb-divider {
          display: flex; align-items: center; gap: 10px;
          color: #2a2320; font-size: 13px; width: 100%; max-width: 560px;
        }
        .sb-divider::before, .sb-divider::after {
          content: ''; flex: 1; height: 1.5px; background: #2a2320;
        }
        .sb-footer {
          background: #2a2320; color: #c8a84b; padding: 24px 16px;
          text-align: center; position: relative; z-index: 3; margin-top: 8px;
        }
        .footer-init {
          width: 48px; height: 48px; background: #c0392b; border: 2px solid #c8a84b;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Permanent Marker', cursive; font-size: 24px;
          color: #f2ead6; margin: 0 auto 12px;
        }
        .footer-name {
          font-family: 'Permanent Marker', cursive; font-size: 20px;
          color: #c8a84b; margin-bottom: 6px;
        }
        .footer-bio {
          font-size: 11px; color: #8a7050; letter-spacing: 1px;
          line-height: 1.7; max-width: 320px; margin: 0 auto;
        }
        .empty-state {
          text-align: center; color: #9a8060; font-size: 12px;
          letter-spacing: 3px; text-transform: uppercase; padding: 40px 0;
        }
      `}</style>

      <div className="sb-root">
        <div className="sb-lines" />
        <div className="sb-margin" />

        <div className="sb-holes">
          {[...Array(6)].map((_, i) => <div key={i} className="sb-hole" />)}
        </div>

        {/* Skull top left */}
        <svg className="margin-doodle" style={{top:'52px',left:'27px',width:'24px',height:'24px',transform:'rotate(-8deg)'}} viewBox="0 0 42 42" fill="none">
          <ellipse cx="21" cy="18" rx="13" ry="14" stroke="#2a2320" strokeWidth="2.5" fill="none"/>
          <path d="M10 26 Q10 34 14 34 L14 38 L18 38 L18 34 L21 34 L21 38 L24 38 L24 34 L28 34 Q32 34 32 26" stroke="#2a2320" strokeWidth="2.5" fill="none"/>
          <circle cx="16" cy="17" r="3.5" stroke="#2a2320" strokeWidth="2" fill="none"/>
          <circle cx="26" cy="17" r="3.5" stroke="#2a2320" strokeWidth="2" fill="none"/>
          <path d="M19 22 Q21 24 23 22" stroke="#2a2320" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M18 28 L24 28" stroke="#2a2320" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Rose right upper */}
        <svg className="margin-doodle" style={{top:'190px',right:'6px',width:'28px',height:'40px',transform:'rotate(10deg)'}} viewBox="0 0 40 52" fill="none">
          <line x1="20" y1="52" x2="20" y2="24" stroke="#2a2320" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M20 38 Q12 34 14 28 Q16 22 20 24 Q24 22 26 28 Q28 34 20 38Z" stroke="#2a2320" strokeWidth="2" fill="none"/>
          <path d="M16 28 Q14 22 18 20 Q22 18 24 22" stroke="#2a2320" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M18 20 Q20 14 22 16 Q24 18 22 22" stroke="#2a2320" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M13 32 Q8 30 10 26" stroke="#2a2320" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M27 32 Q32 30 30 26" stroke="#2a2320" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>

        {/* Dagger left mid */}
        <svg className="margin-doodle" style={{top:'360px',left:'28px',width:'20px',height:'40px',transform:'rotate(5deg)'}} viewBox="0 0 34 56" fill="none">
          <path d="M17 2 L20 14 L17 18 L14 14 Z" stroke="#2a2320" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
          <rect x="13" y="18" width="8" height="4" rx="1" stroke="#2a2320" strokeWidth="2" fill="none"/>
          <path d="M9 22 L25 22" stroke="#2a2320" strokeWidth="2.4" strokeLinecap="round"/>
          <rect x="14" y="26" width="6" height="16" rx="1" stroke="#2a2320" strokeWidth="2" fill="none"/>
          <path d="M14 42 Q17 50 20 42" stroke="#2a2320" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M15 30 L19 30 M15 34 L19 34 M15 38 L19 38" stroke="#2a2320" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>

        {/* Snake right lower */}
        <svg className="margin-doodle" style={{top:'520px',right:'6px',width:'30px',height:'50px',transform:'rotate(-6deg)'}} viewBox="0 0 44 64" fill="none">
          <path d="M22 60 Q8 52 10 40 Q12 28 24 30 Q36 32 34 20 Q32 10 22 8 Q16 6 14 12" stroke="#2a2320" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <ellipse cx="14" cy="8" rx="5" ry="4" stroke="#2a2320" strokeWidth="2.2" fill="none"/>
          <path d="M11 7 Q9 4 8 6" stroke="#2a2320" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M17 7 Q19 4 20 6" stroke="#2a2320" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="12" cy="8" r="1.4" fill="#2a2320"/>
          <circle cx="16" cy="8" r="1.4" fill="#2a2320"/>
          <path d="M14 11 Q12 14 11 13 M14 11 Q16 14 17 13" stroke="#2a2320" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          <path d="M14 58 Q11 62 10 64 M14 58 Q17 62 18 64" stroke="#2a2320" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        </svg>

        <div className="sb-content">
          <div className="sb-header">
            <div className="sb-title">{artistName}&apos;s Flash</div>
            <div className="sb-sub">Traditional American · Digital Downloads</div>
            <div className="sb-hint">— tap a sheet to expand —</div>
          </div>

          <div className="sb-sheet">
            {artworks.length === 0 && (
              <div className="empty-state">No pieces available yet</div>
            )}

            {artworks.map((artwork, index) => (
              <div key={artwork.id} style={{width:'100%',maxWidth:'560px',display:'contents'}}>
                <div className="sb-card">
                  <button
                    className="frame-btn"
                    onClick={() => toggle(artwork.id)}
                    aria-label={`View ${artwork.title}`}
                    aria-expanded={openId === artwork.id}
                  >
                    <div className={`frame-outer${openId === artwork.id ? ' open' : ''}`}>
                      <div className="frame-inner">
                        {artwork.image_url ? (
                          <img className="frame-img" src={artwork.image_url} alt={artwork.title} />
                        ) : (
                          <div className="frame-img-placeholder">No image</div>
                        )}
                        <div className="frame-nameplate">
                          <span className="nameplate-title">{artwork.title}</span>
                          <span className="nameplate-price">${artwork.price}</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {openId === artwork.id && (
                    <div className="expand-panel">
                      <div className="expand-body">
                        <div className="expand-title">{artwork.title}</div>
                        {artwork.description && (
                          <div className="expand-desc">{artwork.description}</div>
                        )}
                        <div className="expand-meta">
                          <div className="expand-price">${artwork.price}</div>
                          <div className="expand-specs">
                            {artwork.type === 'digital' ? 'Digital Download' : 'Original'}
                          </div>
                        </div>
                        <button className="buy-btn">
                          {artwork.type === 'digital' ? 'Buy Print File' : 'Purchase Original'}
                        </button>
                      </div>
                      <div className="expand-stamp">
                        {artwork.type === 'digital'
                          ? 'High-res file delivered instantly after purchase'
                          : 'Contact artist to arrange shipping'}
                      </div>
                    </div>
                  )}
                </div>

                {index < artworks.length - 1 && (
                  <div className="sb-divider">✦</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <footer className="sb-footer">
          <div className="footer-init">{initial}</div>
          <div className="footer-name">{artistName}</div>
          <div className="footer-bio">{artistBio}</div>
        </footer>
      </div>
    </>
  )
}
