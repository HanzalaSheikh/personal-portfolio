import Header from '@/components/Header';
import PhysicsGallery from '@/components/PhysicsGallery';
import PortfolioList from '@/components/PortfolioList';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />
      <PhysicsGallery />
      <PortfolioList />
      <footer style={{
        padding: '40px',
        textAlign: 'center',
        background: '#f9f9f9',
        borderTop: '1px solid #eee'
      }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          © 2026 Creative Monster Agency. Inspired by Wildish & Co.
        </p>
      </footer>
    </main>
  );
}
