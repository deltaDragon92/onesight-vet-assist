
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Paperclip, X, Image, Video, MessageCircle, Download } from 'lucide-react';

interface MediaAttachment {
  id: string;
  type: 'image' | 'video';
  file: File;
  name: string;
  size: number;
  timestamp: Date;
  comment?: string;
}

interface MediaAttachmentsProps {
  attachments: MediaAttachment[];
  onRemove: (id: string) => void;
}

const MediaAttachments = ({ attachments, onRemove }: MediaAttachmentsProps) => {
  const [comments, setComments] = useState<{[key: string]: string}>({});

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCommentChange = (id: string, comment: string) => {
    setComments(prev => ({ ...prev, [id]: comment }));
  };

  if (attachments.length === 0) return null;

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Paperclip className="w-5 h-5 text-blue-600" />
          <span>Allegati Multimediali ({attachments.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    attachment.type === 'image' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {attachment.type === 'image' ? (
                      <Image className={`w-6 h-6 ${attachment.type === 'image' ? 'text-blue-600' : 'text-purple-600'}`} />
                    ) : (
                      <Video className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm truncate max-w-32">
                      {attachment.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <span>{formatFileSize(attachment.size)}</span>
                      <span>•</span>
                      <span>{attachment.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className={`text-xs ${
                    attachment.type === 'image' ? 'border-blue-200 text-blue-700' : 'border-purple-200 text-purple-700'
                  }`}>
                    {attachment.type === 'image' ? '📷' : '🎥'} {attachment.type.toUpperCase()}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(attachment.id)}
                    className="w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {/* Preview placeholder */}
              <div className="w-full h-24 bg-slate-200 rounded-lg mb-3 flex items-center justify-center">
                {attachment.type === 'image' ? (
                  <Image className="w-8 h-8 text-slate-400" />
                ) : (
                  <Video className="w-8 h-8 text-slate-400" />
                )}
              </div>
              
              {/* Comment section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Aggiungi commento diagnostico..."
                    value={comments[attachment.id] || ''}
                    onChange={(e) => handleCommentChange(attachment.id, e.target.value)}
                    className="text-sm"
                  />
                  <Button size="sm" variant="outline" className="text-xs">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Salva
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                    <Download className="w-3 h-3 mr-1" />
                    Scarica
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-green-600 hover:text-green-700">
                    Inserisci nel referto
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaAttachments;
