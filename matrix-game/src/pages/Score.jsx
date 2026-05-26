import { useGameState } from '../app/GameStateProvider.jsx';
import GameButton from '../components/GameButton.jsx';

const copy = {
  en: {
    finalScore: 'Final Score',
    returnToStart: 'Return to Start',
  },
  ja: {
    finalScore: '最終スコア',
    returnToStart: 'スタートに戻る',
  },
};

function Score() {
  const { playerScore, resetGameSetup, selectedLanguage } = useGameState();
  const currentCopy = selectedLanguage === 'ja' ? copy.ja : copy.en;

  return (
    <section className="page-stack score-page">
      <div className="page-copy">
        <h2>{currentCopy.finalScore}</h2>
        <p className="score-page__final-score">{playerScore}</p>
      </div>
      <div className="choice-list">
        <GameButton onClick={resetGameSetup} to="/">
          {currentCopy.returnToStart}
        </GameButton>
      </div>
    </section>
  );
}

export default Score;
