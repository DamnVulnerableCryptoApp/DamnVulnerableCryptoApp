import { Box, Button, Card, Grid, TextField, Typography } from "@material-ui/core"
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import SendIcon from '@material-ui/icons/Send'
import Alert from "@material-ui/lab/Alert"
import React, { useContext, useEffect, useState } from "react"
import { LayoutContext } from "../../App/LayoutContext"
import { IChallengeProps } from "../../Challenge/IChallengeProps"
import fakeRoad from "../../Images/fake_road.png"
import { InsecureRandomService } from "./InsecureRandomService"
import useStyles from "./styles"




const InsecureRandom = (props: IChallengeProps) => {

  const classes = useStyles()
  const [coupons, setCoupons] = useState<number[]>([])
  const [couponCheck, setCouponCheck] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const layoutContext = useContext(LayoutContext)

  const checkCoupon = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setErrorMessage("")
    layoutContext.setLoading(true)

    InsecureRandomService.checkCoupon(couponCheck).then(res => {
      props.setFlag(res.flag)
      if (res.valid) {
        window.scrollTo(0, 200)
        setErrorMessage("")
      }
      else setErrorMessage("This coupon is not valid")

      layoutContext.setLoading(false)

    }).catch(ex => {
      setErrorMessage("This coupon is not valid")
      layoutContext.setLoading(false)
    })

  }


  useEffect(() => {
    layoutContext.setLoading(true)

    props.setWarning("The publicly available POC for predicting Math.random numbers doesn't work properly with (at least) Node v10.\n" +
      "This was tested successfully on Node v12, so if you want to keep it simple this is the recommended version to use for this challenge.")

    InsecureRandomService.getCoupons().then(response => {
      setCoupons(response)
      layoutContext.setLoading(false)
    }).catch(() => layoutContext.setLoading(false))



  }, [])


  const onCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => setCouponCheck(e.target.value)

  return (
    <Box className={classes.container}>

      <Box textAlign="center" className={classes.congrats}>
        <img src={fakeRoad} className={classes.logo} />
        <Typography variant="h2">Congratulations!!!</Typography>
        <Typography >You are our 1 000 000 visitor.</Typography>
        <Typography >To celebrate we want to offer you some coupon codes that you can use on our online stores.</Typography>
        <Typography >Hurry up, this offer has limited time!!!</Typography>
      </Box>

      <Box className={classes.coupons}>
        <Grid container spacing={3}>
          {
            coupons.map((coupon, i) => (
              <Grid item xs={12} md={4} key={i} >
                <Card className={classes.coupon}>
                  <Box textAlign="center">
                    <Box >
                      <Typography><strong>2% Discount</strong></Typography>
                    </Box>
                    <Box>
                      <ConfirmationNumberIcon className={classes.couponIcon} />
                    </Box>
                    <Box>
                      dvcapp-{InsecureRandomService.formatCoupon(coupon)}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Box>



      <Box p={3}>
        <Typography variant="h5">Check Coupon</Typography>

        <form onSubmit={checkCoupon}>
          <Box display="flex">
            <TextField fullWidth onChange={onCouponChange} label="Coupon code here" />
            <Button variant="contained" color="primary" type="submit">Send <SendIcon /></Button>
          </Box>

          <Box pt={2}>{errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <div />}</Box>
        </form>



      </Box>

    </Box >
  )

}

export default InsecureRandom