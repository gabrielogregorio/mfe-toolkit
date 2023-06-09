import type { ReactNode } from 'react';

type levelsType = 1 | 2 | 3 | 4 | 5;

interface IProps {
  level: levelsType;
  children: ReactNode;
}

export const NavigationLevel = ({ children, level }: IProps) => {
  const styleLevels: { [key in levelsType]: string } = {
    1: 'ml-[40px]',
    2: 'ml-[80px]',
    3: 'ml-[120px]',
    4: 'ml-[160px]',
    5: 'ml-[200px]',
  };
  return <div className={styleLevels[level]}>{children}</div>;
};
