import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link } from "react-router-dom";

import { CreateData, Column } from "../../type";

type Prop = {
  rows: CreateData[];
  page: number;
  rowsPerPage: number;
  columns: Column[];
};

export default function TableBodyMui({
  rows,
  page,
  rowsPerPage,
  columns,
}: Prop) {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
              {columns.map((column: Column) => {
                const value: string | number | string[] = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : null}
                    {column.id === "Flag" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <a href={row[column.id][1]} target="_blank" rel="noreferrer">
                          <img
                            style={{ width: "5vw" }}
                            src={row[column.id][0]}
                            alt="flag"
                          />
                        </a>
                        <Link
                          to={`/${row.name}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "2vw",
                          }}
                        >
                          <ArrowForwardIosIcon sx={{ marginLeft: "1.5vw" }} />
                        </Link>
                      </div>
                    ) : null}
                    {column.id === "languages" ? (
                      <ul>
                        {row[column.id].map((lang: string) => (
                          <li>{lang}</li>
                        ))}
                      </ul>
                    ) : null}
                    {column.id === "name" || column.id === "region"
                      ? value
                      : null}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
}
