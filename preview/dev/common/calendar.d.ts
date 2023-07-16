import type { ReactElement } from 'react';
interface IProps {
    name: string;
    update: (value: number) => void;
    value: number;
    isRisked?: boolean;
}
export declare const Calendar: ({ name, update, value, isRisked }: IProps) => ReactElement;
export {};
