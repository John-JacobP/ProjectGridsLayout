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

const awsWidgetList = [
    {id: "aws-ec2", name: "EC2", provider: "aws"},
    {id: "aws-rds", name: "RDS", provider: "aws"},
    {id: "aws-S3", name: "S3", provider: "aws"},
    {id: "aws-lambda", name: "Lambda", provider: "aws"},
    {id: "aws-dynamo_db", name: "Dynamo DB", provider: "aws"},
];

export const AwsWidgets = () => {
    return (
        <>
            <h4>Aws Widgets</h4>
            <div className="widgets">
                {
                    awsWidgetList.map((widget, index) => (
                        <DraggableWidget
                            key={index}
                            draggable={true}
                        >
                            {widget.name}
                        </DraggableWidget>
                    ))
                }
            </div>
        </>
    );
}