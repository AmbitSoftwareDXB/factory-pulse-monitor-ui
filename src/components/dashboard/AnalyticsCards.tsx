
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsCards = () => {
  const analyticsData = [
    {
      title: 'MTTR / MTBF',
      value: '12h / 200h',
      description: 'Mean Time to Repair / Mean Time Between Failures',
      trend: 'Improving'
    },
    {
      title: 'Production per Line',
      value: '85%',
      description: 'Average efficiency across all production lines',
      trend: 'Stable'
    },
    {
      title: 'Predictive Maintenance',
      value: '3 Alerts',
      description: 'Components requiring attention in next 7 days',
      trend: 'Attention Needed'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {analyticsData.map((item, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{item.value}</p>
              <p className="text-sm text-slate-400">{item.description}</p>
              <p className={`text-sm font-medium ${
                item.trend === 'Improving' ? 'text-green-400' :
                item.trend === 'Stable' ? 'text-blue-400' : 'text-yellow-400'
              }`}>
                {item.trend}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsCards;
