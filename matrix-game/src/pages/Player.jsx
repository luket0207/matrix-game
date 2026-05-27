import { useState } from 'react';
import { useGameState } from '../app/GameStateProvider.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import GameButton from '../components/GameButton.jsx';
import NumberMatrix from '../components/NumberMatrix.jsx';
import { getGridNumbers, getMatrixSize } from '../utils/matrixGame.js';
import { calculateTurnScore } from '../utils/playerGame.js';

const copy = {
  en: {
    confirmCancel: 'No',
    confirmHeading: 'Are you sure?',
    confirmYes: 'Yes',
    ipadPrompt: 'Play your turn on the iPad',
    ipadQuestion: 'How many people correctly guessed the secret number?',
    itsMyTurn: "It's my turn on the iPad",
    revealAnswer: 'Reveal Answer',
    scoreLabel: 'Score',
    startTurn: 'Start Turn',
    submit: 'Submit',
    correctAnswerPrompt: 'What was the correct answer?',
    lastTurnMessage: (lastTurnScore, playerScore) =>
      `Last turn: +${lastTurnScore}. Current score: ${playerScore}.`,
  },
  ja: {
    confirmCancel: 'いいえ',
    confirmHeading: '本当にいいですか？',
    confirmYes: 'はい',
    ipadPrompt: 'iPadで自分のターンをプレイしてください',
    ipadQuestion: '何人が秘密の番号を正しく当てましたか？',
    itsMyTurn: 'iPadで自分の番です',
    revealAnswer: '答えを見る',
    scoreLabel: 'スコア',
    startTurn: 'ターン開始',
    submit: '送信',
    correctAnswerPrompt: '正しい答えは何でしたか？',
    lastTurnMessage: (lastTurnScore, playerScore) =>
      `前のターン: +${lastTurnScore}。現在のスコア: ${playerScore}。`,
  },
};

function Player() {
  const {
    addPlayerScore,
    playerScore,
    selectedDifficulty,
    selectedLanguage,
  } = useGameState();
  const [playerTurnStage, setPlayerTurnStage] = useState('start');
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [lastTurnScore, setLastTurnScore] = useState(null);
  const [isGuessConfirmOpen, setIsGuessConfirmOpen] = useState(false);
  const [correctGuessCount, setCorrectGuessCount] = useState('0');

  const language = selectedLanguage === 'ja' ? 'ja' : 'en';
  const difficulty = selectedDifficulty ?? 'easy';
  const currentCopy = copy[language];
  const matrixSize = getMatrixSize(difficulty);
  const numbers = getGridNumbers(difficulty);
  const isMatrixDisabled =
    playerTurnStage === 'guessLocked' || playerTurnStage === 'revealAnswer';

  function resetTurnState() {
    setSelectedGuess(null);
    setIsGuessConfirmOpen(false);
  }

  function handleStartTurn() {
    resetTurnState();
    setPlayerTurnStage('guessing');
  }

  function handleIpadTurnStart() {
    resetTurnState();
    setCorrectGuessCount('0');
    setPlayerTurnStage('ipadTurn');
  }

  function handleGuessSelect(number) {
    if (playerTurnStage !== 'guessing') {
      return;
    }

    setSelectedGuess(number);
    setIsGuessConfirmOpen(true);
  }

  function handleGuessCancel() {
    setIsGuessConfirmOpen(false);
  }

  function handleGuessConfirm() {
    setIsGuessConfirmOpen(false);
    setPlayerTurnStage('guessLocked');
  }

  function handleRevealAnswer() {
    if (selectedGuess === null) {
      return;
    }

    setPlayerTurnStage('revealAnswer');
  }

  function handleCorrectSecretNumberSelect(correctSecretNumber) {
    if (selectedGuess === null) {
      return;
    }

    const turnScore = calculateTurnScore(
      selectedGuess,
      correctSecretNumber,
      matrixSize,
    );

    addPlayerScore(turnScore);
    setLastTurnScore(turnScore);
    resetTurnState();
    setPlayerTurnStage('start');
  }

  function handleIpadTurnSubmit() {
    const awardedPoints = Number(correctGuessCount) * 3;

    addPlayerScore(awardedPoints);
    setLastTurnScore(awardedPoints);
    setCorrectGuessCount('0');
    setPlayerTurnStage('start');
  }

  return (
    <section className="player-page">
      <div className="player-page__body">
        <p className="player-page__score">
          {currentCopy.scoreLabel}: {playerScore}
        </p>

        {playerTurnStage === 'start' ? (
          <div className="page-stack player-page__content">
            {lastTurnScore !== null ? (
              <p className="player-page__last-turn">
                {currentCopy.lastTurnMessage(lastTurnScore, playerScore)}
              </p>
            ) : null}
            <div className="choice-list">
              <GameButton onClick={handleStartTurn}>
                {currentCopy.startTurn}
              </GameButton>
              <GameButton onClick={handleIpadTurnStart}>
                {currentCopy.itsMyTurn}
              </GameButton>
            </div>
          </div>
        ) : null}

        {(playerTurnStage === 'guessing' || playerTurnStage === 'guessLocked') ? (
          <div className="page-stack player-page__content">
            <NumberMatrix
              disabled={isMatrixDisabled}
              matrixSize={matrixSize}
              numbers={numbers}
              onSelect={handleGuessSelect}
              selectedNumber={playerTurnStage === 'guessing' ? selectedGuess : null}
            />
            {playerTurnStage === 'guessLocked' ? (
              <div className="player-page__primary-action">
                <GameButton onClick={handleRevealAnswer}>
                  {currentCopy.revealAnswer}
                </GameButton>
              </div>
            ) : null}
          </div>
        ) : null}

        {playerTurnStage === 'revealAnswer' && selectedGuess !== null ? (
          <div className="player-page__reveal">
            <div className="player-page__revealed-guess">{selectedGuess}</div>
            <p className="player-page__answer-prompt">
              {currentCopy.correctAnswerPrompt}
            </p>
            <NumberMatrix
              matrixSize={matrixSize}
              numbers={numbers}
              onSelect={handleCorrectSecretNumberSelect}
            />
          </div>
        ) : null}

        {playerTurnStage === 'ipadTurn' ? (
          <div className="page-stack player-page__content">
            <div className="page-copy player-page__copy">
              <h2>{currentCopy.ipadPrompt}</h2>
              <p>{currentCopy.ipadQuestion}</p>
            </div>
            <div className="player-page__ipad-turn">
              <label className="player-page__select-label" htmlFor="correct-guess-count">
                {currentCopy.ipadQuestion}
              </label>
              <select
                className="player-page__select"
                id="correct-guess-count"
                onChange={(event) => setCorrectGuessCount(event.target.value)}
                value={correctGuessCount}
              >
                {Array.from({ length: 11 }, (_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
              <GameButton onClick={handleIpadTurnSubmit}>
                {currentCopy.submit}
              </GameButton>
            </div>
          </div>
        ) : null}
      </div>

      {isGuessConfirmOpen ? (
        <ConfirmModal
          cancelLabel={currentCopy.confirmCancel}
          confirmLabel={currentCopy.confirmYes}
          heading={currentCopy.confirmHeading}
          onCancel={handleGuessCancel}
          onConfirm={handleGuessConfirm}
        />
      ) : null}
    </section>
  );
}

export default Player;
