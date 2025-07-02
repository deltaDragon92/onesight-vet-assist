
import React, { useState, useRef } from 'react';
import { FileText, Plus, Eye, Share2, CheckCircle, Bot, Search, Clock, Camera, Video, Palette, Layout, Upload, MessageSquare, Sparkles, BookOpen, Copy, Mic } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    notes: ''
  });

  // Refs for input fields
  const searchRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const notesRef = useRef<HTMLInputElement>(null);

  const completionPercentage = blocks.length > 0
    ? Math.round((blocks.filter(b => b.isComplete).length / blocks.length) * 100)
    : 0;
  const canComplete = blocks.length > 0 && blocks.some(b => b.isComplete);

  const modernIcons = ['🔍', '🫀', '🧠', '🦴', '🩺', '📋', '💊', '🩹', '📝', '⚕️', '🔬', '🎯', '📊', '💡', '🧪', '📈'];
  const colorPalette = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500',
    'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  const suggestedTags = ['cardiaco', 'addome', 'neurologico', 'respiratorio', 'muscolo-scheletrico', 'dermatologico'];
  const quickChecklist = [
    'Nessuna anomalia visiva rilevata', 'Flusso sanguigno regolare',
    'Strutture anatomiche nella norma', 'Dimensioni appropriate per età e specie',
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

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

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
                  ref={searchRef}
                  placeholder="Cerca nel referto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Clock className="w-3 h-3 mr-1" />
                {completionPercentage}% completato
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form inputs section */}
      <Card className="bg-white shadow-lg border-0">
        <CardHeader>
          <CardTitle>Informazioni Paziente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <Input
              ref={nameRef}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Es. Mario Rossi"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="mario.rossi@example.com"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Messaggio
            </label>
            <Textarea
              ref={messageRef}
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange('message')}
              placeholder="Scrivi il tuo messaggio qui..."
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <Input
              ref={notesRef}
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange('notes')}
              placeholder="Note brevi..."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleAddSection} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi Sezione
        </Button>
      </div>
    </div>
  );
};

export default ReportEditor;
