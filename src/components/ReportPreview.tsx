
import React from 'react';
import { X, Download, FileText, Heart, Clock, MapPin, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReportPreviewProps {
  isOpen?: boolean;
  onClose?: () => void;
  blocks: Array<{
    id: string;
    type: string;
    title: string;
    content: string;
    color: string;
    icon: string;
    isComplete: boolean;
  }>;
  patientName: string;
  mode?: 'technical' | 'petowner';
  onModeChange?: (mode: 'technical' | 'petowner') => void;
  isLive?: boolean;
}

const ReportPreview = ({ 
  isOpen = false, 
  onClose, 
  blocks, 
  patientName, 
  mode = 'technical', 
  onModeChange,
  isLive = false 
}: ReportPreviewProps) => {
  const formatContentForPetOwner = (content: string, blockType: string) => {
    let formatted = content
      .replace(/CUORE:/g, '💙 Il cuore di ' + patientName + ':')
      .replace(/FEGATO:/g, '🟤 Il fegato:')
      .replace(/RENI:/g, '🔵 I reni:')
      .replace(/VESCICA:/g, '💧 La vescica:')
      .replace(/nella norma/g, '✅ tutto normale')
      .replace(/alterazioni/g, 'cambiamenti')
      .replace(/ecostruttura/g, 'struttura interna')
      .replace(/dimensioni regolari/g, 'dimensioni normali')
      .replace(/funzione sistolica conservata/g, 'cuore che pompa bene')
      .replace(/versamento/g, 'accumulo di liquido');

    // Add encouraging messages based on content
    if (content.includes('nella norma') || content.includes('normale')) {
      formatted += '\n\n😊 Ottima notizia! Tutto sembra essere in ordine.';
    }

    return formatted;
  };

  const getBlockColorClass = (color: string) => {
    const colorMap = {
      'bg-blue-500': 'border-l-blue-500',
      'bg-green-500': 'border-l-green-500',
      'bg-purple-500': 'border-l-purple-500',
      'bg-red-500': 'border-l-red-500',
      'bg-orange-500': 'border-l-orange-500',
      'bg-pink-500': 'border-l-pink-500',
      'bg-indigo-500': 'border-l-indigo-500',
      'bg-slate-500': 'border-l-slate-500'
    };
    return colorMap[color] || 'border-l-slate-500';
  };

  const renderTechnicalPreview = () => (
    <div className="space-y-6 p-6 bg-white rounded-lg max-h-96 overflow-y-auto">
      <div className="text-center border-b border-slate-200 pb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">REFERTO ECOGRAFICO</h2>
        <div className="space-y-1 text-slate-600">
          <p className="font-semibold">Paziente: {patientName}</p>
          <p>Data: {new Date().toLocaleDateString('it-IT')}</p>
          <p>Ora: {new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      
      {blocks.filter(b => b.isComplete && b.content.trim()).map((block) => (
        <div key={block.id} className={`border-l-4 ${getBlockColorClass(block.color)} pl-4 space-y-2`}>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{block.icon}</span>
            <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">
              {block.title}
            </h3>
          </div>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono">
            {block.content}
          </div>
        </div>
      ))}
      
      <div className="border-t border-slate-200 pt-6 text-xs text-slate-500 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Dr. Mario Rossi</p>
            <p>Medico Veterinario - Specialista in Diagnostica per Immagini</p>
            <p>Clinica Veterinaria OneSight Milano</p>
          </div>
          <div className="text-right">
            <p>Via Roma 123, 20100 Milano</p>
            <p>Tel: +39 02 1234567</p>
            <p>Email: info@onesight.vet</p>
          </div>
        </div>
        <div className="text-center pt-2 border-t border-slate-100">
          <p>Referto generato il {new Date().toLocaleString('it-IT')}</p>
        </div>
      </div>
    </div>
  );

  const renderPetOwnerPreview = () => (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg max-h-96 overflow-y-auto">
      <div className="text-center border-b border-blue-200 pb-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Risultati dell'Esame di {patientName} 🐾
        </h2>
        <div className="inline-flex items-center space-x-4 text-slate-600 bg-white rounded-full px-4 py-2 shadow-sm">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{new Date().toLocaleDateString('it-IT')}</span>
          </div>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Clinica OneSight</span>
          </div>
        </div>
      </div>
      
      {blocks.filter(b => b.isComplete && b.content.trim()).map((block) => (
        <div key={block.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center text-lg">
            <span className="text-2xl mr-3">{block.icon}</span>
            {block.title}
          </h3>
          <div className="text-slate-700 leading-relaxed space-y-2">
            {formatContentForPetOwner(block.content, block.type).split('\n').map((line, index) => (
              <p key={index} className={line.includes('😊') ? 'text-green-700 font-medium bg-green-50 p-2 rounded-lg' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-5 border border-green-200">
        <h3 className="font-bold text-green-800 mb-3 flex items-center">
          <span className="text-2xl mr-2">👨‍⚕️</span>
          Messaggio del tuo Veterinario
        </h3>
        <p className="text-slate-700 leading-relaxed">
          Caro proprietario di {patientName}, i risultati dell'esame ecografico sono molto incoraggianti! 
          {patientName} mostra segni di buona salute. Continua a seguire le nostre raccomandazioni 
          per mantenerlo in forma e felice. Non esitare a contattarci per qualsiasi domanda! 🐕❤️
        </p>
        <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Per domande: +39 02 1234567</span>
          </div>
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            Sempre a disposizione
          </Badge>
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500 pt-4 border-t border-blue-200 space-y-1">
        <p className="font-semibold">Clinica Veterinaria OneSight Milano</p>
        <p>Dr. Mario Rossi - Specialista in Diagnostica per Immagini</p>
        <p className="text-slate-400">{new Date().toLocaleDateString('it-IT')}</p>
      </div>
    </div>
  );

  if (isLive) {
    // Render live preview without dialog
    return (
      <div className="w-full">
        {mode === 'technical' ? renderTechnicalPreview() : renderPetOwnerPreview()}
      </div>
    );
  }

  // Render full dialog version
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <span>Anteprima Referto</span>
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <Tabs value={mode} onValueChange={(value) => onModeChange?.(value as 'technical' | 'petowner')}>
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
              
              <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200 text-blue-700">
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
