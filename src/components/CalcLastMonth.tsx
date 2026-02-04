export function CalcCurrent({lastMonthValue, currentValue}: {lastMonthValue: number, currentValue: number}) {
    function setStyle(){
        if(difference === 0){
            return "bg-blue-100";
        }
        if(difference > 0){
            return "bg-blue-300"
        }
        return "bg-blue-400";
    }
    const difference = 0 || ((currentValue - lastMonthValue)/currentValue)*100
    const positiveStyle = ""
    const negativeStyle = ""
    const neutralStyle = ""
    return(
        <div>
            <span className={""}>
                {currentValue}<span>{difference}</span>
            </span>
        </div>

    )
}