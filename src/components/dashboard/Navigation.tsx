
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Overview', path: '/' },
    { name: 'Machines', path: '/machines' },
    { name: 'Alarms', path: '/alarms' },
    { name: 'Reports', path: '/reports' },
    { name: '3D Equipment', path: '/equipment-3d' },
    { name: 'Work Instructions', path: '/work-instructions' },
    { name: 'Digital Twin', path: '/digital-twin' }
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-blue-400 transition-colors">
            <img 
              src="/lovable-uploads/040dcaec-ee9e-42b9-a3f0-5f1475f922ff.png" 
              alt="Digital Twin Monitor Logo" 
              className="h-8 w-8 dark:brightness-100 brightness-0 dark:invert-0 invert"
            />
            <span>Digital Twin Monitor</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  location.pathname === item.path ? 'text-blue-400' : 'text-slate-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-300">
            Vivek Valsang
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-600 text-white text-xs">VV</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
