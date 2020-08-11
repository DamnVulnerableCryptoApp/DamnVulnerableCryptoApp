import { Button, Chip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useHistory } from "react-router";
import { IChallengeCardProps } from "./IChallengeCardProp";


const pad = (n: number, size = 2): string => {
  let s = `${n}`;
  while (s.length < (size)) { s = "0" + s; }

  return s;
};

const ChallengeCard = (props: IChallengeCardProps) => {

  const history = useHistory();
  const done = <Chip size="small" label="Done" style={{ backgroundColor: 'green', color: 'white' }} />;

  const onChallengeClick = (path: string) => {
    return () => {
      history.push(path);
    };
  };


  return (
    <Card>
      <CardActionArea>
        <CardContent style={{ height: '180px' }} onClick={onChallengeClick(props.challenge.url)}>
          <Typography gutterBottom variant="h5" component="h2" style={{ height: '60px' }}>
            {pad(props.index + 1, 2)} - {props.challenge.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.challenge.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onChallengeClick(props.challenge.url)}>
          Take the challenge
        </Button>
        {props.done ? done : ""}
      </CardActions>
    </Card >
  );

};


export default ChallengeCard;