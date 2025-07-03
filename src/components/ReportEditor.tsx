import React, { useState } from 'react';
import { FileText, Plus, Eye, Share2, CheckCircle, Bot, Search, Clock, AlertCircle, Camera, Video, Palette, Layout, Upload, MessageSquare, Sparkles, BookOpen, Copy, Mic, Table } from 'lucide-react';
import ReportBlock from './ReportBlock';
import ReportPreview from './ReportPreview';
import MedicalAIChat from './MedicalAIChat';
import MediaAttachments from './MediaAttachments';
import TemplateSelector from './TemplateSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import MedicalDictionary from './MedicalDictionary';

interface ReportBlock {
  id: string;
  type: 'custom';
  title: string;
  content: string;
  color: string;
  icon: string;
  aiConfidence?: 'low' | 'medium' | 'high';
  isComplete: boolean;
  attachments?: string[];
  tags?: string[];
  lastModified?: Date;
}

interface ReportEditorProps {
  patientName?: string;
  onReportCompleted?: () => void;
  onReportShared?: () => void;
}

const ReportEditor = ({ patientName = "Luna", onReportCompleted, onReportShared }: ReportEditorProps) => {
  const [blocks, setBlocks] = useState<ReportBlock[]>([]);
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<'technical' | 'petowner'>('technical');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedBlockForAI, setSelectedBlockForAI] = useState<string | null>(null);
  const [reportCompleted, setReportCompleted] = useState(false);
  const [reportShared, setReportShared] = useState(false);
  const [mediaAttachments, setMediaAttachments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);

  const completionPercentage = blocks.length > 0 ? Math.round((blocks.filter(b => b.isComplete).length / blocks.length) * 100) : 0;
  const canComplete = blocks.length > 0 && blocks.some(b => b.isComplete);

  const modernIcons = ['🔍', '🫀', '🧠', '🦴', '🩺', '📋', '💊', '🩹', '📝', '⚕️', '🔬', '🎯', '📊', '💡', '🧪', '📈'];
  const colorPalette = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];

  const suggestedTags = ['cardiaco', 'addome', 'neurologico', 'respiratorio', 'muscolo-scheletrico', 'dermatologico'];
  const quickChecklist = [
    'Nessuna anomalia visiva rilevata',
    'Flusso sanguigno regolare',
    'Strutture anatomiche nella norma',
    'Dimensioni appropriate per età e specie',
    'Funzionalità preservata'
  ];

  const handleAddSection = () => {
    const newBlock: ReportBlock = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'Nuova Sezione',
      content: '',
      color: colorPalette[blocks.length % colorPalette.length],
      icon: modernIcons[blocks.length % modernIcons.length],
      isComplete: false,
      attachments: [],
      tags: [],
      lastModified: new Date()
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleBlockUpdate = (blockId: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, content, isComplete: content.trim().length > 10, lastModified: new Date() }
        : block
    ));
  };

  const handleBlockCustomize = (blockId: string, updates: Partial<ReportBlock>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates, lastModified: new Date() } : block
    ));
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  const handleDuplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find(b => b.id === blockId);
    if (blockToDuplicate) {
      const duplicatedBlock: ReportBlock = {
        ...blockToDuplicate,
        id: Date.now().toString(),
        title: `${blockToDuplicate.title} (copia)`,
        lastModified: new Date()
      };
      setBlocks(prev => [...prev, duplicatedBlock]);
    }
  };

  const handleOpenAIChat = (blockId?: string) => {
    setSelectedBlockForAI(blockId || null);
    setShowAIChat(true);
  };

  const handleAIResponse = (response: string, targetBlockId?: string) => {
    if (targetBlockId) {
      handleBlockUpdate(targetBlockId, response);
    } else if (selectedBlockForAI) {
      const currentBlock = blocks.find(b => b.id === selectedBlockForAI);
      if (currentBlock) {
        const newContent = currentBlock.content + (currentBlock.content ? '\n\n' : '') + response;
        handleBlockUpdate(selectedBlockForAI, newContent);
      }
    }
    setShowAIChat(false);
    setSelectedBlockForAI(null);
  };

  const handleCompleteReport = () => {
    setReportCompleted(true);
    onReportCompleted?.();
  };

  const handleShareReport = () => {
    setReportShared(true);
    onReportShared?.();
  };

  const handleAddQuickText = (blockId: string, text: string) => {
    const currentBlock = blocks.find(b => b.id === blockId);
    if (currentBlock) {
      const newContent = currentBlock.content + (currentBlock.content ? '\n• ' : '• ') + text;
      handleBlockUpdate(blockId, newContent);
    }
  };

  const filteredBlocks = blocks.filter(block => 
    !searchTerm || 
    block.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4 max-w-full overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header con search e progress */}
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Referto Personalizzabile</h2>
                <p className="text-slate-600 font-medium">{patientName} • {new Date().toLocaleDateString('it-IT')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Cerca nel referto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
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
          
          {blocks.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">Sezioni completate ({blocks.filter(b => b.isComplete).length}/{blocks.length})</span>
                <span className="text-slate-900">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3 bg-slate-200" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Editor principale */}
        <div className="xl:col-span-2 space-y-6">
          {/* Controlli principali */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <Button 
                  onClick={() => handleOpenAIChat()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg h-12"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat AI
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateSelector(true)}
                  className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 h-12"
                >
                  <Layout className="w-5 h-5 mr-2" />
                  Template
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowDictionary(true)}
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 h-12"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Dizionario
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 h-12"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  {showPreview ? 'Nascondi' : 'Mostra'} Preview
                </Button>

                <Button 
                  variant="outline"
                  className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 h-12"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Dettato
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sezioni del referto */}
          <div className="space-y-4">
            {filteredBlocks.length === 0 && blocks.length === 0 ? (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Crea il tuo referto personalizzato</h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    Aggiungi sezioni personalizzate, utilizza l'AI per suggerimenti intelligenti e crea referti su misura per ogni paziente.
                  </p>
                  <Button
                    onClick={handleAddSection}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg h-14 px-8 text-lg"
                  >
                    <Plus className="w-6 h-6 mr-3" />
                    Aggiungi Prima Sezione
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {filteredBlocks.map((block, index) => (
                  <ReportBlock
                    key={block.id}
                    block={block}
                    onUpdate={handleBlockUpdate}
                    onCustomize={handleBlockCustomize}
                    onDelete={handleDeleteBlock}
                    onDuplicate={() => handleDuplicateBlock(block.id)}
                    onAIChat={() => handleOpenAIChat(block.id)}
                    onAddQuickText={(text) => handleAddQuickText(block.id, text)}
                    quickChecklist={quickChecklist}
                    suggestedTags={suggestedTags}
                    canDelete={true}
                  />
                ))}
                
                <Button
                  onClick={handleAddSection}
                  variant="outline"
                  className="w-full h-16 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-600"
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Aggiungi Nuova Sezione
                </Button>
              </>
            )}
          </div>

          {/* Azioni finali */}
          {blocks.length > 0 && (
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
                        <Clock className="w-6 h-6 mr-3" />
                        <span className="font-semibold text-lg">Almeno una sezione deve essere compilata</span>
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
          )}
        </div>

        {/* Sidebar con Preview */}
        <div className="space-y-6">
          {/* Preview Live */}
          {showPreview && blocks.length > 0 && (
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
                    blocks={filteredBlocks}
                    patientName={patientName}
                    mode={previewMode}
                    isLive={true}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Assistant Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Assistente AI Medico</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Chiedi suggerimenti diagnostici, interpretazioni o aiuto nella stesura del referto
                </p>
                <Button
                  onClick={() => handleOpenAIChat()}
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Apri Chat AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modali */}
      <MedicalAIChat
        isOpen={showAIChat}
        onClose={() => {
          setShowAIChat(false);
          setSelectedBlockForAI(null);
        }}
        onResponse={handleAIResponse}
        patientName={patientName}
        selectedBlockId={selectedBlockForAI}
      />

      <MedicalDictionary
        isOpen={showDictionary}
        onClose={() => setShowDictionary(false)}
      />

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={(template) => {
          const newBlock: ReportBlock = {
            id: Date.now().toString(),
            type: 'custom',
            title: template?.title || 'Nuova Sezione',
            content: template?.content || '',
            color: template?.color || colorPalette[blocks.length % colorPalette.length],
            icon: template?.icon || modernIcons[blocks.length % modernIcons.length],
            isComplete: false,
            attachments: [],
            tags: [],
            lastModified: new Date()
          };
          setBlocks(prev => [...prev, newBlock]);
        }}
      />
    </div>
  );
};

export default ReportEditor;
