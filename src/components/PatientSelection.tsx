
import React, { useState } from 'react';
import { Search, Plus, Calendar, User, X, ChevronRight, Heart, Stethoscope, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  microchip?: string;
  ownerName: string;
  ownerContact: string;
  veterinarian: string;
  lastVisit: string;
  notes?: string;
}

interface PatientSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientSelected: (patient?: Patient) => void;
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Luna',
    species: 'Cane',
    breed: 'Labrador Retriever',
    age: '3 anni',
    microchip: '900108001234567',
    ownerName: 'Maria Rossi',
    ownerContact: '+39 340 1234567',
    veterinarian: 'Dr. Mario Rossi',
    lastVisit: '2024-06-20',
    notes: 'Paziente docile, allergia ai polli'
  },
  {
    id: '2',
    name: 'Rex',
    species: 'Cane',
    breed: 'Pastore Tedesco',
    age: '7 anni',
    microchip: '900108001234568',
    ownerName: 'Giovanni Bianchi',
    ownerContact: '+39 347 9876543',
    veterinarian: 'Dr. Laura Verdi',
    lastVisit: '2024-06-15',
    notes: 'Controllo cardiaco periodico'
  },
  {
    id: '3',
    name: 'Mimì',
    species: 'Gatto',
    breed: 'Persiano',
    age: '5 anni',
    microchip: '900108001234569',
    ownerName: 'Anna Neri',
    ownerContact: '+39 335 5555555',
    veterinarian: 'Dr. Mario Rossi',
    lastVisit: '2024-06-10',
    notes: 'Paziente nervoso, necessita sedazione leggera'
  },
  {
    id: '4',
    name: 'Charlie',
    species: 'Cane',
    breed: 'Golden Retriever',
    age: '2 anni',
    ownerName: 'Luca Ferrari',
    ownerContact: '+39 348 1111111',
    veterinarian: 'Dr. Laura Verdi',
    lastVisit: '2024-06-25',
    notes: 'Primo controllo post-operatorio'
  }
];

const PatientSelection = ({ isOpen, onClose, onPatientSelected }: PatientSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [veterinarianFilter, setVeterinarianFilter] = useState('');

  const form = useForm({
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: '',
      microchip: '',
      ownerName: '',
      ownerContact: '',
      veterinarian: '',
      notes: ''
    }
  });

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.microchip?.includes(searchTerm);
    
    const matchesVet = !veterinarianFilter || patient.veterinarian.includes(veterinarianFilter);
    
    return matchesSearch && matchesVet;
  });

  const handlePatientSelect = (patient: Patient) => {
    onPatientSelected(patient);
    onClose();
  };

  const handleNewPatientSubmit = (data: any) => {
    const newPatient: Patient = {
      id: Date.now().toString(),
      ...data,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    onPatientSelected(newPatient);
    onClose();
  };

  const getSpeciesIcon = (species: string) => {
    return species.toLowerCase().includes('gatto') ? <Heart className="w-4 h-4" /> : <PawPrint className="w-4 h-4" />;
  };

  if (showNewPatientForm) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-blue-800">Nuovo Paziente</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNewPatientForm(false)}
                className="h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
              {/* Colonna 1: Dati Animale */}
              <div className="w-80 space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <PawPrint className="w-5 h-5 mr-2" />
                    Dati Animale
                  </h3>
                  <Form {...form}>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Animale</FormLabel>
                            <FormControl>
                              <Input placeholder="Es. Luna" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="species"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specie</FormLabel>
                            <FormControl>
                              <Input placeholder="Es. Cane" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="breed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Razza</FormLabel>
                            <FormControl>
                              <Input placeholder="Es. Labrador" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Età</FormLabel>
                            <FormControl>
                              <Input placeholder="Es. 3 anni" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Form>
                </div>
              </div>

              {/* Colonna 2: Identificazione */}
              <div className="w-80 space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2" />
                    Identificazione
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="microchip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Microchip</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. 900108001234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Colonna 3: Proprietario */}
              <div className="w-80 space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Proprietario
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome e Cognome</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Mario Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ownerContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contatto</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. +39 340 1234567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Colonna 4: Informazioni Cliniche */}
              <div className="w-80 space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Info Cliniche
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="veterinarian"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medico Curante</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Dr. Mario Rossi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note Iniziali</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Note cliniche iniziali..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowNewPatientForm(false)}>
              Annulla
            </Button>
            <Button onClick={form.handleSubmit(handleNewPatientSubmit)} className="bg-blue-600 hover:bg-blue-700">
              Crea Paziente e Continua
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800">Seleziona o Crea Paziente</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {/* Filtri e Ricerca */}
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-lg mb-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Cerca per nome, proprietario o microchip..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Input
                placeholder="Filtra per veterinario"
                value={veterinarianFilter}
                onChange={(e) => setVeterinarianFilter(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowNewPatientForm(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuovo Paziente
            </Button>
          </div>

          {/* Lista Pazienti */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
              {filteredPatients.map((patient) => (
                <Card
                  key={patient.id}
                  className="w-80 cursor-pointer hover:shadow-lg transition-shadow bg-white"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        {getSpeciesIcon(patient.species)}
                        <span className="ml-2">{patient.name}</span>
                      </CardTitle>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{patient.species}</Badge>
                      <span className="text-sm text-slate-600">{patient.age}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700">{patient.breed}</p>
                      <p className="text-sm text-slate-500">Proprietario: {patient.ownerName}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center text-sm text-slate-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(patient.lastVisit).toLocaleDateString('it-IT')}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {patient.veterinarian}
                      </Badge>
                    </div>
                    {patient.notes && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                        {patient.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annulla
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientSelection;
