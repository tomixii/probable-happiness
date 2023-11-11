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
    try {
      const { image } = req.body
      const type = await detectObjectType(image)
      if (type) {
        const data = await getInfoFromObjectType(type)
        res.json(data)
      } else {
        res.sendStatus(400)
      }
    } catch (e) {
      console.log(e)
      res.sendStatus(500)
    }
  }
)

export default itemsRouter
