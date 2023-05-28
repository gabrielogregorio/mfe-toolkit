/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { Tasks } from '@/tasks/components/tasks';
import type { ITask } from '@/tasks/types';

const mockTasks: ITask[] = [
  {
    id: 123,
    text: 'name-task-mock-1',
    done: true,
    day: 10,
  },

  {
    id: 456,
    text: 'name-task-mock-2',
    done: true,
    day: 10,
  },
];

const mockIgnoreImplementation = jest.fn();

describe('<Tasks />', () => {
  it('should render a list items', () => {
    render(
      <Tasks
        tasks={mockTasks}
        handleUpdateStatus={mockIgnoreImplementation}
        handleDropTask={mockIgnoreImplementation}
      />,
    );

    expect(screen.getByRole('button', { name: 'name-task-mock-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'name-task-mock-2' })).toBeDefined();
  });

  it('should update second status task', () => {
    const mockHandleUpdateStatusTask: any = jest.fn();
    const mockHandleDropTask: any = jest.fn();

    render(
      <Tasks tasks={mockTasks} handleUpdateStatus={mockHandleUpdateStatusTask} handleDropTask={mockHandleDropTask} />,
    );

    expect(mockHandleUpdateStatusTask).toBeCalledTimes(0);
    fireEvent.click(screen.getByRole('button', { name: 'name-task-mock-2' }));
    expect(mockHandleUpdateStatusTask).toBeCalledWith(456);
    expect(mockHandleDropTask).toBeCalledTimes(0);
  });

  it('should drop first task', () => {
    const mockHandleUpdateStatusTask: any = jest.fn();
    const mockHandleDropTask: any = jest.fn();

    render(
      <Tasks tasks={mockTasks} handleUpdateStatus={mockHandleUpdateStatusTask} handleDropTask={mockHandleDropTask} />,
    );

    expect(mockHandleDropTask).toBeCalledTimes(0);
    fireEvent.click(screen.getAllByRole('button', { name: 'X' })[0]);
    expect(mockHandleDropTask).toBeCalledWith(123);
    expect(mockHandleUpdateStatusTask).toBeCalledTimes(0);
  });
});
