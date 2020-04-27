import { Box, Card, CardContent, IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { IChallengeProps } from "../Challenge/IChallengeProps";
import { InsecureRandomService } from "./InsecureRandomService";
import useStyles from "./styles";





const InsecureRandom = (props: IChallengeProps) => {

  const classes = useStyles();
  const [coupons, setCoupons] = useState<number[]>([]);
  const [couponCheck, setCouponCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkCoupon = (event: React.SyntheticEvent) => {
    event.preventDefault();

    InsecureRandomService.checkCoupon(couponCheck).then(res => {
      props.setFlag(res.flag);
      if (res.valid) {
        window.scrollTo(0, 200);
        setErrorMessage("");
      }
      else setErrorMessage("This coupon is not valid");

    }).catch(ex => {
      setErrorMessage("This coupon is not valid");
    });

  };


  useEffect(() => {
    InsecureRandomService.getCoupons().then(response => {
      setCoupons(response);
    });
  }, []);


  const onCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => setCouponCheck(e.target.value);

  return (
    <Box>
      <Box className={classes.warning}>
        <Alert severity="warning">
          The publicly available POC for predicting Math.random numbers doesn't work properly with (at least) Node v10.<br />
          This was tested successfull on Node v12, so if you want to keep it simple this is the recomended version to use for this challenge.
      </Alert>
      </Box>

      <Box textAlign="center" className={classes.congrats}>
        <Typography color="primary" variant="h2">Congratulations!!!</Typography>
        <Typography >You are our 1 000 000 visitor.</Typography>
        <Typography >To celebrate we want to offer you some coupon codes that you can use on our online stores.</Typography>
        <Typography >Hurry up, this offer has limited time!!!</Typography>
      </Box>


      <Card className={classes.root}>
        <ConfirmationNumberIcon className={classes.couponIcon} />
        <CardContent>
          <Typography gutterBottom variant="h5" >You coupon codes</Typography>
          <Typography>Thank you for being a loyal customer. Here's a special treat for you</Typography>
          <Typography>2% Discount at any purchase</Typography>
          {coupons.map((coupon) => (
            <Typography key={coupon} variant="overline" display="block" gutterBottom >
              Code: dvcapp-{InsecureRandomService.formatCoupon(coupon)}
            </Typography>
          ))
          }
        </CardContent>
      </Card>

      <Box>
        <Typography>Check if your coupon codes are still valid here:</Typography>
        <Paper className={classes.form} component="form" onSubmit={checkCoupon}>
          <IconButton color="primary" type="submit">
            <FindInPageIcon />
          </IconButton>
          <InputBase fullWidth className={classes.couponInput} placeholder="DVCAPP-xxxx-xxxxx-xxxx-xxxx-xxxx" onChange={onCouponChange} />
        </Paper>

        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <div />}
      </Box>

    </Box >
  );

};

export default InsecureRandom;