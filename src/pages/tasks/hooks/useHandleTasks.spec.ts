import { renderHook, act } from '@testing-library/react-hooks';
import { taskStorageName } from '@/tasks/constants/storage';
import { useHandleTasks } from './useHandleTasks';

describe('useHandleTasks hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Deve adicionar uma nova task', () => {
    const { result } = renderHook(() => useHandleTasks());

    act(() => {
      result.current.handleAddNewTask();
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].description).toBe('Jogar 1 Comp Valorant');
    expect(localStorage.getItem(taskStorageName)).toBeTruthy();
  });

  it('Deve remover uma task', () => {
    const { result } = renderHook(() => useHandleTasks());

    act(() => {
      result.current.handleAddNewTask();
    });

    act(() => {
      result.current.handleDropTask(result.current.tasks[0].id);
    });

    expect(result.current.tasks.length).toBe(0);
  });

  it('Deve adicionar uma subtask', () => {
    const { result } = renderHook(() => useHandleTasks());

    act(() => {
      result.current.handleAddNewTask();
    });

    act(() => {
      result.current.handleAddSubTask(result.current.tasks[0].id);
    });

    expect(result.current.tasks[0].subTasks.length).toBe(1);
  });

  it('Deve remover uma subtask', () => {
    const { result } = renderHook(() => useHandleTasks());

    act(() => {
      result.current.handleAddNewTask();
    });
    act(() => {
      result.current.handleAddSubTask(result.current.tasks[0].id);
    });

    act(() => {
      result.current.handleDropSubTask(result.current.tasks[0].id, result.current.tasks[0].subTasks[0].id);
    });

    expect(result.current.tasks[0].subTasks.length).toBe(0);
  });

  it('Deve atualizar uma task', () => {
    const { result } = renderHook(() => useHandleTasks());

    act(() => {
      result.current.handleAddNewTask();
    });

    act(() => {
      result.current.handleUpdateTask(result.current.tasks[0].id, { description: 'Task atualizada' });
    });

    expect(result.current.tasks[0].description).toBe('Task atualizada');
  });

  it('Deve atualizar uma subtask', () => {
    const { result } = renderHook(() => useHandleTasks());

    act(() => {
      result.current.handleAddNewTask();
    });

    act(() => {
      result.current.handleAddSubTask(result.current.tasks[0].id);
    });

    act(() => {
      result.current.handleUpdateSubTask(result.current.tasks[0].id, result.current.tasks[0].subTasks[0].id, {
        description: 'Subtask atualizada',
      });
    });

    expect(result.current.tasks[0].subTasks[0].description).toBe('Subtask atualizada');
  });
});
