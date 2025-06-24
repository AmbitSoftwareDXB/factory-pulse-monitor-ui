
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Settings, Wrench, TrendingUp, Calendar } from 'lucide-react';
import { Machine } from '@/types/machine';
import MachineChart from './MachineChart';

interface MachineDetailDrawerProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
}

const MachineDetailDrawer = ({ machine, isOpen, onClose }: MachineDetailDrawerProps) => {
  if (!machine) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'fault': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const diagnosticsData = [
    { label: 'Vibration', value: `${machine.vibration} mm/s`, status: 'normal' },
    { label: 'Pressure', value: `${machine.pressure} bar`, status: 'normal' },
    { label: 'Flow Rate', value: `${machine.flowRate} L/min`, status: 'warning' },
    { label: 'RPM', value: `${machine.rpm}`, status: 'normal' },
    { label: 'Efficiency', value: `${machine.efficiency}%`, status: 'normal' }
  ];

  const maintenanceLogs = [
    { date: '2024-06-20', type: 'Preventive', description: 'Monthly calibration completed', status: 'Completed' },
    { date: '2024-06-15', type: 'Corrective', description: 'Replaced sensor module', status: 'Completed' },
    { date: '2024-06-10', type: 'Inspection', description: 'Visual inspection performed', status: 'Completed' }
  ];

  const upcomingMaintenance = [
    { date: '2024-07-01', type: 'Preventive', description: 'Quarterly overhaul scheduled' },
    { date: '2024-07-15', type: 'Inspection', description: 'Safety system check' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl bg-slate-900 border-slate-700 overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl text-white flex items-center space-x-3">
            <span className="text-3xl">{machine.type === 'compressor' ? '🔧' : machine.type === 'conveyor' ? '📦' : machine.type === 'robot' ? '🤖' : machine.type === 'press' ? '⚙️' : '⚡'}</span>
            <div>
              <div>{machine.name}</div>
              <div className="text-sm text-slate-400 font-normal">{machine.location}</div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Status and Quick Actions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getStatusColor(machine.status)} capitalize`}>
                  {machine.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Ack Alarm
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <Settings className="w-4 h-4 mr-2" />
                    Device Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <Wrench className="w-4 h-4 mr-2" />
                    Maintenance
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Current State</p>
                  <p className="text-lg font-semibold text-white">{machine.currentState}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">OEE</p>
                  <p className="text-lg font-semibold text-white">{machine.oee}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Diagnostics */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Real-time Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {diagnosticsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <span className="text-slate-300">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{item.value}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'normal' ? 'bg-green-500' : 
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historical Trends */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Historical Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <MachineChart />
            </CardContent>
          </Card>

          {/* Maintenance Logs */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Maintenance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceLogs.map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{log.description}</p>
                      <p className="text-sm text-slate-400">{log.date} • {log.type}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {log.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Maintenance */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMaintenance.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.description}</p>
                      <p className="text-sm text-slate-400">{item.date} • {item.type}</p>
                    </div>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      Scheduled
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MachineDetailDrawer;
