import { StorageService } from '@services/StorageService';
import * as getActualDayAsNumber from '@utils/getActualDayAsNumber';
import type { ITask } from '@/tasks/types';
import { handleLoadNewDay } from '@/tasks/utils/handleLoadNeDay';
import { taskStorageName } from '@/tasks/constants/storage';

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
    jest.spyOn(StorageService, 'getItemAndParse').mockImplementation((key: string) => {
      if (key === taskStorageName) {
        return [];
      }

      throw new Error('LocalStorage key ins invalid');
    });
    expect(handleLoadNewDay()).toEqual([]);
  });

  it('should return items without updating when day is now', () => {
    jest.spyOn(StorageService, 'getItemAndParse').mockImplementation(() => {
      return mockTasks;
    });

    jest.spyOn(getActualDayAsNumber, 'getActualDayAsNumber').mockImplementation(() => referenceActualDay);

    expect(handleLoadNewDay()).toEqual(mockTasks);
  });

  it('should return item, updating, because day is other', () => {
    jest.spyOn(StorageService, 'getItemAndParse').mockImplementation(() => {
      return mockTasks;
    });

    jest.spyOn(getActualDayAsNumber, 'getActualDayAsNumber').mockImplementation(() => referenceOtherDay);

    expect(handleLoadNewDay()).toEqual([
      { ...mockTasks[0], day: referenceOtherDay, done: false },
      { ...mockTasks[1], day: referenceOtherDay, done: false },
    ]);
  });
});
