
import React, { useState } from 'react';
import { Search, Plus, User, Chip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PatientsAppProps {
  onPatientSelected?: (patientName?: string) => void;
}

const PatientsApp = ({ onPatientSelected }: PatientsAppProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data pazienti
  const patients = [
    { id: 1, name: 'Luna', owner: 'Maria Rossi', chip: '123456789012345', type: 'Cane', age: '3 anni', image: null },
    { id: 2, name: 'Micio', owner: 'Giuseppe Bianchi', chip: '543210987654321', type: 'Gatto', age: '5 anni', image: null },
    { id: 3, name: 'Rex', owner: 'Anna Verdi', chip: '678901234567890', type: 'Cane', age: '7 anni', image: null },
    { id: 4, name: 'Whiskers', owner: 'Paolo Neri', chip: '456789012345678', type: 'Gatto', age: '2 anni', image: null },
    { id: 5, name: 'Buddy', owner: 'Elena Blu', chip: '789012345678901', type: 'Cane', age: '4 anni', image: null }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientSelect = (patient: any) => {
    onPatientSelected?.(patient.name);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header con ricerca e pulsante nuovo */}
      <div className="bg-white border-b border-slate-200 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Pazienti</h1>
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          >
            <Plus className="w-6 h-6 text-white" />
          </Button>
        </div>
        
        {/* Barra di ricerca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Cerca per nome paziente o proprietario..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base border-slate-300 rounded-xl"
          />
        </div>
      </div>

      {/* Lista pazienti */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredPatients.map((patient) => (
          <Card 
            key={patient.id}
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-slate-200"
            onClick={() => handlePatientSelect(patient)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* Avatar paziente */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                
                {/* Info paziente */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-slate-800 truncate">{patient.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {patient.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">Proprietario: {patient.owner}</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Chip className="w-3 h-3 mr-1" />
                    <span className="font-mono">{patient.chip}</span>
                    <span className="mx-2">•</span>
                    <span>{patient.age}</span>
                  </div>
                </div>

                {/* Freccia indicativa */}
                <div className="w-6 h-6 text-slate-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Nessun paziente trovato</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsApp;
