import {JavaScriptIcon, TypeScriptIcon} from './icons'
import {useConversationStore} from '@/stores/conversation';
import { Select, Element} from './select';
type ListElement = Element

const LANGUAGES: Array<ListElement> = [
    {
        name: 'JavaScript',
        icon: <JavaScriptIcon />,
        value: 'javascript'
    },
    {
        name: 'TypeScript',
        icon: <TypeScriptIcon />,
        value: 'typescript'
    }
]


export function SelectLanguages() {
    const { template, setTemplate, streaming } = useConversationStore((state) => ({
        template: state.template,
        setTemplate: state.setTemplate,
        streaming: state.streaming
    }))
    


    const handleUpdate = (element: ListElement) => setTemplate(element.value)
    const selected = LANGUAGES.find((f) => f.value === template)
    
    return (
        <Select
            disabled={streaming}
            list={LANGUAGES}
            label='Language:'
            update={handleUpdate}
            selected={selected  ?? LANGUAGES[0]}
        />
    )
}