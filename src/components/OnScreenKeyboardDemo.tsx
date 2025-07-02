
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import OnScreenKeyboard from './OnScreenKeyboard';
import { useOnScreenKeyboard } from '@/hooks/useOnScreenKeyboard';

const OnScreenKeyboardDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    notes: ''
  });

  const { 
    isVisible, 
    hideKeyboard, 
    handleKeyPress, 
    keyboardRef 
  } = useOnScreenKeyboard({
    onKeyPress: (key, inputRef) => {
      console.log('Key pressed:', key, 'on input:', inputRef?.name);
    },
    dismissOnOutsideClick: true
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Demo Tastiera On-Screen
          </h1>
          <p className="text-slate-600">
            Tocca qualsiasi campo di testo per attivare la tastiera virtuale
          </p>
          {isVisible && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Tastiera attiva
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informazioni Personali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Es. Mario Rossi"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="mario.rossi@example.com"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messaggio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="message">Testo Principale</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  placeholder="Scrivi il tuo messaggio qui..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="notes">Note Aggiuntive</Label>
                <Input
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Anteprima Dati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div><strong>Nome:</strong> {formData.name || 'Non inserito'}</div>
              <div><strong>Email:</strong> {formData.email || 'Non inserita'}</div>
              <div><strong>Messaggio:</strong> {formData.message || 'Non inserito'}</div>
              <div><strong>Note:</strong> {formData.notes || 'Non inserite'}</div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-slate-500 space-y-1">
          <p>💡 Tocca un campo di testo per vedere la tastiera virtuale</p>
          <p>✨ Tocca fuori dalla tastiera per nasconderla</p>
          <p>🎯 La tastiera riapparirà automaticamente quando rifocalizzi un campo</p>
        </div>
      </div>

      {/* On-Screen Keyboard */}
      <div ref={keyboardRef}>
        <OnScreenKeyboard
          isVisible={isVisible}
          onKeyPress={handleKeyPress}
          onClose={hideKeyboard}
        />
      </div>

      {/* Content spacer when keyboard is visible */}
      {isVisible && (
        <div className="h-80 transition-all duration-300 ease-in-out" />
      )}
    </div>
  );
};

export default OnScreenKeyboardDemo;
