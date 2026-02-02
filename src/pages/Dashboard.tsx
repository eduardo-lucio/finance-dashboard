import {AddTransaction} from "../components/AddTransaction.tsx";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.tsx";
import {
    lastMonthBal,
    lastMonthExpense,
    lastMonthIncome,
    monthBal,
    monthExpense,
    monthIncome,
    totalMoney
} from "../functions/calcValues.ts";


export function Dashboard(){
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth()
    const storageKey = `transactions_${user.id}`
    const storedTransactions = localStorage.getItem(storageKey)
    const jsonStoredTransactions = JSON.parse(storedTransactions as string)

    return(
        <div>
            <div>
                <h2>Patrimônio total</h2>
                <span>{totalMoney(jsonStoredTransactions)}</span>
            </div>
            <div>
                <h2>Receita mensal</h2>
                <span>{monthIncome(jsonStoredTransactions)}</span>
                <h3>Receita do mês anterior:</h3>
                <span>{lastMonthIncome(jsonStoredTransactions)}</span>
            </div>
            <div>
                <h2>Despesa mensal</h2>
                <span>{monthExpense(jsonStoredTransactions)}</span>
                <h3>Despesa do mês anterior:</h3>
                <span>{lastMonthExpense(jsonStoredTransactions)}</span>
            </div>
            <div>
                <h2>Balanço mensal</h2>
                <span>{monthBal(jsonStoredTransactions)}</span>
                <h3>Balanço do mês anterior:</h3>
                <span>{lastMonthBal(jsonStoredTransactions)}</span>
            </div>
            <button onClick={()=> setIsOpen(true)}>Adicionar lançamento</button>
            {isOpen && <AddTransaction setIsOpen={setIsOpen}/>}
        </div>
    )
}