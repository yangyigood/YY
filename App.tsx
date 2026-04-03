
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import StatCard from './components/StatCard';
import { fetchTenderAnalysis } from './services/geminiService';
import { AnalysisResult, TenderProject } from './types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Cpu, 
  BarChart3, 
  Clock, 
  RefreshCw, 
  AlertTriangle, 
  ExternalLink, 
  Zap,
  ShieldCheck,
  Globe
} from 'lucide-react';

const MOCK_TENDERS: TenderProject[] = [
  { id: '1', projectName: '2025年上海市普通高中学业水平考试外语口语自动化考试系统集成采购', province: '上海', winner: '科大讯飞', amount: '1280万', date: '2024-11-20', category: '学业水平', status: '已公示' },
  { id: '2', projectName: '广东省义务教育学业质量监测口语测评平台及考场升级项目', province: '广东', winner: '佳发教育', amount: '2150万', date: '2024-12-05', category: '中考', status: '已公示' },
  { id: '3', projectName: '四川省普通高考英语听力口语自动化考试软硬件环境建设项目', province: '四川', winner: '海天信息', amount: '980万', date: '2024-10-15', category: '高考', status: '已公示' },
  { id: '4', projectName: '江苏省2024年学考口语设备更新（支持国产化信创）', province: '江苏', winner: '科大讯飞', amount: '720万', date: '2024-09-30', category: '学业水平', status: '已公示' },
  { id: '5', projectName: '浙江省英语听说考试标准化考场二期建设', province: '浙江', winner: '拓维信息', amount: '1560万', date: '2024-12-28', category: '中考', status: '招标中' },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('学业水平考试');
  const [activeRegion, setActiveRegion] = useState('全国');

  const categories = ['学业水平考试', '中考听说', '高考口语', '社会化考试'];
  const regions = ['全国', '江苏省', '广东省', '浙江省', '上海市', '四川省'];

  const loadData = async (cat: string, reg: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTenderAnalysis(cat, reg);
      setAnalysis(data);
    } catch (err) {
      setError("实时数据研报生成失败，请检查 API 连接。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeCategory, activeRegion);
  }, [activeCategory, activeRegion]);

  return (
    <Layout>
      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 whitespace-nowrap">重点关注区域:</span>
          <select 
            value={activeRegion}
            onChange={(e) => setActiveRegion(e.target.value)}
            className="bg-slate-50 border-none text-slate-900 text-sm rounded-xl focus:ring-blue-500 block w-full p-2.5 outline-none font-bold"
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button 
            onClick={() => loadData(activeCategory, activeRegion)}
            className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div id="data-monitoring" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="当前领域招投标总额" 
          value={analysis?.stats.totalAmount || "￥8.4 亿"} 
          change="15.8%" 
          isPositive={true} 
          icon={<TrendingUp className="w-6 h-6" />} 
        />
        <StatCard 
          label="AI 自动评分标讯占比" 
          value={analysis?.stats.aiRate || "92.4%"} 
          change="4.2%" 
          isPositive={true} 
          icon={<Cpu className="w-6 h-6" />} 
        />
        <StatCard 
          label="头部厂家垄断率" 
          value={analysis?.stats.monopolyRate || "CR3: 71%"} 
          change="0.5%" 
          isPositive={false} 
          icon={<BarChart3 className="w-6 h-6" />} 
        />
        <StatCard 
          label="项目平均毛利" 
          value={analysis?.stats.profitMargin || "35.6%"} 
          change="2.1%" 
          isPositive={false} 
          icon={<ShieldCheck className="w-6 h-6" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deep Analysis Content */}
        <div id="industry-report" className="lg:col-span-2 space-y-8">
          {/* Market Analysis View */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium animate-pulse">正在利用 Gemini Search 实时抓取招投标情报...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center px-10">
                <div className="bg-rose-50 p-4 rounded-full mb-4">
                  <AlertTriangle className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">生成报告失败</h3>
                <p className="text-slate-500 text-sm mb-6">{error}</p>
                <button onClick={() => loadData(activeCategory, activeRegion)} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">重试</button>
              </div>
            ) : (
              <article className="prose prose-slate max-w-none">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" />
                    PRO
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 m-0">
                    {activeRegion}{activeCategory}市场深度研报
                  </h2>
                </div>
                
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-base font-normal">
                  {analysis?.summary}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis?.marketTrends.map((trend, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-default group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 m-0 leading-snug">{trend}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    实时溯源 (Grounding Sources)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysis?.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow group flex items-start gap-3"
                      >
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex-shrink-0">
                          <ExternalLink className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600">{source.title}</p>
                          <p className="text-xs text-slate-400 truncate">{source.uri}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>

        {/* Side Panel: Visualization & Feed */}
        <div className="space-y-8">
          {/* Vendor Share Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
              市场集中度透视
            </h3>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analysis?.topVendors || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {(analysis?.topVendors || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
              {analysis?.topVendors?.slice(0, 3).map((v, i) => (
                <div key={v.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400">#0{i+1}</span>
                    <span className="text-sm font-bold text-slate-800">{v.name}</span>
                  </div>
                  <span className="text-sm font-black text-blue-600">{v.share}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Feed */}
          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -mr-16 -mt-16"></div>
            <h3 className="text-white font-black mb-6 flex items-center justify-between relative z-10">
              最新标讯快报
              <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
            </h3>
            <div className="space-y-4 relative z-10">
              {MOCK_TENDERS.map((tender) => (
                <div key={tender.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase">{tender.province}</span>
                    <span className="text-[10px] text-slate-500">{tender.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1 mb-3">{tender.projectName}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-400 italic">中标方: {tender.winner}</span>
                    <span className="text-xs font-black text-emerald-400">{tender.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-2xl transition-all border border-white/5">
              进入全国标讯大厅 →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
