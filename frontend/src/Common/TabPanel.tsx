import { Box } from "@material-ui/core";
import React from "react";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  selectedTabIndex: number;
  className: any;
}


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