import './_index.scss';
import '@babel/polyfill';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Panel, Forgot } from 'views';
import { createBrowserHistory } from 'history';
import { createStore } from 'store';
import { PrivateRoute } from 'globalComponents';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React, { Component } from 'react';

if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.setAttribute('src', 'http://localhost:35729/livereload.js');
  document.body.appendChild(script);
}

const history = createBrowserHistory();
const store = createStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route path='/forgot' component={Forgot} exact />
            <Route path='/' component={PrivateRoute(Panel)} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
