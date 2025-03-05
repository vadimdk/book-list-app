import { create } from 'zustand';
import { Book, FilterOption } from '@/types';

interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  filterOption: FilterOption;
  
  // Actions
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, 'id' | 'active' | 'createdAt' | 'modifiedAt'>) => Promise<void>;
  updateBook: (id: string, bookData: Omit<Book, 'id' | 'active' | 'createdAt' | 'modifiedAt'>) => Promise<void>;
  toggleBookStatus: (id: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  setFilterOption: (option: FilterOption) => void;
}

const API_URL = 'http://localhost:3001/books';

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  isLoading: false,
  error: null,
  filterOption: 'active',

  fetchBooks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      set({ books: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addBook: async (bookData) => {
    set({ isLoading: true, error: null });
    try {
      const newBook = {
        ...bookData,
        active: true,
        createdAt: new Date().toISOString(),
        modifiedAt: null
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const addedBook = await response.json();
      set((state) => ({
        books: [...state.books, addedBook],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateBook: async (id, bookData) => {
    set({ isLoading: true, error: null });
    try {
      const book = get().books.find(book => book.id === id);
      if (!book) {
        throw new Error('Book not found');
      }

      const updatedBook = {
        ...book,
        ...bookData,
        modifiedAt: new Date().toISOString()
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updated = await response.json();
      set((state) => ({
        books: state.books.map((book) => (book.id === id ? updated : book)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  toggleBookStatus: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const book = get().books.find(book => book.id === id);
      if (!book) {
        throw new Error('Book not found');
      }

      const updatedBook = {
        ...book,
        active: !book.active,
        modifiedAt: new Date().toISOString()
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle book status');
      }

      const updated = await response.json();
      set((state) => ({
        books: state.books.map((book) => (book.id === id ? updated : book)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteBook: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const book = get().books.find(book => book.id === id);
      if (!book) {
        throw new Error('Book not found');
      }

      if (book.active) {
        throw new Error('Cannot delete an active book');
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      set((state) => ({
        books: state.books.filter((book) => book.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setFilterOption: (option) => {
    set({ filterOption: option });
  },
}));