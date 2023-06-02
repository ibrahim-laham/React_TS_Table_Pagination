import React from "react";

import TextField from "@mui/material/TextField";

import {UserInputHandler} from "../type";

type Prop = {
  userInputHandler: UserInputHandler;
}

export default function Search({ userInputHandler }:Prop) {
  return (
    <div>
      <TextField
        id="filled-search"
        label="Search country"
        type="search"
        variant="filled"
        onChange={userInputHandler}
        color="primary"
        sx={{ marginTop: "5vh", backgroundColor: "#202020" }}
      />
    </div>
  );
}
