import React, { useState } from "react";
import { useNavigate } from "react-router";

import RedirectionItem from "../commons/RedirectionItem";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: [10, 10],
  },
}));

const OwnerInformation = () => {
  
  const navigate = useNavigate();

  const classes = useStyles();

  const ownerInformations = [
    {
      id: "address",
      title: "Mes adresses",
      active: true,
      onClick: () => {
        window.location.replace("/test/addresses");
      },
    },
    {
      id: "properties",
      title: "Mes propriétés",
      active: true,
      onClick: () => {},
    },
    {
      id: "bookings",
      title: "Mes réservations",
      active: true,
      onClick: () => {},
    },
    { id: "ratings", title: "Ma notation", active: true, onClick: () => {} }, // show this or that
    {
      id: "calendar",
      title: "Mon calendrier",
      active: true,
      onClick: () => {
        window.location.replace("/test/calendar");
      },
    }, // isActive depending if user has this or that // form has to be saved on the go. // at least stored on the go quitte à être confirmée plus tard.
  ];

  console.log('owner informations', ownerInformations);

  return (
    <div className={classes.root}>
      {ownerInformations.map((information) => (
        <RedirectionItem
          mainContent={information.title}
          key={information.id}
          onRedirect={information.onClick}
        />
      ))}
    </div>
  );
};

export default OwnerInformation;
