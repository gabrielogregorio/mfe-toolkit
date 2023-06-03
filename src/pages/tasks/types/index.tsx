export type TaskStatus = 'available' | 'disabled' | 'completed';

export interface ITask {
  id: string;
  description: string;
  status: TaskStatus;
}

export const tasksMock: ITask[] = [
  {
    id: '1',
    description: 'Task 1',
    status: 'available',
  },
  {
    id: '2',
    description: 'Task 2',
    status: 'available',
  },
];
