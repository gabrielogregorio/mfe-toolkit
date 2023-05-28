import type { ReactElement } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useOutsideClick } from '@/common/hooks/useOutsideClick';

interface IProps {
  label: string;
  name: string;
  value: string;
  update: (value: string) => void;
}

export const InputCard = ({ label, name, value, update }: IProps): ReactElement => {
  const refElement = useRef<HTMLDivElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const { clickedOutside } = useOutsideClick(refElement);

  useEffect(() => {
    setIsEnabled(false);
  }, [clickedOutside]);

  return (
    <div>
      <div ref={refElement}>
        <div className="bg-[#58C0FF] text-white px-[30px] pt-[15px] pb-[30px] rounded-[3px]">
          <h3 className="font-bold text-[20px]">{label}</h3>
          <div className="text-[40px] font-extrabold flex pt-[10px]">
            {!isEnabled ? (
              <button type="button" onClick={(): void => setIsEnabled(true)} className="p-2 w-full text-left">
                R$: {value}
              </button>
            ) : undefined}

            {isEnabled ? (
              <div className="bg-[#73caff] border-gray-700 shadow-2xl flex  justify-center items-start relative p-2 pb-4 ">
                <div>R$:{` `}</div>
                <input
                  type="text"
                  name={name}
                  className="bg-transparent w-full focus:outline-none"
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
