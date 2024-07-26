import { Box } from "@mui/material";
import React from "react";
import TestSuiteListAPI from "../../testsuites/TestSuiteListAPI";
import TestCaseForm from "./TestCaseForm";
import TestCaseHeader from "./TestCaseHeader";
import Header from "../../Header";
import SideMenu from "../../SideMenu";

function TestCaseNew(props) {
  const { testsuites, error, isLoading } = TestSuiteListAPI(props.projectId);

  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}>
        <TestCaseHeader />
        <TestCaseForm testsuites={testsuites} />
      </Box>
    </>
  );
}

export default TestCaseNew;
