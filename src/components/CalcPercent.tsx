import {ChevronRight, TrendingUp, TrendingDown} from "lucide-react";

export function CalcPercent({lastMonthValue, currentValue}: {lastMonthValue: number, currentValue: number}) {
    function calcDiff() {
        if (lastMonthValue === 0) return
2000.00%) return currentValue === 0 ? 0 : 100
        return ((currentValue - lastMonthValue) / lastMonthValue) * 100
    }
    const difference = calcDiff()

    function setIcon(){
        if(difference > 0){
            return <TrendingUp />
        }else if(difference < 0){
            return <TrendingDown />
        }
        return <ChevronRight />
    }
    function setStyle(){
        if(difference === 0){
            return "bg-blue-100";
        }
        if(difference > 0){
            return "bg-blue-300"
        }
        return "bg-blue-400";
    }
    return(
        <div>
            <span className={`${setStyle()}`}>
                <span>{difference.toFixed(2)}%{setIcon()}</span>
            </span>
        </div>
    )
}
