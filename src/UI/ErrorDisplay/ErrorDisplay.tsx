import { BiError } from 'react-icons/bi';
import styles from './errorDisplay.module.scss';

type ErrorDisplayProps = {
  text: string;
};

function ErrorDisplay({ text }: ErrorDisplayProps) {
  return (
    <div className={styles.error}>
      <BiError />
      {text}
    </div>
  );
}
export default ErrorDisplay;
