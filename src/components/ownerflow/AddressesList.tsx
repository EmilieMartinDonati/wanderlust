import React, { useState, useEffect } from "react";
import RedirectionItem from "../commons/RedirectionItem";

const AddressesList = ({ addresses = [], className = "" }) => {
  if (!addresses && !addresses?.length) return null;

  return (
    <div className={className}>
      {addresses.map((address) => {
        const fullAddress = address.address + " " + address.zipCode + " " + address.city;
        return (
          <RedirectionItem
            key={address._id}
            bottomBordered={false}
            mainContent={fullAddress}
            enhanced={address.isMainAddress}
          />
        );
      })}
    </div>
  );
};

export default AddressesList;
