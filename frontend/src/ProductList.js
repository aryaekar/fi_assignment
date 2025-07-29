import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const DEFAULT_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect width='100%' height='100%' fill='%23ccc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='10'>No Img</text></svg>";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: '' });
  const [addError, setAddError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingQty, setEditingQty] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    loadProducts();
    // eslint-disable-next-line
  }, [token]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load products');
    }
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAddError('');
    try {
      await axios.post(`${API_URL}/products`, {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price)
      });
      setForm({ name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: '' });
      setShowModal(false);
      loadProducts();
    } catch (err) {
      setAddError(err.response?.data?.error || 'Add failed');
    }
  };

  const handleQtyClick = (id, currentQty) => {
    setEditingId(id);
    setEditingQty(currentQty);
  };

  const handleQtyChange = (e) => {
    setEditingQty(e.target.value);
  };

  const handleQtyBlurOrEnter = async (id) => {
    if (editingQty === '' || isNaN(Number(editingQty))) {
      setEditingId(null);
      return;
    }
    try {
      await axios.put(`${API_URL}/products/${id}/quantity`, { quantity: Number(editingQty) });
      setProducts(products => products.map(p => p.id === id ? { ...p, quantity: Number(editingQty) } : p));
      setEditingId(null);
    } catch (err) {
      alert('Update failed');
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products => products.filter(p => p.id !== id));
      setDeleteId(null);
    } catch (err) {
      alert('Delete failed');
      setDeleteId(null);
    }
  };

  if (loading) return <div className="centered-page"><div>Loading...</div></div>;
  if (error) return <div className="centered-page"><div className="error-message">{error}</div></div>;

  return (
    <div className="product-list-card" style={{ maxWidth: 1200, margin: '2.5rem auto' }}>
      <h2 className="product-list-title">Products</h2>
      <button className="product-btn" style={{ marginBottom: 18 }} onClick={() => setShowModal(true)}>Add Product</button>
      <table className="product-table" style={{ width: '100%', margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center', padding: '12px 8px' }}>Image</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>Type</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>SKU</th>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>Description</th>
            <th style={{ textAlign: 'center', padding: '12px 8px' }}>Quantity</th>
            <th style={{ textAlign: 'center', padding: '12px 8px' }}>Price</th>
            <th style={{ textAlign: 'center', padding: '12px 8px' }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ verticalAlign: 'middle', height: 80 }}>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                <img
                  src={p.image_url ? p.image_url : DEFAULT_IMAGE}
                  alt={p.name}
                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f7fafc' }}
                  onError={e => { e.target.onerror = null; e.target.src = DEFAULT_IMAGE; }}
                />
              </td>
              <td style={{ fontWeight: 600, fontSize: 17, textAlign: 'left', padding: '10px 8px' }}>{p.name}</td>
              <td style={{ color: '#2b6cb0', fontWeight: 500, textAlign: 'left', padding: '10px 8px' }}>{p.type}</td>
              <td style={{ fontFamily: 'monospace', fontSize: 15, textAlign: 'left', padding: '10px 8px' }}>{p.sku}</td>
              <td style={{ maxWidth: 240, whiteSpace: 'pre-line', fontSize: 15, fontStyle: p.description ? 'normal' : 'italic', color: p.description ? '#444' : '#aaa', textAlign: 'left', padding: '10px 8px' }}>
                {p.description ? p.description : 'No description'}
              </td>
              <td style={{ textAlign: 'center', cursor: 'pointer', minWidth: 90, padding: '10px 8px' }}>
                {editingId === p.id ? (
                  <input
                    type="number"
                    value={editingQty}
                    autoFocus
                    className="product-input"
                    style={{ width: 60, textAlign: 'center' }}
                    onChange={handleQtyChange}
                    onBlur={() => handleQtyBlurOrEnter(p.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleQtyBlurOrEnter(p.id);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}
                  />
                ) : (
                  <span onClick={() => handleQtyClick(p.id, p.quantity)} style={{ display: 'inline-block', minWidth: 40, borderRadius: 4, padding: '2px 8px', background: '#f7fafc', transition: 'background 0.2s' }} title="Click to edit">
                    {p.quantity}
                  </span>
                )}
              </td>
              <td style={{ textAlign: 'center', fontWeight: 500, fontSize: 16, padding: '10px 8px' }}>{Number(p.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
              <td style={{ textAlign: 'center', padding: '10px 8px' }}>
                <button
                  className="delete-btn"
                  title="Delete product"
                  onClick={() => setDeleteId(p.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#e53e3e', padding: 0 }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 style={{ textAlign: 'center', marginBottom: 18 }}>Add Product</h3>
            <form onSubmit={handleAdd} className="add-product-form" style={{ flexDirection: 'column', gap: '0.7rem' }}>
              <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="product-input" />
              <input placeholder="Type" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required className="product-input" />
              <input placeholder="SKU" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} required className="product-input" />
              <input placeholder="Image URL" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="product-input" />
              <input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="product-input" />
              <input placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} required className="product-input" style={{ width: 90 }} />
              <input placeholder="Price" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required className="product-input" style={{ width: 90 }} />
              {addError && <span className="error-message">{addError}</span>}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button type="submit" className="product-btn">Add</button>
                <button type="button" className="product-btn" style={{ background: '#e53e3e' }} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 style={{ textAlign: 'center', marginBottom: 18, color: '#e53e3e' }}>Delete Product</h3>
            <p style={{ textAlign: 'center', marginBottom: 18 }}>Are you sure you want to delete this product?</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="product-btn" style={{ background: '#e53e3e' }} onClick={() => handleDelete(deleteId)}>Delete</button>
              <button className="product-btn" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 