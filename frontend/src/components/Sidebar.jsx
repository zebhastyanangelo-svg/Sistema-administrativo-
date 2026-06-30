import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const NAV_SECTIONS = [
  {
    label: 'Principal',
    items: [
      { to: '/', icon: 'gauge', label: 'Dashboard' },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { to: '/companies', icon: 'building', label: 'Empresas' },
      { to: '/clients', icon: 'users', label: 'Clientes' },
      { to: '/suppliers', icon: 'truck', label: 'Proveedores' },
      { to: '/invoices', icon: 'file-invoice-dollar', label: 'Facturas' },
      { to: '/products', icon: 'box-open', label: 'Productos' },
    ],
  },
  {
    label: 'Reportes',
    items: [
      { to: '/reports', icon: 'chart-simple', label: 'Reportes' },
      { to: '/settings', icon: 'gear', label: 'Configuración' },
    ],
  },
];

export default function Sidebar() {
  const { status } = useApp();
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <FontAwesomeIcon icon="pen" />
        </div>
        <div className="sidebar-logo-text">
          <h1>Sistema Admin</h1>
          <span>Panel de gestión</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className={`status-dot ${status === 'Conectado' ? 'online' : 'offline'}`} />
          <span style={{ flex: 1 }}>{status}</span>
        </div>
        {user && (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              <FontAwesomeIcon icon="user" />
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.username}</span>
              <button className="sidebar-logout" onClick={logout}>
                <FontAwesomeIcon icon="arrow-right-from-bracket" /> Salir
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
