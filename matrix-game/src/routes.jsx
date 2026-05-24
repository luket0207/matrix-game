import { Route, Routes } from 'react-router-dom';
import Ipad from './pages/Ipad.jsx';
import Player from './pages/Player.jsx';
import Score from './pages/Score.jsx';
import Start from './pages/Start.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Start />} path="/" />
      <Route element={<Ipad />} path="/ipad" />
      <Route element={<Player />} path="/player" />
      <Route element={<Score />} path="/score" />
    </Routes>
  );
}

export default AppRoutes;
