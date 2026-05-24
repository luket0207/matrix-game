import { Link } from 'react-router-dom';

function GameButton({ children, className = '', onClick, to, type = 'button' }) {
  const buttonClassName = ['game-button', className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link className={buttonClassName} onClick={onClick} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default GameButton;
