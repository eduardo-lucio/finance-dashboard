type TransactionType = "income" | "expense"
type ISODateString = string


export type Transaction = {
    id: string,
    description: string, 
    value: number,
    type: TransactionType,
    category: string, 
    dataTransaction: ISODateString,
    dataCreate: ISODateString
}