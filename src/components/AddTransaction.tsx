import {useTransactions} from "../contexts/TransactionsContext.tsx";
import {useState} from "react";
import type {TransactionType} from "../types/transaction.ts";

export function AddTransaction(){
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
                        <option>{name}</option>
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
        <div className={"w-full h-dvh bg-black/40"}>
            <form className={"flex"} onSubmit={handleSubmit}>
                <input value={form.description} onChange={(e)=> setForm(prev => ({...prev, description: e.target.value}))} type="text"></input>
                <input value={form.value === 0 ? "" : form.value} onChange={(e)=> setForm(prev => ({...prev, value: Number(e.target.value)}))} type="number"></input>
                <select value={form.type} onChange={(e)=> setForm(prev => ({...prev, type: e.target.value as "income" | "expense"}))} >
                    <option value="income">Receita</option>
                    <option value="expense">Gasto</option>
                </select>
                <select value={form.category} onChange={(e)=> setForm(prev => ({...prev, category: e.target.value}))}>
                    <option value="" selected disabled>Selecione uma categoria</option>
                    {renderOptions(form.type)}
                </select>
                <input type="date" value={form.dataTransaction} onChange={(e)=>setForm(prev => ({...prev, dataTransaction: e.target.value}))}></input>
                <p onClick={()=> console.log(form)}>{warn}</p>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}