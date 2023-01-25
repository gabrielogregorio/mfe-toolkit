import { TaskItem } from '@/pages/home/components/taskItem';
import type { ITask } from '@/pages/home/types';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

const mockTask: ITask = {
  id: 123,
  text: 'name-task-mock',
  done: true,
  day: 10,
};

const mockIgnoreFunction: Mock = vi.fn();

describe('<TaskItem />', () => {
  it('should render a done task', () => {
    const { container } = render(
      <TaskItem
        task={{ ...mockTask, done: true }}
        handleUpdateStatus={mockIgnoreFunction}
        handleDropTask={mockIgnoreFunction}
      />,
    );
    expect(screen.getByRole('button', { name: 'name-task-mock' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'X' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'name-task-mock' }).className.includes('line-through')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });

  it('should render a not done task', () => {
    const { container } = render(
      <TaskItem
        task={{ ...mockTask, done: false }}
        handleUpdateStatus={mockIgnoreFunction}
        handleDropTask={mockIgnoreFunction}
      />,
    );
    expect(screen.getByRole('button', { name: 'name-task-mock' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'X' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'name-task-mock' }).className.includes('line-through')).toBeFalsy();

    expect(container).toMatchSnapshot();
  });

  it('should update status task', () => {
    const mockHandleUpdateStatusTask: Mock = vi.fn();
    const mockHandleDropTask: Mock = vi.fn();

    render(
      <TaskItem
        task={{ ...mockTask, done: false }}
        handleUpdateStatus={mockHandleUpdateStatusTask}
        handleDropTask={mockHandleDropTask}
      />,
    );

    expect(mockHandleUpdateStatusTask).toBeCalledTimes(0);
    fireEvent.click(screen.getByRole('button', { name: 'name-task-mock' }));
    expect(mockHandleUpdateStatusTask).toBeCalledWith(123);
    expect(mockHandleDropTask).toBeCalledTimes(0);
  });

  it('should drop task', () => {
    const mockHandleUpdateStatusTask: Mock = vi.fn();
    const mockHandleDropTask: Mock = vi.fn();

    render(
      <TaskItem
        task={{ ...mockTask, done: false }}
        handleUpdateStatus={mockHandleUpdateStatusTask}
        handleDropTask={mockHandleDropTask}
      />,
    );

    expect(mockHandleDropTask).toBeCalledTimes(0);
    fireEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(mockHandleDropTask).toBeCalledWith(123);
    expect(mockHandleUpdateStatusTask).toBeCalledTimes(0);
  });
});
