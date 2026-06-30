import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { DataTable } from '../components/DataTable';
import { PageHeader, Toolbar } from '../components/PageHeader';
import { FormModal } from '../components/FormModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Badge } from '../components/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_FORM = { name: '', category: '', price: '', stock: '', description: '' };

const COLUMNS = [
  { key: 'name', label: 'Producto' },
  { key: 'category', label: 'Categoría' },
  { key: 'price', label: 'Precio', render: (row) => `$${Number(row.price).toFixed(2)}` },
  {
    key: 'stock', label: 'Stock',
    render: (row) => (
      <span style={{
        fontWeight: 600,
        color: row.stock === 0 ? 'var(--danger-600)' : row.stock < 10 ? 'var(--warning-600)' : 'var(--success-600)',
      }}>
        {row.stock} {row.stock === 0 ? '(agotado)' : row.stock < 10 ? '(bajo)' : ''}
      </span>
    ),
  },
  {
    key: 'status', label: 'Estado',
    render: (row) => {
      const s = row.stock === 0 ? 'agotado' : row.stock < 10 ? 'bajo' : 'activo';
      const map = { activo: 'green', agotado: 'red', bajo: 'orange' };
      return <Badge variant={map[s]}>{s}</Badge>;
    },
  },
];

export default function Products() {
  const { products, API_URL, createItem, updateItem, deleteItem } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(INITIAL_FORM);

  const filtered = products.filter((p) =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm(INITIAL_FORM); setShowModal(true); };

  const openEdit = (row) => {
    setEditing(row);
    setForm({
      name: row.name,
      category: row.category || '',
      price: String(row.price),
      stock: String(row.stock),
      description: row.description || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (editing) {
      await updateItem(`${API_URL}/products/${editing.id}`, payload);
    } else {
      await createItem(`${API_URL}/products/`, payload);
    }
    setShowModal(false);
  };

  const handleDelete = async () => {
    await deleteItem(`${API_URL}/products/${deleting.id}`);
    setDeleting(null);
  };

  const stockStatus = (p) => p.stock === 0 ? 'agotado' : p.stock < 10 ? 'bajo' : 'activo';

  return (
    <div>
      <PageHeader title="Productos" description="Catálogo y control de inventario"
        action={
          <button className="btn btn-primary" onClick={openCreate}>
            <FontAwesomeIcon icon="plus" /> Nuevo producto
          </button>
        }
      />

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <Card>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gray-800)' }}>{products.length}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500 }}>Productos registrados</div>
        </Card>
        <Card>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--success-600)' }}>
            {products.filter((p) => stockStatus(p) === 'activo').length}
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500 }}>Productos activos</div>
        </Card>
        <Card>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--danger-600)' }}>
            {products.filter((p) => p.stock === 0).length}
          </div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 500 }}>Agotados</div>
        </Card>
      </div>

      <Toolbar search={search} onSearchChange={setSearch} total={products.length} />

      <Card>
        <DataTable columns={COLUMNS} data={filtered} onEdit={openEdit} onDelete={setDeleting} />
      </Card>

      {showModal && (
        <FormModal title={editing ? 'Editar producto' : 'Nuevo producto'} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full">
              <label className="form-label">Nombre</label>
              <input className="form-input" placeholder="Nombre del producto" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group full">
              <label className="form-label">Descripción</label>
              <input className="form-input" placeholder="Descripción del producto" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <input className="form-input" placeholder="Ej: Equipos" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Precio</label>
              <input className="form-input" type="number" step="0.01" placeholder="0.00" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="form-group full">
              <label className="form-label">Stock</label>
              <input className="form-input" type="number" placeholder="0" value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
        </FormModal>
      )}

      {deleting && (
        <ConfirmModal
          title="Eliminar producto"
          message={`¿Eliminar "${deleting.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}
