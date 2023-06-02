import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import {Column} from "../../type";

type Prop = {
  columns: Column[];
}

export default function TableHeadMui({ columns }:Prop) {
  return (
    <TableHead >
      <TableRow >
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              minWidth: column.minWidth,
              backgroundColor: "#202020",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
