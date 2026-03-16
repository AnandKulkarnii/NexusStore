import { Link, Outlet } from 'react-router-dom';
import { ShoppingBag, Search, UserCircle, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <ShoppingBag className="text-primary" />
          <span>NexusStore Web</span>
        </Link>
        
        <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
          <div className="search-bar hidden-mobile">
            <input type="text" placeholder="Search catalog..." />
            <Search size={18} />
          </div>

          {!isAuthenticated ? (
            <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserCircle size={18} /> 
                {user?.email}
              </span>
              <button 
                onClick={logout} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)', display: 'flex', alignItems: 'center' }}>
                <LogOut size={18} color="#ef4444" />
              </button>
            </div>
          )}

          <Link to="/cart" style={{position: 'relative', cursor: 'pointer', color: 'var(--text-color)'}}>
            <ShoppingBag />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -12, 
                background: 'var(--primary)', color: 'white', 
                borderRadius: '50%', padding: '0.1rem 0.4rem', 
                fontSize: '0.75rem', fontWeight: 'bold',
                minWidth: '1rem', textAlign: 'center'
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <main className="main-content fade-in">
        <Outlet />
      </main>

      <footer style={{
        textAlign: 'center', 
        padding: '2rem', 
        opacity: 0.6, 
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)'
      }}>
        <p>&copy; {new Date().getFullYear()} NexusStore (React + ASP.NET Core API)</p>
      </footer>
    </>
  );
}
