import { RequestError } from '@/domain/error'

export const get = async <TData, TResponse>(url: string, body?: TData,  headers?: Record<string, string>): Promise<TResponse> => {
    const data = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers ?? {}
        }
    }
    if(body) {
        data['body'] = JSON.stringify(body)
    }
    const response = await fetch(url, data)
        
        
  const json = await response.json()        
  if(!response.ok){    
    throw new RequestError(json?.error?.message ?? 'Internal error')  
  }  
  return json as TResponse
}
export const post = async <TData, TResponse>(url: string, body?: TData,  headers?: Record<string, string>): Promise<TResponse> => {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers ?? {}
        }
    }
    if(body) {
        data['body'] = JSON.stringify(body)
    }
    const response = await fetch(url, data)


    const json = await response.json()
    if(!response.ok){
        throw new RequestError(json?.error?.message ?? 'Internal error')
    }
    return json as TResponse
}