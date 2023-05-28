import { StorageService } from '@services/StorageService';
import { getActualDayAsNumber } from '@utils/getActualDayAsNumber';
import { taskStorageName } from '@/tasks/constants/storage';
import type { ITask } from '@/tasks/types';

const lastUpdateIsToday = (task: ITask): boolean => {
  return task.day === getActualDayAsNumber();
};

const resetStatusDoneInTasks = (task: ITask): ITask => {
  return {
    ...task,
    done: false,
    day: getActualDayAsNumber(),
  };
};

export const handleLoadNewDay = (): ITask[] => {
  const tasksDay: ITask[] = StorageService.getItemAndParse<ITask[]>(taskStorageName) || [];

  return tasksDay.map((task: ITask) => {
    if (lastUpdateIsToday(task)) {
      return task;
    }

    return resetStatusDoneInTasks(task);
  });
};
