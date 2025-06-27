
import React, { useState } from 'react';
import { FileText, Plus, Mic, Eye, Share2, CheckCircle, Bot, Search, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ReportBlock from './ReportBlock';
import ReportPreview from './ReportPreview';
import MedicalTermsSearch from './MedicalTermsSearch';
import PatientTimeline from './PatientTimeline';

interface ReportBlock {
  id: string;
  type: 'exam' | 'anatomy' | 'diagnosis' | 'followup' | 'custom';
  title: string;
  content: string;
  aiConfidence?: 'low' | 'medium' | 'high';
  isComplete: boolean;
  isRequired: boolean;
}

interface ReportEditorProps {
  patientName?: string;
  onReportCompleted?: () => void;
  onReportShared?: () => void;
}

const ReportEditor = ({ patientName = "Luna", onReportCompleted, onReportShared }: ReportEditorProps) => {
  const [blocks, setBlocks] = useState<ReportBlock[]>([
    {
      id: '1',
      type: 'exam',
      title: 'Informazioni Esame',
      content: '',
      isComplete: false,
      isRequired: true
    },
    {
      id: '2',
      type: 'anatomy',
      title: 'Reperti Anatomici',
      content: '',
      isComplete: false,
      isRequired: true
    },
    {
      id: '3',
      type: 'diagnosis',
      title: 'Diagnosi',
      content: '',
      isComplete: false,
      isRequired: true
    },
    {
      id: '4',
      type: 'followup',
      title: 'Follow-up',
      content: '',
      isComplete: false,
      isRequired: false
    }
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'technical' | 'petowner'>('technical');
  const [showTermsSearch, setShowTermsSearch] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportCompleted, setReportCompleted] = useState(false);
  const [reportShared, setReportShared] = useState(false);

  const completionPercentage = Math.round((blocks.filter(b => b.isComplete).length / blocks.filter(b => b.isRequired).length) * 100);
  const canComplete = blocks.filter(b => b.isRequired).every(b => b.isComplete);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    
    // Simula generazione AI
    setTimeout(() => {
      const updatedBlocks = blocks.map(block => ({
        ...block,
        content: getAIGeneratedContent(block.type),
        aiConfidence: Math.random() > 0.3 ? 'high' : 'medium',
        isComplete: true
      }));
      setBlocks(updatedBlocks);
      setIsGeneratingReport(false);
    }, 2000);
  };

  const getAIGeneratedContent = (type: string): string => {
    const templates = {
      exam: `ESAME ECOGRAFICO - ${patientName}
Data: ${new Date().toLocaleDateString('it-IT')}
Indicazioni cliniche: Controllo di routine
Metodica: Ecografia transtoracica e transaddominale`,
      anatomy: `CUORE: Strutture cardiache nella norma, funzione sistolica conservata
FEGATO: Dimensioni regolari, ecostruttura omogenea
RENI: Morfologia e dimensioni nella norma bilateralmente
VESCICA: Contenuto anecogeno, pareti regolari`,
      diagnosis: `Quadro ecografico sostanzialmente nella norma.
Non si rilevano alterazioni significative a carico degli organi esaminati.`,
      followup: `Controllo ecografico consigliato tra 6 mesi.
Mantenere terapia attuale se in corso.`
    };
    return templates[type] || 'Contenuto generato dall\'AI';
  };

  const handleBlockUpdate = (blockId: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, content, isComplete: content.trim().length > 20 }
        : block
    ));
  };

  const handleAddBlock = () => {
    const newBlock: ReportBlock = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'Sezione Personalizzata',
      content: '',
      isComplete: false,
      isRequired: false
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleCompleteReport = () => {
    setReportCompleted(true);
    onReportCompleted?.();
  };

  const handleShareReport = () => {
    setReportShared(true);
    onReportShared?.();
  };

  return (
    <div className="p-6 space-y-6 max-w-full overflow-hidden">
      {/* Header con progress */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Referto - {patientName}</h3>
                <p className="text-sm text-slate-600">Esame del {new Date().toLocaleDateString('it-IT')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {reportShared && (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  <Share2 className="w-3 h-3 mr-1" />
                  Condiviso
                </Badge>
              )}
              <Badge variant="outline" className={`${
                reportCompleted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}>
                {reportCompleted ? 'Completato' : 'In elaborazione'}
              </Badge>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Completamento referto</span>
              <span className="text-slate-800 font-medium">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor principale */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controlli principali */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {isGeneratingReport ? 'Generando...' : 'Genera Referto AI'}
                </Button>
                
                <Button variant="outline" onClick={() => setShowTermsSearch(true)}>
                  <Search className="w-4 h-4 mr-2" />
                  Termini Medici
                </Button>
                
                <Button variant="outline">
                  <Mic className="w-4 h-4 mr-2" />
                  Detta Blocco
                </Button>
                
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Anteprima
                </Button>
                
                <Button variant="outline" onClick={handleAddBlock}>
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi Sezione
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Blocchi del referto */}
          <div className="space-y-4">
            {blocks.map((block) => (
              <ReportBlock
                key={block.id}
                block={block}
                onUpdate={handleBlockUpdate}
                onDelete={(id) => setBlocks(prev => prev.filter(b => b.id !== id))}
              />
            ))}
          </div>

          {/* Azioni finali */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {canComplete ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Referto pronto per il completamento</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-orange-600">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Completare le sezioni obbligatorie</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={handleCompleteReport}
                    disabled={!canComplete || reportCompleted}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {reportCompleted ? 'Completato' : 'Completa Referto'}
                  </Button>
                  
                  {reportCompleted && (
                    <Button 
                      onClick={handleShareReport}
                      disabled={reportShared}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {reportShared ? 'Condiviso' : 'Condividi'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <PatientTimeline patientName={patientName} />
        </div>
      </div>

      {/* Modali */}
      <ReportPreview 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        blocks={blocks}
        patientName={patientName}
        mode={previewMode}
        onModeChange={setPreviewMode}
      />

      <MedicalTermsSearch
        isOpen={showTermsSearch}
        onClose={() => setShowTermsSearch(false)}
        onTermSelect={(term) => console.log('Selected term:', term)}
      />
    </div>
  );
};

export default ReportEditor;
