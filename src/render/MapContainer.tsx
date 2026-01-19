import {
  extend,
} from '@pixi/react'
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js'
import MapRegion from './MapRegion'
import regions from '../regions.json'
import { Region } from '../util/types'
import { Viewport } from './Viewport'
import { MapOverlay } from './MapOverlay'
import { useState } from 'react'

extend({
  Container,
  Graphics,
  Sprite,
})

export default function MapContainer({setRegion}: {setRegion: (region: Region | false) => void}) {
  const [isDragging, setIsDragging] = useState<boolean>(false)

  return (
    <Viewport 
      screenHeight={window.innerHeight}
      screenWidth={window.innerWidth}
      worldWidth={regions.width}
      worldHeight={regions.height}
      setIsDragging={setIsDragging}
    >
      <pixiContainer eventMode='passive'/>
        <MapOverlay/>

        <pixiContainer eventMode='passive' interactive={true}>
          {(regions.regions as [Region]).map((region: Region) => {
            return <MapRegion region={region} isDragging={isDragging} setRegion={setRegion}/>
          })}
        </pixiContainer>
    </Viewport>
  )
}

