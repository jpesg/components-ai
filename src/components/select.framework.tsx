import { ReactIcon, VueIcon, SvelteIcon, JavaScriptIcon } from './icons'
import {useConversationStore} from '@/stores/conversation';
import { Select, Element} from './select';
type ListElement = Element

const FRAMEWORKS: Array<ListElement> = [
    {
        name: 'Vanilla',
        icon: <JavaScriptIcon />,
        value: 'vanilla'
    },
    {
        name: 'React',
        icon: <ReactIcon />,
        value: 'react'
    },
    {
        name: 'Vue',
        icon: <VueIcon />,
        value: 'vue'
    },
    {
        name: 'Svelte',
        icon: <SvelteIcon />,
        value: 'svelte'
    }
]

export function SelectFramework() {
    const { framework, setFramework, streaming } = useConversationStore((state) => ({
        framework: state.framework,
        setFramework: state.setFramework,
        streaming: state.streaming
    }))
    


    const handleUpdate = (element: ListElement) => setFramework(element.value)
    const selected = FRAMEWORKS.find((f) => f.value === framework)
    
    return (
        <Select
            disabled={streaming}
            list={FRAMEWORKS}
            label='Framework:'            
            update={handleUpdate}
            selected={selected  ?? FRAMEWORKS[0]}
        />
    )
}