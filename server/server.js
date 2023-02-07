import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'hi from server'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt

    console.log('prompt', prompt)

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    console.log('response', response)
    res.status(200).send({
      bot: response.data.choices[0].text
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).send({ error })
  }
})

app.get('/test', async (req, res) => {
  try {
    const prompt = "what is your name?"
        
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    console.log('response', response)
    res.status(200).send({
      bot: response.data.choices[0].text
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).send({ error })
  }
})

app.listen(5000, () => console.log('Sever is running in port http://localhost:5000'))