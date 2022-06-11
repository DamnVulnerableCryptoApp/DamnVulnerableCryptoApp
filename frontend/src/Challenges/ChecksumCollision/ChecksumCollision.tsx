import { Box, Button, IconButton } from "@material-ui/core"
import AttachFileIcon from '@material-ui/icons/AttachFile'
import React, { useContext, useEffect, useState } from "react"
import Typed from "typed.js"
import { LayoutContext } from "../../App/LayoutContext"
import { IChallengeProps } from "../../Challenge/IChallengeProps"
import ChecksumCollisionService from "./ChecksumCollisionService"
import useStyles from "./styles"

const banner =
  "                   ___________       __        ___________                   \n" +
  "                   \\_   _____/____  |  | __ ___\\__    ___/__________  _____  \n" +
  "                    |    __) \\__  \\ |  |/ // __ \\|    |_/ __ \\_  __ \\/     \\ \n" +
  "                    |     \\   / __ \\|    <\\  ___/|    |\\  ___/|  | \\/  Y Y  \\\n" +
  "                    \\___  /  (____  /__|_ \\\\___  >____| \\___  >__|  |__|_|  /\n" +
  "                        \\/        \\/     \\/    \\/           \\/            \\/ \n" +
  "                   \n" +
  "                                              (`.         ,-,\n" +
  "                                              `\\ `.    ,;' /\n" +
  "                                               \\`. \\ ,'/ .'\n" +
  "                                         __     `.\\ Y /.'\n" +
  "                                      .-'  ''--.._` ` (\n" +
  "                                    .'            /   `\n" +
  "                                   ,           ` '   Q '\n" +
  "                                   ,         ,   `._    \\\n" +
  "                                   |         '     `-.;_'\n" +
  "                                   `  ;    `  ` --,.._;\n" +
  "                                   `    ,   )   .'\n" +
  "                                    `._ ,  '   /_\n" +
  "                                       ; ,''-,;' ``-\n" +
  "                                        ``-..__\\``--`  fl\n"


const string1 = 'Wake up Oen^1000'
const string2 = 'We found a way in^1000'
const string31 = 'We need you to create two executables, one is a completely normal file`<br>`'
const string32 = 'But the other is the actual malware.<br>'
const string33 = 'Here\'s the catch: they both need to have the same checksum. The target uses md5 checksums<br>'
const string3 = string31 + '^500' + string32 + '^500' + string33 + '^2000'
const string4 = 'Hurry uo'
const string5 = 'Hurry ul'
const string6 = 'F*ck'
const string7 = 'Hurry up^1000'
const stringFixed = "`" + string31 + string32 + string33 + "`"
let typed: Typed


const ChecksumCollision = (props: IChallengeProps) => {
  const classes = useStyles()
  const layoutContext = useContext(LayoutContext)
  const noFileSelected = "No File Selected"

  const [file1, setFile1] = useState<File>(new File([], ""))
  const [file2, setFile2] = useState<File>(new File([], ""))

  const typedError = () => {
    typed.destroy()
    typed = new Typed('#console', {
      strings: [
        'Hello Eon,^1000 `<br>`' +
        'Something is not right... Was this a mistake? ^1000 `<br>`' +
        'We will wait for another try...^1000 `<br>`',
        stringFixed
      ],
      typeSpeed: 50,
      loop: false
    })
  }

  const uploadFiles = () => {
    layoutContext.setLoading(true)

    ChecksumCollisionService.sendFiles(file1, file2).then(data => {
      layoutContext.setLoading(false)
      props.setFlag(data.flag)

      if (!data.success) typedError()

    }).catch(() => {
      layoutContext.setLoading(false)
      typedError()
    })

  }




  useEffect(() => {

    typed = new Typed('#console', {
      strings: [string1, string2, string3, string4, string5, string6, string7, stringFixed],
      typeSpeed: 50,
      loop: false
    })

  }, [])


  const onFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setFile1(e.target.files[0]) } }
  const onFile2Change = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) { setFile2(e.target.files[0]) } }

  return (<div>
    <Box>
      <Box className={classes.consoleContainer}>
        <pre>{banner}</pre>
        <span id="console" className={classes.console} />
      </Box>
    </Box>

    <Box>
      <input id="file1" type="file" onChange={onFile1Change} />
      <label htmlFor="file1">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AttachFileIcon />
        </IconButton>
        {file1.name || noFileSelected}
      </label>
    </Box>
    <Box>
      <input id="file2" type="file" onChange={onFile2Change} />
      <label htmlFor="file2">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AttachFileIcon />
        </IconButton>
        {file2.name || noFileSelected}
      </label>
    </Box>
    <Button variant="contained" onClick={uploadFiles}>Send</Button>
  </div>)
}


export default ChecksumCollision
