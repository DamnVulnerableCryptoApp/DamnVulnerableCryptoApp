import { Box, Paper } from "@material-ui/core";
import * as hljs from 'highlight.js';
import "highlight.js/styles/github.css";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router";
import { DocumentationService } from "./DocumentationService";
import useStyles from "./styles";



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

  return (
    <Box>
      <Paper>
        <ReactMarkdown className={classes.root} source={documentation} />
      </Paper>
    </Box >
  );
};

export default Documentation;