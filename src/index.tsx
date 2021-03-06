import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import { EmailContact } from "./containers/LandingPage/rLandingPage";
import { FXRate, Calculator } from "./containers/FXculator/rFXculator";
import { Clock, QuotesBox } from "./containers/DevSpace/rDevSpace";
import * as WebFont from 'webfontloader';


WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

/**
 * This function provide the log on vscode/chrome console about previous/next state
 * and detail of every actions which will update state
 */
const logger = createLogger();

/**
 * * Combine all store in project
 * * If store is not listed here, it's update state won't be transfered to child components
 */
const rootReducers = combineReducers({
  FXRate, Calculator,
  EmailContact, Clock, QuotesBox,
});

/**
 * * Main store of react-redux project
 * * thunkMiddleware allow to dispatch function to reducer
 * * by wrap (dispatch) in a Higher-Order function
 * By default, reducer only accept dispatched object
 */
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);

/**
 * notifies you in the console when potentially unnecessary re-renders occur
 */
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

/**
 * * Provider: inject store to the react-redux app
 * * BrowserRouter/Switch: required function for page navigation
 * * Route: the navigated page when user click on a link
 * Route can either render from component directly or render from a function
 * without 'exact', the route path is interpreted as /* relative path
 */
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path='/' component={App} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root') as HTMLElement
);

/**
 * Cached offline data for web-app approaching
 */
registerServiceWorker();
