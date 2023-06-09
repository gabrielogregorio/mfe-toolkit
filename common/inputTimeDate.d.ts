import type { ReactElement } from 'react';
interface IProps {
    label: string;
    name: string;
    value: string;
    hiddenLabel?: boolean;
    isDone?: boolean;
    update: (value: string) => void;
}
export declare const InputTimeDate: ({ label, name, value, hiddenLabel, isDone, update, }: IProps) => ReactElement;
export {};
