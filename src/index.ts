import * as express from 'express'

import User from './routes/User'
import Event from './routes/Event'

import UserStore from './store/UserStore'
import EventStore from './store/EventStore'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

const datastore = { 

  users: new UserStore(),
  events: new EventStore()

}

app.use('/api', User(datastore))
app.use('/api', Event(datastore))

app.listen(port, () => {
  console.log(`NS8 User Tracking Rest API running on http://localhost:${port}`)
})
