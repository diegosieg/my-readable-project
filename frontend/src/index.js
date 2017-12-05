import React from 'react';
import ReactDOM from 'react-dom';

import configStore from './store/configStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const MainAppContainer = () => <App store={configStore()} />;

ReactDOM.render(<MainAppContainer />, document.getElementById('root'));
registerServiceWorker();
