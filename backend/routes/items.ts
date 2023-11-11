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
      const types = await detectObjectType(image)
      if (types) {
        const data = await getInfoFromObjectType(types)
        /*const mockData = {
          itemName: 'Mobile Phone',
          materials: [
            {
              material: 'Copper',
              quantity: 0.1,
              value: 0.1,
              consumption: 0.1,
              critical: true,
            },
            { material: 'Gold', quantity: 2, value: 60000, consumption: 0.1 },
          ],
          totalValue: 15,
        }
        setTimeout(() => {
          res.json(mockData)
        }, 2000)*/
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
