
import React from 'react';
import { Heart, Calendar, FileText, Download, Share2, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const PetOwnerPreview = () => {
  const visitSummary = {
    date: new Date().toLocaleDateString('it-IT'),
    time: '14:30',
    duration: '45 min',
    type: 'Controllo ecografico',
    status: 'completed'
  };

  const findings = [
    { organ: 'Cuore', status: 'Normale', description: 'Funzione cardiaca regolare' },
    { organ: 'Fegato', status: 'Attenzione', description: 'Lieve aumento di dimensioni, da monitorare' },
    { organ: 'Reni', status: 'Normale', description: 'Struttura e funzione nella norma' },
    { organ: 'Vescica', status: 'Normale', description: 'Nessuna anomalia rilevata' }
  ];

  const nextSteps = [
    'Controllo ecografico tra 3 mesi',
    'Mantenere dieta bilanciata',
    'Monitorare peso corporeo',
    'Contattaci per qualsiasi dubbio'
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header - Pet Owner View */}
      <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Visita di Luna</h2>
                <p className="text-slate-600">Famiglia Bianchi • {visitSummary.date}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Visita completata
                  </Badge>
                  <Badge variant="outline" className="text-blue-700">
                    {visitSummary.type}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>Durata: {visitSummary.duration}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-1" />
                  Condividi
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Scarica
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visit Summary */}
        <Card className="lg:col-span-2 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Riepilogo della Visita</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* What we examined */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Cosa abbiamo controllato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {findings.map((finding, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-slate-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-800">{finding.organ}</span>
                        <Badge 
                          variant="outline"
                          className={`${
                            finding.status === 'Normale' ? 'bg-green-50 text-green-700 border-green-200' :
                            finding.status === 'Attenzione' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {finding.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{finding.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Overall health */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Stato di Salute Generale</h3>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800">Luna sta bene!</h4>
                      <p className="text-sm text-green-700">
                        L'esame ecografico ha mostrato che Luna è in buone condizioni di salute. 
                        È stata rilevata una lieve variazione al fegato che richiede solo un controllo periodico.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Next steps */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Prossimi Passi</h3>
                <div className="space-y-3">
                  {nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                      </div>
                      <p className="text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Actions */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Hai Domande?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-semibold text-lg">DR</span>
                </div>
                <h4 className="font-semibold text-slate-800">Dr. Mario Rossi</h4>
                <p className="text-sm text-slate-600">Veterinario</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  📞 Chiama lo Studio
                </Button>
                <Button className="w-full" variant="outline">
                  📧 Invia Email
                </Button>
                <Button className="w-full" variant="outline">
                  💬 Chat WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Documenti</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Referto Completo
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Immagini Ecografiche
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Piano di Controllo
              </Button>
            </CardContent>
          </Card>

          {/* Appointment */}
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-800">Prossimo Controllo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800 mb-2">3 Mesi</div>
                <p className="text-sm text-blue-700 mb-4">
                  Ti ricorderemo quando sarà il momento per il prossimo controllo
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Prenota Ora
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PetOwnerPreview;
