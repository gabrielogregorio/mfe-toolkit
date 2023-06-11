import type { ReactElement } from 'react';
import { useContext, useEffect, useState } from 'react';
import type { ITask } from '@/tasks/types';
import { TaskStatusEnum } from '@/tasks/types';
import { InputText } from '@/common/inputText';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { BlockCheck } from '@/common/blockCheck';

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem = ({ task }: ITaskItemProps): ReactElement => {
  const [name, setName] = useState<string>(task.description);

  const { handleUpdateTask, handleDropTask } = useContext(TaskContext);

  useEffect(() => {
    if (task.description !== name) {
      handleUpdateTask(task.id, { description: name });
    }
  }, [name]);

  return (
    <tr className="group w-full py-[2px]">
      <td className="py-[4px] px-[5px] text-left">
        <InputText
          name="name"
          isRisked={task.status === TaskStatusEnum.completed}
          value={name}
          update={(value): void => setName(value)}
        />
      </td>

      <td className="py-[4px] px-[5px] pl-[62px] text-left">
        <BlockCheck
          isChecked={task.status === TaskStatusEnum.completed}
          update={(newValue) => {
            if (newValue) {
              handleUpdateTask(task.id, { status: TaskStatusEnum.completed });
            } else {
              handleUpdateTask(task.id, { status: TaskStatusEnum.available });
            }
          }}
        />
      </td>
      <td className="py-[4px] px-[5px] pl-[62px] text-left">
        <button
          type="button"
          className="w-[35px] h-[20px] flex items-center justify-center"
          onClick={(): void => {
            handleDropTask(task.id);
          }}>
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="invisible group-hover:visible">
            <path
              d="M3.69687 0.483984L3.5 0.875H0.875C0.391016 0.875 0 1.26602 0 1.75C0 2.23398 0.391016 2.625 0.875 2.625H11.375C11.859 2.625 12.25 2.23398 12.25 1.75C12.25 1.26602 11.859 0.875 11.375 0.875H8.75L8.55312 0.483984C8.40547 0.185938 8.10195 0 7.77109 0H4.47891C4.14805 0 3.84453 0.185938 3.69687 0.483984ZM11.375 3.5H0.875L1.45469 12.7695C1.49844 13.4613 2.07266 14 2.76445 14H9.48555C10.1773 14 10.7516 13.4613 10.7953 12.7695L11.375 3.5Z"
              fill="white"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};
