import React, {useEffect, useRef} from 'react'
import {useConversationStore} from '@/stores/conversation';
import {Loading} from './loading';
import {MicrophoneIcon, SendIcon} from './icons';
import {toast} from 'sonner';

export const Prompt = () => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const generate = useConversationStore(state => state.generateComponent)
    const streaming = useConversationStore(state => state.streaming)
    const error = useConversationStore(state => state.error)

    useEffect(() => {
        const el = textAreaRef.current
        if (el) {
            el.focus()
        }
    }, [])
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        await generate(textAreaRef.current?.value.trim() ?? '')
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e).then()
        }
    }

    const handleChange = () => {
        const el = textAreaRef.current
        if (el) {
            el.style.height = '0px'
            const scrollHeight = el.scrollHeight
            el.style.height = `${scrollHeight}px`
        }
    }

    function handleSpeechToText() {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition

        if (!SpeechRecognition) {
            toast.error('Speech Recognition is not supported by your browser')
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const area = textAreaRef.current!
        area.value = ''


        const recognition = new SpeechRecognition()
        recognition.interimResults = true
        recognition.lang = 'es-ES'

        recognition.addEventListener('result', (e) => {
            area.value = Array.from(e.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('')
        })

        recognition.addEventListener('end', handleSubmit)

        recognition.start()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="relative"> 
                <textarea
                    onKeyDown={handleKeyDown}
                    ref={textAreaRef}
                    autoFocus
                    disabled={streaming}
                    onChange={handleChange}
                    id="prompt"
                    rows={1}
                    name="prompt"
                    className={`resize-none pr-10 ${
                        streaming ? 'opacity-40 pointer-events-none' : ''
                    } placeholder-white/30 rounded-2xl
                       block w-full text-md px-6 
                       text-xl py-4 border border-zinc-600
                       bg-white/5 backdrop-blur-3xl sm:text-md 
                       shadow-lg text-white outline-none overflow-hidden 
                       transition ring-white/40 focus:ring-2`}

                    placeholder="Write here you component description..."
                />
                <div className="absolute right-4 top-0 flex justify-center h-full items-center">
                    {streaming ? <Loading/> : (
                        <div className="flex items-center gap-2">
                            <button className="transition-all hover:scale-125" type="button"
                                    onClick={handleSpeechToText}>
                                <MicrophoneIcon/>
                            </button>
                            <button className="hover:scale-125 transition-all" type="submit">
                                <SendIcon/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </form>

    )
}  