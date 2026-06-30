import { useEffect, useState } from 'react';

const API_URL = 'http://127.0.0.1:8000';

function App() {
  const [status, setStatus] = useState('Cargando...');
  const [companies, setCompanies] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyForm, setCompanyForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [clientForm, setClientForm] = useState({ name: '', email: '', phone: '', document: '' });
  const [invoiceForm, setInvoiceForm] = useState({ number: '', status: 'borrador', total: '0' });

  const loadData = async () => {
    try {
      const [companiesRes, clientsRes, invoicesRes] = await Promise.all([
        fetch(`${API_URL}/companies/`),
        fetch(`${API_URL}/clients/`),
        fetch(`${API_URL}/invoices/`),
      ]);

      const companiesData = await companiesRes.json();
      const clientsData = await clientsRes.json();
      const invoicesData = await invoicesRes.json();

      setCompanies(companiesData);
      setClients(clientsData);
      setInvoices(invoicesData);
      setStatus('Conectado');
    } catch (error) {
      setStatus('Sin conexión al backend');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/companies/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyForm),
    });
    setCompanyForm({ name: '', email: '', phone: '', address: '' });
    loadData();
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/clients/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientForm),
    });
    setClientForm({ name: '', email: '', phone: '', document: '' });
    loadData();
  };

  const handleInvoiceSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/invoices/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...invoiceForm, total: Number(invoiceForm.total) }),
    });
    setInvoiceForm({ number: '', status: 'borrador', total: '0' });
    loadData();
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '24px', background: '#f4f6f8', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '8px' }}>Sistema Administrativo Beta</h1>
      <p style={{ marginTop: 0, color: '#555' }}>Panel principal para gestionar empresa, clientes y facturas.</p>
      <p><strong>Estado:</strong> {status}</p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('companies')}>Empresas</button>
        <button onClick={() => setActiveTab('clients')}>Clientes</button>
        <button onClick={() => setActiveTab('invoices')}>Facturas</button>
      </div>

      {activeTab === 'dashboard' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Resumen rápido</h3>
            <p>Empresas: {companies.length}</p>
            <p>Clientes: {clients.length}</p>
            <p>Facturas: {invoices.length}</p>
          </div>
        </div>
      )}

      {activeTab === 'companies' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <form onSubmit={handleCompanySubmit} style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Agregar empresa</h3>
            <input placeholder="Nombre" value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} required />
            <input placeholder="Correo" value={companyForm.email} onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })} />
            <input placeholder="Teléfono" value={companyForm.phone} onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })} />
            <input placeholder="Dirección" value={companyForm.address} onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })} />
            <button type="submit">Guardar</button>
          </form>

          <div style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Listado de empresas</h3>
            {companies.map((company) => (
              <div key={company.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
                <strong>{company.name}</strong> - {company.email || 'Sin correo'}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <form onSubmit={handleClientSubmit} style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Agregar cliente</h3>
            <input placeholder="Nombre" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} required />
            <input placeholder="Correo" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} />
            <input placeholder="Teléfono" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} />
            <input placeholder="Documento" value={clientForm.document} onChange={(e) => setClientForm({ ...clientForm, document: e.target.value })} />
            <button type="submit">Guardar</button>
          </form>

          <div style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Listado de clientes</h3>
            {clients.map((client) => (
              <div key={client.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
                <strong>{client.name}</strong> - {client.email || 'Sin correo'}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <form onSubmit={handleInvoiceSubmit} style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Crear factura</h3>
            <input placeholder="Número" value={invoiceForm.number} onChange={(e) => setInvoiceForm({ ...invoiceForm, number: e.target.value })} required />
            <input placeholder="Total" value={invoiceForm.total} onChange={(e) => setInvoiceForm({ ...invoiceForm, total: e.target.value })} />
            <select value={invoiceForm.status} onChange={(e) => setInvoiceForm({ ...invoiceForm, status: e.target.value })}>
              <option value="borrador">Borrador</option>
              <option value="enviada">Enviada</option>
              <option value="pagada">Pagada</option>
            </select>
            <button type="submit">Guardar</button>
          </form>

          <div style={{ background: 'white', padding: '16px', borderRadius: '10px' }}>
            <h3>Listado de facturas</h3>
            {invoices.map((invoice) => (
              <div key={invoice.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
                <strong>{invoice.number}</strong> - {invoice.status} - ${invoice.total}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
