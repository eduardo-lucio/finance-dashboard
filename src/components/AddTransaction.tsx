import {useTransactions} from "../contexts/TransactionsContext.tsx";
import {useState} from "react";
import type {TransactionType} from "../types/transaction.ts";
import {X} from 'lucide-react'

export function AddTransaction({ setIsOpen }:{setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}){
    const {createTransaction} = useTransactions()
    const categories = {
        income: [
            "Salário",
            "Freelance",
            "Investimentos",
            "Outros"
        ],
        expense: [
            "Alimentação",
            "Moradia",
            "Transporte",
            "Lazer",
            "Saúde",
            "Educação",
            "Contas",
            "Outros"
        ]
    }
    function renderOptions(option: "income" | "expense"){
        if(option === "income" || option === "expense"){
            return categories[option].map(name=>{
                    return(
                        <option key={name}>{name}</option>
                    )
                }
            )
        }
    }
    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(!form.description){
            setWarn("Insira uma descrição")
            return
        }
        if(!form.value){
            setWarn("Insira um valor")
            return
        }
        if(!form.category){
            setWarn("Escolha uma categoria")
            return
        }
        if(!form.dataTransaction){
            setWarn("Insira uma data")
            return
        }
        setWarn("")

        createTransaction(form)
        setForm(clearFormData)
        setIsOpen(false)
    }
    const [warn, setWarn] = useState<string>("")
    const clearFormData : Omit<TransactionType, "dataCreate" | "id"> = {
        description: "",
        value: 0,
        type: "income",
        category: "",
        dataTransaction: new Date().toISOString().split('T')[0]
    }
    const [form, setForm] = useState(clearFormData)
    return(
        <div className={"fixed z-50 inset-0 bg-black/50 flex items-center justify-center"}>
            <div className={"p-2 outline-1 outline-[#3c4147] mb-2 w-md flex flex-col rounded-md bg-[#181818] text-[#aca9a3]"}>
                <div className={"flex justify-between p-2"}>
                    <h1 className={"text-white text-[1.25rem]"}>Adicionar lançamento</h1>
                    <span onClick={()=> setIsOpen(false)} className={"transition-all duration-1000 cursor-pointer"}><X/></span>
                </div>
                <form className={""} onSubmit={handleSubmit}>
                    <input className={"focus:ring-2 focus:ring-[#202020] rounded-md p-2 w-full outline-0 mb-2 transition-all 200ms"} id={"description"} placeholder={"Descrição"} value={form.description} onChange={(e)=> setForm(prev => ({...prev, description: e.target.value}))} type="text"></input>
                    <div className={"select-none p-2 rounded-md bg-[#202020] flex gap-2 mb-2"}>
                        <button className={`flex-1 p-0.5 rounded-md ${form.type === "income" ? "bg-[#393938]" : ""} cursor-pointer transition-colors duration-200`} type={"button"} onClick={()=> setForm(prev => ({...prev, type: "income", category: ""}))}>Receita</button>
                        <button className={`flex-1 p-0.5 rounded-md ${form.type === "expense" ? "bg-[#393938]" : ""} cursor-pointer transition-colors duration-200`} type={"button"} onClick={()=> setForm(prev => ({...prev, type: "expense", category: ""}))}>Gasto</button>
                    </div>
                    <div className={"mb-2 flex gap-2"}>
                        <select className={"flex-1 outline-0 cursor-pointer"} value={form.category} onChange={(e)=> setForm(prev => ({...prev, category: e.target.value}))}>
                            <option value="" disabled>Selecione uma categoria</option>
                            {renderOptions(form.type)}
                        </select>
                        <label htmlFor={"value"}>R$</label><input className={"min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-[#202020] rounded-md flex-1 outline-0"} min={0} id={"value"} placeholder={"Valor"} value={form.value === 0 ? "" : form.value} onChange={(e)=> setForm(prev => ({...prev, value: Number(e.target.value)}))} type="number"></input>
                    </div>
                    <input className={"focus:ring-2 focus:ring-[#202020] rounded-md outline-0 cursor-pointer p-1 w-full mb-2 scheme-dark"} type="date" value={form.dataTransaction} onChange={(e)=>setForm(prev => ({...prev, dataTransaction: e.target.value}))}></input>
                    <p className={"m-1"}>{warn}</p>
                    <button type="submit" className={"cursor-pointer w-full mb-3 bg-[#202020] rounded-md p-1 hover:bg-[#393938] transition-colors duration-200"}>Concluir</button>
                </form>
            </div>
        </div>
    )
}