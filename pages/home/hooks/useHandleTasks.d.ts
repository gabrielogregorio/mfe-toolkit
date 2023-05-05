import type { ITask } from '@pages/home/types';
type resetFunctionType = () => void;
interface IUseHandleTasksResponse {
    handleDropTask: (taskId: number) => void;
    handleUpdateStatus: (taskId: number) => void;
    handleAddNewTask: (text: string, reset: resetFunctionType) => void;
    tasks: ITask[];
}
export declare const useHandleTasks: () => IUseHandleTasksResponse;
export {};
