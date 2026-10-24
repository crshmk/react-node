import React from 'react'

type SideEffectType = () => void 

type EventHandlerType<T> = (e: React.KeyboardEvent<T>) => void 

type OnKeyDownEnter = <T extends HTMLElement>(cb: SideEffectType) => EventHandlerType<T>

/**
 * watch for enter key on a focused element 
 * 
 * @param cb side effect 
 * 
 * @example 
 *   <span
 *     tabIndex={0}
 *     onKeyPress={onKeyPressEnter(cb)}
 */
const onKeyDownEnter: OnKeyDownEnter = cb => e => {
  if (e.key === 'Enter') {
    cb()
  }
}

export default onKeyDownEnter
