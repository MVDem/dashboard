import { useEffect, useRef } from 'react';
import styles from './deleteMessage.module.scss';
import ButtonUI from '../Button/ButtonUI';

function DeleteMessage({
  message,
  callBack,
  onStop,
}: {
  message: string;
  callBack: () => void;
  onStop: () => void;
}) {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  console.log('DeleteMessage');

  useEffect(() => {
    if (timer.current === null) {
      timer.current = setTimeout(() => {
        callBack();
      }, 3000);
    }
  }, []);

  const handleStopDelete = () => {
    clearTimeout(timer.current!);
    console.log('handleStopDelete', timer.current!);
    onStop();
  };

  return (
    <>
      <p className={styles.message}>{message}</p>
      <ButtonUI onClick={handleStopDelete}>cancel</ButtonUI>
    </>
  );
}
export default DeleteMessage;
