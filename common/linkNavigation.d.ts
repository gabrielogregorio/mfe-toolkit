import type { ReactNode } from 'react';
interface IProps {
    href: string;
    icon?: ReactNode;
    children: ReactNode;
}
export declare const LinkNavigation: ({ href, children, icon }: IProps) => JSX.Element;
export {};
