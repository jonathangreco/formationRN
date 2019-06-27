import { combineReducers, createStore } from 'redux'
import defaultReducer from "../reducers/defaultReducer";
import velibReducer from "../reducers/velibReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

export default () => {
  const rootReducer = combineReducers({
    defaultReducer,
    velibReducer
  });

  let store = createStore(rootReducer, composeWithDevTools());

  //let persistor = persistStore(store);

  // return store
  return {store}
}