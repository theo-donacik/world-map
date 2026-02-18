import { useEffect, useState } from "react";

export default function GlobalTimer({time}: {time: Date}) {
  const [distance, setDistance] = useState<number>(1)

  function updateTime() {
    const d = time.getTime() - new Date().getTime()
    if(d > 0) {
      setDistance(time.getTime() - new Date().getTime()); 
    }
    else if (d <= 0){
      setDistance(0)
    }
  }

  useEffect(() => {
      updateTime()

      const intervalId = setInterval(() => {
        updateTime()
      }, 1000);

      return () => clearInterval(intervalId);
  }, [time]);


  const days = Math.floor(distance / 86400000);
  const daysRemainder = distance % 86400000

  const hours = Math.floor(daysRemainder / 3600000); 
  const hoursRemainder = daysRemainder % 3600000; 

  const mins = Math.floor(hoursRemainder / 60000); 
  const minsRemainder = hoursRemainder % 60000; 

  const seconds = Math.floor(minsRemainder / 1000); 

  return (
     <div className={"clock " + (distance <= 0 && "over")}>
          <p className="clockPart">{days < 10 ? "0" + days : days}D</p>
          <p className="clockSpacer">:</p>
          <p className="clockPart">{hours < 10 ? "0" + hours : hours}H</p>
          <p className="clockSpacer">:</p>
          <p className="clockPart">{mins < 10 ? "0" + mins : mins}M</p>
          <p className="clockSpacer">:</p>
          <p className="clockPart">{seconds < 10 ? "0" + seconds : seconds}S</p>
    </div>
  )
}