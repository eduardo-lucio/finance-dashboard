import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {Navigate, useNavigate} from "react-router-dom";


export function MainLogin(){
    const { isAuthenticated, login } = useAuth()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const [error, setError] = useState("")
    if (isAuthenticated) return <Navigate to="/dashboard" />
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(!form.email || !form.password){
            setError("Preencha todos os campos")
            return
        }

        if(!form.email.includes("@")){
            setError("Digite um email válido")
            return
        }

        try{
            login(form.email, form.password)
            navigate("/dashboard")
        }catch(error: unknown){
            setError((error as Error).message)
            return
        }
        setError("")
        console.log("dados válidos", form)
    }

    return (
        <div className={"flex w-full h-screen items-center justify-center bg-gray-700"}>
            <section className={"flex flex-col items-center justify-center w-md rounded-md bg-blue-50"}>
                <h1 className={"p-2 font-semibold text-2xl"}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={(e)=> setForm(prev => ({...prev, email: e.target.value}))} value={form.email} type="text"></input>
                    <input onChange={(e)=> setForm(prev => ({...prev, password: e.target.value}))} value={form.password} type="password"></input>
                    <p>{error}</p>
                    <button type="submit" className={"cursor-pointer"}>Entrar</button>
                </form>
            </section>
        </div>
    )
}