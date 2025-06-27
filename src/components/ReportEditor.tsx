
import React, { useState } from 'react';
import { FileText, Plus, Eye, Share2, CheckCircle, Bot, Search, Clock, AlertCircle, Camera, Video, Palette, Layout, Upload, MessageSquare, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ReportBlock from './ReportBlock';
import ReportPreview from './ReportPreview';
import MedicalAIChat from './MedicalAIChat';
import MediaAttachments from './MediaAttachments';
import TemplateSelector from './TemplateSelector';

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

  const completionPercentage = blocks.length > 0 ? Math.round((blocks.filter(b => b.isComplete).length / blocks.length) * 100) : 0;
  const canComplete = blocks.length > 0 && blocks.every(b => b.isComplete);

  const defaultColors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-slate-500'
  ];

  const defaultIcons = ['🔍', '🫀', '🧠', '🦴', '🩺', '📋', '📅', '💊', '🩹', '📝', '⚕️', '🔬'];

  const handleAddSection = () => {
    const newBlock: ReportBlock = {
      id: Date.now().toString(),
      type: 'custom',
      title: 'Nuova Sezione',
      content: '',
      color: defaultColors[blocks.length % defaultColors.length],
      icon: defaultIcons[blocks.length % defaultIcons.length],
      isComplete: false,
      attachments: []
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleBlockUpdate = (blockId: string, content: string) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, content, isComplete: content.trim().length > 10 }
        : block
    ));
  };

  const handleBlockCustomize = (blockId: string, updates: Partial<ReportBlock>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
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

  const handleOpenAIChat = (blockId?: string) => {
    setSelectedBlockForAI(blockId || null);
    setShowAIChat(true);
  };

  const handleAIResponse = (response: string, targetBlockId?: string) => {
    if (targetBlockId) {
      // Insert AI response into specific block
      handleBlockUpdate(targetBlockId, response);
    } else if (selectedBlockForAI) {
      // Insert into selected block
      const currentBlock = blocks.find(b => b.id === selectedBlockForAI);
      if (currentBlock) {
        const newContent = currentBlock.content + (currentBlock.content ? '\n\n' : '') + response;
        handleBlockUpdate(selectedBlockForAI, newContent);
      }
    } else {
      // Create new section with AI response
      const newBlock: ReportBlock = {
        id: Date.now().toString(),
        type: 'custom',
        title: 'Sezione AI',
        content: response,
        color: defaultColors[blocks.length % defaultColors.length],
        icon: '🧠',
        isComplete: true,
        attachments: []
      };
      setBlocks(prev => [...prev, newBlock]);
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
                <h2 className="text-2xl font-bold text-slate-800">Referto Personalizzabile</h2>
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
          
          {blocks.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700">Sezioni completate</span>
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
          {/* Controlli avanzati */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  onClick={() => handleOpenAIChat()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg h-12"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat AI Medica
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
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 h-12"
                >
                  <Search className="w-5 h-5 mr-2" />
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
              </div>
            </CardContent>
          </Card>

          {/* Sezioni del referto */}
          <div className="space-y-4">
            {blocks.length === 0 ? (
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
                {blocks.map((block, index) => (
                  <ReportBlock
                    key={block.id}
                    block={block}
                    onUpdate={handleBlockUpdate}
                    onCustomize={handleBlockCustomize}
                    onDelete={handleDeleteBlock}
                    onAIChat={() => handleOpenAIChat(block.id)}
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

          {/* Media Attachments */}
          {mediaAttachments.length > 0 && (
            <MediaAttachments 
              attachments={mediaAttachments}
              onRemove={(id) => setMediaAttachments(prev => prev.filter(a => a.id !== id))}
            />
          )}

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
                        <AlertCircle className="w-6 h-6 mr-3" />
                        <span className="font-semibold text-lg">Completare le sezioni</span>
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
                    blocks={blocks}
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

      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={(template) => {
          const newBlock: ReportBlock = {
            id: Date.now().toString(),
            type: 'custom',
            title: template?.title || 'Nuova Sezione',
            content: template?.content || '',
            color: template?.color || defaultColors[blocks.length % defaultColors.length],
            icon: template?.icon || defaultIcons[blocks.length % defaultIcons.length],
            isComplete: false,
            attachments: []
          };
          setBlocks(prev => [...prev, newBlock]);
        }}
      />
    </div>
  );
};

export default ReportEditor;
