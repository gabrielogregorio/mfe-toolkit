import type { ReactElement } from 'react';
interface IProps {
    isChecked: boolean;
    update: (value: boolean) => void;
}
export declare const BlockCheck: ({ isChecked, update }: IProps) => ReactElement;
export {};
