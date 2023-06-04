export enum TaskStatusEnum {
  'available' = 'available',
  'disabled' = 'disabled',
  'completed' = 'completed',
}

export interface ITask {
  id: string;
  description: string;
  status: TaskStatusEnum;
}

export const tasksMock: ITask[] = [
  {
    id: '1',
    description: 'Task 1',
    status: TaskStatusEnum.available,
  },
  {
    id: '2',
    description: 'Task 2',
    status: TaskStatusEnum.available,
  },
];
