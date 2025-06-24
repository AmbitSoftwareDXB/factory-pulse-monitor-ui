
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MachineChart = () => {
  const data = [
    { time: '00:00', cycleTime: 45, faults: 0, energy: 85 },
    { time: '04:00', cycleTime: 47, faults: 1, energy: 87 },
    { time: '08:00', cycleTime: 44, faults: 0, energy: 83 },
    { time: '12:00', cycleTime: 46, faults: 1, energy: 86 },
    { time: '16:00', cycleTime: 45, faults: 0, energy: 84 },
    { time: '20:00', cycleTime: 48, faults: 2, energy: 88 },
    { time: '24:00', cycleTime: 45, faults: 0, energy: 85 }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F3F4F6'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="cycleTime" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Cycle Time (s)"
          />
          <Line 
            type="monotone" 
            dataKey="energy" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Energy Usage (kW)"
          />
          <Line 
            type="monotone" 
            dataKey="faults" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Faults"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MachineChart;
