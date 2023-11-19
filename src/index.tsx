import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app'; // Убедитесь, что App типизирован, если он определен в другом файле
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './services/store/store'; // Убедитесь, что store имеет правильные типы

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
