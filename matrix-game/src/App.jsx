import { NavLink } from 'react-router-dom';
import AppRoutes from './routes.jsx';

const navigationLinks = [
  { to: '/', label: 'Start', end: true },
  { to: '/ipad', label: 'iPad' },
  { to: '/player', label: 'Player' },
  { to: '/score', label: 'Score' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <p className="app-shell__eyebrow">Matrix Game</p>
        <h1 className="app-shell__title">Basic site structure and routing</h1>
        <nav aria-label="Primary" className="app-shell__nav">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                isActive ? 'app-shell__link app-shell__link--active' : 'app-shell__link'
              }
              end={link.end}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="app-shell__content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
