import styled from "styled-components";
import { widgetList } from "./components/AzureWidgets";

const Widget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`;


function getWidget(id) {
  const widget = widgetList.filter(temp => temp.id === id);
  if (widget.length > 0) {
    return widget.at(0);
  }
  return null;
}


export function WidgetBuilder(widget) {
  const _widget = getWidget(widget.i);
  return (
    <Widget key={widget.i}>
      <h3>{_widget.name}</h3>
      <hr />
      <h6>Number of instances</h6>
      <h2>0</h2>
    </Widget>
  );
}
