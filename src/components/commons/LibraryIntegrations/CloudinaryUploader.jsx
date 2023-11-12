import cloudinary from 'cloudinary-core';

import PropTypes from 'prop-types';

import React, {useRef, useEffect, useState} from "react";

const CloudinaryUploader = ({id, name, type, displayMedia = () => {} }) => {

  const mediaRef = useRef(null);

  const [image, setImage] = useState(null);

  const cleanMedia = (e) => {
    URL.revokeObjectURL(image);
    mediaRef.current.value = null;

  }

  const onChangeMedia = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
    setImage(URL.createObjectURL(newImage))
    }
    displayMedia(newImage);
  }




  return (<div>
    <input type='file' hidden ref={mediaRef} id={id} name='name' accept='image/*' onChange={onChangeMedia} />
  </div>)

}

export default CloudinaryUploader;

CloudinaryUploader.propTypes = {
	type: PropTypes.oneOf(["video", "audio", "photo"]),
	displayMedia: PropTypes.func,
};
