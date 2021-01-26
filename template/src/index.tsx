import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

interface DockAPI {
  changeApp: (appId: string, appArgs: unknown []) => void
  hasuraConfiguration: {
    token: string
    url: string
    refreshToken: () => Promise<string>
  }
}

declare global {
  interface Window {
    renderApplication: {
      [appId: string]: (containerElement: HTMLElement, api: DockAPI, ...args: unknown[]) => void
    }
  }
}

function renderApp(containerElement: HTMLElement, api: DockAPI, ...args: unknown[]) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    containerElement
  );
}

if (process.env.NODE_ENV === 'production') {
  window.renderApplication[1] = renderApp
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
