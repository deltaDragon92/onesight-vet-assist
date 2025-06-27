
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Zap, Stethoscope, Activity } from 'lucide-react';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: any) => void;
}

const TemplateSelector = ({ isOpen, onClose, onSelect }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'cardiac',
      title: 'Valutazione Cardiaca',
      icon: '🫀',
      color: 'bg-red-500',
      category: 'Cardiologia',
      description: 'Template completo per esami ecocardiografici',
      content: `VALUTAZIONE ECOCARDIOGRAFICA:
- Dimensioni ventricolari: 
- Funzione sistolica:
- Valvole cardiache:
- Flussi doppler:`,
      sections: ['Morfologia', 'Funzione', 'Valvole', 'Doppler']
    },
    {
      id: 'abdominal',
      title: 'Eco Addominale',
      icon: '🔍',
      color: 'bg-green-500',
      category: 'Addominale',
      description: 'Screening completo organi addominali',
      content: `ECOGRAFIA ADDOMINALE:
- Fegato: dimensioni, ecostruttura, margini
- Milza: dimensioni, ecostruttura
- Reni: morfologia, corticale, midollare
- Vescica: contenuto, pareti`,
      sections: ['Fegato', 'Milza', 'Reni', 'Vescica']
    },
    {
      id: 'thoracic',
      title: 'Torace',
      icon: '🫁',
      color: 'bg-blue-500',
      category: 'Toracico',
      description: 'Valutazione strutture toraciche',
      content: `VALUTAZIONE TORACICA:
- Polmoni: pattern ecografico, pleure
- Mediastino: strutture vascolari
- Parete toracica: tessuti molli`,
      sections: ['Polmoni', 'Mediastino', 'Parete']
    },
    {
      id: 'obstetric',
      title: 'Ostetricia',
      icon: '🤱',
      color: 'bg-pink-500',
      category: 'Riproduzione',
      description: 'Controllo gravidanza e riproduzione',
      content: `CONTROLLO OSTETRICO:
- Utero: dimensioni, contenuto
- Feti: numero, vitalità, biometria
- Placenta: aspetto, inserzione`,
      sections: ['Utero', 'Feti', 'Placenta']
    },
    {
      id: 'emergency',
      title: 'Emergenza FAST',
      icon: '🚨',
      color: 'bg-red-600',
      category: 'Emergenza',
      description: 'Protocollo FAST per emergenze',
      content: `PROTOCOLLO FAST:
- Spazio epatico-renale
- Spazio splenorenal
- Pelvi: versamento libero
- Pericardio: effusione`,
      sections: ['Addome', 'Pelvi', 'Torace', 'Pericardio']
    },
    {
      id: 'musculoskeletal',
      title: 'Muscolo-scheletrico',
      icon: '🦴',
      color: 'bg-orange-500',
      category: 'Ortopedia',
      description: 'Valutazione tendini, muscoli, articolazioni',
      content: `VALUTAZIONE MUSCOLO-SCHELETRICA:
- Tendini: ecostruttura, continuità
- Muscoli: pattern ecografico
- Articolazioni: versamento, cartilagine`,
      sections: ['Tendini', 'Muscoli', 'Articolazioni']
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const handleSelect = (template: any) => {
    onSelect(template);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              <span>Template Referto</span>
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {categories.map(category => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates
                  .filter(template => template.category === category)
                  .map(template => (
                    <Card 
                      key={template.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-blue-300"
                      onClick={() => handleSelect(template)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center shadow-md`}>
                              <span className="text-xl text-white">{template.icon}</span>
                            </div>
                            <div>
                              <CardTitle className="text-slate-800 text-base">{template.title}</CardTitle>
                              <p className="text-xs text-slate-600 mt-1">{template.description}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {template.sections.map(section => (
                            <Badge 
                              key={section}
                              variant="outline" 
                              className="text-xs border-slate-300 text-slate-600"
                            >
                              {section}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-3">
                          <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">
                            {template.content.substring(0, 120)}...
                          </pre>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full text-sm border-blue-200 text-blue-700 hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(template);
                          }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Usa Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
