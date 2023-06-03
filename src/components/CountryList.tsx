import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import TableBodyMui from "./Table/TableBodyMui";
import TableHeadMui from "./Table/TableHeadMui";

import {Column,CountryData,CreateData} from "../type";

type Prop = {
  result: CountryData[];
  setFavoritesList: React.Dispatch<React.SetStateAction<CreateData[]>>;
  favoritesList: CreateData[];
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  { id: "region", label: "region", minWidth: 100, align: "center"   },
  {
    id: "Population",
    label: "Population",
    minWidth: 170,
    align: "center",
    format: (value:number) => value.toLocaleString("en-US"),
  },
  {
    id: "languages",
    label: "languages",
    minWidth: 170,
    align: "center",
  },
  {
    id: "Flag",
    label: "Flag",
    minWidth: 170,
    align: "center",
  },
];

export default function CountryList({ result, setFavoritesList, favoritesList}:Prop) {
  function createData(name:string, region:string, Population: number, languages: string[], Flag:string[]):CreateData {
    return { name, region, Population, languages, Flag };
  }

  const rows: CreateData[] = [];

  result.map((country: CountryData ) => {
    const { name, region, population, languages, flags, maps } = country;
    const commonName = name.common;
    const countryFlags = flags.svg;
    const countryMap = maps.googleMaps;
    let countryLanguages: string[] = [];
    if(languages){
     countryLanguages = Object.values(languages);
    return rows.push(
      createData(commonName, region, population, countryLanguages , [
        countryFlags,
        countryMap,
      ])
    );
    }else {
      countryLanguages = ["no language"]
      return rows.push(
        createData(commonName, region, population, countryLanguages , [
          countryFlags,
          countryMap,
        ])
      );
    }
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage= (event: unknown, newPage:number):void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      color="primary"
      className="table"
      sx={{ width: "100%", marginTop: "2vh" }}
    >
      <TableContainer
        className="table"
        sx={{  backgroundColor: "#c32c2c",width: "100%", marginTop: "2vh", overflow: "visible" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHeadMui columns={columns} />
          <TableBodyMui
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            columns={columns}
            setFavoritesList={setFavoritesList}
            favoritesList={favoritesList}
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
