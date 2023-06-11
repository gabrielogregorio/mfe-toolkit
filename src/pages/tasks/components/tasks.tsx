import type { ReactElement } from 'react';
import { useContext } from 'react';
import { TaskItem } from '@/tasks/components/taskItem';
import type { ITask } from '@/tasks/types';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { Button } from 'ogregorio-component-library-studies';

export const Tasks = (): ReactElement => {
  const { tasks, handleAddNewTask } = useContext(TaskContext);

  return (
    <div className="flex flex-col gap-[21px] mt-[1rem] max-w-[620px] w-full">
      <table className="table-auto text-white">
        <thead className="font-roboto">
          <tr>
            <th className="text-white/60 text-left py-[4px] px-[5px]">TASK</th>
            <th className="text-white/60 text-left py-[4px] px-[5px] pl-[62px]">CONCLUDA</th>
            <th className="text-white/60 text-left py-[4px] px-[5px] pl-[62px]">AÇÕES</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task: ITask) => {
            return <TaskItem key={task.id} task={task} />;
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-start">
        <span className="font-semibold text-[1rem]" />

        <Button
          onClick={(): void => handleAddNewTask()}
          content="NOVA TASK"
          iconLeft={
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.5 11C6.95869 11 8.35764 10.4205 9.38909 9.38909C10.4205 8.35764 11 6.95869 11 5.5C11 4.04131 10.4205 2.64236 9.38909 1.61091C8.35764 0.579463 6.95869 0 5.5 0C4.04131 0 2.64236 0.579463 1.61091 1.61091C0.579463 2.64236 0 4.04131 0 5.5C0 6.95869 0.579463 8.35764 1.61091 9.38909C2.64236 10.4205 4.04131 11 5.5 11ZM4.98438 7.39062V6.01562H3.60938C3.32363 6.01562 3.09375 5.78574 3.09375 5.5C3.09375 5.21426 3.32363 4.98438 3.60938 4.98438H4.98438V3.60938C4.98438 3.32363 5.21426 3.09375 5.5 3.09375C5.78574 3.09375 6.01562 3.32363 6.01562 3.60938V4.98438H7.39062C7.67637 4.98438 7.90625 5.21426 7.90625 5.5C7.90625 5.78574 7.67637 6.01562 7.39062 6.01562H6.01562V7.39062C6.01562 7.67637 5.78574 7.90625 5.5 7.90625C5.21426 7.90625 4.98438 7.67637 4.98438 7.39062Z"
                fill="white"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};
