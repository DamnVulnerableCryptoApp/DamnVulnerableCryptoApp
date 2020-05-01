import { Box, Paper } from "@material-ui/core";
import * as hljs from 'highlight.js';
import "highlight.js/styles/github.css";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { DocumentationService } from "./DocumentationService";
import IDocumentationProps from "./IDocumentationProps";
import useStyles from "./styles";


const Documentation = (props: IDocumentationProps) => {

  const [documentation, setDocumentation] = useState("");
  const classes = useStyles();

  useEffect(() => {

    DocumentationService.getDocumentation(props.doc).then((res: string) => {
      setDocumentation(res);
      hljs.initHighlighting();
    });

  }, []);



  return (
    <Box>
      <Paper>
        <ReactMarkdown className={classes.root} source={documentation} />
      </Paper>
    </Box>
  );
};

export default Documentation;