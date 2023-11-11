import express, { Request, Response, NextFunction, Express } from 'express'
const app: Express = express()

app.use(express.json())

const port = process.env.PORT || 8080

app.get(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({
        message: 'Hurray!! we create our first server on bun js',
        success: true,
      })
    } catch (error: unknown) {
      next(new Error((error as Error).message))
    }
  }
)

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})
