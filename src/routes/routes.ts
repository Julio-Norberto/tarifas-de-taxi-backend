import { Router } from 'express'
import { createTablePrice, removePriceInfo, showOnePriceInfo, showPricesInfo, updatePriceInfo } from '../use-cases/PricesController.js'
import { checkUser, createUser, loginUser } from '../use-cases/UserController.js'

export const userRouter = Router()

// Middleware
import { verifyToken } from '../helpers/verify-token.js'

// User Routes
userRouter.get('/', (req, res) => {
  res.send('Olá, mundo!')
})
userRouter.post('/create', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/checkuser', checkUser)

// Table Price Routes
userRouter.get('/prices', showPricesInfo)
userRouter.post('/createPrice', verifyToken, createTablePrice)
userRouter.get('/prices/:id', showOnePriceInfo)
userRouter.patch('/prices/:id', verifyToken, updatePriceInfo)
userRouter.delete('/prices/remove/:id', verifyToken, removePriceInfo)
