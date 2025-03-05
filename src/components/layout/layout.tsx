import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="container flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}