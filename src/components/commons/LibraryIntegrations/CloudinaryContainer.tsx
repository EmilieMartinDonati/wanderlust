import React, { useState } from 'react';

import CloudinaryUploader from './CloudinaryUploader';

interface CloudinaryContainerProps {
  fieldName: string
  formName: string
  setFieldValue: (name: string, value: unknown) => void
}

const CloudinaryContainer = ({ fieldName, formName, setFieldValue }: CloudinaryContainerProps) => {

  const [chosenMedia, setChosenMedia] = useState<File | null>(null);

  const _uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
  }

  return (
    <CloudinaryUploader displayMedia={setChosenMedia} />
  )
}

export default CloudinaryContainer;
