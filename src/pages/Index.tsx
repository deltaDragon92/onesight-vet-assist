
import React, { useState } from 'react';
import { Camera, FileText, BookOpen, Clock, Play, Square, Save, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import Dashboard from '@/components/Dashboard';
import UltrasoundExam from '@/components/UltrasoundExam';
import ReportModule from '@/components/ReportModule';
import TrainingModule from '@/components/TrainingModule';
import PetOwnerPreview from '@/components/PetOwnerPreview';
import DigitalTwin from '@/components/DigitalTwin';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-blue-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">OneSight</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Assistente Ecografico Veterinario</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-slate-50 p-1 h-14">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                </div>
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="exam" 
                className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <Camera className="w-5 h-5" />
                <span className="hidden sm:inline">Esame Live</span>
              </TabsTrigger>
              <TabsTrigger 
                value="digitaltwin" 
                className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"></div>
                <span className="hidden sm:inline">Gemello Digitale</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Referti</span>
              </TabsTrigger>
              <TabsTrigger 
                value="training" 
                className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">Formazione</span>
              </TabsTrigger>
              <TabsTrigger 
                value="petowner" 
                className="flex items-center space-x-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                <Clock className="w-5 h-5" />
                <span className="hidden sm:inline">Pet Owner</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-0">
              <Dashboard />
            </TabsContent>
            <TabsContent value="exam" className="mt-0">
              <UltrasoundExam />
            </TabsContent>
            <TabsContent value="digitaltwin" className="mt-0">
              <DigitalTwin />
            </TabsContent>
            <TabsContent value="reports" className="mt-0">
              <ReportModule />
            </TabsContent>
            <TabsContent value="training" className="mt-0">
              <TrainingModule />
            </TabsContent>
            <TabsContent value="petowner" className="mt-0">
              <PetOwnerPreview />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
