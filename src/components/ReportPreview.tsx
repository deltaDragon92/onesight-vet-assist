
import React from 'react';
import { X, Download, FileText, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReportPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: Array<{
    id: string;
    type: string;
    title: string;
    content: string;
    isComplete: boolean;
  }>;
  patientName: string;
  mode: 'technical' | 'petowner';
  onModeChange: (mode: 'technical' | 'petowner') => void;
}

const ReportPreview = ({ isOpen, onClose, blocks, patientName, mode, onModeChange }: ReportPreviewProps) => {
  const formatContentForPetOwner = (content: string) => {
    return content
      .replace(/CUORE:/g, '💙 Cuore:')
      .replace(/FEGATO:/g, '🟤 Fegato:')
      .replace(/RENI:/g, '🔵 Reni:')
      .replace(/nella norma/g, '✅ tutto normale')
      .replace(/alterazioni/g, 'cambiamenti')
      .replace(/ecostruttura/g, 'struttura interna');
  };

  const renderTechnicalPreview = () => (
    <div className="space-y-6 p-6 bg-white rounded-lg max-h-96 overflow-y-auto">
      <div className="text-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">REFERTO ECOGRAFICO</h2>
        <p className="text-slate-600 mt-2">Paziente: {patientName}</p>
        <p className="text-slate-600">Data: {new Date().toLocaleDateString('it-IT')}</p>
      </div>
      
      {blocks.filter(b => b.isComplete && b.content.trim()).map((block) => (
        <div key={block.id} className="space-y-2">
          <h3 className="font-semibold text-slate-800 uppercase tracking-wide text-sm border-b border-slate-200 pb-1">
            {block.title}
          </h3>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {block.content}
          </div>
        </div>
      ))}
      
      <div className="border-t pt-4 text-xs text-slate-500">
        <p>Dr. Mario Rossi - Clinica Veterinaria Milano</p>
        <p>Generato il {new Date().toLocaleString('it-IT')}</p>
      </div>
    </div>
  );

  const renderPetOwnerPreview = () => (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg max-h-96 overflow-y-auto">
      <div className="text-center border-b border-blue-200 pb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Risultati dell'Esame di {patientName}</h2>
        <p className="text-slate-600 mt-2">Ecografia del {new Date().toLocaleDateString('it-IT')}</p>
      </div>
      
      {blocks.filter(b => b.isComplete && b.content.trim()).map((block) => (
        <div key={block.id} className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {block.title}
          </h3>
          <div className="text-slate-700 leading-relaxed">
            {formatContentForPetOwner(block.content)}
          </div>
        </div>
      ))}
      
      <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
        <h3 className="font-semibold text-green-800 mb-2">👨‍⚕️ Messaggio del Veterinario</h3>
        <p className="text-slate-700">
          I risultati dell'esame mostrano che {patientName} sta bene. 
          Continua a seguire le nostre raccomandazioni per mantenerlo in salute!
        </p>
      </div>
      
      <div className="text-center text-xs text-slate-500 pt-4 border-t border-blue-200">
        <p>Clinica Veterinaria Milano - Dr. Mario Rossi</p>
        <p>{new Date().toLocaleDateString('it-IT')}</p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Anteprima Referto</span>
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <Tabs value={mode} onValueChange={(value) => onModeChange(value as 'technical' | 'petowner')}>
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="technical" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Tecnico</span>
                </TabsTrigger>
                <TabsTrigger value="petowner" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Pet Owner</span>
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Scarica PDF
              </Button>
            </div>
            
            <TabsContent value="technical" className="mt-4">
              {renderTechnicalPreview()}
            </TabsContent>
            
            <TabsContent value="petowner" className="mt-4">
              {renderPetOwnerPreview()}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportPreview;
