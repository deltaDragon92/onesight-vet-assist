
import React from 'react';
import { 
  Settings, 
  ShoppingCart, 
  GraduationCap, 
  FileText, 
  LogOut,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  currentSection: string;
}

const AppSidebar = ({ isOpen, onClose, onNavigate, currentSection }: AppSidebarProps) => {
  const menuItems = [
    {
      id: 'settings',
      label: 'Impostazioni',
      icon: Settings,
      description: 'Configurazione e preferenze'
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      icon: ShoppingCart,
      description: 'Moduli e funzionalità aggiuntive'
    },
    {
      id: 'training',
      label: 'Formazione',
      icon: GraduationCap,
      description: 'Corsi e microlearning'
    },
    {
      id: 'support',
      label: 'Manuali e Supporto',
      icon: FileText,
      description: 'Documentazione e assistenza'
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white dark:bg-slate-800 shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        border-r border-slate-200 dark:border-slate-700
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">OneSight</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Menu principale</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                w-full flex items-center space-x-3 p-3 rounded-lg text-left
                transition-colors duration-200
                ${currentSection === item.id 
                  ? 'bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-800' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${currentSection === item.id
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                }
              `}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  currentSection === item.id 
                    ? 'text-cyan-800 dark:text-cyan-200' 
                    : 'text-slate-800 dark:text-slate-100'
                }`}>
                  {item.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </button>
          ))}
        </div>

        <Separator className="mx-4" />

        {/* User Section */}
        <div className="p-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm">MR</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Dr. Mario Rossi</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Clinica Milano</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-500">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
