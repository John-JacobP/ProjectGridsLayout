import React from "react";
import "./Home.css"
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


const Home = () => {
    const layoutConfig = [
        {i: 'item1', x: 0, y: 0, w: 2, h: 3},
        {i: 'item2', x: 2, y: 0, w: 4, h: 3},
        {i: 'item3', x: 6, y: 0, w: 2, h: 3}
    ];

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
                <p>TopNav</p>
            </div>
            <div className="sidebarandbody">
                <div className="sidebar">
                    <p>SideBar</p>
                </div>
                <div className="body">
                    <div className="insideBody">
                        <GridLayout {...GridLayoutProps}>
                            <div key="item1" style={{background: '#003c51'}}>Item 1</div>
                            <div key="item2" style={{background: '#006e74'}}>Item 2</div>
                            <div key="item3" style={{background: '#d3862b'}}>Item 3</div>
                            <div key="item4" style={{background: '#44b74e'}}>Item 4</div>
                            <div key="item5" style={{background: '#20ad88'}}>Item 5</div>
                            <div key="item6" style={{background: '#d32b2b'}}>Item 6</div>
                        </GridLayout>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;