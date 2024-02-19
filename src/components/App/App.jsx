import React from 'react';
import Garden from '../Garden/Garden.jsx';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const plants = useSelector((store) => store.plants);
  // const plantsErrors = useSelector((store) => store.plantsErrors);

  useEffect(() => {
    getPlants();
  }, []);

  const getPlants = () => {
    dispatch({ type: 'GET_PLANTS' });
    // axios({
    //   method: 'GET',
    //   url: '/api/plants',
    // })
    //   .then((response) => {
    //     dispatch({
    //       type: 'SET_PLANTS',
    //       payload: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('error with plant get request', error);
    //   });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your Garden!</h1>
      </header>
      <Garden />
    </div>
  );
}

export default App;
