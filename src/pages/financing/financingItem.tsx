import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { InputText } from '@/common/inputText';
import { Calendar } from '@/common/calendar';
import type { IDataPrincipalType } from '@/financing/types';
import { BlockCheck } from '@/common/blockCheck';

interface IProps {
  update: (data: IDataPrincipalType) => void;
  removeItem: (id: string) => void;
  item: IDataPrincipalType;
}

export const FinancingItem = ({ item, removeItem, update }: IProps): ReactElement => {
  const [isPayedActual, setIsPayedActual] = useState<boolean>(item.isPayed);
  const [name, setName] = useState<string>(item.name);
  const [day, setDay] = useState<number>(item.day);
  const [valor, setValor] = useState<string>(item.valor);

  const isFirstLoading = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstLoading.current) {
      isFirstLoading.current = false;
      return;
    }

    update({
      name,
      day,
      valor,
      isPayed: isPayedActual,
      id: item.id,
    });
  }, [name, day, valor, isPayedActual]);

  const isRisked = isPayedActual;

  return (
    <tr key={item.id} className="group w-full py-[2px]">
      <td className="py-[4px] px-[5px] text-left">
        <InputText name="name" value={name} update={(value): void => setName(value)} isRisked={isRisked} />
      </td>
      <td className="py-[4px] px-[5px] pl-[62px] text-left">
        <InputText
          mask="brl"
          name="valor"
          value={valor}
          isRisked={isRisked}
          update={(value): void => setValor(value)}
        />
      </td>
      <td className="py-[4px] px-[5px] pl-[62px] text-left">
        <Calendar name="dia" update={(value): void => setDay(value)} value={day} isRisked={isRisked} />
      </td>
      <td className="py-[4px] px-[5px] pl-[62px] text-left">
        <BlockCheck isChecked={isPayedActual} update={(newValue) => setIsPayedActual(newValue)} />
      </td>
      <td className="py-[4px] px-[5px] pl-[62px] text-left">
        <button
          type="button"
          className="w-[35px] h-[20px] flex items-center justify-center"
          onClick={(): void => removeItem(item.id)}>
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="invisible group-hover:visible">
            <path
              d="M3.69687 0.483984L3.5 0.875H0.875C0.391016 0.875 0 1.26602 0 1.75C0 2.23398 0.391016 2.625 0.875 2.625H11.375C11.859 2.625 12.25 2.23398 12.25 1.75C12.25 1.26602 11.859 0.875 11.375 0.875H8.75L8.55312 0.483984C8.40547 0.185938 8.10195 0 7.77109 0H4.47891C4.14805 0 3.84453 0.185938 3.69687 0.483984ZM11.375 3.5H0.875L1.45469 12.7695C1.49844 13.4613 2.07266 14 2.76445 14H9.48555C10.1773 14 10.7516 13.4613 10.7953 12.7695L11.375 3.5Z"
              fill="white"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};
