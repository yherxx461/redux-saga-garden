import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' },
];

const plants = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [...state, action.payload];
    default:
      return state;
  }
};

const plantsErrors = (state = null, action) => {
  switch (action.type) {
    case 'ERROR_PLANTS':
      //execute this code
      return action.payload;
    default:
      return state;
  }
};

// SAGA
const sagaMiddleware = createSagaMiddleware();

// SAGA Generator Functions
function* firstSaga(action) {
  console.log('running FIRST SAGA:', action);

  try {
    const plantsResponse = yield axios({
      method: 'GET',
      url: '/api/plants',
    });

    yield put({ type: 'SET_PLANTS,', payload: plantsResponse.data });
  } catch (error) {
    console.log('ERROR:', error);
    yield put({
      type: 'ERROR_PLANTS',
      payload: 'Something went wrong, please try again later.',
    });
  }
}

//Post to add plant
function* postPlantSaga(action) {
  //try catch block
  try {
    //POST a new plant to server
    yield axios({
      method: 'POST',
      url: '/api/plants',
      data: { name: action.payload },
    });
    // dispatch to refresh GET
    yield put({ type: 'GET_PLANTS' });
  } catch (kittyCat) {
    // error surface to user
    console.log('ERROR', kittyCat);
    yield put({
      type: 'ERROR_PLANTS',
      payload: 'Could not add plant at this time',
    });
  }
}
// SAGA function [generator function]
function* watcherSaga() {
  yield takeEvery('GET_PLANTS', firstSaga);
  yield takeEvery('POST_PLANTS', postPlantSaga);
}

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ plants, plantsErrors }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

export default store;
