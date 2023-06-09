import type { Context, Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { createContext, useMemo, useState } from 'react';

interface IAcceptAudioContextType {
  acceptAudio: boolean;
  setAcceptAudio: (acceptAudio: boolean) => void;
}

export const AcceptAudioContext: Context<IAcceptAudioContextType> = createContext({} as IAcceptAudioContextType);

interface IProps {
  children: ReactNode;
}

export const AcceptAudioProvider = ({ children }: IProps): ReactElement => {
  const [acceptAudio, setAcceptAudio] = useState<boolean>(true);

  const value: {
    acceptAudio: boolean;
    setAcceptAudio: Dispatch<SetStateAction<boolean>>;
  } = useMemo(() => ({ acceptAudio, setAcceptAudio }), [acceptAudio]);

  return <AcceptAudioContext.Provider value={value}>{children}</AcceptAudioContext.Provider>;
};
