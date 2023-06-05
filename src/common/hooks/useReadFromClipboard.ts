/* eslint-disable no-console */
import { useCallback } from 'react';

export const useReadFromClipboard = (): { readClipboard: () => Promise<string> } => {
  const readClipboard = useCallback(async () => {
    return navigator.clipboard
      .readText()
      .then((text) => text)
      .catch((err) => {
        console.error('Could not read clipboard: ', err);
        return '';
      });
  }, []);

  return { readClipboard };
};
