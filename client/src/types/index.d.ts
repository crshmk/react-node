declare module '*.jpeg' {
  const value: string
  export default value
}

declare module '*.jpg' {
  const value: string
  export default value
}

declare module '*.png' {
  const value: string
  export default value
}

declare module '*.css' {
  const value: string
  export default value
}

type CurriedFunction2<A, B, R> = {
  (a: A, b: B): R
  (a: A): (b: B) => R
}

type CurriedFunction3<A, B, C, R> = {
  (a: A, b: B, c: C): R
  (a: A, b: B): (c: C) => R
  (a: A): (b: B) => (c: C) => R
}

type CurriedFunction4<A, B, C, D, R> = {
  (a: A, b: B, c: C, d: D): R
  (a: A, b: B, c: C): (d: D) => R
  (a: A, b: B): (c: C, d: D) => R
  (a: A): (b: B) => (c: C) => (d: D) => R
}

type Empty<T> = 
  T extends Array<infer U> ? [] : 
  T extends object ? Record<string, never> : 
  T extends string ? '' : 
  never

type KeyboardEventHandler<T> = (e: React.KeyboardEvent<HTMLElement>) => void

/**
 * indicates an object is either the full, nested object or an empty object
 * 
 * @example 
 *   const [user, setUser] = useState<MaybeEmpty<User>>({})
 */
type MaybeEmpty<T> = T | Empty<T>

type OnChange = (e: ChangeEvent<HTMLInputElement>) => void

type OnClickButton = React.MouseEventHandler<HTMLButtonElement>

type OneOrMoreProps<Type> = {
  [Key in keyof Type]: Required<Pick<Type, Key>> & Partial<Omit<Type, Key>>
}[keyof Type]

type OnFocus = React.FocusEventHandler<HTMLInputElement>

type OnType = (e: React.ChangeEvent<HTMLInputElement>) => void

type Primitive = string | number | boolean 

/**
 * @example 
 *   type TabsContextType = {
 *     activeTabIndex: number 
 *     setActiveTabIndex: StateSetter<number>
 */ 
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

/**
 * @example 
 *   React.FC<WithChildren<PropTypes>>
 *   React.FC<WithChildren>
 */ 
type WithChildren<T = {}> = T & { children?: React.ReactNode }
