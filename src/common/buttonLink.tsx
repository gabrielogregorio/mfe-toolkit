/* eslint-disable id-length */
import { Link } from 'react-router-dom';
import type { ReactElement, ReactNode } from 'react';

import { Text } from '@/common/Text';
import { useAudio } from './useAudio';
import HoverSound from './hoverSound.mp3';
import ClickSound from './clicksound.mp3';

export const InsideLink = ({
  to,
  content,
  fontSize = undefined,
}: {
  to: string;
  content: ReactNode;
  fontSize?: string;
}): ReactElement => {
  const clickSound = useAudio(ClickSound);
  const hoverSound = useAudio(HoverSound);

  const handleMouseEnter = (): void => {
    hoverSound.play();
  };

  const handleClick = (): void => {
    clickSound.play();
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter} onClick={handleClick} className="flex items-center justify-start">
      <Text fontSize={fontSize}>{content}</Text>
    </Link>
  );
};
