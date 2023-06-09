import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLDivElement>): { clickedOutside: boolean } => {
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const referencesContainTarget = (): boolean => !ref.current?.contains(event.target as Node);
      const clickedOutsideReference: boolean = (ref.current && referencesContainTarget()) || false;

      setClickedOutside(clickedOutsideReference);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref.current]);

  return { clickedOutside };
};
