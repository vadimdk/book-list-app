export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  active: boolean;
  createdAt: string;
  modifiedAt: string | null;
}

export type BookFormData = Omit<Book, 'id' | 'active' | 'createdAt' | 'modifiedAt'>;

export type FilterOption = 'all' | 'active' | 'deactivated';