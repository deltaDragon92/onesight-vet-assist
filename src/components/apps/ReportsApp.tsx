
import React, { useState } from 'react';
import { FileText, Plus, Calendar, Share, Edit3, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReportsAppProps {
  onReportCompleted?: () => void;
  onReportShared?: () => void;
}

const ReportsApp = ({ onReportCompleted, onReportShared }: ReportsAppProps) => {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Mock data referti
  const reports = [
    {
      id: 1,
      title: 'Ecocardiografia - Luna',
      patient: 'Luna',
      date: '2024-01-15',
      status: 'Completato',
      type: 'Cardiologica',
      preview: 'Esame ecocardiografico normale. Strutture cardiache nella norma...'
    },
    {
      id: 2,
      title: 'Ecografia Addominale - Rex',
      patient: 'Rex',
      date: '2024-01-14',
      status: 'Bozza',
      type: 'Addominale',
      preview: 'Strutture addominali visibili. Fegato di dimensioni normali...'
    },
    {
      id: 3,
      title: 'Controllo Tiroide - Micio',
      patient: 'Micio',
      date: '2024-01-13',
      status: 'Condiviso',
      type: 'Endocrinologica',
      preview: 'Tiroide di aspetto normale, dimensioni nella norma...'
    }
  ];

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
  };

  const handleCreateReport = () => {
    onReportCompleted?.();
  };

  const handleEditReport = (report: any) => {
    // Logic per modificare referto
    console.log('Modifica referto:', report.id);
  };

  const handleShareReport = (report: any) => {
    onReportShared?.();
    console.log('Condividi referto:', report.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completato':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Bozza':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Condiviso':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (selectedReport) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Header referto */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedReport(null)}
              className="text-slate-600 hover:text-slate-800"
            >
              ← Indietro
            </Button>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleEditReport(selectedReport)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Modifica
              </Button>
              <Button
                onClick={() => handleShareReport(selectedReport)}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 px-6"
              >
                <Share className="w-4 h-4 mr-2" />
                Condividi
              </Button>
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{selectedReport.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span>Paziente: {selectedReport.patient}</span>
              <span>•</span>
              <span>{selectedReport.date}</span>
              <Badge className={getStatusColor(selectedReport.status)}>
                {selectedReport.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content referto */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white">
            <div className="prose prose-slate max-w-none">
              <h2>Referto Ecografico</h2>
              <p><strong>Paziente:</strong> {selectedReport.patient}</p>
              <p><strong>Data esame:</strong> {selectedReport.date}</p>
              <p><strong>Tipo esame:</strong> {selectedReport.type}</p>
              
              <h3>Descrizione</h3>
              <p>{selectedReport.preview}</p>
              
              <h3>Reperti</h3>
              <ul>
                <li>Strutture anatomiche nella norma</li>
                <li>Nessuna alterazione patologica evidente</li>
                <li>Vascolarizzazione regolare</li>
              </ul>
              
              <h3>Conclusioni</h3>
              <p>Esame ecografico nei limiti della norma per età e specie. Si consiglia controllo di routine tra 6 mesi.</p>
              
              <h3>Raccomandazioni</h3>
              <p>Continuare terapia in corso. Controllo clinico tra 30 giorni.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4">
        <h1 className="text-2xl font-bold text-slate-800">Referti</h1>
        <p className="text-slate-600">Gestisci i referti dei tuoi pazienti</p>
      </div>

      {/* Lista referti */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {reports.map((report) => (
          <Card 
            key={report.id}
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.01] border-slate-200"
            onClick={() => handleViewReport(report)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-slate-800 truncate">
                      {report.title}
                    </h3>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-600 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{report.date}</span>
                    <span className="mx-2">•</span>
                    <span>{report.type}</span>
                  </div>
                  
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {report.preview}
                  </p>
                </div>

                <div className="ml-4 flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewReport(report);
                    }}
                    className="w-20"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Vedi
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {reports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Nessun referto trovato</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6">
        <Button
          onClick={handleCreateReport}
          size="lg"
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-8 h-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ReportsApp;
