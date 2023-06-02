/* eslint-disable max-lines */
import type { ReactElement } from 'react';
import { useContext, useRef, useEffect, useState } from 'react';
import type { ISubTask, ITask } from '@/tasks/types';
import { InputText } from '@/common/components/inputText';
import { useOutsideClick } from '@/common/hooks/useOutsideClick';
import { TimePlayer } from '@/tasks/components/timePlayer';
import { useTimer } from '@/tasks/components/useTimer';
import { TaskContext } from '@/tasks/contexts/taskContext';
import { InputTimeDate } from '@/common/components/inputTimeDate';
import { InputStartAndEnd } from '@/common/components/inputStartAndEnd';

interface ITaskItemProps {
  task: ITask;
}

const SubTaskItem = ({ item }: { item: ISubTask }): ReactElement => {
  // eslint-disable-next-line no-magic-numbers
  const { time, pause, resume } = useTimer(10);
  const { handleUpdateSubTask, handleDropSubTask } = useContext(TaskContext);
  const [optionsIsOpen, setOptionsIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(item.description);
  const [seconds, setSeconds] = useState<string>('00:00');

  useEffect(() => {
    if (name !== item.description) {
      handleUpdateSubTask(item.parentTaskId, item.id, { description: name });
    }
  }, [name]);

  useEffect(() => {
    if (seconds !== item.estimatedTimeInSeconds) {
      handleUpdateSubTask(item.parentTaskId, item.id, { estimatedTimeInSeconds: seconds });
    }
  }, [seconds]);

  const refOptions = useRef<HTMLDivElement>(null);
  const { clickedOutside } = useOutsideClick(refOptions);
  useEffect(() => {
    setOptionsIsOpen(false);
  }, [clickedOutside]);

  return (
    <div>
      <div className="bg-[#212332] flex items-center justify-evenly gap-[27px] py-[24px] px-[16px] mt-[17px] group">
        <div>
          <button
            type="button"
            aria-label="marcar concluído"
            className="max-w-[22px] max-h-[22px] w-full h-full rounded-[3px]"
          />
        </div>

        <div>
          <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.2 0C3.225 0 0 3.225 0 7.2C0 11.175 3.225 14.4 7.2 14.4H16.8C20.775 14.4 24 11.175 24 7.2C24 3.225 20.775 0 16.8 0H7.2ZM18.6 3.9C18.9978 3.9 19.3794 4.05803 19.6607 4.33934C19.942 4.62064 20.1 5.00217 20.1 5.4C20.1 5.79782 19.942 6.17936 19.6607 6.46066C19.3794 6.74196 18.9978 6.9 18.6 6.9C18.2022 6.9 17.8206 6.74196 17.5393 6.46066C17.258 6.17936 17.1 5.79782 17.1 5.4C17.1 5.00217 17.258 4.62064 17.5393 4.33934C17.8206 4.05803 18.2022 3.9 18.6 3.9ZM14.7 9C14.7 8.60217 14.858 8.22064 15.1393 7.93934C15.4206 7.65803 15.8022 7.5 16.2 7.5C16.5978 7.5 16.9794 7.65803 17.2607 7.93934C17.542 8.22064 17.7 8.60217 17.7 9C17.7 9.39782 17.542 9.77936 17.2607 10.0607C16.9794 10.342 16.5978 10.5 16.2 10.5C15.8022 10.5 15.4206 10.342 15.1393 10.0607C14.858 9.77936 14.7 9.39782 14.7 9ZM6.3 5.1C6.3 4.60125 6.70125 4.2 7.2 4.2C7.69875 4.2 8.1 4.60125 8.1 5.1V6.3H9.3C9.79875 6.3 10.2 6.70125 10.2 7.2C10.2 7.69875 9.79875 8.1 9.3 8.1H8.1V9.3C8.1 9.79875 7.69875 10.2 7.2 10.2C6.70125 10.2 6.3 9.79875 6.3 9.3V8.1H5.1C4.60125 8.1 4.2 7.69875 4.2 7.2C4.2 6.70125 4.60125 6.3 5.1 6.3H6.3V5.1Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="text-base font-semibold text-white">
          <InputText label="nome" name="name" value={name} update={(value): void => setName(value)} hiddenLabel />
        </div>

        <div
          className={`text-base font-semibold text-white ${
            seconds === '00:00' ? 'invisible group-hover:visible' : ''
          }`}>
          <InputTimeDate label="" name="time" value={seconds} update={(value): void => setSeconds(value)} hiddenLabel />
        </div>

        <div className="flex items-center">
          <TimePlayer time={time} pause={pause} resume={resume} />
        </div>

        <div className="flex-1" />

        <div className="hidden group-hover:flex">
          <button type="button" onClick={(): void => setOptionsIsOpen(true)}>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_103_34)">
                <path
                  d="M10.5 0C7.71523 0 5.04451 1.10625 3.07538 3.07538C1.10625 5.04451 0 7.71523 0 10.5C0 13.2848 1.10625 15.9555 3.07538 17.9246C5.04451 19.8938 7.71523 21 10.5 21C13.2848 21 15.9555 19.8938 17.9246 17.9246C19.8938 15.9555 21 13.2848 21 10.5C21 7.71523 19.8938 5.04451 17.9246 3.07538C15.9555 1.10625 13.2848 0 10.5 0ZM5.53711 9.88477C5.15156 9.49922 5.15156 8.87578 5.53711 8.49434C5.92266 8.11289 6.54609 8.10879 6.92754 8.49434L10.4959 12.0627L14.0643 8.49434C14.4498 8.10879 15.0732 8.10879 15.4547 8.49434C15.8361 8.87988 15.8402 9.50332 15.4547 9.88477L11.1973 14.1504C10.8117 14.5359 10.1883 14.5359 9.80684 14.1504L5.53711 9.88477Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_103_34">
                  <rect width="21" height="21" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {optionsIsOpen ? (
        <div
          className="absolute bg-[#2F3241] min-w-[354px] flex flex-col items-start z-[20] rounded-[3px] right-0 mt-2"
          ref={refOptions}>
          <h4 className="py-[14px] text-center w-full text-base font-semibold">Opções</h4>

          <div className="border-b border-[#A9A9A9] w-full" />

          <button
            type="button"
            onClick={(): void => {
              handleUpdateSubTask(item.parentTaskId, item.id, { status: 'completed' });
              setOptionsIsOpen(false);
            }}
            className="text-base font-semibold text-white px-[26px] py-[19px] w-full text-left hover:bg-[#3D4153]">
            Concluir
          </button>

          <button
            type="button"
            onClick={(): void => {
              setOptionsIsOpen(false);
              handleUpdateSubTask(item.parentTaskId, item.id, { status: 'disabled' });
            }}
            className="text-base font-semibold text-white px-[26px] py-[19px] w-full text-left hover:bg-[#3D4153]">
            Suspender task
          </button>

          <button
            type="button"
            onClick={(): void => {
              handleDropSubTask(item.parentTaskId, item.id);
              setOptionsIsOpen(false);
            }}
            className="text-base font-semibold text-white px-[26px] py-[19px] w-full text-left hover:bg-[#3D4153]">
            Excluir
          </button>
        </div>
      ) : undefined}
    </div>
  );
};

