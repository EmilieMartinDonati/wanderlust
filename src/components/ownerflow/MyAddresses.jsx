import React, { useEffect, useState } from "react";
import RedirectionItem from "../commons/RedirectionItem";
import { fetchUserAddresses } from "../../actions/addresses";
import AddressesList from "./AddressesList";

import { createUseStyles } from "react-jss";

import { CENTRAL_MODAL_HEIGHT, CENTRAL_MODAL_HEADER_HEIGHT } from "../../actions/layout";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "6fr 1fr",
    height: CENTRAL_MODAL_HEIGHT - 30,
  },
  addressesList: {
    overflowX: "auto",
    paddingTop: CENTRAL_MODAL_HEADER_HEIGHT,
  },
}));

const MyAddresses = () => {
  const classes = useStyles();

  const _redirect = () => {
    console.log("id"); // show address details ...
  };

  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const bogusAddresses = [
    {
      id: "345",
      address: "2 rue des Templiers 92190 Meudon",
      isMainHousing: false,
      name: "Chez moi",
    },
    {
      id: "346",
      address: "3 rue des Templiers 92190 Meudon",
      isMainHousing: false,
      name: "Sister",
    },
    {
      id: "347",
      address: "4 rue du Temple 92190 Meudon",
      isMainHousing: true,
      name: "Coloc",
    },
    {
      id: "348",
      address: "5 rue des Templiers 92190 Meudon",
      isMainHousing: false,
      name: "Chez lui",
    },
    {
      id: "349",
      address: "6 rue des Templiers 92190 Meudon",
      isMainHousing: false,
      name: "Chez eux",
    },
    {
      id: "359",
      address: "27 rue des Templiers 92190 Meudon",
      isMainHousing: false,
      name: "nowhere",
    },
  ];

  const sortedBogusAddresses = bogusAddresses.sort((addressA, addressB) => {
    if (!!addressA.isMainHousing && !addressB.isMainHousing) return -1;
    if (!!addressB.isMainHousing && !addressA.isMainHousing) return 1;
    return 0;
  });


  const redirectToAddAddress = () => {
    window.location.replace('/test/addAddress');
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetchUserAddresses();
      setAddresses(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  
  return (
    <div className={classes.root}>
      <AddressesList className={classes.addressesList} addresses={addresses} />
      <RedirectionItem mainContent={"Ajouter une addresse"} onRedirect={redirectToAddAddress}/>
    </div>
  );
};

export default MyAddresses;
