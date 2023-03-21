import {create} from 'zustand'
import {get as getHttp} from '@/modules/request';

interface Store {
    code: null | string
    template: string
    framework: string
    isReplying: boolean
    streaming: boolean
    setFramework: (framework: string) => void
    setTemplate: (template: string) => void
    generateComponent: (prompt: string) => Promise<void>
}

export const useConversationStore = create<Store>((set, get) => ({
    code: null,
    streaming: false,
    framework: 'vanilla',//angular, vue, react
    template: 'javascript', //typescript|js
    isReplying: false,
    setFramework: (framework: string) => set({framework}),
    setTemplate: (template: string) => set({template}),
    generateComponent: async (prompt) => {
        const {template, framework} = get(state => state)

        set({isReplying: true})
        const url = `/api/generate?prompt=${prompt}&language=${template}&framework=${framework}`
        const {data} = await getHttp<undefined, { data: string }>(url)
        set({code: data, isReplying: false})
    }


}))