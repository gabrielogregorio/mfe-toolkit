import type { ReactElement } from 'react';
interface IAddItemFormProps {
    addTask: (text: string, reset: () => void) => void;
}
export declare const AddItemForm: ({ addTask }: IAddItemFormProps) => ReactElement;
export {};
