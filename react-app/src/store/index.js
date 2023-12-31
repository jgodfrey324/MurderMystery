import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import notesReducer from './notes';
import suspectsReducer from './suspects';
import characterReducer from './characters';
import placesVisitedReducer from './placesVisited';
import searchResultsReducer from './searchResults';
import backpackItemsReducer from './backpack';

const rootReducer = combineReducers({
  session,
  characters: characterReducer,
  notes: notesReducer,
  suspects: suspectsReducer,
  placesVisited: placesVisitedReducer,
  searchResults: searchResultsReducer,
  backpack: backpackItemsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
