
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Machine } from '@/types/machine';

interface AnalyticsSummaryProps {
  machines: Machine[];
}

const AnalyticsSummary = ({ machines }: AnalyticsSummaryProps) => {
  const totalMachines = machines.length;
  const healthyMachines = machines.filter(m => m.status === 'normal').length;
  const warningMachines = machines.filter(m => m.status === 'warning').length;
  const faultMachines = machines.filter(m => m.status === 'fault').length;
  
  const healthyPercentage = totalMachines > 0 ? Math.round((healthyMachines / totalMachines) * 100) : 0;
  const averageOEE = machines.reduce((acc, machine) => acc + machine.oee, 0) / totalMachines || 0;

  const summaryCards = [
    {
      title: 'Total Machines',
      value: totalMachines.toString(),
      color: 'bg-blue-600'
    },
    {
      title: 'Healthy',
      value: `${healthyPercentage}%`,
      count: healthyMachines,
      color: 'bg-green-600'
    },
    {
      title: 'Warning',
      value: warningMachines.toString(),
      color: 'bg-yellow-600'
    },
    {
      title: 'Fault',
      value: faultMachines.toString(),
      color: 'bg-red-600'
    },
    {
      title: 'Avg OEE',
      value: `${averageOEE.toFixed(1)}%`,
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {summaryCards.map((card, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${card.color}`}></div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">{card.title}</p>
                <p className="text-xl font-bold text-white">{card.value}</p>
                {card.count !== undefined && (
                  <p className="text-xs text-slate-400">{card.count} machines</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsSummary;
