
import React, { useState } from 'react';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PatientsApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const mockPatients = [
    { id: 1, name: 'Luna', breed: 'Labrador', age: '3 anni', image: '🐕' },
    { id: 2, name: 'Micio', breed: 'Gatto Europeo', age: '5 anni', image: '🐱' },
    { id: 3, name: 'Rocky', breed: 'Pastore Tedesco', age: '7 anni', image: '🐕' },
    { id: 4, name: 'Whiskers', breed: 'Persiano', age: '2 anni', image: '🐱' },
    { id: 5, name: 'Buddy', breed: 'Golden Retriever', age: '4 anni', image: '🐕' },
    { id: 6, name: 'Smokey', breed: 'Maine Coon', age: '6 anni', image: '🐱' },
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedPatient) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center shadow-sm">
          <Button
            variant="ghost"
            onClick={() => setSelectedPatient(null)}
            className="mr-4 p-3 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h1>
        </div>

        {/* Patient Details */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Patient Info Card */}
            <div className="bg-gray-50 rounded-3xl p-8 text-center">
              <div className="text-8xl mb-4">{selectedPatient.image}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedPatient.name}</h2>
              <p className="text-xl text-gray-600 mb-1">{selectedPatient.breed}</p>
              <p className="text-xl text-gray-600">{selectedPatient.age}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button className="w-full h-16 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-2xl">
                Inizia Esame Live
              </Button>
              <Button className="w-full h-16 text-xl bg-green-500 hover:bg-green-600 text-white rounded-2xl">
                Visualizza Storico
              </Button>
              <Button className="w-full h-16 text-xl bg-purple-500 hover:bg-purple-600 text-white rounded-2xl">
                Modifica Dati
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Pazienti</h1>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white h-12 px-6 rounded-2xl text-lg">
          <Plus className="w-6 h-6 mr-2" />
          Nuovo
        </Button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
          <Input
            placeholder="Cerca paziente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Patients Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className="bg-white border-2 border-gray-200 rounded-3xl p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-center"
            >
              <div className="text-6xl mb-4">{patient.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{patient.name}</h3>
              <p className="text-lg text-gray-600 mb-1">{patient.breed}</p>
              <p className="text-lg text-gray-500">{patient.age}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsApp;
