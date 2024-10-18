import { useState } from "react";
import "./App.css";
import { Polaroid } from "./components/Polaroid";

const PICTURES = [
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
  { url: "https://placehold.co/300x200/pink/white" },
];

function drop(ev: any) {
  ev.preventDefault();
  console.log("DROP", ev);
}

function dragOver(ev: any) {
  ev.preventDefault();
}


function App() {
  const [pictures, setPictures] = useState<{url: string}[]>(PICTURES);
  const initialPictureLength = PICTURES.length;

  const add = () => {
    const newPicture = { url: "https://placehold.co/300x200/gray/white" };
    setPictures([...pictures, newPicture]);
  }

  const cols = 4;
  const rows = 3;

  // screen 1000 x 700
  const width = 1200;
  const height = 900;

  //figure out x for each picture
  const xMultiplier = width / cols;
  const yMultiplier = height / rows;

  return (
    <div className="App">
      <nav>
      {/* <h2>Here is an example text that will have the highlight</h2> */}
        {/* <button onClick={doSomething}>Allow rotation</button> */}
        <button onClick={add}>Add polaroid</button>
      </nav>
      <div id="tray" onDrop={drop} onDragOver={dragOver}>
        {pictures.map(({ url }: { url: string }, i) => {
          return (
            <Polaroid
              src={url}
              key={url+i}
              indx={i}
              initialPictureLength={initialPictureLength}
              alt="PlaceHolder"
              x={xMultiplier * Math.floor(i % cols)}
              y={yMultiplier * Math.floor(i / cols)}
              randomRotate={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

// Argen, Insight Global
// 
