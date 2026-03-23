import { TrendingUp, TrendingDown, Send, Eye, MousePointerClick, DollarSign } from 'lucide-react';
import Card from '../ui/Card';
import { REPORT_METRICS } from '../../constants/mockData';

export default function MetricCards() {
  const icons = [Send, Eye, MousePointerClick, DollarSign];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {REPORT_METRICS.map((metric, index) => {
        const Icon = icons[index];
        return (
          <Card key={index} className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#64748B]">{metric.label}</span>
              <div className="p-2 bg-[#F1F5F9] rounded-md text-[#475569]">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            
            <div className="flex items-end gap-3 mt-1">
              <span className="text-3xl font-bold text-[#0F172A] tracking-tight">{metric.value}</span>
              <div className={`flex items-center text-sm font-medium mb-1
                ${metric.trendUp ? 'text-[#16A34A]' : 'text-[#DC2626]'}
              `}>
                {metric.trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {metric.trend}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
