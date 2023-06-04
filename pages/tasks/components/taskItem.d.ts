import type { ReactElement } from 'react';
import type { ITask } from '@/tasks/types';
interface ITaskItemProps {
    task: ITask;
}
export declare const TaskItem: ({ task }: ITaskItemProps) => ReactElement;
export {};
