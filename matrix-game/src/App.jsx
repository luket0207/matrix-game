import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BilingualText from './components/BilingualText.jsx';
import { useGameState } from './app/GameStateProvider.jsx';
import AppRoutes from './routes.jsx';

const pageShellModes = {
  '/ipad': 'wide',
};

const returnToStartLabels = {
  en: 'Return to start',
  ja: 'スタートに戻る',
};

function App() {
  const location = useLocation();
  const [iPadRestartSignal, setIpadRestartSignal] = useState(0);
  const { resetGameSetup, selectedLanguage } = useGameState();
  const shellMode = pageShellModes[location.pathname] ?? 'mobile';
  const isIpadRoute = location.pathname === '/ipad';
  const showIpadAccess = !isIpadRoute && selectedLanguage === null;
  const showReturnToStart = !isIpadRoute && selectedLanguage !== null;
  const showShellControls = showIpadAccess || showReturnToStart || isIpadRoute;
  const returnToStartLabel =
    selectedLanguage === 'ja' ? returnToStartLabels.ja : returnToStartLabels.en;

  const handleIpadRestart = () => {
    setIpadRestartSignal((currentSignal) => currentSignal + 1);
  };

  return (
    <div className="app-shell">
      <div className={`app-shell__frame app-shell__frame--${shellMode}`}>
        {showShellControls ? (
          <div
            className={`app-shell__controls${
              isIpadRoute ? ' app-shell__controls--split' : ''
            }`}
          >
            {showIpadAccess ? (
              <Link
                aria-label="Open iPad page"
                className="app-shell__control app-shell__control--icon"
                to="/ipad"
              >
                i
              </Link>
            ) : null}
            {showReturnToStart ? (
              <Link
                className="app-shell__control app-shell__control--button"
                onClick={resetGameSetup}
                to="/"
              >
                {returnToStartLabel}
              </Link>
            ) : null}
            {isIpadRoute ? (
              <>
                <Link
                  className="app-shell__control app-shell__control--button app-shell__control--button-left"
                  to="/"
                >
                  <BilingualText
                    english="Return to Start"
                    japanese="スタートに戻る"
                  />
                </Link>
                <button
                  className="app-shell__control app-shell__control--button"
                  onClick={handleIpadRestart}
                  type="button"
                >
                  <BilingualText english="Restart" japanese="リスタート" />
                </button>
              </>
            ) : null}
          </div>
        ) : null}

        <main className="app-shell__content">
          <AppRoutes iPadRestartSignal={iPadRestartSignal} />
        </main>
      </div>
    </div>
  );
}

export default App;
