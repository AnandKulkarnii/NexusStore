import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package } from 'lucide-react';

// Mocked state outside component to avoid impure function rerender warnings
const mockOrders = [
  {
    id: 10023,
    date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(), // 2 days ago
    status: 'Shipped',
    total: 31.50,
    itemCount: 2
  },
  {
    id: 10014,
    date: new Date(Date.now() - 86400000 * 15).toLocaleDateString(), // 15 days ago
    status: 'Delivered',
    total: 12.00,
    itemCount: 1
  }
];

export default function Orders() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="glass-panel fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Sign In Required</h2>
        <p>You must be signed in to view your order history.</p>
        <Link to="/login" className="btn" style={{ textDecoration: 'none', marginTop: '1rem' }}>Log In</Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Package size={32} color="var(--primary)" />
        <h1 style={{ margin: 0 }}>Order History for {user?.email}</h1>
      </div>
      
      {mockOrders.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="btn" style={{ textDecoration: 'none', marginTop: '1rem' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
          {mockOrders.map(order => (
            <div key={order.id} className="card fade-in" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{order.date}</span>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ opacity: 0.8 }}>Status:</span>
                  <span style={{ 
                    background: order.status === 'Delivered' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                    color: order.status === 'Delivered' ? '#22c55e' : '#3b82f6',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>{order.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ opacity: 0.8 }}>Items:</span>
                  <span>{order.itemCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
