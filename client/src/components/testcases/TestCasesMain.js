import { Box } from "@mui/material";
import React from "react";
import TestCasesHeader from "./TestCasesHeader";
import TestSuiteList from "../testsuites/TestSuiteList";
import Header from "../Header";
import SideMenu from "../SideMenu";
import { useParams } from "react-router-dom";

const TestCases = () => {
  const { projectId } = useParams();

  console.log("projectId inside test cases", projectId);

  return (
    <>
      <Header />
      <SideMenu />
      <Box sx={{ marginLeft: "250px" }}>
        <TestCasesHeader />
        <TestSuiteList projectId={projectId} />
      </Box>
    </>
  );
};

export default TestCases;
