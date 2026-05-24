import { getGridNumbers, getMatrixSize } from '../utils/matrixGame.js';
import GameButton from './GameButton.jsx';
import IpadRevealConfirmation from './IpadRevealConfirmation.jsx';

const turnCopy = {
  en: {
    endTurn: 'End Turn',
    reveal: 'Reveal to Everyone',
    showSecret: 'Show Secret Number',
  },
  ja: {
    endTurn: 'ターン終了',
    reveal: 'みんなに見せる',
    showSecret: '秘密の番号を見る',
  },
};

function getLocalizedLabel(entry, language) {
  return language === 'ja' ? entry.ja : entry.en;
}

function IpadMatrixTurn({
  category,
  currentLanguage,
  difficulty,
  isConfirmRevealOpen,
  isRevealAnimating,
  isSecretNumberHeld,
  onCancelReveal,
  onConfirmReveal,
  onEndTurn,
  onHoldEnd,
  onHoldStart,
  onRevealRequest,
  secretNumber,
  turnStage,
  xAxisScale,
  yAxisScale,
}) {
  const copy = turnCopy[currentLanguage];
  const gridNumbers = getGridNumbers(difficulty);
  const matrixSize = getMatrixSize(difficulty);
  const isMatrixStage = turnStage === 'matrix';
  const isRevealedStage = turnStage === 'revealed';

  return (
    <div className="matrix-turn">
      <div className="matrix-turn__header">
        <h2 className="matrix-turn__category">
          {getLocalizedLabel(category.label, currentLanguage)}
        </h2>
      </div>

      <div className="matrix-turn__display">
        <div
          className={`matrix-turn__board${
            isRevealAnimating || isRevealedStage
              ? ' matrix-turn__board--hidden'
              : ''
          }`}
        >
          <div className="matrix-turn__x-axis">
            <span className="matrix-turn__axis-label matrix-turn__axis-label--x-start">
              {getLocalizedLabel(xAxisScale.lower, currentLanguage)}
            </span>
            <span
              aria-hidden="true"
              className="matrix-turn__axis-arrow matrix-turn__axis-arrow--horizontal"
            />
            <span className="matrix-turn__axis-label matrix-turn__axis-label--x-end">
              {getLocalizedLabel(xAxisScale.upper, currentLanguage)}
            </span>
          </div>

          <div className="matrix-turn__y-axis">
            <span className="matrix-turn__axis-label matrix-turn__axis-label--top">
              {getLocalizedLabel(yAxisScale.lower, currentLanguage)}
            </span>
            <span
              aria-hidden="true"
              className="matrix-turn__axis-arrow matrix-turn__axis-arrow--vertical"
            />
            <span className="matrix-turn__axis-label matrix-turn__axis-label--bottom">
              {getLocalizedLabel(yAxisScale.upper, currentLanguage)}
            </span>
          </div>

          <div className={`matrix-turn__grid matrix-turn__grid--${matrixSize}`}>
            {gridNumbers.map((gridNumber) => {
              const isSecretCell =
                gridNumber === secretNumber &&
                (isSecretNumberHeld || isRevealedStage || isRevealAnimating);

              return (
                <div
                  className={`matrix-turn__cell${
                    isSecretCell ? ' matrix-turn__cell--secret' : ''
                  }`}
                  key={gridNumber}
                >
                  {gridNumber}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`matrix-turn__revealed-number${
            isRevealedStage ? ' matrix-turn__revealed-number--visible' : ''
          }`}
        >
          {secretNumber}
        </div>
      </div>

      {isMatrixStage && !isRevealAnimating ? (
        <div className="matrix-turn__actions">
          <GameButton
            className="matrix-turn__action-button"
            onMouseDown={onHoldStart}
            onMouseLeave={onHoldEnd}
            onMouseUp={onHoldEnd}
            onTouchCancel={onHoldEnd}
            onTouchEnd={onHoldEnd}
            onTouchStart={onHoldStart}
          >
            {copy.showSecret}
          </GameButton>

          <GameButton
            className="matrix-turn__action-button matrix-turn__action-button--secondary"
            onClick={onRevealRequest}
          >
            {copy.reveal}
          </GameButton>
        </div>
      ) : null}

      {isConfirmRevealOpen ? (
        <IpadRevealConfirmation
          language={currentLanguage}
          onCancel={onCancelReveal}
          onConfirm={onConfirmReveal}
        />
      ) : null}

      {isRevealedStage ? (
        <div className="matrix-turn__end-turn">
          <GameButton onClick={onEndTurn}>{copy.endTurn}</GameButton>
        </div>
      ) : null}
    </div>
  );
}

export default IpadMatrixTurn;
