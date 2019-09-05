import * as express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.get('/', (req: express.Request, res: express.Response):void => {
  res.status(200).json({ msg: 'hello, world' })
})

app.listen(port, () => {
  console.log(`NS8 User Tracking Rest API running on http://localhost:${port}`)
})

