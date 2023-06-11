import type { ReactElement } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClick, Button } from 'ogregorio-component-library-studies';

type inputMasks = 'default' | 'brl';
interface IInputTextProps {
  name: string;
  value: string;
  update: (value: string) => void;
  mask?: inputMasks;
  isRisked?: boolean;
  isDisabled?: boolean;
}

const CONVERT_TO_CENTS = 100;
function toBrazilian(input: string): string {
  const onlyDigits: string = input.replace(/\D/g, '');

  const numberValue: number = parseInt(onlyDigits, 10) / CONVERT_TO_CENTS;

  if (Number.isNaN(numberValue)) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
}

export const InputText = ({
  name,
  value,
  update,
  isRisked = false,
  mask = 'default',
  isDisabled = false,
}: IInputTextProps): ReactElement => {
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

  const MIN_LINES_TEXT_AREA = 5;
  const MAX_LINES_TEXT_AREA = 50;
  const sizeInCols = value.length < MAX_LINES_TEXT_AREA ? value.length + MIN_LINES_TEXT_AREA : MAX_LINES_TEXT_AREA;
  const sizeInRows = Math.ceil(value.length / MAX_LINES_TEXT_AREA) || 1;

  return (
    <div className="w-full">
      <div ref={refElement}>
        <div id={name}>
          <div className="min-h-[1rem] w-full transition-all duration-150">
            {!isEditable ? (
              <Button
                isDisabled={isDisabled}
                isRisked={isRisked}
                content={value}
                onClick={(): void => {
                  setIsEditable(true);
                }}
              />
            ) : undefined}

            {isEditable ? (
              <textarea
                ref={inputRef}
                cols={sizeInCols}
                rows={sizeInRows}
                name={name}
                className={`bg-transparent p-2 pb-4 w-full outline-none text-left focus:outline-none resize-none border-gray-700 shadow-2xl flex flex-col justify-center items-start hover:text-white group-hover:text-white transition-all tracking-[0%] duration-150 leading-[19.2px] font-roboto-Condensed ${
                  isRisked ? 'line-through' : ''
                }`}
                id={name}
                onChange={(event): void => {
                  const newText = event.target.value;

                  const masks: { [key in inputMasks]: (content: string) => string } = {
                    default: (text: string) => text,
                    brl: (text: string) => toBrazilian(text),
                  };

                  update(masks[mask](newText));
                }}
                value={value}
              />
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};
