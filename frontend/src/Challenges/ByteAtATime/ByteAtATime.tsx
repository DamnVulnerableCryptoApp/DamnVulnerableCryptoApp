import { Box, Button, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../App/LayoutContext";
import { IChallengeProps } from "../../Challenge/IChallengeProps";
import ApiRequest from "../../Common/ApiRequest";
import TabPanel from "../../Common/TabPanel/TabPanel";
import faklerLogo from "../../Images/fakler.png";
import { ByteAtATimeService } from "./ByteAtATimeService";
import IRequest from "./IRequest";
import useStyles, { StyledTableCell, StyledTableRow } from "./styles";

// TODO: make this data more dynamic, its kinda ugly this way with all the replaces and repeated info
const defaultRequests = [

  {
    status: 200,
    protocol: window.location.protocol.replace(":", ""),
    host: ApiRequest.getApiOrigin(),
    url: '/aes/ecb/byte-at-a-time/request-access',
    method: 'POST',
    rawContent: "POST http://127.0.0.1:1234/aes/ecb/byte-at-a-time/request-access HTTP/1.1\ncontent-type: application/json\nusername: AdminsFriend".replace("127.0.0.1:1234", ApiRequest.getApiOrigin()),
    rawResponse: 'HTTP/1.1 200 OK\n\n{"granted":true,"token":"45e7e9420d69bf449f83e8950ffe641453bae8f1cd4f495d073bdfe88aad9cc59f5e71d57ec35e9327de4266ee114abd"}'
  },
  {
    status: 200,
    protocol: window.location.protocol.replace(":", ""),
    host: ApiRequest.getApiOrigin(),
    url: '/aes/ecb/byte-at-a-time/admin',
    method: 'POST',
    rawContent: "POST http://localhost:1234/aes/ecb/byte-at-a-time/admin HTTP/1.1\ncontent-type: application/json\nAuthorization: basic YWRtaW46dGVzdA==".replace("127.0.0.1:1234", ApiRequest.getApiOrigin()),
    rawResponse: 'HTTP/1.1 200 OK\n\n{"flag":"","success":false}'
  },


];

const ByteAtATime = (props: IChallengeProps) => {
  const classes = useStyles();

  const [requests, setRequests] = useState<IRequest[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [editedRequest, setEditedRequest] = useState("");

  const layoutContext = useContext(LayoutContext);

  const onTableRowSelected = (i: number) => {
    return (e: React.MouseEvent) => {
      setSelectedRow(i);
    };
  };


  const onTabChange = (event: React.ChangeEvent<{}>, newValue: number) => setSelectedTab(newValue);
  const onEditRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditedRequest(event.target.value);


  const onSubmitClicked = async () => {
    layoutContext.setLoading(true);
    ByteAtATimeService.submitRequest(editedRequest).then(resp => {
      layoutContext.setLoading(false);

      setRequests([...requests, resp]);

      // TODO: find a better way of doing this...
      const m = resp.rawResponse.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
      if (m) props.setFlag(m[0]);


    }).catch(err => {
      layoutContext.setLoading(false);
      // TODO: HANDLE ERROR
      // error parsing the request...
    });


  };

  useEffect(() => {
    setRequests(defaultRequests);
    setSelectedRow(0);

  }, []);

  useEffect(() => {
    setEditedRequest(requests[selectedRow]?.rawContent);
    setSelectedTab(0);
  }, [selectedRow]);




  return (
    <Box>
      <Box textAlign="center">
        <img src={faklerLogo} className={classes.logo} />
      </Box>

      <Box mt={2} mb={4}>
        <Alert severity="info">
          A Fakler capture was shared online with you, take a look and have fun :)
      </Alert>
      </Box>

      <Typography variant="h4">Captured Packages</Typography>
      <TableContainer component={Paper} className={classes.requestsTable}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Method</StyledTableCell>
              <StyledTableCell>Protocol</StyledTableCell>
              <StyledTableCell>Host</StyledTableCell>
              <StyledTableCell>Url</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              requests.map((c, i) => (
                <StyledTableRow key={i} onClick={onTableRowSelected(i)} selected={i === selectedRow}>
                  <StyledTableCell>{i}</StyledTableCell>
                  <StyledTableCell>{c.status}</StyledTableCell>
                  <StyledTableCell>{c.method}</StyledTableCell>
                  <StyledTableCell>{c.protocol}</StyledTableCell>
                  <StyledTableCell>{c.host}</StyledTableCell>
                  <StyledTableCell>{c.url}</StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>


      <Box mt={3}>
        <Tabs value={selectedTab} onChange={onTabChange} className={classes.tabs}>
          <Tab label="Request" icon={<ArrowForwardIcon />} />
          <Tab label="Response" icon={<ArrowBackIcon />} />
          <Tab label="Edit Request" icon={<EditIcon />} />
        </Tabs>
        <TabPanel index={0} selectedTabIndex={selectedTab} className={classes.tabPanel}>
          {<pre>{requests[selectedRow]?.rawContent}</pre>}
        </TabPanel>
        <TabPanel index={1} selectedTabIndex={selectedTab} className={classes.tabPanel}>
          {<pre>{requests[selectedRow]?.rawResponse}</pre>}
        </TabPanel>
        <TabPanel index={2} selectedTabIndex={selectedTab} className={classes.tabPanel}>
          <Box textAlign="right">
            <Button color="primary" type="submit" onClick={onSubmitClicked}>
              Send
            <SendIcon />
            </Button>
          </Box>
          <TextField multiline rows={16} fullWidth value={editedRequest} onChange={onEditRequestChange} className={classes.editRequestInput} />
        </TabPanel>


      </Box>
    </Box>

  );
};

export default ByteAtATime;