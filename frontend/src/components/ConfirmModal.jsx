import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ConfirmModal({ title, message, onConfirm, onCancel, confirmLabel = 'Eliminar' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal" style={{ maxWidth: 400 }}>
        <div className="modal-header">
          <h3><FontAwesomeIcon icon="triangle-exclamation" style={{ color: 'var(--danger-500)', marginRight: 8 }} />{title}</h3>
          <button className="btn btn-ghost btn-icon" onClick={onCancel}>
            <FontAwesomeIcon icon="xmark" />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.5 }}>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <FontAwesomeIcon icon="trash-can" /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
