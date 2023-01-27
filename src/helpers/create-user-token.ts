import { Request, Response } from 'express'
import { IUser } from '../interfaces/IUser'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

config()

export const createUserToken = async(user: IUser, req: Request, res: Response) => {
  const secret: string | undefined = process.env.TOKEN_SECRET

  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, secret!)

  res.status(200).json({ message: "Usuário autenticado com sucesso", token: token, id: user._id })
}
