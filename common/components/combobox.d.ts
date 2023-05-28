import type { ReactElement, ReactNode } from 'react';
interface IProps<T> {
    label: string;
    name: string;
    initial: T;
    hiddenLabel?: boolean;
    options: T[];
    update: (value: T) => void;
}
export declare const Combobox: <T extends {
    name: string;
    icon: ReactNode;
}>({ label, name, initial, hiddenLabel, options, update, }: IProps<T>) => ReactElement;
export {};
