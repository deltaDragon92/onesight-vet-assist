
import React, { useState } from 'react';
import { Bell, Shield, Palette, Download, Globe, User, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newExams: true,
    reports: true,
    training: false,
    system: true
  });
  
  const [preferences, setPreferences] = useState({
    autoSave: true,
    darkMode: false,
    language: 'it',
    quality: 'high'
  });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      style={{ scrollbarWidth: 'none' }}
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Impostazioni</h1>
        <p className="text-slate-600 dark:text-slate-300">Configura la tua esperienza OneSight</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <span>Profilo Utente</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-blue-600 dark:text-blue-300 font-semibold text-lg">MR</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">Dr. Mario Rossi</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">mario.rossi@clinicamilano.it</p>
              <p className="text-sm text-slate-500">Clinica Veterinaria Milano</p>
            </div>
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Cambia Foto
            </Button>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Specializzazione
              </label>
              <p className="text-sm text-slate-600 dark:text-slate-400">Medicina Interna, Cardiologia</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Licenza
              </label>
              <Badge className="bg-green-100 text-green-800">Premium • Scade 12/2024</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Notifiche</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Nuovi esami</p>
              <p className="text-sm text-slate-500">Ricevi notifiche per nuovi esami ecografici</p>
            </div>
            <Switch 
              checked={notifications.newExams}
              onCheckedChange={(checked) => setNotifications({...notifications, newExams: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Referti completati</p>
              <p className="text-sm text-slate-500">Notifica quando un referto è pronto</p>
            </div>
            <Switch 
              checked={notifications.reports}
              onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Formazione</p>
              <p className="text-sm text-slate-500">Nuovi corsi e contenuti di apprendimento</p>
            </div>
            <Switch 
              checked={notifications.training}
              onCheckedChange={(checked) => setNotifications({...notifications, training: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Sistema</p>
              <p className="text-sm text-slate-500">Aggiornamenti e manutenzione</p>
            </div>
            <Switch 
              checked={notifications.system}
              onCheckedChange={(checked) => setNotifications({...notifications, system: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-blue-600" />
            <span>Preferenze</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Salvataggio automatico</p>
              <p className="text-sm text-slate-500">Salva automaticamente durante gli esami</p>
            </div>
            <Switch 
              checked={preferences.autoSave}
              onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Lingua
              </label>
              <select className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100">
                <option value="it">Italiano</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Qualità immagini
              </label>
              <select className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100">
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Bassa</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Privacy e Sicurezza</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Globe className="w-4 h-4 mr-2" />
            Gestisci consensi privacy
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="w-4 h-4 mr-2" />
            Scarica i tuoi dati
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <Shield className="w-4 h-4 mr-2" />
            Elimina account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
