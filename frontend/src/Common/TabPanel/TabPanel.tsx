import { Box } from "@material-ui/core";
import React from "react";
import ITabPanelProps from "./ITabPanelProps";




const TabPanel = (panelProps: ITabPanelProps) => {
  const { children, selectedTabIndex, index } = panelProps;

  return (
    <div role="tabpanel" hidden={selectedTabIndex !== index} style={{ minHeight: '500px' }} className={panelProps.className}>
      <Box>
        {children}
      </Box>
    </div>
  );
};


export default TabPanel;