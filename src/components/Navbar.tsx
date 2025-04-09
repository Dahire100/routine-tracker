
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Home, 
  BarChart3, 
  Moon,
  SmilePlus,
  CircleUser
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Activity, label: 'Habits', path: '/habits' },
    { icon: Moon, label: 'Meditate', path: '/meditation' },
    { icon: SmilePlus, label: 'Mood', path: '/mood' },
    { icon: BarChart3, label: 'Progress', path: '/progress' },
    { icon: CircleUser, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border backdrop-blur-lg z-10">
      <div className="max-w-5xl mx-auto">
        <ul className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={index} className="relative py-2">
                <Link 
                  to={item.path}
                  className="flex flex-col items-center px-4 py-2"
                >
                  <div className={`
                    relative p-2 rounded-full transition-all
                    ${active ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground'}
                  `}>
                    <Icon size={20} />
                    {active && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className={`text-xs mt-1 transition-colors ${
                    active ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
