import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { PageHeader, Toolbar } from '../components/PageHeader';
import { FormModal } from '../components/FormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_FORM = { name: '', contact_name: '', email: '', phone: '', address: '' };

const COLUMNS = [
  { key: 'name', label: 'Proveedor' },
  { key: 'contact_name', label: 'Contacto' },
  { key: 'email', label: 'Correo' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'address', label: 'Dirección' },
];

export default function Suppliers() {
  const { suppliers, API_URL, createItem, updateItem, deleteItem } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);

  const filtered = suppliers.filter((s) =>
    !search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(INITIAL_FORM); setShowModal(true); };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ name: row.name, contact_name: row.contact_name || '', email: row.email || '', phone: row.phone || '', address: row.address || '' });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (editing) {
      await updateItem(`${API_URL}/suppliers/${editing.id}`, form);
    } else {
      await createItem(`${API_URL}/suppliers/`, form);
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    await deleteItem(`${API_URL}/suppliers/${deleting.id}`);
    setDeleting(null);
  };

  return (
    <div>
      <PageHeader title="Proveedores" description="Gestiona los proveedores del sistema"
        action={
          <button className="btn btn-primary" onClick={openCreate}>
            <FontAwesomeIcon icon="plus" /> Nuevo proveedor
          </button>
        }
      />

      <Toolbar search={search} onSearchChange={setSearch} total={suppliers.length} />

      <Card>
        <DataTable columns={COLUMNS} data={filtered} onEdit={openEdit} onDelete={setDeleting} />
      </Card>

      {showModal && (
        <FormModal title={editing ? 'Editar proveedor' : 'Nuevo proveedor'} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Nombre</label>
              <input className="form-input" placeholder="Nombre del proveedor" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group full">
              <label className="form-label">Persona de contacto</label>
              <input className="form-input" placeholder="Nombre del contacto" value={form.contact_name}
                onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Correo</label>
              <input className="form-input" type="email" placeholder="correo@proveedor.com" value={form.email}
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
          title="Eliminar proveedor"
          message={`¿Eliminar a "${deleting.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
