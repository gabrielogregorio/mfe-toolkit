import { useEffect, useState } from 'react';
import { taskStorageName } from '@/tasks/constants/storage';
import type { ITask } from '@/tasks/types';
import { handleLoadNewDay } from '@/tasks/utils/handleLoadNeDay';
import { StorageService } from '@/services/StorageService';

interface IUseHandleTasksResponse {
  handleDropTask: (taskId: string) => void;
  handleUpdateTask: (taskId: string, newStatus: Partial<ITask>) => void;
  handleAddNewTask: () => void;
  tasks: ITask[];
}

export const useHandleTasks = (): IUseHandleTasksResponse => {
  const [tasks, setTasks] = useState<ITask[]>(handleLoadNewDay());

  useEffect(() => {
    StorageService.setItem(taskStorageName, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddNewTask = (): void => {
    setTasks((prev: ITask[]) => [
      ...prev,
      {
        status: 'available',
        description: 'Jogar 1 Comp Valorant',
        id: new Date().getTime().toString(),
      },
    ]);
  };

  const handleDropTask = (taskId: string): void => {
    const tasksWithoutDropped: ITask[] = (JSON.parse(JSON.stringify(tasks)) as ITask[]).filter(
      (task: ITask) => task.id !== taskId,
    );
    setTasks(tasksWithoutDropped);
  };

  const handleUpdateTask = (taskId: string, newData: Partial<ITask>): void => {
    const newTasks: ITask[] = JSON.parse(JSON.stringify(tasks)) as ITask[];
    const tasksIdToUpdate: number = newTasks.findIndex((task: ITask) => task.id === taskId);

    if (tasksIdToUpdate >= 0) {
      newTasks[tasksIdToUpdate] = { ...newTasks[tasksIdToUpdate], ...newData };
      setTasks(newTasks);
    } else {
      // eslint-disable-next-line no-console
      console.error(`taskId '${taskId}' not found to update status to '${JSON.stringify(newData)}'`);
    }
  };

  return {
    handleDropTask,
    handleUpdateTask,
    handleAddNewTask,
    tasks,
  };
};
