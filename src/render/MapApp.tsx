import {
  Application,
  extend,
} from '@pixi/react'
import {
  Graphics,
  ResizePlugin,
  TickerPlugin,
} from 'pixi.js'
import { useEffect, useState } from 'react'
import { House } from 'react-bootstrap-icons'
import GlobalTimer from '../components/GlobalTimer'
import NavToAdminBtn from '../components/NavToAdminBtn'
import RegionDrawer from '../components/RegionDrawer'
import { apiGetRegion } from '../dao/region'
import { apiGetTimer } from '../dao/timer'
import { Region, RegionResponse, TimerResponse } from '../util/types'
import MapContainer from './MapContainer'

extend({
  Graphics,
  ResizePlugin,
  TickerPlugin
})

export default function MapApp({defaultParentRegionId} : {defaultParentRegionId: string}) {
  const [parentRegion, setParentRegion] = useState<Region | undefined>(undefined)
  const [defaultParentRegion, setDefaultParentRegion] = useState<Region | undefined>(undefined)
  const [subregions, setSubregions] = useState<Region[]>([])
  const [selectedRegion, setSelectedRegion] = useState<Region | false>(false)
  const [timer, setTimer] = useState<Date>(new Date())

  useEffect(() => {
    apiGetRegion(defaultParentRegionId)
      .then((resp: RegionResponse) => {
          setDefaultParentRegion(resp.parent)
          setParentRegion(resp.parent)
          setSubregions(resp.subregions)
      })
      .catch(() => {
        alert("Failed to fetch default region")
      });
  }, [defaultParentRegionId])

  useEffect(() => {
    if(!parentRegion) return;

    apiGetRegion(parentRegion._id)
      .then((resp: RegionResponse) => {
        setSubregions(resp.subregions)
      })
      .catch(() => {
      });
  }, [parentRegion])

  useEffect(() => {
    apiGetTimer()
    .then((resp: TimerResponse) => {
        setTimer(new Date(resp.timer))
      })
      .catch(() => {
        alert("Failed fetch timer")
      });
  }, []);

  function selectRegion(region: Region) {
    if(region.subregionImg) {
      setParentRegion(region)
    }
    else {
      setSelectedRegion(region)
    }
  }

  function goHome() {
    defaultParentRegion && setParentRegion(defaultParentRegion);
  }

  return (
    <div>
      <div className='map-header'>
        <House onClick={goHome}/>
        <GlobalTimer time={timer}/>
        <NavToAdminBtn/>
      </div>
      <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
        <RegionDrawer region={selectedRegion} onClose={() => setSelectedRegion(false)}/>
        <Application 
          resizeTo={window}
          background='grey'
          eventMode='passive'
          width={window.innerWidth}
          height={window.innerHeight}
        >
          {parentRegion &&
            <MapContainer 
              selectRegion={selectRegion}
              subregions={subregions}
              parentRegion={parentRegion}
            />
          }
        </Application>
      </div>
    </div>
  )
}

