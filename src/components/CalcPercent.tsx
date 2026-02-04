export function CalcPercent({lastMonthValue, currentValue}: {lastMonthValue: number, currentValue: number}) {

    const difference = () => {
        if(currentValue > lastMonthValue){
            return (currentValue/lastMonthValue)*100-100
        }else if(currentValue < lastMonthValue){
            return -((lastMonthValue - currentValue)/lastMonthValue)*100
        }
        return 0;
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
    const positiveStyle = ""
    const negativeStyle = ""
    const neutralStyle = ""
    return(
        <div>
            <span className={""}>
                <span>{difference().toFixed(2)}%</span>
            </span>
        </div>
    )
}