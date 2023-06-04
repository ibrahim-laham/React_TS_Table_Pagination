
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

import { CreateData, Column } from "../../type";

type Prop = {
  rows: CreateData[];
  page: number;
  rowsPerPage: number;
  columns: Column[];
  setFavoritesList: React.Dispatch<React.SetStateAction<CreateData[]>>;
  favoritesList: CreateData[];
};

export default function TableBodyMui({
  rows,
  page,
  rowsPerPage,
  columns,
  setFavoritesList,
  favoritesList,
}: Prop) {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          function favoritesHandler() {
            setFavoritesList([...favoritesList, row]);
            favoritesList.map((favorite) => { 
              if (favorite.name === row.name) {
               return setFavoritesList(
                  favoritesList.filter((favorite) => favorite.name !== row.name)
                );
              } else {return null}
            });
          }
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
                        <a
                          href={row[column.id][1]}
                          target="_blank"
                          rel="noreferrer"
                        >
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
                        <IconButton
                          onClick={favoritesHandler}
                          sx={{ cursor: "pointer" /* ,color: "lightyellow" */ }}
                        >
                          <FavoriteIcon
                            sx={favoritesList.map((favorite) =>
                              favorite.name === row.name
                                ? { color: "gold" }
                                : null
                            )}
                          />
                        </IconButton>
                      </div>
                    ) : null}
                    {column.id === "languages" ? (
                      <ul>
                        {row[column.id].map((lang: string, index: number) => (
                          <li key={index}>{lang}</li>
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
