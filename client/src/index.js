import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SelectionStore from './store/SelectionStore';
import ArchivariusResultStore from './store/ArchivariusResultStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    selection: new SelectionStore(),
    archivariusResult: new ArchivariusResultStore()
  }}>
    <App />
  </Context.Provider>
);