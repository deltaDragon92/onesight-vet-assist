
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseOnScreenKeyboardProps {
  onKeyPress?: (key: string, inputRef: HTMLInputElement | HTMLTextAreaElement | null) => void;
  dismissOnOutsideClick?: boolean;
}

export const useOnScreenKeyboard = ({ 
  onKeyPress, 
  dismissOnOutsideClick = true 
}: UseOnScreenKeyboardProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  const showKeyboard = useCallback((inputElement: HTMLInputElement | HTMLTextAreaElement) => {
    setActiveInput(inputElement);
    setIsVisible(true);
  }, []);

  const hideKeyboard = useCallback(() => {
    setIsVisible(false);
    setActiveInput(null);
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (!activeInput) return;

    if (key === 'BACKSPACE') {
      const currentValue = activeInput.value;
      const selectionStart = activeInput.selectionStart || 0;
      const selectionEnd = activeInput.selectionEnd || 0;
      
      if (selectionStart > 0) {
        const newValue = currentValue.slice(0, selectionStart - 1) + currentValue.slice(selectionEnd);
        activeInput.value = newValue;
        activeInput.setSelectionRange(selectionStart - 1, selectionStart - 1);
      }
    } else if (key === 'ENTER') {
      if (activeInput.tagName === 'TEXTAREA') {
        const currentValue = activeInput.value;
        const selectionStart = activeInput.selectionStart || 0;
        const newValue = currentValue.slice(0, selectionStart) + '\n' + currentValue.slice(selectionStart);
        activeInput.value = newValue;
        activeInput.setSelectionRange(selectionStart + 1, selectionStart + 1);
      } else {
        activeInput.blur();
        hideKeyboard();
      }
    } else {
      const currentValue = activeInput.value;
      const selectionStart = activeInput.selectionStart || 0;
      const selectionEnd = activeInput.selectionEnd || 0;
      const newValue = currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
      activeInput.value = newValue;
      activeInput.setSelectionRange(selectionStart + key.length, selectionStart + key.length);
    }

    // Trigger input event to update React state
    const event = new Event('input', { bubbles: true });
    activeInput.dispatchEvent(event);

    if (onKeyPress) {
      onKeyPress(key, activeInput);
    }
  }, [activeInput, onKeyPress, hideKeyboard]);

  // Auto-activation on focus
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const inputElement = target as HTMLInputElement | HTMLTextAreaElement;
        // Skip if it's a button or other non-text input
        if (target.tagName === 'INPUT' && (target as HTMLInputElement).type && 
            !['text', 'email', 'password', 'search', 'tel', 'url'].includes((target as HTMLInputElement).type)) {
          return;
        }
        showKeyboard(inputElement);
      }
    };

    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Small delay to allow keyboard interaction
        setTimeout(() => {
          if (!keyboardRef.current?.contains(document.activeElement)) {
            hideKeyboard();
          }
        }, 100);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!dismissOnOutsideClick || !isVisible) return;

      const target = event.target as HTMLElement;
      const isInputClick = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      const isKeyboardClick = keyboardRef.current?.contains(target);

      if (!isInputClick && !isKeyboardClick) {
        hideKeyboard();
      }
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
      document.removeEventListener('click', handleClick);
    };
  }, [showKeyboard, hideKeyboard, dismissOnOutsideClick, isVisible]);

  return {
    isVisible,
    showKeyboard,
    hideKeyboard,
    handleKeyPress,
    keyboardRef
  };
};
