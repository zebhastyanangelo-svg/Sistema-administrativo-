import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch, API_URL } from '../api';
import { useToast } from './ToastContext';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [status, setStatus] = useState('Cargando...');
  const [companies, setCompanies] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [compRes, cliRes, invRes, prodRes, suppRes] = await Promise.all([
        apiFetch(`${API_URL}/companies/`),
        apiFetch(`${API_URL}/clients/`),
        apiFetch(`${API_URL}/invoices/`),
        apiFetch(`${API_URL}/products/`),
        apiFetch(`${API_URL}/suppliers/`),
      ]);
      setCompanies(compRes);
      setClients(cliRes);
      setInvoices(invRes);
      setProducts(prodRes);
      setSuppliers(suppRes);
      setStatus('Conectado');
    } catch {
      setStatus('Sin conexión');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const createItem = useCallback(async (url, body) => {
    const res = await apiFetch(url, { method: 'POST', body: JSON.stringify(body) });
    await loadData();
    addToast('Creado correctamente');
    return res;
  }, [loadData, addToast]);

  const updateItem = useCallback(async (url, body) => {
    const res = await apiFetch(url, { method: 'PUT', body: JSON.stringify(body) });
    await loadData();
    addToast('Actualizado correctamente');
    return res;
  }, [loadData, addToast]);

  const deleteItem = useCallback(async (url) => {
    await apiFetch(url, { method: 'DELETE' });
    await loadData();
    addToast('Eliminado correctamente');
  }, [loadData, addToast]);

  return (
    <AppContext.Provider value={{
      API_URL, status, loading,
      companies, clients, invoices, products, suppliers,
      loadData, createItem, updateItem, deleteItem,
      setCompanies, setClients, setInvoices, setProducts, setSuppliers,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
