import {amethyst} from '@codesandbox/sandpack-themes';
import {Sandpack, SandpackPredefinedTemplate, SandpackFiles} from '@codesandbox/sandpack-react';
import {useConversationStore} from '@/stores/conversation';

const generatePlaygroundCode = ({framework, code}: { framework: string, code: string }) => {
    if (framework === 'vanilla') {
        return `document.getElementById("app").innerHTML=\`${code.trim()}\``
    }
    return code
}
export const Preview = () => {
    const {code, template, framework} = useConversationStore(state => state)
    if (!code) {
        return (<h1>no code</h1>)
    }
    const playgroundCode = generatePlaygroundCode({code, framework})
    console.log({playgroundCode})
    const files: SandpackFiles = {
        '/index.js': {
            code: playgroundCode
        }
    }
    return (<Sandpack
        options={{
            wrapContent: true
        }}
        theme={amethyst}
        template={framework}
        files={files}
    />)
}