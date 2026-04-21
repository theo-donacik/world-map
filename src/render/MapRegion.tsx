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
    graphics.stroke({ color: 'rgba(0, 0, 0, 0.25)', width: 3})
    graphics.fill({ color: 'rgba(217, 0, 255, 0)'})
    //     graphics.fill({ color: `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`})

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

