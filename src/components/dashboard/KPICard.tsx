
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  unit?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendType, unit }) => {
  const trendColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-slate-400'
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-white">{value}</p>
            {unit && <p className="text-sm text-slate-400">{unit}</p>}
          </div>
          <p className={`text-sm font-medium ${trendColors[trendType]}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
