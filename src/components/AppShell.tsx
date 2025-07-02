
import React, { useState } from 'react';
import { Users, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PatientsApp from './apps/PatientsApp';
import LiveExamApp from './apps/LiveExamApp';
import ReportsApp from './apps/ReportsApp';

interface AppShellProps {
  onStartNewVisit?: () => void;
  onPatientSelected?: (patientName?: string) => void;
  onExamCompleted?: () => void;
  onReportCompleted?: () => void;
  onReportShared?: () => void;
}

const AppShell = ({ 
  onStartNewVisit, 
  onPatientSelected, 
  onExamCompleted, 
  onReportCompleted, 
  onReportShared 
}: AppShellProps) => {
  const [activeTab, setActiveTab] = useState('patients');

  const tabs = [
    { id: 'patients', label: 'Pazienti', icon: Users },
    { id: 'live', label: 'Live', icon: Camera },
    { id: 'reports', label: 'Referti', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientsApp onPatientSelected={onPatientSelected} />;
      case 'live':
        return <LiveExamApp onExamCompleted={onExamCompleted} />;
      case 'reports':
        return <ReportsApp onReportCompleted={onReportCompleted} onReportShared={onReportShared} />;
      default:
        return <PatientsApp onPatientSelected={onPatientSelected} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Top Header - più sottile */}
      <header className="bg-white shadow-sm border-b border-blue-100 h-12">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">OneSight</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Dr. Mario Rossi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 overflow-hidden">
        {renderContent()}
      </main>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
        <div className="flex justify-around items-center h-20 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 h-16 w-20 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  {tab.label}
                </span>
                {/* Underline indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppShell;
