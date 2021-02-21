# react-svg-connectors

React component to draw svg connectors to connect any React components

## Installation
```
npm install react-svg-connectors

or

yarn add react-svg-connectors
```

## Usage

You can run a full example from the example folder.

```js

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

function App() {
  const ref1 = useRef();
  const ref2 = useRef();

  return (
    <Wrapper>
      <Connector
        el1={ref1.current}
        el2={ref2.current}
        shape="narrow-s"
        direction="r2l"
      />
        <Box1 ref={ref1} />
        <Box2 ref={ref2} />
    </Wrapper>
  );
}