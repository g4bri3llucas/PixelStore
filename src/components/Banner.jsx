const Banner = ({ game }) => {
  if (!game) return null;

  return (
    <div className="banner" style={{
      backgroundImage: `linear-gradient(to right, #020617 30%, transparent), url(${game.image})`,
      height: '400px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      padding: '40px',
      marginBottom: '30px'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem' }}>{game.title}</h1>
        <p style={{ color: '#9ca3af', margin: '20px 0' }}>Disponível agora na PixelStore.</p>
        <button className="login-button" style={{ padding: '12px 30px' }}>Ver Detalhes</button>
      </div>
    </div>
  );
};

export default Banner;