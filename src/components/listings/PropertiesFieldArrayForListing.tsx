import React, { useState, useEffect, ReactFragment } from 'react'

import { FieldArray } from 'formik';

import Button from '../commons/Button';

import HouseImage from "../../public/images/propertyTypes/home.png";
import FlatImage from "../../public/images/propertyTypes/flat.png";

import { formArrayIconLevel1 } from './createListingForm.css';

import RoomsFieldArrayForListing from './RoomsFieldArrayForListing';

import WrappedFormField from '../commons/WrappedFormField';

const PropertiesFieldArrayForListing = (props) => {

  const { remove, push } = props;

  const { values, handleChange, handleBlur, errors, touched  } = props.form;

  const { properties: currentProperties } = values;

  const _renderProperty = (property, index) => {
    const { type } = property;
    const imgSrc = type === 'house' ? HouseImage : FlatImage;
    return (
      <div key={index}>
        <WrappedFormField
          label={'Addresse du bien'}
          name={`properties.${index}.address`}
          value={values.properties[index]?.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <WrappedFormField
          label={'Capacité d\'accueil totale'}
          name={`properties.${index}.housingCapacity`}
          value={values.properties[index]?.housingCapacity}
          type='number'
          onChange={handleChange}
          onBlur={handleBlur} />
        <img className={formArrayIconLevel1} src={imgSrc} alt={type}></img>
        <FieldArray
          name={`properties.${index}.rooms`}
          render={(arrayHelpers) => (
            <RoomsFieldArrayForListing
              {...arrayHelpers}
              i={index}
            />
          )}
        />
      </div>
    )
  }

  return (
    <>
      <Button title='Ajouter une propriété' onClick={() => push({
        address: '',
        housingCapacity: 1,
        rooms: [],
        type: "house",
        createdOnTheFly: true
      })} />
      {currentProperties.map(_renderProperty)}
    </>)

}

export default PropertiesFieldArrayForListing;