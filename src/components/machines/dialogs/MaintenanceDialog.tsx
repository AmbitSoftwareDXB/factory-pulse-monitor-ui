
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Calendar, Clock, AlertCircle, Plus } from 'lucide-react';
import { Machine } from '@/types/machine';
import { useToast } from '@/hooks/use-toast';

interface MaintenanceDialogProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
}

const MaintenanceDialog = ({ machine, isOpen, onClose }: MaintenanceDialogProps) => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [newRequestType, setNewRequestType] = useState('');
  const [newRequestDescription, setNewRequestDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!machine) return null;

  const maintenanceHistory = [
    {
      date: '2024-06-20',
      type: 'Preventive',
      description: 'Monthly calibration and sensor check',
      technician: 'Mike Johnson',
      duration: '2.5 hours',
      status: 'Completed',
      notes: 'All systems operating within normal parameters'
    },
    {
      date: '2024-06-15',
      type: 'Corrective',
      description: 'Replaced faulty pressure sensor',
      technician: 'Sarah Chen',
      duration: '1.5 hours',
      status: 'Completed',
      notes: 'New sensor installed and calibrated successfully'
    },
    {
      date: '2024-06-01',
      type: 'Inspection',
      description: 'Quarterly safety inspection',
      technician: 'David Martinez',
      duration: '1 hour',
      status: 'Completed',
      notes: 'No safety issues identified'
    }
  ];

  const upcomingMaintenance = [
    {
      date: '2024-07-01',
      type: 'Preventive',
      description: 'Quarterly comprehensive overhaul',
      estimatedDuration: '4 hours',
      assignedTo: 'TBD',
      priority: 'High'
    },
    {
      date: '2024-07-15',
      type: 'Inspection',
      description: 'Safety system verification',
      estimatedDuration: '1 hour',
      assignedTo: 'Safety Team',
      priority: 'Medium'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Preventive': return 'bg-blue-100 text-blue-800';
      case 'Corrective': return 'bg-red-100 text-red-800';
      case 'Inspection': return 'bg-green-100 text-green-800';
      case 'Emergency': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitRequest = async () => {
    if (!newRequestType || !newRequestDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Maintenance Request Submitted",
      description: `${newRequestType} maintenance request for ${machine.name} has been submitted successfully.`,
    });
    
    setNewRequestType('');
    setNewRequestDescription('');
    setIsSubmitting(false);
    setActiveTab('schedule');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center space-x-2">
            <Wrench className="w-6 h-6 text-orange-500" />
            <span>Maintenance - {machine.name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="schedule" className="data-[state=active]:bg-slate-700">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
              History
            </TabsTrigger>
            <TabsTrigger value="request" className="data-[state=active]:bg-slate-700">
              New Request
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMaintenance.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority} Priority
                          </Badge>
                        </div>
                        <span className="text-sm text-slate-400">{item.date}</span>
                      </div>
                      
                      <h4 className="font-medium text-white mb-2">{item.description}</h4>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Duration:</span>
                          <span className="ml-2 text-white">{item.estimatedDuration}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Assigned To:</span>
                          <span className="ml-2 text-white">{item.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Maintenance Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-400 font-medium">Upcoming Due Date</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Quarterly overhaul is due in 6 days. Please ensure proper scheduling to avoid production delays.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Maintenance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceHistory.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-700 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {item.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-slate-400">{item.date}</span>
                      </div>
                      
                      <h4 className="font-medium text-white mb-2">{item.description}</h4>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-slate-400">Technician:</span>
                          <span className="ml-2 text-white">{item.technician}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Duration:</span>
                          <span className="ml-2 text-white">{item.duration}</span>
                        </div>
                      </div>
                      
                      {item.notes && (
                        <div className="mt-2 p-2 bg-slate-600 rounded text-sm">
                          <span className="text-slate-400">Notes:</span>
                          <p className="text-slate-200 mt-1">{item.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="request" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Submit Maintenance Request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Request Type *
                  </label>
                  <Select value={newRequestType} onValueChange={setNewRequestType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select maintenance type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Corrective">Corrective</SelectItem>
                      <SelectItem value="Preventive">Preventive</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description *
                  </label>
                  <Textarea
                    value={newRequestDescription}
                    onChange={(e) => setNewRequestDescription(e.target.value)}
                    placeholder="Describe the maintenance issue or requirement..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Machine Location
                    </label>
                    <input
                      type="text"
                      value={machine.location}
                      disabled
                      className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Requested By
                    </label>
                    <input
                      type="text"
                      value="Vivek Valsang"
                      disabled
                      className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-slate-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {activeTab === 'request' && (
          <DialogFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitRequest}
              disabled={isSubmitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceDialog;
