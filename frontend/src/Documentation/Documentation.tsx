import { Box, Paper } from "@material-ui/core";
import * as hljs from 'highlight.js';
import "highlight.js/styles/github.css";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router";
import { DocumentationService } from "./DocumentationService";
import useStyles from "./styles";


const fixImagesInDev = () => {
  // this is a quick and dirty way of doing it... shold be improved
  // check if running on dev, because if so, since the images come from backend
  // and backend is in a different url we need to change the url
  if (process?.env?.NODE_ENV === 'development') {
    const imgs = document.getElementsByTagName("img");
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      img.src = img.src.replace(":4000", ":1234");
    }
  }
}

const Documentation = () => {

  const [documentation, setDocumentation] = useState("");
  const classes = useStyles();
  const { topic } = useParams();

  useEffect(() => {

    DocumentationService.getDocumentation(topic).then((res: string) => {
      setDocumentation(res);
      hljs.initHighlighting();
    });

  }, []);

  useEffect(() => {
    fixImagesInDev();
  }, [documentation]);

  return (
    <Box>
      <Paper>
        <ReactMarkdown className={classes.root} source={documentation} />
      </Paper>
    </Box >
  );
};

export default Documentation;