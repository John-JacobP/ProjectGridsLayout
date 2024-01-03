import React, {useState} from "react";
import styled from "styled-components";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {AzureWidgets} from "./AzureWidgets";
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
  const [layoutConfig, updateLayoutConfig] = useState([]);
  const [counter, setCounter] = useState(0);
  const [_droppingItem, updateDroppingItem] = useState("");

  const handleDrop = (layout, layoutItem, event) => {
    if (event.preventDefault) {
      event.preventDefault();
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / (rect.width / GridLayoutProps.cols));
    const row = Math.floor(y / (rect.height / GridLayoutProps.rowHeight));

    const newLayoutItem = {
      i: `${_droppingItem}-${counter}`,
      x: col,
      y: row,
      w: 1,
      h: 1,
    };

    updateLayoutConfig([...layout, newLayoutItem]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleSaveLayout = () => {
    localStorage.setItem("layout", JSON.stringify(layoutConfig));
    console.log("Layout saved:", layoutConfig);
  };

  const GridLayoutProps = {
    className: "Grid",
    cols: 12,
    rowHeight: 150,
    width: 1200,
  };

  const validateWidget = (layout) => {
    const newLayout = layout.filter((widget) => widget.i !== "__dropping-elem__");
    updateLayoutConfig(newLayout);
  };

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
            <div className="insideBody" onDrop={(layout, layoutItem, event) => handleDrop(layout, layoutItem, event)}>
              <GridLayout
                  {...GridLayoutProps}
                  isDroppable={true}
                  onLayoutChange={(layout) => validateWidget(layout)}
                  onDrop={(layout, layoutItem, event) => handleDrop(layout, layoutItem, event)}
                  className="GridLayout"
              >
                {layoutConfig.map((layout) => (
                    <Widget key={layout.i} data-grid={layout}>
                      {layout.i}
                    </Widget>
                ))}
              </GridLayout>
              <div className="savebutton">
                <button onClick={handleSaveLayout}>Save Layout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LayoutEditor;
