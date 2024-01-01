import React, { useState } from "react";
import styled from "styled-components";
import "./Home.css";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { AzureWidgets } from "./AzureWidgets";

const Header = styled.h3`
  color: white;
  padding: 1em;
`;

const Widget = styled.div`
  border: 1px solid black;
  background: ivory;
`;

const Home = () => {
  const [layoutConfig, updateLayoutConfig] = useState([
    {i: "Test", x: 0, y: 1, h: 1, w: 1},
  ]);

  const handleDrop = (layout, layoutItem, _event) => {
    console.log(layoutItem);
    const newLayoutItem = { ...layoutItem };
    updateLayoutConfig([...layoutConfig, newLayoutItem]);
  };
  const GridLayoutProps = {
    className: "my-grid",
    cols: 12,
    rowHeight: 150,
    width: 1100,
    // Layout: { ...layoutConfig },
  };

  return (
    <div className="FullPage">
      <div className="TopNav">
        <Header>Layout Editor</Header>
      </div>
      <div className="sidebarandbody">
        <div className="sidebar">
          <AzureWidgets />
        </div>
        <div className="body">
          <div className="insideBody">
            <GridLayout
              {...GridLayoutProps}
              isDroppable={true}
              onDrop={handleDrop}
              droppingItem={{i: "VM", w: 1, h: 1}}
            >
              {layoutConfig.map((layout) => (
                <Widget key={layout.i}>{layout.i}</Widget>
              ))}
            </GridLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
