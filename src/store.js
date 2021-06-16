import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import questionReducer from './reducers/questionReducer'
import getQuestionSaga from './sagas/getQuestionSaga'


const reducers = combineReducers({
  qu: questionReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(getQuestionSaga)

export default store;
