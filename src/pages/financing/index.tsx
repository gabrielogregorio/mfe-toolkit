import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { InputCard } from '@/financing/components/inputCard';
import type { IDataPrincipalType } from '@/financing/types';
import { NAME_ITEMS_MOCK, NAME_ITEMS_MOCK_SALDO, TO_FIXED_DEFAULT } from '@/financing/constants/utils';
import { StorageService } from 'example-kit-dev';
import { useNavigate } from 'react-router-dom';
import { LayoutScreen } from 'ogregorio-component-library-studies';
import { ComponentItem } from './componentItem';
import Background1 from '../bg1.webp';

const generateId = (): string => {
  return new Date().getTime().toString();
};

const getInitial = (): { input: string } | undefined => {
  return StorageService.getItemAndParse<{ input: string }>(NAME_ITEMS_MOCK_SALDO);
};

const updateRemaining = (input: string): void => {
  StorageService.setItem(NAME_ITEMS_MOCK_SALDO, JSON.stringify({ input }));
};

export const FinancingPage = (): ReactElement => {
  const [itemsToPurchase, setItemsToPurchase] = useState<IDataPrincipalType[]>([]);

  useEffect(() => {
    const data = StorageService.getItemAndParse<IDataPrincipalType[]>(NAME_ITEMS_MOCK);
    if (data) {
      setItemsToPurchase(data);
    }
  }, []);

  const handleAddNewItem = (): void => {
    setItemsToPurchase(() => {
      const data = StorageService.getItemAndParse<IDataPrincipalType[]>(NAME_ITEMS_MOCK);
      const newValue: IDataPrincipalType[] = [
        ...(data || []),
        {
          name: 'Digite alguma coisa',
          valor: 'R$: 0',
          day: 1,
          paymentStatus: 'Unpaid',
          id: generateId(),
        },
      ];
      StorageService.setItem(NAME_ITEMS_MOCK, JSON.stringify(newValue));

      return newValue;
    });
  };

  const removeItem = (id: string): void => {
    const newValue = itemsToPurchase.filter((item) => item.id !== id);
    StorageService.setItem(NAME_ITEMS_MOCK, JSON.stringify(newValue));
    setItemsToPurchase(newValue);
  };

  const navigate = useNavigate();

  const [inputMoney, setInputMoney] = useState<string>(getInitial()?.input || '');
  const [remaining, setRemaining] = useState<string>('');

  useEffect(() => {
    const data = StorageService.getItemAndParse<IDataPrincipalType[]>(NAME_ITEMS_MOCK);
    if (Number(inputMoney) && data) {
      const sum = data.reduce((prev, current) => {
        return Number(prev) + Number(current.valor);
      }, 0);

      setRemaining((Number(inputMoney) - sum).toFixed(TO_FIXED_DEFAULT).toString());
    }
  }, [inputMoney]);

  return (
    <LayoutScreen screenTitle="QUANTO SOBRA" onReturn={() => navigate('/')} bg={Background1}>
      <div className="flex gap-6 mt-[64px] animate-fadeIn  max-h-full overflow-y-hidden px-[2rem]">
        <div className="flex-1 overflow-y-scroll scrollbar">
          <div className="flex flex-col justify-center items-center w-full px-[33px] py-[68px]">
            <div className=" py-16">
              <div className="flex items-center justify-between">
                <InputCard
                  name="Current"
                  label="Current"
                  value={inputMoney}
                  update={(value): void => {
                    updateRemaining(value);
                    setInputMoney(value);
                  }}
                />
                <div className="!flex-1" />
                <InputCard
                  name="Remaining"
                  label="Remaining"
                  value={remaining}
                  update={(value): void => setRemaining(value)}
                />
              </div>
            </div>

            <div className="h-[50px]" />

            <div className="bg-[#58C0FF]">
              {itemsToPurchase.map((itemToPurchase) => {
                return (
                  <ComponentItem
                    update={(data): void => {
                      const dataX = StorageService.getItemAndParse<IDataPrincipalType[]>(NAME_ITEMS_MOCK);

                      if (dataX) {
                        const newValue = dataX.map((itemX) => {
                          if (itemX.id === data.id) {
                            return {
                              day: data.day,
                              name: data.name,
                              paymentStatus: data.paymentStatus,
                              valor: data.valor,
                              id: data.id,
                            };
                          }

                          return itemX;
                        });

                        StorageService.setItem(NAME_ITEMS_MOCK, JSON.stringify(newValue));
                      }
                    }}
                    key={itemToPurchase.id}
                    item={itemToPurchase}
                    removeItem={removeItem}
                  />
                );
              })}
            </div>

            <div>
              <button
                type="button"
                onClick={(): void => handleAddNewItem()}
                className="bg-[#212332] text-white text-[1rem] font-bold text-left mt-2 px-4 py-3">
                Add New
              </button>
            </div>
          </div>

          <div className="h-[5rem]" />
        </div>
      </div>
    </LayoutScreen>
  );
};
