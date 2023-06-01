import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import TableBodyMui from "../components/Table/TableBodyMui";
import TableHeadMui from "../components/Table/TableHeadMui";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "region", label: "region", minWidth: 100 },
  {
    id: "Population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Flag",
    label: "Flag",
    minWidth: 170,
    align: "right",
    format: "image",
  },
];

export default function CountryList({ result }) {
  function createData(name, region, Population, size, Flag) {
    return { name, region, Population, size, Flag };
  }

  const rows = [];

  result.map((country) => {
    const { name, region, population, area, flags, maps } = country;
    const commonName = name.common;
    const countryFlags = flags.svg;
    const countryMap = maps.googleMaps;
    return rows.push(
      createData(commonName, region, population, area, [
        countryFlags,
        countryMap,
      ])
    );
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      color="primary"
      className="table"
      sx={{ width: "50%", overflow: "hidden", marginTop: "2vh" }}
    >
      <TableContainer
        className="table"
        sx={{ maxHeight: 440, backgroundColor: "#c32c2c" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHeadMui columns={columns} />
          <TableBodyMui
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            columns={columns}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#202020" }}
      />
    </Paper>
  );
}
