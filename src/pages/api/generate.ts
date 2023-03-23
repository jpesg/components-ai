import {ResponseOpenAi, OpenaiRequest, messageCreator} from '@/domain/openai'
import {post} from '@/modules/request'
import type {NextApiRequest, NextApiResponse} from 'next'

const {OPENAI_API_KEY} = process.env
const API_URL = 'https://api.openai.com/v1/chat/completions'

type Response = { data: string } | {error: string}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    const {prompt, language, framework} = req.query as { prompt: string, language: string, framework: string }
    let promptToSend = prompt

    if (framework !== 'vanilla') {
        promptToSend = `${prompt}. Para ${framework}.`
    }

    if (language !== 'javascript') {
        promptToSend = `${prompt}. Con ${language}.`
    }
/* without streaming
    const response = await post<OpenaiRequest, ResponseOpenAi>(API_URL, {
        model: 'gpt-3.5-turbo',
        messages: messageCreator(promptToSend),
        stream: true,
        stop: ['\ninfo:']
    }, {Authorization: `Bearer ${OPENAI_API_KEY}`})

    
    

    const {content} = response.choices[0].message
    console.log({content})
    return res.json({data: content})

*/


const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: messageCreator(promptToSend),
    stream: true, // esto luego lo pondremos en true
    temperature: 0.0,
    stop: ['\ninfo:']
  })
})
     
  if (!response.ok) {
    console.error(response.statusText)
    return res.status(500).json({ error: 'Something went wrong' })
  }

      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Encoding': 'none',
        'Content-Type': 'text/event-stream; charset=utf-8'
      })
      if(!response?.body){
        console.log('########')
        return res.status(500).json({ error: 'Something went wrong' })
      }
      const reader = response.body?.getReader()
      if(!reader){
        console.log('########')
        return res.status(500).json({ error: 'Something went wrong' })
      }
      const decoder = new TextDecoder('utf-8')
    
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          return res.end('data: [DONE]\n\n') // TODO: Devolveremos otra cosa
        }
    
        const chunk = decoder.decode(value)
        const transformedChunk = chunk
          .split('\n')
          .filter(Boolean)
          .map((line) => line.replace('data: ', '').trim())
    
        for (const data of transformedChunk) {
          if (data === '[DONE]') {
            return res.end('data: [DONE]\n\n') // TODO: Devolveremos otra cosa
          }
    
          try {
            const json = JSON.parse(data)
            const { content } = json.choices?.[0]?.delta
            content && res.write(`data: ${JSON.stringify(content)}\n\n`)
            // res.write(`data: ${JSON.stringify({ content })}\n\n`)
          } catch (error) {
            console.error(error)
          }
        }
      }

      


}
// - TypeError: response.body?.getReader is not a function