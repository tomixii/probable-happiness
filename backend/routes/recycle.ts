import { Router } from 'express'
import { getRecyclingInstructions } from '../services/openai'

const recycleRouter = Router()

recycleRouter.get('/:itemName', async (req, res) => {
  const item = req.params.itemName
  const instructions = await getRecyclingInstructions(item)
  res.json({ instructions })
})

export default recycleRouter
