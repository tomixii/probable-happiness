import { Router, Request, Response } from 'express'
import { getInfoFromObjectType } from '../services/openai'
import { detectObjectType } from '../services/aws'

interface ItemPostData {
  image: string
}

const itemsRouter = Router()

itemsRouter.post(
  '/',
  async (req: Request<null, null, ItemPostData>, res: Response) => {
    const { image } = req.body
    const types = await detectObjectType(image)
    if (types) {
      const data = await getInfoFromObjectType(types)
      res.json(data)
    } else {
      res.sendStatus(400)
    }
  }
)

export default itemsRouter
