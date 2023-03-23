import React, {useEffect, useRef, useState} from 'react'
import {useConversationStore} from '@/stores/conversation';
import { Loading } from './loading';
import { SendIcon } from './icons';

export const Prompt = () => {    
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const generate = useConversationStore(state => state.generateComponent)
    const streaming = useConversationStore(state => state.streaming)

    useEffect(() => {
        textAreaRef.current?.focus()
    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement> |  React.KeyboardEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        try {
            await generate(textAreaRef.current?.value.trim() ?? '')
        } catch (e) {
            console.log({e}, '~~~~~~~~~~~~~~~~')
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {        
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault()
            handleSubmit(e)
        }
    }
    const handleChange = () => {
        const el = textAreaRef.current
        if(el){
            el.style.height = '0px'
            const scrollHeigh = el.scrollHeight
            console.log({scrollHeigh})
            el.style.height = `${scrollHeigh}px`
        }       

    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="relative"> 
                <textarea
                    onKeyDown={handleKeyDown}
                    ref={textAreaRef}
                    autoFocus
                    disabled={streaming}
                    //value={prompt}
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
                <div className='absolute right-4 top-0 flex justify-center h-full items-center'>
                    {streaming ? <Loading/> : (
                        <button className='hover:scale-125 transitiona-all' type="submit">
                            <SendIcon/>
                        </button>
                    )}
                </div>
            </div>
        </form>

    )
}  