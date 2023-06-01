import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";

import CountryList from "./components/CountryList";
import Search from "./components/Search";

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
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

  function userInputHandler(event) {
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
          <Search userInputHandler={userInputHandler} />
          <CountryList result={result} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
