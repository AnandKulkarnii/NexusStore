import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function Catalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();


  const loadMockData = () => {
    setItems([
      { id: 1, name: '.NET Bot Black Sweatshirt', price: 19.5, pictureUri: 'https://raw.githubusercontent.com/dotnet-architecture/NexusStore/main/src/Web/wwwroot/images/products/1.png' },
      { id: 2, name: '.NET Black & White Mug', price: 8.5, pictureUri: 'https://raw.githubusercontent.com/dotnet-architecture/NexusStore/main/src/Web/wwwroot/images/products/2.png' },
      { id: 3, name: 'Prism White T-Shirt', price: 12.0, pictureUri: 'https://raw.githubusercontent.com/dotnet-architecture/NexusStore/main/src/Web/wwwroot/images/products/3.png' },
      { id: 4, name: '.NET Foundation Sweatshirt', price: 12.0, pictureUri: 'https://raw.githubusercontent.com/dotnet-architecture/NexusStore/main/src/Web/wwwroot/images/products/4.png' }
    ]);
  };

  useEffect(() => {
    axios.get('/api/catalog-items')
      .then(res => {
        const data = res.data.data || res.data;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          loadMockData();
        }
      })
      .catch(err => {
        console.warn('Backend not running or endpoint differs, falling back to mock data', err);
        loadMockData();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <section className="fade-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h2>Featured Products</h2>
        <select style={{
          padding: '0.5rem', 
          borderRadius: '0.5rem', 
          border: '1px solid var(--border-color)', 
          background: 'var(--card-bg)',
          color: 'var(--text-color)'
        }}>
          <option>All Brands</option>
          <option>.NET</option>
          <option>Other</option>
        </select>
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '4rem'}}>
          Loading products...
        </div>
      ) : (
        <div className="catalog-grid">
          {items.map(item => (
            <div key={item.id} className="card">
              <div style={{position: 'relative', overflow: 'hidden'}}>
                <img 
                  src={item.pictureUri} 
                  alt={item.name} 
                  className="card-image"
                  onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
                />
              </div>
              <div className="card-content">
                <p className="card-title">{item.name}</p>
                <p className="card-price">${item.price.toFixed(2)}</p>
                <button 
                  className="btn" 
                  style={{width: '100%', justifyContent: 'center'}}
                  onClick={() => addToCart(item, 1)}
                >
                  Add to Cart <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
