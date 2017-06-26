import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

render(App);
