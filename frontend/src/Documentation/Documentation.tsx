import { Box, Paper, Typography } from "@material-ui/core";
import * as hljs from 'highlight.js';
import "highlight.js/styles/github.css";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router";
import { LayoutContext } from "../App/LayoutContext";
import ApiRequest from "../Common/ApiRequest";
import { DocumentationService } from "./DocumentationService";
import useStyles from "./styles";


const fixImages = () => {
  // check if running on dev, because if so, since the images come from backend
  // and backend is in a different url we need to change the url of the image


  const currentPort = window.location.port || "80";

  document.querySelectorAll("#doc-container img").forEach(img => {
    const image: HTMLImageElement = img as HTMLImageElement;
    let src = image.src;

    // markdown viewer automatically changes the url to absolute.
    // But /docs its a react route, its not on the server, so change /docs/ with the server route /documentation/
    src = src.replace("/docs/", "/documentation/");

    if (process?.env?.NODE_ENV === 'development')
      src = src.replace(`:${currentPort}/`, `:${ApiRequest.serverPort()}/`);

    image.src = src;


  });

};

const Documentation = () => {

  const [documentation, setDocumentation] = useState("");
  const classes = useStyles();
  const { topic } = useParams();
  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    layoutContext.setLoading(true);
    DocumentationService.getDocumentation(topic).then((res: string) => {

      setDocumentation(res);
      layoutContext.setLoading(false);
    }).catch(() => layoutContext.setLoading(false));

  }, []);

  useEffect(() => {
    fixImages();
    setTimeout(() => hljs.initHighlighting(), 500);
  }, [documentation]);


  return (
    <Box>
      <Paper id="doc-container" className={classes.root}>
        <Typography variant="h2">Documentation</Typography>
        <ReactMarkdown source={documentation} />
      </Paper>
    </Box >
  );
};

export default Documentation;
