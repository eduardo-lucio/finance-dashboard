import {useTransactions} from "../contexts/TransactionsContext.tsx";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    type ColumnFiltersState,
    type FilterFn, type SortingState, getSortedRowModel
} from "@tanstack/react-table";
import {useState} from "react";
import {RenderOptions} from "./RenderOptions.tsx";
import {ChevronDown, ChevronRight, ChevronUp} from "lucide-react";

export function TransactionsTable() {
    const [sorting, setSorting] = useState<SortingState>([])
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
            meta:{
                width: "280px"
            }
        },
        {
            accessorKey: "type",
            header: "Tipo",
            meta:{
                width: "110px"
            }
        },
        {
            accessorKey: "category",
            header: "Categoria",
            meta:{
                width: "120px"
            }
        },
        {
            accessorKey: "value",
            header: "Valor",
            filterFn: numberFilter,
            meta: {
                width: "110px",
                align: "right",
            },
            cell: (context) => {
                return formatCurrency(Number(context.getValue()))
            }
        },
        {
            accessorKey: "dataTransaction",
            header: "Data da transação",
            meta: {
                width: "140px"
            }
        },
        {
            accessorKey: "dataCreate",
            header: "Data de criação",
            meta: {
                width: "140px"
            }
        },
        {
            accessorKey: "id",
            header: "Id",
            enableSorting: false,
            meta: {
                width: "200px"
            }
        }
    ]
    const table = useReactTable(
        {
            data: transactions,
            columns,
            state: {
                columnFilters, sorting
            },
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),
            getCoreRowModel: getCoreRowModel(),
            onColumnFiltersChange: setColumnsFilters,
            getFilteredRowModel: getFilteredRowModel(),
        },
    )
    function getIcon(arg: "asc" | "desc" | false){
        if(arg === "asc"){
            return <ChevronUp size={18}/>
        }
        if(arg === "desc"){
            return <ChevronDown size={18}/>
        }
        if(!arg){
            return <ChevronRight size={18}/>
        }
    }
    return (
        <div className={""}>
            <div className={"border-t border-r border-l border-[#3c4147] rounded-t-md m-auto w-95/100 p-2 bg-[#202020] text-[#aca9a3]"}>
                <h3 className={"select-none p-1 text-xl text-center font-bold"}>Filtros</h3>
                <div className={"flex flex-wrap justify-between"}>
                    <input value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
                           onChange={e=>
                               table.getColumn("description")?.setFilterValue(e.target.value)} placeholder={"Descrição"}>
                    </input>
                    <select value={filterState.type} onChange={e=> {table.getColumn("type")?.setFilterValue(e.target.value === "" ? undefined : e.target.value)
                        setFilterState(prev=>({...prev, type:e.target.value as "income" | "expense" | ""}))}}>
                        <option disabled value={""}>Selecione um Tipo</option>
                        <option value={""}>Mostrar todos</option>
                        <option value={"income"}>Receita</option>
                        <option value={"expense"}>Despesa</option>
                    </select>
                    <select className={"scheme-dark"} onChange={e=> {table.getColumn("category")?.setFilterValue(e.target.value === "" ? undefined : e.target.value)}}>
                        <option disabled value={""}>Selecione uma categoria</option>
                        <option value={""}>Mostrar todos</option>
                        <RenderOptions option={filterState.type}></RenderOptions>
                    </select>
                    <input className={"shrink"} type={"number"}
                           onChange={e=> table.getColumn("value")?.setFilterValue(e.target.value ? Number(e.target.value) : undefined)}
                           placeholder={"Valor"}>
                    </input>
                    <input className={"scheme-dark"} value={filterState.data} id={"dataFilter"} type={"date"} onChange={e => {
                        setFilterState(prev => ({...prev, data: e.target.value}))
                        table.getColumn("dataTransaction")?.setFilterValue(e.target.value)}
                    }></input>
                    <button onClick={()=> {setFilterState(prev=> ({...prev, data: ""}))
                        table.getColumn("dataTransaction")?.setFilterValue(undefined)
                    }} className={"cursor-pointer"}>Limpar data</button>
                    <input placeholder={"ID"} onChange={e=> {table.getColumn("id")?.setFilterValue(e.target.value)}}></input>
                </div>
            </div>
            <div className={"border-b border-r border-l border-[#3c4147] m-auto w-95/100 rounded-b-md"}>
                <table className={"w-full border-collapse"}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr className={"   bg-[#202020]"} key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th onClick={header.column.getCanSort() ? ()=> {
                                        const col = header.column
                                        const s = col.getIsSorted()
                                        if (!s) col.toggleSorting(false)
                                        else if(s=== "asc") col.toggleSorting(true)
                                        else col.clearSorting()
                                        console.log(s)
                                    } : undefined}
                                        style={{ width: header.column.columnDef.meta?.width }}
                                        className={"sticky bg-[#202020] top-0 z-20 x-4 py-4 text-white text-sm border border-black font-semibold"} key={header.id}>
                                        <span className={"cursor-pointer select-none inline-flex items-center gap-2"}>{flexRender(header.column.columnDef.header, header.getContext())}{header.column.getCanSort() ? getIcon(header.column.getIsSorted()) : ""}</span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr className={"even:bg-[#202020] odd:bg-[#393938]"} key={row.id}>
                                {row.getVisibleCells().map(cell=> (
                                    <td style={{ width: cell.column.columnDef.meta?.width }} className={`px-4 py-2 text-white text-sm border border-black font-semibold ${cell.column.columnDef.meta?.align === "right" ? "text-right" : "text-left"}`} key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}