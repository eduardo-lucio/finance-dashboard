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
        <div
            className="flex w-dvw h-screen items-center justify-center"
            style={{ background: "radial-gradient(circle at center, #27272a 0%, #09090b 100%)" }}
        >
            <section className={"flex flex-col items-center justify-center w-sm rounded-md bg-[#181818] outline outline-[#3c4147]"}>
                <h1 className={"p-2 font-semibold text-2xl text-white"}>Login</h1>
                <form onSubmit={handleSubmit} className={"flex flex-col w-80/100"}>
                    <div className={"flex flex-col bg-[#202020] p-2 rounded-md focus-within:bg-[#393938] transition-colors duration-500 mb-3"}>
                        <label className={"text-[#aca9a3]"} htmlFor="email">Login</label><input className={" focus:outline-0 text-white"} id="email" placeholder={"seuemail@email.com"} onChange={(e)=> setForm(prev => ({...prev, email: e.target.value}))} value={form.email} type="text"></input>
                    </div>
                    <div className={"flex flex-col bg-[#202020] p-2 rounded-md focus-within:bg-[#393938] transition-colors duration-500 mb-3"}>
                        <label className={"text-[#aca9a3]"} htmlFor="password">Password:</label><input className={"focus:outline-0 text-white"} id="password" placeholder={"********"} onChange={(e)=> setForm(prev => ({...prev, password: e.target.value}))} value={form.password} type="password"></input>
                    </div>
                    <p className={"text-[#aca9a3]"}>{error}</p>
                    <button type="submit" className={"cursor-pointer bg-[#d3d3d3] rounded-md p-1 mb-3"}>Entrar</button>
                </form>
            </section>
        </div>
    )
}