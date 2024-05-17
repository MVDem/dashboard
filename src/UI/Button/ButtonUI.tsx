import styless from './buttonUI.module.scss';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

function ButtonUI({
  type = 'button',
  children,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={styless.customButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default ButtonUI;
