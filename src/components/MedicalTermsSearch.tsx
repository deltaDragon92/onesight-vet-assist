
import React, { useState } from 'react';
import { Search, X, BookOpen, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface MedicalTerm {
  id: string;
  term: string;
  code: string;
  definition: string;
  category: string;
}

interface MedicalTermsSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onTermSelect: (term: MedicalTerm) => void;
}

const MedicalTermsSearch = ({ isOpen, onClose, onTermSelect }: MedicalTermsSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const medicalTerms: MedicalTerm[] = [
    {
      id: '1',
      term: 'Dilatazione atriale sinistra',
      code: 'I25.3',
      definition: 'Aumento delle dimensioni dell\'atrio sinistro oltre i valori normali',
      category: 'Cardiologia'
    },
    {
      id: '2',
      term: 'Ipertrofia ventricolare sinistra',
      code: 'I25.1',
      definition: 'Ispessimento della parete del ventricolo sinistro',
      category: 'Cardiologia'
    },
    {
      id: '3',
      term: 'Insufficienza mitralica',
      code: 'I34.0',
      definition: 'Rigurgito della valvola mitrale con reflusso di sangue',
      category: 'Cardiologia'
    },
    {
      id: '4',
      term: 'Epatomegalia',
      code: 'K76.1',
      definition: 'Aumento delle dimensioni del fegato',
      category: 'Gastroenterologia'
    },
    {
      id: '5',
      term: 'Versamento pericardico',
      code: 'I31.3',
      definition: 'Accumulo di liquido nello spazio pericardico',
      category: 'Cardiologia'
    },
    {
      id: '6',
      term: 'Stenosi polmonare',
      code: 'Q22.1',
      definition: 'Restringimento della valvola polmonare',
      category: 'Cardiologia'
    }
  ];

  const filteredTerms = medicalTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyTerm = (term: string) => {
    navigator.clipboard.writeText(term);
    // Qui potresti aggiungere un toast di conferma
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Dizionario Medico Veterinario</span>
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cerca termini medici, definizioni o categorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p>Nessun termine trovato</p>
                <p className="text-sm">Prova con una ricerca diversa</p>
              </div>
            ) : (
              filteredTerms.map((term) => (
                <Card key={term.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-1">{term.term}</h3>
                        <p className="text-sm text-slate-600 mb-2">{term.definition}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {term.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-mono">
                            {term.code}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyTerm(term.term)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            onTermSelect(term);
                            onClose();
                          }}
                          className="h-8 px-3 text-xs"
                        >
                          Usa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="border-t pt-4 text-xs text-slate-500 text-center">
            <p>Termini basati su standard SNOMED CT e ICD-10</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalTermsSearch;
