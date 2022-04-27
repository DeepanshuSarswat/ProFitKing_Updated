import * as React from "react";
import "./LeftBody.css";
import { IconButton } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
const color = "blue";
const useStyle = makeStyles({
  formconrtrol: {
    height: 40,
    fill: "red",
  },
  IconColor: {
    color: "rgb(35, 127, 206)",
  },
});
function LeftBody() {
  const classes = useStyle();
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="leftbodycontent">
      <div className="Leftbodyheader">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <Select
            className={classes.formconrtrol}
            value={age}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <IconButton>
          <SortIcon />
        </IconButton>
        <IconButton>
          <AddCircleIcon className={classes.IconColor} />
        </IconButton>
      </div>
      <div className="LeftBody">
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
        <p>LeftBody</p>
      </div>
    </div>
  );
}

export default LeftBody;
