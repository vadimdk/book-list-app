import { useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { useBookStore } from '@/store/bookStore';

export function Dashboard() {
  const { fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <DataTable />
    </div>
  );
}