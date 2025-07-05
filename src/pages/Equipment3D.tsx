import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html, Box, Cylinder, Sphere } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/dashboard/Navigation';
import { useMachinesData } from '@/hooks/useMachinesData';
import * as THREE from 'three';

interface DataOverlayProps {
  position: [number, number, number];
  data: {
    title: string;
    value: string;
    status: 'normal' | 'warning' | 'fault';
  };
  visible: boolean;
}

const DataOverlay: React.FC<DataOverlayProps> = ({ position, data, visible }) => {
  if (!visible) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'fault': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Html position={position} className="pointer-events-none">
      <div className={`${getStatusColor(data.status)} text-white px-2 py-1 rounded text-xs whitespace-nowrap`}>
        <div className="font-semibold">{data.title}</div>
        <div>{data.value}</div>
      </div>
    </Html>
  );
};

interface Machine3DProps {
  machineData: any;
  showOverlays: boolean;
}

const Machine3D: React.FC<Machine3DProps> = ({ machineData, showOverlays }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && machineData.status === 'normal') {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getMachineColor = (status: string) => {
    switch (status) {
      case 'normal': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'fault': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderMachineModel = () => {
    const color = getMachineColor(machineData.status);
    
    switch (machineData.type) {
      case 'compressor':
        return (
          <group ref={meshRef}>
            <Cylinder args={[1, 1, 2]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} />
            </Cylinder>
            <Cylinder args={[0.3, 0.3, 2.5]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#404040" />
            </Cylinder>
          </group>
        );
      case 'robot':
        return (
          <group ref={meshRef}>
            <Box args={[0.8, 2, 0.8]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Box args={[1.5, 0.3, 0.3]} position={[0, 1.2, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Sphere args={[0.2]} position={[0.7, 1.2, 0]}>
              <meshStandardMaterial color="#ff6b6b" />
            </Sphere>
          </group>
        );
      case 'conveyor':
        return (
          <group ref={meshRef}>
            <Box args={[4, 0.2, 1]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} />
            </Box>
            <Cylinder args={[0.1, 0.1, 1]} position={[-1.8, -0.3, 0]} rotation={[Math.PI/2, 0, 0]}>
              <meshStandardMaterial color="#404040" />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 1]} position={[1.8, -0.3, 0]} rotation={[Math.PI/2, 0, 0]}>
              <meshStandardMaterial color="#404040" />
            </Cylinder>
          </group>
        );
      default:
        return (
          <group ref={meshRef}>
            <Box args={[1.5, 1.5, 1.5]}>
              <meshStandardMaterial color={color} />
            </Box>
          </group>
        );
    }
  };

  return (
    <group>
      {renderMachineModel()}
      <DataOverlay 
        position={[0, 2, 0]} 
        data={{
          title: machineData.name,
          value: `${machineData.oee}% OEE`,
          status: machineData.status
        }}
        visible={showOverlays}
      />
      <DataOverlay 
        position={[2, 1, 0]} 
        data={{
          title: 'Temperature',
          value: `${machineData.temperature}°C`,
          status: machineData.temperature > 75 ? 'warning' : 'normal'
        }}
        visible={showOverlays}
      />
      <DataOverlay 
        position={[-2, 1, 0]} 
        data={{
          title: 'Power',
          value: `${machineData.powerUsage} kW`,
          status: 'normal'
        }}
        visible={showOverlays}
      />
    </group>
  );
};

const Equipment3D = () => {
  const { machines } = useMachinesData();
  const [selectedMachine, setSelectedMachine] = useState(machines[0]);
  const [showOverlays, setShowOverlays] = useState(true);
  const [viewMode, setViewMode] = useState<'single' | 'factory'>('single');

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">3D Equipment Models</h1>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'single' ? 'default' : 'outline'}
                onClick={() => setViewMode('single')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Single View
              </Button>
              <Button
                variant={viewMode === 'factory' ? 'default' : 'outline'}
                onClick={() => setViewMode('factory')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Factory Layout
              </Button>
              <Button
                variant={showOverlays ? 'default' : 'outline'}
                onClick={() => setShowOverlays(!showOverlays)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {showOverlays ? 'Hide' : 'Show'} Data Overlays
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Machine Selection Panel */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Equipment List</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {machines.map((machine) => (
                  <div
                    key={machine.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedMachine.id === machine.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                    onClick={() => setSelectedMachine(machine)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{machine.name}</span>
                      <Badge 
                        variant={machine.status === 'normal' ? 'default' : 'destructive'}
                        className={
                          machine.status === 'normal' 
                            ? 'bg-green-600' 
                            : machine.status === 'warning' 
                            ? 'bg-yellow-600' 
                            : 'bg-red-600'
                        }
                      >
                        {machine.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {machine.location} • {machine.type}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 3D Viewer */}
            <div className="lg:col-span-3">
              <Card className="bg-slate-800 border-slate-700 h-[600px]">
                <CardContent className="p-0 h-full">
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.4} />
                      <directionalLight position={[10, 10, 5]} intensity={1} />
                      <pointLight position={[-10, -10, -5]} intensity={0.5} />
                      
                      {viewMode === 'single' ? (
                        <Machine3D machineData={selectedMachine} showOverlays={showOverlays} />
                      ) : (
                        <group>
                          {machines.slice(0, 6).map((machine, index) => (
                            <group key={machine.id} position={[
                              (index % 3) * 4 - 4,
                              0,
                              Math.floor(index / 3) * 4 - 2
                            ]}>
                              <Machine3D machineData={machine} showOverlays={showOverlays} />
                            </group>
                          ))}
                        </group>
                      )}
                      
                      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                    </Suspense>
                  </Canvas>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Machine Details */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedMachine.name} - Live Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="performance" className="text-white">Performance</TabsTrigger>
                  <TabsTrigger value="sensors" className="text-white">Sensors</TabsTrigger>
                  <TabsTrigger value="maintenance" className="text-white">Maintenance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">OEE</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.oee}%</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Throughput</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.throughput}</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Efficiency</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.efficiency}%</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Cycle Time</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.cycleTime}s</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sensors" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Temperature</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.temperature}°C</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Vibration</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.vibration}</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Pressure</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.pressure} bar</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Power Usage</div>
                      <div className="text-white text-2xl font-bold">{selectedMachine.powerUsage} kW</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Next Maintenance</div>
                      <div className="text-white text-lg">In 15 days</div>
                    </div>
                    <div className="bg-slate-700 p-4 rounded">
                      <div className="text-slate-400 text-sm">Last Service</div>
                      <div className="text-white text-lg">7 days ago</div>
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

export default Equipment3D;