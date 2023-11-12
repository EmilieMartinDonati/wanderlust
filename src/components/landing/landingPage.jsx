import React, {useEffect} from "react"
import { createUseStyles } from "react-jss"
import LandingPicturesCarousel from "./landingPicturesCarousel"
import LandingPolicyHero from "./landingPolicyHero"

const useStyles = createUseStyles(() => ({
  landingRoot: {
    marginTop: 200,
    display: 'flex',
    flexDirection: "column",
  }
}))

const LandingPage = ({loadingFunction}) => {

  useEffect(() => {
      loadingFunction && loadingFunction()
  }, [])

  const classes = useStyles()
  return (
    <div className={classes.landingRoot}>
      <LandingPolicyHero />
      <LandingPicturesCarousel />
    </div>
  )
}

export default LandingPage