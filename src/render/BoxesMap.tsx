import { useEffect, useState } from "react";
import GlobalTimer from "../components/GlobalTimer";
import InteractBox from "../components/InteractBox";
import { apiGetAreas } from "../dao/area";
import { apiGetTimer } from "../dao/timer";
import { Area, AreaResponse, TimerResponse } from "../util/types";

export default function BoxesMap() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [timer, setTimer] = useState<Date>(new Date());

  useEffect(() => {
    apiGetAreas()
      .then((resp: AreaResponse) => {
        setAreas(resp.areas)
      })
      .catch(() => {
        alert("Failed fetch areas")
      });

    apiGetTimer()
    .then((resp: TimerResponse) => {
        setTimer(new Date(resp.timer))
      })
      .catch(() => {
        alert("Failed fetch timer")
      });
  }, []);

  return(
    <div style={{width:"100%"}}>
      <GlobalTimer time={timer}/>
      <br></br>
      <div style={{width:"100%"}} className="d-flex flex-wrap justify-content-center gap-5">
        {areas.map(area =>(
          <InteractBox 
            img="/world-map/img/blue.png"
            areaName={area.name}
            areaDesc={area.description}
          />
        ))}
      </div>
    </div>
  )
}