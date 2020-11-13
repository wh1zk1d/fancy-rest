import dotenv  from 'dotenv'
dotenv.config()

import * as bodyParser from 'body-parser'
import express from 'express'
import routes from './routes'

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use('/', routes)

app.listen(PORT, () => console.log(`✨ Server ready at http://localhost:${PORT}`))