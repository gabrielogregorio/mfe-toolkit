import { AddItemForm } from '@/pages/home/components/addItemForm';
import { fireEvent, render, screen } from '@testing-library/react';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

describe('<AddItemForm />', () => {
  it('should render a add form', () => {
    const addTask: Mock = vi.fn();
    const { container } = render(<AddItemForm addTask={addTask} />);

    expect(screen.getByRole('button', { name: 'Add' })).toBeDefined();
    expect(screen.getByPlaceholderText('Type a task')).toBeDefined();

    expect(container).toMatchSnapshot();
  });

  it('should add task', () => {
    const addTask: Mock = vi.fn();
    render(<AddItemForm addTask={addTask} />);

    expect(addTask).toBeCalledTimes(0);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(addTask).toBeCalledWith('', expect.anything());
  });
});
