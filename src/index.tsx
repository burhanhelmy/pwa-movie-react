import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HomePage from './views/home/home';
import './assets/css/blk-design-system-react.css';
import './assets/css/nucleo-icons.css';
import { Route, Router, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createHistory from 'history/createBrowserHistory'
import Root from './views/root/root';

class App extends React.Component {
    history = createHistory();
    render() {
        return (
            <Router history={this.history}>
                <Root> </Root>
            </Router>
        )
    }
}

ReactDOM.render(<App />,
    document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
