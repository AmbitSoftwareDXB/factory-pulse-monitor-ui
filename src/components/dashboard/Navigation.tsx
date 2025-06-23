
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navigation = () => {
  const navItems = ['Overview', 'Machines', 'Alarms', 'Reports'];
  
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-xl font-bold text-white">
            Industrial Monitor
          </div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  index === 0 ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-300">
            John Smith
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-600 text-white text-xs">JS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
