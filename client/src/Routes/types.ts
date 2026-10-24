export interface RouteInterface {
  path: string, 
  isProtected?: boolean, 
  Component: React.LazyExoticComponent<React.ComponentType<any>>
}