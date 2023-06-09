import type { ReactNode } from 'react';
interface IProps {
    content: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
}
export declare const ButtonWithSound: ({ content, isActive, onClick }: IProps) => JSX.Element;
export {};
