import { Router, Request, Response } from 'express'

import * as HttpStatus from 'http-status-codes'


export default function User(store) {

  const userRouter = Router()

  userRouter.get('/users', async (req: Request, res: Response) => {

    const users = await store.users.findAll()

    res.status(HttpStatus.OK).send({
      data: {
        users
      }
    })

  })
  userRouter.get('/users/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params
    const user = await store.users.findById(Number(userId))

    if (user) {
      return res.status(HttpStatus.OK).send({
        data: {
          user
        }
      })
    }

    return res.status(HttpStatus.NOT_FOUND).send('User not found')


  })
  userRouter.post('/users', async (req: Request, res: Response) => {

    const { email, password, phoneNumber } = req.body

    const newUser = await store.users.create({ 
      email,
      password,
      phoneNumber,
    })

    if (!newUser) {
      return res.status(HttpStatus.CONFLICT).send({
        data: {
          user: null
        }
      })
    }

    return res.status(HttpStatus.CREATED).send({
      data: {
        user: newUser
      }
    })

  })
  userRouter.get('/users/:userId/events', async (req: Request, res: Response) => {

    const { userId } = req.params
    const userEvents = await store.events.find({ userId: Number(userId) })

    return res.status(HttpStatus.OK).send({
      data: {
        events: userEvents
      }
    })

  })

  return userRouter

}
