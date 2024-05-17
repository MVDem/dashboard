import { useEffect, useState } from 'react';
import styles from './animatedCard.module.scss';

type AnimatedCardProps = {
  children: React.ReactNode;
  start?: boolean;
};

function AnimatedCard({ children, start }: AnimatedCardProps) {
  const [animationStart, setAnimationStart] = useState(false);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setAnimationStart(true);
      }, 100);
    } else {
      setAnimationStart(false);
    }
  }, [start]);

  return (
    <div
      className={
        !animationStart
          ? styles.profileContainer
          : styles.profileContainerActive
      }
    >
      {children}
    </div>
  );
}

export default AnimatedCard;
