import { Route, Routes } from 'react-router-dom';
import Ipad from './pages/Ipad.jsx';
import Player from './pages/Player.jsx';
import Rules from './pages/Rules.jsx';
import Score from './pages/Score.jsx';
import Start from './pages/Start.jsx';

function AppRoutes({ iPadRestartSignal }) {
  return (
    <Routes>
      <Route element={<Start />} path="/" />
      <Route element={<Rules />} path="/rules" />
      <Route
        element={<Ipad restartSignal={iPadRestartSignal} />}
        path="/ipad"
      />
      <Route element={<Player />} path="/player" />
      <Route element={<Score />} path="/score" />
    </Routes>
  );
}

export default AppRoutes;
