import type { ReactNode } from 'react';
interface IProps {
    children: ReactNode;
    fontSize?: string;
    isActive?: boolean;
}
export declare const Text: ({ children, fontSize, isActive }: IProps) => JSX.Element;
export {};
