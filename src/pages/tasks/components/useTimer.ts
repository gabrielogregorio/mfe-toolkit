/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';

export const useTimer = (goal: number) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const formatTime = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    if (hours > 0) {
      return `${hours} hora(s) ${minutes} minuto(s) ${seconds} segundo(s)`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  function pause() {
    setIsActive(false);
  }

  function resume() {
    setIsActive(true);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        setPercentage(() => {
          const newPercentage = ((time + 1) / goal) * 100;
          return newPercentage > 100 ? 100 : newPercentage;
        });
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (!isActive && time !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      clearInterval(interval);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return () => clearInterval(interval);
  }, [isActive, time, goal]);

  return { time: formatTime(time), pause, resume, percentage };
};
