import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from "@mui/icons-material/Add";
import SideMenu from "./components/SideMenu";
import { Button, ThemeProvider, createTheme } from "@mui/material";
//import testman from "./images/testman.png";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Header from "./components/Header";
import TestCases from "./components/TestCases";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const appMain = css`
  width: 100%;
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f6f8fa",
    },
  },
});

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />

          <div css={appMain}>
            <Header />
          </div>
          <SideMenu />
          <Routes>
            <Route path="/testcases" element={<TestCases />}></Route>
          </Routes>
          <CssBaseline />
        </React.Fragment>
      </ThemeProvider>
    </Router>
  );
};

export default App;
