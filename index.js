import express from 'express'
import connectToDatabase from './db/connection.js'
import userRouter from './modules/user/user.routes.js'
const app = express()
app.use(express.json())
const port = 3000
connectToDatabase()
app.get('/', (req, res) => res.send('Hello World!'))
app.use(userRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))