import styled from "styled-components";

const DroppableWidget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  width: 30px;
  height: 30px;
`;

export const AzureWidgets = () => {
  return (
    <>
      Azure Widgets
      <DroppableWidget
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
        key="VM"
      >
        VM
      </DroppableWidget>
    </>
  );
};