interface ISubtaskProps {
  subtasks: ISubTask[];
}

const SubTaskIsOpen = ({ subtasks }: ISubtaskProps): ReactElement => {
  return (
    <div>
      {subtasks.map((item) => {
        return <SubTaskItem item={item} key={item.id} />;
      })}
    </div>
  );
};
export const TaskItem = ({ task }: ITaskItemProps): ReactElement => {
  const styleTaskItemIsDone: string = task.status === 'completed' ? 'line-through text-gray-500' : 'text-white';
  const styleBoxIsSelected =
    task.status === 'completed' ? ' border border-[#58C0FF] bg-[#58C0FF]' : ' border border-[#A9A9A9]';
  const [name, setName] = useState<string>(task.description);
  const [date, setdate] = useState<{ de: string; ate: string }>({
    de: task.startTime || '00:00',
    ate: task.endTime || '00:00',
  });
  const [optionsIsOpen, setOptionsIsOpen] = useState<boolean>(false);
  const [subTaskIsOpen, setSubTaskIsOpen] = useState<boolean>(false);

  const { handleUpdateTask, handleDropTask, handleAddSubTask } = useContext(TaskContext);

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

  useEffect(() => {
    if (task.startTime !== date.de) {
      handleUpdateTask(task.id, { startTime: date.de });
    }
  }, [date.de]);

  useEffect(() => {
    if (task.endTime !== date.ate) {
      handleUpdateTask(task.id, { endTime: date.ate });
    }
  }, [date.ate]);

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

        <button type="button" className="font-semibold text-base text-white">
          <InputStartAndEnd
            value={date}
            update={(value): void => setdate(value)}
            isDone={task.status === 'completed'}
          />
        </button>

        <div />

        <button
          type="button"
          onClick={(): void => setSubTaskIsOpen((prev) => !prev)}
          aria-hidden
          className="block flex-1 h-[3rem] bg-red-400"
        />

        <div className="hidden group-hover:flex gap-[47px]  ">
          <div>
            <button
              type="button"
              aria-label="Expandir items"
              className={`${subTaskIsOpen ? 'rotate-180' : ''} transition-all duration-150`}
              onClick={(): void => {
                setSubTaskIsOpen((prev) => !prev);
              }}>
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.7897 13.2103C11.4591 13.8797 12.5462 13.8797 13.2157 13.2103L23.4979 2.92804C24.1674 2.25862 24.1674 1.17148 23.4979 0.502064C22.8285 -0.167355 21.7414 -0.167355 21.072 0.502064L12 9.57403L2.92804 0.507419C2.25862 -0.162 1.17148 -0.162 0.502064 0.507419C-0.167355 1.17684 -0.167355 2.26397 0.502064 2.93339L10.7843 13.2157L10.7897 13.2103Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

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
                    handleUpdateTask(task.id, { status: 'completed' });
                    setOptionsIsOpen(false);
                  }}
                  className="text-base font-semibold text-white px-[26px] py-[19px] w-full text-left hover:bg-[#3D4153]">
                  Concluir
                </button>

                <button
                  type="button"
                  onClick={(): void => {
                    setOptionsIsOpen(false);
                    handleUpdateTask(task.id, { status: 'disabled' });
                  }}
                  className="text-base font-semibold text-white px-[26px] py-[19px] w-full text-left hover:bg-[#3D4153]">
                  Suspender task
                </button>

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

      {subTaskIsOpen ? (
        <div className="pl-[65px]">
          <div>
            <SubTaskIsOpen subtasks={task.subTasks} />
          </div>

          <div className="mt-[17px]">
            <button
              type="button"
              className="bg-[#212332] text-white flex py-[14px] px-[27px] rounded-[3px]"
              onClick={(): void => handleAddSubTask(task.id)}>
              <span className="font-semibold text-[1rem]">Nova subtask</span>

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
      ) : undefined}
    </div>
  );
};
