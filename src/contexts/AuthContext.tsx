import {createContext, useContext, useState} from "react"
import type {User, AuthContextData} from "../types/auth.ts";

type AuthProviderProps = {
    children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
)

export function useAuth(){
    return useContext(AuthContext) // cria um hook para usar o contexto de maneira mais limpa
}
export function AuthProvider({ children }: AuthProviderProps){
        const [user, setUser] = useState<User | null>(()=>{
            const userData = localStorage.getItem("user")
            return userData ? JSON.parse(userData) : null
        })

    const isAuthenticated = !!user // !! força o valor a se tornar um booleano, logo se existe usuario é true se for null é false
    function login(email: string, password: string) {
        if (email === "teste@email.com" && password === "123") {
            const userData: User = {
                id: crypto.randomUUID(),
                name: "Usuário Teste",
                email,
            }

            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
            console.log("Dados válidos")
            return
        }
        throw new Error("Credenciais inválidas")
    }

    function logout() {
        setUser(null)
        localStorage.removeItem("user")
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    )}

