import React, { useState, useEffect } from 'react';
import { Play, Square, Save, Camera, MapPin, Volume2, Settings, Maximize, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
interface UltrasoundExamProps {
  onExamCompleted?: () => void;
}
const UltrasoundExam = ({
  onExamCompleted
}: UltrasoundExamProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [aiGuidanceActive, setAiGuidanceActive] = useState(false);
  const [detectedStructures, setDetectedStructures] = useState([]);
  const [examCompleted, setExamCompleted] = useState(false);

  // Simulate AI detection
  useEffect(() => {
    if (aiGuidanceActive) {
      const interval = setInterval(() => {
        const structures = [{
          id: 1,
          name: 'Cuore',
          confidence: 94,
          x: 45,
          y: 35,
          width: 25,
          height: 20
        }, {
          id: 2,
          name: 'Fegato',
          confidence: 87,
          x: 30,
          y: 55,
          width: 30,
          height: 15
        }, {
          id: 3,
          name: 'Vescica',
          confidence: 91,
          x: 40,
          y: 70,
          width: 20,
          height: 12
        }];
        setDetectedStructures(structures);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setDetectedStructures([]);
    }
  }, [aiGuidanceActive]);
  const handleStartAI = () => {
    setAiGuidanceActive(!aiGuidanceActive);
  };
  const handleRecord = () => {
    setIsRecording(!isRecording);
  };
  const handleCompleteExam = () => {
    setExamCompleted(true);
    onExamCompleted?.();
  };
  return <div className="p-6 space-y-6">
      {/* Patient Info Bar */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Luna - Labrador Retriever</h3>
                <p className="text-sm text-slate-600">Proprietario: Famiglia Bianchi • Età: 5 anni • Peso: 28kg</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={`${examCompleted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                {examCompleted ? 'Esame completato' : 'Esame in corso'}
              </Badge>
              <span className="text-sm text-slate-500">12:34</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Exam Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Video Display Area */}
        <Card className="lg:col-span-3 bg-black shadow-lg">
          <CardContent className="p-0 relative">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
              {/* Simulated ultrasound video background */}
              <div className="absolute inset-0 bg-gradient-radial from-slate-700 via-slate-800 to-slate-900 opacity-80"></div>
              
              {/* Simulated ultrasound scan lines */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => <div key={i} className="absolute bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-20" style={{
                left: `${10 + i * 10}%`,
                top: '20%',
                width: '2px',
                height: '60%',
                transform: `rotate(${-30 + i * 8}deg)`,
                transformOrigin: 'bottom'
              }} />)}
              </div>

              {/* AI Detection Overlays */}
              {detectedStructures.map(structure => <div key={structure.id} className="absolute border-2 border-cyan-400 rounded" style={{
              left: `${structure.x}%`,
              top: `${structure.y}%`,
              width: `${structure.width}%`,
              height: `${structure.height}%`
            }}>
                  <div className="absolute -top-6 left-0 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-medium">
                    {structure.name} ({structure.confidence}%)
                  </div>
                </div>)}

              {/* Video Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isRecording && <div className="flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">REC</span>
                    </div>}
                  {aiGuidanceActive && <Badge className="bg-cyan-500 text-white">AI Attiva</Badge>}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Controlli Esame</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* AI Controls */}
            <div className="space-y-3">
              <Button onClick={handleStartAI} className={`w-full h-12 text-sm font-medium ${aiGuidanceActive ? 'bg-cyan-500 hover:bg-cyan-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                {aiGuidanceActive ? 'Disattiva AI' : 'Attiva Guida AI'}
              </Button>
              
              <Button onClick={handleRecord} variant={isRecording ? "destructive" : "outline"} className="w-full ">
                {isRecording ? <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop Registrazione
                  </> : <>
                    <Play className="w-4 h-4 mr-2" />
                    Inizia Registrazione
                  </>}
              </Button>
            </div>

            <div className="border-t pt-4 space-y-3">
              <Button variant="outline" className="w-full h-10 text-sm">
                <Camera className="w-4 h-4 mr-2" />
                Snapshot
              </Button>
              
              <Button variant="outline" className="w-full h-10 text-sm">
                <Save className="w-4 h-4 mr-2" />
                Salva Frame
              </Button>
              
              <Button variant="outline" className="w-full h-10 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                Marca Struttura
              </Button>
            </div>

            {/* Complete Exam Button */}
            <div className="border-t pt-4">
              <Button onClick={handleCompleteExam} className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium" disabled={examCompleted}>
                <CheckCircle className="w-4 h-4 mr-2" />
                {examCompleted ? 'Esame Completato' : 'Completa Esame'}
              </Button>
            </div>

            {/* Quick Settings */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-slate-700 mb-3">Impostazioni Rapide</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Gain</span>
                  <input type="range" className="w-20" min="0" max="100" defaultValue="75" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Depth</span>
                  <input type="range" className="w-20" min="0" max="100" defaultValue="60" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Focus</span>
                  <input type="range" className="w-20" min="0" max="100" defaultValue="50" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Guidance Panel */}
      {aiGuidanceActive && <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-cyan-800 flex items-center">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse"></div>
              Guida AI Attiva
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Strutture Rilevate</h4>
                <div className="space-y-2">
                  {detectedStructures.map(structure => <div key={structure.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm text-slate-700">{structure.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {structure.confidence}%
                      </Badge>
                    </div>)}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-800 mb-2">Suggerimenti</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• Aumenta la profondità per una migliore visualizzazione</p>
                  <p>• Posiziona la sonda più in basso per il fegato</p>
                  <p>• Ottima visualizzazione cardiaca</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
};
export default UltrasoundExam;