# react-svg-connector

React component to draw svg connectors to connect any React components

## Installation
```
npm install react-svg-connector

or

yarn add react-svg-connector
```

## Usage

Component props:
- el1: first React component
- el2: second React component
- shape (`optional`): `'s' | 'narrow-s' | 'line'`
- direction (`optional`): `'r2l' | 'l2l' | 'r2r' | 'l2r'`

Please run a full example to see all available props.

`S shape`

<img src="https://user-images.githubusercontent.com/26643781/108642893-ce300980-745c-11eb-9e58-ba95297899cb.gif" width="400">


`narrow-s shape`

<img src="https://user-images.githubusercontent.com/26643781/108642895-cff9cd00-745c-11eb-9104-f114f3763fe8.gif" width="600">

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
        direction="r2l" // "l2l", "r2r", "l2l"
      />
        <Box1 ref={ref1} />
        <Box2 ref={ref2} />
    </Wrapper>
  );
}