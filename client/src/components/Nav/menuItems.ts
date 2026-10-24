export interface MenuItem {
  route: string, 
  label: string 
}

const menuItems: MenuItem[] = [
  { route: '/', label: 'Home' },
  { route: '/dashboard', label: 'Dashboard' },
  { route: '/chat', label: 'Chat' }
]

export default menuItems