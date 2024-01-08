import React, { useState } from "react";
import styled from "styled-components";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import { AzureWidgets } from "./AzureWidgets";
// import { AwsWidgets } from "./AwsWidgets";
import { ShowWidgets } from "./Widgets";
import { awsWidgetList } from "../data/AwsWidgets";
import { azureWidgetList } from "../data/AzureWidgets";
import "./LayoutEditor.css";

// Styled components for enhanced styling
const Header = styled.h3`
  color: white;
  padding: 1em;
`;

const Widget = styled.div`
  border: 1px solid black;
  background: ivory;
`;

// Main LayoutEditor component
const LayoutEditor = () => {
  // State for managing layout configuration
  const [layoutConfig, setLayoutConfig] = useState([]);
  // State for managing the widget being dropped
  const [droppingItem, setDroppingItem] = useState("");
  // State for managing the new layout name
  const [newLayoutName, setNewLayoutName] = useState("");
  const [showLayoutSavedMessage, setShowLayoutSavedMessage] = useState(false);

  const [selectedLayout, setSelectedLayout] = useState(null);
  const [storedLayouts, setStoredLayouts] = useState(
    JSON.parse(localStorage.getItem("layouts")) || [],
  );

  const handleAddLayout = () => {
    const layoutName = prompt("Enter the new layout name:");

    if (layoutName) {
      const newLayout = {
        name: layoutName,
        items: [],
      };

      // Save the new layout to local storage
      const updatedLayouts = [...storedLayouts, newLayout];
      localStorage.setItem("layouts", JSON.stringify(updatedLayouts));

      // Update the storedLayouts state
      setStoredLayouts(updatedLayouts);

      // Reset the newLayoutName state
      setNewLayoutName("");

      // Optionally, you can trigger a reload of layouts or provide feedback to the user.
      alert(`Layout "${layoutName}" added successfully!`);
    }
  };

  const handleSelectLayout = (layoutName) => {
    const storedLayouts = JSON.parse(localStorage.getItem("layouts")) || [];
    const selectedLayout = storedLayouts.find(
      (layout) => layout.name === layoutName,
    );

    if (selectedLayout) {
      setSelectedLayout(selectedLayout);
      setLayoutConfig(selectedLayout.items || []);
      setShowLayoutSavedMessage(false); // Optional: Hide the saved layout message
    }
  };

  const handleDeleteLayout = () => {
    if (selectedLayout) {
      const updatedLayouts = storedLayouts.filter(
        (layout) => layout.name !== selectedLayout.name,
      );

      localStorage.setItem("layouts", JSON.stringify(updatedLayouts));

      // Update the storedLayouts state
      setStoredLayouts(updatedLayouts);

      // Reset the selected layout and its configuration
      setSelectedLayout(null);
      setLayoutConfig([]);
      setShowLayoutSavedMessage(false); // Optional: Hide the saved layout message
    }
  };

  // Handler for dropping a widget onto the layout
  const handleDrop = (event) => {
    event.preventDefault();

    // Calculate the drop position based on the mouse coordinates
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor((x / rect.width) * GridLayoutProps.cols);
    const row = Math.floor(
      (y / rect.height) * (rect.height / GridLayoutProps.rowHeight),
    );

    // Generate a unique ID for the new widget
    const newWidgetId = `${droppingItem}`;
    // Check for duplicate widget IDs
    const isDuplicate = layoutConfig.some((widget) => widget.i === newWidgetId);

    if (!isDuplicate) {
      // Create a new layout item for the dropped widget
      const newLayoutItem = {
        i: newWidgetId,
        x: col,
        y: row,
        w: 1.5,
        h: 1.5,
      };

      // Update the layout configuration
      setLayoutConfig((prevLayout) => [...prevLayout, newLayoutItem]);
    } else {
      window.alert(
        `Widget with ID ${newWidgetId} already exists. Duplicates not allowed.`,
      );
    }
  };

  // Handler for saving the current layout to local storage
  const handleSaveLayout = () => {
    if (selectedLayout) {
      const storedLayouts = JSON.parse(localStorage.getItem("layouts")) || [];
      const updatedLayouts = storedLayouts.map((layout) =>
        layout.name === selectedLayout.name
          ? { ...layout, items: layoutConfig }
          : layout,
      );

      localStorage.setItem("layouts", JSON.stringify(updatedLayouts));
      setShowLayoutSavedMessage(true);

      // Hide the message after a short delay (e.g., 3 seconds)
      setTimeout(() => {
        setShowLayoutSavedMessage(false);
      }, 3000);
    }
  };

  // Configuration for the GridLayout component
  const GridLayoutProps = {
    className: "Grid",
    cols: 12,
    rowHeight: 150,
    width: 1200,
    compactType: null,
  };

  // Handler for validating and updating the layout when widgets are moved or resized
  const validateWidget = (layout) => {
    const newLayout = layout.filter(
      (widget) => widget.i !== "__dropping-elem__",
    );
    setLayoutConfig(newLayout);
  };

  // Render the layout editor component
  return (
    <div className="FullPage">
      <div className="TopNav">
        <Header>Layout Editor</Header>
      </div>
      <div className="sidebarandbody">
        <div className="sidebar">
          {/* AzureWidgets component for selecting widgets to add */}
          {/* <AzureWidgets updateStateCallback={setDroppingItem} />
          <AwsWidgets /> */}
          <ShowWidgets title={"Azure"} widgetsList={azureWidgetList} updateStateCallback={setDroppingItem}/>
          <ShowWidgets title={"AWS"} widgetsList={awsWidgetList} updateStateCallback={setDroppingItem}/>
        </div>
        <div className="body">
          <div className="savebutton">
            {/* Save Layout button with a click handler */}
            <button style={{ cursor: "pointer" }} onClick={handleSaveLayout}>
              Save Layout
            </button>
            {/* Display the layout saved message when triggered */}
            {showLayoutSavedMessage && <p>Layout saved!</p>}
          </div>
          <div className="body">
            <div className="savebutton">
              <button style={{ cursor: "pointer" }} onClick={handleSaveLayout}>
                Save Layout
              </button>
              <button style={{ cursor: "pointer" }} onClick={handleAddLayout}>
                Add New Layout
              </button>
              <select onChange={(e) => handleSelectLayout(e.target.value)}>
                <option value="" disabled selected>
                  Select a Layout
                </option>
                {storedLayouts.map((layout) => (
                  <option key={layout.name} value={layout.name}>
                    {layout.name}
                  </option>
                ))}
              </select>

              <button
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={handleDeleteLayout}
                disabled={!selectedLayout}
              >
                Delete Layout
              </button>

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
    </div>
  );
};

export default LayoutEditor;
