type MessageType = 'success' | 'error'

type MessageContextType = { 
  showMessage: ShowMessageType
  errorMessage: string 
  successMessage: string
}

type ShowMessageType = (messageType: MessageType, message: string) => void
