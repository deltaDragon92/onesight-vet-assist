
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Bot, Volume2, Settings, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface LiveExamAppProps {
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

const LiveExamApp = ({ onExamCompleted }: LiveExamAppProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [aiGuidanceActive, setAiGuidanceActive] = useState(false);
  const [probeData, setProbeData] = useState({ roll: 0, pitch: 0, yaw: 0 });
  const [examStarted, setExamStarted] = useState(false);

  // Simulate probe data
  useEffect(() => {
    const interval = setInterval(() => {
      setProbeData({
        roll: Math.sin(Date.now() * 0.001) * 30,
        pitch: Math.cos(Date.now() * 0.0007) * 45,
        yaw: Math.sin(Date.now() * 0.0013) * 60
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleToggleAI = () => {
    setAiGuidanceActive(!aiGuidanceActive);
  };

  const handleCompleteExam = () => {
    onExamCompleted?.();
  };

  if (!examStarted) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="max-w-md mx-4 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Esame Live</h2>
            <p className="text-slate-600 mb-6">Avvia l'esame ecografico in tempo reale</p>
            <Button 
              onClick={handleStartExam}
              size="lg"
              className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-6 h-6 mr-3" />
              Inizia Esame
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0F1013]">
      {/* Header controlli */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <Button
          variant="secondary"
          size="icon"
          className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white border-none"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <Badge className="bg-red-500 text-white px-3 py-1">
            LIVE
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white">
            00:45
          </Badge>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Video area principale */}
        <div className="flex-[2] relative">
          {/* Simulated ultrasound background */}
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
          </div>
        </div>

        {/* Panel laterale 3D probe */}
        <div className="flex-1 max-w-sm bg-[#1a1a1a] border-l border-slate-700">
          <Card className="h-full bg-[#1a1a1a] border-slate-700 rounded-none">
            <CardContent className="p-4 h-full flex flex-col">
              <h3 className="text-white text-lg font-semibold mb-4">Posizione Sonda</h3>
              
              {/* Numeric readout */}
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-center items-center space-x-4">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </Button>
          
          <Button
            onClick={handleToggleAI}
            size="lg"
            className={`h-12 px-6 rounded-full transition-all ${
              aiGuidanceActive 
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white' 
                : 'bg-white/20 hover:bg-white/30 text-white border-white/20'
            }`}
          >
            <Bot className="w-5 h-5 mr-2" />
            {aiGuidanceActive ? 'AI Attiva' : 'Attiva AI'}
          </Button>

          <Button
            onClick={handleCompleteExam}
            size="lg"
            className="h-12 px-6 rounded-full bg-green-600 hover:bg-green-700 text-white"
          >
            Completa Esame
          </Button>
        </div>

        {/* AI Guidance feedback */}
        {aiGuidanceActive && (
          <div className="mt-4 mx-auto max-w-md">
            <div className="bg-cyan-500/20 border border-cyan-400/50 rounded-lg p-3">
              <p className="text-cyan-100 text-sm text-center">
                🤖 Guida AI attiva - Posiziona la sonda sul cuore del paziente
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveExamApp;
