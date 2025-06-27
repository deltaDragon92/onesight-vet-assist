import React, { useState } from 'react';
import { FileText, Plus, Mic, Eye, Share2, CheckCircle, Bot, Search, Clock, AlertCircle, Camera, Video, Palette, FileTemplate, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ReportBlock from './ReportBlock';
import ReportPreview from './ReportPreview';
import MedicalTermsSearch from './MedicalTermsSearch';
import PatientTimeline from './PatientTimeline';
import MediaAttachments from './MediaAttachments';
import TemplateSelector from './TemplateSelector';

interface ReportBlock {
  id: string;
  type: 'exam' | 'anatomy' | 'diagnosis' | 'followup' | 'custom';
  title: string;
  content: string;
  color: string;
  icon: string;
  aiConfidence?: 'low' | 'medium' | 'high';
  isComplete: boolean;
  isRequired: boolean;
  attachments?: string[];
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
      color: 'bg-blue-500',
      icon: '🔍',
      isComplete: false,
      isRequired: true,
      attachments: []
    },
    {
      id: '2',
      type: 'anatomy',
      title: 'Reperti Anatomici',
      content: '',
      color: 'bg-green-500',
      icon: '🫀',
      isComplete: false,
      isRequired: true,
      attachments: []
    },
    {
      id: '3',
      type: 'diagnosis',
      title: 'Diagnosi',
      content: '',
      color: 'bg-purple-500',
      icon: '📋',
      isComplete: false,
      isRequired: true,
      attachments: []
    },
    {
      id: '4',
      type: 'followup',
      title: 'Follow-up',
      content: '',
      color: 'bg-orange-500',
      icon: '📅',
      isComplete: false,
      isRequired: false,
      attachments: []
    }
  ]);

  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<'technical' | 'petowner'>('technical');
  const [showTermsSearch, setShowTermsSearch] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportCompleted, setReportCompleted] = useState(false);
  const [reportShared, setReportShared] = useState(false);
  const [mediaAttachments, setMediaAttachments] = useState<any[]>([]);

  const completionPercentage = Math.round((blocks.filter(b => b.isComplete).length / blocks.filter(b => b.isRequired).length) * 100);
  const canComplete = blocks.filter(b => b.isRequired).every(b => b.isComplete);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    
    setTimeout(() => {
      const updatedBlocks = blocks.map(block => ({
        ...block,
        content: getAIGeneratedContent(block.type),
        aiConfidence: (Math.random() > 0.3 ? 'high' : 'medium') as 'high' | 'medium' | 'low',
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
Metodica: Ecografia transtoracica e transaddominale con sonda lineare 7.5 MHz`,
      anatomy: `CUORE: Strutture cardiache nella norma, funzione sistolica conservata (FE ~65%)
FEGATO: Dimensioni regolari, ecostruttura omogenea, margini lisci
RENI: Morfologia e dimensioni nella norma bilateralmente, corticale di spessore adeguato
VESCICA: Contenuto anecogeno, pareti regolari, capacità normale`,
      diagnosis: `Quadro ecografico sostanzialmente nella norma per età e specie.
Non si rilevano alterazioni strutturali significative a carico degli organi esaminati.
Funzionalità cardiaca e renale preservate.`,
      followup: `Controllo ecografico consigliato tra 6-12 mesi per monitoraggio.
Mantenere attuale protocollo terapeutico se in corso.
Consultazione immediata se comparsa di sintomi clinici.`
    };
    return templates[type] || 'Contenuto generato dall\'AI per questa sezione';
  };

  const handleBlockUpdate = (blockId: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, content, isComplete: content.trim().length > 20 }
        : block
    ));
  };

  const handleBlockCustomize = (blockId: string, updates: Partial<ReportBlock>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const handleAddBlock = (template?: any) => {
    const newBlock: ReportBlock = {
      id: Date.now().toString(),
      type: 'custom',
      title: template?.title || 'Sezione Personalizzata',
      content: template?.content || '',
      color: template?.color || 'bg-slate-500',
      icon: template?.icon || '📝',
      isComplete: false,
      isRequired: false,
      attachments: []
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  const handleReorderBlocks = (startIndex: number, endIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setBlocks(result);
  };

  const handleCompleteReport = () => {
    setReportCompleted(true);
    onReportCompleted?.();
  };

  const handleShareReport = () => {
    setReportShared(true);
    onReportShared?.();
  };

  const handleMediaUpload = (type: 'image' | 'video', file: File) => {
    const newAttachment = {
      id: Date.now().toString(),
      type,
      file,
      name: file.name,
      size: file.size,
      timestamp: new Date()
    };
    setMediaAttachments(prev => [...prev, newAttachment]);
  };

  return (
    <div className="p-4 space-y-4 max-w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header con progress */}
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Referto Ecografico</h2>
                <p className="text-slate-600 font-medium">{patientName} • {new Date().toLocaleDateString('it-IT')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {reportShared && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-3 py-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Condiviso
                </Badge>
              )}
              <Badge className={`px-3 py-1 ${
                reportCompleted ? 'bg-green-100 text-green-700 border-green-300' : 'bg-orange-100 text-orange-700 border-orange-300'
              }`}>
                {reportCompleted ? '✅ Completato' : '⏳ In elaborazione'}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-700">Completamento referto</span>
              <span className="text-slate-900">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3 bg-slate-200" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Editor principale */}
        <div className="xl:col-span-2 space-y-6">
          {/* Controlli avanzati */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg h-12"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  {isGeneratingReport ? 'Generando...' : 'AI Referto'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateSelector(true)}
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 h-12"
                >
                  <FileTemplate className="w-5 h-5 mr-2" />
                  Template
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowTermsSearch(true)}
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 h-12"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Dizionario
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 h-12"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Dettatura
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 pt-4 border-t">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleMediaUpload('image', e.target.files[0])}
                  />
                  <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200 text-blue-700">
                    <Camera className="w-4 h-4 mr-2" />
                    📎 Immagine
                  </Button>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleMediaUpload('video', e.target.files[0])}
                  />
                  <Button variant="outline" size="sm" className="bg-purple-50 border-purple-200 text-purple-700">
                    <Video className="w-4 h-4 mr-2" />
                    📽️ Video
                  </Button>
                </label>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-green-50 border-green-200 text-green-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Nascondi' : 'Mostra'} Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Blocchi del referto */}
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <ReportBlock
                key={block.id}
                block={block}
                onUpdate={handleBlockUpdate}
                onCustomize={handleBlockCustomize}
                onDelete={handleDeleteBlock}
                canDelete={!block.isRequired}
              />
            ))}
            
            <Button
              onClick={() => handleAddBlock()}
              variant="outline"
              className="w-full h-16 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-600"
            >
              <Plus className="w-6 h-6 mr-2" />
              Aggiungi Sezione Personalizzata
            </Button>
          </div>

          {/* Media Attachments */}
          {mediaAttachments.length > 0 && (
            <MediaAttachments 
              attachments={mediaAttachments}
              onRemove={(id) => setMediaAttachments(prev => prev.filter(a => a.id !== id))}
            />
          )}

          {/* Azioni finali */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {canComplete ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      <span className="font-semibold text-lg">Referto pronto per il completamento</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-orange-600">
                      <AlertCircle className="w-6 h-6 mr-3" />
                      <span className="font-semibold text-lg">Completare le sezioni obbligatorie</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={handleCompleteReport}
                    disabled={!canComplete || reportCompleted}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-12 px-6"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {reportCompleted ? 'Completato' : 'Completa Referto'}
                  </Button>
                  
                  {reportCompleted && (
                    <Button 
                      onClick={handleShareReport}
                      disabled={reportShared}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg h-12 px-6"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      {reportShared ? 'Condiviso' : 'Condividi'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar con Preview e Timeline */}
        <div className="space-y-6">
          {/* Preview Live */}
          {showPreview && (
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span>Anteprima Live</span>
                  </CardTitle>
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('technical')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        previewMode === 'technical' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tecnico
                    </button>
                    <button
                      onClick={() => setPreviewMode('petowner')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        previewMode === 'petowner' 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Pet Owner
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <ReportPreview 
                    blocks={blocks}
                    patientName={patientName}
                    mode={previewMode}
                    isLive={true}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline Paziente */}
          <PatientTimeline patientName={patientName} />
        </div>
      </div>

      {/* Modali */}
      <MedicalTermsSearch
        isOpen={showTermsSearch}
        onClose={() => setShowTermsSearch(false)}
        onTermSelect={(term) => console.log('Selected term:', term)}
      />

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={handleAddBlock}
      />
    </div>
  );
};

export default ReportEditor;
