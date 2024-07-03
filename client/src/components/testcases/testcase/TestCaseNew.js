import { Box } from "@mui/material";
import React from "react";
import TestSuiteListAPI from "../../testsuites/TestSuiteListAPI";
import TestCaseForm from "./TestCaseForm";
import TestCaseHeader from "./TestCaseHeader";
import Header from "../../Header";
import SideMenu from "../../SideMenu";

function TestCaseNew(props) {
  console.log("selected project", props.projectId);
  const { testsuites, error, isLoading } = TestSuiteListAPI(props.projectId);
  console.log("test suites", testsuites);

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
