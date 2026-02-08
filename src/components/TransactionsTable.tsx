import {useTransactions} from "../contexts/TransactionsContext.tsx";
import {
flexRender,
getCoreRowModel,
getFilteredRowModel,
useReactTable,
type ColumnFiltersState,
type FilterFn
} from "@tanstack/react-table";
import {useState} from "react";
import {RenderOptions} from "./RenderOptions.tsx";

export function TransactionsTable() {
    function formatCurrency(value: number) {
            return Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(value)
    }
    const numberFilter: FilterFn<any> = (row, columnId, filterValue) => {
        const value = row.getValue<number>(columnId)
        return String(value).includes(String(filterValue))
    }
    const [columnFilters, setColumnsFilters] = useState<ColumnFiltersState>([]);
    type typeFilterStats = {
        data: string,
        type: "income" | "expense" | "",
    }
    const [filterState, setFilterState] = useState<typeFilterStats>({
        data: "",
        type: ""
    })
    const {transactions} = useTransactions()
    const columns  = [
        {
            accessorKey: "description",
            header: "Titulo",
        },
        {
            accessorKey: "type",
            header: "Tipo",
        },
        {
            accessorKey: "category",
            header: "Categoria"
        },
        {
            accessorKey: "value",
            header: "Valor",
            filterFn: numberFilter,
            cell: (context) => {
                return formatCurrency(Number(context.getValue()))
            }
        },
        {
            accessorKey: "dataTransaction",
            header: "Data da transação"
        },
        {
            accessorKey: "dataCreate",
            header: "Data de criação"
        },
        {
            accessorKey: "id",
            header: "Id",
        }
    ]
    const table = useReactTable(
        {
            data: transactions,
            columns,
            state: {
                columnFilters,
            },
            getCoreRowModel: getCoreRowModel(),
            onColumnFiltersChange: setColumnsFilters,
            getFilteredRowModel: getFilteredRowModel(),
        },

    )
    return (
        <div>
            <input value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
            onChange={e=>
                table.getColumn("description")?.setFilterValue(e.target.value)} placeholder={"Procurar Descrição"}></input>
            <input type={"number"}
            onChange={e=> table.getColumn("value")?.setFilterValue(e.target.value ? Number(e.target.value) : undefined)}
            placeholder={"Procurar valor"}></input>
            <select value={filterState.type} onChange={e=> {table.getColumn("type")?.setFilterValue(e.target.value === "" ? undefined : e.target.value)
            setFilterState(prev=>({...prev, type:e.target.value as "income" | "expense" | ""}))}}>
                <option value={""}>Mostrar todos</option>
                <option value={"income"}>Receita</option>
                <option value={"expense"}>Despesa</option>
            </select>
            <input value={filterState.data} id={"dataFilter"} type={"date"} onChange={e => {
                setFilterState(prev => ({...prev, data: e.target.value}))
                table.getColumn("dataTransaction")?.setFilterValue(e.target.value)}
            }></input>
            <button onClick={()=> {setFilterState(prev=> ({...prev, data: ""}))
                table.getColumn("dataTransaction")?.setFilterValue(undefined)
            }}>Limpar data</button>
            <select onChange={e=> {table.getColumn("category")?.setFilterValue(e.target.value === "" ? undefined : <e className="target value"></e>)}}>
                <option value={""}>Mostrar todos</option>
                <RenderOptions option={filterState.type}></RenderOptions>
            </select>
            <input placeholder={"Procurar ID"} onChange={e=> {table.getColumn("id")?.setFilterValue(e.target.value)}}>

            </input>
            <table>
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell=> (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}