type Role = 'user' | 'system' | 'assistant'

interface Choice {
    message: {
        role: Role
        content: string
    }
}

export interface ResponseOpenAi {
    mode: string
    usage: {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
    }
    choices: Array<Choice>
}

interface Message {
    role: Role
    content: string
}

export interface OpenaiRequest {
    model: string
    messages: Message[],
    stream: boolean
}


export const messageCreator = (prompt: string): Array<Message> => {
    const defaultMessages: Array<Message> = [
        {
            role: 'system',
            content:
                'Asume que eres developer y estás generando código para ser usado en producción. Sólo genera el código sin explicaciones. Por defecto, usa HTML y CSS si no se te indica lo contrario.'
        },
        {role: 'user', content: 'Crea un botón azul.'},
        {
            role: 'assistant',
            content:
                '<button style="background: blue; color: white;">Button</button>\ninfo:Botón con sólo HTML.'
        },
        {
            role: 'user',
            content:
                'Crea un botón que diga "Hola", que sea redondeado con fondo rojo. Con HTML, CSS y JS.'
        },
        {
            role: 'assistant',
            content:
                '<button style="background: red; color: white; border-radius: 9999px;">Hola</button>\ninfo:Botón con HTML y CSS en línea con estilos.'
        },
        {role: 'user', content: 'Crea un botón con Tailwind. Con HTML, CSS y JS'},
        {
            role: 'assistant',
            content:
                '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Button</button>\ninfo: Botón usando clases de Tailwind de color azul'
        },
        {
            role: 'user',
            content: 'Crea un botón con Tailwind que diga "Hola". Con HTML, CSS y JS.'
        },
        {
            role: 'assistant',
            content:
                '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Hola</button>\ninfo:Botón usando clases de Tailwind que dice Hola y es de color azul'
        },
        {
            role: 'user',
            content: 'Crea un botón que al hacer click aparezca un alert. Con React.'
        },
        {
            role: 'assistant',
            content: 'export default function Button(){return <button onClick={()=> alert(`Hola`)}></button>}\ninfo:Botón de React que al hacer click muestra un alert'
        }]

    return [...defaultMessages, {content: prompt, role: 'user'}]
}