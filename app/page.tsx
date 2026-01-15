'use client';

import { useState } from 'react';
import axios from 'axios';

interface Answer {
  answer: string;
  confidence: number;
  source?: string;
  questions?: string[];
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const exampleQuestions = [
    '¿Cuándo ganó España su primera Copa del Mundo?',
    '¿Quién es el máximo goleador de la historia de La Liga?',
    '¿Cuántas Champions League ha ganado el Real Madrid?',
    '¿En qué año ganó España la Eurocopa por primera vez?',
    '¿Quién es el máximo goleador de la selección española?'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError('');
    setAnswer(null);

    try {
      const response = await axios.post('/api/ask', { question });
      setAnswer(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al procesar la pregunta');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleQuestion: string) => {
    setQuestion(exampleQuestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative text-7xl drop-shadow-2xl">⚽</div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Fútbol Q&A Intelligence
          </h1>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            Tu asistente experto en fútbol español, competiciones europeas y selecciones
          </p>
        </header>

        {/* Main Form */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="question" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                Tu Pregunta
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ejemplo: ¿Cuántas Champions League ha ganado el Real Madrid?"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none text-slate-800 placeholder-slate-400 shadow-inner"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="w-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 transform active:scale-95 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analizando tu pregunta...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Respuesta
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Example Questions */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-5 uppercase tracking-wide flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Preguntas Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleQuestions.map((eq, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(eq)}
                className="group text-left px-5 py-4 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-white/20 hover:border-emerald-400 text-slate-700 hover:scale-105 duration-300"
              >
                <div className="flex items-start">
                  <span className="text-emerald-500 font-bold mr-3 text-lg group-hover:scale-110 transition-transform">Q:</span>
                  <span className="flex-1 text-sm leading-relaxed">{eq}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur border-l-4 border-red-500 p-5 rounded-xl mb-8 shadow-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-100 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer */}
        {answer && (
          <div className="bg-gradient-to-br from-white via-emerald-50 to-blue-50 rounded-3xl shadow-2xl p-8 border-l-4 border-emerald-500 animate-fade-in">
            <div className="flex items-start mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-50"></div>
                <div className="relative text-4xl">💡</div>
              </div>
              <div className="flex-1 ml-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Respuesta
                </h2>
                <p className="text-slate-700 leading-relaxed text-lg font-medium">{answer.answer}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Confianza:</span>
                  <div className="flex items-center">
                    <div className="w-40 bg-slate-200 rounded-full h-3 shadow-inner">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 shadow-md ${
                          answer.confidence >= 0.7 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                          answer.confidence >= 0.5 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                          'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                        style={{ width: `${answer.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-3 text-lg font-bold text-slate-700">
                      {(answer.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {answer.questions && answer.questions.length > 0 && (
                <div className="mt-5 p-4 bg-white/60 rounded-xl">
                  <p className="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wide flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Preguntas Relacionadas
                  </p>
                  <div className="space-y-2">
                    {answer.questions.slice(0, 3).map((q, idx) => (
                      <p key={idx} className="text-sm text-slate-600 pl-4 py-2 border-l-3 border-blue-400 bg-blue-50/50 rounded-r-lg">
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-400 text-sm space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="font-medium">Impulsado por Azure Language Service (Custom Question Answering)</p>
          </div>
          <p className="text-slate-500">Datos actualizados de fútbol español • 2024</p>
        </footer>
      </div>
    </div>
  );
}
