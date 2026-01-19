import {
  Application,
  extend,
} from '@pixi/react'
import {
  Graphics,
  ResizePlugin,
  TickerPlugin,
} from 'pixi.js'
import { useState } from 'react'
import RegionDrawer from '../components/RegionDrawer'
import { Region } from '../util/types'
import MapContainer from './MapContainer'

extend({
  Graphics,
  ResizePlugin,
  TickerPlugin
})

export default function MapApp() {
  const [selectedRegion, setRegion] = useState<Region | false>(false)

  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
      <RegionDrawer region={selectedRegion} setRegion={setRegion}/>
      <Application 
        resizeTo={window}
        background={'black'}
        eventMode='passive'
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <MapContainer setRegion={setRegion}/>
      </Application>
    </div>
  )
}

