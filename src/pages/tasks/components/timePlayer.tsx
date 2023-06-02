import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

interface IProps {
  time: string;
  pause: () => void;
  resume: () => void;
}

export const TimePlayer = ({ time, pause, resume }: IProps): ReactElement => {
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    if (isPaused) {
      pause();
    } else {
      resume();
    }
  }, [isPaused]);

  return (
    <div className="flex items-center gap-4">
      <div>{time}</div>

      <button type="button" className="" onClick={(): void => setIsPaused((prev) => !prev)}>
        <div className="h-[29px]">
          {isPaused ? (
            <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.5625 0.441104C3.6375 -0.127646 2.475 -0.146396 1.53125 0.384854C0.5875 0.916104 0 1.9161 0 3.0036V25.0036C0 26.0911 0.5875 27.0911 1.53125 27.6224C2.475 28.1536 3.6375 28.1286 4.5625 27.5661L22.5625 16.5661C23.4563 16.0224 24 15.0536 24 14.0036C24 12.9536 23.4563 11.9911 22.5625 11.4411L4.5625 0.441104Z"
                fill="#5FFF6F"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM10.5 9V15C10.5 15.8297 9.82969 16.5 9 16.5C8.17031 16.5 7.5 15.8297 7.5 15V9C7.5 8.17031 8.17031 7.5 9 7.5C9.82969 7.5 10.5 8.17031 10.5 9ZM16.5 9V15C16.5 15.8297 15.8297 16.5 15 16.5C14.1703 16.5 13.5 15.8297 13.5 15V9C13.5 8.17031 14.1703 7.5 15 7.5C15.8297 7.5 16.5 8.17031 16.5 9Z"
                fill="#FF5F5F"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};
