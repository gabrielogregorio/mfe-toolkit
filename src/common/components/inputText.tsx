import type { ReactElement } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClick } from '@/common/hooks/useOutsideClick';

interface IProps {
  label: string;
  name: string;
  value: string;
  hiddenLabel?: boolean;
  update: (value: string) => void;
}

export const InputText = ({ label, name, value, hiddenLabel = false, update }: IProps): ReactElement => {
  const refElement = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { clickedOutside } = useOutsideClick(refElement);

  useEffect(() => {
    setIsEditable(false);
  }, [clickedOutside]);

  useEffect(() => {
    if (isEditable) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditable]);

  return (
    <div>
      <div ref={refElement}>
        {!hiddenLabel ? <span className="mr-4">{label}</span> : undefined}

        <div id={name}>
          <div className="min-h-[1rem]">
            {!isEditable ? (
              <button
                type="button"
                onClick={(): void => {
                  setIsEditable(true);
                }}
                className="p-2 w-full text-left">
                {value}
              </button>
            ) : undefined}

            {isEditable ? (
              <div className="bg-[#313341] border-gray-700 shadow-2xl flex flex-col justify-center items-start relative">
                <input
                  type="text"
                  ref={inputRef}
                  name={name}
                  className="bg-transparent p-2 pb-4 w-full focus:outline-none"
                  id={name}
                  onChange={(event): void => {
                    update(event.target.value);
                  }}
                  value={value}
                />
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};
