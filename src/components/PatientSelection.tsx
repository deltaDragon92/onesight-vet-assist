import React, { useState } from 'react';
import { Search, Plus, Calendar, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Patient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  microchip: string;
  ownerName: string;
  veterinarian: string;
  lastVisit: string;
  notes: string;
}

interface PatientSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientSelected: (patient?: Patient) => void;
}

const veterinarians = ['Dr. Mario Rossi', 'Dr. Laura Verdi', 'Dr. Giuseppe Bianchi'];

export default function PatientSelection({ isOpen, onClose, onPatientSelected }: PatientSelectionProps) {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Luna',
      species: 'Cane',
      breed: 'Labrador Retriever',
      age: 3,
      microchip: '900108001234567',
      ownerName: 'Maria Rossi',
      veterinarian: 'Dr. Mario Rossi',
      lastVisit: '2024-06-20',
      notes: 'Paziente docile, allergia ai polli',
    },
    {
      id: '2',
      name: 'Rex',
      species: 'Cane',
      breed: 'Pastore Tedesco',
      age: 7,
      microchip: '900108001234568',
      ownerName: 'Giovanni Bianchi',
      veterinarian: 'Dr. Laura Verdi',
      lastVisit: '2024-06-15',
      notes: 'Controllo cardiaco periodico',
    },
    {
      id: '3',
      name: 'Mimì',
      species: 'Gatto',
      breed: 'Persiano',
      age: 5,
      microchip: '900108001234569',
      ownerName: 'Anna Neri',
      veterinarian: 'Dr. Mario Rossi',
      lastVisit: '2024-06-10',
      notes: 'Paziente nervoso, necessita sedazione leggera',
    },
    {
      id: '4',
      name: 'Charlie',
      species: 'Cane',
      breed: 'Golden Retriever',
      age: 2,
      microchip: '900108001234570',
      ownerName: 'Luca Ferrari',
      veterinarian: 'Dr. Laura Verdi',
      lastVisit: '2024-06-25',
      notes: 'Primo controllo post-operatorio',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [veterinarianFilter, setVeterinarianFilter] = useState('all');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState<Patient>({
    id: '',
    name: '',
    species: '',
    breed: '',
    age: 0,
    microchip: '',
    ownerName: '',
    veterinarian: '',
    lastVisit: '',
    notes: '',
  });

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.microchip.includes(searchTerm);
    const matchesVet = veterinarianFilter === 'all' || p.veterinarian === veterinarianFilter;
    return matchesSearch && matchesVet;
  });

  const getSpeciesIcon = (s: string) => (s === 'Gatto' ? '🐱' : '🐶');

  const handlePatientSelect = (p: Patient) => {
    onPatientSelected(p);
    onClose();
  };

  const handleDeletePatient = (id: string) => {
    setPatients(prev => prev.filter(x => x.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSaveNewPatient = () => {
    if (
      !newPatient.name ||
      !newPatient.species ||
      !newPatient.breed ||
      !newPatient.age ||
      !newPatient.microchip ||
      !newPatient.ownerName ||
      !newPatient.veterinarian
    ) {
      return;
    }
    const patientToAdd = {
      ...newPatient,
      id: Date.now().toString(),
      lastVisit: new Date().toISOString().split('T')[0],
    };
    setPatients(prev => [...prev, patientToAdd]);
    setShowNewPatientForm(false);
    setNewPatient({
      id: '',
      name: '',
      species: '',
      breed: '',
      age: 0,
      microchip: '',
      ownerName: '',
      veterinarian: '',
      lastVisit: '',
      notes: '',
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full h-screen m-0 p-0 rounded-none bg-slate-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="flex items-center justify-between p-6 bg-white border-b">
              <DialogTitle className="text-2xl font-semibold text-slate-800">
                Seleziona o Crea Paziente
              </DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-5 h-5" />
                </Button>
              </DialogClose>
            </DialogHeader>

            {/* Search and Filter */}
            <div className="flex flex-wrap items-center gap-4 p-6 bg-white border-b">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Cerca per nome, proprietario o microchip…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 w-full"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <Select
                  value={veterinarianFilter}
                  onValueChange={setVeterinarianFilter}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Tutti i veterinari" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i veterinari</SelectItem>
                    {veterinarians.map(v => (
                      <SelectItem key={v} value={v}>
                        {v.replace('Dr. ', '')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-none">
                <Button
                  onClick={() => setShowNewPatientForm(true)}
                  className="flex items-center h-10 bg-green-600 hover:bg-green-700 text-white rounded px-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuovo Paziente
                </Button>
              </div>
            </div>

            {/* Patient Cards */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 pr-6">
                {filteredPatients.map(p => (
                  <Card
                    key={p.id}
                    className="min-w-[250px] max-w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow bg-white border rounded-lg"
                    onClick={() => handlePatientSelect(p)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">
                            {getSpeciesIcon(p.species)}
                          </span>
                          <h3 className="text-lg font-semibold text-slate-800">
                            {p.name}
                          </h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-500"
                          onClick={e => {
                            e.stopPropagation();
                            handleDeletePatient(p.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {p.species}
                        </Badge>
                        <span className="text-sm text-slate-600">
                          {p.age} anni
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-slate-700 text-sm">
                          {p.breed}
                        </p>
                        <p className="text-xs text-slate-500">
                          Proprietario: {p.ownerName}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(p.lastVisit).toLocaleDateString('it-IT')}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {p.veterinarian.replace('Dr. ', '')}
                        </Badge>
                      </div>
                      {p.notes && (
                        <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded leading-tight line-clamp-2">
                          {p.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* New Patient Form */}
            <Sheet open={showNewPatientForm} onOpenChange={setShowNewPatientForm}>
              <SheetContent className="w-full sm:w-[400px] bg-white">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-xl font-semibold text-slate-800">
                    Nuovo Paziente
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 px-6">
                  <div>
                    <Label htmlFor="name">Nome paziente *</Label>
                    <Input
                      id="name"
                      value={newPatient.name}
                      onChange={e => setNewPatient(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Es. Luna"
                      className="mt-1 w-full"
                    />
                  </div>
                  {/* Repeat inputs for species, breed, age, microchip, ownerName, veterinarian, notes */}
                </div>
                <SheetFooter>
                  <div className="flex justify-end w-full space-x-2">
                    <Button variant="ghost" onClick={() => setShowNewPatientForm(false)}>
                      Annulla
                    </Button>
                    <Button onClick={handleSaveNewPatient} className="bg-blue-600 text-white hover:bg-blue-700">
                      Salva Paziente
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Delete Confirmation */}
            <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Conferma eliminazione</DialogTitle>
                  <DialogDescription>
                    Sei sicuro di voler eliminare questo paziente? Questa azione non può essere annullata.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                    Annulla
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeletePatient(showDeleteConfirm!)}>
                    Elimina
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}