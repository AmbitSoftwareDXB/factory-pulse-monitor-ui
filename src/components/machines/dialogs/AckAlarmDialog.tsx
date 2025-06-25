
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, User } from 'lucide-react';
import { Machine } from '@/types/machine';
import { useToast } from '@/hooks/use-toast';

interface AckAlarmDialogProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
}

const AckAlarmDialog = ({ machine, isOpen, onClose }: AckAlarmDialogProps) => {
  const [isAcknowledging, setIsAcknowledging] = useState(false);
  const { toast } = useToast();

  if (!machine) return null;

  const activeAlarms = [
    {
      id: 'ALM001',
      severity: 'high',
      message: 'Temperature threshold exceeded',
      timestamp: '2024-06-25 14:32:15',
      value: `${machine.temperature}°C`,
      threshold: '75°C'
    },
    {
      id: 'ALM002', 
      severity: 'medium',
      message: 'Vibration levels elevated',
      timestamp: '2024-06-25 14:28:42',
      value: `${machine.vibration} mm/s`,
      threshold: '3.0 mm/s'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAcknowledge = async () => {
    setIsAcknowledging(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Alarms Acknowledged",
      description: `All active alarms for ${machine.name} have been acknowledged.`,
    });
    
    setIsAcknowledging(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <span>Acknowledge Alarms - {machine.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
            <div>
              <p className="text-sm text-slate-400">Machine Status</p>
              <p className="font-medium capitalize">{machine.status}</p>
            </div>
            <Badge className={`${machine.status === 'fault' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {activeAlarms.length} Active Alarms
            </Badge>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-slate-200">Active Alarms</h3>
            {activeAlarms.map((alarm, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alarm.severity)}>
                        {alarm.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-slate-400">#{alarm.id}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {alarm.timestamp}
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-white mb-2">{alarm.message}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Current Value:</span>
                      <span className="ml-2 text-white font-medium">{alarm.value}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Threshold:</span>
                      <span className="ml-2 text-white font-medium">{alarm.threshold}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Acknowledgment Details</span>
            </div>
            <p className="text-xs text-slate-500">
              Acknowledging these alarms will mark them as reviewed by Vivek Valsang at {new Date().toLocaleString()}.
              This action will be logged in the maintenance history.
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-slate-600 text-slate-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAcknowledge}
            disabled={isAcknowledging}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {isAcknowledging ? 'Acknowledging...' : `Acknowledge ${activeAlarms.length} Alarms`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AckAlarmDialog;
