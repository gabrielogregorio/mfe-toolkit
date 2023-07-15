import type { Context, ReactElement, ReactNode } from 'react';
interface IAcceptAudioContextType {
    acceptAudio: boolean;
    setAcceptAudio: (acceptAudio: boolean) => void;
}
export declare const AcceptAudioContext: Context<IAcceptAudioContextType>;
interface IProps {
    children: ReactNode;
}
export declare const AcceptAudioProvider: ({ children }: IProps) => ReactElement;
export {};
