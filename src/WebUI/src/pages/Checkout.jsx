import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.email ? user.email.split('@')[0] : '',
    email: user?.email || '',
    address: '123 Main St',
    city: 'Seattle',
    zip: '98101'
  });

  if (items.length === 0) {
    return (
      <div className="glass-panel fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Cart is empty</h2>
        <p>You cannot checkout with an empty cart.</p>
        <Link to="/" className="btn" style={{ textDecoration: 'none', marginTop: '1rem' }}>Return to Shop</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Because we removed the monolithic Web project, there is no generic /api/orders endpoint 
      // in the PublicApi by default. We will mock the order creation.
      await new Promise(r => setTimeout(r, 1500));
      
      clearCart();
      alert('Order placed successfully! (Mocked client-side)');
      navigate('/');
    } catch {
      alert('Failed to process order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div className="glass-panel" style={{ flex: '1 1 500px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Checkout Details</h2>
        
        {!isAuthenticated && (
          <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <strong>Note:</strong> You are checking out as a guest. <Link to="/login" style={{ color: 'var(--primary)' }}>Log in</Link> for faster checkout.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Shipping Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>City</label>
              <input name="city" value={formData.city} onChange={handleChange} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Zip Code</label>
              <input name="zip" value={formData.zip} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>
          
          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1rem', justifyContent: 'center' }}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
      
      <div className="glass-panel" style={{ flex: '1 1 300px', height: 'fit-content' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={20} /> Order Summary
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <span>Total:</span>
          <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid var(--border-color)',
  background: 'var(--bg-color)',
  color: 'var(--text-color)',
  boxSizing: 'border-box'
};
