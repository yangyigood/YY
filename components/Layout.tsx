
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">外</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                口语考试招投标情报
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                仪表盘
              </button>
              <button 
                onClick={() => document.getElementById('industry-report')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                行业研报
              </button>
              <button 
                onClick={() => document.getElementById('data-monitoring')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                数据监控
              </button>
            </nav>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">实时监测中</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">© 2024 外语口语考试招投标数据中心 · 驱动自 Gemini Search Grounding</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
