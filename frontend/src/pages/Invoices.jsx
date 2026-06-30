import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { PageHeader, Toolbar } from '../components/PageHeader';
import { FormModal } from '../components/FormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Badge } from '../components/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_FORM = { number: '', status: 'borrador', total: '0', issue_date: '' };

const statusBadge = (status) => {
  const map = { pagada: 'green', enviada: 'blue', borrador: 'gray' };
  return <Badge variant={map[status] || 'gray'}>{status}</Badge>;
};

const COLUMNS = [
  { key: 'number', label: 'Número' },
  {
    key: 'total', label: 'Total',
    render: (row) => `$${Number(row.total).toLocaleString()}`,
  },
  {
    key: 'status', label: 'Estado',
    render: (row) => statusBadge(row.status),
  },
  { key: 'issue_date', label: 'Fecha' },
];

export default function Invoices() {
  const { invoices, API_URL, createItem, updateItem, deleteItem } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);

  const filtered = invoices.filter((inv) =>
    !search || inv.number?.toLowerCase().includes(search.toLowerCase()) || inv.status?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(INITIAL_FORM); setShowModal(true); };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      number: row.number,
      status: row.status,
      total: String(row.total),
      issue_date: row.issue_date || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const payload = { ...form, total: Number(form.total), issue_date: form.issue_date || new Date().toISOString().split('T')[0] };
    if (editing) {
      await updateItem(`${API_URL}/invoices/${editing.id}`, payload);
    } else {
      await createItem(`${API_URL}/invoices/`, payload);
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    await deleteItem(`${API_URL}/invoices/${deleting.id}`);
    setDeleting(null);
  };

  return (
    <div>
      <PageHeader title="Facturas" description="Gestiona las facturas del sistema"
        action={
          <button className="btn btn-primary" onClick={openCreate}>
            <FontAwesomeIcon icon="plus" /> Nueva factura
          </button>
        }
      />

      <Toolbar search={search} onSearchChange={setSearch} total={invoices.length} />

      <Card>
        <DataTable columns={COLUMNS} data={filtered} onEdit={openEdit} onDelete={setDeleting} />
      </Card>

      {showModal && (
        <FormModal title={editing ? 'Editar factura' : 'Nueva factura'} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Número</label>
              <input className="form-input" placeholder="FAC-001" value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Total</label>
              <input className="form-input" type="number" step="0.01" placeholder="0.00" value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select className="form-select" value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="borrador">Borrador</option>
                <option value="enviada">Enviada</option>
                <option value="pagada">Pagada</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input className="form-input" type="date" value={form.issue_date}
                onChange={(e) => setForm({ ...form, issue_date: e.target.value })} />
            </div>
          </div>
        </FormModal>
      )}

      {deleting && (
        <ConfirmModal
          title="Eliminar factura"
          message={`¿Eliminar la factura "${deleting.number}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
