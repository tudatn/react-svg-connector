import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components/macro";
import Connector from "./Connector";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: scroll;
`;

const Box = styled.div`
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

const Box1 = styled(Box)`
  background-color: green;
`;

const Box2 = styled(Box)`
  background-color: red;
`;

const Box3 = styled(Box)`
  background-color: blue;
`;

function App() {
  const [activeDrags, setActiveDrags] = useState(0);
  const [redraw, setRedraw] = useState(0);

  const refs = useRef<{ [key: string]: any }>({});

  function addRef(key: string) {
    if (refs.current[key]) {
      return refs.current[key];
    } else {
      const newRef = React.createRef<any>();
      refs.current[key] = newRef;
      return newRef;
    }
  }

  function onStart() {
    const newActiveDrags = activeDrags + 1;
    setActiveDrags(newActiveDrags);
  }

  function onStop() {
    const newActiveDrags = activeDrags - 1;
    setActiveDrags(newActiveDrags);
  }

  function onDrag(e: any, data: any) {
    setRedraw(Math.random());
  }

  useEffect(() => {
    setRedraw(Math.random());
  }, []);

  return (
    <Wrapper>
      <Connector
        el1={refs.current["box1"]?.current}
        el2={refs.current["box2"]?.current}
        shape="narrow-s"
      />
      <Connector
        el1={refs.current["box1"]?.current}
        el2={refs.current["box3"]?.current}
        shape="narrow-s"
      />
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box1")} />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box2")} />
      </Draggable>
      <div
        style={{
          position: "relative",
          height: "400px",
          width: "600px",
          overflow: "scroll",
          border: "1px solid black",
        }}
      >
        <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
          <Box3 ref={addRef("box3")} />
        </Draggable>
      </div>
    </Wrapper>
  );
}

export default App;
