import { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";

const Widget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`;

export default function Home() {
  const [layout, setLayout] = useState([]);
  // const layout = [
  //   {i: "Sample Item 1", x: 0, y: 0, w: 1, h: 1},
  //   {i: "Sample Item 2", x: 0, y: 1, w: 2, h: 1},
  //   {i: "Sample Item 3", x: 3, y: 0, w: 2, h: 1},
  // ];

  useEffect(() => {
    const storedLayout = localStorage.getItem("layout");
    if (storedLayout) {
      setLayout(JSON.parse(storedLayout));
    }
  }, []);

  return (
    <>
      {layout.length > 0 ? (
        <ReactGridLayout
          isDraggable={false}
          isDroppable={false}
          isResizable={false}
          layout={layout}
          cols={12}
          width={1300}
          rowHeight={100}
        >
          {layout.map((widget) => (
            <Widget key={widget.i}>{widget.i}</Widget>
          ))}
        </ReactGridLayout>
      ) : (
        <div>Please create a layout.</div>
      )}
    </>
  );
}
