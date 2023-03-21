import { Blobs } from '@/components/blobs'
import { Prompt } from '@/components/prompt'
import Head from 'next/head'
import {useConversationStore} from '@/stores/conversation';
//import { Inter } from 'next/font/google'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const content = useConversationStore(state => state.content)

  return (
    <>
      <Head>
        <title>components-ai.app</title>
        <meta name="description" content="Generated ui components with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>   
      <main className={'px-10 py-24 relative bg-black min-h-screen w-screen'}>
        <Blobs/>     
        <h1 className='bg-gradient-to-r from-indigo-300 to-purple-400 text-6xl font-bold text-transparent bg-clip-text'>
          Generate Components with AI
          </h1>
        <div className="flex h-full w-full items-center">             
          <div className='w-full'>
            <Prompt/>
          </div>
        </div>
      </main>
    </>
  )
}
