import { ReactIcon, VueIcon, SvelteIcon, JavaScriptIcon } from './icons'
import { Select } from './Select'
import {useConversationStore} from '@/stores/conversation';

const FRAMEWORKS = [
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

    const selected = FRAMEWORKS.find((f) => f.value === framework)

    return (
        <Select
            disabled={streaming}
            list={FRAMEWORKS}
            label='Framework:'
            value={framework}
            update={setFramework}
            selected={selected}
        />
    )
}