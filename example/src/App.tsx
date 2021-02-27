import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styled from "styled-components/macro";
import Connector from "./Connector";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: auto;
`;

const Box = styled.div<{
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}>`
  width: 100px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  top: ${(props) => props.top || 0};
  bottom: ${(props) => props.bottom || 0};
  left: ${(props) => props.left || 0};
  right: ${(props) => props.right || 0};
`;

const Box1 = styled(Box)`
  background-color: green;
`;

const Box2 = styled(Box)`
  background-color: red;
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
        direction="r2l"
        roundCorner={true}
      />
      <Connector
        el1={refs.current["box3"]?.current}
        el2={refs.current["box4"]?.current}
        shape="narrow-s"
        direction="l2l"
        stem={10}
        roundCorner={true}
      />
      <Connector
        el1={refs.current["box5"]?.current}
        el2={refs.current["box6"]?.current}
        shape="narrow-s"
        direction="l2r"
        stem={10}
        roundCorner={true}
      />
      <Connector
        el1={refs.current["box7"]?.current}
        el2={refs.current["box8"]?.current}
        shape="narrow-s"
        direction="r2r"
        stem={10}
        roundCorner={true}
      />

      {/* YSPACE */}
      <Connector
        el1={refs.current["box9"]?.current}
        el2={refs.current["box10"]?.current}
        shape="narrow-s"
        direction="t2b"
        stem={10}
        roundCorner={true}
      />
      <Connector
        el1={refs.current["box11"]?.current}
        el2={refs.current["box12"]?.current}
        shape="narrow-s"
        direction="t2t"
        stem={10}
        roundCorner={true}
      />
      <Connector
        el1={refs.current["box13"]?.current}
        el2={refs.current["box14"]?.current}
        shape="narrow-s"
        direction="b2t"
        stem={10}
        roundCorner={true}
        endArrow={true}
        arrowSize={3}
      />
      <Connector
        el1={refs.current["box15"]?.current}
        el2={refs.current["box16"]?.current}
        shape="narrow-s"
        direction="b2b"
        stem={10}
        roundCorner={true}
      />

      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box1")} top="150px" left="150px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box2")} top="300px" left="300px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box3")} top="150px" left="500px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box4")} top="300px" left="650px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box5")} top="150px" left="850px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box6")} top="300px" left="1000px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box7")} top="150px" left="1150px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box8")} top="300px" left="1300px" />
      </Draggable>

      {/* Y SPACE */}
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box9")} top="400px" left="150px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box10")} top="550px" left="300px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box11")} top="400px" left="500px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box12")} top="550px" left="650px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box13")} top="400px" left="850px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box14")} top="550px" left="1000px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box1 ref={addRef("box15")} top="400px" left="1150px" />
      </Draggable>
      <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
        <Box2 ref={addRef("box16")} top="550px" left="1300px" />
      </Draggable>
    </Wrapper>
  );
}

export default App;
