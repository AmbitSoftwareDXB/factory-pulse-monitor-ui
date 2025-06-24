
import { useState, useEffect } from 'react';

interface KPIData {
  title: string;
  value: string;
  trend: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  trendDirection?: 'up' | 'down';
  unit?: string;
}

export const useDashboardData = () => {
  const [kpiData, setKpiData] = useState<KPIData[]>([
    {
      title: 'Production Output',
      value: '1,250',
      trend: '+10%',
      trendType: 'positive',
      unit: 'units'
    },
    {
      title: 'Performance Efficiency',
      value: '94.2',
      trend: '+2.1%',
      trendType: 'positive',
      unit: '%'
    },
    {
      title: 'Active Alarms',
      value: '3',
      trend: '-2',
      trendType: 'positive',
      unit: ''
    },
    {
      title: 'Equipment Failure Rate',
      value: '0.8',
      trend: '-0.2%',
      trendType: 'positive',
      unit: '%'
    },
    {
      title: 'Labor Utilization',
      value: '72.4%',
      trend: '+3%',
      trendDirection: 'up'
    },
    {
      title: 'Energy Usage',
      value: '284.7',
      trend: '+5.2%',
      trendType: 'negative',
      unit: 'kWh'
    },
    {
      title: 'Defect Rate',
      value: '0.05',
      trend: '-0.01%',
      trendType: 'positive',
      unit: '%'
    },
    {
      title: 'Devices per Hour',
      value: '156',
      trend: '+8',
      trendType: 'positive',
      unit: 'units/hr'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('Today');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prevData => 
        prevData.map(item => {
          // Simulate small random changes
          const currentValue = parseFloat(item.value.replace(/[,%]/g, ''));
          const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
          const newValue = Math.max(0, currentValue * (1 + variation));
          
          let formattedValue;
          if (item.unit === 'units' || item.unit === 'units/hr') {
            formattedValue = Math.floor(newValue).toLocaleString();
          } else if (item.title === 'Active Alarms') {
            // Ensure Active Alarms is always a whole number
            formattedValue = Math.floor(newValue).toString();
          } else if (item.title === 'Labor Utilization') {
            formattedValue = `${newValue.toFixed(1)}%`;
          } else {
            formattedValue = newValue.toFixed(1);
          }
          
          return {
            ...item,
            value: formattedValue
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    kpiData,
    activeFilter,
    setActiveFilter
  };
};
