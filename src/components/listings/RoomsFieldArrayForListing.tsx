import React, { useState, useEffect, ReactFragment } from 'react'

import Button from '../commons/Button';

import WrappedFormField from '../commons/WrappedFormField';

const RoomsFieldArrayForListing = ({ i, ...props }) => {

  const { remove, push, form } = props;

  const values = form.values;

  const { handleChange, handleBlur } = form;

  const currentRooms = values.properties[i].rooms;

  return (
    <>
    <p>Hello</p>
     <Button title='ajouter une chambre' size='s' onClick={() => push({
       capacity: 1,
       strangersFriendly: false
     })}></Button>
      {!!currentRooms && currentRooms.length !== 0 && currentRooms.map((_, index) => {
        return (
           <div key={index}>
            <WrappedFormField
              label="Contenance"
              name={`properties.${i}.rooms.${index}.capacity`}
              value={values.properties[i].rooms[index]?.capacity}
              type='number'
              onChange={handleChange}
            />
            <WrappedFormField
              label='Coexistence de personnes inconnues possibles'
              type='text'
              name={`properties.${i}.rooms.${index}.strangersFriendly`}
              value={values.properties[i].rooms[index]?.strangersFriendly}
              onBlur={handleBlur}
            />
         </div>
        )
      })}
    </>
  )
}


export default RoomsFieldArrayForListing;