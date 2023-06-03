import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { CountryData } from "./type";
import { Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import CountryList from "./components/CountryList";
import NavBar from "./components/NavBar/NavBar";
import CountryDetail from "./components/CountryDetail";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#c32c2c",
    },
    secondary: {
      main: "#202020",
    },
  },
});

function App() {
  const [data, setData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<CountryData[]>([]);
  const url = "https://restcountries.com/v3.1/all";

  async function getData() {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setIsLoading(false);
      setData(data);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function userInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value;
    setResult(
      data.filter((item) =>
        item.name.common.toLowerCase().includes(userInput.toLowerCase())
      )
    );
  }

  if (isLoading) {
    return <LinearProgress />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar userInputHandler={userInputHandler} />
          {/* <Search userInputHandler={userInputHandler} /> */}
          <Routes>
            <Route path="/" element={<CountryList result={result} />} />
            <Route path="/:id" element={<CountryDetail />} />
          </Routes>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
