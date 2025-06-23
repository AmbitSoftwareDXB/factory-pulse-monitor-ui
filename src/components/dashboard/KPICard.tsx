
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
    percentage: parseFloat(value.replace('%', '')),
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-slate-400'
  };

  const isLaborUtilization = title === 'Labor Utilization';
  const percentage = parseFloat(value.replace('%', ''));

  // Create semicircular gauge for Labor Utilization
  const createGaugeSegments = () => {
    const segments = [];
    const totalSegments = 20;
    const filledSegments = Math.floor((percentage / 100) * totalSegments);
    
    for (let i = 0; i < totalSegments; i++) {
      const angle = (i / (totalSegments - 1)) * 180 - 90; // -90 to 90 degrees
      const isFilled = i < filledSegments;
      let color = '#374151'; // gray-700 default
      
      if (isFilled) {
        if (i < totalSegments * 0.6) color = '#ef4444'; // red
        else if (i < totalSegments * 0.8) color = '#f59e0b'; // yellow
        else color = '#10b981'; // green
      }
      
      segments.push(
        <div
          key={i}
          className="absolute w-1 h-3 origin-bottom"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `translateX(-50%) rotate(${angle}deg)`,
            backgroundColor: color,
          }}
        />
      );
    }
    return segments;
  };

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
              <div className="relative w-16 h-8">
                {createGaugeSegments()}
                <div 
                  className="absolute w-1 h-4 bg-slate-300 origin-bottom"
                  style={{
                    left: '50%',
                    bottom: '50%',
                    transform: `translateX(-50%) rotate(${(percentage / 100) * 180 - 90}deg)`,
                  }}
                />
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
