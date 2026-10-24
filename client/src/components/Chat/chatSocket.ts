import io from 'socket.io-client'
import getUserId from './getUserId'

const namespace = 'chat'
const userId = getUserId()

// undefined aligns the url with the existing server connection 
const url = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:8002/${namespace}?id=${userId}`

const socketConfig = {
  path: '/',
  autoConnect: false
}

const chatSocket = io(url, socketConfig)

type Connect = (setIsSocketConnected: StateSetter<boolean>) => () => void
export const connect: Connect = setIsSocketConnected => () => {
  console.log('chat socket connected', chatSocket.id)
  setIsSocketConnected(true)
}

type Disconnect = (setIsConnected: StateSetter<boolean>) => () => void
export const disconnect: Disconnect = setIsConnected => () => {
  console.log('chat socket disconnected', chatSocket.id)
  setIsConnected(false)
}

type EmitChatMessage = ({ userId, message }: { userId?: string, message: string }) => void
export const emitChatMessage: EmitChatMessage = ({ userId, message }) => {
  chatSocket.emit('chat-message', { userId, message })
}

type UpdateMessages = (setChatMessages: StateSetter<string[]>) => 
  ({ messages }: { messages: string[] }) => void
export const updateMessages: UpdateMessages = setChatMessages => ({ messages }) => {
  setChatMessages(messages)
}

type MemberConnected = (setNumClients: StateSetter<number>) => 
  ({ userId, numClients }: { userId: string, numClients: number }) => void
export const memberConnected: MemberConnected = setNumClients => ({ userId, numClients }) => {
  console.log(userId, 'connected')
  setNumClients(numClients)
}

export default chatSocket