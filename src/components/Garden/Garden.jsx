import React, { useState } from 'react';
import PlantForm from '../PlantForm/PlantForm.jsx';
import PlantList from '../PlantList/PlantList.jsx';
// import PlantListItem from '../PlantListItem.jsx';

function Garden() {
  const [plantList, setPlantList] = useState('');
  return (
    <div>
      <h2>This is the garden!</h2>
      {/* Redux State isn't needed in the garden, it is just a parent component */}
      {/* Thanks to redux, there is no need to pass along props! */}
      <PlantForm />
      <PlantList plantList={plantList} />
    </div>
  );
}

export default Garden;
