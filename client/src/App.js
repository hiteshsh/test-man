import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import SideMenu from "./components/SideMenu";
import { ThemeProvider, createTheme } from "@mui/material";
//import testman from "./images/testman.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./components/Header";
import TestCases from "./components/TestCases";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Releases from "./components/Releases";
import Projects from "./components/Projects";
import Users from "./components/Users";

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
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/releases" element={<Releases />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/projects" element={<Users />}></Route>
          </Routes>
          <CssBaseline />
        </React.Fragment>
      </ThemeProvider>
    </Router>
  );
};

export default App;
