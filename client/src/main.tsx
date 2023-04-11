import './styles/main.scss';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RootStoreProvider from './context/StoreContext';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <React.StrictMode>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </React.StrictMode>
);
