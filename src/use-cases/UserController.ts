import { User } from '../entities/user.js'
import { Request, Response } from 'express'
import { createUserToken } from '../helpers/create-user-token.js'
import { getToken } from '../helpers/get-token.js'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
  const { name, login, password, confirmPass } = req.body

  // validations
  if(!name || !login || !password || !confirmPass) {
    return res.status(422).json({ message: "Por favor preencha todos os campos" })
  }

  if(password !== confirmPass) {
    return res.status(422).json({ message: "as senhas não coincidem" })
  }

  // check if user exists
  const userExists = await User.findOne({ login: login })

  if(userExists) {
    return res.status(422).json({ message: "E-mail já cadastrado" })
  }

  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // create user
  const user = new User({
    name,
    login,
    password: passwordHash,
  })

  try {
    await user.save()

    res.status(201).json({ message: "usuário criado com sucesso!" })
  } catch(err) {
    console.log(err)
    res.status(500).json({ message: "Erro no servidor, tente novamente mais tarde..." })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { login, password } = req.body

  // validations
  if(!login || !password) {
    return res.status(422).json({ message: "Por favor preencha todos os campos" })
  }

  // check if user exists
  const user = await User.findOne({ login: login })

  if(!user) {
    return res.status(404).json({ message: "Este usuário não existe" })
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword) {
    return res.status(422).json({ message: "senha ou login inválidos" })
  }

  await createUserToken(user, req, res)

}

export const checkUser = async (req: Request, res: Response) => {
  const secret: string | undefined = process.env.TOKEN_SECRET

  let currentUser

  if(req.headers.authorization) {
    const token = getToken(req)
    const decoded: any = jwt.verify(token, secret!)

    currentUser = await User.findById(decoded.id)

    currentUser.password = undefined
  } else {
    currentUser = null
  }

  res.status(200).send(currentUser)
}
