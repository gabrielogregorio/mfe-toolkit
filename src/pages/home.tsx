import { StorageService } from '@/services/StorageService';
import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';

interface ITask {
  done: boolean;
  id: number;
  text: string;
  day: number;
}

const taskStorage: string = 'tasks';
const actualDay: number = new Date().getDate();

const handleLoadNewDay = (): ITask[] => {
  const tasksDay: ITask[] = StorageService.getItemAndParse<ITask[]>(taskStorage) || [];

  return tasksDay.map((task: ITask) => {
    if (task.day === actualDay) {
      return task;
    }

    return {
      ...task,
      done: false,
      day: actualDay,
    };
  });
};

export const HomePage = (): ReactElement => {
  const [tasks, setTasks] = useState<ITask[]>(handleLoadNewDay());
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    StorageService.setItem(taskStorage, JSON.stringify(tasks));
  }, [tasks]);

  const handleAddNewTask = (): void => {
    if (input.trim() === '') {
      return;
    }
    setTasks((prev: ITask[]) => [...prev, { done: false, text: input, id: new Date().getTime(), day: actualDay }]);
    setInput('');
  };

  const handleDropTask = (taskId: number): void => {
    const tasksWithoutDropped: ITask[] = tasks.filter((task: ITask) => task.id !== taskId);
    setTasks(tasksWithoutDropped);
  };

  const handleUpdateStatus = (taskId: number): void => {
    const newTasks: ITask[] = JSON.parse(JSON.stringify(tasks)) as ITask[];
    const tasksIdToUpdate: number = newTasks.findIndex((task: ITask) => task.id === taskId);

    newTasks[tasksIdToUpdate].done = !newTasks[tasksIdToUpdate].done;

    setTasks(newTasks);
  };

  return (
    <div className="rounded-md shadow-md flex flex-col items-center py-8 min-h-screen">
      <div className="bg-red max-w-[30rem] mt-[8rem] w-full">
        <form
          className="flex w-full"
          onSubmit={(event: FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            handleAddNewTask();
          }}>
          <input
            type="text"
            name="add"
            autoComplete="off"
            id="add"
            className="border-2 border-teal-500 outline-none caret-white text-white px-4 py-2 rounded-md flex-1 bg-transparent focus:outline-none text-lg hover:scale-105 transition-all duration-700 hover:duration-150"
            value={input}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setInput(event.target.value)}
          />
          <button
            type="submit"
            className="bg-teal-500 text-white ml-6 px-4 py-2 rounded-md hover:scale-105 transition-all duration-700 hover:duration-150 select-none">
            Add
          </button>
        </form>

        <div className="mt-4">
          {tasks.map((task: ITask) => {
            return (
              <div
                key={task.id}
                className={`duration-700 hover:scale-105 hover:duration-150 transition-all flex ${
                  task.done ? 'bg-[#3d4046]' : 'bg-[#2d3036]'
                }`}>
                <button
                  type="button"
                  onClick={(): void => handleUpdateStatus(task.id)}
                  className={`border-l-4  pl-4 pr-7 py-2 flex-1 text-left text-lg capitalize select-none ${
                    task.done ? 'line-through border-l-teal-500 text-gray-500' : 'border-l-orange-500 text-white'
                  } `}>
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
          })}
        </div>
      </div>

      <div className="h-[10rem]" />
    </div>
  );
};
