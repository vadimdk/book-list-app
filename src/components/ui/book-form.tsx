import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '@/store/bookStore';
import { BookFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const categories = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Romance',
  'Thriller',
  'Horror',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Children',
  'Young Adult',
  'Poetry',
  'Other'
];

export function BookForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isEditMode = !!id;
  const { books, addBook, updateBook } = useBookStore();
  
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    category: '',
    isbn: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && id && books.length) {
      const bookId = id;
      const book = books.find(book => book.id === bookId);
      
      if (book && books.length) {
        setFormData({
          title: book.title,
          author: book.author,
          category: book.category,
          isbn: book.isbn
        });
      } else {
        toast.error('Book not found');
        navigate('/');
      }
    }
  }, [isEditMode, id, books, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (!/^\d+$/.test(formData.isbn)) {
      newErrors.isbn = 'ISBN must contain only numbers';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
    
    // Clear error when user selects
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode && id) {
        await updateBook(id, formData);
        toast.success('Book updated successfully');
      } else {
        await addBook(formData);
        toast.success('Book added successfully');
      }
      navigate('/');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl px-2 md:px-0 mx-auto">
      <h1 className="text-center md:text-left text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Book' : 'Add a Book'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'border-red-500' : ''}
          />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className={errors.isbn ? 'border-red-500' : ''}
          />
          {errors.isbn && (
            <p className="text-sm text-red-500">{errors.isbn}</p>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditMode ? 'Edit Book' : 'Add a Book'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}