
import React from 'react';
import OnScreenKeyboard from '@/components/OnScreenKeyboard';
import { useOnScreenKeyboard } from '@/hooks/useOnScreenKeyboard';

interface WithKeyboardLayoutProps {
  children: React.ReactNode;
}

const WithKeyboardLayout = ({ children }: WithKeyboardLayoutProps) => {
  const { isVisible, handleKeyPress, hideKeyboard, keyboardRef } = useOnScreenKeyboard({
    dismissOnOutsideClick: true,
    onKeyPress: (key, inputRef) => {
      console.log('Global keyboard key pressed:', key, 'on', inputRef?.tagName);
      if (inputRef) {
        if (key === 'BACKSPACE') {
          const currentValue = inputRef.value;
          const selectionStart = inputRef.selectionStart || 0;
          const selectionEnd = inputRef.selectionEnd || 0;
          
          if (selectionStart > 0) {
            const newValue = currentValue.slice(0, selectionStart - 1) + currentValue.slice(selectionEnd);
            inputRef.value = newValue;
            inputRef.setSelectionRange(selectionStart - 1, selectionStart - 1);
          }
        } else if (key === 'ENTER') {
          if (inputRef.tagName === 'TEXTAREA') {
            const currentValue = inputRef.value;
            const selectionStart = inputRef.selectionStart || 0;
            const newValue = currentValue.slice(0, selectionStart) + '\n' + currentValue.slice(selectionStart);
            inputRef.value = newValue;
            inputRef.setSelectionRange(selectionStart + 1, selectionStart + 1);
          } else {
            inputRef.blur();
          }
        } else {
          const currentValue = inputRef.value;
          const selectionStart = inputRef.selectionStart || 0;
          const selectionEnd = inputRef.selectionEnd || 0;
          const newValue = currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
          inputRef.value = newValue;
          inputRef.setSelectionRange(selectionStart + key.length, selectionStart + key.length);
        }
        
        // Trigger input event to update React state
        const event = new Event('input', { bubbles: true });
        inputRef.dispatchEvent(event);
      }
    }
  });

  return (
    <div ref={keyboardRef} className="relative min-h-screen">
      {children}
      <OnScreenKeyboard
        isVisible={isVisible}
        onKeyPress={handleKeyPress}
        onClose={hideKeyboard}
      />
    </div>
  );
};

export default WithKeyboardLayout;
