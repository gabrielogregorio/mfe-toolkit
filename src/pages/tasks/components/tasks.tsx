import type { ReactElement } from 'react';
import { TaskItem } from '@/tasks/components/taskItem';
import type { ITask } from '@/tasks/types';

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
