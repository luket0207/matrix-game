import GameButton from './GameButton.jsx';

function ConfirmModal({
  cancelLabel,
  confirmLabel,
  heading,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="confirm-modal">
      <div aria-modal="true" className="confirm-modal__panel" role="dialog">
        <p className="confirm-modal__heading">{heading}</p>
        <div className="confirm-modal__actions">
          <GameButton className="confirm-modal__button" onClick={onConfirm}>
            {confirmLabel}
          </GameButton>
          <GameButton className="confirm-modal__button" onClick={onCancel}>
            {cancelLabel}
          </GameButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
