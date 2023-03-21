import {create} from 'zustand'
import {get} from '@/modules/request';
interface Store {
    content: null | string
    isReplying: boolean
    generateComponent: (prompt: string) => Promise<void>
}
export const useConversationStore = create<Store>(set => ({
    content: null,
    isReplying: false,
    generateComponent: async (prompt) => {
        set({isReplying: true})
        const url = `/api/generate?prompt=${prompt}`
        const {data} = await get<undefined, {data: string}>(url)
        set({content: data, isReplying: false})
    }


}))