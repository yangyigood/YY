
export interface TenderProject {
  id: string;
  projectName: string;
  province: string;
  winner?: string;
  amount?: string;
  date: string;
  category: '中考' | '高考' | '学业水平' | '其他';
  status: '已公示' | '招标中' | '已废标';
}

export interface AnalysisResult {
  summary: string;
  marketTrends: string[];
  topVendors: { name: string; count: number; share: string }[];
  sources: { title: string; uri: string }[];
  stats: {
    totalAmount: string;
    aiRate: string;
    monopolyRate: string;
    profitMargin: string;
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
