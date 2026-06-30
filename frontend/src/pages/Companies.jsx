import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { PageHeader, Toolbar } from '../components/PageHeader';
import { FormModal } from '../components/FormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_FORM = { name: '', email: '', phone: '', address: '' };

const COLUMNS = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Correo' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'address', label: 'Dirección' },
];

export default function Companies() {
  const { companies, API_URL, createItem, updateItem, deleteItem } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);

  const filtered = companies.filter((c) =>
    !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(INITIAL_FORM); setShowModal(true); };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ name: row.name, email: row.email || '', phone: row.phone || '', address: row.address || '' });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (editing) {
      await updateItem(`${API_URL}/companies/${editing.id}`, form);
    } else {
      await createItem(`${API_URL}/companies/`, form);
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    await deleteItem(`${API_URL}/companies/${deleting.id}`);
    setDeleting(null);
  };

  return (
    <div>
      <PageHeader title="Empresas" description="Gestiona las empresas del sistema"
        action={
          <button className="btn btn-primary" onClick={openCreate}>
            <FontAwesomeIcon icon="plus" /> Nueva empresa
          </button>
        }
      />

      <Toolbar search={search} onSearchChange={setSearch} total={companies.length} />

      <Card>
        <DataTable columns={COLUMNS} data={filtered} onEdit={openEdit} onDelete={setDeleting} />
      </Card>

      {showModal && (
        <FormModal title={editing ? 'Editar empresa' : 'Nueva empresa'} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Nombre</label>
              <input className="form-input" placeholder="Razón social" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Correo</label>
              <input className="form-input" type="email" placeholder="correo@empresa.com" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input className="form-input" placeholder="+56 9 1234 5678" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group full">
              <label className="form-label">Dirección</label>
              <input className="form-input" placeholder="Dirección completa" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
          </div>
        </FormModal>
      )}

      {deleting && (
        <ConfirmModal
          title="Eliminar empresa"
          message={`¿Eliminar "${deleting.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
