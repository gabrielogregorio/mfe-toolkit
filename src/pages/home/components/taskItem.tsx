import type { ITask } from '@pages/home/types';
import type { ReactElement } from 'react';

interface ITaskItemProps {
  task: ITask;
  handleUpdateStatus: (taskId: number) => void;
  handleDropTask: (taskId: number) => void;
}

export const TaskItem = ({ task, handleDropTask, handleUpdateStatus }: ITaskItemProps): ReactElement => {
  const styleTaskBaseIsDone: string = task.done ? 'bg-[#3d4046]' : 'bg-[#2d3036]';
  const styleTaskItemIsDone: string = task.done
    ? 'line-through border-l-teal-500 text-gray-500'
    : 'border-l-orange-500 text-white';

  return (
    <div
      key={task.id}
      className={`duration-700 md:hover:scale-105 hover:duration-150 transition-all flex ${styleTaskBaseIsDone}`}>
      <button
        type="button"
        onClick={(): void => handleUpdateStatus(task.id)}
        className={`border-l-4  pl-4 pr-7 py-2 flex-1 text-left text-lg capitalize select-none ${styleTaskItemIsDone} `}>
        {task.text}
      </button>

      <button
        type="button"
        className="bg-teal-500 text-white p-3 select-none"
        onClick={(): void => handleDropTask(task.id)}>
        X
      </button>
    </div>
  );
};
