import * as React from "react";
import Chip from "@mui/material/Chip";

export default function Tags(props) {
  const handleClick = () => {
    console.log("You clicked the Chip.");
    setType(deletable);
  };

  const handleDelete = () => {
    console.log("You deleted the chip");
    setType(clickable);
  };

  const clickable = {
    label: props.tag,
    onClick: handleClick,
    variant: "outlined"
  };
  const deletable = { label: props.tag, onDelete: handleDelete };

  const [type, setType] = React.useState(clickable);



  return (
  <>
  <Chip {...type} />
  
  </>)
  ;
}