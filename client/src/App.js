import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <AppRouter />
      </HashRouter>
    </div>
  );
}

export default App;
