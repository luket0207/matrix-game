import { useGameState } from '../app/GameStateProvider.jsx';
import GameButton from '../components/GameButton.jsx';

const copy = {
  en: {
    backToStart: 'Back to Start',
    heading: 'Rules',
  },
  ja: {
    backToStart: 'スタートに戻る',
    heading: 'ルール',
  },
};

function Rules() {
  const { selectedLanguage } = useGameState();
  const currentCopy = selectedLanguage === 'ja' ? copy.ja : copy.en;

  return (
    <section className="page-stack">
      <div className="page-copy">
        <h2>{currentCopy.heading}</h2>
      </div>
      <div className="choice-list">
        <GameButton to="/">{currentCopy.backToStart}</GameButton>
      </div>
    </section>
  );
}

export default Rules;
