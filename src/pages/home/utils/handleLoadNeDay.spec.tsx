import type { ITask } from '@/pages/home/types';
import { handleLoadNewDay } from '@/pages/home/utils/handleLoadNeDay';
import { vi } from 'vitest';
import { StorageService } from '@/services/StorageService';
import { taskStorageName } from '@/pages/home/constants/storage';

import * as getActualDayAsNumber from '@/utils/getActualDayAsNumber';

const referenceActualDay: number = 20;
const referenceOtherDay: number = 26;

const mockTasks: ITask[] = [
  {
    id: 123,
    text: 'mock-task-1',
    done: true,
    day: referenceActualDay,
  },
  {
    id: 456,
    text: 'mock-task-2',
    done: false,
    day: referenceActualDay,
  },
];

describe('handleLoadNewDay()', () => {
  it('should return empty data and call storage name', () => {
    vi.spyOn(StorageService, 'getItemAndParse').mockImplementation((key: string) => {
      if (key === taskStorageName) {
        return [];
      }

      throw new Error('LocalStorage key ins invalid');
    });
    expect(handleLoadNewDay()).toEqual([]);
  });

  it('should return items without updating when day is now', () => {
    vi.spyOn(StorageService, 'getItemAndParse').mockImplementation(() => {
      return mockTasks;
    });

    vi.spyOn(getActualDayAsNumber, 'getActualDayAsNumber').mockImplementation(() => referenceActualDay);

    expect(handleLoadNewDay()).toEqual(mockTasks);
  });

  it('should return item, updating, because day is other', () => {
    vi.spyOn(StorageService, 'getItemAndParse').mockImplementation(() => {
      return mockTasks;
    });

    vi.spyOn(getActualDayAsNumber, 'getActualDayAsNumber').mockImplementation(() => referenceOtherDay);

    expect(handleLoadNewDay()).toEqual([
      { ...mockTasks[0], day: referenceOtherDay, done: false },
      { ...mockTasks[1], day: referenceOtherDay, done: false },
    ]);
  });
});
