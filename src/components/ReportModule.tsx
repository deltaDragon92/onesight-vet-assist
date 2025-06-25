
import React, { useState } from 'react';
import { FileText, Send, Save, Paperclip, CheckCircle, AlertTriangle, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const ReportModule = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [clinicalNotes, setClinicalNotes] = useState('');

  const handleCheckboxChange = (id, checked) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  const pathologyChecklist = [
    {
      category: 'Sistema Cardiovascolare',
      items: [
        { id: 'heart_normal', label: 'Cuore: morfologia normale', status: 'normal' },
        { id: 'heart_murmur', label: 'Soffio cardiaco rilevato', status: 'abnormal' },
        { id: 'pericardial', label: 'Versamento pericardico', status: 'abnormal' },
        { id: 'valves', label: 'Valvole cardiache: funzionalità normale', status: 'normal' }
      ]
    },
    {
      category: 'Sistema Digestivo',
      items: [
        { id: 'liver_normal', label: 'Fegato: ecostruttura omogenea', status: 'normal' },
        { id: 'gallbladder', label: 'Cistifellea: contenuto anecogeno', status: 'normal' },
        { id: 'intestines', label: 'Anse intestinali: peristalsi presente', status: 'normal' },
        { id: 'foreign_body', label: 'Corpo estraneo rilevato', status: 'abnormal' }
      ]
    },
    {
      category: 'Sistema Urinario',
      items: [
        { id: 'kidneys_normal', label: 'Reni: morfologia e dimensioni normali', status: 'normal' },
        { id: 'bladder_normal', label: 'Vescica: parete regolare', status: 'normal' },
        { id: 'stones', label: 'Calcoli urinari', status: 'abnormal' },
        { id: 'hydronephrosis', label: 'Idronefrosi', status: 'abnormal' }
      ]
    }
  ];

  const aiSuggestions = [
    'Struttura cardiaca nella norma per età e razza',
    'Ecogenicità epatica leggermente aumentata - suggerire controllo biochimico',
    'Vescica ben distesa, parete regolare',
    'Non evidenti alterazioni patologiche significative'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Patient Header */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Referto Ecografico - Luna (Labrador)</h3>
              <p className="text-sm text-slate-600">Data: 25 Giugno 2025 • Esame: Eco Addominale Completa</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Bozza
              </Badge>
              <Button variant="outline" size="sm">
                <Image className="w-4 h-4 mr-2" />
                5 Immagini
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Report Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="checklist" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-50">
              <TabsTrigger value="checklist" className="data-[state=active]:bg-white">
                Checklist Patologie
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-white">
                Note Cliniche
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-white">
                Suggerimenti AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="checklist" className="space-y-6">
              {pathologyChecklist.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-white shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-800">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded">
                        <Checkbox
                          id={item.id}
                          checked={checkedItems[item.id] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                        />
                        <label
                          htmlFor={item.id}
                          className="flex-1 text-sm text-slate-700 cursor-pointer"
                        >
                          {item.label}
                        </label>
                        {item.status === 'normal' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Note Cliniche</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Inserisci le tue osservazioni cliniche, descrizioni dettagliate delle immagini ecografiche e conclusioni diagnostiche..."
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    className="min-h-[300px] text-sm"
                  />
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{clinicalNotes.length} caratteri</span>
                    <span>Ultimo salvataggio: 12:45</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-blue-800">Template Suggeriti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="mr-2 mb-2">
                      Eco Addominale Standard
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2 mb-2">
                      Ecocardiografia
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2 mb-2">
                      Eco Toracica
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2 mb-2">
                      Eco Gravidanza
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-cyan-800 flex items-center">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                    Suggerimenti AI Automatici
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded border">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{suggestion}</p>
                          <Button variant="link" size="sm" className="p-0 h-auto text-xs text-blue-600">
                            Aggiungi al referto
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Azioni Referto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Salva Bozza
              </Button>
              
              <Button variant="outline" className="w-full">
                <Paperclip className="w-4 h-4 mr-2" />
                Allega Immagini
              </Button>
              
              <div className="border-t pt-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Invia a Proprietario
                </Button>
                
                <Button variant="outline" className="w-full mt-2">
                  <FileText className="w-4 h-4 mr-2" />
                  Esporta PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Summary */}
          <Card className="bg-slate-50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Riepilogo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Sezioni completate:</span>
                <span className="font-medium">3/4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Immagini allegate:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Stato:</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Bozza
                </Badge>
              </div>
              
              <div className="pt-3 border-t">
                <p className="text-xs text-slate-500">
                  Ultimo aggiornamento: Oggi alle 12:45
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportModule;
