import { useEffect, useState } from "react";
import { getDistanceTimer, leadingZero, Timer, timerOver } from "../../util/timer";

export default function GlobalTimer({time}: {time: Date}) {
  const [distance, setDistance] = useState<Timer>()

  useEffect(() => {
    const updateTime = () => {
      setDistance(getDistanceTimer(time))
    }

    updateTime()

    const intervalId = setInterval(() => {
      updateTime()
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);



  if(!distance) {
    return (
      <div></div>
    )
  }

  return (
     <div className={"clock " + (timerOver(distance) && "over")}>
          <p className="clockPart">{leadingZero(distance.days)}D</p>
          <p className="clockSpacer">:</p>
          <p className="clockPart">{leadingZero(distance.hours)}H</p>
          <p className="clockSpacer">:</p>
          <p className="clockPart">{leadingZero(distance.minutes)}M</p>
          <p className="clockSpacer">:</p>
          <p className="clockPart">{leadingZero(distance.seconds)}S</p>
    </div>
  )
}