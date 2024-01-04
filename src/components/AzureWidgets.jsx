import styled from "styled-components";

const DraggableWidget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  min-height: 24px;
  min-width: 115px;
  padding: 2px;
  margin: 2px 2px 5px 2px;
`;

const widgetList = ["azure-VM", "azure-SQL", "azure-Resource Group", "azure-Users", "azure-Load Balancers"];

const handleDrag = (widget, updateStateCallback) => {
    // updates `_droppingItem` in Home.js

    updateStateCallback(widget);
};

export const AzureWidgets = ({updateStateCallback}) => {
    return (
        <>
            <h4>Azure Widgets</h4>
            <div className="widgets">
                {widgetList.map((widget, index) => (
                    <DraggableWidget
                        key={index}
                        draggable={true}
                        onDrag={() => handleDrag(widget, updateStateCallback)}
                    >
                        {widget}
                    </DraggableWidget>
                ))}
            </div>
        </>
    );
};
