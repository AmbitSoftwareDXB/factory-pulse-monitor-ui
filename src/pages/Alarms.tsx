import React, { useState, useMemo } from 'react';
import Navigation from '@/components/dashboard/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, CheckCircle, XCircle, Search, Filter, Download, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AlarmDetailsDialog from '@/components/alarms/AlarmDetailsDialog';
import * as XLSX from 'xlsx';
import PptxGenJS from 'pptxgenjs';

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

const mockAlarms: Alarm[] = [
  {
    id: 'ALM-001',
    title: 'Hydraulic System Failure',
    description: 'Main hydraulic pump showing critical pressure drop below 50 PSI',
    severity: 'Critical',
    status: 'Active',
    machine: 'Hydraulic Press 04',
    location: 'Assembly Line 2',
    timestamp: '2024-01-15 14:23:00',
    category: 'Mechanical'
  },
  {
    id: 'ALM-002',
    title: 'Temperature Warning',
    description: 'Cooling system temperature above normal range (85°C)',
    severity: 'High',
    status: 'Acknowledged',
    machine: 'Welding Robot 02',
    location: 'Assembly Line 3',
    timestamp: '2024-01-15 14:15:00',
    acknowledgedBy: 'Vivek Valsang',
    acknowledgedAt: '2024-01-15 14:18:00',
    category: 'Temperature'
  },
  {
    id: 'ALM-003',
    title: 'Power Fluctuation',
    description: 'Voltage instability detected in main power distribution',
    severity: 'High',
    status: 'Active',
    machine: 'Assembly Robot 01',
    location: 'Assembly Line 1',
    timestamp: '2024-01-15 14:18:00',
    category: 'Electrical'
  },
  {
    id: 'ALM-004',
    title: 'Vibration Alert',
    description: 'Abnormal vibration patterns detected above 3.5 mm/s',
    severity: 'Medium',
    status: 'Resolved',
    machine: 'Conveyor Belt 03',
    location: 'Assembly Line 1',
    timestamp: '2024-01-15 14:10:00',
    acknowledgedBy: 'John Smith',
    acknowledgedAt: '2024-01-15 14:12:00',
    category: 'Vibration'
  },
  {
    id: 'ALM-005',
    title: 'Pressure Drop Warning',
    description: 'Air pressure system showing gradual decline',
    severity: 'Medium',
    status: 'Active',
    machine: 'Compressor Press 01',
    location: 'Assembly Line 2',
    timestamp: '2024-01-15 14:05:00',
    category: 'Pressure'
  },
  {
    id: 'ALM-006',
    title: 'Emergency Stop Activated',
    description: 'Safety emergency stop button was activated',
    severity: 'Critical',
    status: 'Acknowledged',
    machine: 'Packaging Press',
    location: 'Packaging',
    timestamp: '2024-01-15 13:58:00',
    acknowledgedBy: 'Sarah Johnson',
    acknowledgedAt: '2024-01-15 14:01:00',
    category: 'Safety'
  }
];

