import React, { useState, useRef } from 'react';
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
  const {
    isVisible,
    hideKeyboard,
    handleKeyPress,
    register,
    keyboardRef
  } = useOnScreenKeyboard({ onKeyPress: () => {}, dismissOnOutsideClick: true });

  const searchRef = useRef<HTMLInputElement>(null);
  const newNameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const microRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  const [patients, setPatients] = useState<Patient[]>([/* initial array */]);
  const [searchTerm, setSearchTerm] = useState('');
  const [veterinarianFilter, setVeterinarianFilter] = useState('');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState({ name: '', species: '', breed: '', age: 0, microchip: '', ownerName: '', veterinarian: '', notes: '' });

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || p.microchip.includes(searchTerm);
    const matchesVet = !veterinarianFilter || veterinarianFilter === 'all' || p.veterinarian === veterinarianFilter;
    return matchesSearch && matchesVet;
  });

  const handlePatientSelect = (patient: Patient) => { onPatientSelected(patient); onClose(); };
  const handleDeletePatient = (id: string) => { setPatients(prev => prev.filter(p => p.id !== id)); setShowDeleteConfirm(null); };
  const handleSaveNewPatient = () => {
    if (!newPatient.name || !newPatient.species || !newPatient.breed || !newPatient.age || !newPatient.microchip || !newPatient.ownerName || !newPatient.veterinarian) return;
    const p: Patient = { id: Date.now().toString(), ...newPatient, lastVisit: new Date().toISOString().split('T')[0] };
    setPatients(prev => [...prev, p]); setShowNewPatientForm(false);
    setNewPatient({ name: '', species: '', breed: '', age: 0, microchip: '', ownerName: '', veterinarian: '', notes: '' });
  };
  const getSpeciesIcon = (species: string) => species === 'Gatto' ? '🐱' : '🐶';

  return (
    <div ref={keyboardRef} className="relative w-full">
      {/* Main Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full h-screen m-0 p-0 rounded-none bg-slate-50">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-6 bg-white border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-semibold text-slate-800">Seleziona o Crea Paziente</DialogTitle>
                  <DialogDescription className="sr-only">Scegli o aggiungi un paziente</DialogDescription>
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon"><X /></Button>
                </DialogClose>
              </div>
            </DialogHeader>
            {/* Search & Filter */}
            <div className="flex flex-wrap gap-4 p-6 bg-white border-b">
              <div className="w-full sm:w-[60%] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  ref={searchRef}
                  placeholder="Cerca…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onFocus={() => register(searchRef)}
                  className="pl-10 h-10 w-full"
                />
              </div>
              <div className="w-full sm:w-[25%]">
                <Select value={veterinarianFilter} onValueChange={setVeterinarianFilter}>
                  <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Filtra vet" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti</SelectItem>
                    {veterinarians.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-[15%]">
                <Button
                  onClick={() => setShowNewPatientForm(true)}
                  className="w-full h-10 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />Nuovo Paziente
                </Button>
              </div>
            </div>
            {/* Horizontal Scroll Cards */}
            <div className="flex-1 overflow-x-auto p-6 w-full" style={{ scrollbarWidth: 'thin' }}>
              <div className="flex gap-4 w-max px-6">
                {filteredPatients.map(p => (
                  <Card key={p.id} className="min-w-[250px] max-w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg transition">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getSpeciesIcon(p.species)}</span>
                          <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
                        </div>
                        <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); setShowDeleteConfirm(p.id); }}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">{p.species}</Badge>
                        <span className="text-sm text-slate-600">{p.age} anni</span>
                      </div>
                      <p className="text-sm font-medium text-slate-700 mb-1">{p.breed}</p>
                      <p className="text-xs text-slate-500 mb-3">Proprietario: {p.ownerName}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{new Date(p.lastVisit).toLocaleDateString('it-IT')}</div>
                        <Badge variant="secondary" className="text-xs">{p.veterinarian.replace('Dr. ', '')}</Badge>
                      </div>
                      {p.notes && <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded line-clamp-2">{p.notes}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Patient Slide-over */}
      <Sheet open={showNewPatientForm} onOpenChange={setShowNewPatientForm}>
        <SheetContent className="sm:w-[400px] w-full bg-white">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-xl font-semibold text-slate-800">Nuovo Paziente</SheetTitle>
          </SheetHeader>
          <div className="p-6 space-y-4">
            <div><Label htmlFor="name">Nome paziente *</Label><Input id="name" ref={newNameRef} onFocus={() => register(newNameRef)} value={newPatient.name} onChange={e => setNewPatient(prev => ({ ...prev, name: e.target.value }))} placeholder="Es. Luna" className="mt-1 w-full" /></div>
            <div><Label htmlFor="species">Specie *</Label><Select value={newPatient.species} onValueChange={v => setNewPatient(prev => ({ ...prev, species: v }))}><SelectTrigger className="w-full mt-1"><SelectValue placeholder="Seleziona specie" /></SelectTrigger><SelectContent><SelectItem value="Cane">Cane</SelectItem><SelectItem value="Gatto">Gatto</SelectItem></SelectContent></Select></div>
            <div><Label htmlFor="breed">Razza *</Label><Input id="breed" ref={breedRef} onFocus={() => register(breedRef)} value={newPatient.breed} onChange={e => setNewPatient(prev => ({ ...prev, breed: e.target.value }))} placeholder="Es. Labrador" className="mt-1 w-full" /></div>
            <div><Label htmlFor="age">Età (anni) *</Label><Input id="age" type="number" ref={ageRef} onFocus={() => register(ageRef)} value={newPatient.age || ''} onChange={e => setNewPatient(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))} placeholder="3" className="mt-1 w-full" /></div>
            <div><Label htmlFor="microchip">Microchip *</Label><Input id="microchip" ref={microRef} onFocus={() => register(microRef)} value={newPatient.microchip} onChange={e => setNewPatient(prev => ({ ...prev, microchip: e.target.value }))} placeholder="900..." className="mt-1 w-full" /></div>
            <div><Label htmlFor="owner">Proprietario *</Label><Input id="owner" ref={ownerRef} onFocus={() => register(ownerRef)} value={newPatient.ownerName} onChange={e => setNewPatient(prev => ({ ...prev, ownerName: e.target.value }))} placeholder="Mario Rossi" className="mt-1 w-full" /></div>
            <div><Label htmlFor="veterinarian">Veterinario *</Label><Select value={newPatient.veterinarian} onValueChange={v => setNewPatient(prev => ({ ...prev, veterinarian: v }))}><SelectTrigger className="w-full mt-1"><SelectValue placeholder="Seleziona vet" /></SelectTrigger><SelectContent>{veterinarians.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="notes">Note</Label><Textarea id="notes" ref={notesRef} onFocus={() => register(notesRef)} rows={3} value={newPatient.notes} onChange={e => setNewPatient(prev => ({ ...prev, notes: e.target.value }))} placeholder="Note cliniche" className="mt-1 w-full" /></div>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 p-6 border-t">
            <Button variant="ghost" onClick={() => setShowNewPatientForm(false)}>Annulla</Button>
            <Button onClick={handleSaveNewPatient} disabled={!newPatient.name || !newPatient.species||!newPatient.breed||!newPatient.age||!newPatient.microchip||!newPatient.ownerName||!newPatient.veterinarian}>Salva</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Dialog open onOpenChange={() => setShowDeleteConfirm(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Conferma eliminazione</DialogTitle>
              <DialogDescription>Questa azione non può essere annullata.</DialogDescription>
            </DialogHeader>
            <p className="p-6 text-sm text-slate-600">Sei sicuro di eliminare {patients.find(p=>p.id===showDeleteConfirm)?.name}?</p>
            <div className="flex justify-end gap-2 p-6">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Annulla</Button>
              <Button variant="destructive" onClick={() => handleDeletePatient(showDeleteConfirm)}>Elimina</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <OnScreenKeyboard isVisible={isVisible} onKeyPress={handleKeyPress} onClose={hideKeyboard} />
    </div>
  );
};

export default PatientSelection;
