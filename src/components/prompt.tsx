import React, {useEffect, useRef, useState} from 'react'
import {useConversationStore} from '@/stores/conversation';

export const Prompt = () => {
    const [prompt, setPrompt] = useState<string>('')
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const generate = useConversationStore(state => state.generateComponent)
    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log('############', prompt)
        try {
            await generate(prompt)
        } catch (e) {
            console.log({e}, '~~~~~~~~~~~~~~~~')
        }

        /*const response = await fetch(`/api/generate?prompt=${prompt}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })*/


    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="m-6"> 
                <textarea
                    ref={textAreaRef}
                    autoFocus
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    id="prompt"
                    rows={1}
                    name="prompt"
                    className="block 
                    w-full text-white px-4 py-2 bg-zinc-900/50 rounded-lg border
                    border-gray-600 backdrop-blur-3xl
                    sm:text-md shadow-lg h-[48px] outline-none
                    "
                    placeholder="Write here you component description..."
                />
            </div>
            <button type="submit" className="text-white">Enviar</button>
        </form>

    )
}  