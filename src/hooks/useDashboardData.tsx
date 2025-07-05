
import { useState, useEffect } from 'react';

interface KPIData {
  title: string;
  value: string;
  trend: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  trendDirection?: 'up' | 'down';
  unit?: string;
}

const getKPIDataForFilter = (filter: string): KPIData[] => {
  const baseData = {
    'Today': [
      {
        title: 'Production Output',
        value: '1,250',
        trend: '+10%',
        trendType: 'positive' as const,
        unit: 'units'
      },
      {
        title: 'Performance Efficiency',
        value: '94.2',
        trend: '+2.1%',
        trendType: 'positive' as const,
        unit: '%'
      },
      {
        title: 'Active Alarms',
        value: '3',
        trend: '-2',
        trendType: 'positive' as const,
        unit: ''
      },
      {
        title: 'Equipment Failure Rate',
        value: '0.8',
        trend: '-0.2%',
        trendType: 'positive' as const,
        unit: '%'
      },
      {
        title: 'Labor Utilization',
        value: '72.4%',
        trend: '+3%',
        trendDirection: 'up' as const
      },
      {
        title: 'Energy Usage',
        value: '284.7',
        trend: '+5.2%',
        trendType: 'negative' as const,
        unit: 'kWh'
      },
      {
        title: 'Defect Rate',
        value: '0.05',
        trend: '-0.01%',
        trendType: 'positive' as const,
        unit: '%'
      },
      {
        title: 'Devices per Hour',
        value: '156',
        trend: '+8',
        trendType: 'positive' as const,
        unit: 'units/hr'
      }
    ],
    'Last 7 Days': [
      {
        title: 'Production Output',
        value: '8,400',
        trend: '+5%',
        trendType: 'positive' as const,
        unit: 'units'
      },
      {
        title: 'Performance Efficiency',
        value: '91.8',
        trend: '+1.2%',
        trendType: 'positive' as const,
        unit: '%'
      },
      {
        title: 'Active Alarms',
        value: '18',
        trend: '+3',
        trendType: 'negative' as const,
        unit: ''
      },
      {
        title: 'Equipment Failure Rate',
        value: '1.2',
        trend: '+0.1%',
        trendType: 'negative' as const,
        unit: '%'
      },
      {
        title: 'Labor Utilization',
        value: '74.1%',
        trend: '+1.5%',
        trendDirection: 'up' as const
      },
      {
        title: 'Energy Usage',
        value: '1,890',
        trend: '+3.8%',
        trendType: 'negative' as const,
        unit: 'kWh'
      },
      {
        title: 'Defect Rate',
        value: '0.08',
        trend: '+0.02%',
        trendType: 'negative' as const,
        unit: '%'
      },
      {
        title: 'Devices per Hour',
        value: '148',
        trend: '+12',
        trendType: 'positive' as const,
        unit: 'units/hr'
      }
    ],
    'Last 30 Days': [
      {
        title: 'Production Output',
        value: '35,600',
        trend: '+8%',
        trendType: 'positive' as const,
        unit: 'units'
      },
      {
        title: 'Performance Efficiency',
        value: '89.5',
        trend: '-1.8%',
        trendType: 'negative' as const,
        unit: '%'
      },
      {
        title: 'Active Alarms',
        value: '67',
        trend: '+12',
        trendType: 'negative' as const,
        unit: ''
      },
      {
        title: 'Equipment Failure Rate',
        value: '1.8',
        trend: '+0.4%',
        trendType: 'negative' as const,
        unit: '%'
      },
      {
        title: 'Labor Utilization',
        value: '71.2%',
        trend: '-2.1%',
        trendDirection: 'down' as const
      },
      {
        title: 'Energy Usage',
        value: '8,140',
        trend: '+7.2%',
        trendType: 'negative' as const,
        unit: 'kWh'
      },
      {
        title: 'Defect Rate',
        value: '0.12',
        trend: '+0.03%',
        trendType: 'negative' as const,
        unit: '%'
      },
      {
        title: 'Devices per Hour',
        value: '142',
        trend: '+18',
        trendType: 'positive' as const,
        unit: 'units/hr'
      }
    ]
  };
  
  return baseData[filter as keyof typeof baseData] || baseData.Today;
};

export const useDashboardData = () => {
  const [activeFilter, setActiveFilter] = useState('Today');
  const [kpiData, setKpiData] = useState<KPIData[]>(() => getKPIDataForFilter('Today'));

  // Update data when filter changes
  useEffect(() => {
    setKpiData(getKPIDataForFilter(activeFilter));
  }, [activeFilter]);

  // Simulate real-time data updates only for "Today"
  useEffect(() => {
    if (activeFilter !== 'Today') return;
    
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
  }, [activeFilter]);

  return {
    kpiData,
    activeFilter,
    setActiveFilter
  };
};
