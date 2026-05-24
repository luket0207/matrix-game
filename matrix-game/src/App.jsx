import { Link, useLocation } from 'react-router-dom';
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
  const { resetGameSetup, selectedLanguage } = useGameState();
  const shellMode = pageShellModes[location.pathname] ?? 'mobile';
  const isIpadRoute = location.pathname === '/ipad';
  const showIpadAccess = !isIpadRoute && selectedLanguage === null;
  const showReturnToStart = !isIpadRoute && selectedLanguage !== null;
  const returnToStartLabel =
    selectedLanguage === 'ja' ? returnToStartLabels.ja : returnToStartLabels.en;

  return (
    <div className="app-shell">
      <div className={`app-shell__frame app-shell__frame--${shellMode}`}>
        <div className="app-shell__controls">
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
        </div>
        <main className="app-shell__content">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
