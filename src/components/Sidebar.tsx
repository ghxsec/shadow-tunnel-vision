
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, Settings, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: Shield, path: '/' },
    { name: 'Servers', icon: Globe, path: '/servers' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        'h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <Network className="h-8 w-8 text-primary" />
          {!collapsed && <span className="text-xl font-bold text-sidebar-foreground">SecureLink</span>}
        </div>
        <button 
          className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      <div className="py-4">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-md mx-2",
                      isActive && "bg-sidebar-accent text-primary",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    {!collapsed && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-xs text-primary font-medium">SL</span>
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm text-sidebar-foreground font-medium">Pro Plan</p>
                <p className="text-xs text-muted-foreground">Active until May 2026</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
