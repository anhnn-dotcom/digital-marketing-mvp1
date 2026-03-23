import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';
import { CHART_DATA } from '../../constants/mockData';

export default function LineChart() {
  return (
    <Card title="Traffic & Engagement Over Time" className="h-[400px] flex flex-col">
      <div className="flex-1 w-full h-full mt-4 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={CHART_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="opened" 
              name="Opened"
              stroke="#2563EB" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
            <Line 
              type="monotone" 
              dataKey="sent" 
              name="Sent"
              stroke="#94A3B8" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
