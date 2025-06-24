
import React, { useState } from 'react';
import Navigation from '@/components/dashboard/Navigation';
import MachinesOverview from '@/components/machines/MachinesOverview';
import MachineFilterPanel from '@/components/machines/MachineFilterPanel';
import MachineDetailDrawer from '@/components/machines/MachineDetailDrawer';
import AnalyticsSummary from '@/components/machines/AnalyticsSummary';
import BulkActionsBar from '@/components/machines/BulkActionsBar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useMachinesData } from '@/hooks/useMachinesData';

const Machines = () => {
  const { machines, filteredMachines, filters, setFilters, selectedMachine, setSelectedMachine } = useMachinesData();
  const [selectedMachines, setSelectedMachines] = useState<string[]>([]);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const handleMachineSelect = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    if (machine) {
      setSelectedMachine(machine);
      setIsDetailDrawerOpen(true);
    }
  };

  const handleBulkSelect = (machineId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedMachines([...selectedMachines, machineId]);
    } else {
      setSelectedMachines(selectedMachines.filter(id => id !== machineId));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-slate-300 hover:text-blue-400">
                Plant Overview
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">Machines</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">Machine Monitoring</h1>
          <p className="text-slate-300">Real-time monitoring and diagnostics for all factory floor equipment</p>
        </div>

        {/* Analytics Summary */}
        <AnalyticsSummary machines={machines} />

        {/* Filter Panel */}
        <MachineFilterPanel filters={filters} setFilters={setFilters} />

        {/* Bulk Actions Bar */}
        {selectedMachines.length > 0 && (
          <BulkActionsBar 
            selectedCount={selectedMachines.length} 
            onClearSelection={() => setSelectedMachines([])}
          />
        )}

        {/* Machines Overview Grid */}
        <MachinesOverview 
          machines={filteredMachines}
          selectedMachines={selectedMachines}
          onMachineSelect={handleMachineSelect}
          onBulkSelect={handleBulkSelect}
        />

        {/* Machine Detail Drawer */}
        <MachineDetailDrawer
          machine={selectedMachine}
          isOpen={isDetailDrawerOpen}
          onClose={() => setIsDetailDrawerOpen(false)}
        />
      </main>
    </div>
  );
};

export default Machines;
