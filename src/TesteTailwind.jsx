import React from 'react';

const TesteTailwind = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        🎉 TESTE DO TAILWIND 🎉
      </h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Se você ver cores e estilos, o Tailwind está FUNCIONANDO!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-700 font-medium">Card Azul</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-700 font-medium">Card Verde</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-purple-700 font-medium">Card Roxo</p>
            </div>
          </div>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            Botão com Gradiente
          </button>
        </div>
        
        <div className="text-center text-gray-600">
          <p>Classes usadas neste teste:</p>
          <code className="bg-gray-100 p-2 rounded text-sm">
            bg-gradient-to-br, from-blue-50, shadow-lg, rounded-xl, etc.
          </code>
        </div>
      </div>
    </div>
  );
};

export default TesteTailwind;