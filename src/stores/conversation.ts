import {create} from 'zustand'
//import {get as getHttp} from '@/modules/request';

interface Store {
    code: null | string
    template: string
    error: null | string
    framework: string
    isReplying: boolean
    streaming: boolean
    setFramework: (framework: string) => void
    setTemplate: (template: string) => void
    generateComponent: (prompt: string) => Promise<void>
}

export const useConversationStore = create<Store>((set, get) => ({
        code: null,
        error: null,
        streaming: false,
        framework: 'vanilla',//angular, vue, react
        template: 'javascript', //typescript|js
        isReplying: false,
        setFramework: (framework: string) => set({code: null, framework}),
        setTemplate: (template: string) => set({template}),
        generateComponent: async (prompt: string) => {
            const {template, framework} = get(state => state)

            set({streaming: true, error: null})
            const url = `/api/generate?prompt=${prompt}&language=${template}&framework=${framework}`
            /*const {data} = await getHttp<undefined, { data: string }>(url)
            */
            //with streaming
            const eventSource = new EventSource(url)
            let code = ''

            eventSource.onerror = () => {
                eventSource.close()
                set(() => ({streaming: false, error: 'Something went wrong'}))
            }

            eventSource.onmessage = (event) => {
                const {data} = event

                if (data === '[DONE]') {
                    set(() => ({streaming: false}))
                    eventSource.close()
                    return
                }

                code += JSON.parse(data)
                set(() => ({code}))
            }
        }

    }
))