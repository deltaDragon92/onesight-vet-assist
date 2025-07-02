import React, { useState } from 'react';
import { Search, Plus, Calendar, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [patients, setPatients] = useState<Patient[]>([/* initial data */]);
  const [searchTerm, setSearchTerm] = useState('');
  const [veterinarianFilter, setVeterinarianFilter] = useState('all');
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPatient, setNewPatient] = useState({ name: '', species: '', breed: '', age: 0, microchip: '', ownerName: '', veterinarian: '', notes: '' });

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      || p.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
      || p.microchip.includes(searchTerm);
    const matchesVet = veterinarianFilter === 'all' || p.veterinarian === veterinarianFilter;
    return matchesSearch && matchesVet;
  });

  const handlePatientSelect = (p: Patient) => { onPatientSelected(p); onClose(); };
  const handleDeletePatient = (id: string) => { setPatients(prev => prev.filter(x => x.id !== id)); setShowDeleteConfirm(null); };
  const handleSaveNewPatient = () => {/* similar logic with validation */};
  const getSpeciesIcon = (s: string) => s === 'Gatto' ? '🐱' : '🐶';

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full h-screen m-0 p-0 rounded-none bg-slate-50">
          <div className="flex flex-col h-full">
            <DialogHeader className="flex items-center justify-between p-6 bg-white border-b">
              <DialogTitle className="text-2xl font-semibold text-slate-800">Seleziona o Crea Paziente</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon"><X /></Button>
              </DialogClose>
            </DialogHeader>

            {/* Responsive Search/Filter Bar */}
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
                <Select value={veterinarianFilter} onValueChange={setVeterinarianFilter}>
                  <SelectTrigger className="w-full h-10"><SelectValue placeholder="Tutti i veterinari" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i veterinari</SelectItem>
                    {veterinarians.map(v => <SelectItem key={v} value={v}>{v.replace('Dr. ', '')}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-none">
                <Button
                  onClick={() => setShowNewPatientForm(true)}
                  className="flex items-center h-10 bg-green-600 hover:bg-green-700 text-white rounded px-4"
                >
                  <Plus className="w-4 h-4 mr-2" /> Nuovo Paziente
                </Button>
              </div>
            </div>

            {/* Patients Cards - Full scrollable width with padding */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 pr-6">
                {filteredPatients.map(p => (
                  <Card key={p.id} className="min-w-[250px] max-w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow bg-white border rounded-lg"
                    onClick={() => handlePatientSelect(p)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getSpeciesIcon(p.species)}</span>
                          <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500"
                          onClick={e => { e.stopPropagation(); setShowDeleteConfirm(p.id); }}>
                          <Trash2 />
                        </Button>
                      </div>
                      {/* rest of card details */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Patient Form Slide-over and Delete Dialogs unchanged */}

    </>
  );
}
