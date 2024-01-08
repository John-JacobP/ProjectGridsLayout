// To show the widget according to the cloud provider
// and with additional information related to a particular widget.

import styled from "styled-components";
import { Link } from "react-router-dom";

import { azureWidgetList } from "../src/data/AzureWidgets";
import { awsWidgetList } from "../src/data/AwsWidgets";

const Widget = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background: white;
`;

function getWidget(id) {
  const widgetList = [...azureWidgetList, ...awsWidgetList];
  const widget = widgetList.filter((temp) => temp.id === id);
  if (widget.length > 0) {
    return widget.at(0);
  }
  return null;
}

export function WidgetBuilder(widget) {
  const max = 10;
  const min = 1;
  const _widget = getWidget(widget.i);
  return (
    <Widget key={widget.i}>
      <Link
        to={_widget.id === "azure-vm" ? "/VMs" : ""}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>{_widget.name}</h3>
        <hr />
        Number of {_widget.name.toLocaleLowerCase()}
        <h2>{Math.floor(Math.random() * (max - min) + min)}</h2>
      </Link>
    </Widget>
  );
}
