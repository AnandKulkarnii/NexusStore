import Catalog from '../features/catalog/Catalog';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Welcome to NexusStore</h1>
        <p>The pure ASP.NET Core REST API powered modern React storefront.</p>
        <button className="btn" onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})}>
          Shop Now <ShoppingBag size={18} />
        </button>
      </section>
      
      <Catalog />
    </>
  );
}
