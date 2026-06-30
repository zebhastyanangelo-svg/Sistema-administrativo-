import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function StatCard({ icon, color, value, label, change }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-top">
        <div className={`stat-card-icon ${color}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        {change != null && (
          <span className={`stat-card-change ${change >= 0 ? 'up' : 'down'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}
