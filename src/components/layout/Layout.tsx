import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className=" flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8 mx-auto">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}