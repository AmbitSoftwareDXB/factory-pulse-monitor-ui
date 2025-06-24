
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, AlertTriangle, X } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

const BulkActionsBar = ({ selectedCount, onClearSelection }: BulkActionsBarProps) => {
  const handleAcknowledgeAlarms = () => {
    console.log('Acknowledging alarms for selected machines');
    // Implement bulk alarm acknowledgment logic
  };

  const handleExportData = () => {
    console.log('Exporting data for selected machines');
    // Implement bulk data export logic
  };

  const handleRequestMaintenance = () => {
    console.log('Requesting maintenance for selected machines');
    // Implement bulk maintenance request logic
  };

  return (
    <Card className="bg-blue-900/50 border-blue-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">
                {selectedCount} machine{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleAcknowledgeAlarms}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-300 hover:bg-blue-800"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Acknowledge Alarms
              </Button>
              
              <Button
                onClick={handleExportData}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-300 hover:bg-blue-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              
              <Button
                onClick={handleRequestMaintenance}
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-300 hover:bg-blue-800"
              >
                Request Maintenance
              </Button>
            </div>
          </div>
          
          <Button
            onClick={onClearSelection}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkActionsBar;
