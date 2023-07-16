import type { ITask } from '@/tasks/types';
interface IUseHandleTasksResponse {
    handleDropTask: (taskId: string) => void;
    handleUpdateTask: (taskId: string, newStatus: Partial<ITask>) => void;
    handleAddBatchNewTasks: (tasks: ITask[]) => void;
    handleAddNewTask: () => void;
    tasks: ITask[];
}
export declare const useHandleTasks: () => IUseHandleTasksResponse;
export {};
