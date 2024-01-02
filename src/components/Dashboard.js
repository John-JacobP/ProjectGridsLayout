export default class Dashboard {}
import React, { useState } from "react";
import "./Dashboard.css";
import GridLayout from "react-grid-layout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Dashboard = () => {
    const [newWidgetSize, setNewWidgetSize] = useState({ rows: 1, cols: 1 });
    const [isAddWidgetPopupOpen, setAddWidgetPopupOpen] = useState(false);
    const [widgets, setWidgets] = useState({
        vm: ["VM Widget 1", "VM Widget 2", "VM Widget 3"],
        pie: ["Pie Chart Widget 1", "Pie Chart Widget 2", "Pie Chart Widget 3"],
        notification: ["Notification Widget 1", "Notification Widget 2", "Notification Widget 3"],
        graph: ["Graph Widget 1", "Graph Widget 2", "Graph Widget 3"],
    });

    // Sample layout for the outer div
    const layout = [
        { i: "vm1", x: 0, y: 0, w: 2, h: 2 },
        { i: "vm2", x: 2, y: 0, w: 1, h: 2 },
        { i: "vm3", x: 3, y: 0, w: 1, h: 1 },
        { i: "pie1", x: 0, y: 2, w: 1, h: 1 },
        { i: "pie2", x: 1, y: 2, w: 1, h: 2 },
        { i: "notification1", x: 2, y: 2, w: 2, h: 1 },
        { i: "graph1", x: 0, y: 3, w: 2, h: 1 },
        { i: "graph2", x: 2, y: 3, w: 1, h: 1 },
    ];

    const onDragEnd = (result) => {
        // Handle widget dragging logic here
        // Update the layout state accordingly
        console.log(result);
    };

    const handleAddWidgetClick = () => {
        setAddWidgetPopupOpen(true);
    };

    const handleAddWidget = () => {
        // Add a new widget to the specified category with the given size
        const newWidgets = { ...widgets };
        const category = "newCategory"; // Change this to the desired category for new widgets

        // Ensure the category exists in newWidgets
        if (!newWidgets[category]) {
            newWidgets[category] = [];
        }

        const widgetId = `New Widget ${newWidgets[category].length + 1}`;
        newWidgets[category] = [...newWidgets[category], widgetId];
        setWidgets(newWidgets);
        setAddWidgetPopupOpen(false);
    };

    const handlePopupInputChange = (e) => {
        const { name, value } = e.target;
        setNewWidgetSize((prevSize) => ({ ...prevSize, [name]: parseInt(value, 10) }));
    };

    return (
        <div>
            <div>
                Hello<br />
                Select your widget
                <button onClick={handleAddWidgetClick}>Add Widget</button>
            </div>

            {/* Outer div with 90vh height and 100vw width */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dashboard">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} style={{ height: "90vh", width: "100vw" }}>
                            {/* React Grid Layout */}
                            <GridLayout className="layout" layout={layout} cols={4} rowHeight={50} width={1000}>
                                {/* Render widgets based on categories */}
                                {Object.keys(widgets).map((category) => (
                                    <div key={category}>
                                        <h3>{category.toUpperCase()}</h3>
                                        <Droppable droppableId={category}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                                    {widgets[category].map((widget, index) => (
                                                        <Draggable key={widget} draggableId={widget} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {widget}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                ))}
                            </GridLayout>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Popup for adding a new widget */}
            {isAddWidgetPopupOpen && (
                <div className="popup">
                    <h2>Add New Widget</h2>
                    <label>
                        Rows:
                        <input type="number" name="rows" value={newWidgetSize.rows} onChange={handlePopupInputChange} />
                    </label>
                    <label>
                        Columns:
                        <input type="number" name="cols" value={newWidgetSize.cols} onChange={handlePopupInputChange} />
                    </label>
                    <button onClick={handleAddWidget}>Add Widget</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
