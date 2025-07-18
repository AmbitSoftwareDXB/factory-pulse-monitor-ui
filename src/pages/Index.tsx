
import React from 'react';
import Navigation from '@/components/dashboard/Navigation';
import KPICard from '@/components/dashboard/KPICard';
import MachineStatus from '@/components/dashboard/MachineStatus';
import AlarmsTable from '@/components/dashboard/AlarmsTable';
import AnalyticsCards from '@/components/dashboard/AnalyticsCards';
import FactoryFloorVisualization from '@/components/dashboard/FactoryFloorVisualization';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { kpiData, activeFilter, setActiveFilter } = useDashboardData();
  const filterOptions = ['Today', 'Last 7 Days', 'Last 30 Days'];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">Plant Overview</h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-2">
            {filterOptions.map((option) => (
              <Button
                key={option}
                variant={activeFilter === option ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(option)}
                className={`rounded-full ${
                  activeFilter === option 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : option === 'Last 7 Days' || option === 'Last 30 Days'
                    ? 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600'
                    : 'border-slate-600 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              trendType={kpi.trendType}
              unit={kpi.unit}
            />
          ))}
        </div>

        {/* Factory Floor Visualization */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Factory Floor Overview</h2>
          <FactoryFloorVisualization />
        </div>

        {/* Machine Diagnostics */}
        <MachineStatus />

        {/* Alarms Table */}
        <AlarmsTable />

        {/* Analytics Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
          <AnalyticsCards />
        </div>
      </main>
    </div>
  );
};

export default Index;
