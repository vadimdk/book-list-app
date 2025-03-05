import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/dashboard';
import { AddBook } from '@/pages/add-book';
import { EditBook } from '@/pages/edit-book';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;