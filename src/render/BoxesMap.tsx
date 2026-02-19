import { useEffect, useState } from "react";
import GlobalTimer from "../components/GlobalTimer";
import InteractBox from "../components/InteractBox";
import { apiGetAreas } from "../dao/area";
import { apiGetTimer } from "../dao/timer";
import { token_key } from "../util/constnats";
import { Area, AreaResponse, TimerResponse } from "../util/types";

export default function BoxesMap() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [timer, setTimer] = useState<Date>(new Date());
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setToken(localStorage.getItem(token_key) ?? "")

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
            img="/world-map/img/green.png"
            area={area}
            userToken={token}
          />
        ))}
      </div>
    </div>
  )
}