
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AlarmsTable = () => {
  const alarms = [
    {
      severity: 'High',
      time: '10:45 AM',
      machine: 'Press Machine 01',
      description: 'Temperature threshold exceeded',
      status: 'Active'
    },
    {
      severity: 'Medium',
      time: '09:32 AM',
      machine: 'Conveyor Belt 03',
      description: 'Speed deviation detected',
      status: 'Active'
    },
    {
      severity: 'Low',
      time: '08:15 AM',
      machine: 'Quality Check Station',
      description: 'Calibration reminder',
      status: 'Pending'
    },
    {
      severity: 'High',
      time: '07:58 AM',
      machine: 'Packaging Unit 02',
      description: 'Jam detected in line 2',
      status: 'Resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Low':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Active Alarms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3 text-sm font-medium text-slate-300">Severity</th>
                <th className="text-left p-3 text-sm font-medium text-slate-300">Time</th>
                <th className="text-left p-3 text-sm font-medium text-slate-300">Machine</th>
                <th className="text-left p-3 text-sm font-medium text-slate-300">Description</th>
                <th className="text-left p-3 text-sm font-medium text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {alarms.map((alarm, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="p-3">
                    <Badge className={getSeverityColor(alarm.severity)}>
                      {alarm.severity}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-slate-300">{alarm.time}</td>
                  <td className="p-3 text-sm text-white font-medium">{alarm.machine}</td>
                  <td className="p-3 text-sm text-slate-300">{alarm.description}</td>
                  <td className="p-3">
                    {alarm.status === 'Active' ? (
                      <Button size="sm" variant="outline" className="text-xs">
                        Acknowledge
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-500">{alarm.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlarmsTable;
