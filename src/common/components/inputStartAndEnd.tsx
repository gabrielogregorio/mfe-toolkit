import { InputTimeDate } from '@/common/components/inputTimeDate';
import type { ReactElement } from 'react';
import { useState } from 'react';

interface IProps {
  value: { de: string; ate: string };
  isDone?: boolean;
  update: (value: { de: string; ate: string }) => void;
}

export const InputStartAndEnd = ({ value, isDone = false, update }: IProps): ReactElement => {
  const [startTime, setStartTime] = useState<string>(value.de);
  const [endTime, setEndTime] = useState<string>(value.ate);

  const styleIsDone = isDone ? 'line-through' : '';

  return (
    <div className="flex items-center justify-center">
      <div className="text-base font-semibold text-white">
        <InputTimeDate
          label=""
          isDone={isDone}
          name="start"
          value={startTime}
          update={(baseUpdate): void => {
            setStartTime(baseUpdate);
            update({
              de: baseUpdate,
              ate: value.ate,
            });
          }}
          hiddenLabel
        />
      </div>

      <div className={`${styleIsDone}`}>até</div>

      <div className="text-base font-semibold text-white">
        <InputTimeDate
          isDone={isDone}
          label=""
          name="end"
          value={endTime}
          update={(baseUpdate): void => {
            setEndTime(baseUpdate);
            update({
              de: value.de,
              ate: baseUpdate,
            });
          }}
          hiddenLabel
        />
      </div>
    </div>
  );
};
