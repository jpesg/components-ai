import '@/styles/globals.css'
import { Toaster } from 'sonner'
import type {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
    return <>
        <Toaster position="bottom-right"/>
        <Component {...pageProps} />
    </>
}
