import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import { apiGetImage } from '../dao/files';

export function MapOverlay({src}: {src: string}) {
    const spriteRef = useRef(null)
    const [texture, setTexture] = useState(Texture.EMPTY)

    useEffect(() => {
        apiGetImage(src).then((resp: File) => {
            Assets
            .load({
                src: URL.createObjectURL(resp),
                format: 'png',
                parser: 'loadTextures'
            })
            .then((result) => {
                setTexture(result)
            });
        })
        
    }, [src]);

    return (
      <pixiSprite
          eventMode='passive'
          ref={spriteRef}
          texture={texture}
      />
    );
}
