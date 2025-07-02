import React, { useState } from 'react';
import { Camera, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PatientSelection from './PatientSelection';

interface DashboardProps {
  onStartNewVisit?: (patientName?: string) => void;
}

const Dashboard = ({ onStartNewVisit }: DashboardProps) => {
  const [showPatientSelection, setShowPatientSelection] = useState(false);

  const quickActions = [
    {
      title: 'Nuovo Esame Ecografico',
      description: 'Inizia un nuovo esame con guida AI',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      action: 'exam',
    },
  ];

  const recentActivity = [
   /* { patient: 'Luna (Labrador)', type: 'Ecocardiografia', time: '10:30', status: 'completed' },
    { patient: 'Micio (Gatto Europeo)', type: 'Eco Addominale', time: '11:15', status: 'in-progress' },
    { patient: 'Rocky (Pastore Tedesco)', type: 'Eco Toracica', time: '12:00', status: 'scheduled' },*/
  ];

  const upcomingAppointments = [
    { patient: 'Bella (Bulldog)', date: '2025-07-03', time: '09:00' },
    { patient: 'Leo (Gatto Ragdoll)', date: '2025-07-03', time: '11:00' },
    { patient: 'Max (Beagle)', date: '2025-07-03', time: '14:00' },
  ];

  const handleStartNewVisit = () => setShowPatientSelection(true);
  const handlePatientSelected = (patient?: any) => {
    const patientName = patient ? patient.name : undefined;
    onStartNewVisit?.(patientName);
    setShowPatientSelection(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:h-70">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
          >
            <CardContent className="p-6">
              <div
                className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
              >
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{action.description}</p>
              <Button
                variant="outline"
                onClick={handleStartNewVisit}
                className="w-full border-slate-200 hover:bg-slate-50 group-hover:border-blue-300 transition-colors"
              >
                Inizia
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-white shadow-sm md:col-span-3 lg:col-span-3 md:h-70">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Attività Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto h-full">
            <div className="space-y-3 md:space-y-2">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        activity.status === 'completed'
                          ? 'bg-green-500'
                          : activity.status === 'in-progress'
                          ? 'bg-blue-500'
                          : 'bg-slate-400'
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{activity.patient}</p>
                      <p className="text-xs text-slate-600">{activity.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-slate-800">
                      {activity.time}
                    </p>
                    <p
                      className={`text-xxs ${
                        activity.status === 'completed'
                          ? 'text-green-600'
                          : activity.status === 'in-progress'
                          ? 'text-blue-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {activity.status === 'completed'
                        ? 'Completato'
                        : activity.status === 'in-progress'
                        ? 'In corso'
                        : 'Programmato'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Selection Dialog */}
      <PatientSelection
        isOpen={showPatientSelection}
        onClose={() => setShowPatientSelection(false)}
        onPatientSelected={handlePatientSelected}
      />
    </div>
  );
};

export default Dashboard;
