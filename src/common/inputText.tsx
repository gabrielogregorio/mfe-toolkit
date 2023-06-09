import type { ReactElement } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClick } from '@/common/useOutsideClick';

interface IProps {
  label: string;
  name: string;
  value: string;
  hiddenLabel?: boolean;
  isDone?: boolean;
  update: (value: string) => void;
}

export const InputText = ({
  label,
  name,
  value,
  hiddenLabel = false,
  isDone = false,
  update,
}: IProps): ReactElement => {
  const refElement = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
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

  const styleIsDone = isDone ? 'line-through' : '';

  return (
    <div className="w-full">
      <div ref={refElement}>
        {!hiddenLabel ? <span className="mr-4">{label}</span> : undefined}

        <div id={name}>
          <div className="min-h-[1rem] w-full transition-all duration-150">
            {!isEditable ? (
              <button
                type="button"
                onClick={(): void => {
                  setIsEditable(true);
                }}
                className={`p-2 w-full text-left ${styleIsDone}`}>
                {value}
              </button>
            ) : undefined}

            {isEditable ? (
              <div className="bg-[#313341] border-gray-700 shadow-2xl flex flex-col justify-center items-start relative w-full">
                <textarea
                  ref={inputRef}
                  cols={30}
                  rows={3}
                  name={name}
                  className="bg-transparent p-2 pb-4 w-full focus:outline-none resize-none"
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
