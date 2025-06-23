
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

  const isLaborUtilization = title === 'Labor Utilization';

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold text-white">{value}</p>
              {unit && <p className="text-sm text-slate-400">{unit}</p>}
            </div>
            {isLaborUtilization && (
              <div className="relative">
                <Gauge className="w-6 h-6 text-blue-400 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-sm"></div>
              </div>
            )}
          </div>
          <p className={`text-sm font-medium ${trendColors[finalTrendType]}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
