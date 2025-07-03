
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Image, Video, FileText, Sparkles, Stethoscope, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface MedicalAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onResponse: (response: string, targetBlockId?: string) => void;
  patientName: string;
  selectedBlockId?: string | null;
}

const MedicalAIChat = ({ isOpen, onClose, onResponse, patientName, selectedBlockId }: MedicalAIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Ciao! Sono il tuo assistente AI medico specializzato in diagnostica veterinaria. Posso aiutarti con:

🔍 **Interpretazione di referti ecografici**
📋 **Suggerimenti diagnostici** 
💊 **Raccomandazioni terapeutiche**
📚 **Consultazione di linee guida veterinarie**
🎯 **Analisi di casi clinici**

Come posso assisterti oggi per ${patientName}?`,
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, patientName);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string, patient: string): string => {
    const responses = [
      `Per ${patient}, basandomi sui dati clinici, suggerisco di valutare:

**CUORE**: Strutture cardiache nella norma, funzione sistolica conservata (FE ~65%)
- Atri di dimensioni regolari
- Apparato valvolare competente
- Flussi emodinamici fisiologici

**RACCOMANDAZIONI**:
- Controllo ecocardiografico in 6-12 mesi
- Monitoraggio clinico regolare
- Mantenere attuale protocollo se in terapia

Vuoi che approfondisca qualche aspetto specifico?`,

      `Analizzando il caso di ${patient}, il quadro ecografico suggerisce:

**ADDOME**:
- Fegato: dimensioni regolari, ecostruttura omogenea
- Reni: morfologia nella norma bilateralmente
- Vescica: contenuto anecogeno, pareti regolari

**INTERPRETAZIONE**:
Il quadro è compatibile con normalità per età e specie. Non si evidenziano alterazioni strutturali significative.

**FOLLOW-UP**:
- Rivalutazione clinica in base ai sintomi
- Controllo ecografico se indicazione clinica

Posso aiutarti con la stesura del referto?`,

      `Per il paziente ${patient}, considerando i reperti ecografici:

**VALUTAZIONE DIAGNOSTICA**:
- Assenza di versamenti patologici
- Organi addominali di dimensioni appropriate
- Vascolarizzazione conservata
- Peristalsi intestinale presente

**CONCLUSIONI**:
Quadro ecografico sostanzialmente nella norma. Si consiglia:
1. Monitoraggio clinico periodico
2. Ripetere ecografia se comparsa sintomi
3. Mantenere protocollo terapeutico attuale

Vuoi che generi il testo completo per una sezione specifica del referto?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleInsertIntoReport = (content: string) => {
    onResponse(content, selectedBlockId || undefined);
    onClose();
  };

  const quickPrompts = [
    "Interpreta questi reperti ecografici",
    "Suggerisci diagnosi differenziali",
    "Aiutami con le raccomandazioni terapeutiche",
    "Genera un referto completo",
    "Analizza questo caso clinico"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl">Chat AI Medica</span>
                <p className="text-sm text-slate-600 font-normal">Assistente per diagnostica veterinaria</p>
              </div>
            </DialogTitle>
            
          </div>
          
          {selectedBlockId && (
            <Badge className="bg-blue-100 text-blue-700 border-blue-300 w-fit">
              <FileText className="w-3 h-3 mr-1" />
              Inserimento in sezione attiva
            </Badge>
          )}
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <Card className={`${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border-slate-200'
                  } shadow-sm`}>
                    <CardContent className="p-4">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-slate-100">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyMessage(message.id, message.content)}
                            className="text-slate-500 hover:text-slate-700"
                          >
                            {copiedMessageId === message.id ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            {copiedMessageId === message.id ? 'Copiato!' : 'Copia'}
                          </Button>
                          
                          <Button
                            size="sm"
                            onClick={() => handleInsertIntoReport(message.content)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Inserisci nel Referto
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`text-xs text-slate-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-slate-500">L'AI sta scrivendo...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-6 py-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(prompt)}
                className="text-xs bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-pink-100"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 pt-4 border-t">
          <div className="flex items-end space-x-3">
            <div className="flex-1 space-y-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Scrivi la tua domanda medica per ${patientName}...`}
                className="min-h-12 text-sm resize-none border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-500">
                  <Image className="w-4 h-4 mr-1" />
                  Immagine
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-500">
                  <Video className="w-4 h-4 mr-1" />
                  Video
                </Button>
              </div>
            </div>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalAIChat;
