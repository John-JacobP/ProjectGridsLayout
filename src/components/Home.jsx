import {useEffect, useState} from "react";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";
import "./Home.css"

const Widget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`;

export default function Home() {
    const [layout, setLayout] = useState([]);

  useEffect(() => {
    const storedLayout = localStorage.getItem("layout");
    if (storedLayout) {
      setLayout(JSON.parse(storedLayout));
    }
  }, []);

    return (
        <>
            {layout.length > 0 ? (
                <div className="HomePage">
                    <ReactGridLayout
                        isDraggable={false}
                        isDroppable={false}
                        isResizable={false}
                        layout={layout}
                        cols={12}
                        width={1300}
                        rowHeight={100}
                        compactType={null}
                        className="GridLayout"
                    >
                        {layout.map((widget) => (
                            <Widget className="widgets" key={widget.i}>{widget.i}</Widget>
                        ))}
                    </ReactGridLayout>
                </div>
            ) : (
                <div>Please create a layout.</div>
            )}
        </>
    );
}
