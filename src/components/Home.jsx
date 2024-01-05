import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactGridLayout from "react-grid-layout";
import styled from "styled-components";
import "./Home.css";
import { WidgetBuilder } from "../WidgetBuilder";

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
    const storedLayout = JSON.parse(localStorage.getItem("layouts")) || [];
    const azureLayout = storedLayout.find((layout) => layout.name === "azure");
    if (azureLayout) {
      //   setLayout(JSON.parse(storedLayout));
      setLayout(azureLayout.items);
    }
  }, []);

  return (
    <>
      <div className="FullPage">
        <div className="NavBar">Nav</div>
        <div className="SideBar">Side</div>
        <div className="body">
          <div className="savebutton">
            {/* Use Link to navigate to the LayoutEditor page and pass the layout as state */}
            <Link to="/editor">
              <button style={{ cursor: "pointer" }}>Edit Layout</button>
            </Link>
          </div>
          <div className="insideBody">
            {/* Conditional rendering based on whether there's a layout or not */}
            {layout.length > 0 ? (
              <ReactGridLayout
                isDraggable={false}
                isDroppable={false}
                isResizable={false}
                layout={layout}
                cols={12}
                width={1300}
                rowHeight={200}
                compactType={null}
                className="GridLayoutHome"
              >
                {/* Render widgets based on the current layout configuration */}
                {layout.map((widget) => WidgetBuilder(widget))}
              </ReactGridLayout>
            ) : (
              // Message for when there's no layout configured
              <div>Please create a layout.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
