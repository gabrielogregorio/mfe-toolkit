import type { ReactElement } from 'react';
import { AddItemForm } from '@/pages/home/components/addItemForm';
import { useHandleTasks } from '@/pages/home/hooks/useHandleTasks';
import { Tasks } from '@/pages/home/components/tasks';

export const HomePage = (): ReactElement => {
  const { handleDropTask, handleAddNewTask, handleUpdateStatus, tasks } = useHandleTasks();

  return (
    <div className="rounded-md shadow-md flex flex-col items-center py-8 min-h-screen">
      <div className="bg-red max-w-[30rem] mt-[8rem] w-full px-3">
        <AddItemForm addTask={handleAddNewTask} />

        <Tasks tasks={tasks} handleUpdateStatus={handleUpdateStatus} handleDropTask={handleDropTask} />
      </div>

      <div className="h-[10rem]" />
    </div>
  );
};
