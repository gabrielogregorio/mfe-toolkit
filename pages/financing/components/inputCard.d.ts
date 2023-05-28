import type { ReactElement } from 'react';
interface IProps {
    label: string;
    name: string;
    value: string;
    update: (value: string) => void;
}
export declare const InputCard: ({ label, name, value, update }: IProps) => ReactElement;
export {};
