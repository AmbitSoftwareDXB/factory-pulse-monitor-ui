import React, { useState } from 'react';
import Navigation from '@/components/dashboard/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Download, FileBarChart, TrendingUp, Clock, Settings, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const performanceData = [
  { name: 'Jan', oee: 85, availability: 92, performance: 88, quality: 95 },
  { name: 'Feb', oee: 82, availability: 89, performance: 85, quality: 93 },
  { name: 'Mar', oee: 88, availability: 94, performance: 91, quality: 96 },
  { name: 'Apr', oee: 86, availability: 91, performance: 89, quality: 94 },
  { name: 'May', oee: 90, availability: 95, performance: 93, quality: 97 },
  { name: 'Jun', oee: 87, availability: 92, performance: 90, quality: 95 }
];

const maintenanceData = [
  { name: 'Preventive', value: 65, color: '#10b981' },
  { name: 'Corrective', value: 25, color: '#f59e0b' },
  { name: 'Emergency', value: 10, color: '#ef4444' }
];

const alarmTrendData = [
  { month: 'Jan', critical: 12, high: 28, medium: 45, low: 18 },
  { month: 'Feb', critical: 15, high: 32, medium: 38, low: 22 },
  { month: 'Mar', critical: 8, high: 25, medium: 42, low: 20 },
  { month: 'Apr', critical: 10, high: 30, medium: 35, low: 25 },
  { month: 'May', critical: 6, high: 22, medium: 40, low: 15 },
  { month: 'Jun', critical: 9, high: 27, medium: 33, low: 19 }
];

const downtimeData = [
  { machine: 'Hydraulic Press 04', planned: 8, unplanned: 12 },
  { machine: 'Welding Robot 02', planned: 6, unplanned: 8 },
  { machine: 'Assembly Robot 01', planned: 4, unplanned: 3 },
  { machine: 'Conveyor Belt 03', planned: 5, unplanned: 7 },
  { machine: 'Compressor Press 01', planned: 7, unplanned: 5 }
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('performance');
  const { toast } = useToast();

  const handleExportReport = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} report export has been initiated. Download will begin shortly.`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Custom report has been generated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
            <p className="text-slate-400 mt-1">Comprehensive manufacturing insights and analytics</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
              <FileBarChart className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Average OEE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">86.3%</div>
              <p className="text-xs text-slate-500">+2.1% from last period</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Total Downtime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">127 hrs</div>
              <p className="text-xs text-slate-500">-8.5% from last period</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Maintenance Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">248</div>
              <p className="text-xs text-slate-500">73% preventive</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Total Alarms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">1,247</div>
              <p className="text-xs text-slate-500">12% critical/high</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="performance" className="text-slate-300 data-[state=active]:bg-slate-700">
              Performance
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="text-slate-300 data-[state=active]:bg-slate-700">
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="alarms" className="text-slate-300 data-[state=active]:bg-slate-700">
              Alarms
            </TabsTrigger>
            <TabsTrigger value="downtime" className="text-slate-300 data-[state=active]:bg-slate-700">
              Downtime
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">OEE Trends</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-slate-600 text-slate-300"
                    onClick={() => handleExportReport('OEE Trends')}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #475569',
                          borderRadius: '8px',
                          color: '#f1f5f9'
                        }} 
                      />
                      <Line type="monotone" dataKey="oee" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="availability" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="performance" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Overall Equipment Effectiveness</span>
                      <Badge className="bg-green-100 text-green-800">86.3%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Availability</span>
                      <Badge className="bg-blue-100 text-blue-800">92.2%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Performance Rate</span>
                      <Badge className="bg-yellow-100 text-yellow-800">89.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Quality Rate</span>
                      <Badge className="bg-purple-100 text-purple-800">95.2%</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Top Performing Machines</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Assembly Robot 01</span>
                        <span className="text-green-400">96.1%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Compressor Press 01</span>
                        <span className="text-green-400">94.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Spot Welder 03</span>
                        <span className="text-green-400">93.4%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Maintenance Distribution</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-slate-600 text-slate-300"
                    onClick={() => handleExportReport('Maintenance Distribution')}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={maintenanceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {maintenanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #475569',
                          borderRadius: '8px',
                          color: '#f1f5f9'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Maintenance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">161</div>
                      <div className="text-sm text-slate-400">Preventive</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">62</div>
                      <div className="text-sm text-slate-400">Corrective</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-red-400">25</div>
                      <div className="text-sm text-slate-400">Emergency</div>
                    </div>
                    <div className="text-center p-4 bg-slate-900 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">248</div>
                      <div className="text-sm text-slate-400">Total</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Upcoming Maintenance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Hydraulic Press 04</span>
                        <span className="text-yellow-400">Due in 3 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Conveyor Belt 03</span>
                        <span className="text-yellow-400">Due in 5 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Welding Robot 02</span>
                        <span className="text-green-400">Due in 12 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alarms Tab */}
          <TabsContent value="alarms" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Alarm Trends by Severity</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-slate-600 text-slate-300"
                  onClick={() => handleExportReport('Alarm Trends')}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={alarmTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }} 
                    />
                    <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" />
                    <Area type="monotone" dataKey="high" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                    <Area type="monotone" dataKey="medium" stackId="1" stroke="#eab308" fill="#eab308" />
                    <Area type="monotone" dataKey="low" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Downtime Tab */}
          <TabsContent value="downtime" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Downtime Analysis</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-slate-600 text-slate-300"
                  onClick={() => handleExportReport('Downtime Analysis')}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={downtimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="machine" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }} 
                    />
                    <Bar dataKey="planned" fill="#10b981" name="Planned Downtime" />
                    <Bar dataKey="unplanned" fill="#ef4444" name="Unplanned Downtime" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Export Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => handleExportReport('Complete Performance')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
              <Button 
                onClick={() => handleExportReport('Maintenance Summary')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Maintenance Report
              </Button>
              <Button 
                onClick={() => handleExportReport('Full Analytics')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Complete Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;