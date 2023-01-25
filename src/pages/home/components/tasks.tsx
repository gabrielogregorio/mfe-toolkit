import { TaskItem } from '@/pages/home/components/taskItem';
import type { ITask } from '@/pages/home/types';
import type { ReactElement } from 'react';

interface ITasksProps {
  tasks: ITask[];
  handleUpdateStatus: (taskId: number) => void;
  handleDropTask: (taskId: number) => void;
}

export const Tasks = ({ tasks, handleDropTask, handleUpdateStatus }: ITasksProps): ReactElement => {
  return (
    <div className="mt-4 border-red-400">
      {tasks.map((task: ITask) => {
        return (
          <TaskItem key={task.id} task={task} handleUpdateStatus={handleUpdateStatus} handleDropTask={handleDropTask} />
        );
      })}
    </div>
  );
};
