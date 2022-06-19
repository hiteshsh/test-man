import { CloudDownload, CloudUpload, NavigateNext } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import TestCasesHeader from "./TestCasesHeader";
import TestSuiteList from "./TestSuiteList";



const TestCases = () => {
 
  return (
    <Box sx={{ marginLeft: "250px" }}>
      <TestCasesHeader />
      <TestSuiteList />
    </Box>
  );
};

export default TestCases;
