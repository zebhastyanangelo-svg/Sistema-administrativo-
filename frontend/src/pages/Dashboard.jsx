import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Loader } from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const statusBadge = (status) => {
  const map = { pagada: 'green', enviada: 'blue', borrador: 'gray' };
  return <Badge variant={map[status] || 'gray'}>{status}</Badge>;
};

export default function Dashboard() {
  const { companies, clients, invoices, loading } = useApp();

  if (loading) return <Loader />;

  const recentInvoices = [...invoices].reverse().slice(0, 5);
  const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);

  return (
    <div className="page-enter">
      <div className="page-header">
        <div className="page-header-content">
          <h2>Dashboard</h2>
          <p>Resumen general del sistema</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard icon="building" color="blue" value={companies.length} label="Empresas" change={12} />
        <StatCard icon="users" color="green" value={clients.length} label="Clientes" change={8} />
        <StatCard icon="file-invoice-dollar" color="orange" value={invoices.length} label="Facturas" change={-3} />
        <StatCard icon="sack-dollar" color="yellow" value={`$${totalRevenue.toLocaleString()}`} label="Ingresos totales" />
      </div>

      <div className="grid-2">
        <Card title={<><FontAwesomeIcon icon="bolt" /> Acciones rápidas</>}>
          <div className="quick-actions">
            <Link to="/companies" className="quick-action">
              <div className="quick-action-icon blue"><FontAwesomeIcon icon="building" /></div>
              <div className="quick-action-label">Nueva empresa</div>
              <div className="quick-action-desc">Registrar empresa</div>
            </Link>
            <Link to="/clients" className="quick-action">
              <div className="quick-action-icon green"><FontAwesomeIcon icon="user-plus" /></div>
              <div className="quick-action-label">Nuevo cliente</div>
              <div className="quick-action-desc">Agregar cliente</div>
            </Link>
            <Link to="/invoices" className="quick-action">
              <div className="quick-action-icon orange"><FontAwesomeIcon icon="file-circle-plus" /></div>
              <div className="quick-action-label">Nueva factura</div>
              <div className="quick-action-desc">Crear factura</div>
            </Link>
            <Link to="/products" className="quick-action">
              <div className="quick-action-icon yellow"><FontAwesomeIcon icon="box-open" /></div>
              <div className="quick-action-label">Productos</div>
              <div className="quick-action-desc">Gestionar stock</div>
            </Link>
          </div>
        </Card>

        <Card title={<><FontAwesomeIcon icon="clock-rotate-left" /> Facturas recientes</>}>
          {recentInvoices.length === 0 ? (
            <div className="empty-state">
              <FontAwesomeIcon icon="file-invoice" />
              <p>Sin facturas aún</p>
            </div>
          ) : (
            <div className="activity-list">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="activity-item">
                  <div className="activity-avatar orange">
                    <FontAwesomeIcon icon="file-invoice" />
                  </div>
                  <div className="activity-info">
                    <div className="activity-title">{inv.number}</div>
                    <div className="activity-sub">${Number(inv.total).toLocaleString()}</div>
                  </div>
                  {statusBadge(inv.status)}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
