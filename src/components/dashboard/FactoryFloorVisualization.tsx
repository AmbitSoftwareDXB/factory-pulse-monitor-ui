import React, { useState } from 'react';
import { AlertTriangle, Zap, Wrench, AlertOctagon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HazardIcon {
  id: string;
  type: 'warning' | 'critical' | 'maintenance' | 'electrical';
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  timestamp: string;
  x: number; // Percentage position from left
  y: number; // Percentage position from top
}

const hazardData: HazardIcon[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Hydraulic System Failure',
    description: 'Main hydraulic pump showing critical pressure drop',
    severity: 'Critical',
    location: 'Assembly Line 2 - Press Station',
    timestamp: '2024-01-15 14:23:00',
    x: 35,
    y: 45
  },
  {
    id: '2',
    type: 'warning',
    title: 'Temperature Warning',
    description: 'Cooling system temperature above normal range',
    severity: 'Medium',
    location: 'Quality Control - Inspection Area',
    timestamp: '2024-01-15 14:15:00',
    x: 70,
    y: 30
  },
  {
    id: '3',
    type: 'electrical',
    title: 'Power Fluctuation',
    description: 'Voltage instability detected in main power line',
    severity: 'High',
    location: 'Main Distribution Panel',
    timestamp: '2024-01-15 14:18:00',
    x: 15,
    y: 25
  },
  {
    id: '4',
    type: 'maintenance',
    title: 'Scheduled Maintenance Due',
    description: 'Conveyor belt requires preventive maintenance',
    severity: 'Low',
    location: 'Assembly Line 1 - Conveyor System',
    timestamp: '2024-01-15 14:10:00',
    x: 55,
    y: 60
  },
  {
    id: '5',
    type: 'warning',
    title: 'Vibration Alert',
    description: 'Abnormal vibration patterns detected',
    severity: 'Medium',
    location: 'Packaging Area - Sealing Unit',
    timestamp: '2024-01-15 14:20:00',
    x: 80,
    y: 70
  }
];

const getIconComponent = (type: string) => {
  switch (type) {
    case 'critical':
      return AlertOctagon;
    case 'electrical':
      return Zap;
    case 'maintenance':
      return Wrench;
    default:
      return AlertTriangle;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'critical':
      return 'text-red-500 border-red-500';
    case 'electrical':
      return 'text-yellow-500 border-yellow-500';
    case 'maintenance':
      return 'text-blue-500 border-blue-500';
    default:
      return 'text-orange-500 border-orange-500';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'text-red-400';
    case 'High':
      return 'text-orange-400';
    case 'Medium':
      return 'text-yellow-400';
    default:
      return 'text-green-400';
  }
};

const FactoryFloorVisualization = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="relative">
      <img 
        src="/lovable-uploads/91c26453-bc88-41fb-98cb-22f75c858976.png"
        alt="Factory Floor 3D Visualization"
        className="w-full h-auto rounded-lg"
      />
      
      {/* Status Overlay */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3">
        <p className="text-sm text-white font-medium">Live Factory Status</p>
        <p className="text-xs text-red-400">{hazardData.length} active issues detected</p>
      </div>

      {/* Hazard Icons */}
      <TooltipProvider>
        {hazardData.map((hazard) => {
          const IconComponent = getIconComponent(hazard.type);
          const colorClass = getIconColor(hazard.type);
          const isBlinking = hoveredIcon === null || hoveredIcon === hazard.id;
          
          return (
            <Tooltip key={hazard.id} delayDuration={100}>
              <TooltipTrigger asChild>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${hazard.x}%`,
                    top: `${hazard.y}%`
                  }}
                  onMouseEnter={() => setHoveredIcon(hazard.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <div className={`
                    w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center
                    ${colorClass}
                    ${isBlinking ? 'animate-pulse' : ''}
                    transition-all duration-200 hover:scale-110
                  `}>
                    <IconComponent size={16} />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="max-w-xs p-4 bg-slate-800 border-slate-600"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">{hazard.title}</h4>
                    <span className={`text-xs font-medium ${getSeverityColor(hazard.severity)}`}>
                      {hazard.severity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{hazard.description}</p>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p><span className="font-medium">Location:</span> {hazard.location}</p>
                    <p><span className="font-medium">Time:</span> {hazard.timestamp}</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default FactoryFloorVisualization;