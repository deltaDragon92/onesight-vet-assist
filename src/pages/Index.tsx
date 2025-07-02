
import React, { useState } from 'react';
import { Camera, FileText, Clock, Menu, Lock, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Dashboard from '@/components/Dashboard';
import UltrasoundExam from '@/components/UltrasoundExam';
import ReportModule from '@/components/ReportModule';
import TrainingModule from '@/components/TrainingModule';
import PetOwnerPreview from '@/components/PetOwnerPreview';
import DigitalTwin from '@/components/DigitalTwin';
import AppSidebar from '@/components/AppSidebar';
import Marketplace from '@/components/Marketplace';
import Settings from '@/components/Settings';
import Support from '@/components/Support';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSection, setSidebarSection] = useState('');
  const [showTerminateDialog, setShowTerminateDialog] = useState(false);
  
  // Step progression state
  const [stepProgression, setStepProgression] = useState({
    dashboard: { completed: false, unlocked: true },
    digitaltwin: { completed: false, unlocked: false },
    exam: { completed: false, unlocked: false },
    reports: { completed: false, unlocked: false },
    petowner: { completed: false, unlocked: false }
  });

  // Visit state
  const [visitInProgress, setVisitInProgress] = useState(false);
  const [reportShared, setReportShared] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<string | null>(null);

  const steps = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <div className="w-5 h-5 bg-blue-500 rounded"></div>,
      description: 'Riepilogo e avvio visita'
    },
    {
      id: 'digitaltwin',
      label: 'Cartella clinica',
      icon: <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>,
      description: 'Scheda paziente e storico'
    },
    {
      id: 'exam',
      label: 'Esame Live',
      icon: <Camera className="w-5 h-5" />,
      description: 'Ecografia in tempo reale'
    },
    {
      id: 'reports',
      label: 'Referto',
      icon: <FileText className="w-5 h-5" />,
      description: 'Refertazione assistita'
    },
    {
      id: 'petowner',
      label: 'Anteprima referto',
      icon: <Clock className="w-5 h-5" />,
      description: 'Vista per proprietari'
    }
  ];

  const handleSidebarNavigate = (section: string) => {
    setSidebarSection(section);
    setActiveTab('sidebar');
  };

  const handleTabChange = (tabValue: string) => {
    if (stepProgression[tabValue]?.unlocked) {
      setActiveTab(tabValue);
    }
  };

  const completeStep = (stepId: string) => {
    setStepProgression(prev => {
      const newProgression = { ...prev };
      newProgression[stepId].completed = true;

      // Unlock next step
      const stepOrder = ['dashboard', 'digitaltwin', 'exam', 'reports', 'petowner'];
      const currentIndex = stepOrder.indexOf(stepId);
      if (currentIndex < stepOrder.length - 1) {
        const nextStep = stepOrder[currentIndex + 1];
        newProgression[nextStep].unlocked = true;
      }

      return newProgression;
    });
  };

  const resetVisit = () => {
    setStepProgression({
      dashboard: { completed: false, unlocked: true },
      digitaltwin: { completed: false, unlocked: false },
      exam: { completed: false, unlocked: false },
      reports: { completed: false, unlocked: false },
      petowner: { completed: false, unlocked: false }
    });
    setActiveTab('dashboard');
    setVisitInProgress(false);
    setReportShared(false);
    setCurrentPatient(null);
  };

  const handleTerminateVisit = () => {
    if (visitInProgress && !reportShared && (stepProgression.reports.completed || stepProgression.reports.unlocked)) {
      setShowTerminateDialog(true);
    } else {
      resetVisit();
    }
  };

  const handleConfirmTerminate = () => {
    resetVisit();
    setShowTerminateDialog(false);
  };

  const handleStartNewVisit = () => {
    completeStep('dashboard');
    setActiveTab('digitaltwin');
    setVisitInProgress(true);
  };

  const handlePatientSelected = (patientName?: string) => {
    if (patientName) {
      setCurrentPatient(patientName);
    }
    completeStep('digitaltwin');
    setActiveTab('exam');
  };

  const handleExamCompleted = () => {
    completeStep('exam');
    setActiveTab('reports');
  };

  const handleReportCompleted = () => {
    completeStep('reports');
    setActiveTab('petowner');
  };

  const handleReportShared = () => {
    setReportShared(true);
  };

  const renderSidebarContent = () => {
    switch (sidebarSection) {
      case 'marketplace':
        return <Marketplace />;
      case 'training':
        return <TrainingModule />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard onStartNewVisit={handleStartNewVisit} />;
    }
  };

  const getStepStatus = (stepId: string) => {
    const step = stepProgression[stepId];
    if (step.completed) return 'completed';
    if (step.unlocked) return 'active';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <AppSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleSidebarNavigate}
        currentSection={sidebarSection}
      />
      
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-blue-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="h-8 w-8"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">OneSight</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Assistente Ecografico Veterinario</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {visitInProgress && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTerminateVisit}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Termina Visita
                </Button>
              )}
              {currentPatient && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Paziente: {currentPatient}
                </Badge>
              )}
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Dr. Mario Rossi</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Clinica Veterinaria Milano</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-semibold">MR</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Step Navigation */}
     

      {/* Terminate Visit Confirmation Dialog */}
      <Dialog open={showTerminateDialog} onOpenChange={setShowTerminateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Terminare la Visita?</span>
            </DialogTitle>
            <DialogDescription>
              Il referto non è stato condiviso con il proprietario del paziente. 
              Terminando ora, il referto verrà salvato come bozza.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowTerminateDialog(false)}
            >
              Annulla
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmTerminate}
            >
              Termina Comunque
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
