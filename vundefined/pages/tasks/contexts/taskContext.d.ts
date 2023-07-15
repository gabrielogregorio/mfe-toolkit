import type { ITask } from '@/tasks/types';
import type { Context, ReactElement, ReactNode } from 'react';
interface ITaskContextType {
    handleDropTask: (taskId: string) => void;
    handleUpdateTask: (taskId: string, newStatus: Partial<ITask>) => void;
    handleAddBatchNewTasks: (tasks: ITask[]) => void;
    handleAddNewTask: () => void;
    tasks: ITask[];
}
export declare const TaskContext: Context<ITaskContextType>;
interface ITaskProviderProps {
    children: ReactNode;
}
export declare const TaskProvider: ({ children }: ITaskProviderProps) => ReactElement;
export {};
