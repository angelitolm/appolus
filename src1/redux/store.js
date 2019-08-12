import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

const initialState = {}

const middlewares = [thunk];

// export function configureStore(initialState) {

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  );

  // if (module.hot) {
  //     // Enable Webpack hot module replacement for reducers
  //     module.hot.accept('./reducers', () => {
  //         const nextRootReducer = require('./reducers');
  //         store.replaceReducer(nextRootReducer);
  //     });
  // }

//   return store;
// }

export default store
