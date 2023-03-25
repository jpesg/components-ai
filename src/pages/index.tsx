import {Blob} from '@/components/blobs'
import { Prompt } from '@/components/prompt'
import Head from 'next/head'

import {Preview} from '@/components/preview';
import { SelectFramework } from '@/components/select.framework';
import {SelectLanguages} from '@/components/select.language';
import {Footer} from '@/components/footer';
//import { Inter } from 'next/font/google'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <>
          <Head>
              <title>components-ai.app</title>
              <meta name="description" content="Generated ui components with AI"/>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <link rel="icon" href="/favicon.ico"/>
          </Head>
          <main className={'px-10 py-24 relative bg-black min-h-screen w-screen flex flex-col gap-4'}>
              <h1 className="mt-2 bg-gradient-to-br from-white to-slate-10 bg-clip-text text-transparent text-[35px] leading-[42px] sm:text-6xl tracking-[-0.64px] sm:leading-[68px] sm:tracking-[-0.896px] font-bold mb-12 animate-delay-200 animate-duration-1000 animate-fadeIn text-center">
              <span className="inline-block max-w-[700px] align-top">
                Genera tus{' '}
                  <span className="bg-clip-text bg-gradient-to-b from-purple-200 via-purple-400 to-purple-800">
                  componentes
                </span>
                <br/>
                con{' '}
                  <span className="relative bg-clip-text bg-gradient-to-b from-purple-200 via-purple-400 to-purple-800">
                  <Blob className="absolute right-0 bg-purple-500 -top-[200%]"/>
                  Inteligencia Artificial
                </span>
              </span>
              </h1>
              <section className={'flex  flex-wrap gap-4 justify-evenly '}>
                  <SelectFramework/>
                  <SelectLanguages/>
              </section>

              <section className="flex h-full w-full items-center">
                  <div className="w-full">
                      <Prompt/>
                      <Preview/>
                  </div>
              </section>

              <div className={'mt-5'}/>
             <Footer/>
          </main>
      </>
  )
}
