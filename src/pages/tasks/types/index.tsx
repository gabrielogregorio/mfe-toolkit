export type TaskStatus = 'available' | 'disabled' | 'completed';

export interface ISubTask {
  id: string;
  parentTaskId: string;
  imageHref: string;
  estimatedTimeInSeconds: string | null;
  stopwatchInSeconds: number;
  description: string;
  status: TaskStatus;
}

export interface ITask {
  id: string;
  description: string;
  startTime: string | null;
  endTime: string | null;
  status: TaskStatus;
  subTasks: ISubTask[];
}

export const tasksMock: ITask[] = [
  {
    id: '1',
    description: 'Task 1',
    startTime: '00:00',
    endTime: null,
    status: 'available',
    subTasks: [
      {
        id: '1.1',
        parentTaskId: '1',
        description: '',
        imageHref: 'https://example.com/image1.jpg',
        estimatedTimeInSeconds: '03:00',
        stopwatchInSeconds: 0,
        status: 'available',
      },
      {
        id: '1.2',
        parentTaskId: '1',
        description: '',
        imageHref: 'https://example.com/image2.jpg',
        estimatedTimeInSeconds: '03:00',
        stopwatchInSeconds: 0,
        status: 'available',
      },
    ],
  },
  {
    id: '2',
    description: 'Task 2',
    startTime: '00:00',
    endTime: null,
    status: 'available',
    subTasks: [],
  },
];
