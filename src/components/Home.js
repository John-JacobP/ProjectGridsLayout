import React, {useState} from "react";
import styled from "styled-components";
import "./Home.css"
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {AzureWidgets} from "./AzureWidgets";

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
        {i: 'item1', x: 0, y: 0, w: 2, h: 3},
        {i: 'item2', x: 2, y: 0, w: 4, h: 3},
        {i: 'item3', x: 6, y: 0, w: 2, h: 3}
    ]);

    const handleDrop = (layout, layoutItem, _event) => {
        const newLayoutItem = {...layoutItem, i: "VM"}
        updateLayoutConfig([...layoutConfig, newLayoutItem]);
    }
    const GridLayoutProps = {
        className: "my-grid",
        cols: 12,
        rowHeight: 167,
        width: 1100,
        Layout: {...layoutConfig}
    };

    return (
        <div className="FullPage">
            <div className="TopNav">
                <Header>Layout Editor</Header>
            </div>
            <div className="sidebarandbody">
                <div className="sidebar">
                    <AzureWidgets/>
                </div>
                <div className="body">
                    <div className="insideBody">
                        <GridLayout
                            {...GridLayoutProps}
                            isDroppable={true}
                            onDrop={handleDrop}
                        >
                            {
                                layoutConfig.map(layout => <Widget key={layout.i}>{layout.i}</Widget>)
                            }
                        </GridLayout>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;