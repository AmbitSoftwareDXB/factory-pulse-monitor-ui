
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors">
            <img 
              src="/lovable-uploads/040dcaec-ee9e-42b9-a3f0-5f1475f922ff.png" 
              alt="Digital Twin Monitor Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8 dark:brightness-100 brightness-0 dark:invert-0 invert"
            />
            <span className="hidden sm:block">Digital Twin Monitor</span>
            <span className="sm:hidden">DTM</span>
          </Link>
          
          {/* Desktop Navigation */}
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
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-blue-400 hover:bg-slate-800">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-slate-900 border-slate-700">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 px-2 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">VV</AvatarFallback>
                  </Avatar>
                  <div className="text-sm text-slate-300">
                    Vivek Valsang
                  </div>
                </div>
                
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-2 py-3 text-base font-medium transition-colors hover:text-blue-400 hover:bg-slate-800 rounded-md ${
                      location.pathname === item.path ? 'text-blue-400 bg-slate-800' : 'text-slate-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Desktop User Info */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-sm text-slate-300">
              Vivek Valsang
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-600 text-white text-xs">VV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
