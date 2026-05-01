import './Navbar.css';

const Navbar = ({ toggleMenu, isOpen }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>
        <h2 className="logo-text">
          PIXEL<span className="logo-highlight">STORE</span>
        </h2>
      </div>
      
      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <button className="login-button">Entrar</button>
      </div>
    </nav>
  );
};

export default Navbar;