import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configStore from './store/configStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <Provider store={configStore()}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
