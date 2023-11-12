import React, {useState, useEffect} from 'react';

import CloudinaryUploader from './CloudinaryUploader';


const CloudinaryContainer = ({fieldName, formName, setFieldValue }) => {

  const [chosenMedia, setChosenMedia] = useState(null);

  const _uploadImage = (e) => {

    const formData = new formData();

  }
  
  return (
    <CloudinaryUploader displayMedia={setChosenMedia} />
  )
}

export default CloudinaryContainer;