import React, { useEffect, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { WidgetBuilder } from "../WidgetBuilder";
import "./Home.css";
import styled from "styled-components";


const Header = styled.h2`
  color: #6DA4AA;
  padding: 5px;
`;

const SideBarOption = styled.div`
  color: #F8F4EC;
  font-size: 20px;
  cursor: pointer;
`;

// Home component for rendering the layout
export default function Home() {
  // State for managing the layout configuration
  const [layout, setLayout] = useState([]);
  const options = ["Inventory", "Billing Usage", "Usage Analytics"]
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
        <div className="NavBar">
          <Header>CloudGaze
          </Header>
        </div>
        <div className="SideBar">
          {
            options.map(option => <SideBarOption>{option}</SideBarOption>)
          }
        </div>
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
