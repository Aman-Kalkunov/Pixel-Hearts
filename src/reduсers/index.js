import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import photosReducer from './photosReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReduser = combineReducers({
    photos: photosReducer,
});

export const store = createStore(
    rootReduser,
    composeWithDevTools(applyMiddleware(thunk))
);

