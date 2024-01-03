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
  const [layoutConfig, setLayoutConfig] = useState([]);
  const [droppingItem, setDroppingItem] = useState("");
  const [showLayoutSavedMessage, setShowLayoutSavedMessage] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor((x / rect.width) * GridLayoutProps.cols);
    const row = Math.floor((y / rect.height) * (rect.height / GridLayoutProps.rowHeight));

    const newWidgetId = `${droppingItem}`;
    const isDuplicate = layoutConfig.some((widget) => widget.i === newWidgetId);

    if (!isDuplicate) {
      const newLayoutItem = {
        i: newWidgetId,
        x: col,
        y: row,
        w: 1,
        h: 1,
      };

      setLayoutConfig((prevLayout) => [...prevLayout, newLayoutItem]);
    } else {
      window.alert(`Widget with ID ${newWidgetId} already exists. Duplicates not allowed.`);
    }
  };

  const handleSaveLayout = () => {
    localStorage.setItem("layout", JSON.stringify(layoutConfig));
    setShowLayoutSavedMessage(true);

    // Hide the message after a short delay (e.g., 3 seconds)
    setTimeout(() => {
      setShowLayoutSavedMessage(false);
    }, 3000);
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
    setLayoutConfig(newLayout);
  };

  return (
      <div className="FullPage">
        <div className="TopNav">
          <Header>Layout Editor</Header>
        </div>
        <div className="sidebarandbody">
          <div className="sidebar">
            <AzureWidgets updateStateCallback={setDroppingItem} />
          </div>
          <div className="body">
            <div className="savebutton">
              <button style={{cursor:'pointer'}} onClick={handleSaveLayout}>Save Layout</button>
              {showLayoutSavedMessage && <p>Layout saved!</p>}
            </div>
            <div
                className="insideBody"
                onDrop={(event) => handleDrop(event)}
                onDragOver={(event) => event.preventDefault()}
            >
              <GridLayout
                  {...GridLayoutProps}
                  isDroppable={true}
                  onLayoutChange={validateWidget}
                  onDrop={(layout, layoutItem, event) => handleDrop(event)}
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
