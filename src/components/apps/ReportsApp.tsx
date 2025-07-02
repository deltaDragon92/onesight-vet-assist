
import React, { useState } from 'react';
import { Plus, Eye, Edit, Share, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReportsApp = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const mockReports = [
    {
      id: 1,
      title: 'Ecocardiografia - Luna',
      patient: 'Luna (Labrador)',
      date: '15 Gen 2024',
      type: 'Cardiologia',
      status: 'Completato'
    },
    {
      id: 2,
      title: 'Eco Addominale - Micio',
      patient: 'Micio (Gatto Europeo)',
      date: '14 Gen 2024',
      type: 'Addominale',
      status: 'Bozza'
    },
    {
      id: 3,
      title: 'Eco Toracica - Rocky',
      patient: 'Rocky (Pastore Tedesco)',
      date: '13 Gen 2024',
      type: 'Toracica',
      status: 'Inviato'
    }
  ];

  if (selectedReport) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center shadow-sm">
          <Button
            variant="ghost"
            onClick={() => setSelectedReport(null)}
            className="mr-4 p-3 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Referto</h1>
        </div>

        {/* Report Preview */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Report Header */}
            <div className="bg-gray-50 rounded-3xl p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedReport.title}</h2>
                <span className={`px-4 py-2 rounded-full text-lg font-medium ${
                  selectedReport.status === 'Completato' ? 'bg-green-100 text-green-800' :
                  selectedReport.status === 'Bozza' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6 text-lg">
                <div>
                  <span className="text-gray-600">Paziente:</span>
                  <span className="ml-2 font-medium">{selectedReport.patient}</span>
                </div>
                <div>
                  <span className="text-gray-600">Data:</span>
                  <span className="ml-2 font-medium">{selectedReport.date}</span>
                </div>
              </div>
            </div>

            {/* Report Content */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Referto Ecografico</h3>
              <div className="space-y-4 text-lg text-gray-700">
                <p><strong>Esame richiesto:</strong> Ecocardiografia completa</p>
                <p><strong>Tecnica:</strong> Scansione transtorcica con sonda 2-5 MHz</p>
                <p><strong>Reperti:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Ventricolo sinistro: dimensioni nella norma</li>
                  <li>Funzione sistolica: conservata</li>
                  <li>Valvole cardiache: competenti</li>
                  <li>Atri: dimensioni regolari</li>
                </ul>
                <p><strong>Conclusioni:</strong> Quadro ecocardiografico nella norma.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-16 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-2xl">
                <Edit className="w-6 h-6 mr-3" />
                Modifica
              </Button>
              <Button className="h-16 text-xl bg-green-500 hover:bg-green-600 text-white rounded-2xl">
                <Share className="w-6 h-6 mr-3" />
                Condividi
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Referti</h1>
      </div>

      {/* Reports List */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {mockReports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="w-full bg-white border-2 border-gray-200 rounded-3xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{report.title}</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  report.status === 'Completato' ? 'bg-green-100 text-green-800' :
                  report.status === 'Bozza' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {report.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-lg text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {report.date}
                </div>
                <div>{report.patient}</div>
                <div className="text-right">{report.type}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-24 right-6">
        <Button className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg">
          <Plus className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default ReportsApp;
