import type { ReactElement } from 'react';
interface IProps {
    label: string;
    name: string;
    value: string;
    hiddenLabel?: boolean;
    update: (value: string) => void;
}
export declare const InputText: ({ label, name, value, hiddenLabel, update }: IProps) => ReactElement;
export {};
