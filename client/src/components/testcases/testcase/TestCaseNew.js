import { Box } from "@mui/material";
import React from "react";
import TestCaseForm from "./TestCaseForm";
import TestCaseHeader from "./TestCaseHeader";

function TestCaseNew() {
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <TestCaseHeader />
      <TestCaseForm />
    </Box>
  );
}

export default TestCaseNew;
