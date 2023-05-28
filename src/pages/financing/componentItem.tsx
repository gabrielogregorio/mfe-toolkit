import type { ReactElement, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { InputText } from '@/common/components/inputText';
import { Combobox } from '@/common/components/combobox';
import { Calendar } from '@/common/components/calendar';
import { paymentStatusOptions } from '@/financing/data/paymentStatusOptions';
import type { IDataPrincipalType, paymentStatusType } from '@/financing/types';

interface IProps {
  update: (data: IDataPrincipalType) => void;
  removeItem: (id: string) => void;
  item: IDataPrincipalType;
}

export const ComponentItem = ({ item, removeItem, update }: IProps): ReactElement => {
  const [paymentStatusActual, setPaymentStatusActual] = useState<{ name: paymentStatusType; icon: ReactNode }>({
    name: item.paymentStatus,
    icon: paymentStatusOptions.find((local) => local.name === item.paymentStatus)?.icon || '',
  });
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
      paymentStatus: paymentStatusActual.name,
      id: item.id,
    });
  }, [name, day, valor, paymentStatusActual]);

  return (
    <div key={item.name} className="bg-[#212332] text-white text-[1rem] font-semibold flex py-[15px] mt-[5px]">
      <div className="grid grid-cols-5 gap-[48px]">
        <div>
          <InputText label="nome" name="name" value={name} update={(value): void => setName(value)} hiddenLabel />
        </div>

        <div>
          <InputText label="valor" name="valor" value={valor} update={(value): void => setValor(value)} hiddenLabel />
        </div>

        <div className="flex items-center justify-center">
          Dia
          <Calendar name="dia" update={(value): void => setDay(value)} value={day} />
        </div>

        <div className="px-[15px] w-[170px] flex gap-5">
          <Combobox<{ name: paymentStatusType; icon: ReactNode }>
            name="paymentStatus"
            initial={paymentStatusActual}
            hiddenLabel
            label="status"
            update={(newValue): void => setPaymentStatusActual(newValue)}
            options={paymentStatusOptions}
          />
        </div>

        <div className="flex items-center justify-end">
          <button type="button" className="" onClick={(): void => removeItem(item.id)}>
            <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.4969 3.24481C17.1606 2.50297 17.1606 1.29822 16.4969 0.55638C15.8331 -0.18546 14.7552 -0.18546 14.0914 0.55638L8.5 6.81157L2.90325 0.562314C2.2395 -0.179525 1.16156 -0.179525 0.497813 0.562314C-0.165938 1.30415 -0.165938 2.5089 0.497813 3.25074L6.09456 9.5L0.503124 15.7552C-0.160628 16.497 -0.160628 17.7018 0.503124 18.4436C1.16687 19.1855 2.24481 19.1855 2.90856 18.4436L8.5 12.1884L14.0968 18.4377C14.7605 19.1795 15.8384 19.1795 16.5022 18.4377C17.1659 17.6958 17.1659 16.4911 16.5022 15.7493L10.9054 9.5L16.4969 3.24481Z"
                fill="#FF5F5F"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <div className="w-[55px] bg-[#58C0FF] rounded-[3px] hover:w-[130px] transition-all duration-200 cursor-pointer" />
      </div>
    </div>
  );
};
