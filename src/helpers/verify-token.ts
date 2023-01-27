import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { getToken } from './get-token.js'

config()

export const verifyToken = (req, res, next) => {
  const secret: string | undefined = process.env.TOKEN_SECRET

  if(!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  const token = getToken(req)

  if(!token) {
    return res.status(401).json({ message: "Acesso negado!" })
  }

  try {
    const verified = jwt.verify(token, secret!)
    req.user = verified
    next()
  } catch(err) {
    console.log(err)
    res.status(400).json({ message: "Token inválido" })
  }
}
