import React from 'react';
import ReactDOM from 'react-dom';

// import Login from './Login';
import Ballot from './Ballot';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Ballot />, document.getElementById('root'));

// Uses Service Worker
serviceWorker.register();
