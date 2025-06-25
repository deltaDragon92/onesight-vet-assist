
import React from 'react';
import { Heart, Download, Share, Calendar, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PetOwnerPreview = () => {
  const reportData = {
    petName: 'Luna',
    breed: 'Labrador Retriever',
    age: '5 anni',
    weight: '28 kg',
    owner: 'Famiglia Bianchi',
    examDate: '25 Giugno 2025',
    examType: 'Ecografia Addominale',
    veterinarian: 'Dr. Mario Rossi',
    clinic: 'Clinica Veterinaria Milano'
  };

  const findings = [
    {
      organ: 'Cuore',
      status: 'normale',
      description: 'Il cuore di Luna presenta dimensioni e funzionalità normali per la sua età e taglia.',
      severity: 'good'
    },
    {
      organ: 'Fegato',
      status: 'lieve alterazione',
      description: 'Rilevata una leggera alterazione della struttura epatica. Si consiglia controllo tra 3 mesi.',
      severity: 'attention'
    },
    {
      organ: 'Reni',
      status: 'normale',
      description: 'I reni mostrano dimensioni e struttura nella norma.',
      severity: 'good'
    },
    {
      organ: 'Vescica',
      status: 'normale',
      description: 'La vescica appare normale, senza segni di infiammazione o calcoli.',
      severity: 'good'
    }
  ];

  const recommendations = [
    'Continuare con la dieta attuale e l\'esercizio fisico regolare',
    'Controllo ecografico di follow-up tra 3 mesi per monitorare il fegato',
    'Mantenere le vaccinazioni aggiornate',
    'In caso di sintomi inusuali, contattare immediatamente la clinica'
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
      {/* Header for Pet Owner */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Referto di Luna</h1>
        <p className="text-slate-600">Un riepilogo semplice e comprensibile dell'esame ecografico</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Pet Information Card */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="text-xl flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">L</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{reportData.petName}</h2>
                <p className="text-blue-100">{reportData.breed} • {reportData.age} • {reportData.weight}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-600">Data Esame</p>
                    <p className="font-semibold text-slate-800">{reportData.examDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-600">Clinica</p>
                    <p className="font-semibold text-slate-800">{reportData.clinic}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Dr</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Veterinario</p>
                    <p className="font-semibold text-slate-800">{reportData.veterinarian}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-slate-600">Tipo Esame</p>
                    <p className="font-semibold text-slate-800">{reportData.examType}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Health Status */}
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Stato di Salute Generale</h2>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                Buono - Nessuna preoccupazione grave
              </Badge>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 text-center">
                Luna è in buona salute generale! L'esame ha mostrato solo una piccola alterazione al fegato 
                che terremo sotto controllo. Non c'è motivo di preoccuparsi.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Findings in Simple Language */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Cosa Abbiamo Trovato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {findings.map((finding, index) => (
              <div key={index} className="p-4 rounded-lg border-l-4 border-l-blue-500 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 text-lg">{finding.organ}</h3>
                  <Badge 
                    variant="outline"
                    className={
                      finding.severity === 'good' 
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }
                  >
                    {finding.status}
                  </Badge>
                </div>
                <p className="text-slate-700">{finding.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Cosa Fare Ora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg border-0">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">Hai Domande?</h3>
            <p className="mb-6 text-blue-100">
              Il nostro team è sempre disponibile per chiarire qualsiasi dubbio sul referto di Luna
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Chiama la Clinica
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Scarica Referto
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                Condividi
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm pt-6">
          <p>Questo referto è stato generato da OneSight - Sistema di Assistenza Ecografica Veterinaria</p>
          <p className="mt-1">Per emergenze, contattare immediatamente la clinica veterinaria</p>
        </div>
      </div>
    </div>
  );
};

export default PetOwnerPreview;
