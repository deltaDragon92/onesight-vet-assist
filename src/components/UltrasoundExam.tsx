
import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Save, Camera, MapPin, Volume2, Settings, Maximize, CheckCircle, X, Pause, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface UltrasoundExamProps {
  onExamCompleted?: () => void;
}

// 3D Probe Axes Component
const ProbeAxes = ({ probeData }: { probeData: { roll: number; pitch: number; yaw: number } }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.degToRad(probeData.pitch);
      meshRef.current.rotation.y = THREE.MathUtils.degToRad(probeData.yaw);
      meshRef.current.rotation.z = THREE.MathUtils.degToRad(probeData.roll);
    }
  });

  return (
    <group ref={meshRef}>
      {/* X Axis - Red */}
      <mesh position={[1, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[1.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.08, 0.2]} />
        <meshBasicMaterial color="red" />
      </mesh>
      
      {/* Y Axis - Green */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.08, 0.2]} />
        <meshBasicMaterial color="green" />
      </mesh>
      
      {/* Z Axis - Blue */}
      <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <mesh position={[0, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.2]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
};

const UltrasoundExam = ({ onExamCompleted }: UltrasoundExamProps) => {

  const [aiGuidanceActive, setAiGuidanceActive] = useState(false);
  const [detectedStructures, setDetectedStructures] = useState([]);
  const [examCompleted, setExamCompleted] = useState(true);
  const [aiGuidanceMode, setAiGuidanceMode] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  const [probeData, setProbeData] = useState({ roll: 0, pitch: 0, yaw: 0 });
  const [selectedScanType, setSelectedScanType] = useState('cuore');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const wsVideoRef = useRef<WebSocket | null>(null);
  const wsProbeRef = useRef<WebSocket | null>(null);
  
  // WebSocket connections for AI Guidance Mode
  useEffect(() => {
    if (aiGuidanceMode) {
      // Connect to video stream
      wsVideoRef.current = new WebSocket('ws://localhost:8080/stream/ultrasound');
      wsVideoRef.current.onopen = () => {
        console.log('Video WebSocket connected');
      };
      wsVideoRef.current.onerror = () => {
        console.log('Video WebSocket error - using simulated stream');
      };

      // Connect to probe orientation stream
      wsProbeRef.current = new WebSocket('ws://localhost:8080/stream/probe');
      wsProbeRef.current.onopen = () => {
        console.log('Probe WebSocket connected');
      };
      wsProbeRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.roll !== undefined && data.pitch !== undefined && data.yaw !== undefined) {
            setProbeData(data);
          }
        } catch (e) {
          console.error('Error parsing probe data:', e);
        }
      };
      wsProbeRef.current.onerror = () => {
        console.log('Probe WebSocket error - using simulated data');
        // Simulate probe data when WebSocket is not available
        const interval = setInterval(() => {
          setProbeData({
            roll: Math.sin(Date.now() * 0.001) * 30,
            pitch: Math.cos(Date.now() * 0.0007) * 45,
            yaw: Math.sin(Date.now() * 0.0013) * 60
          });
        }, 100);
        return () => clearInterval(interval);
      };

      return () => {
        if (wsVideoRef.current) {
          wsVideoRef.current.close();
        }
        if (wsProbeRef.current) {
          wsProbeRef.current.close();
        }
      };
    }
  }, [aiGuidanceMode]);


  const handleStartAI = () => {
    if (!aiGuidanceActive) {
      setAiGuidanceMode(true);
    }
    setAiGuidanceActive(!aiGuidanceActive);
  };

  const handleExitAIGuidance = () => {
    setAiGuidanceMode(false);
    setAiGuidanceActive(false);
  };

  const handleCompleteExam = () => {
    setExamCompleted(true);
    onExamCompleted?.();
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  
  return (
    <div className="p-6 space-y-6">
      {/* Main Exam Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">  
        {/* Video Display Area */}
        <Card className="lg:col-span-3 bg-slate-100 shadow-lg">
          <CardContent className="p-0 relative">
             <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
              <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                <Play className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                <Pause className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                <Save className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                <Camera className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
              {/* Info Panel - Default State */}
              {!aiGuidanceMode && (
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center border">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Guida AI</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tipo di scansione</label>
                      <Select value={selectedScanType} onValueChange={setSelectedScanType}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border shadow-lg z-50">
                          <SelectItem value="cuore">Cuore</SelectItem>
                          <SelectItem value="addome">Addome</SelectItem>
                          <SelectItem value="tiroide">Tiroide</SelectItem>
                          <SelectItem value="fegato">Fegato</SelectItem>
                          <SelectItem value="reni">Reni</SelectItem>
                          <SelectItem value="vescica">Vescica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Pacchetto disponibile
                    </Badge>

                    <Button 
                      onClick={() => setAiGuidanceMode(true)}
                      variant="outline"
                      className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 h-12"
                    >
                      <Bot className="w-5 h-5 mr-2" />
                      Avvia Guida AI
                    </Button>
                  </div>
                </div>
              )}

              {/* Video stream - only in AI guidance mode */}
              {aiGuidanceMode && (
                <>
                  {/* Simulated ultrasound video background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 bg-gradient-radial from-slate-700 via-slate-800 to-slate-900 opacity-80"></div>
                    
                    {/* Simulated ultrasound scan lines */}
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-20"
                          style={{
                            left: `${10 + i * 10}%`,
                            top: '20%',
                            width: '2px',
                            height: '60%',
                            transform: `rotate(${-30 + i * 8}deg)`,
                            transformOrigin: 'bottom'
                          }}
                        />
                      ))}
                    </div>

                    {/* AI Detection Overlays */}
                    {detectedStructures.map((structure) => (
                      <div
                        key={structure.id}
                        className="absolute border-2 border-cyan-400 rounded"
                        style={{
                          left: `${structure.x}%`,
                          top: `${structure.y}%`,
                          width: `${structure.width}%`,
                          height: `${structure.height}%`
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-medium">
                          {structure.name} ({structure.confidence}%)
                        </div>
                      </div>
                    ))}

                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
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
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        
      </div>

      {/* AI Guidance Panel */}
      {aiGuidanceActive && (
        <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 shadow-sm">
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
                  {detectedStructures.map((structure) => (
                    <div key={structure.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm text-slate-700">{structure.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {structure.confidence}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Guidance Mode Full-Screen Overlay */}
      {aiGuidanceMode && (
        <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col">
          {/* Fixed Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-800">Guida AI</h1>
            <Button
              onClick={handleExitAIGuidance}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Esci da Guida AI
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 flex flex-col md:flex-row gap-4 overflow-hidden">
            {/* Video Panel */}
            <div className="flex-[2] min-w-0 h-[90vh] md:h-auto">
              <Card className="h-full bg-[#0F1013] border-slate-700 shadow-lg">
                <CardContent className="p-0 h-full relative">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    muted={false}
                    style={{ backgroundColor: '#0F1013' }}
                  >
                    <source src="ws://localhost:8080/stream/ultrasound" type="video/mp4" />
                    {/* Fallback content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <p className="text-white text-lg">Connessione video in corso...</p>
                    </div>
                  </video>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <Button
                      onClick={toggleVideoPlayback}
                      size="sm"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <div className="bg-black/50 px-3 py-1 rounded text-white text-sm font-mono">
                      {formatTime(videoTime)} LIVE
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Probe Orientation Panel */}
            <div className="flex-1 min-w-0 max-w-none md:max-w-md h-[40vh] md:h-auto">
              <Card className="h-full bg-[#0F1013] border-slate-700 shadow-lg">
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Numeric Readout */}
                  <div className="mb-4 p-3 bg-slate-900 rounded text-white font-mono text-sm">
                    <div>Roll: {probeData.roll.toFixed(1)}°</div>
                    <div>Pitch: {probeData.pitch.toFixed(1)}°</div>
                    <div>Yaw: {probeData.yaw.toFixed(1)}°</div>
                  </div>

                  {/* 3D Canvas */}
                  <div className="flex-1 bg-slate-900 rounded overflow-hidden">
                    <Canvas
                      camera={{ position: [3, 3, 3], fov: 50 }}
                      style={{ background: '#0F172A' }}
                    >
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <ProbeAxes probeData={probeData} />
                      <OrbitControls enablePan={false} enableZoom={true} />
                      <gridHelper args={[4, 4, '#334155', '#1e293b']} />
                    </Canvas>
                  </div>

                  {/* Label */}
                  <div className="mt-4 text-center">
                    <p className="text-slate-300 text-sm">Posizione sonda in tempo reale</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UltrasoundExam;
