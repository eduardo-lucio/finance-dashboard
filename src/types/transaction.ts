type TransactionIE = "income" | "expense"
type ISODateString = string

export type TransactionType = {
    id: string,
    description: string, 
    value: number,
    type: TransactionIE,
    category: string, 
    dataTransaction: ISODateString,
    dataCreate: ISODateString
}
