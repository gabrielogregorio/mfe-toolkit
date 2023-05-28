import type { ReactElement } from 'react';
import type { ITask } from '@/tasks/types';
interface ITaskItemProps {
    task: ITask;
    handleUpdateStatus: (taskId: number) => void;
    handleDropTask: (taskId: number) => void;
}
export declare const TaskItem: ({ task, handleDropTask, handleUpdateStatus }: ITaskItemProps) => ReactElement;
export {};
