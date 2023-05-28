import type { ReactElement } from 'react';
import { AddItemForm } from '@/tasks/components/addItemForm';
import { useHandleTasks } from '@/tasks/hooks/useHandleTasks';
import { Tasks } from '@/tasks/components/tasks';

export const TasksPage = (): ReactElement => {
  const { handleDropTask, handleAddNewTask, handleUpdateStatus, tasks } = useHandleTasks();

  return (
    <div className="flex flex-col items-center py-8 text-white">
      <div className="bg-red max-w-[30rem] mt-[8rem] w-full px-3">
        <AddItemForm addTask={handleAddNewTask} />

        <Tasks tasks={tasks} handleUpdateStatus={handleUpdateStatus} handleDropTask={handleDropTask} />
      </div>

      <div className="h-[10rem]" />
    </div>
  );
};
