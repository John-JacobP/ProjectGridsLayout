import React, { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { WidgetBuilder } from "../WidgetBuilder";
import "./Home.css";

// Home component for rendering the layout
export default function Home() {
  // State for managing the layout configuration
  const [layout, setLayout] = useState([]);

  // hook to load the layout from local storage on component mount
  useEffect(() => {
    const storedLayout = JSON.parse(localStorage.getItem("layouts")) || [];
    if (storedLayout) {
      setLayout(storedLayout);
    }
  }, []);

  return (
    <>
      <div className="FullPage">
        <div className="NavBar">Nav</div>
        <div className="SideBar">Side</div>
        <div className="body">
          {layout.length > 0 ? (
            <Tabs
              aria-label="Basic tabs"
              defaultValue={0}
              className="insideBody"
            >
              <TabList>
                {layout.map((provider, index) => (
                  <Tab key={index}>{provider.name}</Tab>
                ))}
              </TabList>
              {layout.map((provider, index) => (
                <TabPanel value={index} key={index} sx={{ width: "100%" }}>
                  <ReactGridLayout
                    isDraggable={false}
                    isDroppable={false}
                    isResizable={false}
                    layout={provider.items}
                    cols={12}
                    width={1300}
                    rowHeight={200}
                    compactType={null}
                    className="GridLayoutHome"
                  >
                    {provider.items.map((widget) => WidgetBuilder(widget))}
                  </ReactGridLayout>
                </TabPanel>
              ))}
            </Tabs>
          ) : (
            <div>Please create a layout.</div>
          )}
        </div>
      </div>
    </>
  );
}
