import { BiError } from 'react-icons/bi';
import styles from './errorDisplay.module.scss';

type ErrorDisplayProps = {
  text: string;
  isVisible?: boolean;
};

function ErrorDisplay({ text, isVisible }: ErrorDisplayProps) {
  return (
    <>
      {isVisible && (
        <div className={styles.error}>
          <BiError />
          {text}
        </div>
      )}
    </>
  );
}
export default ErrorDisplay;
