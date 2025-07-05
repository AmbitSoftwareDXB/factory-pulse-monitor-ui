import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/dashboard/Navigation';
import { useMachinesData } from '@/hooks/useMachinesData';
import { AlertTriangle, TrendingUp, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface Anomaly {
  id: string;
  machineId: string;
  machineName: string;
  type: 'temperature' | 'vibration' | 'pressure' | 'power' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  confidence: number;
  timestamp: string;
  predictedImpact: string;
  recommendation: string;
}

interface AIModel {
  name: string;
  status: 'training' | 'active' | 'inactive';
  accuracy: number;
  lastTrained: string;
  description: string;
}

const AnomalyDetection = () => {
  const { machines } = useMachinesData();
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      name: 'Temperature Prediction Model',
      status: 'active',
      accuracy: 94.2,
      lastTrained: '2024-01-14 08:30:00',
      description: 'Detects temperature anomalies using LSTM neural networks'
    },
    {
      name: 'Vibration Analysis Model',
      status: 'active',
      accuracy: 91.8,
      lastTrained: '2024-01-13 15:45:00',
      description: 'Identifies abnormal vibration patterns using CNN'
    },
    {
      name: 'Performance Degradation Model',
      status: 'training',
      accuracy: 88.5,
      lastTrained: '2024-01-12 12:00:00',
      description: 'Predicts equipment performance decline using ensemble methods'
    }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate real-time anomaly detection
  useEffect(() => {
    const generateAnomalies = () => {
      const anomalyTypes = ['temperature', 'vibration', 'pressure', 'power', 'performance'] as const;
      const severities = ['low', 'medium', 'high', 'critical'] as const;
      
      const newAnomalies: Anomaly[] = machines
        .filter(() => Math.random() > 0.7) // 30% chance of anomaly per machine
        .map((machine) => {
          const type = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
          const severity = severities[Math.floor(Math.random() * severities.length)];
          const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
          
          return {
            id: `anomaly-${machine.id}-${Date.now()}`,
            machineId: machine.id,
            machineName: machine.name,
            type,
            severity,
            description: getAnomalyDescription(type, severity),
            confidence,
            timestamp: new Date().toISOString(),
            predictedImpact: getPredictedImpact(severity),
            recommendation: getRecommendation(type, severity)
          };
        });

      setAnomalies(prev => [...newAnomalies, ...prev].slice(0, 20)); // Keep last 20 anomalies
    };

    const interval = setInterval(generateAnomalies, 15000); // Generate every 15 seconds
    generateAnomalies(); // Initial generation

    return () => clearInterval(interval);
  }, [machines]);

  const getAnomalyDescription = (type: string, severity: string) => {
    const descriptions = {
      temperature: {
        low: 'Slight temperature increase detected',
        medium: 'Temperature above normal operating range',
        high: 'Significant temperature spike detected',
        critical: 'Critical temperature threshold exceeded'
      },
      vibration: {
        low: 'Minor vibration pattern change',
        medium: 'Abnormal vibration frequency detected',
        high: 'High vibration levels indicating potential issues',
        critical: 'Critical vibration anomaly - immediate attention required'
      },
      pressure: {
        low: 'Pressure fluctuation observed',
        medium: 'Pressure outside normal parameters',
        high: 'Significant pressure anomaly detected',
        critical: 'Critical pressure failure imminent'
      },
      power: {
        low: 'Power consumption variation',
        medium: 'Unusual power usage pattern',
        high: 'High power consumption anomaly',
        critical: 'Critical power system anomaly'
      },
      performance: {
        low: 'Minor performance deviation',
        medium: 'Performance degradation detected',
        high: 'Significant performance drop',
        critical: 'Critical performance failure predicted'
      }
    };
    return descriptions[type][severity];
  };

  const getPredictedImpact = (severity: string) => {
    const impacts = {
      low: 'Minimal impact on production',
      medium: 'Potential 5-10% efficiency loss',
      high: 'Expected 15-25% production impact',
      critical: 'Immediate shutdown may be required'
    };
    return impacts[severity];
  };

  const getRecommendation = (type: string, severity: string) => {
    const recommendations = {
      temperature: 'Check cooling system and ventilation',
      vibration: 'Inspect mechanical components and alignment',
      pressure: 'Verify pressure sensors and hydraulic systems',
      power: 'Check electrical connections and power supply',
      performance: 'Schedule maintenance and component inspection'
    };
    return recommendations[type];
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'medium': return <Activity className="w-4 h-4" />;
      case 'low': return <Zap className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
  };

  // Generate sample chart data
  const generateChartData = () => {
    const now = Date.now();
    return Array.from({ length: 24 }, (_, i) => ({
      time: new Date(now - (23 - i) * 60 * 60 * 1000).toLocaleTimeString(),
      anomalies: Math.floor(Math.random() * 5),
      confidence: Math.floor(Math.random() * 20) + 80
    }));
  };

  const chartData = generateChartData();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">AI Anomaly Detection</h1>
            <Button 
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isAnalyzing ? 'Analyzing...' : 'Run Deep Analysis'}
            </Button>
          </div>

          {/* AI Models Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiModels.map((model, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">{model.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={model.status === 'active' ? 'default' : 'secondary'}
                      className={model.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {model.status}
                    </Badge>
                    <span className="text-white font-bold">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                  <p className="text-slate-400 text-xs">{model.description}</p>
                  <p className="text-slate-500 text-xs">Last trained: {model.lastTrained}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Anomalies */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Live Anomaly Feed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {anomalies.length === 0 ? (
                    <div className="text-slate-400 text-center py-8">
                      No anomalies detected. Systems operating normally.
                    </div>
                  ) : (
                    anomalies.map((anomaly) => (
                      <Alert key={anomaly.id} className="bg-slate-700 border-slate-600">
                        <div className="flex items-start gap-3">
                          <div className={`p-1 rounded ${getSeverityColor(anomaly.severity)}`}>
                            {getSeverityIcon(anomaly.severity)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <AlertDescription className="text-white font-medium">
                                {anomaly.machineName} - {anomaly.description}
                              </AlertDescription>
                              <Badge className={getSeverityColor(anomaly.severity)}>
                                {anomaly.confidence}% confidence
                              </Badge>
                            </div>
                            <div className="text-slate-400 text-sm mt-1">
                              Impact: {anomaly.predictedImpact}
                            </div>
                            <div className="text-blue-400 text-sm">
                              Recommendation: {anomaly.recommendation}
                            </div>
                            <div className="text-slate-500 text-xs mt-1">
                              {new Date(anomaly.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </Alert>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Detection Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-slate-400 text-sm">Total Anomalies (24h)</div>
                    <div className="text-white text-2xl font-bold">{anomalies.length}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-slate-400 text-sm">Critical Alerts</div>
                    <div className="text-red-400 text-2xl font-bold">
                      {anomalies.filter(a => a.severity === 'critical').length}
                    </div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-slate-400 text-sm">Avg Confidence</div>
                    <div className="text-white text-2xl font-bold">
                      {anomalies.length > 0 
                        ? Math.round(anomalies.reduce((acc, a) => acc + a.confidence, 0) / anomalies.length)
                        : 0}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analytics Charts */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Anomaly Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="timeline" className="text-white">Timeline</TabsTrigger>
                  <TabsTrigger value="confidence" className="text-white">Confidence Trends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anomalies" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={{ fill: '#8B5CF6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="confidence" className="mt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="confidence" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AnomalyDetection;