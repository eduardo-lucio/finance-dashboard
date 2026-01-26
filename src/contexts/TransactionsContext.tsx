import {createContext, useContext, useEffect, useState} from "react";
import type {TransactionType} from "../types/transaction.ts";
import {useAuth} from "./AuthContext.tsx";

type TransactionsContextProps = {
    children: React.ReactNode
}
type TransactionsContextData = {
    transactions: TransactionType[];
    createTransaction: (data: Omit<TransactionType, "id" | "dataCreate">) => void
}
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function useTransactions(){
    return useContext(TransactionsContext)
}
export function TransactionsProvider({ children }: TransactionsContextProps){
    const { user }  = useAuth()
    const [transactions, setTransactions] = useState<TransactionType[]>([])
    useEffect( ()=>{
        if(!user){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTransactions([])
            return
        }
        const storageKey = `transactions_${user.id}`
        const storedTransactions = localStorage.getItem(storageKey)

        if(storedTransactions){
            setTransactions(JSON.parse(storedTransactions))
        }else{
            setTransactions([])
        }
    }, [user])

    function createTransaction(data: Omit<TransactionType, "id" | "dataCreate">){
        if(!user) return
        const newTransaction = {
            ...data,
            id: crypto.randomUUID(),
            dataCreate: (new Date()).toISOString()
        }
        setTransactions(prev=>{
            const newT = [...prev, newTransaction]
            localStorage.setItem(`transactions_${user.id}`, JSON.stringify(newT))
            return newT
        })
    }
    return <TransactionsContext.Provider value={{transactions, createTransaction}}>
        {children}
    </TransactionsContext.Provider>
}