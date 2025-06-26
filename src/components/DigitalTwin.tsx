import React, { useState } from 'react';
import { Heart, Activity, Thermometer, Scale, Eye, Stethoscope, Calendar, FileText, Download, Plus, RefreshCw, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DigitalTwinProps {
  onPatientSelected?: () => void;
}

const DigitalTwin = ({ onPatientSelected }: DigitalTwinProps) => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const patientData = {
    name: "Luna",
    breed: "Labrador Retriever",
    age: "5 anni",
    weight: "28 kg",
    gender: "Femmina",
    owner: "Famiglia Bianchi",
    microchip: "380260123456789",
    lastVisit: "15 Nov 2024"
  };

  const healthStatus = {
    status: "Stabile",
    level: "good", // good, warning, critical
    lastUpdate: "Oggi, 14:30"
  };

  const biometrics = [
    { label: "Freq. Cardiaca", value: "120 bpm", status: "normal", icon: Heart },
    { label: "Respirazione", value: "24 rpm", status: "normal", icon: Activity },
    { label: "Temperatura", value: "38.5°C", status: "normal", icon: Thermometer },
    { label: "Peso", value: "28.2 kg", status: "warning", icon: Scale }
  ];

  const anatomicalPoints = [
    { id: 1, x: 45, y: 25, organ: "Cuore", status: "normal" },
    { id: 2, x: 55, y: 35, organ: "Polmoni", status: "normal" },
    { id: 3, x: 40, y: 50, organ: "Fegato", status: "warning" },
    { id: 4, x: 35, y: 60, organ: "Reni", status: "normal" },
    { id: 5, x: 50, y: 75, organ: "Vescica", status: "normal" }
  ];

  const recentReports = [
    {
      id: 1,
      date: "15 Nov 2024",
      title: "Ecocardiografia di Controllo",
      description: "Valutazione funzione cardiaca post-terapia",
      status: "completed",
      type: "Cardiologia"
    },
    {
      id: 2,
      date: "02 Nov 2024",
      title: "Ecografia Addominale",
      description: "Controllo epatico - lieve epatomegalia",
      status: "completed",
      type: "Addome"
    },
    {
      id: 3,
      date: "18 Ott 2024",
      title: "Screening Completo",
      description: "Check-up annuale - parametri nella norma",
      status: "completed",
      type: "Generale"
    }
  ];

  const handleSelectPatient = () => {
    setSelectedPatient(patientData.name);
    onPatientSelected?.();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Patient Selection */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{patientData.name}</h2>
                <p className="text-slate-600">{patientData.breed} • {patientData.age} • {patientData.weight}</p>
                <p className="text-sm text-slate-500">Proprietario: {patientData.owner}</p>
              </div>
            </div>
            <Button 
              onClick={handleSelectPatient}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Seleziona Paziente
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital Twin Visualization */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-cyan-800">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <span>Gemello Digitale</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Health Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Stato di Salute</h3>
                <Badge 
                  className={`${
                    healthStatus.level === 'good' ? 'bg-green-100 text-green-800' :
                    healthStatus.level === 'warning' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {healthStatus.status}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">Ultimo aggiornamento: {healthStatus.lastUpdate}</p>
            </div>

            <Separator className="my-6" />

            {/* Biometric Data */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Parametri Vitali</h3>
              <div className="grid grid-cols-2 gap-4">
                {biometrics.map((metric, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      metric.status === 'normal' ? 'bg-green-100 text-green-600' :
                      metric.status === 'warning' ? 'bg-orange-100 text-orange-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <metric.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">{metric.label}</p>
                      <p className="font-semibold text-slate-800">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Anatomical Model */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Modello Anatomico</h3>
              <div className="relative bg-white rounded-lg p-6 border">
                {/* Simplified dog silhouette */}
                <div className="relative w-full h-64 bg-gradient-to-b from-slate-100 to-slate-200 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    {/* Dog silhouette */}
                    <path
                      d="M40 80 Q35 70 45 65 Q55 60 70 65 Q85 60 100 65 Q115 60 130 65 Q140 70 135 80 Q140 90 130 95 Q115 100 100 95 Q85 100 70 95 Q55 100 45 95 Q35 90 40 80"
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    {/* Head */}
                    <circle cx="45" cy="40" r="15" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                  </svg>

                  {/* Anatomical points */}
                  {anatomicalPoints.map((point) => (
                    <div
                      key={point.id}
                      className={`absolute w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-125 ${
                        point.status === 'normal' ? 'bg-green-400 border-green-500' :
                        point.status === 'warning' ? 'bg-orange-400 border-orange-500' :
                        'bg-red-400 border-red-500'
                      }`}
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      title={point.organ}
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports & Actions */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Aggiorna Dati Clinici
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Nuovo Referto
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Esporta Scheda
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Referti Recenti</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border-l-4 border-blue-200 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          <span className="text-xs text-slate-500">{report.date}</span>
                        </div>
                        <h4 className="font-medium text-slate-800 text-sm">{report.title}</h4>
                        <p className="text-xs text-slate-600 mt-1">{report.description}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Visualizza
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
