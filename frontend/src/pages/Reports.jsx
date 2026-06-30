import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Reports() {
  const { companies, clients, invoices } = useApp();

  const totalRevenue = invoices.reduce((s, inv) => s + Number(inv.total || 0), 0);
  const paidInvoices = invoices.filter((inv) => inv.status === 'pagada');
  const pendingInvoices = invoices.filter((inv) => inv.status !== 'pagada');

  const summaryItems = [
    { label: 'Total empresas', value: companies.length, icon: 'building', color: 'blue' },
    { label: 'Total clientes', value: clients.length, icon: 'users', color: 'green' },
    { label: 'Facturas pagadas', value: paidInvoices.length, icon: 'check-circle', color: 'green' },
    { label: 'Facturas pendientes', value: pendingInvoices.length, icon: 'clock', color: 'orange' },
    { label: 'Ingresos cobrados', value: `$${paidInvoices.reduce((s, i) => s + Number(i.total || 0), 0).toLocaleString()}`, icon: 'sack-dollar', color: 'blue' },
    { label: 'Por cobrar', value: `$${pendingInvoices.reduce((s, i) => s + Number(i.total || 0), 0).toLocaleString()}`, icon: 'clock', color: 'orange' },
  ];

  return (
    <div>
      <PageHeader title="Reportes" description="Estadísticas y resúmenes del sistema" />

      <div className="stats-grid">
        {summaryItems.map((item) => (
          <Card key={item.label}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div className={`stat-card-icon ${item.color}`}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gray-800)' }}>{item.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500 }}>{item.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid-2">
        <Card title={<><FontAwesomeIcon icon="building" /> Empresas</>}>
          <div className="activity-list">
            {companies.slice(0, 5).map((c) => (
              <div key={c.id} className="activity-item">
                <div className="activity-avatar blue">
                  <FontAwesomeIcon icon="building" />
                </div>
                <div className="activity-info">
                  <div className="activity-title">{c.name}</div>
                  <div className="activity-sub">{c.email || 'Sin correo'}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={<><FontAwesomeIcon icon="file-invoice-dollar" /> Facturas por estado</>}>
          <div className="activity-list">
            {['pagada', 'enviada', 'borrador'].map((status) => {
              const count = invoices.filter((i) => i.status === status).length;
              const total = invoices.filter((i) => i.status === status).reduce((s, i) => s + Number(i.total || 0), 0);
              const variant = status === 'pagada' ? 'green' : status === 'enviada' ? 'blue' : 'gray';
              return (
                <div key={status} className="activity-item">
                  <div className="activity-info">
                    <div className="activity-title" style={{ textTransform: 'capitalize' }}>{status}</div>
                    <div className="activity-sub">{count} facturas</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Badge variant={variant}>${total.toLocaleString()}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
