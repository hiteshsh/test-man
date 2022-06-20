import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TestCaseListData from "../testcases/TestCaseListData";
import TestSuiteListData from "./TestSuiteListData";

const TestSuiteList = () => {
  return (
    <Box marginTop={4} marginLeft={3} marginRight={3} border="0px solid">
      <Grid container direction="row" spacing={2} sx={{ display: "flex" }}>
        <Grid item md={3}>
          <TestSuiteListData />
        </Grid>
        <Grid item md={9}>
          <TestCaseListData />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestSuiteList;
