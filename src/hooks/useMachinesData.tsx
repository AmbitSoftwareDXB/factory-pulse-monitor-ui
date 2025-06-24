
import { useState, useEffect, useMemo } from 'react';
import { Machine, MachineFilters } from '@/types/machine';

export const useMachinesData = () => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [filters, setFilters] = useState<MachineFilters>({
    search: '',
    status: [],
    type: [],
    location: []
  });

  const machines: Machine[] = [
    {
      id: '1',
      name: 'Compressor Press 01',
      location: 'Assembly Line 2',
      type: 'compressor',
      status: 'normal',
      currentState: 'Running',
      cycleTime: 45,
      throughput: 156,
      powerUsage: 12.5,
      temperature: 68,
      oee: 94.2,
      vibration: 2.1,
      pressure: 8.5,
      flowRate: 120,
      rpm: 1450,
      efficiency: 92.5
    },
    {
      id: '2',
      name: 'Conveyor Belt 03',
      location: 'Assembly Line 1',
      type: 'conveyor',
      status: 'warning',
      currentState: 'Running',
      cycleTime: 38,
      throughput: 142,
      powerUsage: 8.2,
      temperature: 72,
      oee: 87.3,
      vibration: 3.2,
      pressure: 6.2,
      flowRate: 95,
      rpm: 890,
      efficiency: 88.1
    },
    {
      id: '3',
      name: 'Welding Robot 02',
      location: 'Assembly Line 3',
      type: 'robot',
      status: 'fault',
      currentState: 'Stopped',
      cycleTime: 52,
      throughput: 98,
      powerUsage: 15.8,
      temperature: 85,
      oee: 76.8,
      vibration: 1.8,
      pressure: 9.1,
      flowRate: 110,
      rpm: 0,
      efficiency: 78.5
    },
    {
      id: '4',
      name: 'Hydraulic Press 04',
      location: 'Assembly Line 2',
      type: 'press',
      status: 'normal',
      currentState: 'Running',
      cycleTime: 41,
      throughput: 134,
      powerUsage: 18.4,
      temperature: 70,
      oee: 91.7,
      vibration: 2.5,
      pressure: 12.3,
      flowRate: 85,
      rpm: 750,
      efficiency: 89.2
    },
    {
      id: '5',
      name: 'Assembly Robot 01',
      location: 'Assembly Line 1',
      type: 'robot',
      status: 'normal',
      currentState: 'Running',
      cycleTime: 39,
      throughput: 167,
      powerUsage: 14.2,
      temperature: 65,
      oee: 96.1,
      vibration: 1.9,
      pressure: 7.8,
      flowRate: 105,
      rpm: 1200,
      efficiency: 94.3
    },
    {
      id: '6',
      name: 'Quality Conveyor',
      location: 'Quality Control',
      type: 'conveyor',
      status: 'normal',
      currentState: 'Running',
      cycleTime: 35,
      throughput: 89,
      powerUsage: 6.8,
      temperature: 62,
      oee: 88.9,
      vibration: 2.3,
      pressure: 5.5,
      flowRate: 78,
      rpm: 650,
      efficiency: 86.7
    },
    {
      id: '7',
      name: 'Packaging Press',
      location: 'Packaging',
      type: 'press',
      status: 'warning',
      currentState: 'Running',
      cycleTime: 48,
      throughput: 112,
      powerUsage: 16.1,
      temperature: 77,
      oee: 82.5,
      vibration: 3.1,
      pressure: 10.2,
      flowRate: 92,
      rpm: 820,
      efficiency: 81.3
    },
    {
      id: '8',
      name: 'Spot Welder 03',
      location: 'Assembly Line 3',
      type: 'welding',
      status: 'normal',
      currentState: 'Running',
      cycleTime: 43,
      throughput: 145,
      powerUsage: 13.7,
      temperature: 69,
      oee: 93.4,
      vibration: 2.0,
      pressure: 8.9,
      flowRate: 98,
      rpm: 0,
      efficiency: 91.8
    }
  ];

  const filteredMachines = useMemo(() => {
    return machines.filter(machine => {
      // Search filter
      if (filters.search && !machine.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !machine.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(machine.status)) {
        return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(machine.type)) {
        return false;
      }

      // Location filter
      if (filters.location.length > 0) {
        const locationMap: { [key: string]: string } = {
          'line-1': 'Assembly Line 1',
          'line-2': 'Assembly Line 2',
          'line-3': 'Assembly Line 3',
          'packaging': 'Packaging',
          'quality': 'Quality Control'
        };
        
        const machineLocationKey = Object.entries(locationMap).find(([_, value]) => 
          value === machine.location
        )?.[0];
        
        if (!machineLocationKey || !filters.location.includes(machineLocationKey)) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update machine data periodically
      console.log('Updating machine data...');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    machines,
    filteredMachines,
    filters,
    setFilters,
    selectedMachine,
    setSelectedMachine
  };
};
