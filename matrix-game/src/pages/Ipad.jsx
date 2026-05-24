import { useEffect, useRef, useState } from 'react';
import BinaryChoice from '../components/BinaryChoice.jsx';
import BilingualText from '../components/BilingualText.jsx';
import GameButton from '../components/GameButton.jsx';
import IpadMatrixTurn from '../components/IpadMatrixTurn.jsx';
import IpadPassPrompt from '../components/IpadPassPrompt.jsx';
import matrixCategories from '../data/matrixCategories.js';
import {
  createTurnData,
  getNextPlayerIndex,
  getRandomInt,
} from '../utils/matrixGame.js';

const difficultyOptions = [
  { value: 'easy', english: 'Easy', japanese: 'かんたん' },
  { value: 'medium', english: 'Medium', japanese: 'ふつう' },
  { value: 'hard', english: 'Hard', japanese: 'むずかしい' },
];

const playerCountOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'japanese', label: '日本語' },
];

function createPlayers(playerCount) {
  return Array.from({ length: playerCount }, (_, index) => ({
    id: index + 1,
    name: '',
    preferredLanguage: '',
  }));
}

function Ipad({ restartSignal }) {
  const revealTimerRef = useRef(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedPlayerCount, setSelectedPlayerCount] = useState(null);
  const [players, setPlayers] = useState([]);
  const [iPadStage, setIpadStage] = useState('selectDifficulty');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [turnStage, setTurnStage] = useState('passDevice');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentXAxisScale, setCurrentXAxisScale] = useState(null);
  const [currentYAxisScale, setCurrentYAxisScale] = useState(null);
  const [secretNumber, setSecretNumber] = useState(null);
  const [previousSecretNumber, setPreviousSecretNumber] = useState(null);
  const [isSecretNumberHeld, setIsSecretNumberHeld] = useState(false);
  const [isConfirmRevealOpen, setIsConfirmRevealOpen] = useState(false);
  const [isRevealAnimating, setIsRevealAnimating] = useState(false);

  const isSelectDifficultyStage = iPadStage === 'selectDifficulty';
  const isSelectPlayerCountStage = iPadStage === 'selectPlayerCount';
  const isEnterPlayerDetailsStage = iPadStage === 'enterPlayerDetails';
  const isGameplayStage = iPadStage === 'gameplay';

  const canStartGame =
    selectedDifficulty !== null &&
    selectedPlayerCount !== null &&
    players.length > 0 &&
    players.every(
      (player) =>
        player.name.trim().length > 0 && player.preferredLanguage.length > 0,
    );

  const currentPlayer =
    currentPlayerIndex === null ? null : players[currentPlayerIndex];
  const currentLanguage =
    currentPlayer?.preferredLanguage === 'japanese' ? 'ja' : 'en';

  useEffect(() => {
    if (restartSignal === 0) {
      return;
    }

    resetIpadSetup();
  }, [restartSignal]);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  function clearRevealTimer() {
    if (revealTimerRef.current !== null) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }

  function clearTurnData() {
    clearRevealTimer();
    setCurrentCategory(null);
    setCurrentXAxisScale(null);
    setCurrentYAxisScale(null);
    setSecretNumber(null);
    setIsSecretNumberHeld(false);
    setIsConfirmRevealOpen(false);
    setIsRevealAnimating(false);
  }

  function resetIpadSetup() {
    clearTurnData();
    setSelectedDifficulty(null);
    setSelectedPlayerCount(null);
    setPlayers([]);
    setCurrentPlayerIndex(null);
    setPreviousSecretNumber(null);
    setTurnStage('passDevice');
    setIpadStage('selectDifficulty');
  }

  function handleDifficultySelect(difficulty) {
    setSelectedDifficulty(difficulty);
    setIpadStage('selectPlayerCount');
  }

  function handlePlayerCountSelect(playerCount) {
    setSelectedPlayerCount(playerCount);
    setPlayers(createPlayers(playerCount));
    setIpadStage('enterPlayerDetails');
  }

  function handlePlayerNameChange(playerId, nextName) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId ? { ...player, name: nextName } : player,
      ),
    );
  }

  function handlePlayerLanguageChange(playerId, nextLanguage) {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId
          ? { ...player, preferredLanguage: nextLanguage }
          : player,
      ),
    );
  }

  function handleStartGame() {
    if (!canStartGame) {
      return;
    }

    const firstPlayerIndex = getRandomInt(players.length);
    clearTurnData();
    setCurrentPlayerIndex(firstPlayerIndex);
    setPreviousSecretNumber(null);
    setTurnStage('passDevice');
    setIpadStage('gameplay');
  }

  function handleBeginTurn() {
    const turnData = createTurnData(
      matrixCategories,
      selectedDifficulty,
      previousSecretNumber,
    );

    setCurrentCategory(turnData.category);
    setCurrentXAxisScale(turnData.xAxisScale);
    setCurrentYAxisScale(turnData.yAxisScale);
    setSecretNumber(turnData.secretNumber);
    setPreviousSecretNumber(turnData.secretNumber);
    setIsSecretNumberHeld(false);
    setIsConfirmRevealOpen(false);
    setIsRevealAnimating(false);
    setTurnStage('matrix');
  }

  function handleHoldSecretStart() {
    if (turnStage !== 'matrix' || isConfirmRevealOpen) {
      return;
    }

    setIsSecretNumberHeld(true);
  }

  function handleHoldSecretEnd() {
    setIsSecretNumberHeld(false);
  }

  function handleRevealRequest() {
    if (turnStage !== 'matrix') {
      return;
    }

    setIsConfirmRevealOpen(true);
  }

  function handleCancelReveal() {
    setIsConfirmRevealOpen(false);
  }

  function handleConfirmReveal() {
    setIsConfirmRevealOpen(false);
    setIsSecretNumberHeld(false);
    setIsRevealAnimating(true);
    clearRevealTimer();

    revealTimerRef.current = setTimeout(() => {
      setIsRevealAnimating(false);
      setTurnStage('revealed');
      revealTimerRef.current = null;
    }, 450);
  }

  function handleEndTurn() {
    const nextPlayerIndex = getNextPlayerIndex(currentPlayerIndex, players.length);

    clearTurnData();
    setCurrentPlayerIndex(nextPlayerIndex);
    setTurnStage('passDevice');
  }

  return (
    <section className="page-stack ipad-page">
      {isSelectDifficultyStage ? (
        <>
          <div className="page-copy">
            <h2>
              <BilingualText
                english="Choose the difficulty"
                japanese="難易度を選んでください"
              />
            </h2>
          </div>
          <div className="choice-list ipad-page__difficulty-list">
            {difficultyOptions.map((difficulty) => (
              <GameButton
                key={difficulty.value}
                onClick={() => handleDifficultySelect(difficulty.value)}
              >
                <BilingualText
                  english={difficulty.english}
                  japanese={difficulty.japanese}
                />
              </GameButton>
            ))}
          </div>
        </>
      ) : null}

      {isSelectPlayerCountStage ? (
        <>
          <div className="page-copy">
            <h2>
              <BilingualText
                english="How many players are playing?"
                japanese="何人でプレイしますか？"
              />
            </h2>
          </div>
          <div className="choice-list ipad-page__count-list">
            {playerCountOptions.map((playerCount) => (
              <GameButton
                key={playerCount}
                onClick={() => handlePlayerCountSelect(playerCount)}
              >
                {playerCount}
              </GameButton>
            ))}
          </div>
        </>
      ) : null}

      {isEnterPlayerDetailsStage ? (
        <>
          <div className="page-copy ipad-page__copy">
            <h2>
              <BilingualText
                english="Enter player details"
                japanese="プレイヤー情報を入力してください"
              />
            </h2>
          </div>

          <div className="ipad-setup">
            {players.map((player) => (
              <div className="ipad-setup__row" key={player.id}>
                <div className="ipad-setup__name-field">
                  <label
                    className="ipad-setup__label"
                    htmlFor={`player-name-${player.id}`}
                  >
                    <BilingualText
                      className="bilingual-text--left"
                      english={`Player ${player.id}`}
                      japanese={`プレイヤー ${player.id}`}
                    />
                  </label>

                  <input
                    className="ipad-setup__input"
                    id={`player-name-${player.id}`}
                    onChange={(event) =>
                      handlePlayerNameChange(player.id, event.target.value)
                    }
                    placeholder="Name"
                    type="text"
                    value={player.name}
                  />
                </div>

                <BinaryChoice
                  legend={
                    <BilingualText
                      className="bilingual-text--left"
                      english="Language"
                      japanese="言語"
                    />
                  }
                  name={`player-language-${player.id}`}
                  onChange={(nextLanguage) =>
                    handlePlayerLanguageChange(player.id, nextLanguage)
                  }
                  options={languageOptions}
                  value={player.preferredLanguage}
                />
              </div>
            ))}
          </div>

          <div className="ipad-page__start-action">
            {canStartGame ? (
              <GameButton onClick={handleStartGame}>
                <BilingualText english="Start Game" japanese="ゲーム開始" />
              </GameButton>
            ) : null}
          </div>
        </>
      ) : null}

      {isGameplayStage && turnStage === 'passDevice' && currentPlayer ? (
        <IpadPassPrompt
          onStartTurn={handleBeginTurn}
          playerName={currentPlayer.name}
        />
      ) : null}

      {isGameplayStage &&
      currentPlayer &&
      currentCategory &&
      currentXAxisScale &&
      currentYAxisScale &&
      secretNumber !== null ? (
        <IpadMatrixTurn
          category={currentCategory}
          currentLanguage={currentLanguage}
          difficulty={selectedDifficulty}
          isConfirmRevealOpen={isConfirmRevealOpen}
          isRevealAnimating={isRevealAnimating}
          isSecretNumberHeld={isSecretNumberHeld}
          onCancelReveal={handleCancelReveal}
          onConfirmReveal={handleConfirmReveal}
          onEndTurn={handleEndTurn}
          onHoldEnd={handleHoldSecretEnd}
          onHoldStart={handleHoldSecretStart}
          onRevealRequest={handleRevealRequest}
          secretNumber={secretNumber}
          turnStage={turnStage}
          xAxisScale={currentXAxisScale}
          yAxisScale={currentYAxisScale}
        />
      ) : null}
    </section>
  );
}

export default Ipad;
