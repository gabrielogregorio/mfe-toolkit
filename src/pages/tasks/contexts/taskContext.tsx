import { useHandleTasks } from '@/tasks/hooks/useHandleTasks';
import type { ITask } from '@/tasks/types';
import type { Context, ReactElement, ReactNode } from 'react';
import { createContext, useMemo } from 'react';

interface ITaskContextType {
  handleDropTask: (taskId: string) => void;
  handleUpdateTask: (taskId: string, newStatus: Partial<ITask>) => void;
  handleAddNewTask: () => void;
  tasks: ITask[];
}

export const TaskContext: Context<ITaskContextType> = createContext({} as ITaskContextType);

interface ITaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: ITaskProviderProps): ReactElement => {
  const { handleDropTask, handleUpdateTask, handleAddNewTask, tasks } = useHandleTasks();

  const value = useMemo(
    () => ({
      tasks,
      handleAddNewTask,
      handleUpdateTask,
      handleDropTask,
    }),
    [tasks, handleAddNewTask, handleUpdateTask, handleDropTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
