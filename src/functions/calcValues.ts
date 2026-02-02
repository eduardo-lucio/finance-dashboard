import type {TransactionType} from "../types/transaction.ts";

const date = new Date()
const month = date.getMonth()
const year = date.getFullYear()
const rangeMonth = month === 0 ? 11 : month-1
const rangeYear = rangeMonth === 11 ? year-1 : year

export function totalMoney(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        if(item.type === "income"){
            total+=item.value
        }else{
            total-=item.value
        }
    })
    return total
}
export function lastMonthIncome(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        const dataTransaction = new Date(item.dataTransaction)
        const itemMonth = dataTransaction.getMonth()
        const itemYear = dataTransaction.getFullYear()
        if(itemMonth === rangeMonth && itemYear === rangeYear){
            if(item.type === "income"){
                total+=item.value
            }
        }
    })
    return total
}
export function monthIncome(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        const dataTransaction = new Date(item.dataTransaction)
        const itemMonth = dataTransaction.getMonth()
        const itemYear = dataTransaction.getFullYear()
        if(itemMonth === month && itemYear === year){
            if(item.type === "income"){
                total+=item.value
            }
        }
    })
    return total
}
export function lastMonthExpense(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        const dataTransaction = new Date(item.dataTransaction)
        const itemMonth = dataTransaction.getMonth()
        const itemYear = dataTransaction.getFullYear()
        if(itemMonth === rangeMonth && itemYear === rangeYear){
            if(item.type === "expense"){
                total+=item.value
            }
        }
    })
    return total
}
export function monthExpense(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        const dataTransaction = new Date(item.dataTransaction)
        const itemMonth = dataTransaction.getMonth()
        const itemYear = dataTransaction.getFullYear()
        if(month === itemMonth && year === itemYear){
            if(item.type === "expense"){
                total+=item.value
            }
        }
    })
    return total
}

export function monthBal(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        const dataTransaction = new Date(item.dataTransaction)
        const itemMonth = dataTransaction.getMonth()
        const itemYear = dataTransaction.getFullYear()
        if(month === itemMonth && year === itemYear){
            if(item.type === "expense"){
                total+=item.value
            }else{
                total-=item.value
            }
        }
    })
    return total
}

export function lastMonthBal(jsonStoredTransactions: TransactionType[]){
    let total = 0;
    jsonStoredTransactions.forEach(item=>{
        const dataTransaction = new Date(item.dataTransaction)
        const itemMonth = dataTransaction.getMonth()
        const itemYear = dataTransaction.getFullYear()
        if(itemMonth === rangeMonth && itemYear === rangeYear){
            if(item.type === "income"){
                total+=item.value
            }else{
                total-=item.value
            }
        }
    })
    return total
}