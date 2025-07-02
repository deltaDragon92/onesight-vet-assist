
import React, { useState } from 'react';
import { Search, BookOpen, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface MedicalDictionaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const MedicalDictionary = ({ isOpen, onClose }: MedicalDictionaryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const medicalTerms = [
    {
      term: 'Ecogenicità',
      definition: 'Capacità di un tessuto di riflettere gli ultrasuoni, che determina la luminosità dell\'immagine ecografica.',
      synonyms: ['Riflettanza acustica', 'Impedenza acustica']
    },
    {
      term: 'Ipoecogeno',
      definition: 'Tessuto che appare più scuro all\'ecografia rispetto ai tessuti circostanti, indicando minore riflettanza degli ultrasuoni.',
      synonyms: ['Ipoecogeno', 'Ipodenso']
    },
    {
      term: 'Iperecogeno',
      definition: 'Tessuto che appare più luminoso all\'ecografia, indicando maggiore riflettanza degli ultrasuoni.',
      synonyms: ['Iperecogeno', 'Iperdenso']
    },
    {
      term: 'Anecogeno',
      definition: 'Area che non riflette ultrasuoni, apparendo completamente nera (tipico dei liquidi).',
      synonyms: ['Anecoico', 'Transonic']
    },
    {
      term: 'Versamento',
      definition: 'Accumulo patologico di liquido in una cavità corporea.',
      synonyms: ['Effusione', 'Raccolta liquida']
    },
    {
      term: 'Peristalsi',
      definition: 'Movimenti ondulatori involontari della muscolatura liscia intestinale.',
      synonyms: ['Motilità intestinale', 'Onde peristaltiche']
    }
  ];

  const filteredTerms = medicalTerms.filter(term =>
    !searchTerm || 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.synonyms.some(synonym => synonym.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              <span>Dizionario Medico Veterinario</span>
            </DialogTitle>
            
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input
              placeholder="Cerca termini medici..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Terms list */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredTerms.map((item, index) => (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-slate-800 mb-2">{item.term}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.definition}</p>
                  {item.synonyms.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500">Sinonimi:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.synonyms.map((synonym, synIndex) => (
                          <span
                            key={synIndex}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
                          >
                            {synonym}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTerms.length === 0 && searchTerm && (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Nessun termine trovato per "{searchTerm}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalDictionary;
