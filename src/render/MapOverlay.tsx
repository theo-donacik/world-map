import {
    Assets,
    Texture,
} from 'pixi.js';
import {
    useEffect,
    useRef,
    useState,
} from 'react';

export function MapOverlay() {
    const spriteRef = useRef(null)
    const [texture, setTexture] = useState(Texture.EMPTY)

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets
                .load('./img/world-map.png')
                .then((result) => {
                    setTexture(result)
                });
        }
    }, [texture]);

    return (
      <pixiSprite
          eventMode='passive'
          ref={spriteRef}
          texture={texture}
      />
    );
}
