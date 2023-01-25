import { taskStorageName } from '@/pages/home/constants/storage';
import type { ITask } from '@/pages/home/types';
import { handleLoadNewDay } from '@/pages/home/utils/handleLoadNeDay';
import { StorageService } from '@/services/StorageService';
import { getActualDayAsNumber } from '@/utils/getActualDayAsNumber';
import { useEffect, useState } from 'react';

type resetFunctionType = () => void;

interface IUseHandleTasksResponse {
  handleDropTask: (taskId: number) => void;
  handleUpdateStatus: (taskId: number) => void;
  handleAddNewTask: (text: string, reset: resetFunctionType) => void;
  tasks: ITask[];
}

export const useHandleTasks = (): IUseHandleTasksResponse => {
  const [tasks, setTasks] = useState<ITask[]>(handleLoadNewDay());

  useEffect(() => {
    StorageService.setItem(taskStorageName, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddNewTask = (text: string, reset: resetFunctionType): void => {
    if (text.trim() === '') {
      return;
    }
    setTasks((prev: ITask[]) => [
      ...prev,
      { done: false, text, id: new Date().getTime(), day: getActualDayAsNumber() },
    ]);
    reset();
  };

  const handleDropTask = (taskId: number): void => {
    const tasksWithoutDropped: ITask[] = tasks.filter((task: ITask) => task.id !== taskId);
    setTasks(tasksWithoutDropped);
  };

  const handleUpdateStatus = (taskId: number): void => {
    const newTasks: ITask[] = JSON.parse(JSON.stringify(tasks)) as ITask[];
    const tasksIdToUpdate: number = newTasks.findIndex((task: ITask) => task.id === taskId);

    newTasks[tasksIdToUpdate].done = !newTasks[tasksIdToUpdate].done;

    setTasks(newTasks);
  };

  return {
    handleDropTask,
    handleUpdateStatus,
    handleAddNewTask,
    tasks,
  };
};
