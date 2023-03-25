import { FC} from 'react'

export const Blob: FC<{className: string}> = ({className}) => {
    return (
        <div className={`absolute blur-3xl opacity-30 w-96 h-96  rounded-3xl ${className}`}>
        </div>
    )
}

export const Blobs = () => {
    return (
        <div className='relative'>
            <Blob className="bg-purple-600 -top-32 -left-32"/>
            <Blob className="bg-purple-600 top-full right-32"/>
            <Blob className="bg-purple-600 bottom-0 right-full -ml-24"/>
        </div>
    )
}