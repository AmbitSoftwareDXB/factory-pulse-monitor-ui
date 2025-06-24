
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { MachineFilters } from '@/types/machine';

interface MachineFilterPanelProps {
  filters: MachineFilters;
  setFilters: (filters: MachineFilters) => void;
}

const MachineFilterPanel = ({ filters, setFilters }: MachineFilterPanelProps) => {
  const statusOptions = [
    { value: 'normal', label: 'Normal', color: 'bg-green-100 text-green-800' },
    { value: 'warning', label: 'Warning', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'fault', label: 'Fault', color: 'bg-red-100 text-red-800' }
  ];

  const typeOptions = [
    { value: 'compressor', label: 'Compressor' },
    { value: 'conveyor', label: 'Conveyor' },
    { value: 'robot', label: 'Robot' },
    { value: 'press', label: 'Press' },
    { value: 'welding', label: 'Welding' }
  ];

  const locationOptions = [
    { value: 'line-1', label: 'Assembly Line 1' },
    { value: 'line-2', label: 'Assembly Line 2' },
    { value: 'line-3', label: 'Assembly Line 3' },
    { value: 'packaging', label: 'Packaging' },
    { value: 'quality', label: 'Quality Control' }
  ];

  const handleStatusFilter = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    setFilters({ ...filters, status: newStatuses });
  };

  const handleTypeFilter = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    setFilters({ ...filters, type: newTypes });
  };

  const handleLocationFilter = (location: string) => {
    const newLocations = filters.location.includes(location)
      ? filters.location.filter(l => l !== location)
      : [...filters.location, location];
    setFilters({ ...filters, location: newLocations });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: [],
      type: [],
      location: []
    });
  };

  const hasActiveFilters = filters.search || filters.status.length > 0 || filters.type.length > 0 || filters.location.length > 0;

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search machines by name..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Filters</span>
            </div>

            {/* Status Filter */}
            <div>
              <span className="text-xs text-slate-400 mb-2 block">Status</span>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={filters.status.includes(option.value) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      filters.status.includes(option.value) 
                        ? option.color 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                    onClick={() => handleStatusFilter(option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <span className="text-xs text-slate-400 mb-2 block">Machine Type</span>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={filters.type.includes(option.value) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      filters.type.includes(option.value) 
                        ? 'bg-blue-600 text-white' 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                    onClick={() => handleTypeFilter(option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <span className="text-xs text-slate-400 mb-2 block">Location</span>
              <div className="flex flex-wrap gap-2">
                {locationOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={filters.location.includes(option.value) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      filters.location.includes(option.value) 
                        ? 'bg-purple-600 text-white' 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                    onClick={() => handleLocationFilter(option.value)}
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineFilterPanel;
