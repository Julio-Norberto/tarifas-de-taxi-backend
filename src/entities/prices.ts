import { Schema, model } from 'mongoose'
import { IPriceInfo } from '../interfaces/IPriceInfo.js'

const priceInfo = new Schema<IPriceInfo>({
  destination: { type: String, required: true },
  price: { type: Number, required: true }
})

const PricesInformation = model<IPriceInfo>('priceInfos', priceInfo)

export { PricesInformation }
