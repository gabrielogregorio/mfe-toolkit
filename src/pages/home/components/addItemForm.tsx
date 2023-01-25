import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useState } from 'react';

interface IAddItemFormProps {
  addTask: (text: string, reset: () => void) => void;
}

export const AddItemForm = ({ addTask }: IAddItemFormProps): ReactElement => {
  const [input, setInput] = useState<string>('');

  const handleAddNewTask = (): void => {
    addTask(input, () => setInput(''));
  };

  return (
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
        placeholder="Type a task"
        className="border-2 border-teal-500 outline-none caret-white text-white px-4 py-2 rounded-md flex-1 bg-transparent focus:outline-none text-lg md:hover:scale-105 transition-all duration-700 hover:duration-150"
        value={input}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => setInput(event.target.value)}
      />
      <button
        type="submit"
        className="bg-teal-500 text-white ml-6 px-4 py-2 rounded-md md:hover:scale-105 transition-all duration-700 hover:duration-150 select-none">
        Add
      </button>
    </form>
  );
};
