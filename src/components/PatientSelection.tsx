import React, { useState, useRef } from 'react';
import { Search, Plus, Calendar, X, Trash2, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import OnScreenKeyboard from './OnScreenKeyboard';
import { useOnScreenKeyboard } from '@/hooks/useOnScreenKeyboard';

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

const PatientSelection = ({ isOpen, onClose, onPatientSelected }: PatientSelectionProps) => {
  // On-Screen Keyboard hook
  const {
    isVisible,
    hideKeyboard,
    handleKeyPress,
    register,
    keyboardRef
  } = useOnScreenKeyboard({
    onKeyPress: (key, inputRef) => {
      console.log('Key pressed:', key, 'on', inputRef?.name);
    },
    dismissOnOutsideClick: true
  });

  // Refs for inputs to register with the keyboard
  const searchRef = useRef<HTMLInputElement>(null);
  const newNameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const microRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // Component state
  const [patients, setPatients] = useState<Patient[]>([ /* ... initial patients ... */ ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [veterinarianFilter, setVeterinarianFilter] = useState('');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
    microchip: '',
    ownerName: '',
    veterinarian: '',
    notes: ''
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.microchip.includes(searchTerm);
    const matchesVet = !veterinarianFilter || veterinarianFilter === 'all' || patient.veterinarian === veterinarianFilter;
    return matchesSearch && matchesVet;
  });

  const handlePatientSelect = (patient: Patient) => {
    onPatientSelected(patient);
    onClose();
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    setShowDeleteConfirm(null);
  };

  const handleSaveNewPatient = () => {
    if (!newPatient.name || !newPatient.species || !newPatient.breed || !newPatient.age ||
        !newPatient.microchip || !newPatient.ownerName || !newPatient.veterinarian) {
      return;
    }
    const patient: Patient = {
      id: Date.now().toString(),
      ...newPatient,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients(prev => [...prev, patient]);
    setShowNewPatientForm(false);
    setNewPatient({ name: '', species: '', breed: '', age: 0, microchip: '', ownerName: '', veterinarian: '', notes: '' });
  };

  const getSpeciesIcon = (species: string) => (species === 'Gatto' ? '🐱' : '🐶');

  return (
    <div ref={keyboardRef} className="relative">
      {/* Main Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full h-screen m-0 p-0 rounded-none bg-slate-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="flex-row items-center justify-between p-6 bg-white border-b">
              <div>
                <DialogTitle className="text-2xl font-semibold text-slate-800">
                  Seleziona o Crea Paziente
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Cerca e seleziona un paziente esistente o crea un nuovo paziente
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="w-5 h-5" />
                </Button>
              </DialogClose>
            </DialogHeader>

            {/* Search and Filters Row */}
            <div className="flex gap-4 p-6 bg-white border-b">
              <div className="w-[60%] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  ref={searchRef}
                  placeholder="Cerca per nome, proprietario o microchip…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onFocus={() => register(searchRef)}
                  className="pl-10 h-10"
                />
              </div>
              <div className="w-[25%]">
                <Select value={veterinarianFilter} onValueChange={setVeterinarianFilter}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Filtra per veterinario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i veterinari</SelectItem>
                    {veterinarians.map(vet => (<SelectItem key={vet} value={vet}>{vet}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[15%]">
                <Button onClick={() => setShowNewPatientForm(true)} className="w-full h-10 bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuovo Paziente
                </Button>
              </div>
            </div>

            {/* Patients Cards - Horizontal Scroll */}
            <div className="flex-1 p-6 overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="flex gap-4 pb-4">
                {filteredPatients.map(patient => (
                  <Card key={patient.id} className="min-w-[250px] max-w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-all duration-200 bg-white border border-slate-200 rounded-lg" onClick={() => handlePatientSelect(patient)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getSpeciesIcon(patient.species)}</span>
                          <h3 className="text-lg font-semibold text-slate-800">{patient.name}</h3>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-500" onClick={e => { e.stopPropagation(); setShowDeleteConfirm(patient.id); }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{patient.species}</Badge>
                        <span className="text-sm text-slate-600">{patient.age} anni</span>
                      </div>
                      <div className="mb-3">
                        <p className="font-medium text-slate-700 text-sm">{patient.breed}</p>
                        <p className="text-xs text-slate-500">Proprietario: {patient.ownerName}</p>
                      </n
