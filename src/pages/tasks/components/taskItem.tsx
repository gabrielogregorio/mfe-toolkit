import type { ReactElement } from 'react';
import { useContext, useRef, useEffect, useState } from 'react';
import type { ITask } from '@/tasks/types';
import { TaskStatusEnum } from '@/tasks/types';
import { InputText } from '@/common/inputText';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { ButtonWithSound, TextVariantEnum, useOutsideClick } from 'ogregorio-component-library-studies';

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem = ({ task }: ITaskItemProps): ReactElement => {
  const styleTaskItemIsDone: string =
    task.status === TaskStatusEnum.completed ? 'line-through text-gray-500' : 'text-white';

  const [name, setName] = useState<string>(task.description);

  const [optionsIsOpen, setOptionsIsOpen] = useState<boolean>(false);

  const { handleUpdateTask, handleDropTask } = useContext(TaskContext);

  const refOptions = useRef<HTMLDivElement>(null);
  const { clickedOutside } = useOutsideClick(refOptions);
  useEffect(() => {
    setOptionsIsOpen(false);
  }, [clickedOutside]);

  useEffect(() => {
    if (task.description !== name) {
      handleUpdateTask(task.id, { description: name });
    }
  }, [name]);

  return (
    <div className="w-full">
      <div key={task.id} className="flex rounded-[3px] group">
        <div
          className={`text-left flex w-[90%] flex-1 items-start text-base text-white font-semibold select-none  ${styleTaskItemIsDone} `}>
          <span className="w-[21px]" />
          <div className="flex-1">
            <InputText
              label="nome"
              name="name"
              value={name}
              update={(value): void => setName(value)}
              hiddenLabel
              isDone={task.status === TaskStatusEnum.completed}
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="marcar concluído"
          className="flex-1"
          onClick={(): void => {
            if (task.status === TaskStatusEnum.completed) {
              handleUpdateTask(task.id, { status: TaskStatusEnum.available });
            } else if (task.status === TaskStatusEnum.available) {
              handleUpdateTask(task.id, { status: TaskStatusEnum.completed });
            }
          }}
        />
        <button
          type="button"
          aria-label="marcar concluído"
          className="min-w-[22px] min-h-[22px] max-w-[22px] max-h-[22px]  block mt-2 w-full h-full rounded-full border border-white"
          onClick={(): void => {
            if (task.status === TaskStatusEnum.completed) {
              handleUpdateTask(task.id, { status: TaskStatusEnum.available });
            } else if (task.status === TaskStatusEnum.available) {
              handleUpdateTask(task.id, { status: TaskStatusEnum.completed });
            }
          }}>
          {task.status === TaskStatusEnum.completed ? (
            <svg
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[22px]">
              <path
                d="M6.85353 0.146468C7.04882 0.341759 7.04882 0.658911 6.85353 0.854201L2.85398 4.85376C2.65869 5.04905 2.34154 5.04905 2.14624 4.85376L0.146468 2.85398C-0.0488227 2.65869 -0.0488227 2.34154 0.146468 2.14624C0.341759 1.95095 0.658911 1.95095 0.854201 2.14624L2.50089 3.79137L6.14736 0.146468C6.34265 -0.0488227 6.6598 -0.0488227 6.85509 0.146468H6.85353Z"
                fill="white"
              />
            </svg>
          ) : undefined}
        </button>

        <div className="flex gap-[47px] items-center justify-center ml-[1rem]">
          <div className="relative" ref={refOptions}>
            <button
              type="button"
              aria-label="opções"
              onClick={(): void => setOptionsIsOpen((prev) => !prev)}
              className="block bg-red-300 px-[1rem] cursor-pointer py-[.8rem]">
              <span className="block min-w-[10px] min-h-[10px] max-w-[10px] max-h-[10px] group-hover:bg-white rounded-full group-hover:scale-[180%] duration-150 transition-all" />
            </button>

            {optionsIsOpen ? (
              <div className="absolute bg-black/70 flex flex-col items-start z-[20] rounded-[3px] animate-fadeInDrop right-0 mt-2 px-[1rem] py-[1rem]">
                <ButtonWithSound
                  variant={TextVariantEnum.basicItemMenu}
                  content="Excluir"
                  onClick={(): void => {
                    handleDropTask(task.id);
                    setOptionsIsOpen(false);
                  }}
                />
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};
