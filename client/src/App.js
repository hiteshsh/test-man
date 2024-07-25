import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import SideMenu from "./components/SideMenu";
import { ThemeProvider, createTheme } from "@mui/material";
//import testman from "./images/testman.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./components/Header";
import TestCases from "./components/testcases/TestCases";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Releases from "./components/releases/Releases";
import Projects from "./components/projects/ProjectsMain";
import Users from "./components/users/Users";
import TestCaseForm from "./components/testcases/testcase/TestCaseForm";
import TestCaseNew from "./components/testcases/testcase/TestCaseNew";
import Roles from "./components/roles/Roles";
import TestCaseDetail from "./components/testcases/testcase/TestCaseDetail";
import { Login } from "@mui/icons-material";
import SignIn from "./components/auth/SignIn";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import Layout from "./components/Layout";
// import { SignIn } from "./components/auth/SignIn";

const appMain = css`
  width: 100%;
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#467fcf",
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
  // let user = localStorage.getItem("user");
  // user = JSON.stringify(user);
  // console.log("token in app", user?.accesstoken);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <AuthProvider >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<SignIn />}></Route>
                <Route element={<RequireAuth />}>
                  <Route path="/testcases" element={<TestCases />}></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/releases" element={<Releases />}></Route>
                  <Route path="/projects" element={<Projects />}></Route>
                  <Route
                    path="/testcase/new"
                    element={
                      <TestCaseNew projectId={"62e02165cc1c8782f8b4188b"} />
                    }
                  ></Route>
                  <Route path="/users" element={<Users />}></Route>
                  <Route path="/roles" element={<Roles />}></Route>
                  <Route path="/testcase/:id" element={<TestCases />}></Route>
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
          <CssBaseline />
        </React.Fragment>
      </ThemeProvider>
    </Router>
  );
};

export default App;
