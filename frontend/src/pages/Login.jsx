import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <FontAwesomeIcon icon="pen" />
          </div>
          <h1>Sistema Administrativo</h1>
          <p>Panel de gestión</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error"><FontAwesomeIcon icon="circle-exclamation" /> {error}</div>}
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input className="form-input" placeholder="Nombre de usuario" value={username}
              onChange={(e) => setUsername(e.target.value)} required autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary login-btn" disabled={busy}>
            {busy ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className="login-footer">
          <FontAwesomeIcon icon="lock" /> Entorno seguro
        </div>
      </div>
    </div>
  );
}
