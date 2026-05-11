import cloudinary from 'cloudinary-core';

import React, { useRef, useEffect, useState } from "react";

type MediaUploadType = 'video' | 'audio' | 'photo'

interface CloudinaryUploaderProps {
  id?: string
  name?: string
  type?: MediaUploadType
  displayMedia?: (file: File) => void
}

const CloudinaryUploader = ({ id, name, type, displayMedia = () => {} }: CloudinaryUploaderProps) => {

  const mediaRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const cleanMedia = (e: React.MouseEvent) => {
    if (image) URL.revokeObjectURL(image);
    if (mediaRef.current) mediaRef.current.value = '';
  }

  const onChangeMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage))
      displayMedia(newImage);
    }
  }

  return (<div>
    <input type='file' hidden ref={mediaRef} id={id} name='name' accept='image/*' onChange={onChangeMedia} />
  </div>)

}

export default CloudinaryUploader;
