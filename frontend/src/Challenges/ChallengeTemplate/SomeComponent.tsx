import React, { useContext, useEffect } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import useStyles from "./styles";

const SomeComponent = (props: IChallengeProps) => {

  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    props.setFlag("some flag"); // not a valid flag, so it won't work
    props.setFlag("8cea9819-846d-4d60-81b3-db0fcad5e302");
    layoutContext.setLoading(true); // load some data, add animation
    layoutContext.setLoading(false); // remove loading animation
    layoutContext.setSnackErrorMessage("Some error message"); // it will auto hide

  }, []);


  const classes = useStyles();

  return (<div />);
};

export default SomeComponent;