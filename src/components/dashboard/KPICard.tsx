
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gauge } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  trendDirection?: 'up' | 'down';
  unit?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendType, trendDirection, unit }) => {
  // Determine trend type from trendDirection if not provided
  const finalTrendType = trendType || (trendDirection === 'up' ? 'positive' : trendDirection === 'down' ? 'negative' : 'neutral');
  
  const trendColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-slate-400'
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="space-y-2 flex-1">
          <p className="text-xl font-medium text-slate-400">{title}</p>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-white">{value}</p>
              {unit && <p className="text-base text-slate-400">{unit}</p>}
            </div>
          </div>
          <p className={`text-base font-medium ${trendColors[finalTrendType]}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
