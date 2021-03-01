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
- direction (`optional`): `'r2l' | 'l2l' | 'r2r' | 'l2r' |'b2t' | 'b2b' | 't2b' | 't2t'`
- roundCorner (`optional`): `true | false`
- grid (`optional`): number of grid, used to calculate `step = distanceX(Y) / grid`
- minStep (`optional`): min value for the `step`
- stem(`optional`): min distance from the start point
- endArrow(`optional`): `true | false`
- startArrow(`optional`): `true | false`
- arrowSize(`optional`): arrow size

All svg path props are available. Please run a full example to see all available props.

`S shape`

<img src="https://user-images.githubusercontent.com/26643781/109436187-40f83200-79d3-11eb-9d5d-93ed82d40791.gif" width="400">


`narrow-s shape`

<img src="https://user-images.githubusercontent.com/26643781/109394767-80dced80-78dd-11eb-8bd5-ff0337b79ebe.png" width="400">

<img src="https://user-images.githubusercontent.com/26643781/109394769-833f4780-78dd-11eb-9555-de5c1bb039c8.png" width="400">


<img src="https://user-images.githubusercontent.com/26643781/109436188-42c1f580-79d3-11eb-9a62-f85fcc2b2f6c.gif" width="600">

```ts
const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: auto;
`;

const Box = styled.div`
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

const Box1 = styled(Box)`
  background-color: green;
  position: absolute;
  top: 200px;
  left: 200px;
`;

const Box2 = styled(Box)`
  background-color: red;
  position: absolute;
  top: 400px;
  left: 500px;
`;

function App() {
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();

  const [draw, redraw] = useState(0);

  useEffect(() => {
    redraw(Math.random());
  }, [ref1, ref2]);

  return (
    <Wrapper>
      <Connector
        el1={ref1.current}
        el2={ref2.current}
        shape="narrow-s"
        direction="r2l" // "l2l", "r2r", "l2l"
        roundCorner={true}
        endArrow={true}
      />
      <Box1 ref={ref1} />
      <Box2 ref={ref2} />
    </Wrapper>
  );
}