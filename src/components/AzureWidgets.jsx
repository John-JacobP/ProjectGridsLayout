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


export const AzureWidgets = () => {
  return (
    <>
      Azure Widgets
      {
        widgetList.map((widget, index) => <DraggableWidget key={index} draggable={true}>{widget}</DraggableWidget>)
      }
    </>
  );
};
