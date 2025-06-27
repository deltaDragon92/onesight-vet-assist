
import React, { useState } from 'react';
import { Bot, Trash2, GripVertical, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface ReportBlockProps {
  block: {
    id: string;
    type: 'exam' | 'anatomy' | 'diagnosis' | 'followup' | 'custom';
    title: string;
    content: string;
    aiConfidence?: 'low' | 'medium' | 'high';
    isComplete: boolean;
    isRequired: boolean;
  };
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

const ReportBlock = ({ block, onUpdate, onDelete }: ReportBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(block.title);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const getBlockIcon = (type: string) => {
    const icons = {
      exam: '🔍',
      anatomy: '🫀',
      diagnosis: '📋',
      followup: '📅',
      custom: '📝'
    };
    return icons[type] || '📝';
  };

  const getConfidenceBadge = (confidence?: string) => {
    if (!confidence) return null;
    
    const styles = {
      high: 'bg-green-50 text-green-700 border-green-200',
      medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      low: 'bg-red-50 text-red-700 border-red-200'
    };
    
    return (
      <Badge className={styles[confidence]}>
        <Bot className="w-3 h-3 mr-1" />
        AI {confidence === 'high' ? 'Alta' : confidence === 'medium' ? 'Media' : 'Bassa'}
      </Badge>
    );
  };

  const handleSuggest = () => {
    setIsSuggesting(true);
    
    // Simula suggerimento AI
    setTimeout(() => {
      const suggestions = {
        exam: "Metodica ecografica standard con sonda lineare e convessa. Paziente posizionato in decubito laterale sinistro.",
        anatomy: "Strutture cardiache: ventricolo sinistro di dimensioni normali, funzione sistolica conservata. Atrii di dimensioni regolari.",
        diagnosis: "Quadro ecocardiografico nella norma per età e specie. Non alterazioni strutturali significative.",
        followup: "Controllo ecocardiografico consigliato tra 6-12 mesi. Mantenere monitoraggio clinico."
      };
      
      const newContent = suggestions[block.type] || "Contenuto suggerito dall'AI";
      onUpdate(block.id, block.content + (block.content ? '\n\n' : '') + newContent);
      setIsSuggesting(false);
    }, 1500);
  };

  return (
    <Card className={`transition-all duration-200 ${
      block.isComplete ? 'border-green-200 bg-green-50/30' : 
      block.isRequired ? 'border-orange-200 bg-orange-50/30' : 'border-slate-200'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
            <span className="text-lg">{getBlockIcon(block.type)}</span>
            {isEditing ? (
              <Input
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                className="font-semibold text-slate-800 border-none p-0 h-auto"
                autoFocus
              />
            ) : (
              <CardTitle 
                className="text-slate-800 cursor-pointer hover:text-blue-600"
                onClick={() => setIsEditing(true)}
              >
                {localTitle}
              </CardTitle>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {getConfidenceBadge(block.aiConfidence)}
            {block.isRequired && (
              <Badge variant="outline" className="text-xs">
                Obbligatorio
              </Badge>
            )}
            {block.isComplete ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-500" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          placeholder={`Inserisci il contenuto per ${localTitle.toLowerCase()}...`}
          value={block.content}
          onChange={(e) => onUpdate(block.id, e.target.value)}
          className="min-h-32 text-sm leading-relaxed resize-none"
        />
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSuggest}
              disabled={isSuggesting}
              className="text-xs"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {isSuggesting ? 'Suggerendo...' : 'Suggerisci'}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">
              {block.content.length} caratteri
            </span>
            {!block.isRequired && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(block.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportBlock;
