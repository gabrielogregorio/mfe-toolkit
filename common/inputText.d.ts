import type { ReactElement } from 'react';
type inputMasks = 'default' | 'brl';
interface IInputTextProps {
    name: string;
    value: string;
    update: (value: string) => void;
    mask?: inputMasks;
    isRisked?: boolean;
    isDisabled?: boolean;
}
export declare const InputText: ({ name, value, update, isRisked, mask, isDisabled, }: IInputTextProps) => ReactElement;
export {};
