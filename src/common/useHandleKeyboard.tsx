import { useEffect } from 'react';

export const useHandleKeyboard = (onTouchEsc: (key: string) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      onTouchEsc(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    // Limpeza ao desmontar
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Nota: array vazio como segundo argumento para que o efeito seja executado apenas na montagem e desmontagem
};
