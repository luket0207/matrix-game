import { createContext, useContext, useState } from 'react';

const GameStateContext = createContext(null);

function GameStateProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const chooseLanguage = (language) => {
    setSelectedLanguage((currentLanguage) => currentLanguage ?? language);
  };

  const chooseDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const resetGameSetup = () => {
    setSelectedLanguage(null);
    setSelectedDifficulty(null);
  };

  return (
    <GameStateContext.Provider
      value={{
        chooseDifficulty,
        chooseLanguage,
        resetGameSetup,
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
