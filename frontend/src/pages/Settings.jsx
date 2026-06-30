import { Card } from '../components/Card';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { API_URL, status } = useApp();

  const configItems = [
    { label: 'API URL', value: API_URL, badge: 'gray' },
    { label: 'Conexión', value: status, badge: status === 'Conectado' ? 'green' : 'red' },
    { label: 'Versión', value: '0.1.0', badge: 'blue' },
  ];

  return (
    <div>
      <PageHeader title="Configuración" description="Ajustes del sistema" />

      <Card title={<><FontAwesomeIcon icon="sliders" /> Ajustes generales</>}>
        <div className="activity-list">
          {configItems.map((item) => (
            <div key={item.label} className="activity-item">
              <div className="activity-info">
                <div className="activity-title">{item.label}</div>
              </div>
              <Badge variant={item.badge}>{item.value}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 20 }}>
        <Card title={<><FontAwesomeIcon icon="palette" /> Apariencia</>}>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>
            Esquema de colores del sistema
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['#3B82F6', '#10B981', '#EF4444', '#F97316', '#F59E0B', '#8B5CF6', '#EC4899'].map((color) => (
              <div
                key={color}
                style={{
                  width: 36, height: 36,
                  borderRadius: 8,
                  background: color,
                  cursor: 'pointer',
                  border: color === '#3B82F6' ? '2px solid var(--gray-800)' : '2px solid transparent',
                }}
                title={color}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
