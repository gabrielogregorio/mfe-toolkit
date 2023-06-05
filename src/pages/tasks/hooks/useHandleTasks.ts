import { useEffect, useState } from 'react';
import { taskStorageName } from '@/tasks/constants/storage';
import type { ISubTask, ITask } from '@/tasks/types';
import { handleLoadNewDay } from '@/tasks/utils/handleLoadNeDay';
import { StorageService } from 'example-kit-dev';

class BuilderSubTask {
  public static builder(taskId: string): ISubTask {
    return {
      id: new Date().getTime().toString(),
      parentTaskId: taskId,
      description: 'voar com a raze',
      imageHref: '',
      estimatedTimeInSeconds: null,
      stopwatchInSeconds: 0,
      status: 'available',
    };
  }
}

interface IUseHandleTasksResponse {
  handleDropTask: (taskId: string) => void;
  handleAddSubTask: (taskId: string) => void;
  handleUpdateTask: (taskId: string, newStatus: Omit<Partial<ITask>, 'subtasks'>) => void;
  handleAddNewTask: () => void;
  handleDropSubTask: (taskId: string, subTaskId: string) => void;
  handleUpdateSubTask: (taskId: string, subTaskId: string, newData: Partial<ISubTask>) => void;
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
        subTasks: [],
        startTime: null,
        endTime: null,
        id: new Date().getTime().toString(),
      },
    ]);
  };

  const handleAddSubTask = (taskId: string): void => {
    const newTasks: ITask[] = JSON.parse(JSON.stringify(tasks)) as ITask[];
    const tasksIdToUpdate: number = newTasks.findIndex((task: ITask) => task.id === taskId);

    if (tasksIdToUpdate >= 0) {
      newTasks[tasksIdToUpdate].subTasks.push(BuilderSubTask.builder(taskId));
      setTasks(newTasks);
    } else {
      // eslint-disable-next-line no-console
      console.error(`taskId '${taskId}' not found to add subtask`);
    }
  };

  const handleDropTask = (taskId: string): void => {
    const tasksWithoutDropped: ITask[] = (JSON.parse(JSON.stringify(tasks)) as ITask[]).filter(
      (task: ITask) => task.id !== taskId,
    );
    setTasks(tasksWithoutDropped);
  };

  const handleDropSubTask = (taskId: string, subTaskId: string): void => {
    const newTasks: ITask[] = JSON.parse(JSON.stringify(tasks)) as ITask[];
    const tasksIdToUpdate: number = newTasks.findIndex((task: ITask) => task.id === taskId);

    if (tasksIdToUpdate >= 0) {
      const newData = newTasks[tasksIdToUpdate].subTasks.filter((subTask: ISubTask) => subTask.id !== subTaskId);

      newTasks[tasksIdToUpdate].subTasks = newData;
      setTasks(newTasks);
    } else {
      // eslint-disable-next-line no-console
      console.error(`taskId '${taskId}' not found to to delete`);
    }
  };

  const handleUpdateSubTask = (taskId: string, subTaskId: string, newData: Partial<ISubTask>): void => {
    const newTasks: ITask[] = JSON.parse(JSON.stringify(tasks)) as ITask[];
    const tasksIdToUpdate: number = newTasks.findIndex((task: ITask) => task.id === taskId);

    if (tasksIdToUpdate >= 0) {
      const subTaskFinded = newTasks[tasksIdToUpdate].subTasks.findIndex(
        (subTask: ISubTask) => subTask.id === subTaskId,
      );
      if (subTaskFinded >= 0) {
        newTasks[tasksIdToUpdate].subTasks[subTaskFinded] = {
          ...newTasks[tasksIdToUpdate].subTasks[subTaskFinded],
          ...newData,
        };
        setTasks(newTasks);
      } else {
        // eslint-disable-next-line no-console
        console.error(`subtask '${subTaskId}' not found in task '${taskId}' update description to '${newData}'`);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error(`taskId '${taskId}' not found to update description to '${newData}'`);
    }
  };

  const handleUpdateTask = (taskId: string, newData: Omit<Partial<ITask>, 'subtasks'>): void => {
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
    handleAddSubTask,
    handleAddNewTask,
    handleDropSubTask,
    handleUpdateSubTask,
    tasks,
  };
};
