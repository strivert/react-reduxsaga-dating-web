import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
import { createStore, compose, applyMiddleware } from 'redux';
import globalSagas from './saga';
import createReducer from './reducers';


const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

export default (initialState = {}, history) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Create hook for async sagas and run them individually
  store.runSaga = sagaMiddleware.run;
  globalSagas.forEach(saga => sagaMiddleware.run(saga));


  // Make reducers hot reloadable asynchronously
  /* istanbul ignore next */
  if (module.hot) {
    import('./reducers').then((reducerModule) => {
      const createReducers = reducerModule.default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  // Persist but backlist routing reducer
  // persistStore(store, {blacklist: ['routing']})
  // Initialize it with no other reducers
  store.asyncReducers = {};
  return store;
}