const Alarms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedAlarms, setSelectedAlarms] = useState<string[]>([]);
  const [selectedAlarmForView, setSelectedAlarmForView] = useState<Alarm | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>(mockAlarms);
  const { toast } = useToast();

  const filteredAlarms = useMemo(() => {
    return alarms.filter(alarm => {
      const matchesSearch = searchQuery === '' || 
        alarm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alarm.machine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alarm.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || alarm.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || alarm.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || alarm.category === categoryFilter;

      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    });
  }, [searchQuery, severityFilter, statusFilter, categoryFilter]);

  const alarmStats = useMemo(() => {
    const active = alarms.filter(a => a.status === 'Active').length;
    const critical = alarms.filter(a => a.severity === 'Critical').length;
    const acknowledged = alarms.filter(a => a.status === 'Acknowledged').length;
    const resolved = alarms.filter(a => a.status === 'Resolved').length;
    
    return { active, critical, acknowledged, resolved, total: alarms.length };
  }, [alarms]);

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

  const handleAcknowledge = (alarmId: string) => {
    const currentTime = new Date().toLocaleString();
    const userName = "Current User"; // In a real app, this would come from auth context
    
    setAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        alarm.id === alarmId 
          ? { 
              ...alarm, 
              status: 'Acknowledged' as const,
              acknowledgedBy: userName,
              acknowledgedAt: currentTime
            }
          : alarm
      )
    );

    toast({
      title: "Alarm Acknowledged",
      description: `Alarm ${alarmId} has been acknowledged.`,
    });

    if (selectedAlarmForView?.id === alarmId) {
      setSelectedAlarmForView(prev => prev ? {
        ...prev,
        status: 'Acknowledged' as const,
        acknowledgedBy: userName,
        acknowledgedAt: currentTime
      } : null);
    }
  };

  const handleBulkAcknowledge = () => {
    if (selectedAlarms.length === 0) {
      toast({
        title: "No alarms selected",
        description: "Please select alarms to acknowledge.",
        variant: "destructive"
      });
      return;
    }

    const currentTime = new Date().toLocaleString();
    const userName = "Current User";

    setAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        selectedAlarms.includes(alarm.id) && alarm.status === 'Active'
          ? { 
              ...alarm, 
              status: 'Acknowledged' as const,
              acknowledgedBy: userName,
              acknowledgedAt: currentTime
            }
          : alarm
      )
    );

    toast({
      title: "Alarms Acknowledged",
      description: `${selectedAlarms.length} alarm(s) have been acknowledged.`,
    });
    setSelectedAlarms([]);
  };

  const handleViewAlarm = (alarm: Alarm) => {
    setSelectedAlarmForView(alarm);
    setDialogOpen(true);
  };

  const exportToCSV = () => {
    const csvData = filteredAlarms.map(alarm => ({
      ID: alarm.id,
      Title: alarm.title,
      Description: alarm.description,
      Severity: alarm.severity,
      Status: alarm.status,
      Machine: alarm.machine,
      Location: alarm.location,
      Category: alarm.category,
      Timestamp: alarm.timestamp,
      'Acknowledged By': alarm.acknowledgedBy || '',
      'Acknowledged At': alarm.acknowledgedAt || ''
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alarms_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToXLSX = () => {
    const wsData = filteredAlarms.map(alarm => ({
      ID: alarm.id,
      Title: alarm.title,
      Description: alarm.description,
      Severity: alarm.severity,
      Status: alarm.status,
      Machine: alarm.machine,
      Location: alarm.location,
      Category: alarm.category,
      Timestamp: alarm.timestamp,
      'Acknowledged By': alarm.acknowledgedBy || '',
      'Acknowledged At': alarm.acknowledgedAt || ''
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alarms');
    XLSX.writeFile(wb, `alarms_export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPowerPoint = () => {
    const pptx = new PptxGenJS();
    
    // Title slide
    const titleSlide = pptx.addSlide();
    titleSlide.addText('Alarm Management Report', {
      x: 1, y: 1, w: 8, h: 1.5, fontSize: 32, bold: true, color: '363636'
    });
    titleSlide.addText(`Generated on ${new Date().toLocaleDateString()}`, {
      x: 1, y: 2.5, w: 8, h: 0.5, fontSize: 16, color: '666666'
    });
    titleSlide.addText(`Total Alarms: ${filteredAlarms.length}`, {
      x: 1, y: 3.5, w: 8, h: 0.5, fontSize: 14, color: '666666'
    });

    // Summary slide
    const summarySlide = pptx.addSlide();
    summarySlide.addText('Alarm Summary', {
      x: 1, y: 0.5, w: 8, h: 1, fontSize: 24, bold: true, color: '363636'
    });
    
    const summaryTableData = [
      [
        { text: 'Status', options: { bold: true } },
        { text: 'Count', options: { bold: true } }
      ],
      [
        { text: 'Active', options: {} },
        { text: alarmStats.active.toString(), options: {} }
      ],
      [
        { text: 'Critical', options: {} },
        { text: alarmStats.critical.toString(), options: {} }
      ],
      [
        { text: 'Acknowledged', options: {} },
        { text: alarmStats.acknowledged.toString(), options: {} }
      ],
      [
        { text: 'Resolved', options: {} },
        { text: alarmStats.resolved.toString(), options: {} }
      ]
    ];
    
    summarySlide.addTable(summaryTableData, {
      x: 1, y: 2, w: 6, h: 3, fontSize: 14, border: {pt: 1, color: 'CFCFCF'}
    });

    // Detailed alarms (chunks of 8 per slide)
    const chunkedAlarms = [];
    for (let i = 0; i < filteredAlarms.length; i += 8) {
      chunkedAlarms.push(filteredAlarms.slice(i, i + 8));
    }

    chunkedAlarms.forEach((chunk, index) => {
      const detailSlide = pptx.addSlide();
      detailSlide.addText(`Alarm Details (${index + 1}/${chunkedAlarms.length})`, {
        x: 1, y: 0.5, w: 8, h: 0.8, fontSize: 20, bold: true, color: '363636'
      });

      const detailTableData = [
        [
          { text: 'ID', options: { bold: true } },
          { text: 'Title', options: { bold: true } },
          { text: 'Severity', options: { bold: true } },
          { text: 'Status', options: { bold: true } },
          { text: 'Machine', options: { bold: true } }
        ],
        ...chunk.map(alarm => [
          { text: alarm.id, options: {} },
          { text: alarm.title.substring(0, 30) + (alarm.title.length > 30 ? '...' : ''), options: {} },
          { text: alarm.severity, options: {} },
          { text: alarm.status, options: {} },
          { text: alarm.machine, options: {} }
        ])
      ];

      detailSlide.addTable(detailTableData, {
        x: 0.5, y: 1.5, w: 9, h: 5, fontSize: 10, border: {pt: 1, color: 'CFCFCF'}
      });
    });

    pptx.writeFile({ fileName: `alarms_report_${new Date().toISOString().split('T')[0]}.pptx` });
  };

  const handleExportAlarms = (format: 'csv' | 'xlsx' | 'pptx') => {
    switch (format) {
      case 'csv':
        exportToCSV();
        break;
      case 'xlsx':
        exportToXLSX();
        break;
      case 'pptx':
        exportToPowerPoint();
        break;
    }

    toast({
      title: "Export Complete",
      description: `Alarm data exported as ${format.toUpperCase()} successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Alarm Management</h1>
            <p className="text-slate-400 mt-1">Monitor and manage system alarms</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button
              onClick={handleBulkAcknowledge}
              disabled={selectedAlarms.length === 0}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Acknowledge Selected
            </Button>
            <Select onValueChange={(value: 'csv' | 'xlsx' | 'pptx') => handleExportAlarms(value)}>
              <SelectTrigger className="w-32 bg-slate-900 border-slate-600 text-white">
                <SelectValue placeholder={
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </div>
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center">
                    <FileDown className="w-4 h-4 mr-2" />
                    CSV
                  </div>
                </SelectItem>
                <SelectItem value="xlsx">
                  <div className="flex items-center">
                    <FileDown className="w-4 h-4 mr-2" />
                    Excel
                  </div>
                </SelectItem>
                <SelectItem value="pptx">
                  <div className="flex items-center">
                    <FileDown className="w-4 h-4 mr-2" />
                    PowerPoint
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Alarms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{alarmStats.total}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{alarmStats.active}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{alarmStats.critical}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Acknowledged</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{alarmStats.acknowledged}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{alarmStats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search alarms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-600 text-white"
                />
              </div>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Temperature">Temperature</SelectItem>
                  <SelectItem value="Pressure">Pressure</SelectItem>
                  <SelectItem value="Vibration">Vibration</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSeverityFilter('all');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                variant="outline"
                className="border-slate-600 text-slate-300"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alarms Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Alarm Details ({filteredAlarms.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">
                      <input
                        type="checkbox"
                        checked={selectedAlarms.length === filteredAlarms.length && filteredAlarms.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAlarms(filteredAlarms.map(a => a.id));
                          } else {
                            setSelectedAlarms([]);
                          }
                        }}
                        className="rounded"
                      />
                    </TableHead>
                    <TableHead className="text-slate-300">ID</TableHead>
                    <TableHead className="text-slate-300">Title</TableHead>
                    <TableHead className="text-slate-300">Machine</TableHead>
                    <TableHead className="text-slate-300">Location</TableHead>
                    <TableHead className="text-slate-300">Severity</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Category</TableHead>
                    <TableHead className="text-slate-300">Timestamp</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlarms.map((alarm) => (
                    <TableRow key={alarm.id} className="border-slate-700">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedAlarms.includes(alarm.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAlarms([...selectedAlarms, alarm.id]);
                            } else {
                              setSelectedAlarms(selectedAlarms.filter(id => id !== alarm.id));
                            }
                          }}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell className="text-white font-mono text-sm">{alarm.id}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="text-white font-medium truncate">{alarm.title}</div>
                          <div className="text-slate-400 text-sm truncate">{alarm.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{alarm.machine}</TableCell>
                      <TableCell className="text-slate-300">{alarm.location}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alarm.severity)}>
                          {alarm.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(alarm.status)}>
                          {alarm.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{alarm.category}</TableCell>
                      <TableCell className="text-slate-400 text-sm">{alarm.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {alarm.status === 'Active' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleAcknowledge(alarm.id)}
                              className="bg-yellow-600 hover:bg-yellow-700"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ack
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleViewAlarm(alarm)}
                            className="border-slate-600 text-slate-300"
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Alarm Details Dialog */}
        <AlarmDetailsDialog
          alarm={selectedAlarmForView}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onAcknowledge={handleAcknowledge}
        />
      </main>
    </div>
  );
};

export default Alarms;