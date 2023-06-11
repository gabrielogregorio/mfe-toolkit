import type { ReactElement } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClick, Button } from 'ogregorio-component-library-studies';

interface IProps {
  label: string;
  name: string;
  value: string;
  hiddenLabel?: boolean;
  update: (value: string) => void;
}

export const InputText = ({ label, name, value, hiddenLabel = false, update }: IProps): ReactElement => {
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

  return (
    <div className="w-full">
      <div ref={refElement}>
        {!hiddenLabel ? <span className="mr-4">{label}</span> : undefined}

        <div id={name}>
          <div className="min-h-[1rem] w-full transition-all duration-150">
            {!isEditable ? (
              <Button
                content={value}
                onClick={(): void => {
                  setIsEditable(true);
                }}
              />
            ) : undefined}

            {isEditable ? (
              <div className="border-gray-700 bg-black/70 shadow-2xl flex flex-col justify-center items-start relative w-full hover:text-white group-hover:text-white transition-all tracking-[0%] duration-150 leading-[19.2px] font-roboto-Condensed">
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
