export function RenderOptions({ option }:{option: "income" | "expense" | ""}){
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
    if(option === "income" || option === "expense"){
        return categories[option].map(name=>{
                return(
                    <option key={name}>{name}</option>
                )
            }
        )
    }else{
        return <option disabled>Selecione um tipo</option>
    }
}