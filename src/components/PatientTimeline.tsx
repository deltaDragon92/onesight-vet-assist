
import React from 'react';
import { Clock, FileText, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PatientTimelineProps {
  patientName: string;
}

const PatientTimeline = ({ patientName }: PatientTimelineProps) => {
  const examHistory = [
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      type: 'Ecocardiografia',
      veterinarian: 'Dr. Rossi',
      status: 'completed',
      district: 'Torace',
      findings: 'Cuore nella norma'
    },
    {
      id: '2',
      date: '2023-12-10',
      time: '10:15',
      type: 'Eco Addominale',
      veterinarian: 'Dr. Bianchi', 
      status: 'completed',
      district: 'Addome',
      findings: 'Lieve epatomegalia'
    },
    {
      id: '3',
      date: '2023-11-22',
      time: '16:45',
      type: 'Screening Completo',
      veterinarian: 'Dr. Rossi',
      status: 'shared',
      district: 'Torace + Addome',
      findings: 'Nella norma'
    },
    {
      id: '4',
      date: '2023-09-15',
      time: '11:20',
      type: 'Follow-up',
      veterinarian: 'Dr. Verdi',
      status: 'draft',
      district: 'Cuore',
      findings: 'Da completare'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-50 text-green-700 border-green-200', text: 'Completato' },
      shared: { color: 'bg-blue-50 text-blue-700 border-blue-200', text: 'Condiviso' },
      draft: { color: 'bg-orange-50 text-orange-700 border-orange-200', text: 'Bozza' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'shared':
        return '📤';
      case 'draft':
        return '📝';
      default:
        return '📋';
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>Cronologia - {patientName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        <div className="space-y-4">
          {examHistory.map((exam, index) => (
            <div key={exam.id} className="relative">
              {/* Timeline line */}
              {index < examHistory.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-200"></div>
              )}
              
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-slate-200">
                  <span className="text-lg">{getStatusIcon(exam.status)}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-800 text-sm">{exam.type}</h4>
                      <p className="text-xs text-slate-600">{exam.district}</p>
                    </div>
                    {getStatusBadge(exam.status)}
                  </div>
                  
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(exam.date).toLocaleDateString('it-IT')} alle {exam.time}</span>
                    </div>
                    <p className="text-slate-700">{exam.veterinarian}</p>
                    <p className="text-slate-500 italic">{exam.findings}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Visualizza
                    </Button>
                    {exam.status === 'completed' || exam.status === 'shared' ? (
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Referto
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-700">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Totale esami: {examHistory.length}</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Ultimo esame: {new Date(examHistory[0].date).toLocaleDateString('it-IT')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientTimeline;
