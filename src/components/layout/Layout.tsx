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
      {/* Since Navbar is 'fixed', it floats above the layout. 
          We handle the spacing in the <main> tag below.
      */}
      <Navbar />

      {/* FIX: Added padding-top (pt).
          - pt-32 (128px) for mobile: covers Announcement + Main Nav.
          - md:pt-44 (176px) for desktop: covers Announcement + Main Nav + Categories.
      */}
      <main className="flex-1 pt-32 md:pt-44">
        {children}
      </main>

      {/* Footer wrapper: 
          pb-20 ensures the last bit of content is visible above the 
          MobileBottomBar on small screens. 
      */}
      <div className="pb-20 md:pb-0">
        <Footer />
      </div>

      <MobileBottomBar />
    </div>
  );
};