import { useOutsideClick } from 'ogregorio-component-library-studies';
import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

const MAXIMIMUM_DAYS_IN_MONTH = 31;

const days = [...new Array(MAXIMIMUM_DAYS_IN_MONTH)].map((_item, index) => {
  return {
    day: index + 1,
  };
});

interface IProps {
  name: string;
  update: (value: number) => void;
  value: number;
  isRisked?: boolean;
}

export const Calendar = ({ name, update, value, isRisked = false }: IProps): ReactElement => {
  const [optionsIsOpened, setOptionsIsOpened] = useState<boolean>(false);
  const refElement = useRef<HTMLDivElement | null>(null);
  const { clickedOutside } = useOutsideClick(refElement);

  useEffect(() => {
    setOptionsIsOpened(false);
  }, [clickedOutside]);

  const styleOptionIsExpanded = optionsIsOpened ? '' : 'hidden';

  return (
    <div>
      <div ref={refElement}>
        <div className="relative" id={name}>
          <button
            type="button"
            onClick={(): void => setOptionsIsOpened(true)}
            className={`px-4 py-2 text-base ${isRisked ? 'line-through text-white/40' : 'text-white'}`}>
            {value}
          </button>
          <div
            className={`absolute border-2 border-white shadow-2xl z-[100] bg-black/60 backdrop-blur-[30px] ${styleOptionIsExpanded}`}>
            <div className="min-w-[20rem] grid grid-cols-7 gap-3">
              {days.map((option) => {
                return (
                  <button
                    type="button"
                    key={option.day}
                    value={option.day}
                    className="px-2 py-2 hover:bg-white hover:text-black transition-all duration-75 text-center text-base"
                    onClick={(): void => {
                      update(option.day);
                      setOptionsIsOpened(false);
                    }}>
                    {option.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
