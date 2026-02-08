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
import {CalcPercent} from "../components/CalcPercent.tsx";
import {useTransactions} from "../contexts/TransactionsContext.tsx";
import {TransactionsTable} from "../components/TransactionsTable.tsx";


export function Dashboard(){
    const [isOpen, setIsOpen] = useState(false)
    const {transactions} = useTransactions()
    const outline = "outline outline-[#3c4147]"
    const cardStyle = "bg-[#393938] rounded-md p-4"
    const totalMoneyV = totalMoney(transactions)
    const monthIncomeV = monthIncome(transactions)
    const lastMonthIncomeV = lastMonthIncome(transactions)
    const monthExpenseV = monthExpense(transactions)
    const lastMonthExpenseV = lastMonthExpense(transactions)
    const monthBalV  = monthBal(transactions)
    const lastMonthBalV = lastMonthBal(transactions)
    console.log(transactions)
    return(
        <div className={"h-dvh bg-[#202020]"}>
            <div className={"p-2 text-white bg-[#202020] flex outline outline-[#3c4147] rounded-md gap-5 justify-around w-full"}>
                <div className={`${cardStyle}`}>
                    <h2>Patrimônio total: <span>R${totalMoneyV}</span></h2>
                </div>
                <div className={`${cardStyle}`}>
                    <h2>Receita mensal: <span>R${monthIncomeV} <CalcPercent expense={false} currentValue={monthIncomeV} lastMonthValue={lastMonthIncomeV} />{}</span></h2>
                    <h3>Receita do mês anterior: <span>R${lastMonthIncomeV}</span></h3>
                </div>
                <div className={`${cardStyle}`}>
                    <h2>Despesa mensal: <span>R${monthExpenseV} <CalcPercent expense={true} currentValue={monthExpenseV} lastMonthValue={lastMonthExpenseV}/></span></h2>
                    <h3>Despesa do mês anterior: <span>R${lastMonthExpenseV}</span></h3>
                </div>
                <div className={`${cardStyle}`}>
                    <h2>Balanço mensal: <span>R${monthBalV} <CalcPercent expense={false} currentValue={monthBalV} lastMonthValue={lastMonthBalV} /></span></h2>
                    <h3>Balanço do mês anterior: <span>R${lastMonthBalV}</span></h3>
                </div>
            </div>
            <button className={`${outline} p-3 text-white bg-[#202020] rounded-md cursor-pointer`} onClick={()=> setIsOpen(true)}>Adicionar lançamento</button>
            <div>
                <h2>Histórico de lançamentos</h2>
                <TransactionsTable></TransactionsTable>
            </div>
            {isOpen && <AddTransaction setIsOpen={setIsOpen}/>}
        </div>
    )
}