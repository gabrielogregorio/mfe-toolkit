import type { ReactNode } from 'react';
type levelsType = 1 | 2 | 3 | 4 | 5;
interface IProps {
    level: levelsType;
    children: ReactNode;
}
export declare const BlockLevel: ({ children, level }: IProps) => JSX.Element;
export {};
