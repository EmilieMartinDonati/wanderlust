import React from "react"

import Tree from "../../public/images/tree.jpg";
import Milky from "../../public/images/milky.jpg";
import Lake from "../../public/images/lake.jpg";
import Street from "../../public/images/street.jpg";
import Beach from "../../public/images/beach.jpg";
import Play from "../../public/images/play.jpg";
import Bridge from "../../public/images/bridge.jpg";
import { JSS_THEMATIC_STYLES as THEME } from "../../styles/theme";

import PerspectiveCarousel from "../PerspectiveCarousel";

const LandingPicturesCarousel = () => {

  const landingProvisionalArray = [Tree, Milky, Bridge, Street, Beach, Play, Lake]; // actually images defined from bo and stored into database

  return <div style={{padding: "20px", background: THEME.colors.yellow.sand}}><PerspectiveCarousel array={landingProvisionalArray} /></div>

}

export default LandingPicturesCarousel