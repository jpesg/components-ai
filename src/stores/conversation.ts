import {create} from 'zustand'
import {get} from '@/modules/request';
interface Store {
    response: null | string
    isReplying: boolean
    generateComponent: (prompt: string) => Promise<void>
}
export const useConversationStore = create<Store>(set => ({
    response: null,
    isReplying: false,
    generateComponent: async (prompt) => {
        set({isReplying: true})
        const url = `/api/generate?prompt=${prompt}`
        const {message} = await get<undefined, {message: string}>(url)
        set({response: message, isReplying: false})
    }


}))