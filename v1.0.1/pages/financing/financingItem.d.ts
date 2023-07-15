import type { ReactElement } from 'react';
import type { IDataPrincipalType } from '@/financing/types';
interface IProps {
    update: (data: IDataPrincipalType) => void;
    removeItem: (id: string) => void;
    item: IDataPrincipalType;
}
export declare const FinancingItem: ({ item, removeItem, update }: IProps) => ReactElement;
export {};
