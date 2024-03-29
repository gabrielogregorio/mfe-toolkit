import { taskStorageName } from '@/tasks/constants/storage';
import type { ITask } from '@/tasks/types';
import { StorageService } from 'example-kit-dev';

export const handleLoadNewDay = (): ITask[] => {
  const tasksDay: ITask[] = StorageService.getItemAndParse<ITask[]>(taskStorageName) || [];

  return tasksDay.map((task: ITask) => {
    return task;
  });
};
