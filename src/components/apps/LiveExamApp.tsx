
import React, { useState } from 'react';
import { Play, Pause, X, Bot, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Probe component simplificato
const ProbeAxes = () => {
  return (
    <group>
      <mesh position={[1, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
};

const LiveExamApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiGuidanceActive, setAiGuidanceActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (isFullscreen) {
    return (
      <div className="h-full bg-black flex flex-col">
        {/* Minimal Controls Overlay */}
        <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center">
          <Button
            onClick={() => setIsFullscreen(false)}
            className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
        </div>

        {/* Simulated Video Feed */}
        <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
          <div className="text-white text-2xl">Feed Video Live</div>
          
          {/* AI Guidance Overlay */}
          {aiGuidanceActive && (
            <div className="absolute bottom-6 left-6 right-6 bg-blue-500/90 text-white p-6 rounded-2xl">
              <div className="flex items-center mb-3">
                <Bot className="w-8 h-8 mr-3" />
                <span className="text-xl font-bold">Guida AI Attiva</span>
              </div>
              <p className="text-lg">Posiziona la sonda sull'area cardiaca per iniziare la scansione.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Esame Live</h1>
        <Button
          onClick={() => setAiGuidanceActive(!aiGuidanceActive)}
          className={`h-12 px-6 rounded-2xl text-lg ${
            aiGuidanceActive 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          <Bot className="w-6 h-6 mr-2" />
          Guida AI
        </Button>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 p-6">
          <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl relative overflow-hidden flex items-center justify-center">
            {/* Placeholder Video */}
            <div 
              onClick={() => setIsFullscreen(true)}
              className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer flex items-center justify-center"
            >
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📹</div>
                <p className="text-2xl mb-2">Tocca per Full Screen</p>
                <p className="text-lg text-gray-300">Feed Video Ultrasuoni</p>
              </div>
            </div>

            {/* Play/Pause Button */}
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full z-10"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
          </div>
        </div>

        {/* Probe Orientation Panel */}
        <div className="w-80 p-6">
          <div className="h-full bg-gray-50 rounded-3xl p-6 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Posizione Sonda</h3>
            
            {/* 3D Visualization */}
            <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden mb-4">
              <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <ProbeAxes />
                <OrbitControls enablePan={false} enableZoom={true} />
                <gridHelper args={[4, 4, '#334155', '#1e293b']} />
              </Canvas>
            </div>

            {/* Numeric Readout */}
            <div className="bg-slate-800 text-white p-4 rounded-2xl text-center">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="font-bold">Roll</div>
                  <div>15.2°</div>
                </div>
                <div>
                  <div className="font-bold">Pitch</div>
                  <div>-8.5°</div>
                </div>
                <div>
                  <div className="font-bold">Yaw</div>
                  <div>32.1°</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Guidance Panel */}
      {aiGuidanceActive && (
        <div className="bg-blue-50 border-t-2 border-blue-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold text-blue-800">Assistente AI - Modalità Cuore</h3>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-2xl border-2 border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2">Prossimo Step</h4>
                <p className="text-gray-600">Posiziona la sonda in vista parasternale</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-green-200">
                <h4 className="font-bold text-gray-800 mb-2">Qualità Immagine</h4>
                <p className="text-green-600 font-bold">Buona - 85%</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-orange-200">
                <h4 className="font-bold text-gray-800 mb-2">Strutture Rilevate</h4>
                <p className="text-gray-600">Ventricolo sinistro visibile</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveExamApp;
