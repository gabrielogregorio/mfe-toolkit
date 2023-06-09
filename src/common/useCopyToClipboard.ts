import { useState, useCallback } from 'react';

const TIME_IN_MS = 2000;

interface IResponseType {
  copy: (text: string) => void;
  isCopied: boolean;
}

export const useCopyToClipboard = (): IResponseType => {
  const [isCopied, setCopied] = useState(false);

  const copy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), TIME_IN_MS);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error('Error on copy text ', err));
  }, []);

  return { isCopied, copy };
};
