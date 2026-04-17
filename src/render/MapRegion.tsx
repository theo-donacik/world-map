import {
  extend,
} from '@pixi/react'
import {
  Container,
  Graphics,
} from 'pixi.js'
import { useCallback } from 'react'
import { Region } from '../util/types'

extend({
  Container,
  Graphics,
})

export default function MapRegion({region, isDragging, selectRegion}: {region: Region, isDragging: boolean, selectRegion: (region: Region) => void}) {
  const drawCallback = useCallback((graphics: Graphics, vertices: number[]) => {
    graphics.clear()
    graphics.poly(vertices)
    graphics.fill({ color: 'rgba(255, 0, 0, 0)'})
  }, [])

  return (
    <>
      <pixiGraphics 
        eventMode='static'
        draw={(g) => drawCallback(g, region.vertices)}
        onPointerUp={()=>{if(!isDragging) selectRegion(region)}}
      />
    </>
  )
}

