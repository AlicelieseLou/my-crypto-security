import Footer from '@/components/footer';
import NavMain from '@/components/navbar';

import ElGamal from './el-gamal';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <NavMain />
      <ElGamal />
      <Footer />
    </main>
  );
}
