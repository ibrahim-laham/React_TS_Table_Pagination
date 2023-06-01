import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";

export default function TableBodyMui({ rows, page, rowsPerPage, columns }) {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : null}
                    {column.format === "image" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "spaceBetween",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{ marginRight: "1vw", textAlign: "left" }}
                          variant="caption"
                        >
                          Click on the flag to see the map
                        </Typography>
                        <a href={value[1]} target="_blank" rel="noreferrer">
                          <img
                            style={{ width: "2vw" }}
                            src={value[0]}
                            alt="flag"
                          />
                        </a>
                      </div>
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
}
