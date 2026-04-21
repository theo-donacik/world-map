import { Viewport as BaseViewport, type IViewportOptions } from "pixi-viewport";
import { extend, useApplication } from "@pixi/react";
import { useEffect, useRef, type PropsWithChildren } from "react";
import { Application } from "pixi.js";

type ViewportProps = Omit<IViewportOptions, "events"> & {setIsDragging: (isDragging: boolean) => void};

const PADDING = 100;

class ViewportWrapper extends BaseViewport {  
  constructor(options: ViewportProps & { app: Application }) {
    const { app, ...rest } = options;
    super({
      ...rest,
      // events is the only required argument to the constructor.
      // This may be why extend() doesn't work propertly with pixi-viewport.
      // other pixi elements have no required arguments to the constructor.
      // hence we need to pass the app to the constructor.
      events: app.renderer.events,
    });
    this
      .drag({pressDrag: true})
      .pinch()
      .wheel({smooth: 3})
      .clamp({left: 0 - PADDING, right: this.worldWidth + PADDING, top: 0 - PADDING, bottom: this.worldHeight + PADDING})
      .clampZoom({
          minScale: 0.4,
          maxScale: 3,
        })
      .decelerate({friction: 0.9})
      .on('drag-start', () => {
        rest.setIsDragging(true)
      })
      .on('drag-end', () => {
        const timer = setTimeout(() => {
          rest.setIsDragging(false);
        }, 25);

        return () => {
          clearTimeout(timer);
        };
      })
      .on('pinch-start', () => {
        rest.setIsDragging(true)
      })
      .on('pinch-end', () => {
        const timer = setTimeout(() => {
          rest.setIsDragging(false);
        }, 50);

        return () => {
          clearTimeout(timer);
        };
      })

  }
}

extend({ ViewportWrapper });

function Viewport(props: PropsWithChildren<ViewportProps>) {
  const { children, ...rest } = props;
  const { app } = useApplication();
  const viewportRef = useRef<BaseViewport | null>(null);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    vp.clamp({
      left: -PADDING,
      right: vp.worldWidth + PADDING,
      top: -PADDING,
      bottom: vp.worldHeight + PADDING,
    });

    vp.resize(vp.screenWidth, vp.screenHeight, rest.worldWidth ?? 1000, rest.worldHeight ?? 1000);

  }, [rest.worldWidth, rest.worldHeight]);

  return (
    app?.renderer && (
      <pixiViewportWrapper ref={viewportRef} app={app} {...rest}>
        {children}
      </pixiViewportWrapper>
    )
  );
}



export { Viewport };