import {
  extend,
} from '@pixi/react'
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js'
import MapRegion from './MapRegion'
import { Region } from '../util/types'
import { Viewport } from './Viewport'
import { MapOverlay } from './MapOverlay'
import { useState } from 'react'

extend({
  Container,
  Graphics,
  Sprite
})

export default function MapContainer({selectRegion, subregions, parentRegion}: {selectRegion: (region: Region) => void, subregions: Region[], parentRegion: Region}) {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [regionLoading, setRegionLoading] = useState<boolean>(false) 

  return (
    <Viewport 
      screenHeight={window.innerHeight}
      screenWidth={window.innerWidth}
      worldWidth={parentRegion.subregionWidth ?? 1000}
      worldHeight={parentRegion.subregionHeight ?? 1000}
      setIsDragging={setIsDragging}
    >
      <pixiContainer eventMode='passive'>
        <MapOverlay src={parentRegion.subregionImg ?? 'bad-default-value'} setLoading={setRegionLoading}/>
        <pixiContainer eventMode='passive' interactive={true}>
          {(subregions).map((region: Region) => {
            if(regionLoading) {return <></>}
            return(<MapRegion 
                      region={region}
                      isDragging={isDragging}
                      selectRegion={selectRegion}/>)
          })}
        </pixiContainer>
      </pixiContainer>

    </Viewport>
  )
}

