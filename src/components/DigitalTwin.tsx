import React, { useState } from 'react';
import { Heart, Activity, Thermometer, Scale, Eye, Stethoscope, Calendar, FileText, Download, Plus, RefreshCw, User, Wifi, WifiOff, AlertTriangle, TrendingUp, Settings, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DigitalTwinProps {
  onPatientSelected?: (patientName?: string) => void;
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

  const wearableDevices = [
    {
      id: 1,
      name: "ECG FAST-Band",
      type: "ECG Monitor",
      status: "connected", // connected, warning, disconnected
      currentReading: "HR: 92 bpm",
      lastUpdate: "2 min fa",
      batteryLevel: 85,
      icon: Heart
    },
    {
      id: 2,
      name: "Patch Temp Pro",
      type: "Temperature Sensor",
      status: "connected",
      currentReading: "38.2°C",
      lastUpdate: "1 min fa",
      batteryLevel: 67,
      icon: Thermometer
    },
    {
      id: 3,
      name: "Activity Tracker",
      type: "Movement Monitor",
      status: "warning",
      currentReading: "Bassa attività",
      lastUpdate: "15 min fa",
      batteryLevel: 23,
      icon: Activity
    }
  ];

  const aiInsights = [
    {
      id: 1,
      title: "Possibile ipertrofia atriale sinistra",
      description: "Rilevata in 2 esami su 3 negli ultimi 2 mesi",
      severity: "warning", // normal, warning, critical
      confidence: 78,
      type: "Cardiologia"
    },
    {
      id: 2,
      title: "Tendenza al calo della frazione di eiezione",
      description: "Riduzione del 12% rispetto ai valori baseline",
      severity: "critical",
      confidence: 85,
      type: "Cardiologia"
    },
    {
      id: 3,
      title: "Parametri epatici stabili",
      description: "Nessun pattern critico rilevato negli ultimi 2 mesi",
      severity: "normal",
      confidence: 92,
      type: "Addome"
    }
  ];

  const visitHistory = [
    {
      id: 1,
      date: "15 Nov 2024",
      time: "14:30",
      district: "Torace",
      veterinarian: "Dr. Mario Rossi",
      status: "completed", // draft, completed, shared
      reportShared: true,
      moduleUsed: "Cuore Pro",
      type: "Ecocardiografia"
    },
    {
      id: 2,
      date: "02 Nov 2024",
      time: "10:15",
      district: "Addome",
      veterinarian: "Dr. Laura Bianchi",
      status: "shared",
      reportShared: true,
      moduleUsed: "Standard",
      type: "Ecografia Addominale"
    },
    {
      id: 3,
      date: "18 Ott 2024",
      time: "16:45",
      district: "Torace",
      veterinarian: "Dr. Mario Rossi",
      status: "draft",
      reportShared: false,
      moduleUsed: "Standard",
      type: "Screening Completo"
    }
  ];

  const handleSelectPatient = () => {
    setSelectedPatient(patientData.name);
    onPatientSelected?.(patientData.name);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connesso';
      case 'warning':
        return 'Non rilevato';
      case 'disconnected':
        return 'Disconnesso';
      default:
        return 'Sconosciuto';
    }
  };

  const getInsightBadgeColor = (severity: string) => {
    switch (severity) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVisitStatusIcon = (status: string, shared: boolean) => {
    if (status === 'draft') return '📝';
    if (status === 'completed' && !shared) return '✅';
    if (shared) return '📤';
    return '📋';
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
              disabled={selectedPatient === patientData.name}
            >
              <User className="w-4 h-4 mr-2" />
              {selectedPatient === patientData.name ? 'Paziente Selezionato' : 'Prosegui'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Digital Twin Visualization */}
        <Card className="xl:col-span-2 bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-200">
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

        {/* Right Column - AI Insights and Actions */}
        <div className="xl:col-span-2 space-y-6">
          {/* AI Insights */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-800">
                <TrendingUp className="w-5 h-5" />
                <span>Insight Intelligente</span>
              </CardTitle>
              <p className="text-sm text-purple-600">Suggerimenti generati dall'analisi AI dei dati clinici e storici</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="bg-white rounded-lg p-4 border border-purple-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getInsightBadgeColor(insight.severity)}>
                          {insight.type}
                        </Badge>
                        <span className="text-xs text-slate-500">{insight.confidence}% confidenza</span>
                      </div>
                      <h4 className="font-medium text-slate-800 text-sm">{insight.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{insight.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Approfondisci
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

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
        </div>
      </div>

      {/* Bottom Section - Wearables and Visit History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wearables */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Dispositivi Wearable</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {wearableDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    device.status === 'connected' ? 'bg-green-100 text-green-600' :
                    device.status === 'warning' ? 'bg-orange-100 text-orange-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <device.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-slate-800 text-sm">{device.name}</p>
                      {getStatusIcon(device.status)}
                    </div>
                    <p className="text-xs text-slate-600">{device.type}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs font-medium text-slate-700">{device.currentReading}</p>
                      <span className="text-xs text-slate-500">• {device.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{getStatusText(device.status)}</p>
                    <p className="text-xs text-slate-400">Batteria: {device.batteryLevel}%</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Settings className="w-3 h-3 mr-1" />
                    Configura
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Visit History */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Cronologia Visite</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {visitHistory.map((visit) => (
                <div key={visit.id} className="border-l-4 border-blue-200 pl-4 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{getVisitStatusIcon(visit.status, visit.reportShared)}</span>
                        <Badge variant="outline" className="text-xs">
                          {visit.district}
                        </Badge>
                        <span className="text-xs text-slate-500">{visit.date} • {visit.time}</span>
                        {visit.moduleUsed !== 'Standard' && (
                          <Badge className="bg-purple-100 text-purple-700 text-xs">
                            {visit.moduleUsed}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-slate-800 text-sm">{visit.type}</h4>
                      <p className="text-xs text-slate-600 mt-1">Dr. {visit.veterinarian}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            visit.status === 'completed' || visit.status === 'shared' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-orange-50 text-orange-700 border-orange-200'
                          }`}
                        >
                          {visit.status === 'draft' ? 'Bozza' : 
                           visit.status === 'completed' ? 'Completato' : 'Condiviso'}
                        </Badge>
                        {visit.reportShared && (
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            📤 Condiviso con Pet Owner
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Apri Referto
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalTwin;
