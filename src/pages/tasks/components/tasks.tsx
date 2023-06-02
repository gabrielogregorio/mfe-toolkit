import type { ReactElement } from 'react';
import { useContext } from 'react';
import { TaskItem } from '@/tasks/components/taskItem';
import type { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/taskContext';

export const Tasks = (): ReactElement => {
  const { tasks, handleAddNewTask } = useContext(TaskContext);

  return (
    <div className="flex flex-col gap-[21px] w-full">
      {tasks.map((task: ITask) => {
        return <TaskItem key={task.id} task={task} />;
      })}

      <div>
        <button
          type="button"
          className="bg-[#212332] text-white flex py-[14px] px-[27px] rounded-[3px]"
          onClick={(): void => handleAddNewTask()}>
          <span className="font-semibold text-[1rem]">Nova task</span>

          <span className="ml-[54px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM10.875 16.125V13.125H7.875C7.25156 13.125 6.75 12.6234 6.75 12C6.75 11.3766 7.25156 10.875 7.875 10.875H10.875V7.875C10.875 7.25156 11.3766 6.75 12 6.75C12.6234 6.75 13.125 7.25156 13.125 7.875V10.875H16.125C16.7484 10.875 17.25 11.3766 17.25 12C17.25 12.6234 16.7484 13.125 16.125 13.125H13.125V16.125C13.125 16.7484 12.6234 17.25 12 17.25C11.3766 17.25 10.875 16.7484 10.875 16.125Z"
                fill="#5FFF6F"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};