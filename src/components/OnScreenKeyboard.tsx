
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Backspace, Space, CornerDownLeft } from 'lucide-react';

interface OnScreenKeyboardProps {
  isVisible: boolean;
  onKeyPress: (key: string) => void;
  onClose: () => void;
}

const OnScreenKeyboard = ({ isVisible, onKeyPress, onClose }: OnScreenKeyboardProps) => {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyPress = (key: string) => {
    onKeyPress(key);
  };

  const handleBackspace = () => {
    onKeyPress('BACKSPACE');
  };

  const handleSpace = () => {
    onKeyPress(' ');
  };

  const handleEnter = () => {
    onKeyPress('ENTER');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
      <Card 
        ref={keyboardRef}
        className="w-full max-w-4xl mx-4 mb-4 p-4 bg-white dark:bg-slate-800 rounded-t-lg shadow-2xl animate-slide-in-bottom"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Tastiera Virtuale
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-2">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => handleKeyPress(key)}
                  className="min-w-[40px] h-10 text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {key}
                </Button>
              ))}
            </div>
          ))}
          
          {/* Special keys row */}
          <div className="flex justify-center gap-1 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackspace}
              className="min-w-[80px] h-10 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <Backspace className="w-4 h-4 mr-1" />
              Cancella
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSpace}
              className="min-w-[200px] h-10 text-sm font-medium hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              <Space className="w-4 h-4 mr-1" />
              Spazio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEnter}
              className="min-w-[80px] h-10 text-sm font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4 mr-1" />
              Invio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnScreenKeyboard;
