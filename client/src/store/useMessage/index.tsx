import React, { createContext, useContext, useState } from 'react'

const initContextValue: MessageContextType = {
  showMessage: () => {},
  errorMessage: '',
  successMessage: ''
}

const MessageContext = createContext<MessageContextType>(initContextValue)
const useMessage = () => useContext(MessageContext)

export const MessageProvider: React.FC<WithChildren> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const showMessage: ShowMessageType = (messageType, message) => {
    const setMessage = messageType === 'error' 
    ? setErrorMessage 
    : setSuccessMessage

    setMessage(message)
    setTimeout(() => setMessage(''), 5000)
  }

  const ctx = { showMessage, errorMessage, successMessage }

  return (
    <MessageContext.Provider value={ctx}>
      {children}
    </MessageContext.Provider>
  )
}

export default useMessage
