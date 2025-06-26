
import React from 'react';
import { Book, MessageCircle, Video, Download, ExternalLink, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Support = () => {
  const manuals = [
    {
      title: 'Guida Introduttiva',
      description: 'Primi passi con OneSight',
      type: 'PDF',
      size: '2.5 MB',
      updated: '15 Gen 2024'
    },
    {
      title: 'Manuale Ecografia',
      description: 'Guida completa alle funzionalità diagnostiche',
      type: 'PDF',
      size: '8.2 MB',
      updated: '12 Gen 2024'
    },
    {
      title: 'API Documentation',
      description: 'Documentazione tecnica per integrazioni',
      type: 'Web',
      size: 'Online',
      updated: '20 Gen 2024'
    }
  ];

  const tutorials = [
    {
      title: 'Setup Iniziale OneSight',
      duration: '5 min',
      views: '1.2k',
      thumbnail: 'setup'
    },
    {
      title: 'Il tuo primo esame ecografico',
      duration: '12 min',
      views: '856',
      thumbnail: 'exam'
    },
    {
      title: 'Interpretazione con AI',
      duration: '8 min',
      views: '2.1k',
      thumbnail: 'ai'
    },
    {
      title: 'Generazione referti automatici',
      duration: '6 min',
      views: '945',
      thumbnail: 'reports'
    }
  ];

  const faqItems = [
    {
      question: 'Come posso migliorare la qualità delle immagini?',
      category: 'Tecnico',
      popular: true
    },
    {
      question: 'Posso utilizzare OneSight offline?',
      category: 'Funzionalità',
      popular: true
    },
    {
      question: 'Come esportare i referti in formato PDF?',
      category: 'Referti',
      popular: false
    },
    {
      question: 'Problemi di connessione con la sonda',
      category: 'Hardware',
      popular: true
    },
    {
      question: 'Come aggiornare il mio piano di abbonamento?',
      category: 'Account',
      popular: false
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Manuali e Supporto</h1>
        <p className="text-slate-600 dark:text-slate-300">Trova risposte e documentazione</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input 
              placeholder="Cerca nella documentazione, FAQ, video tutorial..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Help */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-base text-blue-800 dark:text-blue-200">Serve aiuto immediato?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat con supporto
              </Button>
              <Button variant="outline" className="w-full border-blue-200">
                <Video className="w-4 h-4 mr-2" />
                Richiedi demo
              </Button>
              <div className="text-center pt-2">
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Supporto attivo: Lun-Ven 9:00-18:00
                </p>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Popolari */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">FAQ Popolari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqItems.filter(item => item.popular).map((item, index) => (
                <div key={index} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded cursor-pointer">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.question}</p>
                  <Badge variant="secondary" className="text-xs mt-1">{item.category}</Badge>
                </div>
              ))}
              <Button variant="link" className="text-xs p-0">
                Vedi tutte le FAQ →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Manuals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-blue-600" />
                <span>Manuali e Documentazione</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {manuals.map((manual, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 dark:text-slate-100">{manual.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{manual.description}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge variant="outline" className="text-xs">{manual.type}</Badge>
                        <span className="text-xs text-slate-500">{manual.size}</span>
                        <span className="text-xs text-slate-500">Aggiornato: {manual.updated}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3 mr-1" />
                      Scarica
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Tutorials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-blue-600" />
                <span>Video Tutorial</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 h-32 flex items-center justify-center">
                      <Video className="w-8 h-8 text-slate-500" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-slate-800 dark:text-slate-100 text-sm">{tutorial.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{tutorial.duration}</span>
                        <span className="text-xs text-slate-500">{tutorial.views} visualizzazioni</span>
                      </div>
                      <Button size="sm" variant="ghost" className="w-full mt-2 text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Guarda
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

export default Support;
