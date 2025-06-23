
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MachineStatus = () => {
  const parameters = [
    { label: 'Status', value: 'Running', type: 'status' },
    { label: 'Mode', value: 'Automatic' },
    { label: 'Cycle Time', value: '45.2s' },
    { label: 'Throughput', value: '1,250 units/hr' },
    { label: 'Power Consumption', value: '85.4 kW' },
    { label: 'Temperature', value: '68°C' },
    { label: 'Air Pressure', value: '6.2 bar' },
    { label: 'Lubrication', value: 'Normal', type: 'status' }
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">
          Machine Diagnostics - Compressor Press Machine 01
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {parameters.map((param, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-slate-750 rounded-lg">
              <span className="text-sm font-medium text-slate-300">{param.label}</span>
              <div className="flex items-center">
                {param.type === 'status' ? (
                  <Badge 
                    variant={param.value === 'Running' || param.value === 'Normal' ? 'default' : 'destructive'}
                    className={param.value === 'Running' || param.value === 'Normal' ? 'bg-green-600' : ''}
                  >
                    {param.value}
                  </Badge>
                ) : (
                  <span className="text-sm font-bold text-white">{param.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Go to device details
        </Button>
      </CardContent>
    </Card>
  );
};

export default MachineStatus;
