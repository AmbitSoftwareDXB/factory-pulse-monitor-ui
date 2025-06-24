
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Thermometer, Zap, Clock, Activity } from 'lucide-react';
import { Machine } from '@/types/machine';

interface MachinesOverviewProps {
  machines: Machine[];
  selectedMachines: string[];
  onMachineSelect: (machineId: string) => void;
  onBulkSelect: (machineId: string, isSelected: boolean) => void;
}

const MachinesOverview = ({ machines, selectedMachines, onMachineSelect, onBulkSelect }: MachinesOverviewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'fault': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return '🟢';
      case 'warning': return '🟠';
      case 'fault': return '🔴';
      default: return '⚪';
    }
  };

  const getMachineIcon = (type: string) => {
    switch (type) {
      case 'compressor': return '🔧';
      case 'conveyor': return '📦';
      case 'robot': return '🤖';
      case 'press': return '⚙️';
      case 'welding': return '⚡';
      default: return '🏭';
    }
  };

  if (machines.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-slate-400">No machines found matching your filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {machines.map((machine) => (
        <Card key={machine.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header with checkbox and machine info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedMachines.includes(machine.id)}
                    onCheckedChange={(checked) => onBulkSelect(machine.id, !!checked)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <div className="text-2xl">{getMachineIcon(machine.type)}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(machine.status)}`}></div>
              </div>

              {/* Machine Name and Location */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{machine.name}</h3>
                <p className="text-sm text-slate-400">{machine.location}</p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-2">
                <span className="text-sm">{getStatusIcon(machine.status)}</span>
                <Badge 
                  variant="outline" 
                  className={`capitalize ${
                    machine.status === 'normal' 
                      ? 'border-green-500 text-green-400' 
                      : machine.status === 'warning'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-red-500 text-red-400'
                  }`}
                >
                  {machine.status}
                </Badge>
              </div>

              {/* Key Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center">
                    <Activity className="w-4 h-4 mr-1" />
                    State
                  </span>
                  <span className="text-white font-medium">{machine.currentState}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Cycle Time
                  </span>
                  <span className="text-white font-medium">{machine.cycleTime}s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Power
                  </span>
                  <span className="text-white font-medium">{machine.powerUsage} kW</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 flex items-center">
                    <Thermometer className="w-4 h-4 mr-1" />
                    Temp
                  </span>
                  <span className="text-white font-medium">{machine.temperature}°C</span>
                </div>
              </div>

              {/* Throughput and OEE */}
              <div className="border-t border-slate-700 pt-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Throughput</span>
                  <span className="text-white font-medium">{machine.throughput} units/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">OEE</span>
                  <span className="text-white font-medium">{machine.oee}%</span>
                </div>
              </div>

              {/* View Details Button */}
              <Button
                onClick={() => onMachineSelect(machine.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MachinesOverview;
