
export interface Machine {
  id: string;
  name: string;
  location: string;
  type: 'compressor' | 'conveyor' | 'robot' | 'press' | 'welding';
  status: 'normal' | 'warning' | 'fault';
  currentState: string;
  cycleTime: number;
  throughput: number;
  powerUsage: number;
  temperature: number;
  oee: number;
  vibration: number;
  pressure: number;
  flowRate: number;
  rpm: number;
  efficiency: number;
}

export interface MachineFilters {
  search: string;
  status: string[];
  type: string[];
  location: string[];
}
