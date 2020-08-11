import { Box, LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { LayoutContext } from "../App/LayoutContext";


const Loading = () => {
  const layoutContext = useContext(LayoutContext);
  const loading = layoutContext.loading;
  const lp = <LinearProgress />;

  return (
    <Box style={{ height: '4px' }}>{loading ? lp : null}</Box>

  );
};

export default Loading;