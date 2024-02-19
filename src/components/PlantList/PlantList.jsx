import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PlantList() {
  const dispatch = useDispatch();

  const plants = useSelector((store) => store.plantList);

  useEffect(() => {
    // dispatch an action to request the plantList from the API
    getPlants();
  }, []);

  const getPlants = () => {
    dispatch({ type: 'GET_PLANTS' });
  };

  return (
    <div>
      <h3>This is the plant list</h3>
      {/* <pre>{JSON.stringify(reduxState)}</pre> */}
      <ul>
        {plants.map((plant, index) => (
          <li key={index}>{plant.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlantList;
