import GameButton from './GameButton.jsx';

const confirmationCopy = {
  en: {
    cancel: 'No',
    confirm: 'Yes',
    heading: 'Are you sure?',
  },
  ja: {
    cancel: 'いいえ',
    confirm: 'はい',
    heading: '本当にいいですか？',
  },
};

function IpadRevealConfirmation({ language, onCancel, onConfirm }) {
  const copy = confirmationCopy[language];

  return (
    <div className="matrix-turn__confirm-overlay">
      <div aria-modal="true" className="matrix-turn__confirm" role="dialog">
        <p className="matrix-turn__confirm-heading">{copy.heading}</p>
        <div className="matrix-turn__confirm-actions">
          <GameButton className="matrix-turn__confirm-button" onClick={onConfirm}>
            {copy.confirm}
          </GameButton>
          <GameButton className="matrix-turn__confirm-button" onClick={onCancel}>
            {copy.cancel}
          </GameButton>
        </div>
      </div>
    </div>
  );
}

export default IpadRevealConfirmation;
