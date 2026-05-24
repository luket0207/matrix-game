import { Link } from 'react-router-dom';

function GameButton({
  children,
  className = '',
  onClick,
  to,
  type = 'button',
  ...props
}) {
  const buttonClassName = ['game-button', className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link className={buttonClassName} onClick={onClick} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default GameButton;
