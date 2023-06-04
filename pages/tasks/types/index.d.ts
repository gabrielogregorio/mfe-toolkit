export declare enum TaskStatusEnum {
    'available' = "available",
    'disabled' = "disabled",
    'completed' = "completed"
}
export interface ITask {
    id: string;
    description: string;
    status: TaskStatusEnum;
}
export declare const tasksMock: ITask[];
