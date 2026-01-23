export type User = {
    name: string,
    email: string,
    id: string
}
export type AuthContextData = {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => void
    logout: () => void
}