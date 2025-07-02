
import React, { useState } from 'react';
import { Users, Camera, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import PatientsApp from './apps/PatientsApp';
import LiveExamApp from './apps/LiveExamApp';
import ReportsApp from './apps/ReportsApp';

type TabType = 'patients' | 'live' | 'reports';

const AppShell = () => {
  const [activeTab, setActiveTab] = useState<TabType>('patients');

  const tabs = [
    {
      id: 'patients' as TabType,
      label: 'Pazienti',
      icon: Users,
      component: PatientsApp
    },
    {
      id: 'live' as TabType,
      label: 'Live',
      icon: Camera,
      component: LiveExamApp
    },
    {
      id: 'reports' as TabType,
      label: 'Referti',
      icon: FileText,
      component: ReportsApp
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PatientsApp;

  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <ActiveComponent />
      </div>

      {/* Bottom Tab Bar */}
      <div className="bg-white border-t-2 border-gray-200 px-4 py-3 flex justify-around items-center shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[80px] min-h-[64px] rounded-2xl transition-all duration-200",
                isActive 
                  ? "bg-blue-500 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon className="w-8 h-8 mb-1" />
              <span className="text-base font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppShell;
