import { Box } from "@mui/material";
import React from "react";
import TestCasesHeader from "./TestCasesHeader";
import TestSuiteList from "../testsuites/TestSuiteList";

const TestCases = () => {
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <TestCasesHeader />
      <TestSuiteList />
    </Box>
  );
};

export default TestCases;
