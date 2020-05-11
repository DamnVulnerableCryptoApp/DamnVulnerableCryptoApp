import { Box, LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { LayoutContext } from "./LayoutContext";


const Loading = () => {
  const layoutContext = useContext(LayoutContext);
  const loading = layoutContext.loading;
  const lp = <LinearProgress />;

  return (
    <Box>{loading ? lp : null}</Box>

  );
};

export default Loading;