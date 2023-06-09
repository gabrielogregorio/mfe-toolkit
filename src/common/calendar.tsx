import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@/common/useOutsideClick';

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
}

export const Calendar = ({ name, update, value }: IProps): ReactElement => {
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
            className="bg-[#212332] text-white px-4 py-2 text-base ">
            {value}
          </button>
          <div
            className={`absolute border-2 bg-[#414559] border-gray-700 shadow-2xl z-[100]  ${styleOptionIsExpanded}`}>
            <div className="flex items-center justify-between px-3 py-3">
              <div>Calendário</div>

              <button
                type="button"
                className="font-bold text-gray-400 text-base"
                onClick={(): void => setOptionsIsOpened(false)}>
                x
              </button>
            </div>

            <div className="border-2 border-gray-400" />
            <div className="min-w-[20rem] grid grid-cols-7 gap-3">
              {days.map((option) => {
                return (
                  <button
                    type="button"
                    key={option.day}
                    value={option.day}
                    className="px-2 py-2 hover:bg-[#58C0FF] transition-all duration-75 text-center text-base"
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
