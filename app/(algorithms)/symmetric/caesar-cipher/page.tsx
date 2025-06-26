import Footer from '@/components/footer';
import NavMain from '@/components/navbar';

import CaesarCipher from './caesar-cipher';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <NavMain />
      <CaesarCipher />
      <Footer />
    </main>
  );
}
