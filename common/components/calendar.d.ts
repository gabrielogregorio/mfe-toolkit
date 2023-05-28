import type { ReactElement } from 'react';
interface IProps {
    name: string;
    update: (value: number) => void;
    value: number;
}
export declare const Calendar: ({ name, update, value }: IProps) => ReactElement;
export {};
