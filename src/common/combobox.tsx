import type { ReactElement, ReactNode } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClick } from '@/common/useOutsideClick';

interface IProps<T> {
  label: string;
  name: string;
  initial: T;
  hiddenLabel?: boolean;
  options: T[];
  update: (value: T) => void;
}

export const Combobox = <T extends { name: string; icon: ReactNode }>({
  label,
  name,
  initial,
  hiddenLabel = false,
  options,
  update,
}: IProps<T>): ReactElement => {
  const [screenOption, setScreenOption] = useState<T>(initial);
  const [optionsIsExpanded, setOptionsIsExpanded] = useState<boolean>(false);
  const refElement = useRef<HTMLDivElement | null>(null);

  const { clickedOutside } = useOutsideClick(refElement);

  useEffect(() => {
    setOptionsIsExpanded(false);
  }, [clickedOutside]);

  return (
    <div>
      <div ref={refElement}>
        {!hiddenLabel ? <span className="mr-4">{label}</span> : undefined}

        <div className="relative" id={name}>
          <button
            type="button"
            onClick={(): void => setOptionsIsExpanded(true)}
            className="bg-[#212332] text-white px-2 py-2 text-base flex gap-4">
            {screenOption.name} {screenOption.icon}
          </button>

          {optionsIsExpanded ? (
            <div className="absolute z-[100] bg-[#2A2D3D] border-2 border-gray-700 shadow-2xl">
              <div className="px-2 py-3 flex items-center justify-between pl-6">
                <div>Ações</div>

                <button
                  type="button"
                  className="font-bold text-gray-400 p-2"
                  onClick={(): void => setOptionsIsExpanded(false)}>
                  X
                </button>
              </div>

              <div className="border-b-2 border-gray-400" />

              <div className="flex flex-col justify-center items-start mt-3 min-w-[15rem]">
                {options.map((option) => {
                  const styleIsSelected = screenOption.name === option.name ? 'bg-[#414559]' : '';

                  return (
                    <button
                      type="button"
                      key={option.name}
                      value={option.name}
                      className={`px-3 py-3 ${styleIsSelected} hover:bg-[#414559] transition-all duration-150 w-full text-left text-base pl-6`}
                      onClick={(): void => {
                        setScreenOption(option);
                        update(option);
                        setOptionsIsExpanded(false);
                      }}>
                      {option.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};
