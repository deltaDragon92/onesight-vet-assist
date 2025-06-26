import React from 'react';
import { Camera, FileText, BookOpen, Clock, Activity, Users, TrendingUp, AlertCircle, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  onStartNewVisit?: () => void;
}

const Dashboard = ({ onStartNewVisit }: DashboardProps) => {
  const quickStats = [
    { title: 'Esami Oggi', value: '12', icon: Camera, color: 'bg-blue-500' },
    { title: 'Referti Completati', value: '8', icon: FileText, color: 'bg-green-500' },
    { title: 'Pazienti in Attesa', value: '3', icon: Clock, color: 'bg-orange-500' },
    { title: 'Accuratezza AI', value: '94%', icon: TrendingUp, color: 'bg-teal-500' }
  ];

  const quickActions = [
    {
      title: 'Nuovo Esame Ecografico',
      description: 'Inizia un nuovo esame con guida AI',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      action: 'exam'
    },
    {
      title: 'Gestione Referti',
      description: 'Visualizza e modifica i referti',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      action: 'reports'
    },
    {
      title: 'Formazione Continua',
      description: 'Corsi di microlearning',
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      action: 'training'
    },
    {
      title: 'Storico Pazienti',
      description: 'Cerca e visualizza pazienti',
      icon: Users,
      color: 'from-teal-500 to-teal-600',
      action: 'patients'
    }
  ];

  const recentActivity = [
    { patient: 'Luna (Labrador)', type: 'Ecocardiografia', time: '10:30', status: 'completed' },
    { patient: 'Micio (Gatto Europeo)', type: 'Eco Addominale', time: '11:15', status: 'in-progress' },
    { patient: 'Rocky (Pastore Tedesco)', type: 'Eco Toracica', time: '12:00', status: 'scheduled' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Start New Visit Button */}
      <div className="flex justify-center">
        <Button 
          onClick={onStartNewVisit}
          className="h-16 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg"
        >
          <Play className="w-6 h-6 mr-3" />
          Avvia Nuova Visita
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer bg-white">
            <CardContent className="p-6">
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{action.description}</p>
              <Button 
                variant="outline" 
                className="w-full border-slate-200 hover:bg-slate-50 group-hover:border-blue-300 transition-colors"
              >
                Inizia
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Attività Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'in-progress' ? 'bg-blue-500' : 'bg-slate-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-slate-800">{activity.patient}</p>
                      <p className="text-sm text-slate-600">{activity.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{activity.time}</p>
                    <p className={`text-xs ${
                      activity.status === 'completed' ? 'text-green-600' :
                      activity.status === 'in-progress' ? 'text-blue-600' : 'text-slate-500'
                    }`}>
                      {activity.status === 'completed' ? 'Completato' :
                       activity.status === 'in-progress' ? 'In corso' : 'Programmato'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span>Avvisi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-800">Calibrazione Sonda</p>
              <p className="text-xs text-orange-600 mt-1">Scadenza: 3 giorni</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Nuovo Aggiornamento</p>
              <p className="text-xs text-blue-600 mt-1">OneSight v2.1 disponibile</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">Formazione Completata</p>
              <p className="text-xs text-green-600 mt-1">Modulo Ecocardiografia</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
