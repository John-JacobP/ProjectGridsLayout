import React, { useState } from "react";
import styled from "styled-components";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { AzureWidgets } from "./AzureWidgets";
import "./LayoutEditor.css";

const Header = styled.h3`
  color: white;
  padding: 1em;
`;

const Widget = styled.div`
  border: 1px solid black;
  background: ivory;
`;

const LayoutEditor = () => {
  const [layoutConfig, updateLayoutConfig] = useState([
    { i: "Test", x: 0, y: 1, h: 1, w: 1 },
  ]);

  const [counter, setCounter] = useState(0);
  const [_droppingItem, updateDroppingItem] = useState("");

  const handleDrop = (_layout, _layoutItem, _event) => {
    const newLayoutItem = {
      i: `${_droppingItem}-${counter}`,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };

    updateLayoutConfig([...layoutConfig, newLayoutItem]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleSaveLayout = () => {
    // Save the layoutConfig to localStorage
    localStorage.setItem("layout", JSON.stringify(layoutConfig));
    console.log("Layout saved:", layoutConfig);
  };

  const GridLayoutProps = {
    className: "Grid",
    cols: 12,
    rowHeight: 150,
    width: 1100,
  };

  const validateWidget = layout => {
    const newLayout = layout.filter(widget => widget.i !== "__dropping-elem__")
    updateLayoutConfig(newLayout)
  }

  return (
      <div className="FullPage">
        <div className="TopNav">
          <Header>Layout Editor</Header>
        </div>
        <div className="sidebarandbody">
          <div className="sidebar">
            <AzureWidgets updateStateCallback={updateDroppingItem} />
          </div>
          <div className="body">
            <div
                className="insideBody"
                onDrop={(event) => {
                  handleDrop(null, null, event);
                }}
                onDragOver={(event) => event.preventDefault()}
            >
              <GridLayout
                  {...GridLayoutProps}
                  isDroppable={true}
                  onLayoutChange={(layout) => validateWidget(layout)}
              >
                {layoutConfig.map((layout) => (
                    <Widget key={layout.i} data-grid={layout}>
                      {layout.i}
                    </Widget>
                ))}
              </GridLayout>
            </div>
          </div>
        </div>
        <button onClick={handleSaveLayout}>Save Layout</button>
      </div>
  );
};

export default LayoutEditor;
