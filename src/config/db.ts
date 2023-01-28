import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

mongoose.set("strictQuery", false)

async function main() {
  const dbuser = process.env.DB_USER
  const dbpass = process.env.DB_PASS

  await mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.sanr1fc.mongodb.net/?retryWrites=true&w=majority`)
  console.log('Banco de dados conectado com sucesso!')
}

main().catch((err: any) => console.log(err))
