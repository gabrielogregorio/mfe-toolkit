import type { ReactElement } from 'react';

interface IProps {
  isChecked: boolean;
  update: (value: boolean) => void;
}

export const BlockCheck = ({ isChecked, update }: IProps): ReactElement => {
  const styleIsChecked = isChecked ? 'bg-white/50 border-transparent' : 'bg-black/20 border-white';
  return (
    <div className="flex-1">
      <button
        type="button"
        aria-label={isChecked ? 'Está marcado' : 'Não está marcado'}
        onClick={(): void => update(!isChecked)}
        className="h-full w-full p-[10px]">
        <div className={`border w-[42px] h-[11px] transition-colors duration-150 ${styleIsChecked}`} />
      </button>
    </div>
  );
};
