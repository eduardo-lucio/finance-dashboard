import {ChevronRight, TrendingUp, TrendingDown} from "lucide-react";

export function CalcPercent({ expense, lastMonthValue, currentValue}: {expense: boolean, lastMonthValue: number, currentValue: number}) {
    function calcDiff() {
        if (lastMonthValue === 0) return currentValue === 0 ? 0 : 100
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
        if (expense){
            if(difference === 0){
                return "text-yellow-100";
            }
            if(difference > 0){
                return "text-[#FF2C2C]"
            }
            return "text-[#5CE65C]";
        }
        if(difference === 0){
            return "text-yellow-100";
        }
        if(difference > 0){
            return "text-[#5CE65C]"
        }
        return "text-[#FF2C2C]";
    }
    return(
        <span className={`bg-[#27272a] inline-flex rounded-md p-0.5`}>{difference.toFixed(2)}%<span className={`${setStyle()}`}>{setIcon()}</span></span>
    )
}
