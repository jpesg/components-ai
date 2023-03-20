import {ResponseOpenAi, OpenaiRequest, messageCreator} from '@/domain/openai'
import {post} from '@/modules/request'
import type {NextApiRequest, NextApiResponse} from 'next'

const {OPENAI_API_KEY} = process.env
const API_URL = 'https://api.openai.com/v1/chat/completions'

type Response = {
    name: string
} | { message: string }


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    const {prompt} = req.query as { prompt: string, language: string, framework: string }
    //zod + trpc

    try {
        const response = await post<OpenaiRequest, ResponseOpenAi>(API_URL, {
            model: 'gpt-3.5-turbo',
            messages: messageCreator(prompt),
            stream: false,

        }, {Authorization: `Bearer ${OPENAI_API_KEY}`})

        const message = response.choices[0].message
        return res.json({message: message.content})
    } catch (e) {
        console.log({e}, '~~~~~~~~~~~~~~~~~~~~~~')
    }

    /*

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messageCreator(prompt),
            stream: false,

        })
      })
      console.log({response, ok: response.ok})

      if(!response.ok){
        console.log('**********')
          return res.status(404).json({message: 'Something went wrong'})
      }

      const _data = await response.json()
      console.log(JSON.stringify(_data))
      */

    res.status(200).json({name: 'John Doe'})
}
