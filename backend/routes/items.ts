import { Router, Request, Response } from 'express'
import { getDataFromImage } from '../services/openai'

interface ItemPostData {
  image: string
}

const itemsRouter = Router()

itemsRouter.post(
  '/',
  async (req: Request<null, null, ItemPostData>, res: Response) => {
    const { image } = req.body
    const data = await getDataFromImage(image)
    res.json(data)
  }
)

export default itemsRouter
