import { Router, Request, Response } from 'express'

interface ItemPostData {
  image: string
}

const itemsRouter = Router()

itemsRouter.post(
  '/',
  (req: Request<null, null, ItemPostData>, res: Response) => {
    const { image } = req.body

    res.json({ data: 'Hello from items router' })
  }
)
