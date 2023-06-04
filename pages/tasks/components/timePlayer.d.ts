import type { ReactElement } from 'react';
interface IProps {
    time: string;
    pause: () => void;
    resume: () => void;
}
export declare const TimePlayer: ({ time, pause, resume }: IProps) => ReactElement;
export {};
