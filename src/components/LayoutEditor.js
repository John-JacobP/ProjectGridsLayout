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
  const [layoutConfig, updateLayoutConfig] = useState([]);
  const [_droppingItem, updateDroppingItem] = useState("");

  const handleDrop = (_layout, _layoutItem, event) => {
    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor((x / rect.width) * GridLayoutProps.cols);
    const row = Math.floor((y / rect.height) * (rect.height / GridLayoutProps.rowHeight));

    const newWidgetId = `${_droppingItem}`;

    // Check if a widget with the same ID already exists
    const isDuplicate = layoutConfig.some((widget) => widget.i === newWidgetId);

    if (!isDuplicate) {
      const newLayoutItem = {
        i: newWidgetId,
        x: col,
        y: row,
        w: 1,
        h: 1,
      };

      updateLayoutConfig([...layoutConfig, newLayoutItem]);
    } else {
      window.alert(`Widget with ID ${newWidgetId} already exists. Duplicates not allowed.`);
    }
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
    compactType: null,
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
            <div className="savebutton">
              <button onClick={handleSaveLayout}>Save Layout</button>
            </div>
            <div
                className="insideBody"
                onDrop={(event) => handleDrop(layoutConfig, null, event)}
                onDragOver={(event) => event.preventDefault()}
            >
              <GridLayout
                  {...GridLayoutProps}
                  isDroppable={true}
                  onLayoutChange={validateWidget}
                  onDrop={(layout, layoutItem, _event) => handleDrop(layout, layoutItem, _event)}
                  className="GridLayout"
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
      </div>
  );
};

export default LayoutEditor;
