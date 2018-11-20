import config from "../../app/config/config"
import path from 'path'
import fs from 'fs'
import sequelizeRC from '../../.sequelizerc'

const env = process.env.NODE_ENV || 'development'
const targetFile = path.resolve(sequelizeRC.config)
const sequelizeCLIConfig = {}

sequelizeCLIConfig[env] = config.db

fs.writeFile(targetFile, JSON.stringify(sequelizeCLIConfig, null, 4), function(err) {
    if(err) {
        return console.log(err)
    }

    console.log("The sequelizeCLI config file was saved at " + targetFile + "!")
})