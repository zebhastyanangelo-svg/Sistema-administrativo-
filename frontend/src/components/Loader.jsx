export function Loader({ text = 'Cargando...' }) {
  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}><div className="skeleton" style={{ height: 12, width: '60%' }} /></th>
            ))}
            <th style={{ width: 80 }}><div className="skeleton" style={{ height: 12, width: 30 }} /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <td key={c}><div className="skeleton" style={{ height: 14, width: `${60 + Math.random() * 30}%` }} /></td>
              ))}
              <td><div className="skeleton" style={{ height: 14, width: 50 }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
