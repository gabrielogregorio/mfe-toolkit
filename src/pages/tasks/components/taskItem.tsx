import type { ReactElement } from 'react';
import { useContext, useRef, useEffect, useState } from 'react';
import type { ITask } from '@/tasks/types';
import { InputText } from '@/common/components/inputText';
import { useOutsideClick } from '@/common/hooks/useOutsideClick';
import { TaskContext } from '@/tasks/contexts/taskContext';

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem = ({ task }: ITaskItemProps): ReactElement => {
  const styleTaskItemIsDone: string = task.status === 'completed' ? 'line-through text-gray-500' : 'text-white';
  const styleBoxIsSelected =
    task.status === 'completed' ? ' border border-[#58C0FF] bg-[#58C0FF]' : ' border border-[#A9A9A9]';
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
    <div>
      <div key={task.id} className="flex px-[16px] py-[24px] bg-[#212332] rounded-[3px] group">
        <div
          className={`text-left flex items-center text-base text-white font-semibold select-none  ${styleTaskItemIsDone} `}>
          <button
            type="button"
            aria-label="marcar concluído"
            className={`max-w-[22px] max-h-[22px] w-full h-full rounded-[3px] ${styleBoxIsSelected}`}
            onClick={(): void => {
              if (task.status === 'completed') {
                handleUpdateTask(task.id, { status: 'available' });
              } else if (task.status === 'available') {
                handleUpdateTask(task.id, { status: 'completed' });
              }
            }}
          />

          <span className="w-[21px]" />
          <InputText
            label="nome"
            name="name"
            value={name}
            update={(value): void => setName(value)}
            hiddenLabel
            isDone={task.status === 'completed'}
          />
        </div>

        <div className="flex-1" />

        <div className="flex gap-[47px]  ">
          <div className="relative">
            <button type="button" onClick={(): void => setOptionsIsOpen((prev) => !prev)}>
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_85_45)">
                  <path
                    d="M10.5 0C7.71523 0 5.04451 1.10625 3.07538 3.07538C1.10625 5.04451 0 7.71523 0 10.5C0 13.2848 1.10625 15.9555 3.07538 17.9246C5.04451 19.8938 7.71523 21 10.5 21C13.2848 21 15.9555 19.8938 17.9246 17.9246C19.8938 15.9555 21 13.2848 21 10.5C21 7.71523 19.8938 5.04451 17.9246 3.07538C15.9555 1.10625 13.2848 0 10.5 0ZM5.53711 9.88477C5.15156 9.49922 5.15156 8.87578 5.53711 8.49434C5.92266 8.11289 6.54609 8.10879 6.92754 8.49434L10.4959 12.0627L14.0643 8.49434C14.4498 8.10879 15.0732 8.10879 15.4547 8.49434C15.8361 8.87988 15.8402 9.50332 15.4547 9.88477L11.1973 14.1504C10.8117 14.5359 10.1883 14.5359 9.80684 14.1504L5.53711 9.88477Z"
                    fill="#A9A9A9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_85_45">
                    <rect width="21" height="21" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

            {optionsIsOpen ? (
              <div
                className="absolute bg-[#2F3241] min-w-[354px] flex flex-col items-start z-[20] rounded-[3px] right-0 mt-2"
                ref={refOptions}>
                <h4 className="py-[14px] text-center w-full text-base font-semibold">Opções</h4>

                <div className="border-b border-[#A9A9A9] w-full" />

                <button
                  type="button"
                  onClick={(): void => {
                    handleDropTask(task.id);
                    setOptionsIsOpen(false);
                  }}
                  className="text-base font-semibold text-white px-[26px] py-[19px] w-full text-left hover:bg-[#3D4153]">
                  Excluir
                </button>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};
