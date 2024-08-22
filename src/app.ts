import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import dotenv from 'dotenv';
dotenv.config();

import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('¡Buenas!! bienvenido')

const main = async () => {
  const provider = createProvider(BaileysProvider)
  provider.initHttpServer(3004)
  provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
    const body = req.body
    const message = body.message
    const mediaUrl = body.mediaUrl
    await bot.sendMessage(process.env.PHONE_NUMBER,message,{
      media: mediaUrl
    })
    res.end('si funciona el post :v')
  }))
  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider
  })
}
main ()