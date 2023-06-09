import type { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  fontSize?: string;
  isActive?: boolean;
}

export const Text = ({ children, fontSize = 'text-[2rem]', isActive = false }: IProps) => {
  const styleOnActive = isActive ? 'text-white' : 'text-white/70';

  return (
    <span
      className={`${styleOnActive} hover:text-white group-hover:text-white transition-all tracking-[0%] duration-150 leading-[19.2px] font-roboto-Condensed ${fontSize}`}>
      {children}
    </span>
  );
};
