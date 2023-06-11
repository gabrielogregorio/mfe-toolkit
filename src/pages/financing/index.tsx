/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { IDataPrincipalType } from '@/financing/types';
import { NAME_ITEMS_MOCK, NAME_ITEMS_MOCK_SALDO, TO_FIXED_DEFAULT } from '@/financing/constants/utils';
import { StorageService } from 'example-kit-dev';
import { useNavigate } from 'react-router-dom';
import {
  LayoutScreen,
  Button,
  TitleSimpleMenu,
  brlToNumber,
  generateId,
  useHandleKeyboard,
  FirstLevelMenu,
} from 'ogregorio-component-library-studies';
import { FinancingItem } from '@/financing/financingItem';
import { InputText } from '@/common/inputText';
import Background1 from '../bg1.webp';

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
          valor: 'R$: 0,00',
          day: 1,
          isPayed: false,
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

  useHandleKeyboard((key) => {
    if (key === 'Escape') {
      navigate('/');
    }
  });

  const [inputMoney, setInputMoney] = useState<string>(getInitial()?.input || '');
  const [remaining, setRemaining] = useState<string>('');

  useEffect(() => {
    const data = StorageService.getItemAndParse<IDataPrincipalType[]>(NAME_ITEMS_MOCK);
    if (data) {
      try {
        const sum = data.reduce((prev, current) => {
          return Number(prev) + brlToNumber(current.valor);
        }, 0);

        setRemaining((brlToNumber(inputMoney) - sum).toFixed(TO_FIXED_DEFAULT).toString());
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log('algum erro');
      }
    }
  }, [inputMoney]);

  return (
    <LayoutScreen screenTitle="QUANTO SOBRA" onReturn={() => navigate('/')} bg={Background1}>
      <div className="flex flex-col items-start">
        <TitleSimpleMenu content="MEU GASTO MENSAL" />

        <FirstLevelMenu>
          <table className="table-auto text-white">
            <thead className="font-roboto">
              <tr>
                <th className="text-white/60 text-left py-[4px] px-[5px]">ITEM</th>
                <th className="text-white/60 text-left py-[4px] px-[5px] pl-[62px]">VALOR</th>
                <th className="text-white/60 text-left py-[4px] px-[5px] pl-[62px]">DIA</th>
                <th className="text-white/60 text-left py-[4px] px-[5px] pl-[62px]">PAGO</th>
                <th className="text-white/60 text-left py-[4px] px-[5px] pl-[62px]">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {itemsToPurchase.map((itemToPurchase) => {
                return (
                  <FinancingItem
                    update={(data): void => {
                      const dataX = StorageService.getItemAndParse<IDataPrincipalType[]>(NAME_ITEMS_MOCK);

                      if (dataX) {
                        const newValue = dataX.map((itemX) => {
                          if (itemX.id === data.id) {
                            return {
                              day: data.day,
                              name: data.name,
                              isPayed: data.isPayed,
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
            </tbody>
          </table>

          <Button
            onClick={(): void => handleAddNewItem()}
            content="NOVO GASTO"
            iconLeft={
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 11C6.95869 11 8.35764 10.4205 9.38909 9.38909C10.4205 8.35764 11 6.95869 11 5.5C11 4.04131 10.4205 2.64236 9.38909 1.61091C8.35764 0.579463 6.95869 0 5.5 0C4.04131 0 2.64236 0.579463 1.61091 1.61091C0.579463 2.64236 0 4.04131 0 5.5C0 6.95869 0.579463 8.35764 1.61091 9.38909C2.64236 10.4205 4.04131 11 5.5 11ZM4.98438 7.39062V6.01562H3.60938C3.32363 6.01562 3.09375 5.78574 3.09375 5.5C3.09375 5.21426 3.32363 4.98438 3.60938 4.98438H4.98438V3.60938C4.98438 3.32363 5.21426 3.09375 5.5 3.09375C5.78574 3.09375 6.01562 3.32363 6.01562 3.60938V4.98438H7.39062C7.67637 4.98438 7.90625 5.21426 7.90625 5.5C7.90625 5.78574 7.67637 6.01562 7.39062 6.01562H6.01562V7.39062C6.01562 7.67637 5.78574 7.90625 5.5 7.90625C5.21426 7.90625 4.98438 7.67637 4.98438 7.39062Z"
                  fill="white"
                />
              </svg>
            }
          />

          <div className="mt-[30px] w-full h-[1px] bg-white/60" />

          <div className="flex justify-between items-center w-full">
            <div className="text-white/60 font-normal text-[1rem] tracking-[5%] flex items-center">
              ENTRADA:{' '}
              <InputText
                mask="brl"
                name="Current"
                value={inputMoney}
                update={(value): void => {
                  updateRemaining(value);
                  setInputMoney(value);
                }}
              />
            </div>
            <div className="text-white/60 font-normal text-[1rem] tracking-[5%] flex items-center">
              SOBRA:
              <InputText
                isDisabled
                mask="brl"
                name="Remaining"
                value={remaining}
                update={(value): void => setRemaining(value)}
              />
            </div>
          </div>
        </FirstLevelMenu>
        <div className="min-h-[5rem] w-full" />
      </div>
    </LayoutScreen>
  );
};
