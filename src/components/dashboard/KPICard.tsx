
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
  const percentage = parseFloat(value.replace('%', ''));

  // Create semicircular gauge for Labor Utilization
  const createGaugeSegments = () => {
    const segments = [];
    const totalSegments = 30;
    const filledSegments = Math.floor((percentage / 100) * totalSegments);
    
    for (let i = 0; i < totalSegments; i++) {
      const angle = (i / (totalSegments - 1)) * 180 - 90; // -90 to 90 degrees
      const isFilled = i < filledSegments;
      let color = '#475569'; // slate-600 default (contrasting background)
      
      if (isFilled) {
        if (i < totalSegments * 0.6) color = '#dc2626'; // red-600
        else if (i < totalSegments * 0.8) color = '#ea580c'; // orange-600
        else color = '#16a34a'; // green-600
      }
      
      segments.push(
        <div
          key={i}
          className="absolute w-1.5 h-6 origin-bottom rounded-sm"
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

  if (isLaborUtilization) {
    return (
      <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            
            {/* Large semicircular gauge */}
            <div className="flex flex-col items-center space-y-4">
              {/* Percentage value above gauge */}
              <div className="text-3xl font-bold text-white">{value}</div>
              
              {/* Gauge container */}
              <div className="relative w-32 h-16">
                {createGaugeSegments()}
                {/* Needle indicator */}
                <div 
                  className="absolute w-1 h-8 bg-white origin-bottom rounded-sm shadow-lg"
                  style={{
                    left: '50%',
                    bottom: '50%',
                    transform: `translateX(-50%) rotate(${(percentage / 100) * 180 - 90}deg)`,
                  }}
                />
                {/* Center dot */}
                <div className="absolute w-2 h-2 bg-white rounded-full" style={{
                  left: '50%',
                  bottom: '50%',
                  transform: 'translateX(-50%) translateY(50%)'
                }} />
              </div>
            </div>
            
            <p className={`text-sm font-medium ${trendColors[finalTrendType]} text-center`}>
              {trend}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
