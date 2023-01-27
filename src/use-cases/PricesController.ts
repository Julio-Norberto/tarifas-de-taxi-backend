import { PricesInformation } from '../entities/prices.js'
import {IPriceInfo} from '../interfaces/IPriceInfo.js'
import { Request, Response } from 'express'

export const showPricesInfo = async (req: Request, res: Response) => {
  PricesInformation.find((err, data) => {
    if(err) {
      return res.json({ message: `Algo de errado: ${err}` })
    }

    res.json(data)
  })
}

export const createTablePrice = async (req: Request, res: Response) => {
  const { destination, price } = req.body

  const tablePrice = new PricesInformation({
    destination,
    price,
  })

  await tablePrice.save()

  res.json({ message: "Tabela de preços criada com sucesso!" })
}

export const showOnePriceInfo = async (req: Request, res: Response) => {
  const id = req.params.id

  PricesInformation.findById(id, (err: any, data: IPriceInfo) => {
    if(err) {
      res.json({ message: `Algo de errado: ${err}` })
    }

    res.json(data)
  })

}

export const updatePriceInfo = async (req: Request, res: Response) => {
  const id = req.params.id

  const { destination, price } = req.body

  PricesInformation.findByIdAndUpdate(id, { destination: destination, price: price }, (err) => {
    if(err) {
      return res.json({ message: `Algo deu errado: ${err}` })
    }

    res.json({ message: "Atualização feita com sucesso" })
  })
}

export const removePriceInfo = async (req: Request, res: Response) => {
  const id = req.params.id

  PricesInformation.findByIdAndRemove(id, (err: any) => {
    if(err) {
      return res.json({ message: `Algo deu errado: ${err}` })
    }

    res.json({ message: "Dados removidos com sucesso!" })
  })
}
