import { Counter } from './components/Counter/Counter';
import { CounterWithSettings } from './components/CounterWithSettings/CounterWithSettings';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import './App.css';

export const PATH = {
  V1: { link: '/v1', name: 'counter v1' },
  V2: { link: '/v2', name: 'counter v2' },
  V3: { link: '/v3', name: 'counter v3' },
};

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <div className="contentContainer">
          <Routes>
            <Route
              path={PATH.V1.link}
              element={<Counter initialCount={0} maxCount={5} />}
            />
            <Route
              path={PATH.V2.link}
              element={
                <CounterWithSettings initMaxValue={5} initStartValue={0} />
              }
            />
            <Route
              path={PATH.V3.link}
              element={
                <CounterWithSettings
                  oneDisplay
                  initMaxValue={5}
                  initStartValue={0}
                />
              }
            />
            <Route path={'*'} element={<Navigate to={PATH.V2.link} />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
