import { createContext, useContext, useState } from 'react';

const GameStateContext = createContext(null);

function GameStateProvider({ children }) {
  const [playerScore, setPlayerScore] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const chooseLanguage = (language) => {
    setSelectedLanguage((currentLanguage) => currentLanguage ?? language);
  };

  const chooseDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const addPlayerScore = (points) => {
    setPlayerScore((currentScore) => currentScore + points);
  };

  const resetPlayerScore = () => {
    setPlayerScore(0);
  };

  const resetGameSetup = () => {
    setPlayerScore(0);
    setSelectedLanguage(null);
    setSelectedDifficulty(null);
  };

  return (
    <GameStateContext.Provider
      value={{
        addPlayerScore,
        chooseDifficulty,
        chooseLanguage,
        playerScore,
        resetGameSetup,
        resetPlayerScore,
        selectedDifficulty,
        selectedLanguage,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error('useGameState must be used within GameStateProvider');
  }

  return context;
}

export { GameStateProvider, useGameState };
