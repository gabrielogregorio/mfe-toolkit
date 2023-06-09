import type { ReactNode } from 'react';
import { Text } from './Text';

interface IProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const LinkNavigation = ({ href, children, icon = undefined }: IProps) => {
  return (
    <a target="_blank" rel="noreferrer" href={href} className="break-words flex items-center ">
      {icon ? <span className="mr-[12px]">{icon}</span> : undefined}

      <Text>{children}</Text>

      <span className="ml-[11px]">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          className="w-[26px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.85714 0C7.4875 0 8 0.5125 8 1.14286V6.85714C8 7.4875 7.4875 8 6.85714 8H1.14286C0.5125 8 0 7.4875 0 6.85714V1.14286C0 0.5125 0.5125 0 1.14286 0H6.85714ZM5.71429 5.025V2.57143C5.71429 2.41429 5.58571 2.28571 5.42857 2.28571H2.975C2.75179 2.28571 2.57143 2.46607 2.57143 2.68929C2.57143 2.79643 2.61429 2.9 2.68929 2.975L3.28571 3.57143L2.10179 4.75536C2.03571 4.82143 2 4.90893 2 5C2 5.09107 2.03571 5.17857 2.10179 5.24464L2.75714 5.9C2.82143 5.96429 2.90893 6.00179 3.00179 6.00179C3.09464 6.00179 3.18036 5.96607 3.24643 5.9L4.42857 4.71429L5.025 5.31071C5.1 5.38571 5.20357 5.42857 5.31071 5.42857C5.53393 5.42857 5.71429 5.24821 5.71429 5.025Z"
            fill="white"
            fillOpacity="0.72"
          />
        </svg>
      </span>
    </a>
  );
};
