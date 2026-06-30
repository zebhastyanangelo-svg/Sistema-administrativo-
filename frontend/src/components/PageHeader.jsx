import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function PageHeader({ title, description, action }) {
  return (
    <div className="page-header">
      <div className="page-header-content">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Toolbar({ search, onSearchChange, total, children, left, right }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        {onSearchChange && (
          <div className="search-box">
            <FontAwesomeIcon icon="search" />
            <input placeholder="Buscar..." value={search} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
        )}
        {left || children}
      </div>
      <div className="toolbar-right">
        {total !== undefined && <span className="toolbar-count">{total} registros</span>}
        {right}
      </div>
    </div>
  );
}
