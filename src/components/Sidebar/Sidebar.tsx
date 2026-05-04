import { FiGrid, FiTag, FiGift, FiMonitor, FiSmartphone, FiChevronRight } from "react-icons/fi";
import { SiPlaystation, SiXbox, SiNintendo } from "react-icons/si";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const mainItems = [
  { icon: <FiGrid size={16} />, label: "Catálogo", active: true },
  { icon: <FiTag size={16} />, label: "Ofertas", badge: "HOT", arrow: true },
  { icon: <FiGift size={16} />, label: "Gift Cards", arrow: true },
];

const platformItems = [
  { icon: <FiMonitor size={16} />, label: "PC / Windows", arrow: true },
  { icon: <SiPlaystation size={16} />, label: "PlayStation", arrow: true },
  { icon: <SiXbox size={16} />, label: "Xbox", arrow: true },
  { icon: <SiNintendo size={16} />, label: "Nintendo", arrow: true },
  { icon: <FiSmartphone size={16} />, label: "Mobile", arrow: true },
];

const Sidebar = ({ isOpen, toggleMenu }: SidebarProps) => {
  return (
    <>
      {isOpen && <div className="overlay" onClick={toggleMenu} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <span className="sidebar__section-label">Menu</span>

        {mainItems.map((item) => (
          <div key={item.label} className={`sidebar__item ${item.active ? "active" : ""}`}>
            <span className="sidebar__item-icon">{item.icon}</span>
            <span className="sidebar__item-label">{item.label}</span>
            {item.badge && (
              <span className="sidebar__item-badge">{item.badge}</span>
            )}
            {item.arrow && <FiChevronRight className="sidebar__item-arrow" size={12} />}
          </div>
        ))}

        <div className="sidebar__divider" />

        <span className="sidebar__section-label">Plataformas</span>

        {platformItems.map((item) => (
          <div key={item.label} className="sidebar__item">
            <span className="sidebar__item-icon">{item.icon}</span>
            <span className="sidebar__item-label">{item.label}</span>
            {item.arrow && <FiChevronRight className="sidebar__item-arrow" size={12} />}
          </div>
        ))}

        <div className="sidebar__promo">
          <div className="sidebar__promo-title">🎁 Indique e Ganhe</div>
          <div className="sidebar__promo-desc">
            Convide amigos e ganhe créditos em cada compra deles.
          </div>
          <button className="sidebar__promo-btn">Saiba Mais</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;