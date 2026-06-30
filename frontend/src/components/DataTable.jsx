import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SkeletonTable } from './Loader';

export function DataTable({ columns, data, onEdit, onDelete, loading }) {
  if (loading) return <SkeletonTable rows={5} cols={columns.length} />;

  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <FontAwesomeIcon icon="inbox" />
        <h4>Sin registros</h4>
        <p>No hay datos disponibles aún</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && <th style={{ width: 80 }}>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  <div className="table-actions">
                    {onEdit && (
                      <button className="btn btn-ghost btn-sm btn-icon" onClick={() => onEdit(row)} title="Editar">
                        <FontAwesomeIcon icon="pen" />
                      </button>
                    )}
                    {onDelete && (
                      <button className="btn btn-ghost btn-sm btn-icon" onClick={() => onDelete(row)} title="Eliminar" style={{ color: 'var(--danger-500)' }}>
                        <FontAwesomeIcon icon="trash-can" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
