export default function SuccessPage() {
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Courier New", Courier, monospace',
    }}>
      <div style={{
        padding: '48px 40px',
        border: '3px solid #1a1a1a',
        boxShadow: '6px 6px 0 #1a1a1a',
        background: '#faf7f2',
        maxWidth: '480px',
        width: '90%',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '16px',
        }}>✦</div>
        <h1 style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#1a1a1a',
          marginBottom: '12px',
        }}>
          Payment Confirmed
        </h1>
        <div style={{
          height: '2px',
          background: '#1a1a1a',
          marginBottom: '20px',
        }} />
        <p style={{
          fontSize: '0.9rem',
          color: '#555',
          lineHeight: '1.7',
          marginBottom: '32px',
          fontStyle: 'italic',
        }}>
          Thank you for your purchase. The artist will be in touch shortly with next steps for your piece.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#1a1a1a',
            color: '#f5f0e8',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: '"Courier New", Courier, monospace',
          }}
        >
          Back to Gallery
        </a>
      </div>
    </div>
  )
}
