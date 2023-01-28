import { Box } from "@mui/material";
import React from "react";
import TestSuiteListAPI from "../../testsuites/TestSuiteListAPI";
import TestCaseForm from "./TestCaseForm";
import TestCaseHeader from "./TestCaseHeader";

function TestCaseNew(props) {
  console.log("selected project", props.projectId);
  const { testsuites, error, isLoading } = TestSuiteListAPI(props.projectId);
  console.log("test suites", testsuites);

  return (
    <Box sx={{ marginLeft: "250px" }}>
      <TestCaseHeader />
      <TestCaseForm testsuites={testsuites} />
    </Box>
  );
}

export default TestCaseNew;
