import {useConversationStore} from '@/stores/conversation';

export const Footer = () => {
    const code = useConversationStore(state => state.code)
    return (
        <footer
            className={`bottom-0 left-0 right-0 block pb-20 mt-10 text-center animate-delay-1000 opacity-60 text-white/80 ${
                code ? 'animate-fadeOut' : 'animate-delay-500 animate-fadeIn'
            }`}
        >
            Proyecto realizado por{' '}
            <a
                className="text-white hover:underline"
                href="#"
            >
                @jpesgil
            </a>{' '}
            &bull;{' '}
            <a
                className="text-white hover:underline"
                href="#"
            >
                RS
            </a>
        </footer>
    )
}