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
    const outline = "outline outline-[#3c4147]"
    const cardStyle = "bg-[#393938] rounded-md p-4"
    return(
        <div>
            <button className={`${outline} p-3 text-white bg-[#202020] rounded-md `} onClick={()=> setIsOpen(true)}>Adicionar lançamento</button>
            <div className={"p-2 text-white bg-[#202020] flex outline outline-[#3c4147] rounded-md gap-5 justify-around w-full"}>
                <div className={`${cardStyle}`}>
                    <h2>Patrimônio total: <span>R${totalMoney(jsonStoredTransactions)}</span></h2>
                </div>
                <div className={`${cardStyle}`}>
                    <h2>Receita mensal: <span>R${monthIncome(jsonStoredTransactions)}</span></h2>
                    <h3>Receita do mês anterior: <span>R${lastMonthIncome(jsonStoredTransactions)}</span></h3>
                </div>
                <div className={`${cardStyle}`}>
                    <h2>Despesa mensal: <span>R${monthExpense(jsonStoredTransactions)}</span></h2>
                    <h3>Despesa do mês anterior: <span>R${lastMonthExpense(jsonStoredTransactions)}</span></h3>
                </div>
                <div className={`${cardStyle}`}>
                    <h2>Balanço mensal: <span>R${monthBal(jsonStoredTransactions)}</span></h2>
                    <h3>Balanço do mês anterior: <span>R${lastMonthBal(jsonStoredTransactions)}</span></h3>
                </div>
            </div>

            {isOpen && <AddTransaction setIsOpen={setIsOpen}/>}
        </div>
    )
}