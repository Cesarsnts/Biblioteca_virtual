import React from 'react';
import { Edit, Trash2, Eye, Calendar, FileText, BookOpen, CheckCircle, Archive } from 'lucide-react';

const BookTable = ({ books, onEdit, onDelete, onStatusChange, isLoading }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo': return <BookOpen className="w-4 h-4" />;
      case 'lido': return <CheckCircle className="w-4 h-4" />;
      case 'arquivado': return <Archive className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-blue-100 text-blue-700';
      case 'lido': return 'bg-emerald-100 text-emerald-700';
      case 'arquivado': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informada';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-biblioteca-100 to-biblioteca-200 flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-biblioteca-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum livro cadastrado</h3>
        <p className="text-gray-600 mb-6">Adicione seu primeiro livro para começar sua biblioteca!</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Sua Biblioteca</h2>
        <p className="text-gray-600">{books.length} livro{books.length !== 1 ? 's' : ''} cadastrado{books.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">ID</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Título</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Tipo</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Data</th>
              <th className="py-4 px-6 text-left font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <span className="inline-block bg-biblioteca-100 text-biblioteca-700 font-mono font-bold py-1 px-3 rounded-lg">
                    #{book.id.toString().padStart(3, '0')}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{book.titulo}</p>
                    {book.descricao && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {book.descricao.length > 50 ? `${book.descricao.substring(0, 50)}...` : book.descricao}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
                    {book.tipo}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => {
                      const statuses = ['ativo', 'lido', 'arquivado'];
                      const currentIndex = statuses.indexOf(book.status);
                      const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                      onStatusChange(book.id, nextStatus);
                    }}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full font-medium ${getStatusColor(book.status)} hover:opacity-90 transition-opacity`}
                  >
                    {getStatusIcon(book.status)}
                    <span className="ml-1.5 capitalize">{book.status}</span>
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {formatDate(book.data)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(book)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;