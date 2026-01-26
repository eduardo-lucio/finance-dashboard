import {AddTransaction} from "../components/AddTransaction.tsx";
import {useState} from "react";

export function Dashboard(){
    const [isOpen, setIsOpen] = useState(true)

    return(
        <div>

            {isOpen && <AddTransaction setIsOpen={setIsOpen}/>}
        </div>
    )
}