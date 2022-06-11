import { Box, Typography } from "@material-ui/core"
import React, { useContext, useEffect } from "react"
import { LayoutContext } from "../../App/LayoutContext"
import { IChallengeProps } from "../../Challenge/IChallengeProps"
import fcaLogo from "../../Images/fca_logo.png"
import { BlockReorderingService } from "./BlockReorderingService"
import useStyles from "./styles"




const BlockReordering = (props: IChallengeProps) => {
  const classes = useStyles()
  const layoutContext = useContext(LayoutContext)

  useEffect(() => {
    layoutContext.setLoading(true)
    BlockReorderingService.createAnonymousSessionIfNeeded().then(() => {
      BlockReorderingService.isAdmin().then((res) => {

        props.setFlag(res.flag)
        layoutContext.setLoading(false)

      }).catch(() => layoutContext.setLoading(false))
    }).catch(() => layoutContext.setLoading(false))

  }, [])

  return (
    <Box >
      <Box className={classes.mainContainer}>
        <Box className={classes.manifesto}>
          <Box>
            <Typography variant="h4">[This site has been siezed]</Typography>
            <img alt="Fake Crypto Agency Logo" className={classes.logo} src={fcaLogo} />

          </Box>

          <Typography variant="h6">
            This website has been siezed as part of a fake law enforcement operation by the Fake Crypto Agency.
        </Typography>
          <Typography>
            In according with the law of Fake State and a protective order obtained by the Fake Faker Office of the Fakering Fake.
        </Typography>
        </Box>


        <Box className={classes.technicalInfo}>
          <Typography>
            This has been possible due to a flaw in the source code of the website, discovered upon carefull code review of its open source repository.
          </Typography>
          <Typography>
            The Fake Crypto Agency managed to find an encrypted token being sent to the webpage with the following structure:
          </Typography>
          <pre className={classes.tokenExample}>
            username=[USERNAME];isAdmin=false;aat=[DATE]
          </pre>
          <Typography>
            Where date is in GMT format.
          </Typography>
        </Box>
      </Box>
    </Box >
  )
}

export default BlockReordering