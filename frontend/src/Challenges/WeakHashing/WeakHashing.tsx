import { Avatar, Box, Card, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { IChallengeProps } from "../../Challenge/IChallengeProps"
import fakereporter from "../../Images/fakereporter.jpg"
import LoginScreen from "./LoginScreen"


const useStyles = makeStyles({
  hackerManifest: {
    'background-color': "#EDEDED"
  },
  card: {
    padding: '20px'
  },
  author: {
    display: 'flex',
    'margin-bottom': '50px'
  },
  authorName: {
    'padding-left': '20px'
  }
})

const WeakHashing = (props: IChallengeProps) => {
  const classes = useStyles()


  return (
    <div>

      <Card className={classes.card}>
        <div className={classes.author}>
          <div><Avatar alt="FakeReported" src={fakereporter} /></div>
          <div className={classes.authorName}>
            <Box fontWeight="fontWeightBold">The Fake Reporter</Box>
            Publishing non fake news since sometime
          </div>
        </div>
        <Typography>
          Hackers have defaced the famous "FakeAndInsecureWebsite.org" and claim to have access to the entire system.
        </Typography>
        <Typography>
          The following is the message left by the hacking group on the landing page:
        </Typography>

        <pre className={classes.hackerManifest}>
          {
            " __      __         ___               _    ___                   \n" +
            " \\ \\    / /__ __ _ / __|_ _ _  _ _ __| |_ / __|_ _ ___ _  _ _ __ \n" +
            "  \\ \\/\\/ / -_) _` | (__| '_| || | '_ \\  _| (_ | '_/ _ \\ || | '_ \\\n" +
            "   \\_/\\_/\\___\\__,_|\\___|_|  \\_, | .__/\\__|\\___|_| \\___/\\_,_| .__/\n" +
            "                            |__/|_|                        |_|   \n" +
            "\n" +
            " Statement:\n" +
            " ur security sukz\n" +
            " we p0wn you\n" +
            " To prove it here some DB entriez:\n" +
            " \n" +
            " +-------------+----------------------------------+---------+-------+\n" +
            " |  Username   |             password             | enabled | admin |\n" +
            " +-------------+----------------------------------+---------+-------+\n" +
            " | admin       | 482c811da5d5b4bc6d497ffa98491e38 | true    | true  |\n" +
            " | superuser   | fcea920f7412b5da7be0cf42b8c93759 | true    | true  |\n" +
            " | DreadPirate | 8266cbec2295ae2c548563d169e3ee28 | true    | false |\n" +
            " | alice       | 5f4dcc3b5aa765d61d8327deb882cf99 | false   | false |\n" +
            " +-------------+----------------------------------+---------+-------+\n" +
            " "

          }
        </pre>

        <Typography>
          Well, users from the application have nothing to fear, your passwords are secure.
          This website did a good job, and protected them before saving in the database.
        </Typography>

        <Typography>
          For those who are suffering from the defacement we got you covered.
          Here's an older version from the website for you (courtesy of WayTooBackMachine.org):
        </Typography>


        <Box border={1} mt={10}>
          <LoginScreen flag={props.flag} setFlag={props.setFlag} setWarning={props.setWarning} />
        </Box>

      </Card>
    </div>
  )
}


export default WeakHashing