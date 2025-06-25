
import React from 'react';
import { Heart, Activity, Thermometer, Weight, Calendar, FileText, Download, Plus, RefreshCw, Eye, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DigitalTwin = () => {
  const patientData = {
    name: 'Max',
    breed: 'Golden Retriever',
    age: '6 anni',
    weight: '32 kg',
    owner: 'Famiglia Rossi',
    registrationDate: '15 Gennaio 2020',
    lastVisit: '10 Giugno 2025',
    microchip: 'IT01234567890123',
    healthStatus: 'Stabile'
  };

  const biometricData = [
    { label: 'Frequenza Cardiaca', value: '110 bpm', status: 'normal', icon: Heart },
    { label: 'Pressione Arteriosa', value: '120/80 mmHg', status: 'normal', icon: Activity },
    { label: 'Temperatura', value: '38.5°C', status: 'normal', icon: Thermometer },
    { label: 'Peso', value: '32.1 kg', status: 'attention', icon: Weight },
    { label: 'Freq. Respiratoria', value: '24 rpm', status: 'normal', icon: Activity }
  ];

  const previousReports = [
    {
      id: 1,
      date: '10 Giugno 2025',
      title: 'Controllo Routine',
      description: 'Visita generale di controllo. Tutti i parametri nella norma.',
      type: 'Controllo',
      status: 'completed'
    },
    {
      id: 2,
      date: '15 Marzo 2025',
      title: 'Ecografia Addominale',
      description: 'Ecografia per controllo fegato. Rilevata lieve alterazione strutturale.',
      type: 'Diagnostica',
      status: 'completed'
    },
    {
      id: 3,
      date: '20 Dicembre 2024',
      title: 'Vaccinazione Annuale',
      description: 'Somministrazione vaccini annuali. Reazioni avverse assenti.',
      type: 'Prevenzione',
      status: 'completed'
    },
    {
      id: 4,
      date: '05 Settembre 2024',
      title: 'Analisi del Sangue',
      description: 'Esami ematochimici di routine. Tutti i valori nella norma.',
      type: 'Laboratorio',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'attention':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'Controllo':
        return 'bg-blue-100 text-blue-800';
      case 'Diagnostica':
        return 'bg-purple-100 text-purple-800';
      case 'Prevenzione':
        return 'bg-green-100 text-green-800';
      case 'Laboratorio':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Gemello Digitale del Paziente
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Profilo completo e monitoraggio continuo di {patientData.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuovo Referto
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Aggiorna Dati
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Esporta Scheda
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Card */}
          <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-t-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 border-4 border-white/20">
                  <AvatarImage src="/placeholder.svg" alt={patientData.name} />
                  <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                    {patientData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold">{patientData.name}</CardTitle>
                  <p className="text-cyan-100">{patientData.breed}</p>
                  <p className="text-cyan-100 text-sm">{patientData.age} • {patientData.weight}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Proprietario</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{patientData.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Microchip</p>
                  <p className="font-mono text-sm text-slate-800 dark:text-slate-200">{patientData.microchip}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Registrato dal</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{patientData.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Ultima visita</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{patientData.lastVisit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Status */}
          <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 dark:text-slate-100 flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                Stato di Salute
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mb-4">
                  {patientData.healthStatus}
                </Badge>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Ultimo aggiornamento: {patientData.lastVisit}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Digital Twin Visualization */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-slate-800 shadow-lg border-0 h-full">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 dark:text-slate-100">
                Modello Anatomico Digitale
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              {/* Simplified Dog Silhouette with Active Points */}
              <div className="relative">
                <svg width="200" height="240" viewBox="0 0 200 240" className="text-slate-400 dark:text-slate-500">
                  {/* Dog silhouette */}
                  <path
                    d="M100 40 C120 35, 140 45, 145 65 C150 45, 160 40, 170 50 C175 60, 170 70, 165 75 L160 100 C155 120, 150 140, 145 160 L140 180 L135 200 L125 210 L115 215 L105 210 L95 215 L85 210 L75 200 L70 180 L65 160 C60 140, 55 120, 50 100 L45 75 C40 70, 35 60, 40 50 C50 40, 60 45, 65 65 C70 45, 90 35, 100 40 Z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  
                  {/* Active points on organs */}
                  {/* Heart */}
                  <circle cx="85" cy="90" r="6" className="fill-red-400 animate-pulse cursor-pointer hover:fill-red-500" />
                  <text x="95" y="95" className="text-xs fill-slate-600 dark:fill-slate-300">Cuore</text>
                  
                  {/* Liver */}
                  <circle cx="110" cy="110" r="6" className="fill-yellow-400 animate-pulse cursor-pointer hover:fill-yellow-500" />
                  <text x="120" y="115" className="text-xs fill-slate-600 dark:fill-slate-300">Fegato</text>
                  
                  {/* Kidneys */}
                  <circle cx="90" cy="130" r="5" className="fill-blue-400 animate-pulse cursor-pointer hover:fill-blue-500" />
                  <circle cx="120" cy="130" r="5" className="fill-blue-400 animate-pulse cursor-pointer hover:fill-blue-500" />
                  <text x="85" y="145" className="text-xs fill-slate-600 dark:fill-slate-300">Reni</text>
                  
                  {/* Lungs */}
                  <circle cx="75" cy="75" r="5" className="fill-cyan-400 animate-pulse cursor-pointer hover:fill-cyan-500" />
                  <circle cx="125" cy="75" r="5" className="fill-cyan-400 animate-pulse cursor-pointer hover:fill-cyan-500" />
                  <text x="90" y="65" className="text-xs fill-slate-600 dark:fill-slate-300">Polmoni</text>
                </svg>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Modello anatomico interattivo
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  I punti colorati indicano gli organi monitorati
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biometric Data */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800 dark:text-slate-100 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Dati Biometrici
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {biometricData.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {metric.label}
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {metric.value}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status === 'normal' ? 'Normale' : 
                       metric.status === 'attention' ? 'Attenzione' : 'Critico'}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Previous Reports */}
      <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800 dark:text-slate-100 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Storico Referti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {previousReports.map((report) => (
              <div key={report.id} className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{report.date}</span>
                  </div>
                  <Badge className={getReportTypeColor(report.type)} variant="outline">
                    {report.type}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {report.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {report.description}
                </p>
                
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizza
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalTwin;
