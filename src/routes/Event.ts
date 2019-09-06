import { Router, Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'
import axios from 'axios'

export default function Event(store) {

  const eventRouter = Router()

  eventRouter.get('/events', async (req: Request, res: Response) => {

    const { start } = req.query
    const startFilter = Number(start)
    const userEvents = await store.events.findAll()

    res.status(HttpStatus.OK).send({
      data: {
        events: start ? userEvents.filter(e => e.created >= startFilter) : userEvents 
      }
    })

  })
  eventRouter.post('/events', async(req: Request, res: Response) => {

    const { eventType, userId } = req.body
    const newUserEvent = await store.events.create({
      eventType,
      userId,
    })

    res.status(HttpStatus.CREATED).send({
      data: {
        event: newUserEvent
      }
    })
  })

  eventRouter.get('/events/:eventId', async (req: Request, res: Response) => {

    const { eventId } = req.params
    const userEvent = await store.events.findById( Number(eventId) ) 

    if (!userEvent) {
      return res.sendStatus(HttpStatus.NOT_FOUND)
    }

    return res.status(HttpStatus.OK).send({
      data: {
        event: userEvent
      }
    })

  })


  eventRouter.post('/events/:userId', async(req: Request, res: Response) => {

    const { eventType, userId } = req.body
    const newEvent = await store.events.create({ eventType, userId: Number(userId) })

    res.status(HttpStatus.CREATED).send({
      data: {
        event: newEvent
      }
    })

  })

  eventRouter.post('/events?start=', async(req: Request, res: Response) => {

    const { eventType, userId } = req.body
    const newEvent = await store.events.create({ eventType, userId: Number(userId) })

  })

  return eventRouter

}
