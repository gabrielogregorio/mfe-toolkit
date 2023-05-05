import type { ITask } from '@pages/home/types';
import type { ReactElement } from 'react';
interface ITasksProps {
    tasks: ITask[];
    handleUpdateStatus: (taskId: number) => void;
    handleDropTask: (taskId: number) => void;
}
export declare const Tasks: ({ tasks, handleDropTask, handleUpdateStatus }: ITasksProps) => ReactElement;
export {};
