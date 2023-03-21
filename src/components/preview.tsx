import { amethyst } from '@codesandbox/sandpack-themes';
import {Sandpack, SandpackPredefinedTemplate, SandpackFiles} from '@codesandbox/sandpack-react';

import {FC} from 'react'; 

export const Preview: FC<{ content: string, template: SandpackPredefinedTemplate }> = ({content, template}) => {
    const files: SandpackFiles = {
        '/App.js': {
            code:  `export default function App() {
                return (<h1>Hello Sandpack</h1>)
                }`
        }
    }
    return (<Sandpack
        theme={amethyst}
        template={template}
        files={files}
    />)
}