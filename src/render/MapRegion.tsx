import {
  extend,
} from '@pixi/react'
import {
  Container,
  Graphics,
  Text,
  TextStyle,
} from 'pixi.js'
import { useCallback, useEffect, useState } from 'react'
import { getDistanceTimer, leadingZero, Timer, timerOver } from '../util/timer'
import { Region } from '../util/types'

extend({
  Container,
  Graphics,
  Text
})

export default function MapRegion({region, isDragging, selectRegion}: {region: Region, isDragging: boolean, selectRegion: (region: Region) => void}) {
  const [isCooldown, setIsCooldown] = useState<boolean>( new Date().getTime() < new Date(region.cooldown).getTime() )
  const [distance, setDistance] = useState<Timer>()

  useEffect(() => {
    const updateTime = () => {
      if(!isCooldown) return;

      if(distance && timerOver(distance)) {
        setIsCooldown(false)
        return;
      }

      setDistance(getDistanceTimer(new Date(region.cooldown)))
    }

    updateTime()

    const intervalId = setInterval(() => {
      updateTime()
    }, 1000);

    return () => clearInterval(intervalId);
  }, [region, isCooldown]);

  
  function getCenter(vertices: number[]) {
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (let i = 0; i < vertices.length; i += 2) {
      const x = vertices[i];
      const y = vertices[i + 1];

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
    };
  }

  const { x, y } = getCenter(region.vertices)

  const drawCallback = useCallback((graphics: Graphics, vertices: number[]) => {
    graphics.clear()
    graphics.poly(vertices)
    graphics.stroke({ color: 'rgba(0, 0, 0, 0.25)', width: 3})
    graphics.fill({ color: isCooldown ? 
      'rgba(174, 174, 174, 0.76)' : 'rgba(217, 0, 255, 0)'
    })
  }, [isCooldown])

  const textStyle = new TextStyle({fontSize: "40px"})

  return (
    <pixiContainer sortableChildren={true}>
      {isCooldown && distance && 
      <pixiText 
        text={`${leadingZero(distance.days)}D : ${leadingZero(distance.hours)}H : ${leadingZero(distance.minutes)}M : ${leadingZero(distance.seconds)}S`}
        anchor={0.5} 
        x={x} 
        y={y} 
        zIndex={1000}
        style={textStyle}
      />}
      <pixiGraphics 
        eventMode='static'
        draw={(g) => drawCallback(g, region.vertices)}
        onPointerUp={()=>{if(!isDragging && !isCooldown) selectRegion(region)}}
      />
    </pixiContainer>
  )
}

