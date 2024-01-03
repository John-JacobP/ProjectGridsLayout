import React, { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";
import "./Home.css";

// Styled component for widget styling
const Widget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`;

// Home component for rendering the layout
export default function Home() {
    // State for managing the layout configuration
    const [layout, setLayout] = useState([]);

    // hook to load the layout from local storage on component mount
    useEffect(() => {
        const storedLayout = localStorage.getItem("layout");
        if (storedLayout) {
            setLayout(JSON.parse(storedLayout));
        }
    }, []);

    return (
        <>
            {/* Conditional rendering based on whether there's a layout or not */}
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
                        {/* Render widgets based on the current layout configuration */}
                        {layout.map((widget) => (
                            <Widget className="widgets" key={widget.i}>
                                {widget.i}
                            </Widget>
                        ))}
                    </ReactGridLayout>
                </div>
            ) : (
                // Message for when there's no layout configured
                <div>Please create a layout.</div>
            )}
        </>
    );
}
