import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="glass-panel fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <ShoppingBag size={64} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn" style={{ textDecoration: 'none' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '0' }}>
          {items.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1.5rem',
              borderBottom: '1px solid var(--border-color)',
              gap: '1.5rem'
            }}>
              <img 
                src={item.pictureUri} 
                alt={item.name} 
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '0.5rem', background: '#e2e8f0' }} 
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>${item.price.toFixed(2)}</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ background: 'transparent', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--text-color)' }}
                  >-</button>
                  <div style={{ padding: '0.5rem 1rem', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
                    {item.quantity}
                  </div>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ background: 'transparent', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--text-color)' }}
                  >+</button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-color)' }}>
            <span style={{ fontSize: '1.25rem' }}>Subtotal</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link to="/" className="btn btn-outline" style={{ 
            textDecoration: 'none', 
            background: 'transparent', 
            border: '2px solid var(--primary)', 
            color: 'var(--primary)' 
          }}>
            Continue Shopping
          </Link>
          <button className="btn" onClick={() => alert('Checkout not implemented yet!')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
