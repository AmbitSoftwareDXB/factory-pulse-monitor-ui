
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Cpu, Wifi, HardDrive, Zap } from 'lucide-react';
import { Machine } from '@/types/machine';

interface DeviceDetailsDialogProps {
  machine: Machine | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeviceDetailsDialog = ({ machine, isOpen, onClose }: DeviceDetailsDialogProps) => {
  if (!machine) return null;

  const deviceSpecs = {
    model: 'IND-4000X',
    serialNumber: 'SN-2024-' + machine.id.padStart(4, '0'),
    manufacturer: 'Industrial Systems Corp',
    installDate: '2023-03-15',
    lastCalibration: '2024-05-20',
    firmwareVersion: 'v2.4.1',
    communicationProtocol: 'Modbus TCP/IP',
    ipAddress: `192.168.1.${100 + parseInt(machine.id)}`,
    networkStatus: 'Connected'
  };

  const systemHealth = [
    { component: 'CPU', status: 'healthy', usage: '34%', temp: '42°C' },
    { component: 'Memory', status: 'healthy', usage: '67%', temp: 'N/A' },
    { component: 'Storage', status: 'healthy', usage: '23%', temp: 'N/A' },
    { component: 'Network', status: 'healthy', usage: '12%', temp: 'N/A' },
    { component: 'Power Supply', status: 'healthy', usage: '78%', temp: '38°C' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-500" />
            <span>Device Details - {machine.name}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="specifications" className="data-[state=active]:bg-slate-700">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-slate-700">
              System Health
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-slate-700">
              Network & Connectivity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  Device Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400">Model</p>
                      <p className="font-medium text-white">{deviceSpecs.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Serial Number</p>
                      <p className="font-medium text-white">{deviceSpecs.serialNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Manufacturer</p>
                      <p className="font-medium text-white">{deviceSpecs.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Install Date</p>
                      <p className="font-medium text-white">{deviceSpecs.installDate}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400">Machine Type</p>
                      <p className="font-medium text-white capitalize">{machine.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="font-medium text-white">{machine.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Last Calibration</p>
                      <p className="font-medium text-white">{deviceSpecs.lastCalibration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Firmware Version</p>
                      <p className="font-medium text-white">{deviceSpecs.firmwareVersion}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Current Operating Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{machine.oee}%</p>
                    <p className="text-sm text-slate-400">OEE</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{machine.throughput}</p>
                    <p className="text-sm text-slate-400">Units/Hour</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">{machine.powerUsage}</p>
                    <p className="text-sm text-slate-400">kW</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <HardDrive className="w-5 h-5 mr-2" />
                  System Health Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(component.status)}>
                          {component.status}
                        </Badge>
                        <span className="text-white font-medium">{component.component}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-slate-400">Usage: <span className="text-white">{component.usage}</span></span>
                        {component.temp !== 'N/A' && (
                          <span className="text-slate-400">Temp: <span className="text-white">{component.temp}</span></span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Wifi className="w-5 h-5 mr-2" />
                  Network Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400">IP Address</p>
                      <p className="font-medium text-white">{deviceSpecs.ipAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Protocol</p>
                      <p className="font-medium text-white">{deviceSpecs.communicationProtocol}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400">Network Status</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="font-medium text-white">{deviceSpecs.networkStatus}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Last Communication</p>
                      <p className="font-medium text-white">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Communication Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-green-400">99.8%</p>
                    <p className="text-xs text-slate-400">Uptime</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-blue-400">12ms</p>
                    <p className="text-xs text-slate-400">Latency</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-yellow-400">156</p>
                    <p className="text-xs text-slate-400">Packets/min</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-purple-400">0</p>
                    <p className="text-xs text-slate-400">Errors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailsDialog;
