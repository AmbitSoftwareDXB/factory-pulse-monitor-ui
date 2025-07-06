import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Navigation from '@/components/dashboard/Navigation';
import { Play, Pause, RotateCcw, Save, Download, Settings } from 'lucide-react';

// Custom Node Components
const MachineNode = ({ data }: { data: any }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'border-green-500 bg-green-50';
      case 'idle': return 'border-yellow-500 bg-yellow-50';
      case 'fault': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${getStatusColor(data.status)} min-w-[120px]`}>
      <div className="font-semibold text-sm text-gray-800">{data.label}</div>
      <div className="text-xs text-gray-600 mt-1">
        Throughput: {data.throughput || 0}/hr
      </div>
      <div className="text-xs text-gray-600">
        Efficiency: {data.efficiency || 0}%
      </div>
      <Badge className="mt-2 text-xs" variant={data.status === 'running' ? 'default' : 'secondary'}>
        {data.status}
      </Badge>
    </div>
  );
};

const BufferNode = ({ data }: { data: any }) => {
  return (
    <div className="px-3 py-2 rounded border-2 border-blue-500 bg-blue-50 min-w-[100px]">
      <div className="font-semibold text-sm text-gray-800">{data.label}</div>
      <div className="text-xs text-gray-600">
        Capacity: {data.current || 0}/{data.max || 100}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((data.current || 0) / (data.max || 100)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const nodeTypes = {
  machine: MachineNode,
  buffer: BufferNode,
};

const DigitalTwinSimulation = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState([1]);
  const [scenarioName, setScenarioName] = useState('Production Line Optimization');
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'machine',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Press Machine 1', 
        status: 'running',
        throughput: 156,
        efficiency: 94
      },
    },
    {
      id: '2',
      type: 'buffer',
      position: { x: 300, y: 100 },
      data: { 
        label: 'Buffer A',
        current: 45,
        max: 100
      },
    },
    {
      id: '3',
      type: 'machine',
      position: { x: 500, y: 100 },
      data: { 
        label: 'Assembly Robot',
        status: 'running',
        throughput: 142,  
        efficiency: 87
      },
    },
    {
      id: '4',
      type: 'buffer',
      position: { x: 700, y: 100 },
      data: { 
        label: 'Buffer B',
        current: 78,
        max: 150
      },
    },
    {
      id: '5',
      type: 'machine',
      position: { x: 900, y: 100 },
      data: { 
        label: 'Quality Check',
        status: 'idle',
        throughput: 98,
        efficiency: 76
      },
    },
    {
      id: '6',
      type: 'machine',
      position: { x: 300, y: 250 },
      data: { 
        label: 'Backup Press',
        status: 'fault',
        throughput: 0,
        efficiency: 0
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10B981', strokeWidth: 3 }
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3', 
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10B981', strokeWidth: 3 }
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      type: 'smoothstep',
      animated: true, 
      style: { stroke: '#10B981', strokeWidth: 3 }
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#F59E0B', strokeWidth: 3 }
    },
    {
      id: 'e6-2',
      source: '6',
      target: '2',
      type: 'smoothstep',
      style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '5,5' }
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (isInteractiveMode) {
      setSelectedNode(node);
    }
  }, [isInteractiveMode]);

  const scenarios = [
    {
      name: 'Current State',
      description: 'Current production line configuration',
      metrics: { throughput: 142, efficiency: 85.7, bottleneck: 'Quality Check' }
    },
    {
      name: 'Optimized Flow',
      description: 'Improved buffer sizes and machine speeds',
      metrics: { throughput: 178, efficiency: 91.2, bottleneck: 'Assembly Robot' }
    },
    {
      name: 'Backup Active',
      description: 'Backup press activated to handle peak demand',
      metrics: { throughput: 203, efficiency: 89.5, bottleneck: 'Quality Check' }
    },
    {
      name: 'Maintenance Mode',
      description: 'One machine down for scheduled maintenance',
      metrics: { throughput: 89, efficiency: 78.3, bottleneck: 'Press Machine 1' }
    }
  ];

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [simulationResults, setSimulationResults] = useState({
    totalThroughput: 142,
    averageEfficiency: 85.7,
    bottleneckStation: 'Quality Check',
    cycleTime: 45,
    utilizationRate: 87.3,
    energyConsumption: 284.7
  });

  const applyScenarioToFlow = useCallback((scenarioName: string) => {
    let updatedNodes = [...initialNodes];
    let updatedEdges = [...initialEdges];

    switch (scenarioName) {
      case 'Current State':
        // Default state - use initial configuration
        break;
        
      case 'Optimized Flow':
        // Improve machine efficiency and buffer sizes
        updatedNodes = updatedNodes.map(node => {
          if (node.id === '3') {
            return { ...node, data: { ...node.data, status: 'running', throughput: 165, efficiency: 92 } };
          }
          if (node.id === '5') {
            return { ...node, data: { ...node.data, status: 'running', throughput: 156, efficiency: 88 } };
          }
          if (node.id === '2') {
            return { ...node, data: { ...node.data, current: 65, max: 120 } };
          }
          if (node.id === '4') {
            return { ...node, data: { ...node.data, current: 95, max: 180 } };
          }
          return node;
        });
        // Add optimized flow edge
        updatedEdges = updatedEdges.map(edge => {
          if (edge.id === 'e4-5') {
            return { ...edge, style: { stroke: '#10B981', strokeWidth: 3 } };
          }
          return edge;
        });
        break;
        
      case 'Backup Active':
        // Activate backup press and add connection
        updatedNodes = updatedNodes.map(node => {
          if (node.id === '6') {
            return { ...node, data: { ...node.data, status: 'running', throughput: 134, efficiency: 82 } };
          }
          if (node.id === '2') {
            return { ...node, data: { ...node.data, current: 85, max: 100 } };
          }
          return node;
        });
        // Make backup connection active
        updatedEdges = updatedEdges.map(edge => {
          if (edge.id === 'e6-2') {
            return { 
              ...edge, 
              animated: true,
              style: { stroke: '#10B981', strokeWidth: 3 }
            };
          }
          return edge;
        });
        break;
        
      case 'Maintenance Mode':
        // Put Assembly Robot in maintenance
        updatedNodes = updatedNodes.map(node => {
          if (node.id === '3') {
            return { ...node, data: { ...node.data, status: 'fault', throughput: 0, efficiency: 0 } };
          }
          if (node.id === '4') {
            return { ...node, data: { ...node.data, current: 15, max: 150 } };
          }
          return node;
        });
        // Disable flow through Assembly Robot
        updatedEdges = updatedEdges.map(edge => {
          if (edge.id === 'e2-3' || edge.id === 'e3-4') {
            return { 
              ...edge, 
              animated: false,
              style: { stroke: '#EF4444', strokeWidth: 2, strokeDasharray: '5,5' }
            };
          }
          return edge;
        });
        break;
    }

    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }, [setNodes, setEdges]);

  const runSimulation = () => {
    setIsSimulating(true);
    
    // Apply scenario to flow diagram
    applyScenarioToFlow(selectedScenario.name);
    
    // Simulate running for 3 seconds
    setTimeout(() => {
      setIsSimulating(false);
      // Update results based on selected scenario
      setSimulationResults({
        totalThroughput: selectedScenario.metrics.throughput,
        averageEfficiency: selectedScenario.metrics.efficiency,
        bottleneckStation: selectedScenario.metrics.bottleneck,
        cycleTime: Math.round(3600 / selectedScenario.metrics.throughput),
        utilizationRate: selectedScenario.metrics.efficiency - 5,
        energyConsumption: selectedScenario.metrics.throughput * 1.4
      });
    }, 3000);
  };

  const resetSimulation = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Digital Twin Simulation</h1>
            <div className="flex gap-2">
              <Button
                onClick={runSimulation}
                disabled={isSimulating}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              <Button
                onClick={resetSimulation}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Simulation Controls */}
            <div className="space-y-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Simulation Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Scenario</Label>
                    <div className="space-y-2 mt-2">
                      {scenarios.map((scenario, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded cursor-pointer transition-colors ${
                            selectedScenario.name === scenario.name
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                          onClick={() => setSelectedScenario(scenario)}
                        >
                          <div className="font-medium text-sm">{scenario.name}</div>
                          <div className="text-xs opacity-75">{scenario.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300">Simulation Speed</Label>
                    <div className="mt-2">
                      <Slider
                        value={simulationSpeed}
                        onValueChange={setSimulationSpeed}
                        max={5}
                        min={0.5}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="text-xs text-slate-400 mt-1">{simulationSpeed[0]}x speed</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300">Scenario Name</Label>
                    <Input
                      value={scenarioName}
                      onChange={(e) => setScenarioName(e.target.value)}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300">
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Simulation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Total Throughput</div>
                      <div className="text-white text-lg font-bold">{simulationResults.totalThroughput}/hr</div>
                    </div>
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Avg Efficiency</div>
                      <div className="text-white text-lg font-bold">{simulationResults.averageEfficiency}%</div>
                    </div>
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Bottleneck</div>
                      <div className="text-white text-sm font-bold">{simulationResults.bottleneckStation}</div>
                    </div>
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Cycle Time</div>
                      <div className="text-white text-lg font-bold">{simulationResults.cycleTime}s</div>
                    </div>
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Utilization</div>
                      <div className="text-white text-lg font-bold">{simulationResults.utilizationRate}%</div>
                    </div>
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Energy Usage</div>
                      <div className="text-white text-lg font-bold">{simulationResults.energyConsumption} kWh</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Process Flow Diagram */}
            <div className="lg:col-span-3">
              <Card className="bg-slate-800 border-slate-700 h-[700px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Process Flow Simulation</CardTitle>
                    <Button
                      variant={isInteractiveMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsInteractiveMode(!isInteractiveMode)}
                      className={`flex items-center gap-2 ${
                        isInteractiveMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">
                        Interactive Mode {isInteractiveMode ? 'ON' : 'OFF'}
                      </span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0 h-[600px]">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-slate-50"
                  >
                    <Controls />
                    <MiniMap 
                      nodeColor={(node) => {
                        switch (node.data?.status) {
                          case 'running': return '#10B981';
                          case 'idle': return '#F59E0B';
                          case 'fault': return '#EF4444';
                          default: return '#6B7280';
                        }
                      }}
                    />
                    <Background gap={12} size={1} />
                  </ReactFlow>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Optimization Recommendations */}
          {isInteractiveMode && selectedNode && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Node Details: {selectedNode.data.label}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm" 
                    onClick={() => setSelectedNode(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-slate-400 text-xs">Node Type</div>
                    <div className="text-white text-lg font-bold capitalize">{selectedNode.type}</div>
                  </div>
                  <div className="bg-slate-700 p-3 rounded">
                    <div className="text-slate-400 text-xs">Status</div>
                    <div className="text-white text-lg font-bold">{selectedNode.data.status || 'Active'}</div>
                  </div>
                  {selectedNode.data.throughput && (
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Throughput</div>
                      <div className="text-white text-lg font-bold">{selectedNode.data.throughput}/hr</div>
                    </div>
                  )}
                  {selectedNode.data.efficiency && (
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Efficiency</div>
                      <div className="text-white text-lg font-bold">{selectedNode.data.efficiency}%</div>
                    </div>
                  )}
                  {selectedNode.data.current !== undefined && (
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Current Load</div>
                      <div className="text-white text-lg font-bold">{selectedNode.data.current}</div>
                    </div>
                  )}
                  {selectedNode.data.max && (
                    <div className="bg-slate-700 p-3 rounded">
                      <div className="text-slate-400 text-xs">Max Capacity</div>
                      <div className="text-white text-lg font-bold">{selectedNode.data.max}</div>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-slate-300 text-sm">
                  <strong>Interactive Mode:</strong> Click on different nodes in the diagram to inspect their real-time data and performance metrics.
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimization Recommendations */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bottlenecks" className="w-full">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="bottlenecks" className="text-white">Bottlenecks</TabsTrigger>
                  <TabsTrigger value="efficiency" className="text-white">Efficiency</TabsTrigger>
                  <TabsTrigger value="maintenance" className="text-white">Maintenance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bottlenecks" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-4 rounded">
                      <h4 className="text-white font-semibold mb-2">Primary Bottleneck</h4>
                      <p className="text-slate-300 text-sm">Quality Check station is limiting overall throughput</p>
                      <Badge className="mt-2 bg-red-600">High Impact</Badge>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <h4 className="text-white font-semibold mb-2">Recommended Action</h4>
                      <p className="text-slate-300 text-sm">Add parallel quality station or increase inspection speed</p>
                      <Badge className="mt-2 bg-green-600">+25% Throughput</Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="efficiency" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-4 rounded">
                      <h4 className="text-white font-semibold mb-2">Buffer Optimization</h4>
                      <p className="text-slate-300 text-sm">Buffer A is underutilized while Buffer B is near capacity</p>
                      <Badge className="mt-2 bg-yellow-600">Medium Impact</Badge>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <h4 className="text-white font-semibold mb-2">Machine Balancing</h4>
                      <p className="text-slate-300 text-sm">Press Machine 1 could handle increased load with minor adjustments</p>
                      <Badge className="mt-2 bg-blue-600">+12% Efficiency</Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-4 rounded">
                      <h4 className="text-white font-semibold mb-2">Predictive Maintenance</h4>
                      <p className="text-slate-300 text-sm">Assembly Robot showing early wear indicators</p>
                      <Badge className="mt-2 bg-orange-600">Schedule Soon</Badge>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <h4 className="text-white font-semibold mb-2">Backup Strategy</h4>
                      <p className="text-slate-300 text-sm">Backup Press should be repaired to improve system resilience</p>
                      <Badge className="mt-2 bg-red-600">Critical</Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DigitalTwinSimulation;