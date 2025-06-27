import React, { useState } from 'react';
import { Bot, Trash2, GripVertical, AlertCircle, CheckCircle, Sparkles, Palette, ImageIcon, MessageCircle, Edit3, MessageSquare, Copy, Camera, Video, Table, Mic, Clock, Tag, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ReportBlockProps {
  block: {
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
  };
  onUpdate: (id: string, content: string) => void;
  onCustomize: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onAIChat?: () => void;
  onAddQuickText?: (text: string) => void;
  quickChecklist?: string[];
  suggestedTags?: string[];
  canDelete?: boolean;
}

const ReportBlock = ({ 
  block, 
  onUpdate, 
  onCustomize, 
  onDelete, 
  onDuplicate,
  onAIChat, 
  onAddQuickText,
  quickChecklist = [],
  suggestedTags = [],
  canDelete = true 
}: ReportBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(block.title);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [imageComment, setImageComment] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const colors = [
    { name: 'Blu', value: 'bg-blue-500', border: 'border-blue-200', bg: 'bg-blue-50' },
    { name: 'Verde', value: 'bg-green-500', border: 'border-green-200', bg: 'bg-green-50' },
    { name: 'Viola', value: 'bg-purple-500', border: 'border-purple-200', bg: 'bg-purple-50' },
    { name: 'Rosso', value: 'bg-red-500', border: 'border-red-200', bg: 'bg-red-50' },
    { name: 'Arancio', value: 'bg-orange-500', border: 'border-orange-200', bg: 'bg-orange-50' },
    { name: 'Rosa', value: 'bg-pink-500', border: 'border-pink-200', bg: 'bg-pink-50' },
    { name: 'Indaco', value: 'bg-indigo-500', border: 'border-indigo-200', bg: 'bg-indigo-50' },
    { name: 'Teal', value: 'bg-teal-500', border: 'border-teal-200', bg: 'bg-teal-50' }
  ];

  const modernIcons = ['🔍', '🫀', '🧠', '🦴', '🩺', '📋', '💊', '🩹', '📝', '⚕️', '🔬', '🎯', '📊', '💡', '🧪', '📈'];

  const getConfidenceBadge = (confidence?: string) => {
    if (!confidence) return null;
    
    const styles = {
      high: 'bg-green-100 text-green-700 border-green-300',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      low: 'bg-red-100 text-red-700 border-red-300'
    };
    
    return (
      <Badge className={`${styles[confidence]} border`}>
        <Bot className="w-3 h-3 mr-1" />
        AI {confidence === 'high' ? 'Alta' : confidence === 'medium' ? 'Media' : 'Bassa'}
      </Badge>
    );
  };

  const handleSuggest = () => {
    setIsSuggesting(true);
    
    setTimeout(() => {
      const suggestions = [
        "Il quadro ecografico presenta caratteristiche morfologiche nella norma per età e specie.",
        "Le strutture anatomiche esaminate mostrano dimensioni e ecogenicità appropriate.",
        "Non si evidenziano alterazioni strutturali significative nell'area esaminata.",
        "La funzionalità degli organi appare preservata e coerente con i parametri fisiologici.",
        "Si consiglia monitoraggio periodico per controllo evolutivo del quadro clinico."
      ];
      
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      onUpdate(block.id, block.content + (block.content ? '\n\n' : '') + randomSuggestion);
      setIsSuggesting(false);
    }, 1500);
  };

  const handleTitleSave = () => {
    onCustomize(block.id, { title: localTitle });
    setIsEditing(false);
  };

  const handleAddTag = (tag: string) => {
    const currentTags = block.tags || [];
    if (!currentTags.includes(tag)) {
      onCustomize(block.id, { tags: [...currentTags, tag] });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = block.tags || [];
    onCustomize(block.id, { tags: currentTags.filter(tag => tag !== tagToRemove) });
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording functionality
    if (!isRecording) {
      setTimeout(() => {
        const mockTranscript = "Testo trascritto dal dettato vocale...";
        onUpdate(block.id, block.content + (block.content ? '\n\n' : '') + mockTranscript);
        setIsRecording(false);
      }, 3000);
    }
  };

  const colorConfig = colors.find(c => c.value === block.color) || colors[0];

  return (
    <Card className={`group transition-all duration-300 shadow-lg border-0 hover:shadow-xl ${
      block.isComplete ? `${colorConfig.border} ${colorConfig.bg}` : 'border-slate-200 bg-white'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GripVertical className="w-5 h-5 text-slate-400 cursor-move hover:text-slate-600 transition-colors" />
            <div className={`w-12 h-12 ${block.color} rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105`}>
              <span className="text-xl">{block.icon}</span>
            </div>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={localTitle}
                  onChange={(e) => setLocalTitle(e.target.value)}
                  className="font-semibold text-slate-800 text-lg min-w-48"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTitleSave();
                    if (e.key === 'Escape') setIsEditing(false);
                  }}
                />
                <Button size="sm" onClick={handleTitleSave} className="bg-green-500 hover:bg-green-600 text-white">
                  ✓
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                  ✕
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CardTitle 
                  className="text-slate-800 cursor-pointer hover:text-blue-600 transition-colors text-lg"
                  onClick={() => setIsEditing(true)}
                >
                  {localTitle}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Tags */}
            {block.tags && block.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                {block.tags.slice(0, 2).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
                {block.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                    +{block.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Last modified indicator */}
            {block.lastModified && (
              <div className="flex items-center text-xs text-slate-500">
                <Clock className="w-3 h-3 mr-1" />
                {block.lastModified.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}

            {/* Action buttons - visible on hover */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onDuplicate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDuplicate(block.id)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  title="Duplica sezione"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              )}
              
              {onAIChat && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAIChat}
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  title="Chiedi all'AI"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              )}
              
              <Popover open={showCustomization} onOpenChange={setShowCustomization}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700" title="Personalizza">
                    <Palette className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Colore</label>
                      <div className="grid grid-cols-4 gap-2">
                        {colors.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => onCustomize(block.id, { color: color.value })}
                            className={`w-8 h-8 ${color.value} rounded-lg border-2 ${
                              block.color === color.value ? 'border-slate-800 ring-2 ring-slate-300' : 'border-slate-200'
                            } hover:scale-110 transition-transform`}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Icona</label>
                      <div className="grid grid-cols-8 gap-2">
                        {modernIcons.map((icon) => (
                          <button
                            key={icon}
                            onClick={() => onCustomize(block.id, { icon })}
                            className={`w-8 h-8 rounded-lg border-2 ${
                              block.icon === icon ? 'border-slate-800 bg-slate-100' : 'border-slate-200'
                            } hover:bg-slate-50 transition-colors flex items-center justify-center text-lg`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {canDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(block.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Elimina sezione"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {getConfidenceBadge(block.aiConfidence)}
            {block.isComplete ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-500" />
            )}
          </div>
        </div>

        {/* Tags management */}
        {suggestedTags.length > 0 && (
          <div className="flex items-center space-x-2 mt-2">
            <Tag className="w-4 h-4 text-slate-500" />
            <div className="flex flex-wrap gap-1">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                    block.tags?.includes(tag)
                      ? 'bg-blue-100 text-blue-700 border-blue-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          placeholder={`Inserisci il contenuto per ${localTitle.toLowerCase()}...`}
          value={block.content}
          onChange={(e) => onUpdate(block.id, e.target.value)}
          className="min-h-40 text-sm leading-relaxed resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400"
        />
        
        {/* Integrated media upload and quick actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            {/* Media uploads */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Handle image upload
                  console.log('Image upload:', e.target.files?.[0]);
                }}
              />
              <Button size="sm" variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                <Camera className="w-3 h-3 mr-1" />
                Immagine
              </Button>
            </label>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  // Handle video upload
                  console.log('Video upload:', e.target.files?.[0]);
                }}
              />
              <Button size="sm" variant="outline" className="text-xs bg-purple-50 border-purple-200 text-purple-700">
                <Video className="w-3 h-3 mr-1" />
                Video
              </Button>
            </label>

            {/* Voice recording */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleVoiceRecording}
              className={`text-xs ${
                isRecording 
                  ? 'bg-red-100 border-red-300 text-red-700 animate-pulse' 
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}
            >
              <Mic className="w-3 h-3 mr-1" />
              {isRecording ? 'Recording...' : 'Dettato'}
            </Button>

            {/* Quick checklist */}
            {quickChecklist.length > 0 && (
              <Popover open={showChecklist} onOpenChange={setShowChecklist}>
                <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="text-xs bg-orange-50 border-orange-200 text-orange-700">
                    <List className="w-3 h-3 mr-1" />
                    Checklist
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-slate-700">Aggiungi rapidamente:</h4>
                    {quickChecklist.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onAddQuickText?.(item);
                          setShowChecklist(false);
                        }}
                        className="block w-full text-left p-2 text-xs rounded hover:bg-slate-50 border border-slate-200"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={handleSuggest}
              disabled={isSuggesting}
              className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-pink-100"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {isSuggesting ? 'Suggerendo...' : 'AI Suggerimenti'}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">
              {block.content.length} caratteri
            </span>
          </div>
        </div>

        {/* Attachments preview */}
        {block.attachments && block.attachments.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Allegati</label>
            <div className="flex flex-wrap gap-2">
              {block.attachments.map((attachment, index) => (
                <div key={index} className="relative group">
                  <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-200">
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Commento per le immagini..."
                value={imageComment}
                onChange={(e) => setImageComment(e.target.value)}
                className="text-sm"
              />
              <Button size="sm" variant="outline">
                <MessageCircle className="w-3 h-3 mr-1" />
                Aggiungi
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportBlock;
