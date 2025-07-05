import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Clock, User, MapPin, AlertTriangle } from 'lucide-react';

interface Alarm {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Acknowledged' | 'Resolved';
  machine: string;
  location: string;
  timestamp: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  category: 'Mechanical' | 'Electrical' | 'Temperature' | 'Pressure' | 'Vibration' | 'Safety';
}

interface AlarmDetailsDialogProps {
  alarm: Alarm | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAcknowledge: (alarmId: string) => void;
}

const AlarmDetailsDialog: React.FC<AlarmDetailsDialogProps> = ({
  alarm,
  open,
  onOpenChange,
  onAcknowledge
}) => {
  if (!alarm) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alarm Details - {alarm.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-400">Severity</label>
              <div className="mt-1">
                <Badge className={getSeverityColor(alarm.severity)}>
                  {alarm.severity}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(alarm.status)}>
                  {alarm.status}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Alarm Information */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-400">Title</label>
              <p className="text-white font-medium mt-1">{alarm.title}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-400">Description</label>
              <p className="text-slate-300 mt-1">{alarm.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Machine
                </label>
                <p className="text-white mt-1">{alarm.machine}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <p className="text-white mt-1">{alarm.location}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-400">Category</label>
                <p className="text-white mt-1">{alarm.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Timestamp
                </label>
                <p className="text-white mt-1">{alarm.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Acknowledgment Info */}
          {alarm.acknowledgedBy && (
            <>
              <Separator className="bg-slate-700" />
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Acknowledgment Information
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Acknowledged By</p>
                    <p className="text-white">{alarm.acknowledgedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Acknowledged At</p>
                    <p className="text-white">{alarm.acknowledgedAt}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            {alarm.status === 'Active' && (
              <Button 
                onClick={() => onAcknowledge(alarm.id)}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Acknowledge
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-slate-600 text-slate-300"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlarmDetailsDialog;