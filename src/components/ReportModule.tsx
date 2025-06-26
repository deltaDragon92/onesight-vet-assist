
import React, { useState } from 'react';
import { FileText, Save, Send, Download, CheckCircle, Bot, Eye, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface ReportModuleProps {
  onReportCompleted?: () => void;
  onReportShared?: () => void;
}

const ReportModule = ({ onReportCompleted, onReportShared }: ReportModuleProps) => {
  const [reportText, setReportText] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [reportCompleted, setReportCompleted] = useState(false);
  const [reportShared, setReportShared] = useState(false);

  const handleCompleteReport = () => {
    setReportCompleted(true);
    onReportCompleted?.();
  };

  const handleShareReport = () => {
    setReportShared(true);
    onReportShared?.();
  };

  const aiSuggestedContent = `REFERTO ECOGRAFICO

Paziente: Luna - Labrador Retriever
Età: 5 anni, Peso: 28 kg
Data esame: ${new Date().toLocaleDateString('it-IT')}

INDICAZIONI CLINICHE:
Controllo di routine post-terapia cardiaca

METODICA:
Esame ecografico con approccio transtoracico e transaddominale

REPERTI:
• CUORE: Strutture cardiache nella norma, funzione sistolica conservata
• FEGATO: Lieve epatomegalia, ecostruttura omogenea
• RENI: Dimensioni e morfologia regolari bilateralmente
• VESCICA: Contenuto anecogeno, pareti regolari

CONCLUSIONI:
Quadro ecografico sostanzialmente nella norma. Lieve epatomegalia da monitorare nel tempo.

RACCOMANDAZIONI:
Controllo ecografico tra 3 mesi per valutazione evolutiva.`;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Refertazione - Luna</h3>
                <p className="text-sm text-slate-600">Esame ecografico del {new Date().toLocaleDateString('it-IT')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {reportShared && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  <Share2 className="w-3 h-3 mr-1" />
                  Condiviso
                </Badge>
              )}
              <Badge variant="outline" className={`${
                reportCompleted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                {reportCompleted ? 'Referto completato' : 'In compilazione'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Editor */}
        <Card className="lg:col-span-2 bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span>Editor Referto</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant={aiSuggestions ? "default" : "outline"}
                  onClick={() => {
                    setAiSuggestions(!aiSuggestions);
                    if (!aiSuggestions) {
                      setReportText(aiSuggestedContent);
                    }
                  }}
                  className="text-sm"
                >
                  <Bot className="w-4 h-4 mr-1" />
                  AI Assistant
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Inizia a scrivere il referto oppure attiva l'AI Assistant per suggerimenti automatici..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className="min-h-96 text-sm leading-relaxed"
              />
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <span>Caratteri: {reportText.length}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Parole: {reportText.split(' ').filter(w => w.length > 0).length}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="w-4 h-4 mr-1" />
                    Salva Bozza
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Anteprima
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions & Templates */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Azioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleCompleteReport}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                disabled={reportCompleted || reportText.length < 50}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {reportCompleted ? 'Referto Completato' : 'Completa Referto'}
              </Button>
              
              {reportCompleted && (
                <Button 
                  onClick={handleShareReport}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  disabled={reportShared}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {reportShared ? 'Referto Condiviso' : 'Condividi con Pet Owner'}
                </Button>
              )}
              
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Esporta PDF
              </Button>
              
              <Button variant="outline" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Invia via Email
              </Button>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Template Rapidi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm"
                onClick={() => setReportText('Template Ecocardiografia:\n\n' + aiSuggestedContent)}
              >
                Ecocardiografia
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm"
                onClick={() => setReportText('Template Ecografia Addominale:\n\n' + aiSuggestedContent.replace('CUORE:', 'ADDOME:'))}
              >
                Ecografia Addominale
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm"
                onClick={() => setReportText('Template Screening Completo:\n\n' + aiSuggestedContent)}
              >
                Screening Completo
              </Button>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          {aiSuggestions && (
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Suggerimenti AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-blue-700 space-y-2">
                  <p>• Includere sempre indicazioni cliniche</p>
                  <p>• Descrivere metodica impiegata</p>
                  <p>• Riportare reperti per ogni organo esaminato</p>
                  <p>• Fornire conclusioni chiare</p>
                  <p>• Aggiungere raccomandazioni di follow-up</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => setReportText(aiSuggestedContent)}
                >
                  Usa Template AI
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModule;
