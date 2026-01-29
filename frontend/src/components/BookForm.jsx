import React, { useState, useEffect } from 'react';
import { Book, Calendar, FileText, Save, Plus } from 'lucide-react';

const BookForm = ({ onSubmit, editingBook, isSubmitting }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'livro',
    status: 'ativo',
    descricao: '',
    data: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setFormData({
        titulo: editingBook.titulo || '',
        tipo: editingBook.tipo || 'livro',
        status: editingBook.status || 'ativo',
        descricao: editingBook.descricao || '',
        data: editingBook.data || '',
      });
    } else {
      setFormData({
        titulo: '',
        tipo: 'livro',
        status: 'ativo',
        descricao: '',
        data: '',
      });
    }
    setErrors({});
  }, [editingBook]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    } else if (formData.titulo.length < 3) {
      newErrors.titulo = 'Título deve ter no mínimo 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-biblioteca-500 to-biblioteca-600 p-3 rounded-xl mr-4">
          {editingBook ? (
            <Save className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {editingBook ? 'Editar Livro' : 'Adicionar Novo Livro'}
          </h2>
          <p className="text-gray-600">
            {editingBook ? 'Atualize as informações do livro' : 'Preencha os dados para cadastrar um novo livro'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Título */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">
              <Book className="inline w-4 h-4 mr-1" />
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Digite o título do livro"
              className={`input-field ${errors.titulo ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.titulo && (
              <p className="mt-1 text-sm text-red-600">{errors.titulo}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Tipo</label>
            <div className="relative">
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="input-field appearance-none"
              >
                <option value="livro">Livro</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Data */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              <Calendar className="inline w-4 h-4 mr-1" />
              Data (opcional)
            </label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              max={today}
              className="input-field"
            />
          </div>

          {/* Descrição */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">
              <FileText className="inline w-4 h-4 mr-1" />
              Descrição (opcional)
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="3"
              placeholder="Digite uma descrição sobre o livro..."
              className="input-field"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100">
          <div className="mb-4 sm:mb-0">
            <p className="font-medium text-gray-700 mb-2">Status do Livro</p>
            <div className="flex space-x-3">
              {['ativo', 'lido', 'arquivado'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status }))}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData.status === status
                      ? status === 'ativo' 
                        ? 'bg-blue-500 text-white shadow-md'
                        : status === 'lido'
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-amber-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'ativo' && 'Ativo'}
                  {status === 'lido' && 'Lido'}
                  {status === 'arquivado' && 'Arquivado'}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando...
              </>
            ) : editingBook ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Atualizar Livro
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Livro
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;