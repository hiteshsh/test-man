import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TestCaseListData from "../testcases/TestCaseListData";
import TestSuiteListData from "./TestSuiteListData";

const TestSuiteList = () => {
  return (
    <Box border="0px solid">
    <Grid container minHeight="315px" padding={2}>
        <Grid item md={3} padding={2}>
          <TestSuiteListData />
        </Grid>
        <Grid item md={9} padding={2}>
          <TestCaseListData />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestSuiteList;
