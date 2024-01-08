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

export const ShowWidgets = ({ title, widgetsList, updateStateCallback }) => {
  return (
    <>
      <h4>{title}</h4>
      <div>
        {widgetsList.map((widget, index) => (
          <DraggableWidget
            key={index}
            draggable={true}
            onDrag={() => updateStateCallback(widget.id)}
          >
            {widget.name}
          </DraggableWidget>
        ))}
      </div>
    </>
  );
};
