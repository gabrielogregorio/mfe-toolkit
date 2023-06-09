import type { ReactNode } from 'react';
import { useAudio } from '../useAudio';
import HoverSound from './hoverSound.mp3';
import ClickSound from './clicksound.mp3';
import { Text } from '../Text';

interface IProps {
  content: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const ButtonWithSound = ({ content, isActive = false, onClick = () => {} }: IProps) => {
  const clickSound = useAudio(ClickSound);
  const hoverSound = useAudio(HoverSound);

  const handleMouseEnter = () => {
    hoverSound.play();
  };

  const handleClick = () => {
    onClick();
    clickSound.play();
  };

  return (
    <button onMouseEnter={handleMouseEnter} onClick={handleClick} type="button">
      <Text isActive={isActive}>{content}</Text>
    </button>
  );
};
