import { Backdrop, createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import LoadingImg from '../Images/loading.gif';

const useStyles = makeStyles(() =>
  createStyles({
    backdrop: {
      zIndex: 10,
    },
  }),
);


const Loading = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <img src={LoadingImg} width="100" />
    </Backdrop>
  );
};

export default Loading;