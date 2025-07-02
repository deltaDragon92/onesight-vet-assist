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

  // Refs for inputs
  const searchRef = useRef<HTMLInputElement>(null);
  const newNameRef = useRef<HTMLInputElement>(null);
  const breedRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const microRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  // State
  const [patients, setPatients] = useState<Patient[]>([
    { id: '1', name: 'Luna', species: 'Cane', breed: 'Labrador Retriever', age: 3, microchip: '900108001234567', ownerName: 'Maria Rossi', veterinarian: 'Dr. Mario Rossi', lastVisit: '2024-06-20', notes: 'Paziente docile, allergia ai polli' },
    { id: '2', name: 'Rex', species: 'Cane', breed: 'Pastore Tedesco', age: 7, microchip: '900108001234568', ownerName: 'Giovanni Bianchi', veterinarian: 'Dr. Laura Verdi', lastVisit: '2024-06-15', notes: 'Controllo cardiaco periodico' },
    { id: '3', name: 'Mimì', species: 'Gatto', breed: 'Persiano', age: 5, microchip: '900108001234569', ownerName: 'Anna Neri', veterinarian: 'Dr. Mario Rossi', lastVisit: '2024-06-10', notes: 'Paziente nervoso, necessita sedazione leggera' },
    { id: '4', name: 'Charlie', species: 'Cane', breed: 'Golden Retriever', age: 2, microchip: '900108001234570', ownerName: 'Luca Ferrari', veterinarian: 'Dr. Laura Verdi', lastVisit: '2024-06-25', notes: 'Primo controllo post-operatorio' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [veterinarianFilter, setVeterinarianFilter] = useState('');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState({ name: '', species: '', breed: '', age: 0, microchip: '', ownerName: '', veterinarian: '', notes: '' });

  // Filters
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || p.microchip.includes(searchTerm);
    const matchesVet = !veterinarianFilter || veterinarianFilter === 'all' || p.veterinarian === veterinarianFilter;
    return matchesSearch && matchesVet;
  });

  const handlePatientSelect = (patient: Patient) => { onPatientSelected(patient); onClose(); };
  const handleDeletePatient = (id: string) => { setPatients(prev => prev.filter(p => p.id !== id)); setShowDeleteConfirm(null); };
  const handleSaveNewPatient = () => {
    if (!newPatient.name || !newPatient.species || !newPatient.breed || !newPatient.age || !newPatient.microchip || !newPatient.ownerName || !newPatient.veterinarian) return;
    const patient: Patient = { id: Date.now().toString(), ...newPatient, lastVisit: new Date().toISOString().split('T')[0] };
    setPatients(prev => [...prev, patient]);
    setShowNewPatientForm(false);
    setNewPatient({ name: '', species: '', breed: '', age: 0, microchip: '', ownerName: '', veterinarian: '', notes: '' });
  };

  const getSpeciesIcon = (species: string) => species === 'Gatto' ? '🐱' : '🐶';

  return (
    <div ref={keyboardRef} className="relative">
      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full h-screen m-0 p-0 rounded-none bg-slate-50">
          <div className="flex flex-col h-full">
            <DialogHeader className="flex-row items-center justify-between p-6 bg-white border-b">
              <div>
                <DialogTitle className="text-2xl font-semibold text-slate-800">Seleziona o Crea Paziente</DialogTitle>
                <DialogDescription className="sr-only">Cerca e seleziona un paziente esistente o crea un nuovo paziente</DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8"><X className="w-5 h-5" /></Button>
              </DialogClose>
            </DialogHeader>
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
                  <SelectTrigger className="h-10"><SelectValue placeholder="Filtra per veterinario" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i veterinari</SelectItem>
                    {veterinarians.map(vet => <SelectItem key={vet} value={vet}>{vet}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[15%]">
                <Button onClick={() => setShowNewPatientForm(true)} className="w-full h-10 bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  <Plus className="w-4 h-4 mr-2" />Nuovo Paziente
                </Button>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
              <div className="flex gap-4 pb-4">
                {filteredPatients.map(patient => (
                  <Card key={patient.id} className="min-w-[250px] max-w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-all duration-200 bg-white border border-slate-200 rounded-lg" onClick={() => handlePatientSelect(patient)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center"><span className="text-2xl mr-2">{getSpeciesIcon(patient.species)}</span><h3 className="text-lg font-semibold text-slate-800">{patient.name}</h3></div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-red-500" onClick={e => { e.stopPropagation(); setShowDeleteConfirm(patient.id); }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                      <div className="flex items-center justify-between mb-2"><Badge variant="outline" className="text-xs">{patient.species}</Badge><span className="text-sm text-slate-600">{patient.age} anni</span></div>
                      <div className="mb-3"><p className="font-medium text-slate-700 text-sm">{patient.breed}</p><p className="text-xs text-slate-500">Proprietario: {patient.ownerName}</p></div>
                      <div className="flex items-center justify-between mb-3 pt-2 border-t border-slate-100"><div className="flex items:center text-xs text-slate-500"><Calendar className="w-3 h-3 mr-1" />{new Date(patient.lastVisit).toLocaleDateString('it-IT')}</div><Badge variant="secondary" className="text-xs">{patient.veterinarian.replace('Dr. ', '')}</Badge></div>
                      {patient.notes && <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded leading-tight line-clamp-2">{patient.notes}</p>}
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
        <SheetContent className="w-[400px] sm:max-w-[400px] bg-white">
          <SheetHeader className="mb-6"><SheetTitle className="text-xl font-semibold text-slate-800">Nuovo Paziente</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <div><Label htmlFor="name">Nome paziente *</Label><Input id="name" ref={newNameRef} value={newPatient.name} onChange={e => setNewPatient(prev => ({ ...prev, name: e.target.value}))} onFocus={() => register(newNameRef)} placeholder="Es. Luna" className="mt-1" /></div>
            <div><Label htmlFor="breed">Razza *</Label><Input id="breed" ref={breedRef} value={newPatient.breed} onChange={e => setNewPatient(prev => ({ ...prev, breed: e.target.value}))} onFocus={() => register(breedRef)} placeholder="Es. Labrador" className="mt-1" /></div>
            <div><Label htmlFor="age">Età (anni) *</Label><Input id="age" type="number" ref={ageRef} value={newPatient.age||''} onChange={e => setNewPatient(prev => ({ ...prev, age: parseInt(e.target.value)||0}))} onFocus={() => register(ageRef)} placeholder="3" className="mt-1" /></div>
            <div><Label htmlFor="microchip">Microchip *</Label><Input id="microchip" ref={microRef} value={newPatient.microchip} onChange={e => setNewPatient(prev => ({ ...prev, microchip: e.target.value}))} onFocus={() => register(microRef)} placeholder="900108001234567" className="mt-1" /></div>
            <div><Label htmlFor="owner">Proprietario *</Label><Input id="owner" ref={ownerRef} value={newPatient.ownerName} onChange={e => setNewPatient(prev => ({ ...prev, ownerName: e.target.value}))} onFocus={() => register(ownerRef)} placeholder="Mario Rossi" className="mt-1" /></div>
            <div><Label htmlFor="notes">Note</Label><Textarea id="notes" ref={notesRef} rows={3} value={newPatient.notes} onChange={e => setNewPatient(prev => ({ ...prev, notes: e.target.value}))} onFocus={() => register(notesRef)} placeholder="Note cliniche iniziali..." className="mt-1" /></div>
          </div>
          <div className="flex justify-between pt-6 mt-6 border-t">
            <Button variant="ghost" onClick={() => setShowNewPatientForm(false)} className="text-slate-600">Annulla</Button>
            <Button onClick={handleSaveNewPatient} className="bg-[#2E5BFF] hover:bg-[#1E40AF] text-white" disabled={!newPatient.name||!newPatient.species||!newPatient.breed||!newPatient.age||!newPatient.microchip||!newPatient.ownerName||!newPatient.veterinarian}>Salva</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <Dialog open onOpenChange={() => setShowDeleteConfirm(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Conferma eliminazione</DialogTitle>
              <DialogDescription>Questa azione non può essere annullata.</DialogDescription>
            </DialogHeader>
            <p className="text-sm text-slate-600">Sei sicuro di eliminare {patients.find(p=>p.id===showDeleteConfirm)?.name}?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Annulla</Button>
              <Button variant="destructive" onClick={() => handleDeletePatient(showDeleteConfirm)}>Elimina</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* On-Screen Keyboard */}
      <OnScreenKeyboard
        isVisible={isVisible}
        onKeyPress={handleKeyPress}
        onClose={hideKeyboard}
      />
    </div>
  );
};

export default PatientSelection;