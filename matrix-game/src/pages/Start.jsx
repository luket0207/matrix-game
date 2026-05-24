import { useNavigate } from 'react-router-dom';
import { useGameState } from '../app/GameStateProvider.jsx';
import GameButton from '../components/GameButton.jsx';

const labels = {
  en: {
    difficultyOptions: [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' },
    ],
    difficultyQuestion: 'Choose your difficulty',
    languageOptions: [
      { label: 'English', value: 'en' },
      { label: '日本語', value: 'ja' },
    ],
    languageQuestion: 'Choose your language / 言語を選んでください',
  },
  ja: {
    difficultyOptions: [
      { label: 'かんたん', value: 'easy' },
      { label: 'ふつう', value: 'medium' },
      { label: 'むずかしい', value: 'hard' },
    ],
    difficultyQuestion: '難易度を選んでください',
    languageOptions: [
      { label: 'English', value: 'en' },
      { label: '日本語', value: 'ja' },
    ],
    languageQuestion: 'Choose your language / 言語を選んでください',
  },
};

function Start() {
  const navigate = useNavigate();
  const { chooseDifficulty, chooseLanguage, selectedLanguage } = useGameState();
  const currentLabels = selectedLanguage === 'ja' ? labels.ja : labels.en;
  const isChoosingLanguage = selectedLanguage === null;

  const handleLanguageChoice = (language) => {
    chooseLanguage(language);
  };

  const handleDifficultyChoice = (difficulty) => {
    chooseDifficulty(difficulty);
    navigate('/player');
  };

  const question = isChoosingLanguage
    ? currentLabels.languageQuestion
    : currentLabels.difficultyQuestion;
  const options = isChoosingLanguage
    ? currentLabels.languageOptions
    : currentLabels.difficultyOptions;

  return (
    <section className="page-stack">
      <div className="page-copy">
        <h2>{question}</h2>
      </div>
      <div className="choice-list">
        {options.map((option) => (
          <GameButton
            key={option.value}
            onClick={() =>
              isChoosingLanguage
                ? handleLanguageChoice(option.value)
                : handleDifficultyChoice(option.value)
            }
          >
            {option.label}
          </GameButton>
        ))}
      </div>
    </section>
  );
}

export default Start;
