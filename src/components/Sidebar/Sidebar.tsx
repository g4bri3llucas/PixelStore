import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar = ({ isOpen, toggleMenu }: SidebarProps) => {
  const menuItems = [
    { icon: 'fa-solid fa-border-all', label: 'Catálogo' },
    { icon: 'fa-solid fa-tag', label: 'Ofertas', hasArrow: true },
    { icon: 'fa-solid fa-circle-dollar-to-slot', label: 'Gift Cards', hasArrow: true },
    { icon: 'fa-brands fa-windows', label: 'PC', hasArrow: true },
    { icon: 'fa-brands fa-playstation', label: 'Playstation', hasArrow: true },
    { icon: 'fa-brands fa-xbox', label: 'Xbox', hasArrow: true },
    { icon: 'fa-solid fa-gamepad', label: 'Nintendo', hasArrow: true },
    { icon: 'fa-solid fa-mobile-screen', label: 'Mobile', hasArrow: true },
  ];

  return (
    <>
      {isOpen && <div className="overlay" onClick={toggleMenu} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <i className={`${item.icon} item-icon`}></i>
              <span className="item-label">{item.label}</span>
              {item.hasArrow && <i className="fa-solid fa-chevron-right item-arrow"></i>}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;