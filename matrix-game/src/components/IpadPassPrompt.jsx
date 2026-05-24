import BilingualText from './BilingualText.jsx';
import GameButton from './GameButton.jsx';

function IpadPassPrompt({ playerName, onStartTurn }) {
  return (
    <div className="ipad-pass-prompt">
      <div className="page-copy ipad-page__copy">
        <h2>
          <BilingualText
            english={`Pass the iPad to ${playerName}`}
            japanese={`iPadを${playerName}に渡してください`}
          />
        </h2>
      </div>

      <div className="ipad-pass-prompt__action">
        <GameButton onClick={onStartTurn}>
          <BilingualText
            english={`Start ${playerName}'s turn`}
            japanese={`${playerName}のターンを始める`}
          />
        </GameButton>
      </div>
    </div>
  );
}

export default IpadPassPrompt;
