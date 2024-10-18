import { MouseEvent, useEffect, useRef, useState } from "react";
import "./Polaroid.css";

interface IProps {
  src: string;
  alt: string;
  indx: number;
  x: number;
  y: number;
  randomRotate?: boolean;
  initialPictureLength: number;
}
const MAX_ROTATION = 15;
const MAX_PERSPECTIVE = 30;

let zIndex = 0;

export const Polaroid = ({x, y, indx, randomRotate, initialPictureLength, ...props}: IProps) => {
  const isMounted = useRef(false);
  const [rotate, setRotate] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [perspective, setPerspective] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const { w, h, x, y } = move(e);

    setPerspective({
      y: (x / w - 0.5) * MAX_PERSPECTIVE,
      x: -(y / h - 0.5) * MAX_PERSPECTIVE,
    });
  };

  const onMouseOut = () => {
    setPerspective({
        y: 0,
        x: 0,
      });
  }

  useEffect(() => {
    if (isMounted.current === false) {
      isMounted.current = true;
      const delay = indx >= initialPictureLength ? 0 : 100 * indx;
      const rotation =
        Math.round(Math.random() * MAX_ROTATION * 2) - MAX_ROTATION;

      setTimeout(() => {
        setRotate(rotation);
        setOpacity(1);
        setScale(1);
      }, delay);
    }
  }, []);
  
  return (
    <div
      className="root polaroid"
      onMouseDown={drag}
      onMouseMove={onMove}
      onMouseOut={onMouseOut}
      style={{
        transform: `
            rotate(${randomRotate ? rotate : 0}deg)
            scale(${scale}) 
            perspective(10cm)
            rotateX(${perspective.x}deg)
            rotateY(${perspective.y}deg)
        `,
        opacity: opacity,
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <img draggable="false" {...props} src={props.src} alt={props.alt || ""} />
    </div>
  );
};

function resetPerspective() {
    return { x: 0, y: 0 }
}

function move(e: MouseEvent<HTMLDivElement>) {
  return {
    w: e.currentTarget.clientWidth,
    h: e.currentTarget.clientHeight,
    x: e.nativeEvent.offsetX,
    y: e.nativeEvent.offsetY,
  };
}

function drag(e: MouseEvent<HTMLDivElement>) {
  e.preventDefault();
  ++zIndex;

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const elmnt = e.currentTarget;

  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
  //   }

  function elementDrag(e: any) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    elmnt.style.zIndex = zIndex.toString();
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
