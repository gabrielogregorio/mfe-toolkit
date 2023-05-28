import type { ReactElement } from 'react';
import type { ITask } from '@/tasks/types';
interface ITasksProps {
    tasks: ITask[];
    handleUpdateStatus: (taskId: number) => void;
    handleDropTask: (taskId: number) => void;
}
export declare const Tasks: ({ tasks, handleDropTask, handleUpdateStatus }: ITasksProps) => ReactElement;
export {};
