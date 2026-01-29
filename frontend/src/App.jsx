import React, { useState, useEffect } from 'react';
import { BookOpen, Filter, Sparkles, Star } from 'lucide-react';
import BookForm from './components/BookForm';
import BookTable from './components/BookTable';
import LoadingSpinner from './components/LoadingSpinner';
import AlertMessage from './components/AlertMessage';

function App() {
  // Estado inicial com alguns livros de exemplo BONITOS
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filtros
  const [filters, setFilters] = useState({
    tipo: 'todos',
    status: 'todos'
  });
  
  // Mensagens de feedback
  const [alert, setAlert] = useState({
    type: '',
    message: ''
  });

  // Dados iniciais (simulando API)
  useEffect(() => {
    // Simulando carregamento de dados da API
    setTimeout(() => {
      const initialBooks = [
        { id: 1, titulo: 'Dom Casmurro', tipo: 'livro', status: 'lido', descricao: 'Clássico da literatura brasileira de Machado de Assis', data: '2024-01-15' },
        { id: 2, titulo: '1984', tipo: 'livro', status: 'ativo', descricao: 'Romance distópico de George Orwell', data: '2024-02-10' },
        { id: 3, titulo: 'O Hobbit', tipo: 'livro', status: 'ativo', descricao: 'Aventura épica na Terra Média de J.R.R. Tolkien', data: '2024-02-28' },
        { id: 4, titulo: 'Cem Anos de Solidão', tipo: 'livro', status: 'arquivado', descricao: 'Realismo mágico de Gabriel García Márquez', data: '2023-12-05' },
        { id: 5, titulo: 'A Revolução dos Bichos', tipo: 'livro', status: 'lido', descricao: 'Sátira política de George Orwell', data: '2024-01-30' },
        { id: 6, titulo: 'Orgulho e Preconceito', tipo: 'livro', status: 'ativo', descricao: 'Romance clássico de Jane Austen', data: '2024-03-05' },
      ];
      
      setBooks(initialBooks);
      setFilteredBooks(initialBooks);
      setIsLoading(false);
      
      // Mostrar mensagem de boas-vindas
      setAlert({
        type: 'success',
        message: '✨ Biblioteca carregada com sucesso! Sua coleção está pronta!'
      });
    }, 1500);
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let result = books;
    
    if (filters.tipo !== 'todos') {
      result = result.filter(book => book.tipo === filters.tipo);
    }
    
    if (filters.status !== 'todos') {
      result = result.filter(book => book.status === filters.status);
    }
    
    setFilteredBooks(result);
  }, [books, filters]);

  const handleSubmit = (formData) => {
    setIsSubmitting(true);
    
    // Simulando chamada à API
    setTimeout(() => {
      if (editingBook) {
        // Editar livro existente
        setBooks(prev => prev.map(book => 
          book.id === editingBook.id 
            ? { ...formData, id: editingBook.id }
            : book
        ));
        
        setAlert({
          type: 'success',
          message: '📚 Livro atualizado com sucesso! ✨'
        });
      } else {
        // Adicionar novo livro (simulando ID gerado pelo backend)
        const newId = Math.max(...books.map(b => b.id), 0) + 1;
        const newBook = { ...formData, id: newId };
        
        setBooks(prev => [...prev, newBook]);
        
        setAlert({
          type: 'success',
          message: '🎉 Livro cadastrado com sucesso! Adicione mais! 📖'
        });
      }
      
      setEditingBook(null);
      setIsSubmitting(false);
      
      // Limpar alerta após 5 segundos
      setTimeout(() => setAlert({ type: '', message: '' }), 5000);
    }, 800);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este livro da sua coleção?')) {
      // Simulando exclusão
      setIsLoading(true);
      
      setTimeout(() => {
        setBooks(prev => prev.filter(book => book.id !== id));
        setIsLoading(false);
        
        setAlert({
          type: 'success',
          message: '🗑️ Livro excluído da biblioteca!'
        });
        
        setTimeout(() => setAlert({ type: '', message: '' }), 5000);
      }, 600);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    // Simulando atualização de status
    setIsLoading(true);
    
    setTimeout(() => {
      setBooks(prev => prev.map(book => 
        book.id === id ? { ...book, status: newStatus } : book
      ));
      
      setIsLoading(false);
      
      const statusMessages = {
        'ativo': '📖 Marcado como "Ativo" para leitura!',
        'lido': '✅ Marcado como "Lido" - Parabéns! 🎊',
        'arquivado': '📦 Arquivo atualizado!'
      };
      
      setAlert({
        type: 'success',
        message: statusMessages[newStatus] || 'Status atualizado!'
      });
      
      setTimeout(() => setAlert({ type: '', message: '' }), 3000);
    }, 500);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({ tipo: 'todos', status: 'todos' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"></div>
      
      <div className="fixed top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="fixed bottom-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

      <div className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-10 animate-fadeInUp">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl mr-4 transform hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Minha Biblioteca
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-bold shadow-lg flex items-center transform hover:scale-105 transition-transform duration-300">
                  <Star className="w-5 h-5 mr-2" />
                  <span className="text-lg">{books.length} livro{books.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            
            {/* Filtros */}
            <div className="glass-card p-6 animate-fadeInUp">
              <div className="flex items-center mb-5">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg mr-3">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Filtrar Livros</h3>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                  <select
                    value={filters.tipo}
                    onChange={(e) => handleFilterChange('tipo', e.target.value)}
                    className="input-field py-3"
                  >
                    <option value="todos">📚 Todos os tipos</option>
                    <option value="livro">📖 Livro</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="input-field py-3"
                  >
                    <option value="todos">📊 Todos os status</option>
                    <option value="ativo">🔵 Ativo</option>
                    <option value="lido">✅ Lido</option>
                    <option value="arquivado">📦 Arquivado</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={clearFilters}
                    className="btn-secondary"
                  >
                    🔄 Limpar Filtros
                  </button>
                </div>
                
                <div className="lg:ml-auto pt-2">
                  <div className="text-sm font-medium text-gray-700 bg-gray-100 py-2 px-4 rounded-lg">
                    📊 Mostrando <span className="font-bold text-blue-600">{filteredBooks.length}</span> de <span className="font-bold text-purple-600">{books.length}</span> livro{books.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Alertas */}
          <AlertMessage 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert({ type: '', message: '' })} 
          />

          {/* Formulário */}
          <BookForm 
            onSubmit={handleSubmit} 
            editingBook={editingBook} 
            isSubmitting={isSubmitting}
          />

          {/* Tabela de Livros */}
          <div className="mb-12">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <BookTable 
                books={filteredBooks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-gray-200 text-gray-600 animate-fadeInUp">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-semibold text-gray-800">✨ Biblioteca Digital ✨</p>
                <p className="text-sm">Sistema de Gerenciamento de Livros</p>
              </div>
              <div className="flex space-x-4">
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                  📚 {books.filter(b => b.status === 'ativo').length} Ativos
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg">
                  ✅ {books.filter(b => b.status === 'lido').length} Lidos
                </div>
                <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg">
                  📦 {books.filter(b => b.status === 'arquivado').length} Arquivados
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm">Desenvolvido com React & TailwindCSS • {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;