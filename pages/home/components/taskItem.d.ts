import type { ITask } from '@pages/home/types';
import type { ReactElement } from 'react';
interface ITaskItemProps {
    task: ITask;
    handleUpdateStatus: (taskId: number) => void;
    handleDropTask: (taskId: number) => void;
}
export declare const TaskItem: ({ task, handleDropTask, handleUpdateStatus }: ITaskItemProps) => ReactElement;
export {};
