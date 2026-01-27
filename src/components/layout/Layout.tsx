import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomBar } from './MobileBottomBar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      {/* Add padding so footer clears mobile bar */}
      <div className="pb-20 md:pb-0">
        <Footer />
      </div>

      <MobileBottomBar />
    </div>
  );
};

