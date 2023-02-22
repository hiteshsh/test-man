import { Box } from "@mui/material";
import React from "react";
import TestCasesHeader from "./TestCasesHeader";
import TestSuiteList from "../testsuites/TestSuiteList";
import Header from "../Header";
import SideMenu from "../SideMenu";

const TestCases = () => {
  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}>
        <TestCasesHeader />
        <TestSuiteList />
      </Box>
    </>
  );
};

export default TestCases;
