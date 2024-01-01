import styled from "styled-components";

const DraggableWidget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  height: 30px;
  padding: 2px;
  margin-bottom: 5px;
`;

const widgetList = ["VM", "SQL", "Resource Group", "Users", "Load Balancers"];

const handleDrag = (widget, updateStateCallback) => {
  // updates `_droppingItem` in Home.js

  updateStateCallback(widget);
};

export const AzureWidgets = ({ updateStateCallback }) => {
  return (
    <>
      Azure Widgets
      {widgetList.map((widget, index) => (
        <DraggableWidget
          key={index}
          draggable={true}
          onDrag={() => handleDrag(widget, updateStateCallback)}
        >
          {widget}
        </DraggableWidget>
      ))}
    </>
  );
};
