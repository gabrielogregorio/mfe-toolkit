import { useHandleTasks } from '@/tasks/hooks/useHandleTasks';
import type { ISubTask, ITask } from '@/tasks/types';
import type { Context, ReactElement, ReactNode } from 'react';
import { createContext, useMemo } from 'react';

interface ITaskContextType {
  handleDropTask: (taskId: string) => void;
  handleAddSubTask: (taskId: string) => void;
  handleUpdateTask: (taskId: string, newStatus: Omit<Partial<ITask>, 'subtasks'>) => void;
  handleAddNewTask: () => void;
  handleDropSubTask: (taskId: string, subTaskId: string) => void;
  handleUpdateSubTask: (taskId: string, subTaskId: string, newData: Partial<ISubTask>) => void;
  tasks: ITask[];
}

export const TaskContext: Context<ITaskContextType> = createContext({} as ITaskContextType);

interface ITaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: ITaskProviderProps): ReactElement => {
  const {
    handleDropTask,
    handleAddSubTask,
    handleUpdateTask,
    handleAddNewTask,
    handleDropSubTask,
    handleUpdateSubTask,
    tasks,
  } = useHandleTasks();

  const value = useMemo(
    () => ({
      tasks,
      handleUpdateSubTask,
      handleDropSubTask,
      handleAddNewTask,
      handleUpdateTask,
      handleAddSubTask,
      handleDropTask,
    }),
    [
      tasks,
      handleUpdateSubTask,
      handleDropSubTask,
      handleAddNewTask,
      handleUpdateTask,
      handleAddSubTask,
      handleDropTask,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
